<script>
    import { goto } from '$app/navigation';
</script>

<div class="empty-card" on:click={() => goto('/upload')} style="cursor: pointer;">
    <img src="/addrecipe.png" alt="Upload Icon" class="card-image" />
    <h3>No Recipes Yet</h3>
    <p>Start by uploading your first recipe!</p>
</div>
