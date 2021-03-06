var Browser = require('zombie');
var assert  = require('chai').assert;
var browser;

suite('Cross-Page Tests', function () {
  
  setup(function () {
    browser = new Browser();
  });

  test('requesting a group rate quote should populate referrer field', function (done) {
    var referrer = 'http://localhost:3000/tours/hood-river';
    browser.visit(referrer, function () {
      browser.clickLink('.requestGroupRate', function () {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('requesting a group rate quote directly should result in an empty referrer field', function (done) {
    browser.visit('http://localhost:3000/tours/request-group-rate', function () {
      assert(browser.field('referrer').value === '');
      done();
    });
  });

});