import { async } from "regenerator-runtime";
import * as model from "./model";
import jobcardsViews from "./views/jobcardsViews";
import paginationView from "./views/paginationView";
import searchView from "./views/searchView";
import jobdetailsView from "./views/jobdetailsView";

const controlJobcards = async function () {
  try {
    //Initialised the currentDisplay state
    model.initialJobsLoad();

    // render the jobs on the current display to the DOM
    jobcardsViews.render(model.state.currentDisplay);
    model.checkJobList();
    paginationView.hideShowMoreBtn(model.state.nextDisplay);
  } catch (error) {
    jobcardsViews.renderError();
  }
};

const controlPagination = async function () {
  try {
    //Initialised the next display state
    paginationView.renderSpinner();
    // Render the jobs on the next display list when the load more button is clicked
    setTimeout(function () {
      if (model.state.search.isFiltering) {
        paginationView.render(model.state.search.nextDisplay);
        model.loadMoreJob();
        model.checkJobList();
        paginationView.hideShowMoreBtn(model.state.search.nextDisplay);
      } else {
        paginationView.render(model.state.nextDisplay);
        model.loadMoreJob();
        model.checkJobList();
        paginationView.hideShowMoreBtn(model.state.nextDisplay);
      }
    }, 1500);
  } catch (error) {
    paginationView.renderError();
  }
};

const controlSearch = async function (query) {
  try {
    model.initialisedState();
    model.filterJobs(query);
    searchView.render(model.state.search.nextDisplay);

    model.loadMoreJob();
    model.checkJobList();

    paginationView.hideShowMoreBtn(model.state.search.nextDisplay);
  } catch (error) {
    model.state.search.isFiltering = false;
    searchView.renderError();
  }
};

const controlMobileSearch = async function (query) {
  try {
    model.initialisedState();
    model.mobileFormFilter(query);

    searchView.renderMobileSearch(model.state.search.nextDisplay);
    model.checkJobList();
    paginationView.hideShowMoreBtn(model.state.search.nextDisplay);
  } catch (error) {
    searchView.renderError();
    model.state.search.isFiltering = false;
  }
};

const controlDetailsPage = async function (target) {
  try {
    model.getAJobObject(target);

    jobdetailsView.render(model.state.job);
  } catch (error) {}
};

// Initialised the DOM
const init = function () {
  jobcardsViews.addHandlerRender(controlJobcards);
  paginationView.addHandlerClick(controlPagination);
  searchView.addHandlerSubmit(controlSearch);
  searchView.addHandlerMobileSubmit(controlMobileSearch);
  jobdetailsView.addHandlerClick(controlDetailsPage);
};

init();
