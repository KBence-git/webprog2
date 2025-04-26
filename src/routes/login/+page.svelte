<script>
    import '../../styles/login.scss';
    import { goto } from '$app/navigation';
    import { user } from '../../stores/user.js'; // Új store a login állapothoz

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
            user.set(result.username); // Beállítjuk a felhasználónevet a store-ba
            goto('/'); // Főoldalra visszairányítunk
        }
    }
</script>

<form on:submit|preventDefault={login} class="login-form">
    <h2>Bejelentkezés</h2>
    <input type="text" placeholder="Email vagy Felhasználónév" bind:value={identifier} required />
    <input type="password" placeholder="Jelszó" bind:value={password} required />
    <button type="submit">Bejelentkezés</button>
    {#if message}
        <p>{message}</p>
    {/if}
</form>
