<script>
  const year = new Date().getFullYear();
</script>

<footer> 
  <nav>
    <a href="/">Home</a>
    <a href="/feedback">Feedback</a>
    <a href="/api">Developers</a>
  </nav>
  <p> © {year} <a href="https://dev.emnificent.com" target="_blank">emnificent</a></p>
</footer>

<style lang="scss">
  a {
    color: var(--c-dark);
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: calc(var(--fs-text--small) * 1rem);
    line-height: 1;
    text-align: center;
    opacity: 0.5;

    & a {
      text-decoration: none;
    }
  }

  footer {
    padding-block: 2rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--c-secondary);

    /* make the footer color fill the page horizontally */
    padding-inline: 1rem;
    margin-inline: -1rem;

    /* everything below puts the footer where it belongs */
    margin-top: auto;
  }

  :global(body) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>