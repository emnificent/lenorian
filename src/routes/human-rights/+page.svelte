<svelte:head>
  <meta name="robots" content="noindex" />
  <link href="https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&display=swap" rel="stylesheet">
  <title>Lenorian | Human Rights</title>
</svelte:head>

<main>
  <h2>Universal Declaration of Human Rights</h2>
  <ol>
    <li>All human beings are born free and equal.</li>
    <li>Everyone is equal regardless of race, color, sex, gender identity, sexual orientation, language, religion, politics, or where they were born.</li>
    <li>Everyone has the right to life and to live in freedom and safety.</li>
    <li>Everyone has the right to be free from slavery.</li>
    <li>Everyone has the right to be free from torture.</li>
    <li>Everyone has the right to be recognized before the law.</li>
    <li>We are all equal before the law.</li>
    <li>Everyone has the right to seek justice if their rights are violated.</li>
    <li>Everyone has the right to freedom from arbitrary arrest, detention or exile.</li>
    <li>Everyone has the right to a fair trial.</li>
    <li>Everyone has the right to be presumed innocent until proven guilty.</li>
    <li>Everyone has the right to privacy and freedom from attacks on their reputation.</li>
    <li>Everyone has the right to freedom of movement and to be free to leave and return to their own country.</li>
    <li>Everyone has the right to seek asylum from persecution.</li>
    <li>Everyone has the right to a nationality.</li>
    <li>Everyone has the right to marry and to have a family.</li>
    <li>Everyone has the right to own property.</li>
    <li>Everyone has the right to freedom of thought, conscience and religion.</li>
    <li>Everyone has the right to freedom of opinion and expression.</li>
    <li>Everyone has the right to freedom of peaceful assembly and association.</li>
    <li>Everyone has the right to take part in government and to have equal access to public service.</li>
    <li>Everyone has the right to social security.</li>
    <li>Everyone has the right to work, to equal pay, to protection against unemployment and the right to form and join trade unions.</li>
    <li>Everyone has the right to rest and leisure.</li>
    <li>Everyone has the right to a decent standard of living, including food, clothing, housing, medical care and social services.</li>
    <li>Everyone has the right to education.</li>
    <li>Everyone has the right to participate in and enjoy culture, art and science.</li>
    <li>Everyone has the right to a social and international order where the rights in this Declaration can be fully realized.</li>
    <li>We have a duty to other people and we should protect their rights and freedoms.</li>
    <li>Nobody can take away these rights and freedoms from us.</li>
  </ol>
  <a href="https://www.un.org/en/about-us/universal-declaration-of-human-rights" target="_blank">Read the full Declaration</a>
</main>

<style lang="scss">
  main {
    font-family: 'Fondamento', cursive;
    font-size: 1rem;
    margin-block: 2rem;

    @media screen and (width >= 992px) {
      font-size: 2rem;
    }

    & h2 {
      font-style: italic;
      font-size: 2rem;

      @media screen and (width >= 992px) {
        font-size: 4rem;
      }
    }

    & ol {
      list-style-position: inside;
    }

    & a {
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      display: inline-block;
      margin-top: 1rem;
    }
  }
</style>
