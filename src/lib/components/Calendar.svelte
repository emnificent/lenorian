<script>
	import { onMount } from "svelte";

  let calendar;
  let today;
  onMount(async () => {
    const response = await fetch('/api/calendar');
    calendar = await response.json();

    // highlights today
    const offset = new Date().getTimezoneOffset();
    const todayResponse = await fetch(`/api/convert?offset=${offset}`);
    today = await todayResponse.json();

    const months = await document.getElementById('calendar').children;
    let monthIndex = -1;
    for (let i = 0; i < months.length; i += 1) {
      if (months.item(i).firstChild.innerText === today.body.month.name) monthIndex = i;
      if (monthIndex !== -1) break;
    }

    months.item(monthIndex).classList.add('current');
    months.item(monthIndex).id = 'currentMonth';

    const daysRows = await document.getElementById('currentMonth').children.item(1).children;
    let dayIndex = -1;
    // skip the first row because it's just letters
    for (let i = 1; i < daysRows.length; i += 1) {
      if (dayIndex !== -1) break;
      const days = daysRows.item(i).children;

      for (let j = 0; j < days.length; j += 1) {
        if (days.item(j).innerText === today.body.monthDay.value.toString()) dayIndex = { row: i, index: j };
        if (dayIndex !== -1) break;
      }
    }

    daysRows.item(dayIndex.row).children.item(dayIndex.index).classList.add('current');
    daysRows.item(dayIndex.row).children.item(dayIndex.index).id = 'currentDay';
  });
</script>

<article>
  <div class="header">
    <h2>Calendar</h2>
    { #if calendar }
      { #if calendar.body }
        <p>Year {calendar.body.year.value} {calendar.body.year.leapYear ? '(leap)': ''}</p>
      { /if }
    { :else }
      <p>Loading...</p>
    { /if }
  </div>

  { #if calendar }
    <div class="calendar" id="calendar">
      { #if calendar.body }  
        { #each calendar.body.months as monthContainer }
          <section>
            <h3>{ monthContainer.month.name }</h3>
            <table>
              <thead>
                <th>M</th>
                <th>V</th>
                <th>T</th>
                <th>M</th>
                <th>J</th>
                <th>S</th>
                <th>U</th>
                <th>N</th>
              </thead>
              <tr>
                { #each Array.from({ length: monthContainer.monthDays[0].weekday.index }) as empty }
                  <td></td>
                { /each }

                { #each Array.from({ length: 8 - monthContainer.monthDays[0].weekday.index }, (value, index) => index) as index }
                  <td class="{ monthContainer.monthDays[0 + index].day.holidays ? 'holiday' : '' }"
                    title="{ monthContainer.monthDays[0 + index].day.holidays }">

                      { monthContainer.monthDays[0 + index].day.value }
                  </td>
                { /each }
              </tr>
              <tr>
                { #each Array.from({ length: 8 }, (value, index) => index) as index }
                  <td class="{ monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.holidays ? 'holiday' : '' }"
                    title="{ monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.holidays }">

                      { monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.value }
                  </td>
                { /each }
              </tr>
              <tr>
                { #each Array.from({ length: 8 }, (value, index) => index) as index }
                  <td class="{ monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.holidays ? 'holiday' : '' }"
                    title="{ monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.holidays }">

                      { monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.value }
                  </td>
                { /each }
              </tr>
              <tr>
                { #each Array.from({ length: 8 }, (value, index) => index) as index }
                  <td class="{ monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays ? 'holiday' : '' }"
                    title="{ monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays }">{

                      monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]
                        ? monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.value 
                        : ''
                  }</td>
                { /each }
              </tr>
              <tr>
                { #each Array.from({ length: 8 }, (value, index) => index) as index }
                  <td class="{ monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays ? 'holiday' : '' }"
                    title="{ monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays }">{

                      monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]
                        ? monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.value 
                        : ''
                  }</td>
                { /each }
              </tr>
            </table>
          </section>
        { /each }
      { :else }
        <p>There was an error</p>
      { /if }
    </div>
  { /if }
</article>

<style lang="scss">
  article {
    background-color: var(--c-primary--light);
    padding: 1rem;
    border-radius: 1rem;
    position: relative;

    @media (prefers-color-scheme: dark) {
      background-color: var(--c-primary--dark);
    }

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
    }

    & .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .calendar {
    display: grid;
    grid-template: auto / 1fr;
    gap: 1rem;
    justify-items: center;
    padding: 0.5rem;

    @media screen and (width >= 768px) {
      grid-template: auto / repeat(2, 1fr);
    }

    @media screen and (width >= 1200px) {
      grid-template: auto / repeat(3, 1fr);
    }

    & section {
      padding: 0.5rem;
      border-radius: 1rem;
      
      &.current {
        box-shadow: inset 0 0 0 0.125rem var(--c-secondary--dark);

        & h3 {
          font-weight: var(--fw--bold);
        }
      }
    }

    & h3 {
      text-align: center;
    }

    & th,
    & td {
      padding-inline: 1px;
    }

    & th { 
      font-weight: var(--fw--light);
    }

    & td {
      text-align: center;

      &.holiday {
        color: var(--c-secondary--dark);
        font-weight: var(--fw--bold);

        @media (prefers-color-scheme: dark) {
          color: var(--c-secondary--light);
        }
      }

      &.current {
        color: inherit;
        font-weight: var(--fw--bold);
        position: relative;
        z-index: 1;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          aspect-ratio: 1/1;
          z-index: -1;
          border-radius: 1rem;
          background-color: var(--c-secondary--light);
          filter: blur(0.5rem);
        }

        @media (prefers-color-scheme: dark) {
          &::before {
            background-color: var(--c-secondary--dark);
          }
        }
      }
    }
  }
</style>