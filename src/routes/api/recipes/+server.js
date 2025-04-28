import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';

const filePath = path.resolve('src/data/recipes.json');

export async function POST({ request }) {
    const { title, ingredients, description, username } = await request.json();

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
            username,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm')
        };


        recipes.push(newRecipe);

        await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

        return new Response(JSON.stringify({ message: 'Recipe Succesfully Saved!' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Recipe Save Failure.' }), { status: 500 });
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

export async function DELETE({ request }) {
    const { id } = await request.json();

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        let recipes = JSON.parse(data);

        recipes = recipes.filter(recipe => recipe.id !== id);

        await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

        return new Response(JSON.stringify({ message: 'Recipe deleted successfully.' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error deleting recipe.' }), { status: 500 });
    }
}
