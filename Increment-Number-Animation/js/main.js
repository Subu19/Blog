function isElementOutOfView(element) {
  return (
    element.getBoundingClientRect().top >
    (window.innerHeight - 100 || document.documentElement.clientHeight - 100)
  );
}

class Count {
  constructor(final, element) {
    this.initial = 0;
    this.final = final;
    this.current = 0;
    this.element = element;
    this.increment = final / 200;
    this.isProcessing = false;
  }

  start() {
    this.interval = setInterval(() => {
      if (this.current < this.final) {
        this.current += this.increment;

        this.element.innerHTML = `${Math.round(this.current)}`;
      } else {
        clearInterval(this.interval);
        this.isProcessing = false;
      }
    }, 10);
  }

  reset() {
    this.isProcessing = false;
    this.current = 0;
    this.element.innerHTML = "0";
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  checkAndUpdate() {
    if (!isElementOutOfView(this.element)) {
      if (!this.isProcessing) {
        this.isProcessing = true;
        this.start();
      }
    } else {
      this.reset();
    }
  }
}

const countAnimationElements = document.querySelectorAll(".count");

const CountingObjects = [];

countAnimationElements.forEach((element) => {
  CountingObjects.push(new Count(parseInt(element.innerHTML), element));
  element.innerHTML = "0";
});

function updateCount() {
  CountingObjects.forEach((obj) => {
    obj.checkAndUpdate();
  });
}

document.addEventListener("scroll", () => {
  updateCount();
});
