angular.module('Memento', [])
	.provider('Memento', function () {
		var storage = {
			memory: 'memoryStorage',
			session: 'sessionStorage'
		}

		var coreProvider = function ($store) {
			return function (target) {
				var store = new $store(target);
				
				this.canUndo = function () {
					return !store.atHead();
				};

				this.undo = function () {
					return store.prev();
				};

				this.canRedo = function () {
					return !store.atHead();
				};

				this.redo = function () {
					return store.next();
				};

				this.push = function (obj) {
					return store.put(obj);
				};

				this.revert = function () {
					return store.root();
				};
			};
		};

		this.storageMethod = 'memory';

		coreProvider['$inject'] = [storage[this.storageMethod]];


		this.$get = coreProvider;
	});