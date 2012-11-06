(function ($) {

    var TweetView = Backbone.View.extend({
	tagName: 'div',
	className: 'tweet',
	
	initialize: function(){
	    this.template = _.template($('#tweet-template').html());
	    _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
	    this.model.view = this;
	},
	
	render: function(){
	    $(this.el).html(this.template(this.model.toJSON()));
	    this.putMark();
	    return this; // for chainable calls, like .render().el
	},
	
	putMark: function(){
	    var geo = this.model.get('geo');
	    if(geo){
		this.$('.geo').html('Geo :' + geo.coordinates[0] + ' ' + geo.coordinates[1]);
		putMarker(geo,  this.model.get('text'));
	    }
	},
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
	    this.autoearch = false;
	    this.keyword = '';
	    _this = this;

	    this.tweets.on('add', this.added);
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

	added: function(mode, collection){
	    console.log('added ' + model.get('from_user'));
	},

	search: function () {
	    if(this.keyword != $('#search')[0].value){
		this.clear();
	    }
	    this.keyword = $('#search')[0].value;
	    this.tweets.url = 'http://search.twitter.com/search.json?q=' +  this.keyword + '&callback=?&page=' + this.page;
	    this.page++;
	    this.tweets.fetch();
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
	    
	}
    });
    var appview = new AppView;
})(jQuery);