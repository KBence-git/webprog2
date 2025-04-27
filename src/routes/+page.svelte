<script>
    import '../styles/home.scss';
    import { user } from '../stores/user.js';
</script>

<section class="hero">
    <div class="card-container">
        <a href="/recipes" class="hero-card">
            <img src="/recipe.png" alt="Recipes icon" class="hero-icon" />
            <h2>Recipes</h2>
        </a>

        {#if $user}
            <a href="/upload" class="hero-card">
                <img src="/addrecipe.png" alt="Add Recipes Icon" class="hero-icon" />
                <h2>Upload Recipe</h2>
            </a>
        {:else}
            <a href="/login" class="hero-card">
                <img src="login.jpg" alt="LogIn icon" class="hero-icon" />
                <h2>Log In</h2>
            </a>
        {/if}
    </div>
</section>
