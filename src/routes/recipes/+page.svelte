<script>
    import { onMount } from 'svelte';
    import '../../styles/recipes.scss';
    import { getNutrition } from '../../lib/edamam-nutrition.js'; // új API hívás tápanyag infókhoz
    import { getNutrition } from '../../lib/edamam-nutrition.js';

    let recipes = [];
    let selectedRecipe = null;
    let nutrition = null;

    async function fetchRecipes() {
        const response = await fetch('/api/recipes');
        if (response.ok) {
            recipes = await response.json();
            recipes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
    }

    onMount(() => {
        fetchRecipes();
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
                <div class="recipe-card" on:click={() => openRecipe(recipe)}>
                    <h3>{recipe.title}</h3>
                    <p class="creator">Shared by: {recipe.username}</p>
                    {#if recipe.createdAt}
                        <p class="creation-date">Creation Date: {recipe.createdAt}</p>
                    {/if}

                </div>
            {/each}
        </div>
    {:else}
        <p>No Recipes.</p>
    {/if}

    {#if selectedRecipe}
        <div class="modal-overlay" on:click={closeRecipe}>
            <div class="modal-content" on:click|stopPropagation>
                <button class="close-button" on:click={closeRecipe}>X</button>

                <h2>{selectedRecipe.title}</h2>

                <h3>Ingredients:</h3>
                <ul>
                    {#each selectedRecipe.ingredients as ingredient}
                        <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                    {/each}
                </ul>

                {#if nutrition}
                    <h3>Nutrients:</h3>
                    <ul>
                        <li>Protein: {nutrition.protein} g</li>
                        <li>Carbohydrates: {nutrition.carbs} g</li>
                        <li>Fat: {nutrition.fat} g</li>
                        <li>Calorie: {nutrition.calories} kcal</li>
                    </ul>
                {:else}
                    <p>Nutrients calculation in progress...</p>
                {/if}

                <h3>Details:</h3>
                <p>{selectedRecipe.description}</p>
            </div>
        </div>
    {/if}
</section>