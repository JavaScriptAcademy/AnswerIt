import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Questions } from '../api/questions.js';
import{Session} from 'meteor/session';
import './question.html';


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
    // Defer to make sure we manipulate DOM
   // debugger;
    var  QID = Template.currentData().id;
    var QID = '' + QID;
    console.log("QID : "+ QID);

    // console.log("Set Attribute");

   // _.defer(function () {
     // var questionIdVar = new ReactiveVar();
      // Use this as a global variable 
      window.d3vis = {};

      // Deps.autorun(function () {
      //   questionIdVar.set(Template.currentData().id);
      // });

      Tracker.autorun(function () {
      //Deps.autorun(function () {
        //if (Deps.currentComputation.firstRun) {
           window.d3vis.margin = {top: 20, right: 20, bottom: 70, left: 40},
            window.d3vis.width = 200 - window.d3vis.margin.left - window.d3vis.margin.right,
            window.d3vis.height = 200 - window.d3vis.margin.top - window.d3vis.margin.bottom;

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

           // debugger;
           //console.log("className"+".d3vis "+QID);
            // var el = $("#" + QID);
            console.log("el", $("#" + QID));
            console.log("elChild", $("#" + QID).firstChild);
            $( "#" + QID + " svg" ).remove();
            // console.log("firstChild", el.firstChild);
            //el.removeChild(el.firstChild);

          //window.d3vis.svg = d3.select("#" + QID).append("svg")
          window.d3vis.svg = d3.select("#" + QID).append("svg")  
            .attr("width", window.d3vis.width + window.d3vis.margin.left + window.d3vis.margin.right)
            .attr("height", window.d3vis.height + window.d3vis.margin.top + window.d3vis.margin.bottom)
          .append("g")
            .attr("transform", 
                  "translate(" + window.d3vis.margin.left + "," + window.d3vis.margin.top + ")");
          console.log("going out");
      //  }
      
        //var id = questionIdVar.get();
        var data = Questions.findOne({_id: QID}).options;
        // var data = [{
        //   optionName: "A",
        //   optionVote: 0
        // },{
        //   optionName:"B",
        //   optionVote: 3
        // }]
        console.log(data);
        //debugger;

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
          .attr("y", 0 - 25)
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
    
  //});
});


