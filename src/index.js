// Collapse toggle menu after click
$(document).ready(function () {

  $(document).click(function(event) {
    var _opened = ($("#stNavbar").css("display") == "block");
    if (_opened === true
      && !($(event.target).hasClass("navbar-toggler")
          || $(event.target.parentElement).hasClass("navbar-toggler")
          || $(event.target.parentElement.parentElement).hasClass("navbar-toggler"))) {
      const menuToggle = document.getElementById('stNavbar')
      const bsCollapse = new bootstrap.Collapse(menuToggle)

     }
  });
})

$(document).ready(function () {
  $("a.a-pub").hover(function (e) {
    if ($(e.currentTarget).attr('href')) {
      $(e.currentTarget).css("color", $(":root").css("--bs-primary"));
      $(e.currentTarget).removeClass("text-decoration-none");
    }
  }, function (e) {
    if ($(e.currentTarget).attr('href')) {
      $(e.currentTarget).css("color", $("body").css("color"));
      $(e.currentTarget).addClass("text-decoration-none");
    }
  });
});
