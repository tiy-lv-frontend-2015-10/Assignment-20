$(document).ready(function() {
var Gif = Backbone.Model.extend({
  initialize: function () {
  },
  defaults: {
    url: null,
    Description: null
  },
  _parse_class_name: "Gifs",
});

  var Gifs = Backbone.Collection.extend({
    model: Gif,
    _parse_class_name: "Gifs"
  })

  var GifCollection = new Gifs();
  var gif = new Gif();
  GifCollection.fetch({
   success: function(resp) {
      var gifObj = {"gifs" : resp.toJSON()};
      var homeTemplate = $("#homeTemplate").text();
      var homeHTML = Mustache.render(homeTemplate, gifObj);
        $("#home").html(homeHTML);
          console.log("success: ", resp);
        },error: function (err) {
          console.log("error: ", err);
        }
  });
      $("#submit").on("click", function(){
      var gif = new Gif();
      gif.set({
        url: $("#url").val(),
        Description: $("#decription").val()
      })
 	    gif.save(null, {
      success: function(resp){
      },error: function(err){
        console.log("error ", err);
      }
       })
      });

  var Router = Backbone.Router.extend({
    initialize: function(){
      Backbone.history.start({pushState: true});
    },
    routes: {
    "add":"add",
    "edit":"edit",
   	"details/:objectId" : "details",
    "": "index"
  }
  });
  var router = new Router();

router.on('route:details', function(objectId){
    var gif = new Gif({objectId: objectId});
    gif.fetch({
      success: function(resp){
      var gifsObj = {'details': resp.toJSON()};
      var detailsTemplate = $("#detailsTemplate").text();
      var detailsHTML = Mustache.render(detailsTemplate, gifsObj);
        $("#details").html(detailsHTML);
        $("#home").hide();
        $("#details").show();
      },error: function(err){
        console.log("error ", err);
      }
  })
  });
  
  router.on('route:index', function(){
    $("#home").show();
    $("#details").hide();
    $("#add").hide();
  });

  router.on("route:edit", function () {
    console.log("edit");
  });

  router.on('route:add', function(){
    $("#add").show();
    $("#home").hide();

  });



  $("body").on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });


});
