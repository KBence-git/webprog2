<script>
    export let title;
    export let fields = [];
    export let onSubmit;
    export let message = '';
    export let promptText;
    export let promptLink;
    export let promptLinkText;
</script>

<form on:submit|preventDefault={onSubmit} class="auth-form">
    <h2>{title}</h2>

    {#each fields as field}
        <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                on:input={(e) => field.onInput(e.target.value)}
                required
        />
    {/each}

    <button type="submit">{title}</button>

    {#if message}
        <p>{message}</p>
    {/if}

    <p class="option-prompt">{promptText} <a href={promptLink}>{promptLinkText}</a></p>
</form>
