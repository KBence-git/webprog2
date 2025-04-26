<script>
    import BackgroundWrapper from '../components/BackgroundWrapper.svelte';
    import Navbar from '../components/Navbar.svelte';
    import '../styles/background.scss';
    import '../styles/navbar.scss';
</script>

<BackgroundWrapper />

<Navbar />

<main>
    <slot />
</main>
