// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $location) {

    $scope.tagline = 'To the moon and back!';
	
	goToNerds = function() {
		$scope.$apply(function() {
			$location.path('/nerds');
			console.log($location.path());
		});
	};

});