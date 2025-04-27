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
    <input type="text" placeholder="Email vagy Felhasználónév" bind:value={identifier} required />
    <input type="password" placeholder="Jelszó" bind:value={password} required />
    <button type="submit">Bejelentkezés</button>

    {#if message}
        <p>{message}</p>
    {/if}

    <p class="option-prompt">Még nincs fiókod? <a href="/register">Regisztrálj egyet!</a></p>
</form>
