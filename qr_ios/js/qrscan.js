(function(root,factory){
typeof define =='function' && define.amd?define([],factory):module.exports=factory();

})(this,function(){

define("getUserMedia",[],function(){
  var navObj;
  navObj=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    console.log("Yeah! can access user mediaDevices");
    return navObj;

});
/*define("Capture",["getUserMedia"],function(e){
  console.log(navObj);

});*/


});//end of main IIFE : anonymous function to quicken the qr scan
