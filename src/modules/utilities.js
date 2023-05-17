import * as domEl from "./dom-elements";

// Controlling the theme color
const result = matchMedia("(prefers-color-scheme:dark)");
if (result.matches) {
  domEl.themeSwitch.checked = true;
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
} else {
  domEl.themeSwitch.checked = false;
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
}

domEl.themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    // localStorage.setItem("theme", 'dark');
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    // localStorage.setItem("theme", 'light');
  }
});
