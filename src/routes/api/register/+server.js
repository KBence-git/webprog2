import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
    const { username, email, password } = await request.json();
    const filePath = path.resolve('src/data/users.json');

    try {
        let users = [];

        try {
            const data = await fs.readFile(filePath, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            // Ha nincs fájl, az nem gond
        }

        if (users.find(user => user.username === username)) {
            return new Response(JSON.stringify({ message: 'Username already used.' }), { status: 400 });
        }

        if (users.find(user => user.email === email)) {
            return new Response(JSON.stringify({ message: 'Username already used,' }), { status: 400 });
        }

        users.push({ username, email, password });

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        return new Response(JSON.stringify({ message: 'Successful registration' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Registration Error.' }), { status: 500 });
    }
}
