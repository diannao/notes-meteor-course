import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import createBrowserHistory from 'history/createBrowserHistory'

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

const history = createBrowserHistory({ forceRefresh: true }); //

//window.browserHistory = history;

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();

  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
  }
});


Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);


  //  Meteor.call('links.insert', 'fail');
    ReactDOM.render(routes, document.getElementById('app'));
});
