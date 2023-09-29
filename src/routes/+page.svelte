<script>
	import About from "../components/About.svelte";
  import Convert from "../components/Convert.svelte";
  import Today from "../components/Today.svelte";
</script>

<div>
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

<style>
  main {
    margin-block: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  aside {
    margin-bottom: 2rem;
  }
</style>