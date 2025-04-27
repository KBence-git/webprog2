<script>
    import '../../styles/auth.scss';
    import { goto } from '$app/navigation';
    import { user } from '../../stores/user.js';

    let identifier = '';
    let password = '';
    let message = '';

    async function login() {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        const result = await response.json();
        message = result.message;

        if (response.ok) {
            user.set(result.username);
            goto('/');
        }
    }
</script>

<form on:submit|preventDefault={login} class="auth-form">
    <h2>Bejelentkezés</h2>
    <input type="text" placeholder="Email/Username" bind:value={identifier} required />
    <input type="password" placeholder="Password" bind:value={password} required />
    <button type="submit">Login</button>

    {#if message}
        <p>{message}</p>
    {/if}

    <p class="option-prompt">You don't have an account yet? <a href="/register">Register One!</a></p>
</form>
