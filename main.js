var Container = Backbone.Model.extend({
  initialize: function(){
  },
  defaults: {
    user: null,
    url: null,
    detail: null,
    title: null
  },
  Model: Container,
  _parse_class_name: "Container"
});

var Containers = Backbone.Collection.extend({
  Model: Container,
  _parse_class_name: "Container"
});

var ContainersCollection = new Containers();

ContainersCollection.fetch({
  success: function(resp) {
    var dataObj = {"data": resp.toJSON()};
    var urlTemplate = $("#urlTemplate").text();
    var urlHTML = Mustache.render(urlTemplate, dataObj);
    $("#pictureContainer").html(urlHTML);
      console.log("success: ", resp);
    }, error: function (err) {
      console.log("error: ", err);
  }
});

$("#addButton").on('click', function() {
  var container = new Container();
  container.set({
    user: $("#addUser").val(),
    url: $("#addImage").val(),
    title: $("#addTitle").val(),
    detail: $("#addDetail").val()
  })
  $("#addImage").val("");
  $("#addTitle").val("");
  $("#addDetail").val("");
  container.save(null, {
    success: function(resp){
      console.log("success", resp);
    },
    error: function(err) {
      console.log("error", err);
    }
  });
  router.navigate("/");
});

var Router = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start({pushState: true});
  },
    routes: {
      "image/:objectId": "image",
      "add": "add",
      "edit": "edit",
      "": "index"
  }
});

var router = new Router();

router.on("route:image", function(objectId) {
  var image = new Container({objectId: objectId});
  image.fetch({
    success: function(resp){
      var data2obj = {"data": resp.toJSON()};
      var detailTemplate = $("#detailTemplate").text();
      var detailHTML = Mustache.render(detailTemplate, data2obj);
      $("#detailContainer").html(detailHTML);
      $("#pictureContainer").hide();
      $("#detailContainer").show();
      console.log("success", resp);
    }, error: function(err) {
      console.log("error", err);
    }
  });
});

router.on('route:index', function(){
  $("#detailContainer").hide();
  $(".addPage").hide();
  $("#pictureContainer").show();
});

router.on("route:add", function() {
  $("#pictureContainer").hide();
  $(".addPage").show();
});

router.on("route:edit", function() {
  $("#detailContainer").hide();
  $(".editPage").show();
});

$(".addPage").hide();
$(".editPage").hide();

$('body').on('click','a', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  href = href.substr(1);
  router.navigate(href, {trigger:true});
});
























