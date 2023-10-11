<script>
	import { onMount } from "svelte";

  let calendar;
  onMount(async () => {
    const response = await fetch('/api/calendar');
    calendar = await response.json();
  });
</script>

<article>
  <div class="header">
    <h2>Calendar</h2>
    <p>Year {calendar?.body.year.value} {calendar?.body.year.leapYear ? '(leap)': ''}</p>
  </div>

  <div class="calendar">
    { #if calendar?.body }  
      { #each calendar.body.months as monthContainer }
        <section class="{ monthContainer.month.current ? 'current' : '' }">
          <h3>{ monthContainer.month.name }</h3>
          <table>
            <thead>
              <th>P</th>
              <th>S</th>
              <th>T</th>
              <th>Q</th>
              <th>C</th>
              <th>S</th>
              <th>S</th>
              <th>O</th>
            </thead>
            <tr>
              { #each Array.from({ length: monthContainer.monthDays[0].weekday.index }) as empty }
                <td></td>
              { /each }

              { #each Array.from({ length: 8 - monthContainer.monthDays[0].weekday.index }, (value, index) => index) as index }
                <td class="{ monthContainer.monthDays[0 + index].day.current ? 'current' : '' }
                  { monthContainer.monthDays[0 + index].day.holidays ? 'holiday' : '' }"
                  title="{ monthContainer.monthDays[0 + index].day.holidays?.[0] }">

                    { monthContainer.monthDays[0 + index].day.value }
                </td>
              { /each }
            </tr>
            <tr>
              { #each Array.from({ length: 8 }, (value, index) => index) as index }
                <td class="{ monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.current ? 'current' : '' }
                  { monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.holidays ? 'holiday' : '' }"
                  title="{ monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.holidays?.[0] }">

                    { monthContainer.monthDays[(8 - monthContainer.monthDays[0].weekday.index) + index].day.value }
                </td>
              { /each }
            </tr>
            <tr>
              { #each Array.from({ length: 8 }, (value, index) => index) as index }
                <td class="{ monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.current ? 'current' : '' }
                  { monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.holidays ? 'holiday' : '' }"
                  title="{ monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.holidays?.[0] }">

                    { monthContainer.monthDays[(16 - monthContainer.monthDays[0].weekday.index) + index].day.value }
                </td>
              { /each }
            </tr>
            <tr>
              { #each Array.from({ length: 8 }, (value, index) => index) as index }
                <td class="{ monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.current ? 'current' : '' }
                  { monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays ? 'holiday' : '' }"
                  title="{ monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays?.[0] }">{

                    monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]
                      ? monthContainer.monthDays[(24 - monthContainer.monthDays[0].weekday.index) + index]?.day.value 
                      : ''
                }</td>
              { /each }
            </tr>
            <tr>
              { #each Array.from({ length: 8 }, (value, index) => index) as index }
                <td class="{ monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.current ? 'current' : '' }
                  { monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays ? 'holiday' : '' }"
                  title="{ monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.holidays?.[0] }">{

                    monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]
                      ? monthContainer.monthDays[(32 - monthContainer.monthDays[0].weekday.index) + index]?.day.value 
                      : ''
                }</td>
              { /each }
            </tr>
          </table>
        </section>
      { /each }
    { /if }
  </div>
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
        color: var(--c-light);
        position: relative;
        z-index: 0;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          aspect-ratio: 1/1;
          z-index: -1;
          border-radius: 1rem;
          background-color: var(--c-dark);
          filter: blur(0.25rem);
        }

        @media (prefers-color-scheme: dark) {
          color: var(--c-dark);

          &::before {
            background-color: var(--c-light);
          }
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