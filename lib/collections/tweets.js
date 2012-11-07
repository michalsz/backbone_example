var Tweets = Backbone.Collection.extend({
    model: Tweet,
    
    parse: function(response) {
        return response.results;
    },
    
    search: function(keyword, page){
	   this.keyword = keyword;
	   this.page = page;
	   this.url =  'http://search.twitter.com/search.json?q=' +  this.keyword + '&callback=?&page=' + this.page;
	   this.fetch();
	}
});

