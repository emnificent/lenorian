<script>
  import { onMount } from "svelte";

  let today;
  onMount(async () => {
    const response = await fetch('/api/convert');
    today = await response.json();
  });
</script>

<main>
  <h2>API Documentation</h2>
  <article>
    <div>
      <h3><code>/convert</code></h3>
      <p>Convert the current Gregorian date to the corresponding Lenorian date using the UTC timezone</p>
      <p>⚠️ Planned update: default to local timezone</p>
    </div>

    <div>
      <h4>Response</h4>

<pre><code>{`{
  "status": 200,
  "message": "OK",
  "body": {
    "year": 75,
    "month": {
      "id": 6,
      "name": "Tresem"
    },
    "monthDay": 10,
    "weekDay": {
      "id": 3,
      "name": "Quartidi"
    },
    "shortDate": "0075-07-11",
    "fullDate": "Quartidi 11 Tresem 75",
    "leapYear": false,
    "yearDay": 193
  }
}`}</code></pre>
    </div>

    <div>
      <h4>Optional query parameter</h4>
      <div class="table">
        <table>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Format</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><code>gdate</code></td>
            <td>Date</td>
            <td><code>YYYY-MM-DD</code></td>
            <td>Convert a Gregorian date to a Lenorian date, uses UTC timezone</td>
          </tr>
        </table>
      </div>
    </div>

    <div>
      <h4>Body fields details</h4>
      <div class="table">
        <table>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Range / Format</th>
          </tr>
          <tr>
            <td><code>year</code></td>
            <td>Integer</td>
            <td><code>[ -&infin; ; &infin; ]</code></td>
          </tr>
          <tr>
            <td><code>month.id</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 11 ]</code></td>
          </tr>
          <tr>
            <td><code>monthDay</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 30 ]</code></td>
          </tr>
          <tr>
            <td><code>weekDay.id</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 7 ]</code></td>
          </tr>
          <tr>
            <td><code>yearDay</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 365 ]</code></td>
          </tr>
          <tr>
            <td><code>leapYear</code></td>
            <td>Boolean</td>
            <td></td>
          </tr>
          <tr>
            <td><code>shortDate</code></td>
            <td>String</td>
            <td><code>YYYY-MM-DD</code></td>
          </tr>
          <tr>
            <td><code>fullDate</code></td>
            <td>String</td>
            <td><code>weekDay day month year</code></td>
          </tr>
        </table>
      </div>
    </div>
  </article>

  <article>
    <div>
      <h3><code>/calendar</code></h3>
      <p>Generate a calendar for the current Lenorian year</p>
      <p>⚠️ Doesn't work yet</p>
    </div>

    <div>
      <h4>Optional query parameter</h4>
      <div class="table">
        <table>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Format</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><code>year</code></td>
            <td>Integer</td>
            <td></td>
            <td>Generate the Lenorian calendar for the specified year</td>
          </tr>
        </table>
      </div>
    </div>
  </article>
</main>

<style lang="scss">
  main {
    margin-block: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
      margin-bottom: -1rem;
    }

    & article {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    & h3 {
      font-weight: var(--fw--bold);
    }

    & h4 {
      margin-bottom: 0.25rem;
      text-transform: uppercase;
    }

    & code {
      font-family: monospace;
    }

    & pre {
      background-color: var(--c-dark);
      color: var(--c-light);
      padding: 1rem;
      border-radius: 1rem;
      overflow-x: auto;
    }
  }

  .table {
    border-radius: 1rem;
    overflow: auto;

    & table {
      width: 100%;
      background-color: var(--c-primary);
      padding: 1rem;
      border-collapse: collapse;
    }

    & th {
      text-align: start;
      font-weight: var(--fw--bold);
      text-transform: uppercase;
      background-color: var(--c-tertiary);
      color: var(--c-light);
      padding: 0.5rem 1rem;
    }

    & td {
      padding: 0.5rem 1rem;
      text-wrap: nowrap;
    }
  }
</style>