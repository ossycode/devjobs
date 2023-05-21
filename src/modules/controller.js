import { async } from "regenerator-runtime";
import * as model from "./model";
import jobcardsViews from "./views/jobcardsViews";
import paginationView from "./views/paginationView";
import searchView from "./views/searchView";

const controlJobcards = async function () {
  try {
    //Initialised the currentDisplay state
    model.initialJobsLoad();

    // render the jobs on the current display to the DOM
    jobcardsViews.render(model.state.currentDisplay);
  } catch (error) {
    jobcardsViews.renderError();
  }
};

const controlPagination = async function () {
  try {
    //Initialised the next display state
    model.loadMoreJob();

    paginationView.renderSpinner();

    // Render the jobs on the next display list when the load more button is clicked
    setTimeout(function () {
      if (model.state.search.isFiltering) {
        paginationView.render(model.state.search.nextDisplay);
        model.checkJobList();
        paginationView.hideShowMoreBtn(model.state.search.nextDisplay);
      } else {
        paginationView.render(model.state.nextDisplay);
        model.checkJobList();
        paginationView.hideShowMoreBtn(model.state.nextDisplay);
      }
    }, 1500);
  } catch (error) {
    paginationView.renderError();
  }
};

const controlSearch = async function (query) {
  // Get search query
  // const query = searchView.getQuery();
  // if (!query) return;
  try {
    model.initialisedState();
    model.filterJobs(query);

    searchView.render(model.state.search.nextDisplay);
    paginationView.hideShowMoreBtn(model.state.search.nextDisplay);
  } catch (error) {
    searchView.renderError();
  }
};

// Initialised the DOM
const init = function () {
  jobcardsViews.addHandlerRender(controlJobcards);
  paginationView.addHandlerClick(controlPagination);
  searchView.addHandlerSubmit(controlSearch);
};

init();
