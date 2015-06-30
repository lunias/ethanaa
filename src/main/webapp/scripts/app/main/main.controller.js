'use strict';

angular.module('ethanaaApp')
    .controller('MainController', function ($scope, Principal) {
    	
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
        
        $scope.age = getMyAge(new Date(1988, 5, 29));
        
        function getMyAge(birthday) {
        	
            var ageDiff = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDiff);            
            
            return Math.abs(ageDate.getUTCFullYear() - 1970);        	
        }
        
        var currentMonth = new Date().getMonth() + 1;
        $scope.avatarNumber = currentMonth > 4 && currentMonth < 10 ? 5 : 4;
        
		// jQuery for page scrolling feature - requires jQuery Easing plugin
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop : $($anchor.attr('href')).offset().top
			}, 1200, 'easeInOutExpo');
			event.preventDefault();			
		});

		$('#navbar').on('activate.bs.scrollspy', function () {
			var activeSection = $(".nav li.active > a").attr('href');
			if (activeSection === '#resume') {
				resizeFn(200);
			}
		});		
		
		var callback = function() {	
			
			$('.item-skills').each(
					function() {
						var newWidth = $(this).parent().width()
								* $(this).data('percent');
						$(this).width(0);
						$(this).animate({
							width : newWidth,
						}, 1000);
					});
			
			$('.icons-red').each(function() {
				var height = $(this).height();
				$(this).animate({
					height : 14,
				}, 2000);
			});
			
		};
		callback();
		
		var resize;
		var resizeFn = function(timeout) {
			
			var timeout = timeout || 100;
			
			clearTimeout(resize);
			resize = setTimeout(function() {
				callback();
			}, timeout);				
		};

		window.onresize = resizeFn;        
    });
