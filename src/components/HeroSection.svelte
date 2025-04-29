<script>
    import HeroCard from './HeroCard.svelte';
    import { user } from '../stores/user.js';
    import "../styles/home.scss";
</script>

<section class="hero">
    <div class="card-container">
        <HeroCard
                link="/recipes"
                imgSrc="/recipe.png"
                altText="Recipes icon"
                title="Recipes"
        />

        {#if $user}
            <HeroCard
                    link="/upload"
                    imgSrc="/addrecipe.png"
                    altText="Add Recipes Icon"
                    title="Upload Recipe"
            />
        {:else}
            <HeroCard
                    link="/login"
                    imgSrc="/login.jpg"
                    altText="LogIn icon"
                    title="LogIn"
            />
        {/if}
    </div>
</section>
