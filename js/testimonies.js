$(function() {
    // $('#testimonies-main').css('display', 'none');
  $.get("../testimonies.json", function(data) {
    for(var i = data.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = data[i];
        data[i] = data[r];
        data[r] = tmp;
    }
    data.forEach((element, index) => {
      let $img = $("<img>")
        .attr("src", element.imgSource)
        .addClass("card-img-top");

      let $new = $("<span>")
        .addClass("badge badge-danger")
        .text("New!");
      let $cardTitle = $("<h5>").text(element.title);
      if (element.new){
          $cardTitle.prepend($new);
      }

      let $cardText = $("<p>").text(element.text);
      let $cardBody = $("<div>")
        .addClass("card-body")
        .append($cardTitle)
        .append($cardText);
      let $card = $("<div>")
        .addClass("card")
        .append($img)
        .append($cardBody);

      let $testimony = $("<div>")
        .addClass("testimony grid-item")
        .append($card)
        .appendTo($("#testimonies-main > .grid"));

    });
    $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
        columnWidth: 300,
        fitWidth: true
      });

  });
});
