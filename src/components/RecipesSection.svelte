<script>
    import { onMount } from 'svelte';
    import { getNutrition } from '../lib/edamam-nutrition.js';
    import RecipeCard from './RecipeCard.svelte';
    import RecipeModal from './RecipeModal.svelte';
    import EmptyCard from './EmptyCard.svelte';

    let recipes = [];
    let selectedRecipe = null;
    let nutrition = null;
    let loading = true;

    let allIngredients = [];
    let selectedIngredients = [];
    let dropdownOpen = false;

    onMount(async () => {
        const res = await fetch('/api/recipes');
        if (res.ok) {
            recipes = await res.json();
            recipes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            allIngredients = collectIngredients(recipes);
        }
        loading = false;
    });

    function collectIngredients(recipes) {
        const set = new Set();
        recipes.forEach(recipe =>
            recipe.ingredients.forEach(ing =>
                set.add(ing.name.toLowerCase())
            )
        );
        return Array.from(set).sort();
    }

    function toggleIngredient(ingredient, checked) {
        if (checked) {
            selectedIngredients = [...selectedIngredients, ingredient];
        } else {
            selectedIngredients = selectedIngredients.filter(i => i !== ingredient);
        }
    }

    async function openRecipe(recipe) {
        selectedRecipe = recipe;
        nutrition = await getNutrition(recipe.ingredients);
    }

    function closeRecipe() {
        selectedRecipe = null;
        nutrition = null;
    }

    $: filteredRecipes = selectedIngredients.length > 0
        ? recipes.filter(recipe =>
            selectedIngredients.every(selected =>
                recipe.ingredients.some(i =>
                    i.name.toLowerCase().includes(selected)
                )
            )
        )
        : recipes;
</script>

<section class="recipes-page">
    <div class="recipes-header">
        <h1>Recipes</h1>

        {#if recipes.length > 0}
            <div class="ingredient-dropdown">
                <button class="ingredient-dropdown-button" on:click={() => dropdownOpen = !dropdownOpen}>
                    Filter by Ingredients {selectedIngredients.length > 0 ? `(${selectedIngredients.length})` : ''}
                </button>
                {#if dropdownOpen}
                    <div class="ingredient-dropdown-content">
                        {#each allIngredients as ingredient}
                            <label>
                                <input
                                        type="checkbox"
                                        value={ingredient}
                                        on:change={(e) => toggleIngredient(e.target.value, e.target.checked)}
                                        checked={selectedIngredients.includes(ingredient)}
                                />
                                {ingredient}
                            </label>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    {#if loading}
        <p>Loading recipes...</p>
    {:else if filteredRecipes.length > 0}
        <div class="recipes-grid">
            {#each filteredRecipes as recipe}
                <RecipeCard {recipe} onClick={openRecipe} />
            {/each}
        </div>
    {:else if recipes.length === 0}
        <EmptyCard />
    {:else}
        <p>No recipes match your filter.</p>
    {/if}

    {#if selectedRecipe}
        <RecipeModal recipe={selectedRecipe} {nutrition} onClose={closeRecipe} />
    {/if}
</section>