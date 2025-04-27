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
    <div class="logo">Recipes Garden</div>
    <div class="nav-links">
        <a href="/">Main Page</a>
        <a href="/recipes">Recipes</a>
        <a href="/upload" on:click={handleUploadClick}>Upload Recipe</a>
        {#if $user}
            <span>{$user}</span> <!-- Ha van bejelentkezett user, mutatjuk a nevét -->
            <span>{$user}</span>
        {:else}
            <a href="/login">Login</a>
        {/if}
    </div>
</nav>
