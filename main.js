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
			var template= $("#memeTemplate").text();
			var memeHTML= Mustache.render(template,dataObj)
			$("#memesDiv").html(memeHTML);
		},
		error: function(err){
			console.log(err);
		}
	});

});

