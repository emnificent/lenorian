// THERE LIKELY ARE WAYS TO IMPROVE THE CODE, BUT I'M NOT SMART ENOUGH FOR THAT

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
// unless year / 100 mod 9 = 2 or 6, then year = 366 days, thanks Milutin Milanković

// precious help https://howardhinnant.github.io/date_algorithms.html
// not sure if that helpful since I switched to Milanković's calendar rules

import { json, error } from '@sveltejs/kit';

function getUnixTimestamp(dateTimestamp, utcConversion, gregorianDate) {
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

function fixTimestamp(unixTimestamp) {
  const timestampFix = 687484800;  
  const timestamp = unixTimestamp + timestampFix;

  return timestamp;
}

// [0 ; x]
function getTotalDays(timestamp) {
  const secondsInDay = 86400;
  const daysSinceEpoch = Math.floor(timestamp / secondsInDay);

  return daysSinceEpoch;
}

// [0 ; 7]
function getWeekDay(daysSinceEpoch) {
  // if you have better suggestions, feel free
  const dayNames = ['Primidi', 'Secundi', 'Tertidi', 'Quartidi', 'Cinqidi', 'Sextidi', 'Septidi', 'Octadi'];

  const weekDay = ((daysSinceEpoch % dayNames.length) + dayNames.length) % dayNames.length;

  return { id: weekDay, name: dayNames[weekDay] };
}

// year: [0 ; x] / yearDay: [0 ; 365]
function getYearAndYearDay(yearDay) {
  let year = 0;

  if (yearDay >= 0) {
    while (yearDay >= 365) {
      yearDay -= 365;
      if (year % 4 === 0) yearDay -= 1;
      if (year % 100 === 0 && year !== 0) yearDay += 1;
      if ((year / 100) % 9 === 2 || (year / 100) % 9 === 6) yearDay -= 1;
      year += 1;
    }

    if (yearDay === -1) {
      year -= 1;
      yearDay = 365;
    }

  } else if (yearDay < 0) {
    while (yearDay < 0) {
      year -= 1;
      yearDay += 365;
      if (((year % 4) + 4) % 4 === 0) yearDay += 1;
      if (((year % 100) + 100) % 100 === 0) yearDay -= 1;
      if ((((year / 100) % 9) + 9) % 9 === 2 || (((year / 100) % 9) + 9) % 9 === 6) yearDay += 1;
    }
  }

  return { year, yearDay };
}

// [0 ; 11]
function getMonth(yearDay) {
  // if you have better suggestions, feel free
  const monthNames = ['Unisem', 'Unibis', 'Uniter', 'Duosem', 'Duobis', 'Duoter', 'Tresem', 'Trebis', 'Treter', 'Quasem', 'Quabis', 'Quater'];

  let month = 0;
  if (yearDay > 29) month += 1;
  if (yearDay > 60) month += 1;
  if (yearDay > 90) month += 1;
  if (yearDay > 121) month += 1;
  if (yearDay > 151) month += 1;
  if (yearDay > 182) month += 1;
  if (yearDay > 212) month += 1;
  if (yearDay > 243) month += 1;
  if (yearDay > 273) month += 1;
  if (yearDay > 304) month += 1;
  if (yearDay > 334) month += 1;

  return { id: month, name: monthNames[month] };
}

// [0 ; 30]
function getMonthDay(month, monthDay) {

  if (month > 0) monthDay -= 30;
  if (month > 1) monthDay -= 31;
  if (month > 2) monthDay -= 30;
  if (month > 3) monthDay -= 31;
  if (month > 4) monthDay -= 30;
  if (month > 5) monthDay -= 31;
  if (month > 6) monthDay -= 30;
  if (month > 7) monthDay -= 31;
  if (month > 8) monthDay -= 30;
  if (month > 9) monthDay -= 31;
  if (month > 10) monthDay -= 30;
  
  return monthDay;
}

function isLeapYear(year) {
  let leapYear = false;

  if (((year % 4) + 4) % 4 === 0) leapYear = true;
  if (((year % 100) + 100) % 100 === 0 && year !== 0) leapYear = false;
  if ((((year / 100) % 9) + 9) % 9 === 2 || (((year / 100) % 9) + 9) % 9 === 6) leapYear = true;

  return leapYear;
}

export function GET({ url }) {
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

  const unixTimestamp = getUnixTimestamp(dateTimestamp, utcConversion, gregorianDate)
  const timestamp = fixTimestamp(unixTimestamp);
  const daysSinceEpoch = getTotalDays(timestamp);

  const { year, yearDay } = getYearAndYearDay(daysSinceEpoch);
  const month = getMonth(yearDay);
  const monthDay = getMonthDay(month.id, yearDay);
  const weekDay = getWeekDay(daysSinceEpoch);
  const leapYear = isLeapYear(year);

  const timezone = (utcConversion || gregorianDate) ? 'utc' : 'local';
  const positiveDate = daysSinceEpoch < 0 ? false : true;

  const body = {
    timezone,
    year,
    month,
    monthDay,
    weekDay,
    shortDate: 
      `${!positiveDate ? '-' : ''}${year.toString().replace('-', '').padStart(4, '0')}-${(month.id + 1).toString().padStart(2, '0')}-${(monthDay + 1).toString().padStart(2, '0')}`,
    fullDate: `${weekDay.name} ${monthDay + 1} ${month.name} ${year}`,
    leapYear,
    yearDay,
  }

  return json({ status: 200, message: 'OK', body });
}
