define("getUserMedia",[],function(){
  "use strict";
  var e=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;
  return e
}),
define("Capture",["EventEmitter","getUserMedia"],function(e,t){
  "use strict";
  var i=function(e){
    this.domElement=e||document.createElement("video"),
    this.domElement.setAttribute("muted",""),
    this.domElement.setAttribute("autoplay",""),
    this.domElement.setAttribute("playsinline","")
  };
  i.prototype=Object.create(e.prototype);
  var n=function(e){try{this.domElement.srcObject=e}catch(t){this.domElement.src=URL.createObjectURL(e)}this.emitEvent("started")
  },
  o=function(e){this.emitEvent("error",[e])},
  r=function(e){if("undefined"!=typeof navigator.mediaDevices&&"undefined"!=typeof navigator.mediaDevices.enumerateDevices)navigator.mediaDevices.enumerateDevices().then(function(t){var i={video:!0},n=function(e){"videoinput"==e.kind&&(i={audio:!1,video:{optional:[{sourceId:e.deviceId}]}})};t.forEach(n),e(i)}).catch(function(t){e({video:!0})});else if("undefined"!=typeof MediaStreamTrack&&"undefined"!=typeof MediaStreamTrack.getSources){var t={video:!0},i=function(e){"video"==e.kind&&"environment"==e.facing&&(t={audio:!1,video:{optional:[{sourceId:e.id}]}})},n=function(n){n.forEach(i),e(t)};MediaStreamTrack.getSources(n)}else e({video:!0})
  };
  return i.prototype.start=function(){t?r(function(e){var i=window.navigator.userAgent;(i.match(/iPad/i)||i.match(/iPhone/i)||i.match(/iPod/i))&&(e.video.facingMode="environment",e.audio=!1),t.call(navigator,e,n.bind(this),o.bind(this))}.bind(this)):o.call(this,"Capture mode not supported, use craftar.supportsCapture to check if this browser/OS supports this mode")},i
}),
