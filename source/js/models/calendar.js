import addYears from 'date-fns/add_years';
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years';
import getDay from 'date-fns/get_day';
import getDaysInMonth from 'date-fns/get_days_in_month';
import getYear from 'date-fns/get_year';
import subYears from 'date-fns/sub_years';

class CalendarModel {
  constructor(assignments = []) {
    const calendarModel = [];
    const nextYear = addYears(new Date(), 1);
    const startDate = new Date(2014, 0, 1);
    const numberOfYears = differenceInCalendarYears(nextYear, startDate);

    const yearArray = [];
    for (let y = 0; y <= numberOfYears; y++) {
      yearArray.unshift(getYear(subYears(nextYear, y)));
    }

    yearArray.forEach(year => {
      const months = [];

      for (let m = 0; m < 12; m++) {
        const month = [];
        const firstOfMonth = new Date(year, m, 1);
        const firstWeekdayOfMonth = getDay(firstOfMonth);
        const daysInMonth = getDaysInMonth(firstOfMonth);

        if (firstWeekdayOfMonth > 0) {
          for (let i = 0; i < firstWeekdayOfMonth; i++) {
            month.push({
              day: null,
              dayOfWeek: i,
              inactive: true,
            });
          }
        }

        for (let j = 0; j < daysInMonth; j++) {
          month.push({
            day: j + 1,
            dayOfWeek: (j + firstWeekdayOfMonth) % 7,
          });
        }

        months.push(month);
      }

      calendarModel.push({
        year,
        months,
      });
    });

    assignments.forEach(a => {
      const year = calendarModel.filter(i => i.year === a.year)[0];

      const month = year.months[a.month];
      const day = month.filter(d => d.day === a.day)[0];

      day.hasAssignment = true;
      day.assignmentId = a.assignmentId;
      day.assignmentName = a.assignmentName;
    });

    this.calendarModel = calendarModel;
  }
}

export default CalendarModel;
