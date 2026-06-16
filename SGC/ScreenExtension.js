(function(ext) {
    var isCleanup = false;
    
    function getViewportWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    }
    
    function getViewportHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    }
    
    ext._shutdown = function() {
        isCleanup = true;
    };
    
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.getInnerWidth = function() {
        return getViewportWidth();
    };
    
    ext.getInnerHeight = function() {
        return getViewportHeight();
    };
    
    var descriptor = {
        blocks: [
            ['r', 'inner width', 'getInnerWidth'],
            ['r', 'inner height', 'getInnerHeight']
        ]
    };
    
    ScratchExtensions.register('Viewport Detector', descriptor, ext);
})({});
