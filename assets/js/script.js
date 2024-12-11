(function ($) {
    $(document).ready(function() {
        ///////// **mobile size** /////////
        $('.menu-bar').click(function () {
        $(this).toggleClass("nav_btn");
        $('.main-nav').toggleClass('open-nav');
        $('body').toggleClass('active-sidenav');
        });

        
        // Smooth scroll to top on arrow click
        $('.arrow-up').hide();
        $('.arrow-up').click(function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 800, 'swing'); // Smooth scroll to top
        });
        ///////// **main Slider** /////////
        var mainSlider = new Swiper('.main-slider .swiper', {
            loop: true,
            autoplay: true,
            slidesPerView: 1,
            preloadImages: false,
            updateOnWindowResize: true,
            speed: 1000,
            
            // If we need pagination
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
            // Navigation arrows   
            navigation: {
                nextEl: '.main-slider .swiper-button-next',
                prevEl: '.main-slider .swiper-button-prev',
            },
            on: {
                init: function (swiper) {
                    lazyLoad();
                },
                },
        });

       ///////// ** Our Partners Slider** /////////
       var Partners = new Swiper('.partners-row .swiper', {
            loop: true,
            autoplay: {
                    delay: 3000,
                },
            speed: 1000,
            updateOnWindowResize: true,
            breakpoints: {
                0: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                992: {
                    slidesPerView: 6,
                    spaceBetween: 15,
                },
                1199: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
            },
            on: {
                init: function (swiper) {
                lazyLoad();
                },
            },
        });


               ///////// ** testimonials Slider** /////////
       var testimonials = new Swiper('.testimonials-row .swiper', {
        loop: true,
        slidesPerView: 1,
        autoplay: {
                delay: 3000,
            },
        speed: 1000,
        updateOnWindowResize: true,
        // Navigation arrows   
        navigation: {
            nextEl: '.testimonials-row .swiper-button-next',
            prevEl: '.testimonials-row .swiper-button-prev',
        },
        on: {
            init: function (swiper) {
            lazyLoad();
            },
        },
    });
          

        $('.main-icons').click(function() {    	
            $(this).parent().toggleClass("active");
            // $('.text4').toggleClass("visible");
        });

        // lazy load
        lazyLoad();
    });


    $(window).scroll(function () {
        staticsScroll();
        updateProgressCircle();
    });

    /*************************statistics *******************/

    var viewed = false;

    function isScrolledIntoView(elem) {
        if (!elem.length) return false; // Check if the element exists
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }

    function staticsScroll() {
        var $statNum = $(".stat-num");
        if ($statNum.length && isScrolledIntoView($statNum) && !viewed) {
            viewed = true;
            $statNum.each(function() {
                var $this = $(this),
                    countTo = $this.attr("data-count");
                $({ countNum: $this.text() }).animate(
                    {
                        countNum: countTo
                    },
                    {
                        duration: 3000,
                        easing: "swing",
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    }
                );
            });
        }
    }

    // Function to update the progress circle
    function updateProgressCircle() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var scrollPercent = (scrollTop / docHeight) * 100;
        $(".progress-circle").css("background", 
            `conic-gradient(var(--secondery-color) ${scrollPercent}%, transparent ${scrollPercent}% 100%)`
        );

        if (scrollTop >= 500) {
            $(".arrow-up").fadeIn(300);
        } else {
            $(".arrow-up").fadeOut(300);
        }
    }

    
    /**********lazy load ***********/
    function lazyLoad() {
        const images = document.querySelectorAll(".lazy-img");
    
        const optionsLazyLoad = {
            //  rootMargin: '-50px',
            // threshold: 1
        };
    
        const imageObserver = new IntersectionObserver(function (enteries) {
            enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
            });
        }, optionsLazyLoad);
        
        images.forEach(function (image) {
            imageObserver.observe(image);
        });
        }
        
        function preloadImage(img) {
        img.src = img.getAttribute("data-src");
        img.onload = function () {
            img.parentElement.classList.remove("loading-img");
            img.parentElement.classList.add("loaded-img");
            // img.parentElement.parentElement.classList.add("lazy-head-img");
        };
        }
})(jQuery)