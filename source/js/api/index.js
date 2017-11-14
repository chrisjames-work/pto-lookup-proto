import 'es6-promise';

import eachDay from 'date-fns/each_day';
import format from 'date-fns/format';

const get = (endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.10000ft.com/api/v1/${ endpoint }?per_page=100`, {
      method: 'GET',
      headers: {
        auth: '', // TODO: API key
      },
    }).then(response => {
      return response.json();
    }).then(json => {
      resolve(json);
    }).catch(error => {
      reject(error);
    });
  });
};

const getAllPages = (endpoint, page = 1, records = []) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.10000ft.com/api/v1/${ endpoint }?per_page=100&page=${ page }`, {
      method: 'GET',
      headers: {
        auth: '', // TODO: API key
      },
    }).then(response => {
      return response.json();
    }).then(json => {
      if (json.data && json.data.length) {
        resolve(getAllPages(endpoint, page + 1, records.concat(json.data)));
      } else {
        resolve(records);
      }
    }).catch(error => {
      reject(error);
    });
  });
};

const getAllUsers = () => {
  return getAllPages('users');
};

const getAllUserAssignments = async users => {
  const promises = users.map(id => getAllPages(`users/${ id }/assignments`));

  const results = await Promise.all(promises);
  return results;
};

const getAllProjects = () => {
  return getAllPages('projects');
};

const getLeaveTypes = () => {
  return get('leave_types');
};

const getUserAssignmentsByProject = async (projectId, state) => {
  const projectUsersResponse = await get(`projects/${ projectId }/users`);

  const uniqueUsers = [];
  const users = [];
  const userAssignments = {};

  projectUsersResponse.data
    .sort((a, b) => {
      if (a.display_name < b.display_name) return -1;
      if (a.display_name > b.display_name) return 1;
      return 0;
    })
    .forEach(user => {
      if (!uniqueUsers.includes(user.id)) {
        uniqueUsers.push(user.id);
        users.push(user);
        userAssignments[user.id] = {};
      }
    });

  const userAssignmentsResponse = await getAllUserAssignments(uniqueUsers);

  const { leaveTypes } = state.app;
  const leaveTypeIds = leaveTypes.map(type => type.id);

  userAssignmentsResponse.forEach(assignments => {
    assignments.forEach(assignment => {
      const {
        assignable_id,
        starts_at,
        ends_at,
        user_id,
      } = assignment;

      // If assignment type is not a leave assignment, skip it
      if (!leaveTypeIds.includes(assignable_id)) return;

      const assignmentName =
        leaveTypes.find(type => type.id === assignable_id).name; // eslint-disable-line camelcase

      const allDates = eachDay(starts_at, ends_at);

      allDates.forEach(date => {
        const key = format(date, 'YYYY-MM-DD');

        userAssignments[user_id][key] = {
          assignmentId: assignable_id,
          assignmentName,
        };
      });
    });
  });

  return {
    users,
    userAssignments,
  };
};

const getUserAssignments = (userId = 225122) => {
  return getAllPages(`users/${ userId }/assignments`);
};

const getUserAssignmentsByLocation = async (location, state) => {
  const users = state.app.allUsers
    .filter(user => user.location === location)
    .sort((a, b) => {
      if (a.display_name < b.display_name) return -1;
      if (a.display_name > b.display_name) return 1;
      return 0;
    });
  const userIds = users.map((user) => user.id);
  const userAssignments = {};

  userIds.forEach(userId => {
    userAssignments[userId] = {};
  });

  const userAssignmentsResponse = await getAllUserAssignments(userIds);

  const { leaveTypes } = state.app;
  const leaveTypeIds = leaveTypes.map(type => type.id);

  userAssignmentsResponse.forEach(assignments => {
    assignments.forEach(assignment => {
      const {
        assignable_id,
        starts_at,
        ends_at,
        user_id,
      } = assignment;

      // If assignment type is not a leave assignment, skip it
      if (!leaveTypeIds.includes(assignable_id)) return;

      const assignmentName =
        leaveTypes.find(type => type.id === assignable_id).name; // eslint-disable-line camelcase

      const allDates = eachDay(starts_at, ends_at);

      allDates.forEach(date => {
        const key = format(date, 'YYYY-MM-DD');

        userAssignments[user_id][key] = {
          assignmentId: assignable_id,
          assignmentName,
        };
      });
    });
  });

  return {
    users,
    userAssignments,
  };
};

const getUserAssignmentsByDiscipline = async (discipline, state) => {
  const users = state.app.allUsers
    .filter(user => user.discipline === discipline)
    .sort((a, b) => {
      if (a.display_name < b.display_name) return -1;
      if (a.display_name > b.display_name) return 1;
      return 0;
    });
  const userIds = users.map((user) => user.id);
  const userAssignments = {};

  userIds.forEach(userId => {
    userAssignments[userId] = {};
  });

  const userAssignmentsResponse = await getAllUserAssignments(userIds);

  const { leaveTypes } = state.app;
  const leaveTypeIds = leaveTypes.map(type => type.id);

  userAssignmentsResponse.forEach(assignments => {
    assignments.forEach(assignment => {
      const {
        assignable_id,
        starts_at,
        ends_at,
        user_id,
      } = assignment;

      // If assignment type is not a leave assignment, skip it
      if (!leaveTypeIds.includes(assignable_id)) return;

      const assignmentName =
        leaveTypes.find(type => type.id === assignable_id).name; // eslint-disable-line camelcase

      const allDates = eachDay(starts_at, ends_at);

      allDates.forEach(date => {
        const key = format(date, 'YYYY-MM-DD');

        userAssignments[user_id][key] = {
          assignmentId: assignable_id,
          assignmentName,
        };
      });
    });
  });

  return {
    users,
    userAssignments,
  };
};

const initApp = async () => {
  const promises = [];
  promises.push(getAllUsers());
  promises.push(getAllProjects());
  promises.push(getLeaveTypes());

  const results = await Promise.all(promises);

  const allUsers = results[0];
  const allLocations = [];
  const allDisciplines = [];
  let locationId = 0;
  let disciplineId = 0;

  allUsers.forEach(user => {
    if (!allLocations.find(location => location.name === user.location)) {
      allLocations.push({
        id: locationId,
        name: user.location,
      });

      locationId++;
    }

    if (!allDisciplines.find(discipline => discipline.name === user.discipline)) {
      allDisciplines.push({
        id: disciplineId,
        name: user.discipline,
      });

      disciplineId++;
    }
  });

  return {
    allUsers,
    allDisciplines,
    allLocations,
    allProjects: results[1].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }),
    leaveTypes: results[2].data,
  };
};

export default {
  getAllUsers,
  getAllProjects,
  getLeaveTypes,
  getUserAssignmentsByProject,
  getUserAssignments,
  getUserAssignmentsByDiscipline,
  getUserAssignmentsByLocation,
  initApp,
};
