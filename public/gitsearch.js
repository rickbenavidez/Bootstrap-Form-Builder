(function () {
var window = this,
        $ = jQuery,
        controller,
        view,
        model,
        util;


util = {
  render: function(a,b){return(a+'').replace(/\{\{([^{}]+)}}/g,function(c,d){return d in(b||{})?(/^f/.test(typeof b[d])?b[d]():b[d]):c})},
};


controller = {

    bindEvents: function(){
      $("#inside").delegate("#addFunc", "submit", this.controller.sumbitForm)
    },

    submitForm : function (e) {
      e.preventDefault();
      var keycode = $("#keycode").text();
      var function = $("#function").text();
      this.model.keys
      model.keys[keycode] = fn
    },
    removeKey: function(keycode){
      delete model.keys[keycode];
    }
};

view = {
  showForm: function(key){
    $("#keycode").text(key)
    $("#overlay").fadeIn();
  },
  hideAndResetForm: function(){
    $("#keycode").text("");
    $("#overlay #inside textarea").text("");
    $("#overlay").fadeOut();
  }
};

model = {
        keys :  {
        },
        exportAMD: function(){}
}
$.extend(true, $.view, view);
})();



var getDifs = function(person, repo, branch, pg){
  var pg = 1;
  var loop = function(pg){
    $.get("https://github.com/api/v2/json/commits/list/"+person+"/"+repo+"/"+branch+"?page="pg, function(d){
      if(d.commits.length > 0) {
        d.commits.forEach(function(g){
          $.getJSON("https://github.com/api/v2/json/commits/show"+g.url.replace("/commit/","/"), function(e){
            console.log(e.commit.message)
            if(e.commit.modified){
              e.commit.modified.forEach(function(dff){
                console.log(dff.filename + " : - :"+dff.diff.split(/\n\-/).length + " + :"+dff.diff.split(/\n\+/).length)})
            } else{ console.log("none")}
          });
        });
      loop(pg++);
      }
    });
  }
}   
