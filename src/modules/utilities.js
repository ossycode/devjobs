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

domEl.mainContainer.addEventListener("change", function (e) {
  if (e.target.id === "header-checkbox") {
    if (e.target.checked) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      // localStorage.setItem("theme", 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      // localStorage.setItem("theme", 'light');
    }
  }
});

// document.addEventListener("resize", function (e) {
//   if (window.innerWidth < 500) {
//     console.log("working");
//     domEl.titleFilter.attr("placeholder", "Filter by title..");
//     domEl.contractFilterLabel.textContent = "Full Time";
//   } else {
//     domEl.titleFilter.attr(
//       "placeholder",
//       "Filter by title, companies, expertise..."
//     );
//     domEl.contractFilterLabel.textContent = "Full Time Only";
//   }
// });

const media = window.matchMedia("(max-width: 1200px)");

["load", "resize"].forEach((event) =>
  window.addEventListener(event, function (e) {
    if (media.matches) {
      domEl.titleFilter.setAttribute("placeholder", "Filter by title..");
      domEl.contractFilterLabel.textContent = "Full Time";
    } else {
      domEl.titleFilter.setAttribute(
        "placeholder",
        "Filter by title, companies, expertise..."
      );
      domEl.contractFilterLabel.textContent = "Full Time Only";
    }
  })
);

domEl.mobileSearchFilter.addEventListener("click", function (e) {
  domEl.modal.classList.toggle("show");
});

window.onclick = function (event) {
  if (event.target == domEl.modal) {
    domEl.modal.classList.toggle("show");
  }
};
