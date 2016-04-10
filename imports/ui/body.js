
import { Meteor } from 'meteor/meteor';
import './question.js';
import './content.js';

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../api/questions.js';
import { Tests } from '../api/tests.js';

import './body.html';


Template.layout.onCreated(function bodyOnCreated() {
  Meteor.subscribe('questions');
  Meteor.subscribe('tests');
});
 
Template.layout.helpers({
  tests() {
  	return Tests.find({});
  }
});



