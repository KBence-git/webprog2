import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const USERS_FILE = path.resolve('src', 'data', 'users.json');

export async function POST({ request }) {
    const { identifier, password } = await request.json();

    let users = [];

    if (existsSync(USERS_FILE)) {
        users = JSON.parse(readFileSync(USERS_FILE, 'utf-8'));
    }

    const user = users.find(u => u.username === identifier || u.email === identifier);

    if (!user) {
        return json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return json({ message: 'Login successful', username: user.username }, { status: 200 });
}
