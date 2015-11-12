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

var ContainersCollection = new Contianers();

ContainersCollection.fetch({
  success: function(resp) {
    var dataObj = {"data": resp.toJSON()};
    var urlTemplate = $("#urlTemplate").text();
    var urlHTML = Mustache.render(urlTemplate, dataObj);
    $("#pictureContianer").html(urlHTML);
  }
})