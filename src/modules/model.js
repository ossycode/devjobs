import { async } from "regenerator-runtime";
import { RESQUEST_PER_PAGE } from "./config";
import jobdata from "../../data.json";

export const state = {
  job: {},
  currentDisplay: [],
  nextDisplay: [],
  resultsPerPage: RESQUEST_PER_PAGE,
  jobdata,
  search: {
    query: "",
    results: [],
    currentDisplay: [],
    nextDisplay: [],
    isFiltering: false,
  },
};

export const initialJobsLoad = async function () {
  try {
    checkJobList();
    state.search.isFiltering = false;
    state.currentDisplay = state.nextDisplay;
    state.currentDisplay.map((job) => returnedData(job));
  } catch (error) {
    throw error;
  }
};

// Display the jobs to the DOM
export const loadMoreJob = async function () {
  try {
    checkJobList();
    if (state.search.isFiltering) {
      state.search.currentDisplay = state.search.currentDisplay.concat(
        state.search.nextDisplay
      );
      state.search.nextDisplay.map((job) => returnedData(job));
    } else {
      state.currentDisplay = state.currentDisplay.concat(state.nextDisplay);
      state.nextDisplay.map((job) => returnedData(job));
    }
    checkJobList();
  } catch (error) {
    throw error;
  }
};

export const getAJobObject = async function (data) {
  state.jobdata.filter((job) => {
    if (job.id === data) {
      state.job = job;
    }
  });
};
// Get the jobs remaining on the list
// If no more jobs, the show more button will be hidden
export const checkJobList = async function () {
  try {
    if (state.search.isFiltering) {
      const start = state.search.currentDisplay.length;
      const end = start + state.resultsPerPage;
      return (state.search.nextDisplay = state.search.results.slice(
        start,
        end
      ));
    } else {
      const start = state.currentDisplay.length;
      const end = start + state.resultsPerPage;
      return (state.nextDisplay = jobdata.slice(start, end));
    }
  } catch (error) {
    throw error;
  }
};

export const filterJobs = async function (data) {
  try {
    state.search.isFiltering = true;
    if (data.location_filter.toLowerCase() === "us") {
      data.location_filter = "united states";
    }
    if (data.location_filter.toLowerCase() === "uk") {
      data.location_filter = "united kingdom";
    }

    // filter jobs if all the fields are not empty
    if (
      data.form_checkbox === "on" &&
      data.other_filter !== "" &&
      data.location_filter !== ""
    ) {
      state.search.results = state.jobdata.filter(
        (job) =>
          _checkforTitleCompanyExpertise(data, job) &&
          _checkForContractType(job) &&
          _checkForLocation(data, job)
      );
    }

    // filter jobs if location and other inputs filled but checkbox is not checked
    if (
      data.form_checkbox !== "on" &&
      data.other_filter !== "" &&
      data.location_filter !== ""
    ) {
      state.search.results = state.jobdata.filter(
        (job) =>
          _checkforTitleCompanyExpertise(data, job) &&
          _checkForLocation(data, job)
      );
    }

    // filter jobs if only location input and checkbox is checked
    if (
      data.form_checkbox === "on" &&
      data.other_filter === "" &&
      data.location_filter !== ""
    ) {
      state.search.results = state.jobdata.filter(
        (job) => _checkForLocation(data, job) && _checkForContractType(job)
      );
    }

    // filter jobs if only other input and checkbox is checked
    if (
      data.form_checkbox === "on" &&
      data.other_filter !== "" &&
      data.location_filter === ""
    ) {
      state.search.results = state.jobdata.filter(
        (job) =>
          _checkForContractType(job) &&
          _checkforTitleCompanyExpertise(data, job)
      );
    }

    // filter jobs if only checkbox is checked
    if (
      data.form_checkbox === "on" &&
      data.other_filter === "" &&
      data.location_filter === ""
    ) {
      state.search.results = state.jobdata.filter((job) =>
        _checkForContractType(job)
      );
    }

    // filter jobs if only location input is filled
    if (
      data.other_filter === "" &&
      data.form_checkbox !== "on" &&
      data.location_filter !== ""
    ) {
      state.search.results = state.jobdata.filter((job) =>
        _checkForLocation(data, job)
      );
    }

    // filter jobs if only other input is filled
    if (
      data.other_filter !== "" &&
      data.form_checkbox !== "on" &&
      data.location_filter === ""
    ) {
      state.search.results = state.jobdata.filter((job) =>
        _checkforTitleCompanyExpertise(data, job)
      );
    }
    checkJobList();
    state.search.nextDisplay.map((job) => returnedData(job));
  } catch (error) {
    throw error;
  }
};

export const mobileFormFilter = async function (data) {
  try {
    state.search.isFiltering = true;
    if (data.mobileForm_filter.toLowerCase() === "us") {
      data.mobileForm_filter = "united states";
    }
    if (data.mobileForm_filter.toLowerCase() === "uk") {
      data.mobileForm_filter = "united kingdom";
    }
    if (data.mobileForm_filter !== "" && data.mobile_checkbox === "on") {
      state.search.results = state.jobdata.filter(
        (job) => _checkMobileLocation(data, job) && _checkForContractType(job)
      );
    }

    if (data.mobileForm_filter !== "" && data.mobile_checkbox !== "on") {
      state.search.results = state.jobdata.filter((job) =>
        _checkMobileLocation(data, job)
      );
    }

    if (data.mobileForm_filter === "" && data.mobile_checkbox === "on") {
      state.search.results = state.jobdata.filter((job) =>
        _checkForContractType(job)
      );
    }
    checkJobList();
    state.search.nextDisplay.map((job) => returnedData(job));
  } catch (error) {
    throw error;
  }
};

const returnedData = function (job) {
  return {
    id: job.id,
    logo: job.logo,
    company: job.company,
    logoBackground: job.logoBackground,
    position: job.position,
    postedAt: job.postedAt,
    contract: job.contract,
    location: job.location,
    website: job.website,
    apply: job.apply,
    description: job.description,
    requirements: job.requirements,
    role: job.role,
  };
};

const _checkforTitleCompanyExpertise = function (data, job) {
  const jobs =
    data.other_filter.toLowerCase() === job.company.toLowerCase() ||
    job.position.toLowerCase().includes(data.other_filter.toLowerCase()) ||
    job.requirements.content
      .toLowerCase()
      .includes(data.other_filter.toLowerCase()) ||
    job.requirements.items.some((expertise) =>
      expertise.toLowerCase().includes(data.other_filter.toLowerCase())
    );

  return jobs;
};

const _checkForLocation = function (data, job) {
  const jobs =
    data.location_filter.toLowerCase() === job.location.toLowerCase();

  return jobs;
};

const _checkForContractType = function (job) {
  const jobs = job.contract.toLowerCase() === "full time";

  return jobs;
};

const _checkMobileLocation = function (data, job) {
  const jobs =
    data.mobileForm_filter.toLowerCase() === job.location.toLowerCase();

  return jobs;
};

export const initialisedState = function () {
  state.currentDisplay = [];
  state.nextDisplay = [];
  state.search.currentDisplay = [];
  state.search.nextDisplay = [];
};
