// THERE LIKELY ARE WAYS TO OPTIMIZE THE CODE, BUT I'M NOT SMART ENOUGH FOR THAT

import { json, error } from '@sveltejs/kit';

async function getToday(url) {
  const response = await fetch(url.origin + '/api/convert');
  const today = await response.json();

  if (today.status !== 200) return today;
  return today.body;
}

function isLeapYear(year) {
  let leapYear = false;

  if (((year % 4) + 4) % 4 === 0) leapYear = true;
  if (((year % 100) + 100) % 100 === 0 && year !== 0) leapYear = false;
  if ((((year / 100) % 9) + 9) % 9 === 2 || (((year / 100) % 9) + 9) % 9 === 6) leapYear = true;

  return leapYear;
}

function generateMonths(leapYear) {
  // better name suggestions welcome
  const monthNames = ['Uniber', 'Duober', 'Trember', 'Quatober', 'Quintember', 'Sextober', 'September', 'October', 'November', 'December', 'Unicember', 'Duocember'];
  const generatedMonths = [];

  for (let monthIndex = 0; monthIndex < monthNames.length; monthIndex += 1) {
    const tempMonth = {
      month: {
        index: monthIndex,
        name: monthNames[monthIndex],
        value: monthIndex + 1,
      },
      monthDays: (monthIndex % 2 === 0) ? generateMonthDays(30) : generateMonthDays(31),
    };

    generatedMonths.push(tempMonth);
  }

  // remove last day of the year if common year
  if (!leapYear) generatedMonths[11].monthDays.pop();

  return generatedMonths;
}

function generateMonthDays(days) {
  return Array.from({ length: days }, (value, index) => value = { 'day': { index, value: index + 1 } });
}

function appendWeekdays(year, months) {
  // better name suggestions welcome
  const dayNames = ['Mercuday', 'Veneday', 'Terraday', 'Marsiday', 'Jupiday', 'Saturday', 'Uraday', 'Neptiday'];
  let weekdayIndex = getYearFirstWeekday(year, dayNames.length);

  months.forEach(month => {
    month.monthDays.forEach(day => {
      day.weekday = { index: weekdayIndex, name: dayNames[weekdayIndex] };

      weekdayIndex += 1;
      if (weekdayIndex === dayNames.length) weekdayIndex = 0;
    });
  });
}

function getYearFirstWeekday(year, dayNamesLength) {
  let daysSinceEpoch = 0;

  if (year > 0) {
    for (let tempYearIndex = 0; tempYearIndex < year; tempYearIndex += 1) {
      isLeapYear(tempYearIndex) ? daysSinceEpoch += 366 : daysSinceEpoch += 365;
    }
  }
  if (year < 0) {
    // skip year 0
    for (let tempYearIndex = -1; tempYearIndex >= year; tempYearIndex -= 1) {
      isLeapYear(tempYearIndex) ? daysSinceEpoch -= 366 : daysSinceEpoch -= 365;
    }
  }

  const weekdayIndex = ((daysSinceEpoch % dayNamesLength) + dayNamesLength) % dayNamesLength;

  return weekdayIndex;
}

function appendHolidays(months) {
  months[0].monthDays[0].day.holidays = 'New Year\'s Day';
  months[0].monthDays[2].day.holidays = 'Water Day';
  months[0].monthDays[18].day.holidays = 'Health Day';
  months[1].monthDays[3].day.holidays = 'Nature Day';
  months[1].monthDays[11].day.holidays = 'Labor Day';
  months[2].monthDays[2].day.holidays = 'Biological Diversity Day';
  months[3].monthDays[11].day.holidays = 'LGBTQ+ Day';
  months[4].monthDays[17].day.holidays = 'Social Workers\' Day';
  months[5].monthDays[27].day.holidays = 'Democracy Day';
  months[6].monthDays[2].day.holidays = 'World Peace Day';
  months[6].monthDays[27].day.holidays = 'Farmers\' Day';
  months[7].monthDays[14].day.holidays = 'Journalists\' Day';
  months[7].monthDays[22].day.holidays = 'Science Day';
  months[7].monthDays[28].day.holidays = 'Tolerance Day';
  months[8].monthDays[21].day.holidays = 'Universal Declaration of Human Rights Day';
  months[9].monthDays[2].day.holidays = 'Gratitude Day';
  months[10].monthDays[13].day.holidays = 'First Responders\' Day';
  months[11].monthDays[13].day.holidays = 'World Wildlife Day';
  months[11].monthDays[18].day.holidays = 'Women\'s Day';
  months[11].monthDays[months[11].monthDays.length - 1].day.holidays = 'New Year\'s Eve';
}

function appendToday(today, months) {
  months[today.month.index].month.current = true;
  months[today.month.index].monthDays[today.monthDay.index].day.current = true;
}

export async function GET({ url }) {
  // query params
  const yearParam = url.searchParams.get('year');
  if (yearParam && isNaN(yearParam)) {
      throw error(400, {
        status: 400,
        message: 'Invalid year format, must be an integer',
        ok: false
      });
  }

  // core
  const today = await getToday(url);
  const year = yearParam ? parseInt(yearParam) : today.year.value;

  const leapYear = isLeapYear(year);
  const months = generateMonths(leapYear);

  appendWeekdays(year, months);

  appendHolidays(months);
  if (!yearParam || today.year.value === year) appendToday(today, months);

  const body = {
    year: {
      value: year,
      leapYear,
      totalDays: leapYear ? 366 : 365,
    },
    months,
  };

  const options = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

  return json({ status: 200, message: 'OK', ok: true, body }, options);
}
