!function(t,n,e,r){"use strict";n.factory("webSql",function(){function t(){return Math.random().toString(36).substr(2,9)}return r.config({driver:r.WEBSQL,name:"memento"}),r.clear(function(){console.log("webSql is now empty.")}),function(n,u){var i=0,o=t();r.setItem(o+"_orig",n),r.setItem(o+"_stack",[]),this.root=function(){return i=0,r.getItem(o+"_orig").then(function(t){return t})},this.prev=function(){var t=this;return this.atTail().then(function(n){return n?t.getRoot():(i--,i-1>=0?t.getStack().then(function(t){return t[i-1]}):t.getRoot())})},this.next=function(){var t=this;return this.atHead().then(function(n){return n?!1:(i++,t.getStack().then(function(t){return t[i-1]}))})},this.put=function(t){return this.getStack().then(function(n){if(angular.equals(n[i-1],t))return!1;i<n.length&&(n=n.slice(0,i)),angular.isNumber(u)&&n.length>=u?n.shift():i++;var c=!!n.push(e.copy(t));return r.setItem(o+"_stack",n).then(function(){return c})})},this.atTail=function(){return this.getStack().then(function(t){return!(t.length&&i>0)})},this.atHead=function(){return this.getStack().then(function(t){return!(t.length&&i<t.length)})},this.getStack=function(){return r.getItem(o+"_stack").then(function(t){return t})},this.getRoot=function(){return r.getItem(o+"_orig").then(function(t){return t})}}})}(window,angular.module("Memento"),angular,localforage);