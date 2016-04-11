import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Questions } from '../api/questions.js';
import { Tests } from '../api/tests.js';

import{Session} from 'meteor/session';
import './question.html';


Template.question.helpers({
  isStudent() {
     return this.owner !== Meteor.userId();
  },

  isCorrectAnswer(id) {
    var question = Questions.findOne( {
      _id: id
    });
    if (question.correctAnswer === this.optionName) {
      return true;
    } else {
      return false;
    }
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

    var question = Questions.findOne(name);
    var correctAnswer =question.correctAnswer;
    console.log("element:" , event.target);
    console.log("correctAnswer:", correctAnswer);
    console.log("selectAnswer:", value);
    console.log("parenet:", event.target.parentElement);

    if(value === correctAnswer) {

      event.target.parentElement.parentElement.classList.add("answer_correct");
      console.log("add class correct");
      // event.target.parentElement.className += " answer-correct";
    } else {
      console.log("add class wrong");
      event.target.parentElement.parentElement.classList.add("answer_wrong");

      // event.target.parentElement.className += " answer-wrong";
    }


    var lastSelectedEl = findLastSelectedOne(name);

    if (lastSelectedEl) {
      lastSelectedEl.parentElement.parentElement.classList.remove("answer_wrong");
      lastSelectedEl.parentElement.parentElement.classList.remove("answer_correct");

      // lastSelectedEl.parentElement.removeClass("answer_correct");
      // lastSelectedEl.parentElement.removeClass("answer_wrong");

      updateAttribute(lastSelectedEl);
      Meteor.call('tests.updateQuestionOptionVote' , name, lastSelectedEl.value, 'false' );
    }
    event.target.setAttribute("data-selected", 'true');
    Meteor.call('tests.updateQuestionOptionVote' , name, value, 'true' );
  },



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


Template.d3vis.onRendered(function() {
   
    var  QID = Template.currentData().questionId;
    var QID = '' + QID;
      window.d3vis = {};

      Tracker.autorun(function () {
            window.d3vis.margin = {top: 20, right: 20, bottom: 70, left: 40},
            window.d3vis.width = 190 - window.d3vis.margin.left - window.d3vis.margin.right,
            window.d3vis.height = 190 - window.d3vis.margin.top - window.d3vis.margin.bottom;

            window.d3vis.x = d3.scale.ordinal().rangeRoundBands([0, window.d3vis.width], .05);

            window.d3vis.y = d3.scale.linear().range([window.d3vis.height, 0]);

            window.d3vis.xAxis = d3.svg.axis()
            .scale(window.d3vis.x)
            .orient("bottom")
            .ticks(2);


            window.d3vis.yAxis = d3.svg.axis()
            .scale(window.d3vis.y)
            .orient("left")
            .ticks(5)
            .tickFormat(d3.format("d"));
         
            if($( "#" + QID + " svg" )!==null)
              $( "#" + QID + " svg" ).remove();
          window.d3vis.svg = d3.select("#" + QID).append("svg")  
            .attr("width", window.d3vis.width + window.d3vis.margin.left + window.d3vis.margin.right)
            .attr("height", window.d3vis.height + window.d3vis.margin.top + window.d3vis.margin.bottom)
          .append("g")
            .attr("transform", 
                  "translate(" + window.d3vis.margin.left + "," + window.d3vis.margin.top + ")");

        var quest = Questions.findOne({_id: QID});
        var testId = quest.testId;
        var test = Tests.findOne({_id: testId});
        
        var question = test.questions.filter(function(question) {
          return question._id === QID;
        } )[0];
        var data = question.options;       
        window.d3vis.x.domain(data.map(function(d) { return d.optionName; }));
        window.d3vis.y.domain([0, d3.max(data, function(d) { 
        return d.optionVote; })]);

        window.d3vis.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + window.d3vis.height + ")")
          .call(window.d3vis.xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );
       
        window.d3vis.svg.append("g")
          .attr("class", "y axis")
          .call(window.d3vis.yAxis)
        .append("text")
          .attr("transform", "rotate(270)")
          .attr("y", 0 - 35)
          .attr("x",0 )
          .attr("dy", "1em")
          .style("text-anchor", "end")
          .text("Person(s)");

        window.d3vis.svg.selectAll("bar")
          .data(data)
        .enter().append("rect")
          .style("fill", "steelblue")
          .attr("x", function(d) { return window.d3vis.x(d.optionName); })
          .attr("width", window.d3vis.x.rangeBand()* 2/3)
          .attr("y", function(d) { return window.d3vis.y(d.optionVote); })
          .attr("height", function(d) { return window.d3vis.height - window.d3vis.y(d.optionVote);})

      });  
    
});


