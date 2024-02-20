<script>
  import '$lib/styles/reset.scss';
  import '$lib/styles/global.scss';

  import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import TopBanner from '$lib/components/TopBanner.svelte';

  import logo from '$lib/images/human_rights_logo.png'
</script>

<svelte:head>
  <meta name="description" content="The Lenorian calendar is a Human Rights calendar! Starting in 1948, the year of the Universal Declaration of Human Rights, its goals are to promote human rights and to serve as a reminder that human rights are still flouted every day by states and corporations alike." />
  <meta property="og:image" content="{logo}" />
</svelte:head>

<TopBanner />

<Header />

<slot />

<Footer />
