// Collapse toggle menu after click
  var doesToggleEventCalled=false;
  function addToggleEvent() {
  if (!doesToggleEventCalled) {
  const navLinks = document.querySelectorAll('.nav-item')
  const menuToggle = document.getElementById('stNavbar')
  const bsCollapse = new bootstrap.Collapse(menuToggle)
  navLinks.forEach(function (i) {
  i.addEventListener('click', function () { bsCollapse.toggle(); })
})

  const navBtnCv = document.getElementById('navBtnCv')
  navBtnCv.addEventListener('click', function () { bsCollapse.toggle(); })

  doesToggleEventCalled=true;
}
}

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
