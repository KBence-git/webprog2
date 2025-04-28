<script>
    import { onMount } from 'svelte';
    import { user } from '../../stores/user.js';
    import '../../styles/recipes.scss';
    import { getNutrition } from '../../lib/edamam-nutrition.js';

    let recipes = [];
    let selectedRecipe = null;
    let nutrition = null;

    onMount(async () => {
        const response = await fetch('/api/recipes');
        if (response.ok) {
            const allRecipes = await response.json();
            recipes = allRecipes.filter(recipe => recipe.username === $user);
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

    async function deleteRecipe(id) {
        if (!confirm('Are you sure you want to delete this recipe?')) return;

        const response = await fetch('/api/recipes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            recipes = recipes.filter(recipe => recipe.id !== id);
            if (selectedRecipe && selectedRecipe.id === id) {
                selectedRecipe = null;
                nutrition = null;
            }
        }
    }
</script>

<section class="recipes-page">
    <h1>My Recipes</h1>

    {#if recipes.length > 0}
        <div class="recipes-grid">
            {#each recipes as recipe}
                <div class="recipe-card">
                    <button class="delete-button" on:click={() => deleteRecipe(recipe.id)}>×</button>
                    <div on:click={() => openRecipe(recipe)}>
                        <h3>{recipe.title}</h3>
                        <p class="creator">Shared by: {recipe.username}</p>
                        {#if recipe.createdAt}
                            <p class="creation-date">Creation Date: {recipe.createdAt}</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>You have not uploaded any recipes yet.</p>
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
                        <li>Calories: {nutrition.calories} kcal</li>
                    </ul>
                {:else}
                    <p>Nutrients loading...</p>
                {/if}

                <h3>Description:</h3>
                <p>{selectedRecipe.description}</p>
            </div>
        </div>
    {/if}
</section>
