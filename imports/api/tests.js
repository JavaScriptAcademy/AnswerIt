import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Questions } from './questions.js';


 
export const Tests = new Mongo.Collection('tests'); 
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user

  Meteor.publish('tests', function tasksPublication() {
  	return Tests.find({});
  });

  Meteor.methods({
 'tests.updateQuestionOptionVote'(questId, optionName, increase) {
    
    var quest = Questions.findOne( {
      _id: questId
    });

    var testId = quest.testId;
    var test = Tests.findOne({
    	_id: testId
    	});
    var questions = test.questions;
    var question = questions.filter(function(question) {
    		return question._id === questId;
    		})[0];
    

    var  option= question.options.filter( function(option) {
        return option.optionName === optionName;
    })[0];
    
    if (increase === 'true') {
      option.optionVote ++;
    } else {
      option.optionVote --;
    } 
    Tests.update(testId, test);

  	},

 });
}
 



