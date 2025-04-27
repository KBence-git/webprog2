import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
    const { identifier, password } = await request.json();
    const filePath = path.resolve('src/data/users.json');

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);

        const user = users.find(
            user =>
                (user.username === identifier || user.email === identifier) &&
                user.password === password
        );

        if (user) {
            return new Response(JSON.stringify({ message: 'SuccessFull Login!', username: user.username }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Wrong Credentials!' }), { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server Error.' }), { status: 500 });
    }
}
