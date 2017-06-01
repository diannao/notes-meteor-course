import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default () => {
      return (
        <div>
          <PrivateHeader title="Notes"/>
          <div className="page-content">
            <div className="page-content__sidebar">
            <NoteList/>
          </div>
          <div className="page-content__main">
            <Editor/>
          </div>
          </div>
        </div>
      );
};
