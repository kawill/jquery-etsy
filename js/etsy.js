;
(function() {

    function EtsyListing(api_key) {
        this.api_key = api_key;
        this.listings = [];

        var self = this;
        var EtsyRouter = Backbone.Router.extend({
            routes: {
                "listings": "drawListingInfo"
            },
            drawListingInfo: function() {

                self.drawListing()
            },
            initialize: function() {
                Backbone.history.start();
            }
        })
        var router = new EtsyRouter();

        this.drawListing();
    }

    EtsyListing.prototype = {
        URLs: {
            listings: function() {
                return "https://openapi.etsy.com/v2/listings/active.js?includes=Images:1"
            },


        },
        access_token: function() {
            return "&api_key=" + this.api_key + "&callback=?"
        },

        loadTemplate: function(template_name) {
            // modify the event context, return only the data
            return $.get("./templates/" + template_name + ".html").then(function(d, s, p) {
                return d;
            })
        },


        getListingData: function() {
            return $.getJSON(this.URLs.listings() + this.access_token()).then(function(d, s, p) {
                // console.log(d);
                return d;
            });
        },


        drawListing: function() {
            $.when(
                this.getListingData(),
                this.loadTemplate("listing")
            ).then(function(listing, html) {
                // console.log(listing)
                var output1 = " ";

                //     console.log(html)
                var compiledFunction = _.template(html)
                listing.results.forEach(function(result) {
                    var output2 = compiledFunction(result);
                    output1 += output2;
                })

                $('.etsy-grid').append(output1);


            })
        }
    }

    // var htmlFromFile = '<%=  hello %>'//typeof string

    // var compiledFunction = _.template(htmlFromFile) //_.template returns a function

    // var result = compiledFunction({hello: 'jkjlj'}); //pass object to function and function returns a string

    // console.log(result)

    window.EtsyListing = EtsyListing;

})();
