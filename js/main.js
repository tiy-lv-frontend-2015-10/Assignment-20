$(document).ready(function(){

	var Pet = Backbone.Model.extend({
    initialize: function () {
    },
    defaults: {
      URL: null,
      Description: null
    },
    _parse_class_name: "Images"
	});

	var animal = new Pet();

	var Pets = Backbone.Collection.extend({
		model: Pet,
		_parse_class_name: "Images"
	})

	var PetsCollection = new Pets();

	PetsCollection.fetch({
		success: function(resp){
			var imageObj = {'images':resp.toJSON()};
			var imageTemplate = $("#imageTemplate").text();
			var imageHTML = Mustache.render(imageTemplate, imageObj);
			$("#imageDiv").html(imageHTML);
			console.log("success ", resp);
		}, error: function(err){
			console.log("error ", err);
		}
	});

	// var Router = Backbone.Router.extend({
	// 	initialize:function(){
	// 		Backbone.history.start({pushState: true});
	// 	},
	// 	routes:{
	// 		"user/:objectId": "user",
	// 		"": "index"
	// 	}
	// });

	// var route = new Router();

	// router.on('route:user', function(objectId){
	// 	var animal = new Pet({objectId: objectId});
	// 	animal.fetch({
	// 		var 
	// 	})
	// }
});