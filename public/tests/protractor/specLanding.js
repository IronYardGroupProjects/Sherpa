//Landing Page Tests

describe('Landing Page', function() {
  beforeEach(function(){
    browser.get('http://localhost:8080');
  });

  it('should have a title of Sherpa', function(){
    expect(browser.getTitle())
      .toEqual('Sherpa');
  });

  it('should have a header of sherpa', function() {
    var header = element(by.css('h1'));
    expect(header.getText())
      .toEqual('sherpa');
  });

  it('should navigate to the choice view', function() {
    element(by.css('.choice-view-btn')).click();
    expect(browser.getLocationAbsUrl())
      .toBe('/home/choiceView');
  });

  it('should navigate to the curated view', function(){
    element(by.css('.curated-view-button')).click();
    expect(browser.getLocationAbsUrl())
      .toBe('/home/curExp');
  });

});
