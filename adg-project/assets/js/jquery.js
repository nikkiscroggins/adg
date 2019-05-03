/*$(window).scroll(function() {
		$('#animatedElement').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+400) {
				$(this).addClass("slideUp");
			}
		});
	});*/

// this file was for the css keyframes in viewport 

  $(document).ready(function() {

    var $animationElements = $('.animation-element');
    var $window = $(window);

    /*
    // For removing on smaller devices
    var isMobile = window.matchMedia("only screen and (max-width: 768px)");
    if (isMobile.matches) {
        $animationElements.removeClass('animation-element');
    }*/

    function checkIfInView() {

        var windowHeight = $window.height();
        var windowTopPosition = $window.scrollTop();
        var windowBottomPosition = (windowTopPosition + windowHeight);

        $.each($animationElements, function () {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = (elementTopPosition + elementHeight);

//check to see if this current container is within viewport
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });
    }

    $window.on('scroll resize', checkIfInView);
    $window.trigger('scroll');


});
