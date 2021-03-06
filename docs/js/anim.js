   // To animate an element, place the data-anim="<screnPos> <elementPos>" attribute on the element to animate.
   // Value "top top" means animate the element when the top of the screen crosses the top of the element.
   // Value "middle bottom" means animate the element when middle of the screen crosses the bottom of the element.
   // Before animation, the element will have a "not-animated" class, replaced by "animated" once the animation occurs.
   // Style appropriately in CSS with transitions to cause the animation before and after.
   //
   // Denis Labrecque
   // September 2019, November 2020
      
   // The class that gets added after the animation gets hit
   const AnimatedClass = "animated";
   const NotAnimatedClass = "not-animated";
   
   // Mark all elements with the animation attribute as not animated
   const Elements = document.querySelectorAll("[data-anim]")
   Elements.forEach(e => {
      e.classList.add(NotAnimatedClass)
   })

   let animateEachElementFunction = function() {
      //console.log("debounce happened")
      Elements.forEach(e => {
         animateElement(e)
      })
   }
   
   // Listen to window scroll and add the animated class if necessary
   window.addEventListener('scroll', debounce(animateEachElementFunction, 15));
   
   // Compare window and element height from top to add or remove the animation class
   function animateElement(element) {
   
      if(element == null || element == "" || element == undefined)
         return;
   
      let positions = element.getAttribute("data-anim").split(" ")

      let windowY = findWindowY(positions[0]);
      let elementY = findElementY(element, positions[1]);
      //console.log("elementY: " + elementY + ", windowY " + windowY + " value: " + (elementY - windowY) + " " + (elementY - windowY <= 0))

      if(element.tagName == "A") {
         //console.log("windowY " + windowY + " elementY " + elementY);
      }

      if (elementY - windowY <= 0) {
         element.classList.add(AnimatedClass)
         element.classList.remove(NotAnimatedClass)
      }
      else {
         element.classList.add(NotAnimatedClass)
         element.classList.remove(AnimatedClass)
      }
   }

   // Find an element's position on screen based on keywords "top", "middle", and "bottom"
   function findElementY(element, position) {
      switch(position) {
         case "top":
            return element.getBoundingClientRect().top
         case "middle":
            return element.getBoundingClientRect().top + (element.getBoundingClientRect().height / 2)
         case "bottom":
            return element.getBoundingClientRect().bottom
      }
   }

   // Find the window's position on screen based on keywords "top", "middle, and "bottom"
   function findWindowY(position) {
      switch(position) {
         case "top":
            return 0
         case "middle":
            return window.outerHeight / 2
         case "bottom":
            return window.outerHeight
      }
   }

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};