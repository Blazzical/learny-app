// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, $interval, $document, $location, $http) {
	
	$http.get('/assets/wordslist.json')
		.then(function(res){
			$scope.allWordys = res.data.twofifty;
		});
	
	$scope.format = 'M/d/yy h:mm:ss a';
	$scope.magicTime = 10;
	$scope.magicNumber = 1;
	$scope.numSeconds = $scope.magicTime;
	$scope.currentWord = 1;
	$scope.beginningWordOffset = Math.floor((Math.random() * $scope.magicNumber));
	$scope.wordInList = $scope.currentWord+$scope.beginningWordOffset;
	$scope.wordsGiven = [];
	$scope.submittedWords = [];
	$scope.submittedTime = [];
	

	$scope.playAudio = function(audioUrl) {
        var audio = new Audio(audioUrl);
        audio.play();
    };
	
	$scope.playCurrentAudio = function() {
		$scope.playAudio('assets/words/Recording ('+$scope.wordInList+').mp3');
	};
	
	$scope.focusOnMainInput = function() {
		$document[0].getElementById('#maininput').focus();
	};
	
	$scope.mainInputText = "";
	
	$scope.resetMainInput = function() {
		$scope.mainInputText = "";
	};
	
	
	var stop;
	$scope.startTimer = function() {
		  // Don't start a new fight if we are already fighting
		if ( angular.isDefined(stop) ) return;

		stop = $interval(function() {
			if ($scope.numSeconds > 0) {
				$scope.numSeconds--;
			} else {
				$scope.submitFullWord();
			}
		}, 500);
	};
	
	$scope.submitFullWord = function() {
		if($scope.currentWord < 10) {
			$scope.wordsGiven.push($scope.allWordys[$scope.wordInList].actwd);
			$scope.submittedWords.push($scope.mainInputText);
			$scope.submittedTime.push($scope.magicTime-$scope.numSeconds);
			$scope.startTimer();
			$scope.nextWord();
			$scope.resetTimer();
			$scope.playCurrentAudio();
			$scope.resetMainInput();
			$scope.focusOnMainInput();
		} else {
			$scope.wordsGiven.push($scope.allWordys[$scope.wordInList].actwd);
			$scope.submittedWords.push($scope.mainInputText);
			$scope.submittedTime.push($scope.magicTime-$scope.numSeconds);
			for($scope.i = 0; $scope.i < 10; $scope.i++) {
				console.log($scope.wordsGiven[$scope.i] + ' | ' + $scope.submittedWords[$scope.i] + ' | ' + $scope.submittedTime[$scope.i]);
			}
			$scope.stopTimer();
		}
	};

	$scope.stopTimer = function() {
	  if (angular.isDefined(stop)) {
		$interval.cancel(stop);
		stop = undefined;
	  }
	};

	$scope.resetTimer = function() {
		$scope.numSeconds = $scope.magicTime;
	};
	
	$scope.nextWord = function() {
		$scope.currentWord++;
		$scope.wordInList += 25;
	};

	$scope.$on('$destroy', function() {
	  // Make sure that the interval is destroyed too
	  $scope.stopTimer();
	});
	
	$scope.init = function () {
		$scope.currentWord = 1;
		$scope.beginningWordOffset = Math.floor((Math.random() * $scope.magicNumber));
		$scope.wordInList = $scope.currentWord+$scope.beginningWordOffset;
		$scope.wordsGiven = [];
		$scope.submittedWords = [];
		$scope.submittedTime = [];
		$scope.startTimer();
		$scope.playCurrentAudio();
		$scope.resetMainInput();
		$scope.focusOnMainInput();
		console.log($scope.wordInList);
		console.log($scope.allWordys[$scope.wordInList].actwd);
	};
});