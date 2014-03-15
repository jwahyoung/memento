angular.module('Memento', [])
	.factory('Memento', function ($log) {
	    return function (target) {
    		var _orig = angular.copy(target),
	            stack = [],
	            cursor = 0;
	        
	        this.canUndo = function () {
        		return stack.length && cursor > 0;
	        };

	        this.undo = function () {
	            if (this.canUndo()) {
	            	cursor--;
	            	return cursor - 1 >= 0
	            		? angular.copy(stack[cursor - 1])
	            		: angular.copy(_orig);
	            }
	        };

    		this.canRedo = function () {
    			return stack.length && cursor <= stack.length;
    		};

	        this.redo = function () {
				if (this.canRedo()) {
	            	cursor++;
	            	return angular.copy(stack[cursor - 1]);
	            }
	        };

	        this.push = function (obj) {
	            if (angular.equals(stack[cursor - 1], obj)) {
	                return false;
	            }
	            if (cursor < stack.length) {
    				stack = stack.slice(0, cursor);
    			}
	            cursor++;
	            return !!stack.push(angular.copy(obj));
	        };

	        this.revert = function () {
	        	cursor = 0;
	        	return angular.copy(_orig);
	        };
	    };
	});