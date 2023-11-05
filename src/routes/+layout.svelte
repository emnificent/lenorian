<script>
  import '$lib/styles/reset.scss';
  import '$lib/styles/global.scss';

  import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

  import logo from '$lib/images/human_rights_logo.png'
</script>

<svelte:head>
  <meta name="description" content="The Lenorian calendar is more than just a way to track time — it's a celebration of human rights!" />
  <meta property="og:image" content="{logo}" />
</svelte:head>

<Header />

<slot />

<Footer />
