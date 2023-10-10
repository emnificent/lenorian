import { json, error } from '@sveltejs/kit';

async function getToday(url) {
  const response = await fetch(url.origin + '/api/convert');
  const today = await response.json();
  return today.body;
}

function isLeapYear(year) {
  let leapYear = false;

  if (((year % 4) + 4) % 4 === 0) leapYear = true;
  if (((year % 100) + 100) % 100 === 0 && year !== 0) leapYear = false;
  if ((((year / 100) % 9) + 9) % 9 === 2 || (((year / 100) % 9) + 9) % 9 === 6) leapYear = true;

  return leapYear;
}

function shortMonth() {
  return Array.from({length: 30}, (value, index) => value = { 'day': index + 1 });
}

function longMonth() {
  return Array.from({length: 31}, (value, index) => value = { 'day': index + 1 });
}

function generateMonths(leapYear) {
  // if you have better suggestions, feel free
  const monthNames = ['Unisem', 'Unibis', 'Uniter', 'Duosem', 'Duobis', 'Duoter', 'Tresem', 'Trebis', 'Treter', 'Quasem', 'Quabis', 'Quater'];
  const generatedMonths = [];

  for (let i = 0; i < monthNames.length; i += 1) {
    const month = {
      name: monthNames[i],
      days: (i % 2 === 0) ? shortMonth() : longMonth(),
    }

    generatedMonths.push(month);
  }

  // remove last day of the year if common year
  if (!leapYear) generatedMonths[11].days.pop();

  return generatedMonths;
}

function getYearFirstWeekday(year) {
  // if you have better suggestions, feel free
  const dayNames = ['Primidi', 'Secundi', 'Tertidi', 'Quartidi', 'Cinqidi', 'Sextidi', 'Septidi', 'Octadi'];
  let daysSinceEpoch = 0;

  if (year > 0) {
    for (let i = 0; i < year; i += 1) {
      isLeapYear(i) ? daysSinceEpoch += 366 : daysSinceEpoch += 365;
    }
  }
  if (year < 0) {
    // skip year 0
    for (let i = -1; i >= year; i -= 1) {
      isLeapYear(i) ? daysSinceEpoch -= 366 : daysSinceEpoch -= 365;
    }
  }

  const weekDay = ((daysSinceEpoch % dayNames.length) + dayNames.length) % dayNames.length;

  return { id: weekDay, name: dayNames[weekDay] };
}

function appendWeekdays(yearFirstWeekday, months) {
  // if you have better suggestions, feel free
  const dayNames = ['Primidi', 'Secundi', 'Tertidi', 'Quartidi', 'Cinqidi', 'Sextidi', 'Septidi', 'Octadi'];

  let weekDayIndex = yearFirstWeekday.id;
  months.forEach(month => {
    month.days.forEach(day => {
      day.weekday = { id: weekDayIndex, name: dayNames[weekDayIndex] };

      weekDayIndex += 1;
      weekDayIndex = ((weekDayIndex % dayNames.length) + dayNames.length) % dayNames.length;
    });
  });
}

function appendHolidays(months) {
  months[8].days[21].holiday = 'Universal Declaration of Human Rights Day';
  months[0].days[0].holiday = 'New Year';
}

function appendToday(today, months) {
  months[today.month.id].days[today.monthDay].today = true;
}

export async function GET({ url }) {
  const yearParam = url.searchParams.get('year');
  if (yearParam && isNaN(yearParam)) {
      throw error(400, {
        status: 400,
        message: 'Invalid year format, must be an integer'
      });
  }

  const today = await getToday(url);
  const year = yearParam ? parseInt(yearParam) : today.year;

  const leapYear = isLeapYear(year);
  const months = generateMonths(leapYear);

  const yearFirstWeekday = getYearFirstWeekday(year);
  appendWeekdays(yearFirstWeekday, months);

  appendHolidays(months);
  if (!yearParam || today.year === year) appendToday(today, months);

  const body = {
    year,
    leapYear,
    months,
  };

  return json({ status: 200, message: 'OK', body });
}
