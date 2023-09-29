<script>
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

  </aside>
</div>

<style>
  main {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>