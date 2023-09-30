<script>
	import About from "../components/About.svelte";
  import Convert from "../components/Convert.svelte";
  import Today from "../components/Today.svelte";
</script>

<div class="container">
  <main>
    <div>
      <p>Today is...</p>
      <Today />
    </div>
  
    <Convert />
  </main>
  <aside>
    <About />
  </aside>
</div>

<style lang="scss">
  main {
    margin-block: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  aside {
    margin-bottom: 2rem;
  }

  .container {
    display: contents;

    @media screen and (width >= 992px) {
      display: flex;
      gap: 2rem;

      & main {
        flex: 1 1 0;
      }

      & aside {
        max-width: 20rem;
        margin-block: 2rem;
      }
    }
  }
</style>