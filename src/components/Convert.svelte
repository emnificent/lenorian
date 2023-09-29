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
      <p>{converted?.body.fullDate}</p>
      { #if help }
        <p class="help" transition:slide>weekDay day month year</p>
      { /if }
      <p>{converted?.body.shortDate}</p>
      { #if help }
        <p class="help" transition:slide>YYYY-MM-DD</p>
      { /if }
    </div>

    <span class="help__marker"><input type="checkbox" bind:checked={help} id="test"/></span>
  { /if }
</section>

<style lang="scss">
  section {
    background-color: var(--c-primary);
    padding: 1rem;
    border-radius: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
    }
  }

  form {
    display: flex;
    gap: 1rem;
    align-items: center;

    & input {
      background-color: var(--c-secondary);
      color: var(--c-dark);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
    }

    & button {
      background-color: var(--c-tertiary);
      color: var(--c-light);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
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