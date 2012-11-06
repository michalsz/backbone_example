var Tweets = Backbone.Collection.extend({
    model: Tweet,
    
    parse: function(response) {
        return response.results;
    }
});

