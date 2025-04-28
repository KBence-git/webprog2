<script>
    import { user } from '../stores/user.js';
    import { goto } from '$app/navigation';

    let showDropdown = false;

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function logout() {
        localStorage.removeItem('user');
        user.set('');
        goto('/login');
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
                <span on:click={toggleDropdown} class="user-name">{$user}</span>
                {#if showDropdown}
                    <div class="dropdown-menu">
                        <a href="/my-recipes">My Recipes</a>
                        <button on:click={logout}>Logout</button>
                    </div>
                {/if}
            </div>
        {:else}
            <a href="/login">LogIn</a>
        {/if}
    </div>
</nav>
