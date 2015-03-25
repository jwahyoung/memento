(function (window, module, ng, undefined) {
    'use strict';

    module.factory('windowStorage', function () {
        return function (seed, maxCount) {
            var stack = [];
            var cursor = 0;
            var _orig = ng.copy(seed);

            this.root = function () {
                cursor = 0;
                return new Promise(function (resolve) {
                    resolve(ng.copy(_orig));
                });
            };

            this.prev = function () {
                return this.atTail().then(function (result) {
                   if (!result) {
                       cursor--;
                       return cursor - 1 >= 0 ?
                           ng.copy(stack[cursor - 1]) : ng.copy(_orig);
                   }
                });
            };

            this.next = function () {
                return this.atHead().then(function (result) {
                   if (!result) {
                       cursor++;
                       return ng.copy(stack[cursor - 1]);
                   } else {
	                   return false;
                   }
                });
            };

            this.put = function (val) {
                return new Promise(function(resolve/*, reject*/) {
                    if (angular.equals(stack[cursor - 1], val)) {
                        return false;
                    }
                    if (cursor < stack.length) {
                        stack = stack.slice(0, cursor);
                    }
                    if (angular.isNumber(maxCount) && stack.length >= maxCount) {
                        _orig = stack.shift();
                    } else {
                        cursor++;
                    }
                    resolve(!!stack.push(ng.copy(val)));
                });
            };

            this.atTail = function () {
                return new Promise(function(resolve/*, reject*/) {
                    resolve(!(stack.length && cursor > 0));
                });
            };

            this.atHead = function () {
                return new Promise(function(resolve/*, reject*/) {
                    resolve(!(stack.length && cursor < stack.length));
                });
            };
        };
    });
})(window, angular.module('Memento'), angular);
