<main>
  <h2>API Documentation</h2>
  <article>
    <div>
      <h3><code>/convert</code></h3>
      <p>Convert the current Gregorian date to the corresponding Lenorian date using the local timezone</p>
    </div>

    <div>
      <h4>Response</h4>

<pre><code>{`{
  "status": 200,
  "message": "OK",
  "body": {
    "timezone": "local"
    "year": 0,
    "yearDay": 265,
    "leapYear": true,
    "month": {
      "id": 8,
      "name": "Treter"
    },
    "monthDay": 21,
    "weekDay": {
      "id": 1,
      "name": "Secundi"
    },
    "shortDate": "0000-09-22",
    "fullDate": "Secundi 22 Treter 0"
  }
}`}</code></pre>
    </div>

    <div>
      <h4>Optional query parameters</h4>
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
            <td>Convert a Gregorian date to a Lenorian date</td>
          </tr>
          <tr>
            <td><code>time</code></td>
            <td>Integer</td>
            <td><code>Unix time</code></td>
            <td>Convert an Unix timestamp (in seconds) to a Lenorian date</td>
          </tr>
          <tr>
            <td><code>utc</code></td>
            <td>Boolean</td>
            <td></td>
            <td>Switch from local timezone conversions to UTC timezone conversions</td>
          </tr>
        </table>
      </div>
    </div>

    <div>
      <h4>Response body fields details</h4>
      <div class="table">
        <table>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Range / Format</th>
          </tr>
          <tr>
            <td><code>timezone</code></td>
            <td>String</td>
            <td><code>local</code> / <code>utc</code></td>
          </tr>
          <tr>
            <td><code>year</code></td>
            <td>Integer</td>
            <td><code>[ -&infin; ; &infin; ]</code></td>
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
      <p>Generate the Lenorian calendar for the current Lenorian year</p>
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
            <td>Generate the Lenorian calendar for the specified Lenorian year</td>
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
      margin-bottom: -2rem;
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
      background-color: var(--c-primary--light);
      color: var(--c-dark);
      padding: 1rem;
      border-radius: 1rem;
      overflow-x: auto;

      @media (prefers-color-scheme: dark) {
        background-color: var(--c-primary--dark);
        color: var(--c-light);
      }
    }
  }

  .table {
    border-radius: 1rem;
    overflow: auto;

    & table {
      width: 100%;
      background-color: var(--c-primary--light);
      padding: 1rem;
      border-collapse: collapse;

      @media (prefers-color-scheme: dark) {
        background-color: var(--c-primary--dark);
      }
    }

    & th {
      text-align: start;
      font-weight: var(--fw--bold);
      text-transform: uppercase;
      background-color: var(--c-secondary--dark);
      color: var(--c-light);
      padding: 0.5rem 1rem;

      @media (prefers-color-scheme: dark) {
        color: var(--c-dark);
      }
    }

    & td {
      padding: 0.5rem 1rem;
      white-space: nowrap;
    }

    & tr:nth-child(odd) {
      backdrop-filter: invert(5%);
    }
  }
</style>