import View from "./View";
import * as domEl from "../dom-elements";

class JobcardsViews extends View {
  _parentElement = domEl.jobcardsContainer;
  _errorMessage = "No job found!";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
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

export default new JobcardsViews();
