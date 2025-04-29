import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const USERS_FILE = path.resolve('src', 'data', 'users.json');

export async function POST({ request }) {
    const { username, password, email } = await request.json();

    let users = [];

    if (existsSync(USERS_FILE)) {
        users = JSON.parse(readFileSync(USERS_FILE, 'utf-8'));
    }

    if (users.find(user => user.username === username)) {
        return json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, email, password: hashedPassword });
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    return json({ message: 'Registration successful' });
}
