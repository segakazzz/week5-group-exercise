# This is our project!

## Testimonies

* Used JQuery Plugin [Masonry](https://masonry.desandro.com/) for Masonry layout to avoid adjusting the ratio of width and height for each photographs.

~~~html
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
~~~

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

* [Bootstrap Cards](https://getbootstrap.com/docs/4.0/components/card/) is used for card layout

~~~html
<div class="testimony grid-item>
  <div class="card"><img src="img/amalfi.jpg" class="card-img-top">
    <div class="card-body">
      <h5><span class="badge badge-danger">New!</span>Amalfi Coast</h5>
      <p>The Amalfi Coast (Italian: Costiera Amalfitana) is a stretch of coastline on the northern coast of the Salerno Gulf on the Tyrrhenian Sea, located in the Province of Salerno of southern Italy.</p>
      <div class="container-fluid location"><i class="fas fa-thumbtack"></i>Amalfi, Italy</div>
      <hr>
      <div class="container-fluid comment-area">
        <div class="row">
          <div class="face col-3"><img src="./img/KazuePic.jpeg"></div>
          <div class="comment col">Beautiful, beautiful and beautiful....</div>
        </div>
        <div class="row">
          <div class="date col-12">Jul 2, 2019</div>
        </div>
      </div>
    </div>
  </div>
</div>
~~~

* Jquery code in [js/testimonies.js](js/testimonies.js) creates the dom of card elements by loading [testimonies.json](testimonies.json). This is to avoid to write complecatedly nested html cards.



~~~json
  {
    "imgSource": "img/amalfi.jpg",
    "date": "2019-07-02",
    "city": "Amalfi",
    "country": "Italy",
    "title": "Amalfi Coast",
    "text": "The Amalfi Coast (Italian: Costiera Amalfitana) is a stretch of coastline on the northern coast of the Salerno Gulf on the Tyrrhenian Sea, located in the Province of Salerno of southern Italy.",
    "who": "Kazue",
    "comment": "Beautiful, beautiful and beautiful...."
  }
~~~

* On clicking each card, the size of photo is toggled between small(400px in width) and large (800px in width). The masonry layout is re-generated on click.

~~~js
    $(".testimony.grid-item").on("click", function() {
      let size = $(this).hasClass("large") ? { width: 800 } : { width: 400 };
      $(this)
        .toggleClass("large")
        .animate(size, masonry);
    });
~~~

* [Bootstrap Badges](https://getbootstrap.com/docs/4.3/components/badge/) is used for showing "New" for added recently. This is automatically judged by looking "date" key in json data. 

~~~js
    let newAfter = new Date();
    newAfter.setMonth(-1);
    let date = new Date(element.date);
    let isNew = newAfter < date;
    let $new = $("<span>")
        .addClass("badge badge-danger")
        .text("New!");
    let $cardTitle = $("<h5>").text(element.title);
    if (isNew) {
        $cardTitle.prepend($new);
    }
~~~