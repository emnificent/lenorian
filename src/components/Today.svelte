<script>
	import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let today;
  onMount(async () => {
    const response = await fetch('/api/convert');
    today = await response.json();
  });

  let help = false;
</script>

<article>
  <h2>{today?.body.fullDate}</h2>
  { #if help }
    <p class="help" transition:slide>weekday day month year</p>
  { /if }
  <p>{today?.body.shortDate}</p>
  { #if help }
    <p class="help" transition:slide>YYYY-MM-DD</p>
  { /if }
  <span class="help__marker"><input type="checkbox" bind:checked={help}/></span>
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
  }

  .help__marker {
    position: absolute;
    display: flex;
    bottom: 1rem;
    right: 1rem;
    pointer-events: none;

    & input {
      pointer-events: auto;
      width: 1.5rem;
      aspect-ratio: 1/1;
      opacity: 0;
      outline: none;

      &:focus-visible {
        opacity: 1;
      }
    }

    &::after {
      content: "?";
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      text-align: center;
      height: 1.5rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color:var(--c-secondary--dark);
      color: var(--c-light);
      font-size: calc(var(--fs-text--small) * 1rem);
      transition: all 0.3s;
    }

    &:hover,
    &:focus-within {
      &::after {
        background-color: var(--c-secondary--light);
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