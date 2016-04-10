import { Meteor } from 'meteor/meteor';
import { Questions } from '../imports/api/questions.js';
import { Tests } from '../imports/api/tests.js';

Meteor.startup(() => {

if (Tests.find().count() === 0) {

    var test1 = {
      name: "General Test",
      questions: [
          {
            questionText: 'Which one is a country?',
            options:[
              {
                optionName: 'A',
                optionText: 'Angry',
                optionVote: 0,
              },
              {
                optionName: 'B',
                optionText: 'Hungry',
                optionVote: 0,

              },
            ],
            correctAnswer: 'B',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',

          },
          {
            questionText: '5+7=',
            options:[
              {
                optionName: 'A',
                optionText: '12',
                optionVote: 0,

              },
              {
                optionName: 'B',
                optionText: '14',
                optionVote: 0,

              },
              {
                optionName: 'C',
                optionText: '13',
                optionVote: 0,
              }
            ],
            correctAnswer: 'A',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',
          },
        ],
    };

    var data = [];
    data.push(test1);
    _.each(data, function(test) {
      var test_id = Tests.insert(test);
      var questions= [];
      _.each(test.questions, function(question) {
        question.testId = test_id;
        var q_id = Questions.insert(question);
        question._id = q_id;
        questions.push(question); 
    });
     
      var result = Tests.update({_id: test_id},{name: test.name,questions: questions});
   });

}

});

