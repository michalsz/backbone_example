var Tweets = Backbone.Collection.extend({
    model: Tweet,

    initialize: function(){
	this.storage = new Backbone.LocalStorage('tweets');
    },
    
    parse: function(response) {
        return response.results;
    },
    
    search: function(keyword, page){
	this.keyword = keyword;
	this.page = page;
	this.url =  'http://search.twitter.com/search.json?q=' +  this.keyword + '&callback=?&page=' + this.page;
	this.fetch();
    },

    save: function(){
	this.storage.create(this.models[0]);
    },

    update: function(){
	this.models = this.storage.findAll();
//	console.log(this.models);
    }


});

