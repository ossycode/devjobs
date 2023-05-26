import View from "./View";
import * as domEl from "../dom-elements";

class JobcardsViews extends View {
  _parentElement = domEl.mainContainer;

  addHandlerClick(handler) {
    domEl.jobcardsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("jobcard__title")) {
        e.preventDefault();
        const data = +e.target.dataset.id;
        handler(data);
      }
    });
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkupJob(this._data);
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupJob).join("");
  }

  _generateMarkupJob(result) {
    return `    <header class="header">
    <a class="header__link" href="/dist/index.html" aria-label="Devjobs header logo"> <img class="header__logo"
            src="/dist/assets/desktop/logo.svg" alt=" Devjobs logo - home page"></a>

    <div class="header__theme-control">
        <div class="header__sun"> <img src="/dist/assets/desktop/icon-sun.svg" alt="An icom of the sun"> </div>
        <div class="theme-slider-container">
            <label for="header-checkbox" class="theme-slider-container__label">
                <input type="checkbox" name="header-checkbox" id="header-checkbox" />
                <div class="theme-slider-container__slider round"></div>
            </label>

        </div>

        <div header__moon> <img src="/dist/assets/desktop/icon-moon.svg" alt="An icom of the moon"></div>
    </div>
</header>

<nav class="nav">
    <div class="nav__company" style="background-color: ${
      result.logoBackground
    }">
    <img src="${result.logo}" alt="the company adversiting the job">
    </div>

    <div class="nav__info">
        <p class="nav__title heading__2">${result.company}</p>
        <p class="nav__website">${result.company}.com</p>
    </div>

    <div class="nav__website-link">
        <a class="nav__website-link-item " href="${
          result.website
        }" aria-label="A link to the company website">Company Site</a>
    </div>
</nav>

<main class="details-main">
    <div class="job-info">
        <div class="job">
            <div class="jobcard__timeAndType">
                <p class="jobcard__posted job-posted">${result.postedAt}</p>
                <span>&#x2022;</span>
                <p class="jobcard__jobType job-type">${result.contract}</p>
            </div>

            <h1 class="job__title heading__1">${result.position}</h1>
            <p class="job__location">${result.location}</p>
        </div>

        <a class="job__applyNow-btn  btn-1 btn-2 " href="http://" aria-label="Apply now">Apply Now</a>
    </div>

    <p class="job-about">${result.description}</p>

    <div class="requirement ">
        <h2 class="requirement__title heading__3">Requirements</h2>
        <p class="requirement__text">${result.requirements.content}</p>
        <ul class="requirement_list">
        ${result.requirements.items
          .map((element) => {
            return `<li class="requirement_item"><span>${element}</span></li>`;
          })
          .join("")}
        </ul>
    </div>

    <div class="responsibilities ">
        <h2 class="responsibilities__title heading__3">What You Will Do</h2>
        <p class="responsibilities__text">${result.role.content}</p>
        <ul class="responsibilities__list">
            
            ${result.role.items
              .map((element) => {
                return `<li> <span>${element}</span></li>`;
              })
              .join("")}
        </ul>
    </div>

</main>

<footer class="footer">

    <div class="footer__container">
        <div class="footer__info">
            <h2 class="footer__title heading__3">${result.position}</h2>
            <p class="footer__company">${result.company}</p>
        </div>

        <a class="footer__applyNow-btn btn-1 btn-2" href="http://" aria-label="Apply now">Apply Now</a>
    </div>
</footer>`;
  }
}

export default new JobcardsViews();
