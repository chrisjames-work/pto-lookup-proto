import api from 'api';

export const INIT_APP = 'INIT_APP';

export const INIT_APP_START = 'INIT_APP_START';
export const INIT_APP_ERROR = 'INIT_APP_ERROR';
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS';

// init app

function initAppStart() {
  return {
    type: INIT_APP_START,
  };
}

function initAppSuccess(data) {
  return {
    type: INIT_APP_SUCCESS,
    data,
  };
}

function initAppError(error) {
  return {
    type: INIT_APP_ERROR,
    error,
  };
}

export function initApp() {
  return function (dispatch) {
    dispatch(initAppStart());

    api.initApp()
      .then(data => dispatch(initAppSuccess(data)))
      .catch(error => dispatch(initAppError(error)));
  };
}


export const GET_USER_ASSIGNMENTS_BY_PROJECT = 'GET_USER_ASSIGNMENTS_BY_PROJECT';

export const GET_USER_ASSIGNMENTS_BY_PROJECT_START = 'GET_USER_ASSIGNMENTS_BY_PROJECT_START';
export const GET_USER_ASSIGNMENTS_BY_PROJECT_ERROR = 'GET_USER_ASSIGNMENTS_BY_PROJECT_ERROR';
export const GET_USER_ASSIGNMENTS_BY_PROJECT_SUCCESS = 'GET_USER_ASSIGNMENTS_BY_PROJECT_SUCCESS';

// Gets assignments for each user on project team

function getUserAssignmentsByProjectStart() {
  return {
    type: GET_USER_ASSIGNMENTS_BY_PROJECT_START,
  };
}

function getUserAssignmentsByProjectSuccess(data) {
  return {
    type: GET_USER_ASSIGNMENTS_BY_PROJECT_SUCCESS,
    data,
  };
}

function getUserAssignmentsByProjectError(error) {
  return {
    type: GET_USER_ASSIGNMENTS_BY_PROJECT_ERROR,
    error,
  };
}

export function getUserAssignmentsByProject(projectId) {
  return function (dispatch, getState) {
    dispatch(getUserAssignmentsByProjectStart());

    api.getUserAssignmentsByProject(projectId, getState())
      .then(data => dispatch(getUserAssignmentsByProjectSuccess(data)))
      .catch(error => dispatch(getUserAssignmentsByProjectError(error)));
  };
}


export const GET_USER_ASSIGNMENTS_BY_LOCATION = 'GET_USER_ASSIGNMENTS_BY_LOCATION';

export const GET_USER_ASSIGNMENTS_BY_LOCATION_START = 'GET_USER_ASSIGNMENTS_BY_LOCATION_START';
export const GET_USER_ASSIGNMENTS_BY_LOCATION_ERROR = 'GET_USER_ASSIGNMENTS_BY_LOCATION_ERROR';
export const GET_USER_ASSIGNMENTS_BY_LOCATION_SUCCESS = 'GET_USER_ASSIGNMENTS_BY_LOCATION_SUCCESS';

// Gets assignments for each user on in a specific location/office

function getUserAssignmentsByLocationStart() {
  return {
    type: GET_USER_ASSIGNMENTS_BY_LOCATION_START,
  };
}

function getUserAssignmentsByLocationSuccess(data) {
  return {
    type: GET_USER_ASSIGNMENTS_BY_LOCATION_SUCCESS,
    data,
  };
}

function getUserAssignmentsByLocationError(error) {
  return {
    type: GET_USER_ASSIGNMENTS_BY_LOCATION_ERROR,
    error,
  };
}

export function getUserAssignmentsByLocation(location) {
  return function (dispatch, getState) {
    dispatch(getUserAssignmentsByLocationStart());

    api.getUserAssignmentsByLocation(location, getState())
      .then(data => dispatch(getUserAssignmentsByLocationSuccess(data)))
      .catch(error => dispatch(getUserAssignmentsByLocationError(error)));
  };
}


export const GET_USER_ASSIGNMENTS_BY_DISCIPLINE = 'GET_USER_ASSIGNMENTS_BY_DISCIPLINE';

export const GET_USER_ASSIGNMENTS_BY_DISCIPLINE_START = 'GET_USER_ASSIGNMENTS_BY_DISCIPLINE_START';
export const GET_USER_ASSIGNMENTS_BY_DISCIPLINE_ERROR = 'GET_USER_ASSIGNMENTS_BY_DISCIPLINE_ERROR';
export const GET_USER_ASSIGNMENTS_BY_DISCIPLINE_SUCCESS = 'GET_USER_ASSIGNMENTS_BY_DISCIPLINE_SUCCESS';

// Gets assignments for each user of a specific discipline

function getUserAssignmentsByDisciplineStart() {
  return {
    type: GET_USER_ASSIGNMENTS_BY_DISCIPLINE_START,
  };
}

function getUserAssignmentsByDisciplineSuccess(data) {
  return {
    type: GET_USER_ASSIGNMENTS_BY_DISCIPLINE_SUCCESS,
    data,
  };
}

function getUserAssignmentsByDisciplineError(error) {
  return {
    type: GET_USER_ASSIGNMENTS_BY_DISCIPLINE_ERROR,
    error,
  };
}

export function getUserAssignmentsByDiscipline(discipline) {
  return function (dispatch, getState) {
    dispatch(getUserAssignmentsByDisciplineStart());

    api.getUserAssignmentsByDiscipline(discipline, getState())
      .then(data => dispatch(getUserAssignmentsByDisciplineSuccess(data)))
      .catch(error => dispatch(getUserAssignmentsByDisciplineError(error)));
  };
}


export const RESET_ASSIGNMENTS = 'RESET_ASSIGNMENTS';

export function resetAssignments() {
  return {
    type: RESET_ASSIGNMENTS,
  };
}
