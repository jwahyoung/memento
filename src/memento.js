angular.module('Memento', [])
	.factory('Memento', function ($log) {
	    return function (target) {
    		var _orig = angular.copy(target);
	        var stack = [];
	        var cursor = 0;

	        // TODO: add timestamps.
        	var that = this;
	        var debug = function () {
	        	$log.info("CURSOR", that.cursor);
	        	$log.info("STACK:", that.stack);
	        };
	        
	        this.canUndo = function () {
        		return stack.length && cursor > 0;
	        };
	        this.undo = function () {
	            if (this.canUndo()) {
	            	cursor--;
	            	return cursor - 1 >= 0 ? angular.copy(stack[cursor - 1]) : angular.copy(_orig);
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
	        	// Check for equality.
	            if (angular.equals(stack[cursor - 1], obj)) {
	            	$log.warn("not pushing");
	                return false;
	            }
	            // Slice array.
	            if (cursor < stack.length) {
    				stack = stack.slice(0, cursor);
    			}
	            // Push changes.
	            cursor++;
	            return !!stack.push(angular.copy(obj));
	        };
	    };
	});