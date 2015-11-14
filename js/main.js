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

  var newPhoto = new Title();

  PhotoCollection.fetch({
    success: function(resp) {
      var dataObj = {"data": resp.toJSON()};
      console.log(dataObj);
      var photoTemplate = $("#photoTemplate").text();
      var photoHTML = Mustache.render(photoTemplate, dataObj);
      $("#photoInject").html(photoHTML);
      console.log("success: ", resp);
    }, error: function (err) {
      console.log("error: ", err);
    }
  });

  $("#submit").on("click", function(e){
    e.preventDefault();
    var newDog = new Title();
    newPhoto.set({
      URL: $("#URL").val(),
      Detail: $("#Detail").val(),
      Title: $("#Title").val()
    })
    $("#URL").val(""),
    $("#Detail").val(""),
    $("#Title").val("");   
      newPhoto.save(null,{
        success: function(resp){
          PhotoCollection.fetch({
            success: function(resp){
            }, error: function(err){
          }
        }) 
        }, error: function (err) {
          console.log("error: ", err);
        }
      })
      location.href="/"
  });


  /*$("#edit").on("click", function(e){
    e.preventDefault();
    var editDog = new Title();
    editDog.Detail({
      success:function(Title) {
        editDog.save(null, {
          success:function(editDog){
            editDog.set({
              Detail:
            })
            editDog.save();
            location.href="/user/"
          }
        })
      }
    })
  });*/

 $("#submitEditButton").on("click", function(e){
    e.preventDefault();
    var editDog = new Title();
    editDog.set({
      Detail: $("#newDetailInput").val(),
      URL: 
    })
    $("#newDetailInput").val(""),
      editDog.save(null,{
        success: function(resp){
          PhotoCollection.fetch({
            success: function(resp){
            }, error: function(err){
          }
        }) 
        }, error: function (err) {
          console.log("error: ", err);
        }
      })
  });

  var Router = Backbone.Router.extend({
    initialize: function () {
      Backbone.history.start({pushState: true});
    },
    routes: {
      "dog/:objectId": "dog",
      "detail": "detail",
      "add": "add",
      "edit/:objectId": "edit",
      "":"index"
    }
  });

  var router = new Router();

  router.on("route:dog", function(objectId) {
    var dog = new Title({objectId: objectId});
    dog.fetch({
      success: function(resp) {
        var detailObj = {"detailData": resp.toJSON()};
        var detailTemplate = $("#detailTemplate").text();
        var detailHTML = Mustache.render(detailTemplate, detailObj);
        $("#detailInject").html(detailHTML);
        $("#photoInject").hide();
        $("#detailInject").show(); 
      }, error: function(err) {
        console.log("error", err);
      }
    })
  });

  router.on("route:index", function () {
    $("#photoInject").show();
    $("#addData").removeClass("displayBlock");
    $("#addData").addClass("displayNone");
  });

  router.on("route:add", function () {
    $("#photoInject").hide();
    $("#addData").removeClass("displayNone");
    $("#addData").addClass("displayBlock");    
  });

  router.on("route:edit", function (objectId) {
    $("#editDiv").removeClass("displayNoneEdit");
    $("#editDiv").addClass("editDivBlock"); 
    $("#photoDetail").hide();
  });

  $("body").on("click", "a", function(e) {
    e.preventDefault();
    var href = $(this).attr("href");
    href = href.substr(1);
    router.navigate(href, {trigger:true});
  });
});


