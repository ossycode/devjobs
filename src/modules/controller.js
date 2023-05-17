import { async } from "regenerator-runtime";
import * as model from "./model";
import jobcardsViews from "./views/jobcardsViews";
import paginationView from "./views/paginationView";

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
      paginationView.render(model.state.nextDisplay);
      model.checkJobList();
      paginationView.hideShowMoreBtn(model.state.nextDisplay);
    }, 1500);
  } catch (error) {
    paginationView.renderError();
  }
};

// Initialised the DOM
const init = function () {
  jobcardsViews.addHandlerRender(controlJobcards);
  paginationView.addHandlerClick(controlPagination);
};

init();
