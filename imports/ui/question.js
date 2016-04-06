import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Questions } from '../api/questions.js';
import{Session} from 'meteor/session';
import './question.html';

Session.set('questionId', '')

Template.question.helpers({
  isStudent() {
     return this.owner !== Meteor.userId();
  },

  options() {
  	var id = this._id;
  	_.each(this.options, function(option){
  		option.questionId = id;
  	})
  	return this.options;
  },

  optionVote() {
    return this.optionVote;
  }
 
}); 


Template.question.events({
  'change .ratioButton': function(event) {
    var value = event.target.getAttribute('value');
    var name = event.target.getAttribute('name');

    var lastSelectedEl = findLastSelectedOne(name);

    if (lastSelectedEl) {
      updateAttribute(lastSelectedEl);
      Meteor.call('questions.updateOptionVote' , name, lastSelectedEl.value, 'false' );
    }
    event.target.setAttribute("data-selected", 'true');
    Meteor.call('questions.updateOptionVote' , name, value, 'true' );
  } 

});

function findLastSelectedOne(className) {
  var list = Array.from(document.getElementsByClassName(className));
  var els = list.filter(function(el) {
    if (el.getAttribute("data-selected")==='true') {
      return true;
    }
  });
  if (els.length !== 0) {
    return els[0];
  } else {
    return null;
  }
}

function updateAttribute(el) {
  if (el) {
    el.setAttribute("data-selected", false);
  }
}


