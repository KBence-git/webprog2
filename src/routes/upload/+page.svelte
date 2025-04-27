<script>
    import '../../styles/upload.scss';
    import { searchIngredients } from '../../lib/edamam.js';
    import { user } from '../../stores/user.js';
    import { goto } from '$app/navigation';

    let title = '';
    let ingredients = [{ name: '', measures: [], selectedMeasure: '', amount: '' }];
    let description = '';
    let suggestions = [[]];
    let message = '';

    function addIngredient() {
        ingredients = [...ingredients, { name: '', measures: [], selectedMeasure: '', amount: '' }];
        suggestions = [...suggestions, []];
    }

    function updateIngredient(index, value) {
        ingredients[index].name = value;
        fetchSuggestions(index, value);
    }

    async function fetchSuggestions(index, query) {
        if (query.length > 1) {
            suggestions[index] = await searchIngredients(query);
        } else {
            suggestions[index] = [];
        }
    }

    const allowedUnits = ['gram', 'cup', 'piece', 'slice', 'kilogram', 'ounce', 'pound'];

    function selectSuggestion(index, suggestion) {
        ingredients[index].name = suggestion.label;
        ingredients[index].measures = suggestion.measures.filter(measure =>
            allowedUnits.includes(measure.label.toLowerCase())
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
        // Először átalakítjuk az ingredients listát
        const formattedIngredients = ingredients.map(ingredient => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.selectedMeasure
        }));

        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                ingredients: formattedIngredients, // <<< EZT küldjük el!
                description,
                username: $user
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
    <input type="text" bind:value={title} placeholder="Recipe Name" required />

    <label>Recipe ingredients:</label>
    {#each ingredients as ingredient, index}
        <div class="ingredient-field">
            <div class="ingredient-input">
                <input
                        type="text"
                        bind:value={ingredient.name}
                        placeholder="Add ingredient"
                        on:input={(e) => updateIngredient(index, e.target.value)}
                />
                {#if suggestions[index].length > 0}
                    <ul class="suggestions">
                        {#each suggestions[index] as suggestion}
                            <li on:click={() => selectSuggestion(index, suggestion)}>{suggestion.label}</li>
                        {/each}
                    </ul>
                {/if}
            </div>

            {#if ingredient.selectedMeasure}
                <input
                        type="number"
                        min="0"
                        placeholder="Ammount"
                        bind:value={ingredient.amount}
                        on:input={(e) => updateAmount(index, e.target.value)}
                        class="amount-input"
                />

                <select bind:value={ingredient.selectedMeasure} on:change={(e) => updateSelectedMeasure(index, e.target.value)}>
                    {#each ingredient.measures as measure}
                        <option value={measure.label}>{measure.label}</option>
                    {/each}
                </select>
            {/if}
        </div>
    {/each}

    <button type="button" on:click={addIngredient} class="add-ingredient-button">
        + Add new ingredient
    </button>

    <label>Recipe Description:</label>
    <textarea bind:value={description} placeholder="Description for the recipe" required></textarea>

    <button type="button" on:click={saveRecipe} class="submit-button">Save Recipe</button>

</form>
