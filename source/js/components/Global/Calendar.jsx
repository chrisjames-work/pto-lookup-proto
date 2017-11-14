import React, { Component, PropTypes } from 'react';

import format from 'date-fns/format';

import CalendarModel from '../../models/calendar';

export default class Calendar extends Component {
  static propTypes = {
    assignments: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      calendarModel: new CalendarModel(props.assignments),
      currentYear: 2017,
    };
  }

  render() {
    const { calendarModel, currentYear } = this.state;
    const yearModel = calendarModel.calendarModel.filter(y => y.year === currentYear)[0];

    return (
      <div className='Calendar'>
        <ul>
          { calendarModel.calendarModel.map(y => {
            return (
              <li key={ y.year }>
                <button>{ y.year }</button>
              </li>
            );
          }) }
        </ul>
        <div>
          { yearModel.months.map((m, i) => {
            return (
              <div key={ i }>
                <h3>{ format(new Date(currentYear, i, 1), 'MMM') }</h3>
                <ul>
                  { m.map((d, j) => {
                    return (
                      <li key={ j }>
                        { d.day }, { d.assignmentName }
                      </li>
                    );
                  }) }
                </ul>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}
