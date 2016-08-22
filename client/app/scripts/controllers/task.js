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
	  $scope.subPath = '';
	  loadTaskForm($scope.taskId);
	  $scope.form = {};
	  loadForm();
	  
	  $scope.$on('formLoad', function(err, submission) {
		  console.log(err);
	  });
	  
	  $scope.goNextTask = function(taskId) {
		  var data = {"id":taskId.taskId,
				  "variables":{"data": {"value": JSON.stringify($scope.data.data)}}};//$scope.data
		  taskService.submitForm(data);
		  $location.path('/');
	  }
	  	  
	  function loadForm() {
		  var url = 'http://localhost:3001/survey';
	      var formKey = '';
	      $http.get(url).then(function(response){ 
	    	  $scope.form = response.data;
	      });          
	  };
	  
	    
	  function loadTaskForm(taskId) {
		  var url = 'http://localhost:6001/java/v2016/06/task/' + taskId;
	      var formKey = '';
	      $http.get(url).then(function(response){ 
	    	  $scope.subPath = 'http://localhost:6002/java/v2016/06/task/submission/' + taskId;
	    	  $scope.path = 'http://localhost:3001/' + response.data.path;
	      });          
	  };
  });
