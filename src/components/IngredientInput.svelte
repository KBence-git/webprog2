<script>
    export let ingredient;
    export let index;
    export let suggestions = [];
    export let updateIngredient;
    export let selectSuggestion;
    export let updateAmount;
    export let updateSelectedMeasure;
</script>

<div class="ingredient-field">
    <div class="ingredient-input">
        <input
                type="text"
                class="ingredient-name"
                bind:value={ingredient.name}
                placeholder="Add ingredient"
                on:input={(e) => updateIngredient(index, e.target.value)}
        />
        {#if suggestions.length > 0}
            <ul class="suggestions">
                {#each suggestions as suggestion}
                    <li on:click={() => selectSuggestion(index, suggestion)}>{suggestion.label}</li>
                {/each}
            </ul>
        {/if}
    </div>

    {#if ingredient.selectedMeasure}
        <div class="amount-unit-row">
            <input
                    type="number"
                    min="0"
                    placeholder="Amount"
                    bind:value={ingredient.amount}
                    on:input={(e) => updateAmount(index, e.target.value)}
                    class="amount-input"
            />
            <select
                    class="ingredient-unit"
                    bind:value={ingredient.selectedMeasure}
                    on:change={(e) => updateSelectedMeasure(index, e.target.value)}
            >
                {#each ingredient.measures as measure}
                    <option value={measure.label}>{measure.label}</option>
                {/each}
            </select>
        </div>
    {/if}
</div>
