import * as actions from 'actions/app';

const initialState = {
  initializing: false,
  loadingAssignments: false,
  allUsers: null,
  allDisciplines: null,
  allLocations: null,
  allProjects: null,
  filterBy: 'project',
  leaveTypes: null,
  users: null,
  userAssignments: null,
};

const actionsMap = {
  // INIT
  [actions.INIT_APP_START]: () => {
    return {
      ...initialState,
      initializing: true,
    };
  },
  [actions.INIT_APP_SUCCESS]: (state, action) => {
    return {
      ...state,
      initializing: false,
      allUsers: action.data.allUsers,
      allDisciplines: action.data.allDisciplines,
      allLocations: action.data.allLocations,
      allProjects: action.data.allProjects,
      leaveTypes: action.data.leaveTypes,
    };
  },

  // PROJECT USER ASSIGNMENTS
  [actions.GET_USER_ASSIGNMENTS_BY_PROJECT_START]: (state) => {
    return {
      ...state,
      loadingAssignments: true,
      users: initialState.users,
      userAssignments: initialState.userAssignments,
    };
  },
  [actions.GET_USER_ASSIGNMENTS_BY_PROJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      loadingAssignments: false,
      users: action.data.users,
      userAssignments: action.data.userAssignments,
    };
  },

  // UPDATE LOCATION SEARCH
  [actions.GET_USER_ASSIGNMENTS_BY_LOCATION_START]: (state) => {
    return {
      ...state,
      loadingAssignments: true,
      users: initialState.users,
      userAssignments: initialState.userAssignments,
    };
  },
  [actions.GET_USER_ASSIGNMENTS_BY_LOCATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      loadingAssignments: false,
      users: action.data.users,
      userAssignments: action.data.userAssignments,
    };
  },

  // UPDATE DISCIPLINE SEARCH
  [actions.GET_USER_ASSIGNMENTS_BY_DISCIPLINE_START]: (state) => {
    return {
      ...state,
      loadingAssignments: true,
      users: initialState.users,
      userAssignments: initialState.userAssignments,
    };
  },
  [actions.GET_USER_ASSIGNMENTS_BY_DISCIPLINE_SUCCESS]: (state, action) => {
    return {
      ...state,
      loadingAssignments: false,
      users: action.data.users,
      userAssignments: action.data.userAssignments,
    };
  },

  // RESET
  [actions.RESET_ASSIGNMENTS]: (state) => {
    return {
      ...state,
      users: initialState.users,
      userAssignments: initialState.userAssignments,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
