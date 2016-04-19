describe('ChoiceViewController', function() {
  beforeEach(module('choiceView'), []);

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('vm.addChoice', function() {
    it('adds a category choice to the array', function() {
      var $scope = {};
      var controller = $controller('ChoiceViewController', { $scope: $scope });
      vm.addChoice({id: 1, category: 'test'})
      expect(vm.categoryChoice.length).toEqual(1);
    });
  });
});
