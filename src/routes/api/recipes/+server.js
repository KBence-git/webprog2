import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';

const filePath = path.resolve('src/data/recipes.json');

const uploadsDir = path.resolve('static/uploads');

export async function POST({ request }) {
    const { title, ingredients, description, username, image } = await request.json();

    try {
        let recipes = [];

        try {
            const data = await fs.readFile(filePath, 'utf-8');
            recipes = JSON.parse(data);
        } catch (error) {
            // nincs fájl, majd létrehozzuk
        } catch {}

        // Mentés fájlba, ha van base64-es kép
        let imagePath = '';
        if (image) {
            const base64Data = image.split(',')[1];
            const extMatch = image.match(/^data:image\/(png|jpeg|jpg);base64,/);
            const ext = extMatch ? extMatch[1] : 'png';
            const fileName = `recipe_${Date.now()}.${ext}`;
            const fullPath = path.join(uploadsDir, fileName);
            await fs.writeFile(fullPath, base64Data, 'base64');
            imagePath = `/uploads/${fileName}`;
        }

        const newRecipe = {
            id: Date.now(),
            title,
            ingredients,
            description,
            username,
            image: imagePath,
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
