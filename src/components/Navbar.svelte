<script>
    import { user } from '../stores/user.js';
    import { goto } from '$app/navigation';

    function handleUploadClick(event) {
        if (!$user) {
            event.preventDefault();
            goto('/login');
        }
    }
</script>

<nav>
    <div class="logo">ReceptTár</div>
    <div class="nav-links">
        <a href="/">Főoldal</a>
        <a href="/recipes">Receptek</a>
        <a href="/upload" on:click={handleUploadClick}>Új recept</a>
        {#if $user}
            <span>{$user}</span> <!-- Ha van bejelentkezett user, mutatjuk a nevét -->
        {:else}
            <a href="/login">Bejelentkezés</a>
        {/if}
    </div>
</nav>
