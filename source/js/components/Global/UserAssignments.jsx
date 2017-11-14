import React, { Component, PropTypes } from 'react';

import addDays from 'date-fns/add_days';
import eachDay from 'date-fns/each_day';
import format from 'date-fns/format';
import isWeekend from 'date-fns/is_weekend';

class UserAssignments extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    userAssignments: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    const today = new Date();
    const endDate = addDays(today, 20);

    this.state = {
      startDate: format(today, 'YYYY-MM-DD'),
      endDate: format(endDate, 'YYYY-MM-DD'),
      displayDays: eachDay(today, endDate).map(date => format(date, 'YYYY-MM-DD')),
    };

    this.handleChangeDays = this.handleChangeDays.bind(this);
  }

  handleChangeDays(e) {
    const today = new Date();
    const endDate = addDays(today, e.target.value - 1);

    this.setState({
      displayDays: eachDay(today, endDate).map(date => format(date, 'YYYY-MM-DD')),
    });
  }

  render() {
    const { users, userAssignments } = this.props;
    const { displayDays } = this.state;

    let tableWidth = 200;
    for (let d = 0; d < displayDays.length; d++) {
      tableWidth += (isWeekend(displayDays[d]) ? 4 : 48);
    }

    return (
      <div className='UserAssignments'>
        <p>
          Displaying
          <input
            className='UserAssignments-daysInput'
            onChange={ this.handleChangeDays }
            type='number'
            value={ displayDays.length }
          />
          days.
        </p>
        <table className='UserAssignments-table' style={ { width: tableWidth } }>
          <thead>
            <tr>
              <th />
              { displayDays.map((day, i) => {
                const dayOfWeek = format(day, 'dd');
                const month = format(day, 'MMM');
                const dayNum = format(day, 'D');

                return isWeekend(day) ?
                  (
                    <th key={ i } className='is-weekend' />
                  ) :
                  (
                    <th key={ i }>
                      <div className='UserAssignments-day'>{ dayOfWeek }</div>
                      <div className='UserAssignments-date'>{ month }<br />{ dayNum }</div>
                    </th>
                  );
              }) }
            </tr>
          </thead>
          <tbody>
            { users.map(user => {
              const assignmentsForUser = userAssignments[user.id];

              const daysArray = [];
              displayDays.forEach(date => {
                const assignment = assignmentsForUser[date];
                daysArray.push(!isWeekend(date) ? assignment || {} : null);
              });

              return (
                <tr key={ user.id }>
                  <td>{ user.display_name }</td>
                  { daysArray.map((day, i) => {
                    const className = day && day.assignmentName && day.assignmentName.toLowerCase().split(' ').join('');
                    return day ?
                      (
                        <td
                          key={ i }
                          className={ `is-${ className }` }
                        />
                      ) :
                      (
                        <td key={ i } className={ 'is-weekend' } />
                      );
                  }) }
                </tr>
              );
            }) }
          </tbody>
        </table>
        <dl className='UserAssignments-key'>
          <dt>Vacation</dt>
          <dd className='is-vacation' />
          <dt>Parental Leave</dt>
          <dd className='is-parentalleave' />
          <dt>Conference</dt>
          <dd className='is-conference' />
          <dt>Client Travel</dt>
          <dd className='is-clienttravel' />
          <dt>Class</dt>
          <dd className='is-class' />
          <dt>Recognition Day</dt>
          <dd className='is-recognitionday' />
          <dt>Jury Duty</dt>
          <dd className='is-juryduty' />
          <dt>Holiday</dt>
          <dd className='is-holiday' />
          <dt>Leave</dt>
          <dd className='is-leave' />
          <dt>Bereavement</dt>
          <dd className='is-bereavement' />
        </dl>
      </div>
    );
  }
}

export default UserAssignments;
