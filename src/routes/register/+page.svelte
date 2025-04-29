<script>
    import AuthForm from '../../components/AuthForm.svelte';
    import '../../styles/auth.scss';

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

    const fields = [
        {
            type: 'text',
            placeholder: 'Username',
            value: username,
            onInput: val => username = val
        },
        {
            type: 'email',
            placeholder: 'Email',
            value: email,
            onInput: val => email = val
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
        title="Registration"
        {fields}
        onSubmit={register}
        {message}
        promptText="You already have an Account?"
        promptLink="/login"
        promptLinkText="Log In!"
/>