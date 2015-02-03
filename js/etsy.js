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

            // this.listenToEvents();
            // this.draw();
        }

        EtsyListing.prototype = {
                URLs: {
                    listings: function() {
                        return "https://openapi.etsy.com/v2/listings/active.js"
                    },
        //             // "&callback=?" // <--- told jQuery to handle the request as JSONP
        // https://openapi.etsy.com/v2/listings/active.js?includes=Images:1&callback=?

            },
            access_token: function() {
                return "?api_key=" + this.api_key + "&callback=?"
            },
            /**
             * getData
             * @arguments none.
             * @return promise
             */
            // getData: function() {
            //     var x = $.Deferred(),
            //         self = this;

            //     if (this.members.length > 0) {
            //         x.resolve(this.members);
            //     } else {
            //         var p = $.get(this.URLs.members + this.access_token());
            //         p.then(function(data) {
            //             x.resolve(data);
            //             self.members = data;
            //         })
            //     }

            //     return x;
            // },

            loadTemplate: function(template_name) {
                // modify the event context, return only the data
                return $.get("./templates/" + template_name + ".html").then(function(d, s, p) {
                    return d;
                })
            },

            // listenToEvents: function() {
            //     var right_side = $(".github-grid > *:nth-child(2)");

            //     right_side.on("click", "a", function(event) {
            //         event.preventDefault();
            //         window.open(this.href, '_blank');
            //     })

            //     right_side.on("click", "input", function(event) {
            //         event.preventDefault();
            //         this.select();
            //     })
            // },

            // draw: function() {
            //     $.when(
            //         this.getData(),
            //         this.loadTemplate("menu-item")
            //     ).then(function(members, html) {
            //         // typeof html is "string"
            //         var left_column = document.querySelector(".github-grid > *:nth-child(1)");
            //         left_column.innerHTML = _.template(html, {
            //             members: members
            //         });
            //     })
            // },

            getListingData: function() {
                return $.getJSON(this.URLs.listings() + this.access_token()).then(function(d, s, p) {
                    return d;
                });
            },

            // getRepoList: function(username) {
            //     return $.get(this.URLs.repolist(username) + this.access_token()).then(function(d, s, p) {
            //         return d;
            //     });
            // },

            // getSortedRepoList: function(username) {
            //     return this.getRepoList(username).then(function(d, s, p) {

            //         d.sort(function(a, b) {

            //             var collection = [a, b];
            //             collection.forEach(function(v) {
            //                 if (!(v.updated_at instanceof Date)) {
            //                     v.updated_at = new Date(v.updated_at);
            //                 }
            //             })

            //             return a.updated_at > b.updated_at ? -1 : 1;
            //         })
            //         return d;

            //     })
            // },

            drawListing: function() {
                // load data
                // load template
                // draw to screen


                $.when(
                    this.getListingData(),
                    this.loadTemplate("listing")
                ).then(function(listing, html) {
                    // console.log(listing)
                   var buildastring = " ";

                //     console.log(html)
                    var compiledFunction = _.template(html)
                    listing.results.forEach(function(result){
                       var y = compiledFunction(result);
                       buildastring += y;
                    })

                    $('body').append(buildastring);


                // // listing.forEach()
                //     // var right_column = document.querySelector(".etsy-grid > *:nth-child(2)");
                //     // right_column.innerHTML = _.template(html, {
                //     //     listing: listing,

                //     // });
                })
            }
    }

    // var htmlFromFile = '<%=  hello %>'//typeof string

    // var compiledFunction = _.template(htmlFromFile) //_.template returns a function

    // var result = compiledFunction({hello: 'jkjlj'}); //pass object to function and function returns a string

    // console.log(result)

    window.EtsyListing = EtsyListing;

})();
