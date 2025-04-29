import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
    const { identifier, password } = await request.json();
    const USERS_FILE = path.resolve('src', 'data', 'users.json');

    let users = [];

    if (fs.existsSync(USERS_FILE)) {
        users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    }

    const user = users.find(u => u.username === identifier || u.email === identifier);

    if (!user) {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: 'Login successful', username: user.username }), { status: 200 });
}
