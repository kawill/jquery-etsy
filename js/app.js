window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/lodash.min.js"},
        {url: "./bower_components/backbone/backbone.js"},
        {url: "./js/etsy.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;
        // start app?

        var api_key = "n9sz8fruol3xyetzq7epocvd";
        window.ey = new EtsyListing (api_key);
        $("form").on("submit", function(event){
            event.preventDefault();
            window.location.hash = '#/search/'+this.querySelector('input').value;
        })

    })

}