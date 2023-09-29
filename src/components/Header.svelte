<header>
  <div class="home">
    <a href="/"><span class="temporary"></span></a>
    <h1>Lenorian calendar</h1>
  </div>
  <a href="/api" class="developers">Developers</a>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    & .home {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    & .temporary {
      display: block;
      width: 4rem;
      aspect-ratio: 1/1;
      background-color: var(--c-tertiary);
      border-radius: 50%;
    }

    & h1 {
      font-size: calc(var(--fs-title) * 1rem);
      font-weight: var(--fw--bold);
      line-height: 1;
    }

    & .developers {
      display: none;

      @media screen and (width >= 768px) {
        display: unset;
      }
    }
  }
</style>