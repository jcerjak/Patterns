Autofocus
=========

Patterns augments the standard HTML5 autofocus behaviour, and implements it
for browsers that do not support it natively.

On initial page load or when new content is injected it is scanned for input
elements with an ``autofocus`` attribute or ``pat-autofocus`` class. The first
such element that has no current value will be given the focus.

.. code-block:: html

   <form>
     <label>Title
       <input type="text" autofocus="autofocus" name="title" value="My document"/></label>
     <label>Keywords
       <input type="text" autofocus="autofocus" name="keywords"/></label>
   </form>

In this example the keywords input field would be given the focus since the
title field already has a value.
