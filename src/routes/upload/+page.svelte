<script>
    import '../../styles/upload.scss';
    import { searchIngredients } from '../../lib/edamam.js';

    let title = '';
    let ingredients = [''];
    let description = '';
    let suggestions = [[]]; // egy tömb tömbje, minden inputhoz külön javaslatok

    function addIngredient() {
        ingredients = [...ingredients, ''];
        suggestions = [...suggestions, []];
    }

    function updateIngredient(index, value) {
        ingredients[index] = value;
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
        ingredients[index] = suggestion;
        suggestions[index] = [];
    }
</script>

<form class="upload-form">
    <h2>Új recept hozzáadása</h2>

    <label>Recept elnevezése:</label>
    <input type="text" bind:value={title} placeholder="Írd be a recept nevét" required />

    <label>Recept összetevők:</label>
    {#each ingredients as ingredient, index}
        <div class="ingredient-field">
            <input
                    type="text"
                    bind:value={ingredients[index]}
                    placeholder="Összetevő megadása"
                    on:input={(e) => updateIngredient(index, e.target.value)}
            />
            {#if suggestions[index].length > 0}
                <ul class="suggestions">
                    {#each suggestions[index] as suggestion}
                        <li on:click={() => selectSuggestion(index, suggestion)}>{suggestion}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/each}

    <button type="button" on:click={addIngredient} class="add-ingredient-button">
        + Új összetevő hozzáadása
    </button>

    <label>Recept leírása:</label>
    <textarea bind:value={description} placeholder="Írd le a recept elkészítését" required></textarea>

    <button type="submit" class="submit-button">Recept mentése</button>
</form>
