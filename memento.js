angular.module('Memento', ['underscore'])
	.factory('Memento', function () {
	    return function (target) {

	        this.stack = [];
	        this.cursor = 0;

	        // TODO: add timestamps.
        	var that = this;
	        var debug = function () {
	        	console.log("CURSOR", that.cursor);
	        	console.log("STACK:", that.stack);
	        };
	        
	        this.canUndo = function () {
        		return this.stack.length && this.cursor > 1;
	        };
	        this.undo = function () {
	            if (this.canUndo()) {
	            	this.cursor--;
   		            debug();
	            	return this.stack[this.cursor - 1];
	            }
	        };

    		this.canRedo = function () {
    			return this.stack.length && this.cursor <= this.stack.length;
    		};
	        this.redo = function () {
				if (this.canRedo()) {
	            	this.cursor++;
   		            debug();
	            	return this.stack[this.cursor - 1];
	            }
	        };

	        this.push = function (obj) {
	        	// Check for equality.
	            if (_.isEqual(this.stack[this.cursor - 1], obj)) {
	            	console.log("not pushing");
	                return false;
	            }
	            // Slice array.
	            if (this.cursor < this.stack.length) {
    				this.stack = this.stack.slice(0, this.cursor);
    			}
	            // Push changes.
	            this.cursor++;
	            this.stack.push(angular.copy(obj));
	            debug();
	        };
	    };
	});