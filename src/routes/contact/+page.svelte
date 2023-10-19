<main>
  <p>Whether you don't like the week days' or months' names and would like to suggest your own, or you think something could be done better, there are many ways to reach out:</p>
  
  <ul>
    <li><h2>Discord</h2></li>
    <li>
      <h2>GitHub</h2>
      <p>If you have knowledge in SvelteKit feel free to contribute</p>
    </li>
    <li>
      <h2>Email</h2>
      <form>
        <p>Why are you reaching out?</p>
        <select name="topic">
          <option value="">Choose an option</option>
          <option value="naming">Week days / months names</option>
          <option value="api">API</option>
          <option value="other">Other</option>
        </select>
        <textarea name="message" rows="5" placeholder="Your message, be as specific as possible"></textarea>
        <p>Only if you wish to hear back, otherwise leave empty:</p>
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          Email: <input type="email" name="email" />
        </label>
        <button>Send</button>
      </form>
    </li>
  </ul>
</main>

<style lang="scss">
  main {
    padding-block: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;

    & h2 {
      font-size: calc(var(--fs-title--small) * 1rem);
      font-weight: var(--fw--bold);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--c-primary--light);
    padding: 1rem;
    border-radius: 1rem;

    @media (prefers-color-scheme: dark) {
      background-color: var(--c-primary--dark);
    }

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
        outline: var(--c-secondary--dark) 2px solid;
        border-radius: 0.25rem;

		    @media (prefers-color-scheme: dark) {
			    outline-color: var(--c-secondary--light);
		    }
      }
    }

    & textarea {
      resize: vertical;
    }

    & button {
      background-color: var(--c-secondary--dark);
      color: var(--c-light);
      transition: background-color 0.3s, color 0.3s;

      &:hover,
      &:focus-visible {
        background-color: var(--c-secondary--light);
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