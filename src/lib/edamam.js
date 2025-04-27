const APP_ID = 'f3b1a10b';
const APP_KEY = '7d69cb38a64a37f2ffe5255fc82c472b';

export async function searchIngredients(query) {
    if (!query) return [];

    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
        const response = await fetch(url);

    // A találatokból csak az élelmiszer neveket szedjük ki
        if (!response.ok) {
            console.error('Edamam API call error', await response.text());
            return [];
        }

        const data = await response.json();

        if (data.hints) {
            return data.hints.map(hint => ({
                label: hint.food.label,
                measures: hint.measures || []
            }));
        }

        return [];
    } catch (error) {
        console.error('Edamam API error:', error);
        return [];
    }
}
