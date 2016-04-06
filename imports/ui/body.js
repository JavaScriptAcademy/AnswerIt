
import { Meteor } from 'meteor/meteor';
import './question.js';

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../api/questions.js';
 
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('questions');
  this.state = new ReactiveDict();
});
 
Template.body.helpers({
  questions() {
  	var questions = Questions.find({});
  	_.each(questions, function(question){

  	});
    return Questions.find({});
  }
});


// Template.body.events({
//   'submit .new-task'(event) {
//     // Prevent default browser form submit
//     event.preventDefault();
 
//     // Get value from form element
//     const target = event.target;
//     const text = target.text.value;
 
//     // Insert a task into the collection
//      Meteor.call('tasks.insert', text);

 
//     // Clear form
//     target.text.value = '';
//   },
//    'change .hide-completed input'(event, instance) {
//     instance.state.set('hideCompleted', event.target.checked);
//   },
// });