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
      Title: null,
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

	$("#saveBtn").on('click',function(e){
		e.preventDefault();
	var animal = new Pet();
	animal.set({
		url: $("#url").val(),
		title: $("#title").val(),
		description: $("#d_page").val()
	})
	$("#url").val(""),
	$("#title").val(""),
	$("#d_page").val("");
		animal.save(null,{
			success:function(resp){
				PetsCollection.fetch({
					success: function(resp){
					}, error: function(err){	
					}
				})
			}, error: function(err){
				console.log("error ", err);
		}
	})
		location.href="/"
	});

	// $("#editSubmit").on('click',function(e){
	// e.preventDefault();
	// var animal = new Pet();
	// animal.set({
	// 	objectId: $("#objectId").val(),
	// 	description: $("#editData").val(),
	// 	idAttributes: "objectId"
	// })
	// $("#objectId").val(""),
	// $("#editData").val("")
	// 	animal.save(null,{
	// 		success:function(resp){
	// 			PetsCollection.fetch({
	// 				success: function(resp){
	// 				}, error: function(err){	
	// 				}
	// 			})
	// 		}, error: function(err){
	// 			console.log("error ", err);
	// 	}
	// })
	// 	location.href="/"
	// });

	var Router = Backbone.Router.extend({
		initialize:function(){
			Backbone.history.start({pushState: true});
		},
		routes:{
			"user/:objectId": "user",
			"add": "add",
			"user/:objectId/edit": "edit",
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
		$("#addDiv").show();
		$("#imageDiv").hide();
		$("#descripDiv").hide();
		$("#editDiv").hide();
		console.log('add page');
	});
	router.on('route:edit', function(objectId){
		var animal = new Pet({objectId: objectId});
		animal.fetch({
			success:function(resp){
				var editObj = {'edit':resp.toJSON()};
				var editTemplate = $("#editTemplate").text();
				var editHTML = Mustache.render(editTemplate, editObj);
				$("#editDiv").html(editHTML);
				$("#descripDiv").hide();
				$("#editDiv").show();
				$("#editSubmit").on('click',function(){
				var animal = new Pet();
				animal.set({
					objectId: $("#objectId").val(),
					description: $("#editData").val()
				})
				$("#objectId").val(""),
				$("#editData").val("")
					animal.save(null,{
						success:function(resp){
							PetsCollection.fetch({
								success: function(resp){
								}, error: function(err){	
								}
							})
						}, error: function(err){
							console.log("error ", err);
					}
				})
					router.navigate("/");
				})
			console.log('edit page');
			}, error: function(err){
				console.log("error ", err);
			}
			})
	});
	router.on('route:index', function(){
		$("#imageDiv").show();
		$("#descripDiv").hide();
		$("#addDiv").hide();
		$("#editDiv").hide();
		console.log('home page');
	});

});