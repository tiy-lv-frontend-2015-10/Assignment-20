 var Image = Backbone.Model.extend({
    initialize: function() {
      },
      defaults:{
        URL: null,
        Description: null,
        Name:null
      },
      _parse_class_name:"Images"
    });
  
    var Images = Backbone.Collection.extend({
        model: Image,
        _parse_class_name: "Images"
      });

 //images 
var ImageCollection = new Images();

 ImageCollection.fetch({
 success:function(resp){
	 var imgObj = {'star':resp.toJSON()};	 
	 var template = $("#warsTemplate").text();	 
	 var warsHTML = Mustache.render(template,imgObj);
	 $("#sith").html(warsHTML);
 	}
 	});
	

    var Router = Backbone.Router.extend ({
      initialize:function(){
        Backbone.history.start({pushState:true});
      },
      routes:{
        "URL/:objectId":"URL",
        "":"index"
      }
    });

//Descriptions and user
var router = new Router();
router.on('route:URL', function(objectId){
var info = {'deathstar': ImageCollection.get(objectId).toJSON()};
var userinfoTemplate = $("#userinfoTemplate").text();
var userHTML = Mustache.render(userinfoTemplate ,info);
$("#jedi").html(userHTML);
	$("#sith").hide();
	$("#jedi").show();
	});

	//the clicky thingy
		router.on('route:index' , function(){
		$("#sith").show();
		$("#jedi").hide();
	});
  $("body").on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });

		
		