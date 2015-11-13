$(document).ready(function (){

	var Picture = Backbone.Model.extend({
		initialize: function () {
		
		},defaults: {
			description: null,
			name: null,
			url: null
		},
		_parse_class_name: "Image"
	}); 	


	var Picture = Backbone.Collection.extend({
		model: Picture,
		_parse_class_name: "Image"
	});

	var ImagesCollection = new Picture();

	ImagesCollection.fetch({
		success: function(resp){
		var imgObj = {"pics": resp.toJSON()};
		var imageTemplate = $("#imageTemplate").text();
		var imageHTML = Mustache.render(imageTemplate, imgObj);
			$("#gallery").html(imageHTML);
				console.log("success: ", resp);	
				console.log(imgObj);
		}

	});

//collection
	var Router = Backbone.Router.extend ({
		initialize: function(){

		Backbone.history.start({pushState:true});
			},
			routes: {
				"url/:objectId": "url",
				"":"index"
			}	 
	});
//individual
	var router = new Router();

	router.on('router:url', function(objectId) {
		var info = new Picture({objectId:objectId});
		info.fetch({
			success:function(resp)
				var picObj = {'description':resp.toJSON()};
				var PicTemplate = $('#info')

		}
	});



}); //doc.ready close