(function(){
    'use strict';

    var cloudRecognition =  new craftar.CloudRecognition({
        token: 'catchoomcooldemo'
    });

    var finderResults = false;

    function init(){

        var scanButton = document.querySelector( '#scan' );
        var spinnerElement = document.getElementById('spinner');

        if ( craftar.supportsCapture() ){

            setupCapture(function( err, captureObject ){

                if ( err ){
                    // Capture setup failed (user rejected to open the camera)
                    // switch to selector mode
                    switchToSelector();
                }else{

                    var captureDivElement = document.getElementById( 'videoCapture' );
                    captureDivElement.appendChild( captureObject.domElement );

                    setCaptureResultsListener();
                    
                    scanButton.addEventListener( 'click', function(){
                        spinnerElement.setAttribute("class", "spinner");
                        finderResults = false;
                        cloudRecognition.startFinder( captureObject, 2000, 3);
                    });
                }

            });

        }else if( craftar.supportsImageSelector() ){
            // Capture not supported, switch to selector mode
            switchToSelector();
        }else{

            alert("This browser doesn't support HTML5 features needed for CraftAR HTML5 Library");

        }

    };

    function switchToSelector() {
        var scanButton = document.getElementById('scan');
        var selectorElement = document.getElementById('selectorElement');
        var spinnerElement = document.getElementById('spinner');

        $("#selectorElement").prettyfile({
            html: "Choose an image"
        });

        scanButton.setAttribute("class", "hidden");
        selectorElement.removeAttribute("class", "hidden");


        var selector = new craftar.ImageSelector(selectorElement);
        selector.addListener('image', function(craftarImage) {
            spinnerElement.setAttribute("class", "spinner");
            cloudRecognition.search(craftarImage);
        });
        setSelectorResultsListener();
    }

    window.addEventListener("load", init, false);

    function setupCapture( callback ){

        var capture = new craftar.Capture();

        capture.addListener('started', function(){

            callback( null, capture );

        });

        capture.addListener('error', function( error ){

            callback( error, capture );

        });

        capture.start();

    }

    function setSelectorResultsListener() {
        cloudRecognition.addListener('results', function(error, results, xhr) {
            var spinnerElement = document.getElementById('spinner');
            spinnerElement.setAttribute("class", "spinner hidden");

            if (results.results && results.results.length > 0) {
                renderResults( results );
            } else {
                alert("No results found, select an image that contains an object to scan.");
            }
        });
    }

    function setCaptureResultsListener() {
        cloudRecognition.addListener('results', function(err, results, xhr){

            if (results.results && results.results.length > 0) {
                finderResults = true;
                renderResults( results );
                cloudRecognition.stopFinder();
                var spinnerElement = document.getElementById('spinner');
                spinnerElement.setAttribute("class", "spinner hidden");
            }
        });

        cloudRecognition.addListener('finderFinished', function(){
            var spinnerElement = document.getElementById('spinner');
            spinnerElement.setAttribute("class", "spinner hidden");
            if (!finderResults) {
                alert("No results found, point to an object.");
            }
        });
    }

    function renderResults( results ){
        var resultItem = results.results[0];

        var template = document.getElementById("resultTemplate");
        var resultsElement = document.getElementById( 'resultList' );
        var spinnerElement = document.getElementById('spinner');

        var itemHTML =  Handlebars.compile(template.innerHTML);

        var resultEl = document.createElement('div');
        resultEl.innerHTML = itemHTML({thumbnailUrl: resultItem.image.thumb_120, itemUrl: resultItem.item.url, itemName: resultItem.item.name});
        resultsElement.insertBefore(resultEl, resultsElement.firstChild);
    };

})();
