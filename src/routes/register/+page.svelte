<script>
    let username = '';
    let email = '';
    let password = '';
    let message = '';

    async function register() {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();
        message = result.message;
    }
</script>

<form on:submit|preventDefault={register} class="auth-form">
    <h2>Regisztráció</h2>
    <input type="text" placeholder="Username" bind:value={username} required />
    <input type="email" placeholder="Email" bind:value={email} required />
    <input type="password" placeholder="Password" bind:value={password} required />
    <button type="submit">Registration</button>
    {#if message}
        <p>{message}</p>
    {/if}
    <p class="option-prompt">You already have an Account? <a href="/login">Log In!</a></p>
</form>
