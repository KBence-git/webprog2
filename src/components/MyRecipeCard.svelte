<script>
    export let recipe;
    export let onDelete;
    export let onOpen;
</script>

<div class="recipe-card" on:click={onOpen}>
    <button
            class="delete-button"
            on:click|stopPropagation={onDelete}
    >×</button>

    <h3>{recipe.title}</h3>
    <p class="creator">Shared by: {recipe.username}</p>

    {#if recipe.createdAt}
        <p class="creation-date">Creation Date: {recipe.createdAt}</p>
    {/if}
</div>
