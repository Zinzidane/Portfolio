var navMain = document.querySelector(".main-nav");
    var navToggler = document.querySelector(".main-nav__toggler");

    navMain.classList.remove("main-nav--nojs");

    navToggler.addEventListener("click", function() {
      if (navMain.classList.contains("main-nav--closed")) {
        navMain.classList.remove("main-nav--closed");
        navMain.classList.add("main-nav--opened");
      } else {
        navMain.classList.add("main-nav--closed");
        navMain.classList.remove("main-nav--opened");
      }
    });
