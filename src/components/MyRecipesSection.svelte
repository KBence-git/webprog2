<script>
    import { onMount } from 'svelte';
    import { user } from '../stores/user.js';
    import { getNutrition } from '../lib/edamam-nutrition.js';
    import MyRecipeCard from './MyRecipeCard.svelte';
    import RecipeModal from './RecipeModal.svelte';

    let recipes = [];
    let selectedRecipe = null;
    let nutrition = null;

    onMount(async () => {
        const res = await fetch('/api/recipes');
        if (res.ok) {
            const all = await res.json();
            recipes = all.filter(r => r.username === $user);
        }
    });

    function closeModal() {
        selectedRecipe = null;
        nutrition = null;
    }

    async function openRecipe(recipe) {
        selectedRecipe = recipe;
        nutrition = await getNutrition(recipe.ingredients);
    }

    async function deleteRecipe(id) {
        if (!confirm('Are you sure you want to delete this recipe?')) return;

        const res = await fetch('/api/recipes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        if (res.ok) {
            recipes = recipes.filter(r => r.id !== id);
            if (selectedRecipe?.id === id) closeModal();
        }
    }
</script>

<section class="recipes-page">
    <h1>My Recipes</h1>

    {#if recipes.length > 0}
        <div class="recipes-grid">
            {#each recipes as recipe}
                <MyRecipeCard
                        {recipe}
                        onOpen={() => openRecipe(recipe)}
                        onDelete={() => deleteRecipe(recipe.id)}
                />
            {/each}
        </div>
    {:else}
        <p>You have not uploaded any recipes yet.</p>
    {/if}

    {#if selectedRecipe}
        <RecipeModal recipe={selectedRecipe} {nutrition} onClose={closeModal} />
    {/if}
</section>
