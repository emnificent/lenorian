<script>
  export let form;
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
  <title>Lenorian | Contact</title>
</svelte:head>

<main>
  <p>Whether you don't like the week days' or months' names and would like to suggest your own, or you have an idea for a holiday, or something else, reach out:</p>
  <div>
    <h2>Message</h2>
    <form method="POST">
      <p>Why are you reaching out?</p>
      <select name="topic" required>
        <option value="">Choose an option</option>
        <option value="Week days or months names suggestion">Week days / months names</option>
        <option value="Holiday suggestion">Suggest a holiday</option>
        <option value="The app appears to be broken">Something appears broken</option>
        <option value="Other">Other</option>
      </select>
      <textarea name="message" rows="5" placeholder="Your message, be as specific as possible" required></textarea>
      <button>Send</button>
      { #if form?.success }
        <p>Thanks for your message!</p>
      { :else if form?.error }
        <p>There was an error, try again later.</p>
      { /if }
    </form>
  </div>
</main>

<style lang="scss">
  main {
    padding-block: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  h2 {
    font-size: calc(var(--fs-title--small) * 1rem);
    font-weight: var(--fw--bold);
    margin-bottom: 0.25rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 23rem;

    & select,
    & textarea,
    & input,
    & button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
    }

    & select,
    & textarea,
    & input {
      background-color: var(--c-light);
      color: var(--c-dark);
      box-shadow: inset 0 0 0 0.125rem var(--c-primary--dark);

      &::placeholder {
        color: var(--c-dark);
        opacity: 0.5;
      }

      @media (prefers-color-scheme: dark) {
        background-color: var(--c-dark);
        color: var(--c-light);

        &::placeholder {
          color: var(--c-light);
        }
      }

      &:focus-visible {
        outline: var(--c-primary--dark) 2px solid;
        border-radius: 0.25rem;

		    @media (prefers-color-scheme: dark) {
			    outline-color: var(--c-primary--light);
		    }
      }
    }

    & textarea {
      resize: vertical;
    }

    & button {
      background-color: var(--c-primary--dark);
      color: var(--c-light);
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

    & label {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      & input {
        width: 100%;
      }
    }
  }
</style>