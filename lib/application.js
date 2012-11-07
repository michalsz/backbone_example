(function ($) {

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
	    this.autoearch = false;
	    this.keyword = '';
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
		    //console.log('add tweet ...');
		});
		if(_this.page > 2){
		    $('#tweets').append(tweetsHtml);
		}
            });
	},

	search: function () {
	    if(this.keyword != $('#search')[0].value){
		this.clear();
	    }
	    this.keyword = $('#search')[0].value;
	    this.page++;
	    this.tweets.search(this.keyword, this.page);
	},

	clear: function () {
	    this.tweets.reset();
	    $('#tweets').html('');
	    removeMarkers();
	},

	addTweet: function(tweet) {
	    var tweetView = new TweetView({model: tweet})
	    $('#tweets').append(tweetView.render().el);
	},

	render: function(){
	    alert('render');
	}
    });

    var appview = new AppView();

})(jQuery);
