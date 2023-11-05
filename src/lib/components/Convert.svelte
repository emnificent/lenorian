<script>
  import { slide } from "svelte/transition";

  let converted;
  async function convert(event) {
    event.preventDefault();
    const date = new FormData(event.target).get('date');
    
    if (date.length === 0) return;

    const response = await fetch(`/api/convert?gdate=${date}`);
    converted = await response.json();
  }

  let help = false;
</script>

<section>
  <h2>Convert your birthday</h2>

  <form on:submit={convert}>
    <input type="date" name="date" />
    <button>Convert</button>
  </form>

  { #if converted }
    <div transition:slide>
      { #if converted.body }
        <p class="converted__fulldate">
          {converted.body.fullDate} 
          <span class="help__marker">
            <input type="checkbox" bind:checked={help} aria-label="help"/>
          </span>
        </p>
        { #if help }
          <p class="help" transition:slide>weekday day month year</p>
        { /if }
        <p>{converted.body.shortDate}</p>
        { #if help }
          <p class="help" transition:slide>YYYY-MM-DD</p>
        { /if }
        { #if converted.body.holiday }
          <p class="holiday">{ converted.body.holiday }</p>
        { /if }
      { :else }
        <p>There was an error</p>
      { /if }
    </div>
  { /if }
</section>

<style lang="scss">
  section {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
    }

    & .holiday {
      margin-top: 1rem;
      width: calc(100% - 2.5rem);
    }
  }

  form {
    display: flex;
    gap: 1rem;
    align-items: center;

    & input {
      background-color: var(--c-light);
      color: var(--c-dark);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      box-shadow: inset 0 0 0 0.125rem var(--c-primary--dark);

      @media (prefers-color-scheme: dark) {
        background-color: var(--c-dark);
        color: var(--c-light);
      }

      &:focus-visible {
        outline: var(--c-primary--dark) 2px solid;
        border-radius: 0.25rem;

		    @media (prefers-color-scheme: dark) {
			    outline-color: var(--c-primary--light);
		    }
      }
    }

    & button {
      background-color: var(--c-primary--dark);
      color: var(--c-light);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      transition: background-color 0.3s, color 0.3s;

      &:hover,
      &:focus-visible {
        background-color: var(--c-primary--light);
        color: var(--c-dark);
      }

      &:focus-visible {
        outline-offset: 0.25rem;
        outline: var(--c-primary--dark) 2px solid;
        border-radius: 0.25rem;

		    @media (prefers-color-scheme: dark) {
			    outline-color: var(--c-primary--light);
		    }
      }
    }
  }

  .converted__fulldate {
    display: flex;
    gap: 1rem;
  }

  .help__marker {
    position: relative;
    pointer-events: none;

    & input {
      pointer-events: auto;
      width: 1.25rem;
      aspect-ratio: 1/1;
      opacity: 0;
      outline: none;
    }

    &::after {
      content: "?";
      display: block;
      position: absolute;
      right: 0;
      top: 5px;
      text-align: center;
      height: 1.25rem;
      line-height: 1.25rem;
      aspect-ratio: 1/1;
      border-radius: 25%;
      background-color:var(--c-primary--dark);
      color: var(--c-light);
      font-size: calc(var(--fs-text--small) * 1rem);
      transition: all 0.3s;
    }

    &:hover,
    &:focus-within {
      &::after {
        background-color: var(--c-primary--light);
        color: var(--c-dark);
      }
    }

    &:focus-within {
      outline-offset: 0.25rem;
      outline: var(--c-primary--dark) 2px solid;
      border-radius: 0.25rem;

      @media (prefers-color-scheme: dark) {
        outline-color: var(--c-primary--light);
      }
    }
  }

  .help {
    font-size: 0.75rem;
  }
</style>