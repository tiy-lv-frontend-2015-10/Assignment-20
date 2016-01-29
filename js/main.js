//require("../css/normalize.css");
//require("../main.css")

var instagram = Backbone.Model.extend({
    initialize: function() {
        console.log("Amazing places in the planet");
    },
    defautls: {
        URL: null, 
        description: null,
    },
    validate: function (attrs) {
       if (!attrs.description) {
        return "Description is required";
       }
       if (typeof attrs.description !== "string"){
        return "Description must be a string";
       }
    },

    parse_class_name: "instagram",
  idAttribute:"objectId"

});

var Instagrams = Backbone.Collection.extend({
    model: instagram,
    _parse_class_name: "instagram"
});

var InstagramsCollection = new Instagrams();

var Router = Backbone.Router.extend({
    initialize: function(){
        Backbone.history.start({pushState: true});
    },


    routes: {
        "details/:objectId":"details",
        "": "index"
    },

    index: function(){
        InstagramsCollection.fetch({
            success: function (resp){
                var dataBase = {"instagram": resp.toJSON()};
                var template = $("#photosTemplate").text();
                var data = Mustache.render(template, dataBase);
                $("#photos").html(data);

                // remove any remaining details if we go home
                $("#photosDetailpage").html("");
            },
            error: function(err){
                console.log("error:",err);
            }
        });
    }

});


var router = new Router
router.on("route:details",function(objectId){
    console.log(objectId);
    var instagram = InstagramsCollection.get(objectId).toJSON();
    console.log(instagram);
    var template = $("#DescriptionTemplate").text();
    var data = Mustache.render(template,instagram);
    $("#photosDetailpage").html(data);
    $("#photos").hide();
    $("#photosDetailpage").show();
});

router.on("route:index", function(){
    $("#photos").show();
    $("#photosDetail").hide();
})

$("body").on('click', 'a[href^="/"]', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  href = href.substr(1);
  router.navigate(href, {trigger:true}); 
});
