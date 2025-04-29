<script>
    export let recipe;
    export let nutrition;
    export let onClose;
</script>

<div class="modal-overlay" on:click={onClose}>
    <div class="modal-content" on:click|stopPropagation>
        <button class="close-button" on:click={onClose}>X</button>

        <h2>{recipe.title}</h2>

        <h3>Ingredients:</h3>
        <ul>
            {#each recipe.ingredients as ingredient}
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
        <p>{recipe.description}</p>
        {#if recipe.image}
            <img src={recipe.image} alt={recipe.title} class="recipe-full-image" />
        {/if}

    </div>
</div>
