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
	  loadTaskForm($scope.taskId);
	  $scope.formioForm = {};
	  
	  $scope.goNextTask = function(taskId) {
		  var data = {"id":taskId.taskId,
				  "variables":{"data": {"value": JSON.stringify($scope.data.data)}}};//$scope.data
		  taskService.submitForm(data);
		  $location.path('/');
	  }
	    
	  function loadTaskForm(taskId) {
		  var url = 'http://localhost:6009/engine-rest/task/' + taskId;
	      var formKey = '';
	      $http.get(url).then(function(response){ 
	    	  formKey = response.data.formKey;
	    	  $http.get('http://localhost:3001/' + formKey).then(function(response){ 
	            $scope.form = response.data;
	          });
	      });          
	  };
  });
