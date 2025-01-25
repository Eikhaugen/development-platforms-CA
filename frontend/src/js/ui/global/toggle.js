export function toggleVisibility(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle("hidden");
    } else {
      console.error(`Element with selector "${selector}" not found!`);
    }
  }
  