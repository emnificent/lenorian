<script>
  const year = new Date().getFullYear();
</script>

<footer> 
  <nav>
    <a href="/">Home</a>
    <a href="/contact">Feedback</a>
    <a href="/devs">Developers</a>
  </nav>
  <p> © {year} <a href="https://dev.emnificent.com" target="_blank">emnificent</a></p>
</footer>

<style lang="scss">
  a {
    color: var(--c-dark);

    &:hover,
    &:focus {
      text-decoration-color: var(--c-dark);
    }

    @media (prefers-color-scheme: dark) {
      color: var(--c-primary);

      &:hover,
      &:focus {
        text-decoration-color: var(--c-primary);
      }
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (width >= 768px) {
      display: grid;
      grid-template: auto / repeat(3, 1fr);
      justify-items: center;
      gap: 2rem;

      & a:nth-child(1) {
        justify-self: end;
      }
    }
  }

  p {
    font-size: calc(var(--fs-text--small) * 1rem);
    line-height: 1;
    text-align: center;
    opacity: 0.5;

    & a {
      text-decoration: none;

      @media (prefers-color-scheme: dark) {
        color: var(--c-light);
      }
    }
  }

  footer {
    padding-block: 2rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--c-primary--light);

    @media (prefers-color-scheme: dark) {
      background-color: var(--c-primary--dark);
    }

    /* make the footer color fill the page horizontally */
    padding-inline: 1rem;
    margin-inline: -1rem;

    @media screen and (width >= 768px) {
      padding-inline: 1.5rem;
      margin-inline: -1.5rem;
    }

    @media screen and (width >= 1200px) {
      padding-inline: 62500rem;
      margin-inline: -62500rem;
    }

    /* everything below puts the footer where it belongs */
    margin-top: auto;
  }

  :global(body) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
</style>