import { Meteor } from 'meteor/meteor';
import { Questions } from '../imports/api/questions.js';

Meteor.startup(() => {

  var questions = [
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
            owner: 'uu34TCfJNXXa5YAnL',
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
            owner: 'uu34TCfJNXXa5YAnL',
            username: 'layne',
          },
        ];
        Questions.remove({});
 //if (Questions.find().count() === 0) {
    questions.forEach((question)=> {
      Questions.insert(question);
    }
  );
//  }

 

});

