$(document).ready(function () {

  ;(function () {

    var w = $(window);

    // default options
    var defaults = {
      speed : 0.5,
      delay: 0,
      parentId: null
    }    


    // ScrollEffectObject Class
    function ScrollEffectObject (elem,o) {
      
      // setup options
      var o = typeof o === 'object' ? o : {},
          opts = $.extend({},defaults,o);

      // setup vars
      var elem = $(elem),
          wHeight = w.height(),
          trigger = $('#'+opts.parentId).offset() ? $('#'+opts.parentId) : elem;
          triggerTop = trigger.offset().top,
          breakpoint = triggerTop - (wHeight*0.4);

      console.log(triggerTop);

      elem.css({
        '-webkit-transition': 'all '+ opts.speed +'s '+ opts.delay +'s ease',
        '-o-transition': 'all '+ opts.speed +'s '+ opts.delay +'s ease',
        'transition': 'all '+ opts.speed +'s '+ opts.delay +'s ease'
      });

      function animateOnScroll (argument) {
        var scrollTop = w.scrollTop();
          
        if ( scrollTop > breakpoint && !elem.hasClass('animated')) 
        {
            elem.addClass('animated');
        }        
      }

      animateOnScroll();

      $(window)
      .scroll(animateOnScroll)
      .resize(function(){        
          if ( elem.offset().top !=  elemTop )    {
              elemTop = elem.offset().top;
              breakpoint = elemTop - (wHeight/2),
              wHeight = w.height();
          }
      });      

    }

    // instantiate ScrollEffectObject
    $('[data-animate-entry]').each(function(){
       
      var e = $(this),
          speed = e.attr('animate-entry-speed'),
          delay = e.attr('animate-entry-delay') | 0,
          parentId = e.attr('data-parent'),      
          obj = new ScrollEffectObject(e,{speed,delay,parentId});    

    });



  })();


});
