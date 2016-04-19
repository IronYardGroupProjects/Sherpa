//Choice View Slider Tests
var webdriver = require('selenium-webdriver');

describe('Choice View', function() {
  beforeEach(function(){
    browser.get('http://localhost:8080/#/home/choiceView');
    element(by.buttonText('entertainment')).click();
    element(by.buttonText('finish building tour')).click();
  });

  it('should have a button that returns the user to the landing page', function() {
    element(by.linkText('start over')).click();
    expect(browser.getLocationAbsUrl())
      .toEqual('/');
  });

  it('should not show the left arrow if at the start of a list', function(){
    var button = element(by.css('.fa-chevron-left')).isDisplayed();
    expect(button)
      .toBe(false);
  });

  it('should not show the right arrow if at the end of a list', function(){
    var button = element(by.css('.fa-chevron-right'));
    for(var i = 0; i < 3; i++){
      button.click();
    }
    expect(button.isDisplayed())
      .toBe(false);
  });


});
