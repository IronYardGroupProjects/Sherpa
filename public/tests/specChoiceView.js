//Choice View Tests

describe('Choice View', function() {
  beforeEach(function(){
    browser.get('http://localhost:8080/#/home/choiceView');
  });

  it('should have a button that returns the user to the landing page', function() {
    element(by.linkText('start over')).click();
    expect(browser.getLocationAbsUrl())
      .toEqual('/');
  });

  it('should add a category to the choices', function(){
    element(by.buttonText('entertainment')).click();
    var option = element(by.css('li')).getText();
    expect(option)
      .toEqual('entertainment');
  });

  it('should allow a user to delete an already selected option', function(){
    element(by.buttonText('entertainment')).click();
    element(by.css('.choice-delete-btn')).click();
    expect(element(by.css('li')).isPresent()).toBe(false);
  });

  it('should not allow a user to add more than 3 options', function(){
    for(var i = 0; i < 4; i++){
      element(by.buttonText('entertainment')).click();
    }
    element.all(by.css('li')).then(function(items){
      expect(items.length).toBe(3);
    });
  });

  it('should navigate to the choice view slider', function(){
    element(by.buttonText('entertainment')).click();
    element(by.buttonText('finish building tour')).click();
    expect(browser.getLocationAbsUrl())
      .toBe('/home/choiceViewSlider');
  })

  it('should not display the finish tour button if no options are selected', function(){
    expect(element(by.css('.submit')).isDisplayed()).toBe(false);
  })

});
