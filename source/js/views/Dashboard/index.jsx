import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import * as actions from 'actions/app';
import LoadingIcon from '../../components/Global/LoadingIcon';
import UserAssignments from '../../components/Global/UserAssignments';

@withRouter
@connect(state => ({
  initializing: state.app.initializing,
  loadingAssignments: state.app.loadingAssignments,
  allDisciplines: state.app.allDisciplines,
  allLocations: state.app.allLocations,
  allUsers: state.app.allUsers,
  allProjects: state.app.allProjects,
  leaveTypes: state.app.leaveTypes,
  users: state.app.users,
  userAssignments: state.app.userAssignments,
}))
export default class Dashboard extends Component {
  static propTypes = {
    initializing: PropTypes.bool,
    loadingAssignments: PropTypes.bool,
    allDisciplines: PropTypes.array,
    allLocations: PropTypes.array,
    allProjects: PropTypes.array,
    leaveTypes: PropTypes.array,
    location: PropTypes.object,
    users: PropTypes.array,
    userAssignments: PropTypes.object,
    // from @withRouter
    history: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDiscipline = this.handleChangeDiscipline.bind(this);
  }

  componentWillMount() {
    const { history, location } = this.props;

    if (!location.search) {
      history.push({
        search: '?filterBy=project',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, initializing, location } = this.props;

    const {
      projectId,
      locationId,
      disciplineId,
    } = queryString.parse(location.search);

    if (initializing && !nextProps.initializing && projectId) {
      dispatch(actions.getUserAssignmentsByProject(projectId));
    }

    if (initializing && !nextProps.initializing && locationId) {
      const locationName = nextProps.allLocations.find(l => l.id === parseInt(locationId, 10)).name;
      dispatch(actions.getUserAssignmentsByLocation(locationName));
    }

    if (initializing && !nextProps.initializing && disciplineId) {
      const disciplineName =
        nextProps.allDisciplines.find(d => d.id === parseInt(disciplineId, 10)).name;
      dispatch(actions.getUserAssignmentsByDiscipline(disciplineName));
    }
  }

  handleFilterByClick(filterBy) {
    const { dispatch, history } = this.props;

    history.push({
      search: `?filterBy=${ filterBy }`,
    });

    dispatch(actions.resetAssignments());
  }

  handleChangeProject(e) {
    const { dispatch, history, location } = this.props;

    const { filterBy } = queryString.parse(location.search);
    const projectId = e.target.value;

    history.push({
      search: `?filterBy=${ filterBy }&projectId=${ projectId }`,
    });

    dispatch(actions.getUserAssignmentsByProject(projectId));
  }

  handleChangeLocation(e) {
    const { allLocations, dispatch, history, location } = this.props;

    const { filterBy } = queryString.parse(location.search);
    const locationId = e.target.value;
    const locationName = allLocations.find(l => l.id === parseInt(locationId, 10)).name;

    history.push({
      search: `?filterBy=${ filterBy }&locationId=${ locationId }`,
    });

    dispatch(actions.getUserAssignmentsByLocation(locationName));
  }

  handleChangeDiscipline(e) {
    const { allDisciplines, dispatch, history, location } = this.props;

    const { filterBy } = queryString.parse(location.search);
    const disciplineId = e.target.value;
    const disciplineName = allDisciplines.find(d => d.id === parseInt(disciplineId, 10)).name;

    history.push({
      search: `?filterBy=${ filterBy }&disciplineId=${ disciplineId }`,
    });

    dispatch(actions.getUserAssignmentsByDiscipline(disciplineName));
  }

  renderDashboard() {
    const {
      leaveTypes,
      loadingAssignments,
      location,
      users,
      userAssignments,
    } = this.props;

    const { filterBy } = queryString.parse(location.search);

    return (
      <div className='Dashboard'>
        <h1>PTO Lookup</h1>

        <hr />

        <ul className='Tabs'>
          <li>
            <button
              className={ `Tabs-btn ${ filterBy === 'project' && 'is-active' }` }
              onClick={ () => this.handleFilterByClick('project') }
            >
              Project
            </button>
          </li>
          <li>
            <button
              className={ `Tabs-btn ${ filterBy === 'location' && 'is-active' }` }
              onClick={ () => this.handleFilterByClick('location') }
            >
              Location
            </button>
          </li>
          <li>
            <button
              className={ `Tabs-btn ${ filterBy === 'discipline' && 'is-active' }` }
              onClick={ () => this.handleFilterByClick('discipline') }
            >
              Discipline
            </button>
          </li>
        </ul>

        <div>
          { {
            'project': (
              this.renderProjectSelector()
            ),
            'location': (
              this.renderLocationSelector()
            ),
            'discipline': (
              this.renderDisciplineSelector()
            ),
          }[filterBy] }
        </div>

        { userAssignments ?
          <UserAssignments
            leaveTypes={ leaveTypes }
            users={ users }
            userAssignments={ userAssignments }
          /> :
          loadingAssignments && <LoadingIcon />
        }
      </div>
    );
  }

  renderProjectSelector() {
    const { allProjects, location } = this.props;

    const { projectId } = queryString.parse(location.search);

    return (
      <div className='ProjectSelector'>
        <select onChange={ this.handleChangeProject } value={ projectId || '' }>
          <option
            value=''
            disabled={ true }
          >
            Select project
          </option>
          { allProjects.map(project =>
            <option key={ project.id } value={ project.id }>
              { project.name }
            </option>
          ) }
        </select>
      </div>
    );
  }

  renderLocationSelector() {
    const { allLocations } = this.props;

    const { locationId } = queryString.parse(location.search);

    return (
      <div className='ProjectSelector'>
        <select onChange={ this.handleChangeLocation } value={ locationId || '' }>
          <option
            value=''
            disabled={ true }
          >
            Select location
          </option>
          { allLocations.map(location =>
            <option key={ location.id } value={ location.id }>
              { location.name }
            </option>
          ) }
        </select>
      </div>
    );
  }

  renderDisciplineSelector() {
    const { allDisciplines } = this.props;

    const { disciplineId } = queryString.parse(location.search);

    return (
      <div className='ProjectSelector'>
        <select onChange={ this.handleChangeDiscipline } value={ disciplineId || '' }>
          <option
            value=''
            disabled={ true }
          >
            Select discipline
          </option>
          { allDisciplines.map(discipline =>
            <option key={ discipline.id } value={ discipline.id }>
              { discipline.name }
            </option>
          ) }
        </select>
      </div>
    );
  }

  render() {
    const {
      initializing,
    } = this.props;

    return initializing ?
      <LoadingIcon /> :
      this.renderDashboard();
  }
}
