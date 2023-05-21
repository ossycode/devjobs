import * as domEl from "../dom-elements";
import View from "./View";

class SearchView extends View {
  _parentElement = domEl.jobcardsContainer;
  _errorMessage = "No Job found for your query! Please try again";
  _searchForm = domEl.searchForm;
  _loadMoreBtn = domEl.loadMoreBtn;

  addHandlerSubmit(handler) {
    this._searchForm.addEventListener("submit", function (e) {
      // console.log(this._locationInput);

      e.preventDefault();
      //   this._locationInput = " ";

      const rawData = [...new FormData(this)];
      const data = Object.fromEntries(rawData);
      domEl.searchForm.reset();
      handler(data);
    });
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this._loadMoreBtn.classList.add("hide");
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
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
    <a class="heading__3 jobcard__title " href="#" aria-label="Learn more about the job">${result.position}</a>
    <p class="jobcard__company">${result.company}</p>
    
    <p class="jobcard__country">${result.location}</p>
    
    </div>`;
  }
}

export default new SearchView();
