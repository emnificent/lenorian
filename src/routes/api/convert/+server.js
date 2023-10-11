// THERE LIKELY ARE WAYS TO OPTIMIZE THE CODE, BUT I'M NOT SMART ENOUGH FOR THAT

//  Lenorian: 0000/01/01 - is equivalent to...
// Gregorian: 1948/03/20 - spring equinox, the year of the Universal Declaration of Human Rights
// Epoch timestamp: -687484800
// in order to adjust the Unix time so L-0000/01/01's Epoch timestamp is 0, instead of G-1970/01/01, we need to add 687484800 to the Unix time

// 86400 seconds in a day
// weeks of 8 days, recommended work-week: 4 days
// 12 months, 30 or 31 days per month, starting from 30 and alternating
// 365 days per year, unless leap year...
// 366 days (+1 day to the last month, regularly 30 days long) if the year is the year 0 or divisible by 4
// unless year is also divisble by 100, then year = 365 days
// unless year / 100 mod 9 = 2 or 6, then year = 366 days (Milutin Milanković rules)

import { json, error } from '@sveltejs/kit';

// [0 ; x]
function getTotalDays(queryParams) {
  const secondsInDay = 86400;

  const timestamp = fixTimestamp(queryParams);
  const daysSinceEpoch = Math.floor(timestamp / secondsInDay);

  return daysSinceEpoch;
}

function fixTimestamp(queryParams) {
  const timestampFix = 687484800;

  const unixTimestamp = getUnixTimestamp(queryParams)
  const timestamp = unixTimestamp + timestampFix;

  return timestamp;
}

function getUnixTimestamp({ dateTimestamp, utcConversion, gregorianDate }) {
  const currentDate = new Date();
  let longUnixTimestamp = currentDate.getTime();

  // dateTimestamp is in seconds
  if (dateTimestamp) longUnixTimestamp = parseInt(dateTimestamp) * 1000;

  // .getTimezoneOffset() returns the offset in minutes, there are 60000 milliseconds in a minute
  if (!utcConversion) longUnixTimestamp -= currentDate.getTimezoneOffset() * 60000;

  if (gregorianDate) longUnixTimestamp = new Date(gregorianDate).getTime();

  // removes milliseconds
  const unixTimestamp = Math.trunc(longUnixTimestamp / 1000);

  return unixTimestamp;
}

// year: [0 ; x] / yearDay: [0 ; 365]
function getYearAndYearDay(yearDay) {
  let year = 0;

  if (yearDay >= 0) {
    while (yearDay >= 365) {
      yearDay -= 365;
      if (isLeapYear(year)) yearDay -= 1;
      year += 1;
    }

    // occasional issue fix
    if (yearDay === -1) {
      year -= 1;
      yearDay = 365;
    }
  } 
  else 
  if (yearDay < 0) {
    while (yearDay < 0) {
      year -= 1;
      yearDay += 365;
      if (isLeapYear(year)) yearDay += 1;
    }
  }

  return { year, yearDay };
}

// [0 ; 11]
function getMonth(yearDay) {
  // better name suggestions welcome
  const monthNames = ['Unisem', 'Unibis', 'Uniter', 'Duosem', 'Duobis', 'Duoter', 'Tresem', 'Trebis', 'Treter', 'Quasem', 'Quabis', 'Quater'];

  let monthIndex = 0;
  if (yearDay > 29) monthIndex += 1;
  if (yearDay > 60) monthIndex += 1;
  if (yearDay > 90) monthIndex += 1;
  if (yearDay > 121) monthIndex += 1;
  if (yearDay > 151) monthIndex += 1;
  if (yearDay > 182) monthIndex += 1;
  if (yearDay > 212) monthIndex += 1;
  if (yearDay > 243) monthIndex += 1;
  if (yearDay > 273) monthIndex += 1;
  if (yearDay > 304) monthIndex += 1;
  if (yearDay > 334) monthIndex += 1;

  return { index: monthIndex, name: monthNames[monthIndex], value: monthIndex + 1 };
}

// [0 ; 30]
function getMonthDay(monthIndex, monthDayIndex) {

  if (monthIndex > 0) monthDayIndex -= 30;
  if (monthIndex > 1) monthDayIndex -= 31;
  if (monthIndex > 2) monthDayIndex -= 30;
  if (monthIndex > 3) monthDayIndex -= 31;
  if (monthIndex > 4) monthDayIndex -= 30;
  if (monthIndex > 5) monthDayIndex -= 31;
  if (monthIndex > 6) monthDayIndex -= 30;
  if (monthIndex > 7) monthDayIndex -= 31;
  if (monthIndex > 8) monthDayIndex -= 30;
  if (monthIndex > 9) monthDayIndex -= 31;
  if (monthIndex > 10) monthDayIndex -= 30;
  
  return { index: monthDayIndex, value: monthDayIndex + 1 };
}

// [0 ; 7]
function getWeekday(daysSinceEpoch) {
  // better name suggestions welcome
  const dayNames = ['Primidi', 'Secundi', 'Tertidi', 'Quartidi', 'Cinqidi', 'Sextidi', 'Septidi', 'Octadi'];

  const weekdayIndex = ((daysSinceEpoch % dayNames.length) + dayNames.length) % dayNames.length;

  return { index: weekdayIndex, name: dayNames[weekdayIndex] };
}

function isLeapYear(year) {
  let leapYear = false;

  if (((year % 4) + 4) % 4 === 0) leapYear = true;
  if (((year % 100) + 100) % 100 === 0 && year !== 0) leapYear = false;
  if ((((year / 100) % 9) + 9) % 9 === 2 || (((year / 100) % 9) + 9) % 9 === 6) leapYear = true;

  return leapYear;
}

function getHoliday(month, day, leapYear) {
  const holidays = {
    month0: {
      day0: ['New Year\'s Day']
    },
    month1: {
      day11: ['Labor Day']
    },
    month6: {
      day2: ['World Peace Day']
    },
    month8: {
      day21: ['Universal Declaration of Human Rights Day']
    },
    month9: {
      day2: ['Gratitude Day']
    },
    month10: {
      day25: ['Love Day']
    },
    month11: {
      day30: ['New Year\'s Eve']
    }
  };

  // exception for the last day of the year
  if (month === 11 && !leapYear && day === 29) day = 30;

  return holidays['month' + month]['day' + day] ? holidays['month' + month]['day' + day][0] : null;
}

function formatPadding(data, padding = 2) {
  return data.toString().replace('-', '').padStart(padding, '0');
}

export function GET({ url }) {
  // query params
  let utcConversion = url.searchParams.has('utc');
  if (url.searchParams.get('utc') === 'false') utcConversion = false;

  const dateTimestamp = url.searchParams.get('time');
  if (dateTimestamp && isNaN(dateTimestamp)) {
      throw error(400, {
        status: 400,
        message: 'Invalid time format, must be an integer'
      });
  }

  const gregorianDate = url.searchParams.get('gdate');
  if (gregorianDate &&
    (!gregorianDate.match(/^\d{4,}-\d{2}-\d{2}$/) || new Date(gregorianDate).toString() === 'Invalid Date')) {
      throw error(400, {
        status: 400,
        message: 'Invalid gdate format, must be YYYY-MM-DD'
      });
  }

  // core
  const queryParams = { dateTimestamp, utcConversion, gregorianDate };
  const daysSinceEpoch = getTotalDays(queryParams);

  const { year, yearDay } = getYearAndYearDay(daysSinceEpoch);
  const month = getMonth(yearDay);
  const monthDay = getMonthDay(month.index, yearDay);
  const weekday = getWeekday(daysSinceEpoch);
  const leapYear = isLeapYear(year);
  const holiday = getHoliday(month.index, monthDay.index, leapYear);

  const timezone = (utcConversion || gregorianDate) ? 'utc' : 'local';
  const negativeDate = daysSinceEpoch > 0 ? false : true;

  const body = {
    timezone,
    year: {
      value: year,
      leapYear,
      totalDays: leapYear ? 366 : 365,
    },
    month,
    monthDay,
    weekday,
    shortDate: 
      `${negativeDate ? '-' : ''}${formatPadding(year, 4)}-${formatPadding(month.value)}-${formatPadding(monthDay.value)}`,
    fullDate: `${weekday.name} ${monthDay.value} ${month.name} ${year}`,
    holiday,
    yearDay,
  }

  return json({ status: 200, message: 'OK', body });
}
