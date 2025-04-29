<script>
    import { onMount } from 'svelte';
    import { getNutrition } from '../lib/edamam-nutrition.js';
    import RecipeCard from './RecipeCard.svelte';
    import RecipeModal from './RecipeModal.svelte';
    import EmptyCard from './EmptyCard.svelte';

    let recipes = [];
    let selectedRecipe = null;
    let nutrition = null;

    onMount(async () => {
        const res = await fetch('/api/recipes');
        if (res.ok) {
            recipes = await res.json();
            recipes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
    });

    async function openRecipe(recipe) {
        selectedRecipe = recipe;
        nutrition = await getNutrition(recipe.ingredients);
    }

    function closeRecipe() {
        selectedRecipe = null;
        nutrition = null;
    }
</script>

<section class="recipes-page">
    <h1>Recipes</h1>

    {#if recipes.length > 0}
        <div class="recipes-grid">
            {#each recipes as recipe}
                <RecipeCard {recipe} onClick={openRecipe} />
            {/each}
        </div>
    {:else}
        <EmptyCard />
    {/if}

    {#if selectedRecipe}
        <RecipeModal recipe={selectedRecipe} {nutrition} onClose={closeRecipe} />
    {/if}
</section>
