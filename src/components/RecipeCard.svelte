<script>
    export let recipe;
    export let onClick;
</script>

<div class="recipe-card" on:click={() => onClick(recipe)}>
    {#if recipe.image}
        <img src={recipe.image} alt={recipe.title} class="recipe-thumbnail" />
    {/if}
    <h3>{recipe.title}</h3>
    <p class="creator">Shared by: {recipe.username}</p>
    {#if recipe.createdAt}
        <p class="creation-date">Creation Date: {recipe.createdAt}</p>
    {/if}
</div>

