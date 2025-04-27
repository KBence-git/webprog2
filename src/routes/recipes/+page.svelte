<script>
    import '../../styles/recipes.scss';
    let recipes = [];

    // Amikor az oldal betöltődik, lekérjük a recepteket
    async function fetchRecipes() {
        const response = await fetch('/api/recipes');
        if (response.ok) {
            recipes = await response.json();
        }
    }

    fetchRecipes();
</script>

<section class="recipes-page">
    <h2>Receptek</h2>

    {#if recipes.length > 0}
        <div class="recipes-grid">
            {#each recipes as recipe}
                <div class="recipe-card">
                    <h3>{recipe.title}</h3>
                    <p class="creator">Megosztotta: {recipe.username}</p>
                </div>
            {/each}
        </div>
    {:else}
        <p>Nincs még feltöltött recept.</p>
    {/if}
</section>
