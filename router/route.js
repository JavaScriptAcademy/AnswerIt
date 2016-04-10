import { Tests } from '../imports/api/tests.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/test/:_id', {
  name:'testContent',
  template:'content',
  data: function(){
    return Tests.findOne({_id:this.params._id});
  },
});

Router.route('/', {
    template: 'home'
});


