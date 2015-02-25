angular.module('memento-example', ['Memento'])
	.config(['MementoProvider', function (MementoProvider) {
		// Here, we can configured Memento to use a different storage method.
		MementoProvider.setStorageMethod('window');
//        MementoProvider.setStorageMethod('localStorage');
//        MementoProvider.setStorageMethod('webSql');
//        MementoProvider.setStorageMethod('indexedDb');
	}])
	.controller('main', function ($scope, Memento) {
		$scope.tasks = [
			{ name: 'Update the memento.js README file' },
			{ name: 'Add JSON deltas to main branch' }
		];
        $scope.canUndo = false;
        $scope.canRedo = false;

		var memento = new Memento($scope.tasks);

		$scope.remove = function (index) {
			$scope.tasks.splice(index, 1);
            checkUndoRedo();
		};

		$scope.add = function (value) {
			if (value === '') return;

			$scope.tasks.push({ name: value });
			memento.push($scope.tasks).then(function () {
                $scope.newTask = '';
                checkUndoRedo();
            });
		};

        function checkUndoRedo() {
            memento.canUndo().then(function (result) {
                $scope.canUndo = result;
                safeApply();
            });
            memento.canRedo().then(function (result) {
                $scope.canRedo = result;
                safeApply();
            });
        }

        function safeApply() {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }

		$scope.undo = function () {
            memento.undo().then(function (tasks) {
                $scope.tasks = tasks || $scope.tasks;
                checkUndoRedo();
            });
		};
		$scope.redo = function () {
            memento.redo().then(function (tasks) {
                $scope.tasks = tasks || $scope.tasks;
                checkUndoRedo();
            });
		};
		$scope.revert = function () {
			memento.revert().then(function (tasks) {
                $scope.tasks = tasks;
                checkUndoRedo();
            });
		};
	});