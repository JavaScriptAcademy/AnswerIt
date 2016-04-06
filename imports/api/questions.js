import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Questions = new Mongo.Collection('questions'); 
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user

  Meteor.publish('questions', function tasksPublication() {
  return Questions.find({
     
    });
  });
}
 

Meteor.methods({
 'questions.updateOptionVote'(questionId, optionName, increase) {
    var question = Questions.findOne( {
      _id: questionId
    });
    var  option= question.options.filter( function(option) {
        return option.optionName === optionName;
    })[0];
    
    if (increase === 'true') {
      option.optionVote ++;
    } else {
      option.optionVote --;
    } 
    Questions.update(questionId, question);

  },

 


});


