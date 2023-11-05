<script>
	import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let today;
  onMount(async () => {
    const offset = new Date().getTimezoneOffset();
    const response = await fetch(`/api/convert?offset=${offset}`);
    today = await response.json();
  });

  let help = false;
</script>

<div>
  <p>Today is...</p>
  <article>
    { #if today }
      { #if today.body }
        <h2>
          {today.body.fullDate}
          <span class="help__marker">
            <input type="checkbox" bind:checked={help} aria-label="help"/>
          </span>
        </h2>
        { #if help }
          <p class="help" transition:slide>weekday day month year</p>
        { /if }
        <p>{today.body.shortDate}</p>
        { #if help }
          <p class="help" transition:slide>YYYY-MM-DD</p>
        { /if }
        { #if today.body.holiday }
          <p class="holiday">{ today.body.holiday }</p>
        { /if }
      { :else }
        <p>There was an error</p>
      { /if }
    { :else }
      <p>Loading...</p>
    { /if }
  </article>
</div>

<style lang="scss">
  article {
    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
      display: flex;
      gap: 1rem;
    }

    & .holiday {
      margin-top: 1rem;
      width: calc(100% - 2.5rem);
    }
  }

  .help__marker {
    position: relative;
    pointer-events: none;
    display: flex;
    align-items: center;

    & input {
      pointer-events: auto;
      width: 1.5rem;
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
      height: 1.5rem;
      line-height: 1.5rem;
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