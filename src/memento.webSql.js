(function (window, module, ng, localforage, undefined) {
    'use strict';

    module.factory('webSql', function () {
        localforage.config({
            driver: localforage.WEBSQL,
            name: 'memento'
        });
        localforage.clear(function() {
            // Run this code once the database has been entirely deleted.
            console.log('webSql is now empty.');
        });

        function getUnique() {
            return Math.random().toString(36).substr(2, 9);
        }

        return function (seed, maxCount) {
            var cursor = 0;
            var namespace = getUnique();
            localforage.setItem(namespace + '_orig', seed);
            localforage.setItem(namespace + '_stack', []);

            this.root = function () {
                cursor = 0;
                return localforage.getItem(namespace + '_orig').then(function(value) {
                    return (value);
                });
            };

            this.prev = function () {
                var self = this;
                return this.atTail().then(function (result) {
                    if (!result) {
                        cursor--;
                        if (cursor - 1 >= 0) {
                            return self.getStack().then(function (stack) {
                                return stack[cursor - 1];
                            });
                        } else {
                            return self.getRoot();
                        }
                    } else {
                        return self.getRoot();
                    }
                });
            };

            this.next = function () {
                var self = this;
                return this.atHead().then(function (result) {
                    if (!result) {
                        cursor++;
                        return self.getStack().then(function (stack) {
                            return stack[cursor - 1];
                        });
                    } else {
                        return false;
                    }
                });
            };

            this.put = function (val) {
                return this.getStack().then(function (stack) {
                    if (angular.equals(stack[cursor - 1], val)) {
                        return false;
                    }
                    if (cursor < stack.length) {
                        stack = stack.slice(0, cursor);
                    }
                    if (angular.isNumber(maxCount) && stack.length >= maxCount) {
                        stack.shift();
                    } else {
                        cursor++;
                    }

                    var result = !!stack.push(ng.copy(val));
                    return localforage
                        .setItem(namespace + '_stack', stack)
                        .then(function () {
                            return result;
                        });
                });
            };

            this.atTail = function () {
                return this.getStack().then(function (stack) {
                    return !(stack.length && cursor > 0);
                });
            };

            this.atHead = function () {
                return this.getStack().then(function (stack) {
                    return !(stack.length && cursor < stack.length);
                });
            };

            this.getStack = function () {
                return localforage
                    .getItem(namespace + '_stack')
                    .then(function(value) {
                        return value;
                    });
            };

            this.getRoot = function () {
                return localforage
                    .getItem(namespace + '_orig')
                    .then(function(value) {
                        return value;
                    });
            };
        };
    });
})(window, angular.module('Memento'), angular, localforage);
