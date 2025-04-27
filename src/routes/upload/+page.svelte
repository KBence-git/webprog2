<script>
    import '../../styles/upload.scss';
    import { searchIngredients } from '../../lib/edamam.js';
    import { goto } from '$app/navigation'; // Ha sikeres a mentés, átirányítunk máshova
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

    function selectSuggestion(index, suggestion) {
        ingredients[index].name = suggestion.label;
        ingredients[index].measures = suggestion.measures;
        ingredients[index].selectedMeasure = suggestion.measures.length > 0 ? suggestion.measures[0].label : '';
        suggestions[index] = [];
    }

    function updateAmount(index, value) {
        ingredients[index].amount = value;
    }

    function updateSelectedMeasure(index, value) {
        ingredients[index].selectedMeasure = value;
    }

    async function saveRecipe() {
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
                ingredients: formattedIngredients,
                description,
                username: $user  // <<< hozzáadjuk a bejelentkezett felhasználó nevét
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
    <h2>Új recept hozzáadása</h2>

    <label>Recept elnevezése:</label>
    <input type="text" bind:value={title} placeholder="Írd be a recept nevét" required />

    <label>Recept összetevők:</label>
    {#each ingredients as ingredient, index}
        <div class="ingredient-field">
            <div class="ingredient-input">
                <input
                        type="text"
                        bind:value={ingredient.name}
                        placeholder="Összetevő megadása"
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
                        placeholder="Mennyiség"
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
        + Új összetevő hozzáadása
    </button>

    <label>Recept leírása:</label>
    <textarea bind:value={description} placeholder="Írd le a recept elkészítését" required></textarea>

    <button type="button" on:click={saveRecipe} class="submit-button">Recept mentése</button>
</form>
