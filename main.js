var Container = Backbone.Model.extend({
  initialize: function(){
  },
  defaults: {
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

var Router = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start({pushState: true});
  },
    route: {
      "image/:objectId": "image",
      "": "index"
  }
});

var router = new Router();


$('body').on('click','a', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  href = href.substr(1);
  router.navigate(href, {trigger:true});
});
























