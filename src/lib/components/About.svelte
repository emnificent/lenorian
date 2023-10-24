<section>
  <h2>About</h2>
  <p>The first day of the Lenorian calendar is on the 20th of March 1948 (Gregorian calendar), the spring equinox, the year of the <a href="/human-rights">Universal Declaration of Human Rights</a>. The calendar celebrates and promotes Human Rights, it uses a modified version of the <a href="https://en.wikipedia.org/wiki/Human_Rights_Logo" target="_blank">Human Rights logo</a> for its identity.</p>

  <h3>Leap years rule</h3>
  <p>Each year is made out of 365 days, except for leap years that have one extra day added to the end of the last month of the year.</p>
  <p>Year 0 and years divisible by 4 are leap years, except if they're also divisible by 100, then they're common years, except if when divided by 900 the remainder is 200 or 600, then they're leap years (<a href="https://en.wikipedia.org/wiki/Milutin_Milankovi%C4%87#Revised_Julian_calendar" target="_blank">Milutin Milanković rule</a>).</p>

  <h3>Composition</h3>
  <p>There are 12 months of 30 or 31 days, the first month has 30 days, the second 31, alternating this way until the last month that has either 30 or 31 days.</p>
  <p>There are 8 days in a week, so it's easier to divide it in two.</p>

  <h3>Days and months names</h3>
  <p>Not set in stone, suggest yours through the <a href="/contact">feedback form</a>!</p>
  <div class="about-names">
    <div>
      <h4>Week days:</h4>
      <ol>
        <li>Primidi</li>
        <li>Secundi</li>
        <li>Tertidi</li>
        <li>Quartidi</li>
        <li>Cinqidi</li>
        <li>Sextidi</li>
        <li>Septidi</li>
        <li>Octadi</li>
      </ol>
    </div>
    <div>
      <h4>Months:</h4>
      <ol>
        <li>Unisem</li>
        <li>Unibis</li>
        <li>Uniter</li>
        <li>Duosem</li>
        <li>Duobis</li>
        <li>Duoter</li>
        <li>Tresem</li>
        <li>Trebis</li>
        <li>Treter</li>
        <li>Quasem</li>
        <li>Quabis</li>
        <li>Quater</li>
      </ol>
    </div>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
    }

    & h3 {
      font-weight: var(--fw--bold);
    }

    & ol {
      list-style-position: inside;
    }

    & .about-names {
      display: flex;
      gap: 4rem;
    }
  }
</style>