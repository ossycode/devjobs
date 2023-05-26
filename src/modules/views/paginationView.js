import View from "./View";
import * as domEl from "../dom-elements";

class PaginationView extends View {
  _loadMoreBtn = domEl.loadMoreBtn;
  _parentElement = domEl.jobcardsContainer;
  _spinner = domEl.spinner;

  addHandlerClick(handler) {
    this._loadMoreBtn.addEventListener("click", handler);
  }
  // Render more jobs to the DOM
  render(data) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSpinner() {
    this._spinner.classList.add("show");
    setTimeout(() => {
      this._spinner.classList.remove("show");
    }, 1000);
  }

  // Hide the Show more button when all the jobs are displayed
  hideShowMoreBtn(data) {
    this._data = data;
    if (this._data.length === 0) {
      this._loadMoreBtn.classList.add("hide");
    } else {
      this._loadMoreBtn.classList.remove("hide");
    }
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupJobs).join("");
  }

  _generateMarkupJobs(result) {
    return ` <div class="jobcard">
    <div class="jobcard__logo" style="background-color: ${result.logoBackground}">
    <img src="${result.logo}" alt="the company adversiting the job">
    </div>
    <div class="jobcard__timeAndType">
    <p class="jobcard__posted">${result.postedAt}</p>
    <span>&#x2022;</span>
    <p class="jobcard__jobType">${result.contract}</p>
    </div>
    <a class="heading__3 jobcard__title " href="#" aria-label="Learn more about the job" data-id="${result.id}">${result.position}</a>
    <p class="jobcard__company">${result.company}</p>
    
    <p class="jobcard__country">${result.location}</p>
    
    </div>`;
  }
}

export default new PaginationView();
