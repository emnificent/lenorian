<script>
  import '../styles/reset.scss';
  import '../styles/global.scss';

  import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<Header />

<slot />

<Footer />