$(function() {
  // $('#testimonies-main').css('display', 'none');
  console.log(window.location.hostname);
  let dir = (window.location.hostname === 'segakazzz.github.io') ? '/week5-group-exercise/' : '/'
  let masonry = function() {
    $(".grid").masonry({
      // options
      itemSelector: ".grid-item",
      columnWidth: 400,
      fitWidth: true
    });
  };

  
  $.get(dir + "testimonies.json", function(data) {
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
      let $location = $("<div>")
        .addClass("container-fluid location")
        .text(element.city + ', '+ element.country)
        .prepend($("<i>").addClass("fas fa-thumbtack"))
      let $cardText = $("<p>").text(element.text);
      let $cardBody = $("<div>")
        .addClass("card-body")
        .append($cardTitle)
        .append($cardText)
        .append($location)
        .append($("<hr>"));

      let $facepic = $("<div>")
        .addClass("face col-3")
        .append(
          $("<img>")
            .attr("src", dir + "img/" + element.who + "Pic.jpeg")
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
        .append($date)
        .appendTo($cardBody);

      let $card = $("<div>")
        .addClass("card")
        .append($img)
        .append($cardBody);

      let $testimony = $("<div>")
        .addClass("testimony grid-item")
        .append($card)
        .appendTo($("#testimonies-main > .grid"));

        if (index == data.length - 1){
          $('img').on('load', function(){
            masonry();
          });
        }
    });
    
    $(".testimony.grid-item").on("click", function() {
      let size = $(this).hasClass("large") ? { width: 800 } : { width: 400 };
      $(this)
        .toggleClass("large")
        .animate(size, masonry);
    });
  });
});

function formatDate(date) {
  var cstDate = new Date();
  cstDate.setTime(date.getTime() + cstDate.getTimezoneOffset() * 60 * 1000)
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

  var day = cstDate.getDate();
  var monthIndex = cstDate.getMonth();
  var year = cstDate.getFullYear();

  return  monthNames[monthIndex] + " " + day + ", " + year;
}
