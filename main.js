$(document).ready(function() {
    var Animals = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            Description: null,
            Type: null,
            URL: null
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
            $("#picturePage").html(animalHTML);
        }
    });
    
    //router
    var router = new Router();
    
    router.on('route:name')
    
    
    
});//closes document ready