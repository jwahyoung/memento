Memento.js
==========

Memento.js is a small Angular module intended to provide undo and redo support. It uses an Angular factory to provide tracking for any object you can place into it.

This library is in its first stages of life - as such, it's currently learning to walk.

Usage:
------

To use Memento, add the 'Memento' module as an an app dependency.

	angular.module('myApp', ['Memento'])

Memento is designed to support multiple storage methods; the method can be chosen in a configuration block, like so:

	myApp.config(['MementoProvider', function (MementoProvider) {
		// Here, we can configure Memento to use a different storage method.
		MementoProvider.setStorageMethod('window'); // also indexedDb, webSql, localStorage
	}])

_NOTE: Memento currently only supports the 'window' storage method at this time._

With Memento as an app dependency, we can now inject Memento into a controller and create new instances.

	myApp.controller('main', function ($scope, Memento) {
		$scope.tasks = [
			{ name: 'Update the memento.js README file' },
			{ name: 'Add JSON deltas to main branch' }
		];

		var memento = new Memento($scope.tasks);

A Memento object acts as a stack of states for a given object. Thus, it exposes stack-like methods.

- `push(obj)`: Push an object onto the Memento stack, storing its state. 
- `undo()`: Move backwards in the stack; return the previous state.
- `redo()`: Move forwards in the stack; return the next state.
- `revert()`: Return the original (first stored) object. This does not clear the stack.
- `canUndo()`: Returns true if we can move backwards in the stack - the object has a previous state.
- `canRedo()`: Returns true if we can move forwards in the stack - the object has a redo state.

Rudimentary usage examples are provided in the `examples` directory.

Tentative roadmap:
------------------

- Memento stores copies of changed objects in memory. This is inefficient and wasteful - plan to use jsondiffpatch (<https://github.com/benjamine/jsondiffpatch>) to store deltas.
- Swappable storage solutions for deltas - sessionstorage, memory, xhr perhaps.