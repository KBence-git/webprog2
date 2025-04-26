<script>
    import { user } from '../stores/user.js';
</script>

<nav>
    <div class="logo">ReceptTár</div>
    <div class="nav-links">
        <a href="/">Főoldal</a>
        <a href="/recipes">Receptek</a>
        <a href="/upload">Új recept</a>
        {#if $user}
            <span>{$user}</span> <!-- Ha van bejelentkezett user, mutatjuk a nevét -->
        {:else}
            <a href="/register">Regisztráció</a>
            <a href="/login">Bejelentkezés</a>
        {/if}
    </div>
</nav>
