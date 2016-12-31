// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, $interval, $document, $location, $http) {
	
	$http.get('/assets/wordslist.json')
		.then(function(res){
			$scope.allWordys = res.data.twofifty;
		});
	
	$scope.currentlyDoingWords = true;
	$scope.currentlyNotDoingWords = false;
	$scope.format = 'M/d/yy h:mm:ss a';
	$scope.magicTime = 10;
	$scope.magicNumber = 2;
	$scope.numSeconds = $scope.magicTime;
	$scope.currentWord = 1;
	$scope.beginningWordOffset = Math.floor((Math.random() * $scope.magicNumber));
	$scope.wordInList = $scope.currentWord+$scope.beginningWordOffset;
	$scope.wordsGiven = [];
	$scope.submittedWords = [];
	$scope.submittedTime = [];
	$scope.isCorrectWord = [];
	

	$scope.playAudio = function(audioUrl) {
        var audio = new Audio(audioUrl);
        audio.play();
    };
	
	$scope.playCurrentAudio = function() {
		$scope.playAudio('assets/words/Recording ('+$scope.wordInList+').mp3');
		console.log("wordInList: " + $scope.wordInList);
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
		}, 1000);
	};
	
	$scope.submitFullWord = function() {
		if($scope.currentWord < 9) {
			var specificPostData = {actualword:$scope.allWordys[$scope.wordInList].actwd,
									submittedword:$scope.mainInputText,
									timetaken:$scope.magicTime-$scope.numSeconds
									};
			$http({
				method:'POST',
				url:'api/wordys',
				data:specificPostData
			});
			$scope.wordsGiven.push($scope.allWordys[$scope.wordInList].actwd);
			$scope.submittedWords.push($scope.mainInputText);
			$scope.submittedTime.push($scope.magicTime-$scope.numSeconds);
			if($scope.allWordys[$scope.wordInList].actwd == $scope.mainInputText) {
				$scope.isCorrectWord.push(true);
			} else {
				$scope.isCorrectWord.push(false);
			}
			$scope.startTimer();
			$scope.nextWord();
			$scope.resetTimer();
			$scope.playCurrentAudio();
			$scope.resetMainInput();
			$scope.focusOnMainInput();
		} else {
			var specificPostData = {actualword:$scope.allWordys[$scope.wordInList].actwd,
									submittedword:$scope.mainInputText,
									timetaken:$scope.magicTime-$scope.numSeconds
									};
			$http({
				method:'POST',
				url:'api/wordys',
				data:specificPostData
			});
			$scope.wordsGiven.push($scope.allWordys[$scope.wordInList].actwd);
			$scope.submittedWords.push($scope.mainInputText);
			$scope.submittedTime.push($scope.magicTime-$scope.numSeconds);
			if($scope.allWordys[$scope.wordInList].actwd == $scope.mainInputText) {
				$scope.isCorrectWord.push(true);
			} else {
				$scope.isCorrectWord.push(false);
			}
			for($scope.i = 0; $scope.i < 10; $scope.i++) {
				console.log($scope.wordsGiven[$scope.i] + ' | ' + $scope.submittedWords[$scope.i] + ' | ' + $scope.submittedTime[$scope.i]);
			}
			$scope.stopTimer();
			$scope.currentlyDoingWords = false;
			$scope.currentlyNotDoingWords = true;
		}
	};
	
	$scope.wordsCompleted = function(x) {
		if(x < $scope.submittedWords.length) {
			return true;
		}
	};
	
	$scope.endNow = function() {
		$scope.stopTimer();
		$scope.currentlyDoingWords = false;
		$scope.currentlyNotDoingWords = true;
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
	
	$scope.currentlyDoingWords = true;
	$scope.currentlyNotDoingWords = false;
	$scope.init = function () {
		$scope.currentWord = 0;
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