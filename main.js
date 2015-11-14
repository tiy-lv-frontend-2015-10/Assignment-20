$(document).ready(function(){

	var Meme = Backbone.Model.extend({
	  initialize: function () {
	    console.log("A new meme has been created");
	  },
	  _parse_class_name: "Meme",

	});

	var Memes = Backbone.Collection.extend({
		model:Meme,
		_parse_class_name:"Meme"
	});

	var MemeCollection = new Memes();

	MemeCollection.fetch({
		success: function(resp){
			var dataObj={'data':resp.toJSON()};
			var template= $("#memesTemplate").text();
			var memeHTML= Mustache.render(template,dataObj)
			$("#memesDiv").html(memeHTML);
		},
		error: function(err){
			console.log(err);
		}
	});








	var Router = Backbone.Router.extend({
	  initialize: function () {
	    Backbone.history.start({pushState: true});
	  },
	  routes: {
	    "meme/:objectId":"meme",
	    "add":"add",
	    "":"index"
	    
	  }
	});

	var router = new Router();

	

	router.on('route:meme', function(objectId) {
		var meme = new Meme({objectId:objectId});
		meme.fetch({
			success: function(resp){
				var memeObj = {'data':resp.toJSON()};
				var template2=$('#memeTemplate2').text();
				var memeHTML = Mustache.render(template2,memeObj);
				$("#oneMemeDiv").html(memeHTML);
				$("#memesDiv").hide();
				$("#oneMemeDiv").show();
				$("#nav").css("width","1000px");
			}
	    });
	});

	router.on('route:add', function() {
		$("#memesDiv").hide();
		$("#oneMemeDiv").hide();
		$("#addForm").show();
	});

	router.on('route:index', function() {
		$("#memesDiv").show();
		$("#oneMemeDiv").hide();
		$("#nav").css("width","730px");
		$("#addForm").hide();

	});


	 $("#submitBtn").on('click', function(e){

	 	e.preventDefault();
	 	var test= new Meme();
	 	test.set({
	 		url: $("#url").val(),
	 		user: $("#name").val(),
	 		title: $("#title").val(),
	 		description: $("#description").val()
	 	});

	 	$("#url").val("");
		$("#name").val("");
	 	$("#title").val("");
	 	$("#description").val("");

	 	test.save(null, {
	 		success: function(resp) {
	 			console.log(resp);
	 		},

	 		error: function(err) {
	 			console.log(err);
	 		}
	 	});
	 	location.href="/";
	 });
	  

	$("body").on('click',"a", function(e){
	  e.preventDefault();
	  var href = $(this).attr('href');
	  href = href.substr(1);
	  router.navigate(href, {trigger:true});
	});



});
