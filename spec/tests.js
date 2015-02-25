/* Tests for memento.js. */

describe('memento core test suite', function () {
	var memento;
	var seedObject = {
		key: 'value',
		num: 1
	};

	beforeEach(function() {
		module('Memento');

		inject(function(_Memento_) {
			memento = new _Memento_(seedObject);
		});
	});

	it('should initialize', function () {
		expect(memento).toBeTruthy();
		// TODO: Expect memento to return base object.
	});

	// Check functions.
	it('should match expected interface', function () { 
		expect(angular.isFunction(memento.canUndo)).toBe(true);
		expect(angular.isFunction(memento.canRedo)).toBe(true);
		expect(angular.isFunction(memento.undo)).toBe(true);
		expect(angular.isFunction(memento.redo)).toBe(true);
		expect(angular.isFunction(memento.push)).toBe(true);
	});

	it('should push() a changed object', function () {
        memento.push({key: 'value', num: 2}).then(function (result) {
            expect(result).toBe(true);
        });
	});

	it('should not push() an unchanged object', function () {
        memento.push({key: 'value', num: 2}).then(function (result) {
            expect(result).toBe(true);
            memento.push({key: 'value', num: 2}).then(function (result) {
                expect(result).toBe(false);
            });
        });

		// TODO: Deep copy tests.
	});

	it('should return original object on undo()', function () {
        memento.push({key: 'value', num: 2}).then(function (result) {
            memento.undo().then(function (result) {
                expect(result).toEqual(seedObject);
            });
        });

        memento.push({key: 'value', num: 2}).then(function () {
            memento.push({key: 'value', num: 3}).then(function (result) {
                memento.undo().then(function (result) {
                    expect(result).toEqual({ key: 'value', num: 2 });
                });
            });
        });
	});

	it('should return modified object on redo()', function () {
        memento.push({key: 'value', num: 2}).then(function () {
            memento.undo().then(function () {
                memento.redo().then(function (result) {
                    expect(result).toEqual({ key: 'value', num: 2 });
                });
            });
        });
	});

	it('should not undo() if at beginning of stack', function () {
        memento.redo().then(function (result) {
            expect(result).toBeUndefined();
            memento.push({ key: 'value', num: 2 }).then(function () {
                memento.undo().then(function () {
                    memento.undo().then(function (result2) {
                        expect(result2).toBeUndefined();
                    });
                });
            });
        });
	});

	it('should not redo() if at end of stack', function () {
        memento.redo().then(function (result) {
            expect(result).toBeUndefined();
            memento.push({ key: 'value', num: 2 }).then(function () {
                memento.undo().then(function () {
                    memento.redo().then(function () {
                        memento.redo().then(function (result2) {
                            expect(result2).toBeUndefined();
                        });
                    });
                });
            });
        });
	});
	
	it('should return seed object on revert()', function () {
        memento.push({ key: 'value', num: 2 }).then(function () {
            memento.push({ key: 'value', num: 3 }).then(function () {
                memento.push({ key: 'value', num: 4 }).then(function () {
                    memento.push({ key: 'value', num: 5 }).then(function () {
                        memento.revert().then(function (result) {
                            expect(result).toEqual(seedObject);
                        });
                    });
                });
            });
        });
	});
 
 	// it('should clear the stack on clear()', function () {
 	// 	this.fail(Error('Test not implemented'));
	// });
});