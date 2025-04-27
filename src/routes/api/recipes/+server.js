import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
    const { title, ingredients, description, username } = await request.json();
    const filePath = path.resolve('src/data/recipes.json');

    try {
        let recipes = [];

        try {
            const data = await fs.readFile(filePath, 'utf-8');
            recipes = JSON.parse(data);
        } catch (error) {
            // nincs fájl, majd létrehozzuk
        }

        const newRecipe = {
            id: Date.now(),
            title,
            ingredients,
            description,
            username
        };

        recipes.push(newRecipe);

        await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

        return new Response(JSON.stringify({ message: 'Recept sikeresen elmentve!' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Hiba történt a recept mentése közben.' }), { status: 500 });
    }
}

export async function GET() {
    const filePath = path.resolve('src/data/recipes.json');

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const recipes = JSON.parse(data);
        return new Response(JSON.stringify(recipes), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify([]), { status: 500 });
    }
}
