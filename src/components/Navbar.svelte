<script>
    import { user } from '../stores/user.js';
    import { goto } from '$app/navigation';

    let showLogout = false;

    function handleUploadClick(event) {
        if (!$user) {
            event.preventDefault();
            goto('/login');
        }
    }
    function toggleLogout() {
        showLogout = !showLogout;
    }

    function logout() {
        user.set('');
        showLogout = false;
        goto('/');
    }
</script>

<nav>
    <div class="logo">Recipe Garden</div>
    <div class="nav-links">
        <a href="/">Main Page</a>
        <a href="/recipes">Recipes</a>
        <a href="/upload" on:click={handleUploadClick}>Upload Recipe</a>

        {#if $user}
            <span>{$user}</span> <!-- Ha van bejelentkezett user, mutatjuk a nevét -->
            <div class="user-dropdown">
                <span on:click={toggleLogout} class="username">{$user}</span>
                {#if showLogout}
                    <div class="logout-button" on:click={logout}>
                        Logout
                    </div>
                {/if}
            </div>
        {:else}
            <a href="/login">LogIn</a>
        {/if}
    </div>
</nav>