exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'specLanding.js',
    'specChoiceView.js',
    'specCurView.js',
    'specChoiceViewSlider.js'

  ],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
}
