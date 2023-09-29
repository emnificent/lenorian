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
    <p class="help" transition:slide>weekDay day month year</p>
  { /if }
  <p>{today?.body.shortDate}</p>
  { #if help }
    <p class="help" transition:slide>YYYY-MM-DD</p>
  { /if }
  <span class="help__marker"><input type="checkbox" bind:checked={help}/></span>
</article>

<style lang="scss">
  article {
    background-color: var(--c-primary);
    padding: 1rem;
    border-radius: 1rem;
    position: relative;

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
    }
  }

  .help__marker {
    position: absolute;
    display: flex;
    bottom: 1.125rem;
    right: 1.125rem;
    pointer-events: none;

    & input {
      pointer-events: auto;
    }

    &::after {
      content: "?";
      display: block;
      position: absolute;
      right: -0.25rem;
      top: -0.25rem;
      text-align: center;
      height: 1.5rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color:var(--c-secondary);
      color: var(--c-dark);
      font-size: calc(var(--fs-text--small) * 1rem);
    }
  }

  .help {
    font-size: 0.75rem;
  }
</style>