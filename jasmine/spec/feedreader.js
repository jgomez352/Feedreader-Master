/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('each has name', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.constructor).toBe(String);
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });
    describe('The menu', function () {


        it('hidden by default', function () {
            let isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);
        });
    

        it('it toggles visibility when icon is clicked', function () {
            let menuIcon = document.querySelector('a.menu-icon-link');
            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

   describe('Initial Entries', function(){
    
        
        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('has at least one entry in feed container', function () {
            let feedContainer = document.querySelector('div.feed');
            let entries = feedContainer.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {

        let feed1, feed2;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feed1 = document.querySelector('div.feed').innerHTML;
                loadFeed(1, function () {
                    feed2 = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });
        it('loads new feeds', function () {
            expect(feed1).not.toBe(feed2);
        });


    });


}());
