(function($) {
  // ---------------------------------
  // menu scrolling
  // ---------------------------------
  //according to loftblog tut
  $(".main-menu li:first").addClass("active");

  var showSection = function showSection(section, isAnimate) {
    var direction = section.replace(/#/, ""),
      reqSection = $(".section").filter(
        '[data-section="' + direction + '"]'
      ),
      reqSectionPos = reqSection.offset().top - 0;

    if (isAnimate) {
      $("body, html").animate(
        {
          scrollTop: reqSectionPos
        },
        800
      );
    } else {
      $("body, html").scrollTop(reqSectionPos);
    }
  };

  var checkSection = function checkSection() {
    $(".section").each(function() {
      var $this = $(this),
        topEdge = $this.offset().top - 80,
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();
      if (topEdge < wScroll && bottomEdge > wScroll) {
        var currentId = $this.data("section"),
          reqLink = $("a").filter("[href*=\\#" + currentId + "]");
        reqLink
          .closest("li")
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
    });
  };

  $(".main-menu").on("click", "a", function(e) {
    e.preventDefault();
    showSection($(this).attr("href"), true);
  });

  $(window).scroll(function() {
    checkSection();
  });
  // ---------------------------------
  // end menu scrolling
  // ---------------------------------

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
  
  // Keep standalone/swarm selection in sync across all nav-tabs
  $("a.nav-link.link-standalone").on("click", function(e, triggered) {
    if (!triggered) { // prevent circular calls
      var links = $("a.nav-link.link-standalone");
      links.splice($.inArray(e.target, links), 1); // remove current item
      
      $(links).each(function(index, element) {
        $(element).trigger("click", true);
      });
    }
  });
  $("a.nav-link.link-swarm").on("click", function(e, triggered) {
    if (!triggered) { // prevent circular calls
      var links = $("a.nav-link.link-swarm");
      links.splice($.inArray(e.target, links), 1); // remove current item
      
      $(links).each(function(index, element) {
        $(element).trigger("click", true);
      });
    }
  });
})(jQuery);
