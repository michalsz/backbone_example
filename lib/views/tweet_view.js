var TweetView = Backbone.View.extend({
    tagName: 'div',
    className: 'tweet',
    
    initialize: function(){
	_.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
	this.model.view = this;
    },
    
    render: function(){
	this.template = _.template( tpl.get('tweet') );

	$(this.el).html(this.template(this.model.toJSON()));
	this.setGeo();
	return this; // for chainable calls, like .render().el
    },
	
    setGeo: function(){
	var geo = this.model.get('geo');
	if(geo){
	    this.$('.geo').html('Geo :' + geo.coordinates[0] + ' ' + geo.coordinates[1]);
	}
    },
});
