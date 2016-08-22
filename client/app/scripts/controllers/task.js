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
	  var taskService = new camClient.resource('task');
	  
	  $scope.taskId = $routeParams.taskid;
	  $scope.data = {};
	  $scope.path = {};
	  loadTaskForm($scope.taskId);
	  $scope.formioForm = {};
	  
	  $scope.goNextTask = function(taskId) {
		  var data = {"id":taskId.taskId,
				  "variables":{"data": {"value": JSON.stringify($scope.data.data)}}};//$scope.data
		  taskService.submitForm(data);
		  $location.path('/');
	  }
	  
	  $scope.myHTML =
		     '<formio form-action="http://localhost:6002/java/v2016/06/task/submission" src="\'http://localhost:3001/survey\'"></formio>';
	  
	    
	  function loadTaskForm(taskId) {
		  var url = 'http://localhost:6001/java/v2016/06/task/' + taskId;
	      var formKey = '';
	      $http.get(url).then(function(response){ 
	    	  $scope.path = 'http://localhost:3001/' + response.data.path;
	      });          
	  };
  });
