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
      $("#url").val("");
      $("#decription").val("");
      gif.save(null, {
      success: function(resp){
      },error: function(err){
        console.log("error ", err);
      }
       });
       location.href="/";
      });

  var Router = Backbone.Router.extend({
    initialize: function(){
      Backbone.history.start({pushState: true});
    },
    routes: {
    "add":"add",
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
        $("#add").hide();
        $("#edit").hide();
        $("#details").show();
        $("#submit").on("click", function(){
      var gif = new Gif();
      gif.set({
        url: $("#url").val(),
        Description: $("#decription").val(),
        objectId: $("#objectId").val()
      })
      $("#url").val("");
      $("#decription").val("");
      $("#objectId").val("");
      gif.save(null, {
      success: function(resp){
      },error: function(err){
        console.log("error ", err);
      }
       });
       location.href="/";
      });
      },error: function(err){
        console.log("error ", err);
      }
  })
  });
    router.on('route:add', function(){
      $("#add").toggleClass();
      $("#home").hide();
      $("#edit").hide();
      $("#details").hide();
      $("#add").show();
      
    });
    
    router.on('route:index', function(){
      $("#details").hide();
      $("#add").hide();
      $("#edit").hide();
      $("#home").show();
    });


  $("body").on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });


});