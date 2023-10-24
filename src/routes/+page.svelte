<script>
	import About from "$lib/components/About.svelte";
	import Calendar from "$lib/components/Calendar.svelte";
  import Convert from "$lib/components/Convert.svelte";
  import Today from "$lib/components/Today.svelte";
</script>

<svelte:head>
  <title>Lenorian calendar</title>
</svelte:head>

<div class="container">
  <main>
    <Today />
    <Convert />
    <Calendar />
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
        max-width: 21rem;
        margin-block: 2rem;
      }
    }
  }
</style>