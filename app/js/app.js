var app = (function() {

	'use strict';
	var privateVariable = 'app fired!',
		docElem = document.documentElement;

	return {
		publicFunction: function() {
			console.log(privateVariable);
		},

		userAgentInit: function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},

		navigation: function()
		{
			var trigger  = document.querySelectorAll('.js-trigger-nav')[0],
				nav      = document.querySelectorAll('.js-nav')[0],
				content  = document.querySelectorAll('.js-content')[0],
				isActive = false;

			trigger.addEventListener('click', function(e)
			{
				var t = this;

				if (isActive) {
					// link active state
					t.classList.add('syn-toggle-nav--is-inactive');
					t.classList.remove('syn-toggle-nav--is-active');

					// nav active state
					nav.classList.add('syn-nav--is-inactive');
					nav.classList.remove('syn-nav--is-active');

					// content active state
					content.classList.add('syn-nav--is-inactive');
					content.classList.remove('syn-nav--is-active')

					isActive = false;
				}
				else {
					// link active state
					t.classList.add('syn-toggle-nav--is-active');
					t.classList.remove('syn-toggle-nav--is-inactive');

					// nav active state
					nav.classList.add('syn-nav--is-active');
					nav.classList.remove('syn-nav--is-inactive');

					// content active state
					content.classList.add('syn-nav--is-active');
					content.classList.remove('syn-nav--is-inactive')

					// nav active state
					isActive = true;
				}

				e.preventDefault();
			});
		},

		searchForm: function()
		{
			var form          = document.querySelectorAll('.js-search')[0],
				keywords      = document.querySelectorAll('.js-kewords')[0],
				clearKeywords = document.querySelectorAll('.js-clear-keywords')[0],
				nav           = document.querySelectorAll('.js-nav')[0];

			keywords.onfocus = function()
			{
				// set form active
				form.classList.add('syn-search--is-active');
				form.classList.remove('syn-search--is-inactive');

				// blur out nav
				nav.classList.add('syn-nav--field-is-active');
				nav.classList.remove('syn-nav--field-is-inactive');
				console.log('Focus');
			};

			keywords.onblur = function()
			{
				// set form inactive
				form.classList.add('syn-search--is-inactive');
				form.classList.remove('syn-search--is-active');

				// unblur nav
				// blur out nav
				nav.classList.add('syn-nav--field-is-inactive');
				nav.classList.remove('syn-nav--field-is-active');
				console.log('Blur');
			};

			// clear text input

			clearKeywords.addEventListener( 'click', function(e)
			{
				keywords.value = '';
				e.preventDefault();
			});
		},

		headerScroll: function()
		{
			var header = document.querySelectorAll('.js-app-header')[0];

			var scrollPosition = pageYOffset,
				prevScrollPosition = 0;

			window.onscroll = function(e) {

				// get direction of scroll

				var scrollDirection,
					scrollPosition = pageYOffset;

				if ( scrollPosition > prevScrollPosition ) {
					scrollDirection = 'down';
				} else {
					scrollDirection = 'up';
				}

				if ( scrollDirection === 'up' ) {
					header.classList.add('syn-app__header--no-transition');
				} else {
					header.classList.add('syn-app__header--transition');
				}

				// set class based on scroll position and direction

				prevScrollPosition = scrollPosition;

				if (scrollPosition > 60) {
					header.classList.add('syn-app__header--scroll');
					header.classList.remove('syn-app__header--default');
					header.style.top = scrollPosition + 'px';
				} else {
					header.classList.add('syn-app__header--default');
					header.classList.remove('syn-app__header--scroll');
					header.style.top = '0px';
				}

			}

		}

	};

})();

(function() {

	'use strict';

	//foundation init
	$(document).foundation();

	app.publicFunction();
	app.userAgentInit();
	app.navigation();
	app.searchForm();
	app.headerScroll();

})();