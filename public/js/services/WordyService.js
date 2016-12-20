// public/js/services/WordyService.js
angular.module('WordyService', []).factory('Wordy', ['$http', function($http) {

    return {
        // call to get all wordys
        get : function() {
            return $http.get('/api/wordys');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new wordy
        create : function(wordyData) {
            return $http.post('/api/wordys', wordyData);
        },

        // call to DELETE a wordy
        delete : function(id) {
            return $http.delete('/api/wordys/' + id);
        }
    }       

}]);