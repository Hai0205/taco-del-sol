// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
  language();
  header();
  animationText();
  magicCursor();
  eventSwiper();
});

function header() {
  let height = $(".header__container").height() * -1;
  console.log(height);
  let navTop;

  function initializeScrollTrigger() {
    navTop = gsap
      .from("header", {
        y: height,
        paused: true,
        duration: 0.5,
        ease: "power4.out",
        trigger: "header",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        // Shrink navTop
        self.direction === -1 ? navTop.play() : navTop.reverse();
        // self.refresh();
        if (self.direction === -1) {
          $(".header__sub-menu");
          console.log("scroll lên");
        } else {
          console.log("scroll xuống");
        }
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}
function language() {
  const $dropdowns = $(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = $(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
      $(".lang__head").toggleClass("--active");
    });

    $(document).on("click", function () {
      closeAllDropdowns();
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $item = $(this);
      const tmp = $textDropdown.text();
      $textDropdown.text($item.text());
      if ($item.hasClass("lang__item")) {
        $item.text(tmp);
      }
      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $dropdowns.each(function () {
        const $menu = $(this).find(".dropdown-custom__menu");
        if (!exception || !$(this).is(exception)) {
          $menu.removeClass("dropdown--active");
        }
      });
    }
  });
}
// function animtionText() {
//   gsap.registerPlugin(SplitType);

//   $(".introduce h1").each(function (index, element) {
//     const split = new SplitType(element, {
//       type: "words",
//       wordsClass: "words",
//     });

//     // List of predefined colors
//     const colors = ["#feb503", "#ee2400", "#108a00"];

//     // Create a timeline for the animation
//     const tl = gsap.timeline();

//     // Animate the characters with random colors from the list
//     tl.set(
//       split.words,
//       {
//         color: function () {
//           // Pick a random color from the list
//           return colors[Math.floor(Math.random() * colors.length)];
//         },
//         stagger: 0.1,
//       },
//       0.1
//     );
//   });
// }
function animationText() {
  gsap.registerPlugin(SplitType);

  $(".text-random h1").each(function (index, element) {
    const split = new SplitType(element, {
      type: "words",
      wordsClass: "words",
    });

    const colors = ["#feb503", "#ee2400", "#108a00"];
    let availableColors = [...colors]; // Clone the color array

    // Function to get a random color ensuring all colors are used
    function getRandomColor() {
      if (availableColors.length === 0) {
        availableColors = [...colors]; // Refill the available colors if all are used
      }

      const randomIndex = Math.floor(Math.random() * availableColors.length);
      return availableColors.splice(randomIndex, 1)[0]; // Remove and return the random color
    }

    gsap.set(
      split.words,
      {
        color: function () {
          return getRandomColor(); // Get a random color
        },
      },
      0.1
    );
  });
}

function magicCursor() {
  $(document).on("mousemove", function (e) {
    $(".cursor-magic").css({
      top: e.pageY - 10 + "px",
      left: e.pageX - 10 + "px",
    });
  });
  $(document).on("mousedown", function () {
    $(".cursor-magic").addClass("--active");
    setTimeout(function () {
      $(".cursor-magic").removeClass("--active");
    }, 400);
  });
  $("body a, .dropdown-custom__item,.dropdown-custom__text").mouseenter(
    function () {
      $(".cursor-magic").addClass("--active");
    }
  );

  $("body a,.dropdown-custom__item,.dropdown-custom__text").mouseleave(
    function () {
      $(".cursor-magic").removeClass("--active");
    }
  );
}
function eventSwiper() {
  if ($(".events-sec").length) {
    const swiperOffer = new Swiper(".swiper-event", {
      slidesPerView: 4,
      spaceBetween: 24,
      navigation: {
        nextEl: ".events-sec .swiper-button-next",
        prevEl: ".events-sec .swiper-button-prev",
      },
    });
  }
}
