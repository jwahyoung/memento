(function (window, module, ng, undefined) {
	module.provider('Memento', function () {
		var storeProvider = {
			window: 'windowStorage',
			session: 'sessionStorage'
		};

		var coreProvider = function ($store) {
			return function (target, maxCount) {
                maxCount = parseInt(maxCount, 10) || false;
				var store = new $store(target, maxCount);
				
				this.canUndo = function () {
					return !store.atTail();
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

		this.storageMethod = 'window';

		coreProvider['$inject'] = [storeProvider[this.storageMethod]];
		this.$get = coreProvider;
	});
})(window, angular.module('Memento', []), angular);