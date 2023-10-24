<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
  <title>Lenorian | API Docs</title>
</svelte:head>

<main>
  <h2>API Documentation</h2>
  <div>
    <p>Base URL: <code>/api</code></p>
    <p>For now the API is accessible through <a href="/contact">request-only</a>, an API key will be required eventually</p>
  </div>
  <article>
    <div>
      <h3><code><span class="api-verb">GET</span> /convert</code></h3>
      <p>Convert the current Gregorian date to the corresponding Lenorian date using the UTC timezone</p>
    </div>

    <div>
      <h4>Response</h4>

<pre><code>{`{
  "status": 200,
  "message": "OK",
  "body": {
    "timezone": "utc",
    "year": {
      "value": 0,
      "leapYear": true,
      "totalDays": 366
    },
    "month": {
      "index": 8,
      "name": "Treter",
      "value": 9
    },
    "monthDay": {
      "index": 21,
      "value": 22
    },
    "weekday": {
      "index": 1,
      "name": "Secundi"
    },
    "shortDate": "0000-09-22",
    "fullDate": "Secundi 22 Treter 0",
    "holiday": "Universal Declaration of Human Rights Day",
    "yearDay": 265
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
            <td>Convert a Gregorian date to a Lenorian date; always uses UTC</td>
          </tr>
          <tr>
            <td><code>time</code></td>
            <td>Integer</td>
            <td><code>Unix time</code></td>
            <td>Convert an Unix timestamp (in seconds) to a Lenorian date</td>
          </tr>
          <tr>
            <td><code>offset</code></td>
            <td>Integer</td>
            <td></td>
            <td>Switch to local time by specifying the timezone offset (in minutes) from UTC</td>
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
            <th>Range</th>
            <th>Value</th>
            <th>Format</th>
          </tr>
          <tr>
            <td><code>timezone</code></td>
            <td>String</td>
            <td></td>
            <td><code>utc</code> / <code>local</code></td>
          </tr>
          <tr>
            <td><code>year.value</code></td>
            <td>Integer</td>
            <td><code>[ -&infin; ; &infin; ]</code></td>
          </tr>
          <tr>
            <td><code>year.leapYear</code></td>
            <td>Boolean</td>
          </tr>
          <tr>
            <td><code>year.totalDays</code></td>
            <td>Integer</td>
            <td></td>
            <td><code>365</code> or <code>366</code></td>
          </tr>
          <tr>
            <td><code>month.index</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 11 ]</code></td>
          </tr>
          <tr>
            <td><code>month.value</code></td>
            <td>Integer</td>
            <td><code>[ 1 ; 12 ]</code></td>
          </tr>
          <tr>
            <td><code>month.name</code></td>
            <td>String</td>
          </tr>
          <tr>
            <td><code>monthDay.index</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 30 ]</code></td>
          </tr>
          <tr>
            <td><code>monthDay.value</code></td>
            <td>Integer</td>
            <td><code>[ 1 ; 31 ]</code></td>
          </tr>
          <tr>
            <td><code>weekDay.index</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 7 ]</code></td>
          </tr>
          <tr>
            <td><code>weekDay.name</code></td>
            <td>String</td>
          </tr>
          <tr>
            <td><code>shortDate</code></td>
            <td>String</td>
            <td></td>
            <td></td>
            <td><code>YYYY-MM-DD</code></td>
          </tr>
          <tr>
            <td><code>fullDate</code></td>
            <td>String</td>
            <td></td>
            <td></td>
            <td><code>weekday day month year</code></td>
          </tr>
          <tr>
            <td><code>holiday</code></td>
            <td>String</td>
          </tr>
          <tr>
            <td><code>yearDay</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 365 ]</code></td>
          </tr>
        </table>
      </div>
    </div>
  </article>

  <article>
    <div>
      <h3><code><span class="api-verb">GET</span> /calendar</code></h3>
      <p>Generate the Lenorian calendar for the current Lenorian year</p>
    </div>

    <div>
      <h4>Response</h4>

<pre><code>{`{
  "status": 200,
  "message": "OK",
  "body": {
    "year": {
      "value": 0,
      "leapYear": true,
      "totalDays": 366
    },
    "months": [
      // ...
      {
        "month": {
          "index": 8,
          "name": "Treter",
          "value": 9,
          "current": true
        },
        "monthDays": [
          // ...
          {
            "day": {
              "index": 21,
              "value": 22,
              "current": true,
              "holiday": "Universal Declaration of Human Rights Day"
            },
            "weekday": {
              "index": 1,
              "name": "Secundi"
            }
          },
          // ...
        ]
      },
      // ...
    ]
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
            <td><code>year</code></td>
            <td>Integer</td>
            <td></td>
            <td>Generate the Lenorian calendar for the specified Lenorian year</td>
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
            <th>Range / Value</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><code>year.value</code></td>
            <td>Integer</td>
            <td><code>[ -&infin; ; &infin; ]</code></td>
          </tr>
          <tr>
            <td><code>year.leapYear</code></td>
            <td>Boolean</td>
          </tr>
          <tr>
            <td><code>year.totalDays</code></td>
            <td>Integer</td>
            <td><code>365</code> or <code>366</code></td>
          </tr>
          <tr>
            <td><code>months</code></td>
            <td>Array</td>
            <td></td>
            <td><code>months.length</code> equals 12</td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;month.index</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 11 ]</code></td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;month.value</code></td>
            <td>Integer</td>
            <td><code>[ 1 ; 12 ]</code></td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;month.name</code></td>
            <td>String</td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;month.current</code></td>
            <td>Boolean</td>
            <td></td>
            <td>Highlight the current month when applicable (UTC)</td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;monthDays</code></td>
            <td>Array</td>
            <td></td>
            <td><code>monthDays.length</code> equals 30 or 31</td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;&nbsp;&nbsp;day.index</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 30 ]</code></td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;&nbsp;&nbsp;day.value</code></td>
            <td>Integer</td>
            <td><code>[ 1 ; 31 ]</code></td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;&nbsp;&nbsp;day.current</code></td>
            <td>Boolean</td>
            <td></td>
            <td>Highlight the current day when applicable (UTC)</td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;&nbsp;&nbsp;day.holiday</code></td>
            <td>String</td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;&nbsp;&nbsp;weekday.index</code></td>
            <td>Integer</td>
            <td><code>[ 0 ; 7 ]</code></td>
          </tr>
          <tr>
            <td><code>&nbsp;&nbsp;&nbsp;&nbsp;weekday.name</code></td>
            <td>String</td>
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

      & .api-verb {
        display: inline-block;
        background-color: var(--c-secondary--dark);
        color: var(--c-light);
        padding: 0.125rem 0.5rem;
        border-radius: 0.5rem;
      }
    }

    & h4 {
      margin-bottom: 0.25rem;
      text-transform: uppercase;
    }

    & code {
      font-family: 'Fira Code', monospace;
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