const APP_ID = 'f3b1a10b';
const APP_KEY = '7d69cb38a64a37f2ffe5255fc82c472b';

export async function searchIngredients(query) {
    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // A találatokból csak az élelmiszer neveket szedjük ki
    if (data.hints) {
        return data.hints.map(hint => hint.food.label);
    }

    return [];
}
