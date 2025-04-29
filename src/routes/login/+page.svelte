<script>
    import AuthForm from '../../components/AuthForm.svelte';
    import '../../styles/auth.scss'
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

    const fields = [
        {
            type: 'text',
            placeholder: 'Email/Username',
            value: identifier,
            onInput: val => identifier = val
        },
        {
            type: 'password',
            placeholder: 'Password',
            value: password,
            onInput: val => password = val
        }
    ];
</script>

<AuthForm
        title="Login"
        {fields}
        onSubmit={login}
        {message}
        promptText="You don't have an account yet?"
        promptLink="/register"
        promptLinkText="Register One!"
/>
