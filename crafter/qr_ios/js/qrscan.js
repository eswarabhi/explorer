(function(root,factory){
  //configuration setup
  "function" == typeof define?define(["EventEmitter"],factory):module.exports=factory();

})(this,function(EventEmitter){
  //module definition
  var media;
  if(media=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
    console.log("Media Devices can be accessible");
  var i = function() {
        this.domElement = document.createElement("video"),
        this.domElement.setAttribute("muted", ""),
        this.domElement.setAttribute("autoplay", ""),
        this.domElement.setAttribute("playsinline", "")
    };
      i.prototype = Object.create(EventEmitter.prototype);
      console.log(i.prototype);
}); //end of main module
