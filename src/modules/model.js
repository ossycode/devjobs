import { async } from "regenerator-runtime";
import { RESQUEST_PER_PAGE } from "./config";
import jobdata from "../../data.json";

export const state = {
  currentDisplay: [],
  nextDisplay: [],
  resultsPerPage: RESQUEST_PER_PAGE,
  jobdata,
};

export const initialJobsLoad = async function () {
  try {
    checkJobList();
    state.currentDisplay = state.nextDisplay;
    state.currentDisplay.map((job) => {
      return {
        id: job.id,
        logo: job.logo,
        company: job.company,
        logoBackground: job.logoBackground,
        position: job.position,
        postedAt: job.postedAt,
        contract: job.contract,
        location: job.location,
      };
    });
  } catch (error) {
    throw error;
  }
};

// Display the jobs to the DOM
export const loadMoreJob = async function () {
  try {
    checkJobList();
    state.currentDisplay = state.currentDisplay.concat(state.nextDisplay);
    state.nextDisplay.map((job) => {
      return {
        id: job.id,
        logo: job.logo,
        company: job.company,
        logoBackground: job.logoBackground,
        position: job.position,
        postedAt: job.postedAt,
        contract: job.contract,
        location: job.location,
      };
    });
  } catch (error) {
    throw error;
  }
};

// Get the jobs remaining on the list
// If no more jobs, the show more button will be hidden
export const checkJobList = async function () {
  try {
    const start = state.currentDisplay.length;
    const end = start + state.resultsPerPage;
    return (state.nextDisplay = jobdata.slice(start, end));
  } catch (error) {
    throw error;
  }
};
