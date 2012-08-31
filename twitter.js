(function ($) {

var Tweet = Backbone.Model.extend({
});

 var Tweets = Backbone.Collection.extend({
    model: Tweet,

    parse: function(response) {
        return response.results;
    }
  });

 var TweetView = Backbone.View.extend({
 	tagName: 'div',
  className: 'tweet',
  template: _.template('<img class="avatar thumbnail"/><strong class="user"></strong><img src="img/bird_blue_32.png" /><p class="t_text"></p><span class="geo"></span><a class="retweet" href="">Retweet</a>'),
 	events: {
 		"click": "remove"
 	},

 	initialize: function(){
      _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
      this.model.view = this;
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      this.setContent();
      return this; // for chainable calls, like .render().el
    },

    setContent: function(){
      var content = this.model.get('profile_image_url');
      this.$('.avatar').attr('src', content);
      var content = this.model.get('from_user');
      this.$('.user').html('@' + content);
      var content = this.model.get('text');
      this.$('.t_text').html(content);
      var geo = this.model.get('geo');
      if(geo){
        console.log( geo.coordinates[0] + '- ' + geo.coordinates[1] + ' geo ' + JSON.stringify(geo));
        this.$('.geo').html('Geo :' + geo.coordinates[0] + ' ' + geo.coordinates[1]);

        putMarker(geo.coordinates[0], geo.coordinates[1]);
      }
      var content = this.model.get('id');
      this.$('.retweet').attr('href', 'https://twitter.com/intent/retweet?tweet_id=' + content);
    },

    remove: function(){
    	this.model.clear();
    }
 });

var AppView = Backbone.View.extend({
  el: $("body"),
  events: {
    "click #search-btn":  "search",
    "click #clear-btn":  "clear"    
  },

  initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
       
       this.tweets = new Tweets();
       this.page = 1;
       _this = this;

       this.tweets.bind('reset', function(collection) {
            // Clear any old tweet renderings
            //_this.$('#tweets').empty();
            // For each tweet in the collection, we call addItem and
            // and pass the tweet.
            var tweetsHtml = $('#tweets').html();
            $('#tweets').html('');


             collection.each(function(tweet) {
               _this.addTweet(tweet);
              console.log('add tweet ...');
             });
             if(_this.page > 2){
               console.log('added old tweets ...');
               $('#tweets').append(tweetsHtml);
             }
             console.log('added all tweet ...');
        });
  },

  search: function () {
    this.tweets.url = 'http://search.twitter.com/search.json?q=' +  $('#search')[0].value + '&callback=?&page=' + this.page;
    this.page++;

    this.tweets.fetch();
    console.log('after fetch ...');
  },

  clear: function () {
    this.tweets.reset();
    $('#tweets').html('');
  },

  addTweet: function(tweet) {
    var tweetView = new TweetView({model: tweet})
    $('#tweets').append(tweetView.render().el);
  },

  render: function(){
  
  }

});
var appview = new AppView;
})(jQuery);