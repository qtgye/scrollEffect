$(document).ready(function () {

  ;(function () {

    var w = $(window);

    // default options
    var defaults = {
      animation : '',
      speed : 0.5,
      delay: 0
    }
    // available animations
    var validAnims = [
      'descend',
      'ascend',
      'easeRight',
      'easeLeft'
    ]


    // ScrollEffectObject Class
    function ScrollEffectObject (elem,o) {
      
      // setup options
      var o = typeof o === 'object' ? o : {},
          opts = $.extend({},defaults,o);

      // setup vars
      var elem = elem,
          wHeight = w.height(),
          elemTop = elem.offset().top,
          breakpoint = elemTop - (wHeight*0.4);

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

      $(window)
      .scroll(animateOnScroll)
      .resize(function(){        
          if ( elem.offset().top !=  elemTop )    {
              elemTop = elem.offset().top;
              breakpoint = elemTop - (wHeight/2);
          }
      });

      animateOnScroll();

    }

    // instantiate ScrollEffectObject
    $('[data-animate-entry]').each(function(){
       
      var e = $(this),
          animation = e.attr('data-animate-entry'),
          speed = e.attr('animate-entry-speed'),
          delay = e.attr('animate-entry-delay') | 0,
          obj = new ScrollEffectObject(e,{animation,speed,delay});      

    });

  })();
  
});