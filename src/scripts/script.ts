import $ from "jquery";

// Global variables
const RATIO = (0.05 * 2) / 3;
const animationDuration = 400;
let menuOpened = false;

// Select elements
const header = document.querySelector("header") as HTMLHeadingElement;

// Functions
const headerFading = () => {
  const html = document.querySelector("html") as HTMLHtmlElement;

  if (menuOpened) return (header.style.animation = "colorFadeIn 1s forwards");

  if (html.scrollTop > 0)
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
      destination.offset()!.top - destination.offset()!.top * RATIO;

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

    if (
      event.currentTarget.parentNode?.parentElement?.getAttribute("id") !==
      "dropdown-menu"
    )
      return;

    toggleMenu();
  });

  // dropdown-menu
  $("#burger-menu").on("click", toggleMenu);

  // read-more button
  $("#read-more").on("click", () => smoothScroll("#introduction"));
});
