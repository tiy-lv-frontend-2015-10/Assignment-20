$(document).ready(function() {
    
    var Animals = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            Description: null,
            type: null,
            url: null
        },
        _parse_class_name: "animal"
    });
    
    //collection
    var Animals = Backbone.Collection.extend({
        model: Animals,
        _parse_class_name: "animal"
    });
    
    var AnimalCollections = new Animals();
    
    AnimalCollections.fetch({
        success:function (response) {
            var animalObj = {"mAnimalPics":response.toJSON()};
            var animalPicTemplate = $("#animalPicTemplate").text();
            var animalHTML = Mustache.render(animalPicTemplate, animalObj);
            $("#picturePageDiv").html(animalHTML);
        }
    });
    
    //router
    var Router = Backbone.Router.extend ({
        initialize:function(){
            Backbone.history.start({pushState:true});
        },
            routes:{
                "url/:objectId":"url",
                "":"index"
                //"Description/:objectId":"Description",
                //"type/:objectId":"type"
            }
    });
    
    var router = new Router();
    router.on('route:url', function(objectId){
        var animalObj2 = {'mAnimalDescription': AnimalCollections.get(objectId).toJSON()};
        var animalDescriptionTemplate = $("#animalDescriptionTemplate").text();
        var animal2HTML = Mustache.render(animalDescriptionTemplate, animalObj2);
        $("#detailPageDiv").html(animal2HTML);
        $("#picturePageDiv").hide();
        $("#detailPageDiv").show();
    });
    
    router.on('route:index', function(){
        $("#picturePageDiv").show();
        $("#detailPageDiv").hide();
    });
    
    $("body").on('click', 'a', function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        href = href.substr(1);
        router.navigate(href,{trigger:true});
    });
    
    
    
    
    
    
});//closes document ready