// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $document) {

	$scope.beforeMenu = true;
	$scope.inMenu = false;
	
	goToNerds = function() {
		/*
		$scope.$apply(function() {
			$location.path('/nerds');
			console.log($location.path());
		});
		*/
		$scope.$apply(function() {
			$scope.beforeMenu = false;
			$scope.inMenu = true;
		});
	};
	
	$scope.goToNerdsNowPlease = function() {
		$scope.beforeMenu = false;
		$scope.inMenu = true;
		if($document[0].getElementById("videoIntro")) {
			$document[0].getElementById("videoIntro").pause();
		}
	};
	
	$scope.showVideo = function() {
		$scope.beforeMenu = true;
		$scope.inMenu = false;
		if($document[0].getElementById("videoIntro")) {
			$document[0].getElementById("videoIntro").load();
			$document[0].getElementById("videoIntro").play();
			console.log("Found Video!");
		} else {
			console.log("Fucking shit.");
		}
	};

});