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
	  var processService = new camClient.resource('process-definition');
	  var taskService = new camClient.resource('task');
	    function loadProcesses() {
	    	processService.list({}, function(err, results) {
	          if (err) { throw err; }

	          $scope.$apply(function() {
	            $scope.processes = results.items;
	          });
	        });
	      }
	    loadProcesses();
	    
		function loadTasks() {
			  var url = 'http://localhost:6001/java/v2016/06/engine-rest/engine/default/task';
		      $http.get(url).then(function(response){ 
		    	  $scope.tasks = response.data;
		      }); 
		}
		loadTasks();
	    
	    $scope.startProcess = function($event) {
	    	var processId = $($event.currentTarget).attr('data-process-id');
	    	var processKey = $($event.currentTarget).attr('data-process-key');
	    	var data = {"id": processId, "key": processKey};
	    	processService.start(data, function(err, results) {
	    		if (err) { throw err; }
	    		taskService.list({"processInstanceId":results.id}, function(err, results) {
	    			var taskId = results._embedded.task[0].id;
	    			$location.path('/task/' + taskId);
	    			$scope.$apply();
	    		});
	    	});
	    }
	    
  });
