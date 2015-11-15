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

	var picture = new Picture();	


	var Pictures = Backbone.Collection.extend({
		model: Picture,
		_parse_class_name: "Image"
	});

	var ImagesCollection = new Pictures();
	ImagesCollection.fetch({
		success: function(resp){
		var imgObj = {"pics": resp.toJSON()};
		var imageTemplate = $("#imageTemplate").text();
		var imageHTML = Mustache.render(imageTemplate, imgObj);
			$("#gallery").html(imageHTML);
			
		},
		error: function(err){
			console.log(err);
		}
	});

//collection
	var Router = Backbone.Router.extend ({
		initialize: function(){

		Backbone.history.start({pushState:true});
			},
			routes: {
				"url/:objectId": "url",
				"":"index",
				/*"add":"add",*/
			}	 
	});
//individual
	var router = new Router();

	router.on('route:url', function(objectId) {
		var url = new Picture({objectId:objectId});
		url.fetch({
			success:function(resp) {
				var picObj = {'description':resp.toJSON()};
				var picTemplate = $('#info').text();
				var picHTML = Mustache.render(picTemplate, picObj);
				$("#desc").html(picHTML);
				$("#gallery").hide();
				$("#desc").show();
		}
	});


		router.on('route:index', function(){
			var pic
			$("#desc").hide();
			$("#gallery").show();
		})


		}); 

	$("body").on("click", "a", function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		href = href.substr(1);
		router.navigate(href, {trigger:true});
	});







}); //doc.ready close







