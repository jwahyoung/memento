Memento.js
==========

Memento.js is a small Angular module intended to provide undo and redo support. It uses an Angular factory to provide tracking for any object you can place into it.

This library is in its first stages of life - as such, it's currently learning to walk.

Tentative roadmap:
------------------	

- Memento stores copies of changed objects in memory. This is inefficient and wasteful - plan to use jsondiffpatch (<https://github.com/benjamine/jsondiffpatch>) to store deltas.
- Swappable storage solutions for deltas - sessionstorage, memory, xhr perhaps.

