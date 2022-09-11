import $ from "jquery";

// Global variables
const animationDuration = 400;
let menuOpened = false;

// Select elements
const header = document.querySelector("header") as HTMLHeadingElement;

// Functions
const headerFading = () => {
  if (menuOpened) return (header.style.animation = "colorFadeIn 1s forwards");

  if (document.querySelector("html")!.scrollTop > 0)
    return (header.style.animation = "colorFadeIn 1s forwards");

  return (header.style.animation = "colorFadeOut 1s forwards");
};

const toggleMenu = () => {
  if (!menuOpened) {
    menuOpened = !menuOpened;
    headerFading();

    $("#burger-icon").fadeOut(animationDuration);
    $("#dropdown-menu").fadeIn(animationDuration);
    setTimeout(() => {
      $("#close-icon").fadeIn(animationDuration);
    }, animationDuration);
  } else {
    menuOpened = !menuOpened;
    headerFading();

    $("#close-icon").fadeOut(animationDuration);
    $("#dropdown-menu").fadeOut(animationDuration);
    setTimeout(() => {
      $("#burger-icon").fadeIn(animationDuration);
    }, animationDuration);
  }
};

// Add jQuery
window.addEventListener("scroll", headerFading);
$(() => {
  const smoothScroll = (cssSelector: string) => {
    const destination = $(cssSelector);
    const scrollPosition =
      destination.offset()!.top - destination.offset()!.top * 0.05;

    $("html").animate(
      {
        scrollTop: scrollPosition,
      },
      animationDuration
    );
  };

  // nav-links
  $(".nav-links").on("click", (event) => {
    const destination = event.currentTarget.getAttribute("href")!;
    smoothScroll(destination);
    toggleMenu();
  });

  // dropdown-menu
  $("#burger-menu").on("click", toggleMenu);

  // read-more button
  $("#read-more").on("click", () => smoothScroll("#introduction"));
});
