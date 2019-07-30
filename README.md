# This is our project!

## Testimonies

* Used JQuery Plugin [Masonry](https://masonry.desandro.com/) for Masonry layout to avoid adjusting the ratio of width and height for each photographs.

* [Bootstrap Cards](https://getbootstrap.com/docs/4.0/components/card/) is used for card layout

* Jquery code in [js/testimonies.js](js/testimonies.js) creates the dom of card elements by loading [testimonies.json](testimonies.json). This is to avoid to write complecatedly nested html cards.

~~~js
  let masonry = function() {
    $(".grid").masonry({
      // options
      itemSelector: ".grid-item",
      columnWidth: 400,
      fitWidth: true
    });
  };
  masonry();
~~~

~~~json
  {
    "imgSource": "img/amalfi.jpg",
    "date": "2019-07-01",
    "city": "Amalfi",
    "country": "Italy",
    "title": "Amalfi Coast",
    "text": "The Amalfi Coast (Italian: Costiera Amalfitana) is a stretch of coastline on the northern coast of the Salerno Gulf on the Tyrrhenian Sea, located in the Province of Salerno of southern Italy.",
    "who": "Kazue",
    "comment": "Beautiful, beautiful and beautiful...."
  }
~~~

* On clicking each card, the size of photo is toggled between small(400px in width) and large (800px in width). In addition, the masonry layout is re-generated. 

~~~js
    $(".testimony.grid-item").on("click", function() {
      let size = $(this).hasClass("large") ? { width: 800 } : { width: 400 };
      $(this)
        .toggleClass("large")
        .animate(size, masonry);
    });
~~~