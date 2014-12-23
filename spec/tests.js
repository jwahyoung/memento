/* Tests for memento.js. */

describe('Memento Core test suite', function () {
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

	describe('Initialization', function () {
		it('should initialize', function () {
			expect(memento).to.be.ok;
		});

		// TODO: Expect memento to return base object.
	});

	describe('Core Interface', function () {
		it('should have canUndo() method', function () { 
			expect(angular.isFunction(memento.canUndo)).to.be.true;
		});

		it('should have canRedo() method', function () { 
			expect(angular.isFunction(memento.canRedo)).to.be.true;
		});

		it('should have undo() method', function () { 
			expect(angular.isFunction(memento.undo)).to.be.true;
		});

		it('should have redo() method', function () { 
			expect(angular.isFunction(memento.redo)).to.be.true;
		});

		it('should have push() method', function () { 
			expect(angular.isFunction(memento.push)).to.be.true;
		});

		it('should have revert() method', function () { 
			expect(angular.isFunction(memento.revert)).to.be.true;
		});
	});

	describe('End-to-End functionality', function () {

		// TODO: This is not a real unit test; it's integration. Should be
		//       broken out somehow.

		describe('canUndo()', function () {
			it('should return false if stack is empty', function () {
				expect(memento.canUndo()).to.be.false;
			});

			it('should return false if at beginning of nonempty stack', function () {
				memento.push({ key: 'value', num: 2 });
				memento.undo();
				expect(memento.canUndo()).to.be.false;
			});

			it('should return true if not at beginning of nonempty stack', function () {
				memento.push({ key: 'value', num: 2 });
				expect(memento.canUndo()).to.be.true;

				memento.push({ key: 'value', num: 3 });
				memento.push({ key: 'value', num: 4 });
				expect(memento.canUndo()).to.be.true;
			});
		});

		describe('canRedo()', function () {

		});

		describe('undo()', function () {
			it('should not undo() if at beginning of stack', function () {
				expect(memento.undo()).to.be.undefined;
				memento.push({ key: 'value', num: 2 });
				memento.undo();
				expect(memento.undo()).to.be.undefined;
			});

			it('should return original object on undo()', function () {
				memento.push({ key: 'value', num: 2 });
				expect(memento.undo()).to.eql(seedObject);

				memento.push({ key: 'value', num: 2 });
				memento.push({ key: 'value', num: 3 });
				expect(memento.undo()).to.eql({ key: 'value', num: 2 });
			});
		});

		describe('redo()', function () {
			it('should not redo() if at end of stack', function () {
				expect(memento.redo()).to.be.undefined;
				memento.push({ key: 'value', num: 2 });
				memento.undo();
				memento.redo();
				expect(memento.redo()).to.be.undefined;
			});

			it('should return modified object on redo()', function () {
				memento.push({ key: 'value', num: 2 });
				memento.undo();
				expect(memento.redo()).to.eql({ key: 'value', num: 2 });
			});
		});

		describe('push()', function () {
			it('should push() a changed object', function () {
				expect(memento.push({ key: 'value', num: 2 })).to.be.true;
			});

			it('should not push() an unchanged object', function () {
				expect(memento.push({ key: 'value', num: 2 })).to.be.true;
				expect(memento.push({ key: 'value', num: 2 })).to.be.false;

				// TODO: Deep copy tests.
			});
		});

		describe('revert()', function () {
			it('should return seed object on revert()', function () {
				memento.push({ key: 'value', num: 2 });
				memento.push({ key: 'value', num: 3 });
				memento.push({ key: 'value', num: 4 });
				memento.push({ key: 'value', num: 5 });
				expect(memento.revert()).to.eql(seedObject);
			});
		});

		//describe('clear()', function () {
		//	it('should clear the stack on clear()', function () {
		//		this.fail(Error('Test not implemented'));
		//	});
		//});
	});
});