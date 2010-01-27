var ShowMe = Class.create({
    options: {
        // How long the fade takes
        animationDuration: 0.25,
        
        // The initial delay time
        initialDelay: 0.25,

        // elementDelay is only used if sequential is true (turned on)
        sequential: false,          // whether to show each element sequentially
        sequentialDelay: 0.25       // delay between each element
    },
    
    initialize: function(selector, options) {
        this.options = Object.extend(Object.extend({ }, this.options), options || { });
        
        this.elements = $$(selector);
        
        // Hide all elements on domready (or when this is called)
        this.elements.each(function(element) {
            element.setOpacity(0);
        });
        
        // Store a reference to this ShowMe Instance
        ShowMe.Instances.push(this);
        
        // If window has already loaded, then call show manually
        if (ShowMe.windowLoaded) {
            this.show();
        }
    },
    
    show: function() {
        // Start show me with the given delay
        setTimeout(function() {
            var i = 0;
            this.elements.each(function(element) {
                // Not sequential, then no delay
                var delay = 0;
                
                // If sequential, then apply delay to emulate sequential loading
                if (this.options.sequential) {
                    delay = i++ * (this.options.animationDuration + this.options.sequentialDelay);                    
                }
                
                new Effect.Appear(element, { duration: this.options.animationDuration, delay: delay });
            }.bind(this));            
        }.bind(this), this.options.initialDelay * 1000);
    }
});

// Store all instances of ShowMe, so on window load we can access them
ShowMe.Instances = [];

// Used later to check if the window is already loaded or not
ShowMe.windowLoaded = false;

// On window load, go through all ShowMe instances and start showing the elements
Event.observe(window, "load", function() {
    ShowMe.windowLoaded = true;
    
    ShowMe.Instances.each(function(showMe) {
       showMe.show();
    });
});