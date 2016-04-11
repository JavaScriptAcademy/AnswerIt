import { Meteor } from 'meteor/meteor';
import { Questions } from '../imports/api/questions.js';
import { Tests } from '../imports/api/tests.js';

Meteor.startup(() => {

if (Tests.find().count() === 0) {

    var test1 = {
      name: "Common sense Test",
      questions: [
          {
            questionText: '1.Which one is a country?',
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
            questionText: '2.A plane crashes on the border of Canada and the USA, 60 people die. Where do they bury the survivors?',
            options:[
              {
                optionName: 'A',
                optionText: 'USA',
                optionVote: 0,

              },
              {
                optionName: 'B',
                optionText: 'Canada',
                optionVote: 0,

              },
              {
                optionName: 'C',
                optionText: 'Split 50-50',
                optionVote: 0,
              },
              {
                optionName: 'D',
                optionText: 'Neither',
                optionVote: 0,
              },
            ],
            correctAnswer: 'D',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',
          },
          {
            questionText: '3.Some months have 30 days and some have 31. How many have 28?',
            options:[
              {
                optionName: 'A',
                optionText: '5',
                optionVote: 0,

              },
              {
                optionName: 'B',
                optionText: '1',
                optionVote: 0,

              },
              {
                optionName: 'C',
                optionText: '3',
                optionVote: 0,
              },
              {
                optionName: 'D',
                optionText: '12',
                optionVote: 0,
              },
            ],
            correctAnswer: 'D',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',
          },
          {
            questionText: '4.If a doctor gave you three pills with instructions to take one every half hour, when will you take the last one?',
            options:[
              {
                optionName: 'A',
                optionText: '2 hours later',
                optionVote: 0,

              },
              {
                optionName: 'B',
                optionText: '1.5 hours later',
                optionVote: 0,

              },
              {
                optionName: 'C',
                optionText: '1 hour later',
                optionVote: 0,
              },
              {
                optionName: 'D',
                optionText: 'None',
                optionVote: 0,
              },
            ],
            correctAnswer: 'D',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',
          },
        ],
    };

    var test2 = {
      name: "Brain Twist",
      questions: [
          {
            questionText: '1.Johnny’s mother had three children. The first child was named April. The second child was named May. What was the third child’s name??',
            options:[
              {
                optionName: 'A',
                optionText: 'June',
                optionVote: 0,
              },
              {
                optionName: 'B',
                optionText: 'July',
                optionVote: 0,

              },
              {
                optionName: 'C',
                optionText: 'Johnny',
                optionVote: 0,

              },
            ],
            correctAnswer: 'C',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',

          },
          {
            questionText: '2.A clerk at a butcher shop stands five feet ten inches tall and wears size 13 sneakers. What does he weigh?',
            options:[
              {
                optionName: 'A',
                optionText: 'No idea',
                optionVote: 0,

              },
              {
                optionName: 'B',
                optionText: 'Vegetables',
                optionVote: 0,

              },
              {
                optionName: 'C',
                optionText: 'Sheep',
                optionVote: 0,
              },
              {
                optionName: 'D',
                optionText: 'Meat',
                optionVote: 0,
              },
            ],
            correctAnswer: 'D',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',
          },
          {
            questionText: '3.If you were running a race and you passed the person in 2nd place, what place would you be in now?',
            options:[
              {
                optionName: 'A',
                optionText: 'second',
                optionVote: 0,

              },
              {
                optionName: 'B',
                optionText: 'first',
                optionVote: 0,

              }
            ],
            correctAnswer: 'A',
            owner: 'fZQvQjHuJd3PWXgi7',
            username: 'layne',
          }
        ],
    };

    var data = [];
    data.push(test1);
    data.push(test2);
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

