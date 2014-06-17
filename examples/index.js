angular.module('memento-example', ['Memento'])
	.config(['MementoProvider', function (MementoProvider) {
		// Here, we can configured Memento to use a different storage method.
		MementoProvider.storageMethod = 'window';
	}])
	.controller('main', function ($scope, Memento) {
		$scope.tasks = [
			{ name: 'Update the memento.js README file' },
			{ name: 'Add JSON deltas to main branch' }
		];

		var memento = new Memento($scope.tasks);

		$scope.remove = function (index) {
			$scope.tasks.splice(index, 1);
		};

		$scope.add = function (value) {
			if (value === '') return;

			$scope.tasks.push({ name: value });
			memento.push($scope.tasks);
			$scope.newTask = '';
		};

		$scope.weCanUndo = function () { return memento.canUndo() };
		$scope.weCanRedo = function () { return memento.canRedo() };
		$scope.undo = function () {
			$scope.tasks = memento.undo() || $scope.tasks;
		};
		$scope.redo = function () {
			$scope.tasks = memento.redo() || $scope.tasks;
		};
		$scope.revert = function () {
			$scope.tasks = memento.revert();
		};
	});