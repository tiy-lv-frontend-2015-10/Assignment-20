$(document).ready (function() {
var Title = Backbone.Model.extend({
    initialize: function () {
  },
    defaults: {
      URL: null,
      Title: null,
      Detail: null
  },
    _parse_class_name: "Title",
});

var Photos = Backbone.Collection.extend({
    model: Title,
    _parse_class_name: "Title"
})

var PhotoCollection = new Photos();

PhotoCollection.fetch){
  success: function(resp) {
    var dataObj = {"data": resp.toJSON()};
    var 
  }
}

});














/***************************


ContactCollection.fetch({
  success: function(resp) {
    var dataObj = {"data": resp.toJSON()};
    var theListTemplate = $("#theListTemplate").text();
    var listHTML = Mustache.render(theListTemplate, dataObj);
    $("#listTemplate").html(listHTML);
    console.log("success: ", resp);
  }, error: function (err) {
    console.log("error: ", err);
  }
});

 var Router = Backbone.Router.extend({
    initialize: function () {
      Backbone.history.start({pushState: true});
  },
    routes: {
      "person/:objectId": "person",
      "contact": "contact",
      "":":index"
  }
  });

 var router = new Router();

  router.on("route:person", function(objectId) {
    var person = new Lname({objectId: objectId});
    person.fetch({
      success: function(resp) {
      var dataObj = {"data": resp.toJSON()};
      var theSingleTemplate = $("#theSingleTemplate").text();
      var data2HTML = Mustache.render(theSingleTemplate, dataObj);
        $("#singleTemplate").html(data2HTML);
        $("#listTemplate").hide();
        $("#singleTemplate").show(); 
      }, error: function(err) {
        console.log("error", err);
      }
})
});

router.on("route:index", function () {
    $("listTemplate").show();
    $("singleTemplate").hide(); 
});

router.on("route:contact", function (){
    console.log("contact");
});

router.on("route:index", function (){
    console.log("home page");
});

$("body").on("click", "a", function(e) {
  e.preventDefault();
  var href = $(this).attr("href");
  href = href.substr(1);
  router.navigate(href, {trigger:true});
});
});






 



/*****






    /*console.log(resp.toJSON());
    var listTemplate = $("#listTemplate").text();
    var theHTML = Mustache.render(listTemplate, resp.toJSON());
    $("#listView").html(theHTML);
    var singleTemplate = $("#singleTemplate").text();
    var theHTML = Mustache.render(singleTemplate, resp.toJSON());
    $("#singleView").html(theHTML);*/