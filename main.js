$(document).ready(function() {

    var Animals = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            Description: null,
            type: null,
            title: null,
            url: null
        },
        _parse_class_name: "animal"
    });

    //collection
    var Zoo = Backbone.Collection.extend({
        model: Animals,
        _parse_class_name: "animal"
    });

    var AnimalCollections = new Zoo();

    AnimalCollections.fetch({
        success:function (response) {
            var animalObj = {"mAnimalPics":response.toJSON()};
            var animalPicTemplate = $("#animalPicTemplate").text();
            var animalHTML = Mustache.render(animalPicTemplate, animalObj);
            $("#picturePageDiv").html(animalHTML);
            console.log("success: ", response);
        },
        error: function (problem) {
            console.log("error: ", problem);
        }
    });
    
    $("#saveButton").on('click', function(e) {
        e.preventDefault();
        var animalSave = new Animals();
        animalSave.set({
            url: $("#saveImg").val(),
            title: $("#saveTitle").val(),
            Description: $("#saveDescription").val()
        })
        $("#saveImg").val("");
        $("#saveTitle").val("");
        $("#saveDescription").val("");
        animalSave.save(null, {
            success: function(response) {
                console.log("success", response);
            },
            error: function(problem) {
                console.log("error ", problem);
            }
            });
            
        location.href="/";
            
    });


    //click to add



    //routing
    var Router = Backbone.Router.extend ({
        initialize:function(){
            Backbone.history.start({pushState:true});
        },
            routes:{//routes to pages
                "edit/:objectId":"edit",
                "add":"add",
                "detail/:objectId":"detail",
                "":"index"
            }
    });

    var router = new Router();
    
    //2nd page
    router.on('route:detail', function(objectId) {
        var animalObj2 = {'mAnimalDescription': AnimalCollections.get(objectId).toJSON()};
        var animalDescriptionTemplate = $("#animalDescriptionTemplate").text();
        var animal2HTML = Mustache.render(animalDescriptionTemplate, animalObj2);
        $("#detailPageDiv").html(animal2HTML);
        $("#picturePageDiv").hide();
        $("#addPageDiv").hide();
        //$("#detailPageDiv").toggleClass();
        $("#detailPageDiv").show();
    });

    //home page
    router.on('route:index', function(objectId) {
        $("#picturePageDiv").show();
        $("#detailPageDiv").hide();
        $("#addPageDiv").hide();
        $("#editPageDiv").hide();
    });

    router.on('route:add', function() {
        $("#addPageDiv").toggleClass();
        $("#addPageDiv").show();
        $("#picturePageDiv").hide();
        $("#detailPageDiv").hide();
        $("#editPageDiv").hide();
    });

//save added photo album info here
    


    router.on('route:edit', function(objectId) {
        var animalObj4 = {'mAnimalEditTemplate': AnimalCollections.get(objectId).toJSON()};
        var animalEditTemplate = $("#animalEditTemplate").text();
        var animal4HTML = Mustache.render(animalEditTemplate, animalObj4);
        $("#editPageDiv").html(animal4HTML);
        $("#editPageDiv").show();
        $("#picturePageDiv").hide();
        $("#detailPageDiv").hide();
        $("#editPageDiv").hide();
    });


    $("body").on('click', 'a', function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        href = href.substr(1);
        router.navigate(href,{trigger:true});
    });

    //var routerDetail = new Router();
    //router.on('route:')




});//closes document ready
