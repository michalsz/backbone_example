describe ("Friend", function(){
	var friend;
	
	beforeEach(function() {
		friend = new Friend();
    });
	
	it("should be name set john", function() {
		friend.set("name", 'John');
		expect(friend.get('name')).toEqual('John');
    });
});