$(document).ready(function(){

	$("body").on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });

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

	var Router = Backbone.Router.extend({
		initialize:function(){
			Backbone.history.start({pushState: true});
		},
		routes:{
			"user/:objectId": "user",
			"add": "add",
			"edit": "edit",
			"": "index"
		}
	});

	var router = new Router();

	router.on('route:user', function(objectId){
		var animal = new Pet({objectId: objectId});
		animal.fetch({
			success: function(resp){
				var petObj = {'pet':resp.toJSON()};
				var descripTemplate = $("#descripTemplate").text();
				var petHTML = Mustache.render(descripTemplate, petObj);
				$("#descripDiv").html(petHTML);
				$("#imageDiv").hide();
				$("#descripDiv").show();
				console.log("success ", resp);
		}, error: function(err){
			console.log("error ", err);
			}
		})
	});
	router.on('route:add', function(){
		console.log('add page');
	});
	router.on('route:edit', function(){
		console.log('edit page');
	});
	router.on('route:index', function(){
		$("#descripDiv").hide();
		$("#imageDiv").show();
		console.log('home page');
	});

});