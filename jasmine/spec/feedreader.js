/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {


	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		allFeeds.forEach(function (feed) {
			/* DONE: Write a test that loops through each feed
			 * in the allFeeds object and ensures it has a URL defined
			 * and that the URL is not empty.
			 */
			it('has a URL defined', function () {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
			/* DONE: Write a test that loops through each feed
			 * in the allFeeds object and ensures it has a name defined
			 * and that the name is not empty.
			 */
			it('has a name defined', function () {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
	});


	/* DONE: Write a new test suite named "The menu" */
	describe('The menu', function () {
		/* DONE: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('should be hidden', function () {
			expect($('.menu-hidden')).toBeDefined();
		});
		/* DONE: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */

		it('changes visibility when the menu icon is clicked', function () {
			$('.icon-list').trigger('click');
			expect($('body .menu-hidden')).not.toBeDefined();
			$('.icon-list').trigger('click');
			expect($('body .menu-hidden')).toBeDefined();
		});
	});

	/* DONE: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function () {

		/* DONE: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test wil require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */

		// This beforeEach clears the current feed entries and then calls the loadFeed function.
		beforeEach(function (done) {
			$('.feed').empty();
			loadFeed(0, function () {
				done();
			});

		});

		it("should have at least a single .entry element within the .feed container", function () {
			expect($('.feed .entry')).toBeDefined();
			done();
		});
	});

	/* DONE: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function () {
		/* DONE: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */

		// This beforeEach empties the feed, loads new entries and saves the link of the first entry. Then loads the next feed and saves the link of the first entry.
		beforeEach(function (done) {
			$('.feed').empty();
			loadFeed(0, function () {
				beforeLink = $('.entry-link').attr('href');
			});

			loadFeed(1, function () {
				afterLink = $('.entry-link').attr('href');
				done();
			});

		});
		// This it statement expects that both links saved will not be the same.
		it('changes the content', function (done) {
			expect(beforeLink).not.toEqual(afterLink);
			done();
		});
	});
}());
