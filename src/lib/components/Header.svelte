<script>
  import logo from '$lib/images/edited_human_rights_logo.svg'
</script>

<header>
  <a href="/" class="home">
    <img src="{logo}" alt="modified human rights logo, lenorian calendar logo" />
    <h1>Lenorian calendar</h1>
  </a>
  <nav>
    <a href="/contact">Feedback</a>
    <a href="/devs">Developers</a>
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

    & img {
      width: 4rem;
      aspect-ratio: 1/1;
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

    & nav {
      display: none;

      @media screen and (width >= 768px) {
        display: flex;
        gap: 2rem;
      }
    }
  }
</style>