(function($) {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");

  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
  });

  // Close menu after click on smaller screens
  $(window).on("resize", function() {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function() {
        menu.classList.remove("open");
      });
    }
  });
  
  // Keep arm/x86 selection in sync across all nav-tabs
  $("a.nav-link.link-arm").on("click", function(e, triggered) {
    if (!triggered) { // prevent circular calls
      var links = $("a.nav-link.link-arm");
      links.splice($.inArray(e.target, links), 1); // remove current item
      
      $(links).each(function(index, element) {
        $(element).trigger("click", true);
      });
    }
  });  
  $("a.nav-link.link-x86").on("click", function(e, triggered) {
    if (!triggered) { // prevent circular calls
      var links = $("a.nav-link.link-x86");
      links.splice($.inArray(e.target, links), 1); // remove current item
      
      $(links).each(function(index, element) {
        $(element).trigger("click", true);
      });
    }
  });
})(jQuery);
