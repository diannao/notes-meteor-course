import {Meteor} from 'meteor/meteor';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import { Session } from 'meteor/session';

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';

const history = createBrowserHistory(); // { forceRefresh: true }

//window.browserHistory = history;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    history.replace('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  console.log("onEnterPrivatePage");
  if(!Meteor.userId()) {
    history.replace('/');
  }
};

const onEnterNotePage = (nextState) => {
  console.log("onEnterNotePage");
  if(!Meteor.userId()) {
    history.replace('/');
  } else {
    console.log(nextState);
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  console.log(pathname);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) {
    console.log('pushing to links');
    history.replace('/dashboard');
  } else if(isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
                <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
                <Route exact path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
                <Route path="/dashboard/:id" render={(props) => {
                  console.log("onEnterNotePage");
                  if(!Meteor.userId()) {
                    history.replace('/');
                  } else {
                    Session.set('selectedNoteId', props.match.params.id);
                  }

                  return (<Dashboard/>);
                }}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);
