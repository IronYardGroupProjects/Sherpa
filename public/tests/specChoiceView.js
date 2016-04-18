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

});
