(function ($) {

var Friend = Backbone.Model.extend({
	defaults:{
		name: 'John',
	},

	clear: function() {
      this.destroy();
      $(this.view.el).remove();
    }
});

 var List = Backbone.Collection.extend({
    model: Friend
  });

 var FriendView = Backbone.View.extend({
 	tagName: 'li',

 	events: {
 		"click": "remove"
 	},

 	initialize: function(){
      _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
      this.model.view = this;
    },

    render: function(){
      $(this.el).html('<span>'+this.model.get('name') + '  <i class="icon-remove remove"></i> </span>');
      return this; // for chainable calls, like .render().el
    },

    remove: function(){
    	this.model.clear();
    }
 });

var AppView = Backbone.View.extend({
  el: $("body"),
  appEl: $("#app"),
  friendsEl: $('#friends-list'),
  events: {
    "click #add-friend":  "showPrompt"
  },

  initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
       
       this.counter = 0;
       this.friends = new List();
       this.friends.bind('add', this.appendItem); 
       this.render(); // not all views are self-rendering. This one is.
  },

  showPrompt: function () {
    var friend_name = $('#friend-name')[0].value;
    $('#friend-name')[0].value = '';
    this.counter++;

    if(friend_name == ''){
      this.showErrors();
    } else{   
      $('#errors').html('');
      var friend = new Friend({name: friend_name})
	    this.friends.add(friend);
    }
  },

  showErrors: function(){
    $('#errors').html('Add friend name');
  },

  appendItem: function(friend){
  	var friendView = new FriendView({model: friend});
  	$('ul', this.el).append(friendView.render().el);
  },

  render: function(){
  }

});
var appview = new AppView;
})(jQuery);