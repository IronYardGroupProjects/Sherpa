// Curated View Tests

describe('Curated View', function(){

  beforeEach(function(){
    browser.get('http://localhost:8080/#/home/curExp');
  });

  it('should have a button that returns the user to the landing page', function() {
    element(by.linkText('start over')).click();
    expect(browser.getLocationAbsUrl())
      .toEqual('/');
  });

  it('should display a details modal when a tour is selected', function(){
    element(by.buttonText('Churches')).click();
    expect(element(by.css('.in')).getCssValue('display'))
      .toBe('block');
  });

  // it('should close the modal when the close button is clicked', function(){
  //   element(by.buttonText('Churches')).click();
  //
  //   expect(element(by.css('.modal')).getCssValue('display'))
  //     .toBe('none');
  // });
  //
  // it('should start a tour when the start tour button is clicked', function(){
  //   element(by.buttonText('Churches')).click();
  //
  //   expect(browser.getLocationAbsUrl())
  //     .toBe('/home/map');
  // })
})
