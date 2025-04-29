<script>
    import { searchIngredients } from '../lib/edamam.js';
    import { user } from '../stores/user.js';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import IngredientInput from './IngredientInput.svelte';

    let title = '';
    let ingredients = [{ name: '', measures: [], selectedMeasure: '', amount: '' }];
    let description = '';
    let suggestions = [[]];
    let message = '';
    let image = null;

    let titleError = false;
    let descriptionError = false;

    onMount(() => {
        const loggedUser = localStorage.getItem('user');
        if (!loggedUser) {
            goto('/login');
        }
    });

    function addIngredient() {
        ingredients = [...ingredients, { name: '', measures: [], selectedMeasure: '', amount: '' }];
        suggestions = [...suggestions, []];
    }

    async function fetchSuggestions(index, query) {
        if (query.length > 1) {
            suggestions[index] = await searchIngredients(query);
        } else {
            suggestions[index] = [];
        }
    }

    function updateIngredient(index, value) {
        ingredients[index].name = value;
        fetchSuggestions(index, value);
    }

    function selectSuggestion(index, suggestion) {
        ingredients[index].name = suggestion.label;
        ingredients[index].measures = suggestion.measures.filter(measure =>
            ['gram', 'cup', 'piece', 'slice', 'kilogram', 'ounce', 'pound'].includes(measure.label.toLowerCase())
        );
        ingredients[index].selectedMeasure = ingredients[index].measures.length > 0
            ? ingredients[index].measures[0].label
            : '';
        suggestions[index] = [];
    }

    function updateAmount(index, value) {
        ingredients[index].amount = value;
    }

    function updateSelectedMeasure(index, value) {
        ingredients[index].selectedMeasure = value;
    }

    async function saveRecipe() {
        titleError = false;
        descriptionError = false;

        if (!title.trim()) titleError = true;
        if (!description.trim()) descriptionError = true;

        if (titleError || descriptionError) return;

        const formattedIngredients = ingredients.map(ingredient => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.selectedMeasure
        }));

        let imageUrl = '';

        if (image) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                imageUrl = e.target.result;
                await sendRecipe(imageUrl, formattedIngredients);
            };
            reader.readAsDataURL(image);
        } else {
            await sendRecipe('', formattedIngredients);
        }
    }

    async function sendRecipe(imageUrl, formattedIngredients) {
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                ingredients: formattedIngredients,
                description,
                username: $user,
                image: imageUrl
            })
        });

        const result = await response.json();
        message = result.message;

        if (response.ok) {
            goto('/recipes');
        }
    }
</script>

<form class="upload-form">
    <h2>Upload Recipe</h2>

    <label>Recipe Name:</label>
    <input
            type="text"
            bind:value={title}
            placeholder="Recipe Name"
            class:title-error={titleError}
    />
    {#if titleError}
        <p class="error-message">Missing detail</p>
    {/if}

    <label>Recipe ingredients:</label>
    {#each ingredients as ingredient, index}
        <IngredientInput
                {ingredient}
                {index}
                suggestions={suggestions[index]}
                {updateIngredient}
                {selectSuggestion}
                {updateAmount}
                {updateSelectedMeasure}
        />
    {/each}

    <button type="button" on:click={addIngredient} class="add-ingredient-button">
        + Add new ingredient
    </button>

    <label>Recipe Description:</label>
    <textarea
            bind:value={description}
            placeholder="Description for the recipe"
            class:description-error={descriptionError}
    ></textarea>
    {#if descriptionError}
        <p class="error-message">Missing detail</p>
    {/if}

    <label>Recipe Image:</label>
    <input type="file" accept="image/*" on:change={(e) => image = e.target.files[0]} />


    <button type="button" on:click={saveRecipe} class="submit-button">Save Recipe</button>
</form>
