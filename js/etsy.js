;
(function() {

    function EtsyListing(api_key) {
        this.api_key = api_key;
        this.listings = [];

        var self = this;
        var EtsyRouter = Backbone.Router.extend({
            routes: {
                "listing/:id": "drawDetails",
                "search/:keyword": "drawSearch",
                "*default": "drawListingInfo"
            },
            drawListingInfo: function() {
                self.drawListing()
            },
            drawDetails: function(id){
                self.drawDetailsInfo(id);
            },
            drawSearch: function(keyword) {
                self.drawSearchInfo(keyword);
            },
            initialize: function() {
                Backbone.history.start();
            }
        })
        var router = new EtsyRouter();

        // this.drawListing();
    }

    EtsyListing.prototype = {
        URLs: {
            listings: function() {
                return "https://openapi.etsy.com/v2/listings/active.js?includes=Images:1";
            },
            detail: function(id){
                return "https://openapi.etsy.com/v2/listings/"+id+".js?includes=Images:1";
            },
            search: function(){
                return "https://openapi.etsy.com/v2/listings/active.js?includes=Images:1";
            }
            //keywordURL = getDataURL + "&keywords=" + this.keywords

        },
        access_token: function() {
            return "&api_key=" + this.api_key + "&callback=?";
        },

        search_extra: function(keyword) {
            return "&keywords=" + keyword;
        },

        loadTemplate: function(template_name) {
            // modify the event context, return only the data
            return $.get("./templates/" + template_name + ".html").then(function(d, s, p) {
                return d;
            })
        },


        getListingData: function() {
            return $.getJSON(this.URLs.listings() + this.access_token()).then(function(d, s, p) {return d;});
        },

        getDetailData: function(id){
            return $.getJSON(this.URLs.detail(id) + this.access_token()).then(function(d, s, p) {return d;});
        },

        getSearchData: function(keyword){
            // return $.getJSON(this.URLs.search() + this.access_token() + this.search_extra(keyword)).then(function(d, s, p) {return d;});

            var url =   this.URLs.search() +
                        this.access_token() +
                        this.search_extra(keyword)

            console.log(url)

            var promise = $.getJSON(url)


            promise.then(function(d, s, p) {
                 return d;

            });



            return promise;


        },


        drawListing: function() {
            $.when(
                this.getListingData(),
                this.loadTemplate("listing") //"listing" = name of template file
            ).then(function(listings, html) { //receive data & html from template
                var compiledFunction = _.template(html);
                $('.container').html( compiledFunction(listings) );
            })
        },

        drawDetailsInfo: function(id){
            $.when(
                this.getDetailData(id),
                this.loadTemplate("detail") //"listing" = name of template file
            ).then(function(details, html) { //receive data & html from template
                var compiledFunction = _.template(html);
                $('.container').html( compiledFunction (details) );
            })
        },

        drawSearchInfo: function(keyword) {
            $.when(
                this.getSearchData(keyword),
                this.loadTemplate("search") //"listing" = name of template file
            ).then(function(listings, html) { //receive data & html from template

                var compiledFunction = _.template(html);

                $('.container').html( compiledFunction (listings[0]) );


            })
        }
    }

    // var htmlFromFile = '<%=  hello %>'//typeof string

    // var compiledFunction = _.template(htmlFromFile) //_.template returns a function

    // var result = compiledFunction({hello: 'jkjlj'}); //pass object to function and function returns a string

    // console.log(result)
    // $('body').on('click', '.listing', callback)

    window.EtsyListing = EtsyListing;

})();
