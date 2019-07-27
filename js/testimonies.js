$(function() {
  // $('#testimonies-main').css('display', 'none');
  $.get("/testimonies.json", function(data) {
    for (var i = data.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = data[i];
      data[i] = data[r];
      data[r] = tmp;
    }
    let newAfter = new Date();
    newAfter.setMonth(-1);
    console.log(newAfter);

    data.forEach((element, index) => {
      let date = new Date(element.date);
      let isNew = newAfter < date;

      let $img = $("<img>")
        .attr("src", element.imgSource)
        .addClass("card-img-top");

      let $new = $("<span>")
        .addClass("badge badge-danger")
        .text("New!");

      let $cardTitle = $("<h5>").text(element.title);
      if (isNew) {
        $cardTitle.prepend($new);
      }

      let $cardText = $("<p>").text(element.text);
      let $cardBody = $("<div>")
        .addClass("card-body")
        .append($cardTitle)
        .append($cardText)
        .append($('<hr>'));

      let $facepic = $("<div>")
        .addClass("face col-3")
        .append(
          $("<img>")
            .attr("src", "/img/facepic/" + element.who + ".jpg")
            .css("height", "auto")
        );

      let $comment = $("<div>")
        .addClass("comment col")
        .text(element.comment);
      let $date = $("<div>")
        .addClass("row")
        .append(
          $("<div>")
            .addClass("date col-12")
            .text(formatDate(date))
        );
      let $facepicAndComment = $("<div>")
        .addClass("row")
        .append($facepic)
        .append($comment);

      let $commentArea = $("<div>")
        .addClass("container-fluid comment-area")
        .append($facepicAndComment)
        .append($date).appendTo($cardBody);

      let $card = $("<div>")
        .addClass("card")
        .append($img)
        .append($cardBody);

      let $testimony = $("<div>")
        .addClass("testimony grid-item")
        .append($card)
        .appendTo($("#testimonies-main > .grid"));
    });

    let masonry = function() {
      $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
        columnWidth: 300,
        fitWidth: true
      });
    };
    masonry();
    $(".testimony.grid-item").on("click", function() {
      let size = $(this).hasClass("large") ? { width: 600 } : { width: 300 };
      $(this)
        .toggleClass("large")
        .animate(size, masonry);
    });
  });
});

function formatDate(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}
