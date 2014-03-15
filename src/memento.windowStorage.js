angular.module('Memento')
	.factory('windowStorage', function () {
		return function (seed) {
			var stack = [];
			var cursor = 0;
			var _orig = angular.copy(seed);

			this.root = function () {
				cursor = 0;
				return angular.copy(_orig);
			};

			this.prev = function () {
				if (!this.atTail()) {
					cursor--;
					return cursor - 1 >= 0 ? 
						angular.copy(stack[cursor - 1]) : angular.copy(_orig);
				}
			};

			this.next = function () {
				if (!this.atHead()) {
					cursor++;
					return angular.copy(stack[cursor - 1]);
				}
			};

			this.put = function (val) {
				if (angular.equals(stack[cursor - 1], val)) {
					return false;
				}
				if (cursor < stack.length) {
					stack = stack.slice(0, cursor);
				}
				cursor++;
				return !!stack.push(angular.copy(val));
			};

			this.atTail = function () {
				return !(stack.length && cursor > 0);
			};

			this.atHead = function () {
				return !(stack.length && cursor <= stack.length);
			};
		};
	});