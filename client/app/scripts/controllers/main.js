'use strict';

/**
 * @ngdoc function
 * @name angularclientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularclientApp
 */
angular.module('angularclientApp')
  .controller('MainCtrl', function ($scope,$location,$http) {
	  
		function loadProcesses() {
			var url = 'http://unctad.redfunction.ee/java/v2016/06/engine-rest/engine/default/process-definition';
			$http.get(url).then(function(response) {
				$scope.processes = response.data;
			});
		}
		
		loadProcesses();
	    
		function loadTasks() {
			  var url = 'http://unctad.redfunction.ee/java/v2016/06/engine-rest/engine/default/task';
		      $http.get(url).then(function(response){ 
		    	  $scope.tasks = response.data;
		      }); 
		}
		loadTasks();
	    
	    $scope.startProcess = function(processId) {
	    	var url = 'http://unctad.redfunction.ee/java/v2016/06/engine-rest/engine/default/process-definition/' + processId + '/start';
		      $http.post(url).then(function(response){ 
		    	  $location.path('/task/' + response.data.id);
		      }); 
	    };
	    
  });
