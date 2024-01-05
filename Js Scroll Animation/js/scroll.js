const fadeUpElements = document.querySelectorAll(".fade-up");

function isElementOutOfView(element) {
  return (
    element.getBoundingClientRect().top >
    (window.innerHeight - 100 || document.documentElement.clientHeight - 100)
  );
}

function displayFadeUpElement(element) {
  element.classList.add("fade-up-scrolled");
}
function hideFadeUpElement(element) {
  element.classList.remove("fade-up-scrolled");
}

function scrollRevealCheck() {
  fadeUpElements.forEach((element) => {
    if (!isElementOutOfView(element)) {
      displayFadeUpElement(element);
    } else {
      hideFadeUpElement(element);
    }
  });
}

document.addEventListener("scroll", (e) => {
  scrollRevealCheck();
});

//triggering this function once on startup to prevent glitches.
scrollRevealCheck();
