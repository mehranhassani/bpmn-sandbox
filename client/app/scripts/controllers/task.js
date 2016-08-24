'use strict';

/**
 * @ngdoc function
 * @name angularclientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularclientApp
 */
angular.module('angularclientApp')
  .controller('TaskCtrl', function ($scope,$routeParams,$http,$location) {
	  $scope.taskId = $routeParams.taskid;
	  $scope.submission = {};
	  $scope.form = {};
	  
	  $scope.$on('formSubmit', function(err, submission) {
		  var url = 'http://unctad.redfunction.ee/java/v2016/06/task/submission/' + $scope.taskId;
		  $http.post(url,submission).then(function(response){ 
			  console.log(response);
			  $location.path('/');
	      });
	  });
	    
	  function loadTaskFormAndData(taskId) {
		  var url = 'http://unctad.redfunction.ee/java/v2016/06/task/' + taskId;
	      $http.get(url).then(function(response){ 
	    	  $scope.form = response.data;
	    	  $scope.submission = response.data.variables;
	      });          
	  }
	  
	  loadTaskFormAndData($scope.taskId);
  });
