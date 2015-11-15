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
		 $("#submit").on("click", function(){
			var picture = new Picture();
			picture.set({
				url: $("#url").val(),
				description: $("#description").val(),
				name: $("#name").val()
			});
				$("#url").val("");
				$("#description").val("");
				$("#name").val("");
			picture.save(null, {
				success: function(resp){
				},error: function(err){
					console.log("error", err);
				}

			});
		
			router.navigate("/");
			$("#suma").hide();
		});
//collection
	var Router = Backbone.Router.extend ({
		initialize: function(){

		Backbone.history.start({pushState:true});
			},
			routes: {
				"":"index",
				"url/:objectId": "url",
				"add":"add",
				
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
				$("#suma").hide();
				$("#desc").show();
		}

		})	
	});

		router.on('route:index', function(){
			$("#desc").hide();
			$("#suma").hide();
			$("#gallery").show();
		});
		router.on('route:add', function(){
			$("#gallery").hide();
			$("#desc").hide();
			$("#suma").show();
			$("#btn").toggleClass();

		})


	

	$("body").on("click", "a", function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		href = href.substr(1);
		router.navigate(href, {trigger:true});
	});

	}); 

 //doc.ready close







