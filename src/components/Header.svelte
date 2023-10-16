<header>
  <a href="/" class="home">
    <span class="temporary"></span>
    <h1>Lenorian calendar</h1>
  </a>
  <nav>
    <a href="/feedback">Feedback</a>
    <a href="/developers/documentation">Developers</a>
  </nav>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    & h1 {
      font-size: calc(var(--fs-title) * 1rem);
      font-weight: var(--fw--bold);
      line-height: 1;
    }

    & .home {
      display: flex;
      gap: 1rem;
      align-items: center;
      color: var(--c-dark);
      text-decoration: none;

      @media (prefers-color-scheme: dark) {
        color: var(--c-light);
      }
    }

    & .temporary {
      display: block;
      width: 4rem;
      aspect-ratio: 1/1;
      background-color: var(--c-secondary--dark);
      border-radius: 50%;
    }

    & nav {
      display: none;

      @media screen and (width >= 768px) {
        display: flex;
        gap: 2rem;
      }
    }
  }
</style>