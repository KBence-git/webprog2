const APP_ID = '4a14b946';
const APP_KEY = 'b94aa901150dd3361a2e4275eb871807';
// Ha túl lenne lépve a felhasználási limit akkor src\lib\API.txt-ben vannak új kulcsok

export async function getNutrition(ingredients) {
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`;

    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalories = 0;

    for (const ing of ingredients) {
        if (!ing.amount || !ing.unit || !ing.name) continue;

        const ingredientLine = `${ing.amount} ${ing.unit.toLowerCase()} ${ing.name}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Ingredient', ingr: [ingredientLine] })
            });

            if (!response.ok) {
                console.error(`Nutrition API error at: ${ingredientLine}`, await response.text());
                continue;
            }

            const data = await response.json();
            const nutrients = data.ingredients?.[0]?.parsed?.[0]?.nutrients || {};

            totalProtein += nutrients.PROCNT?.quantity || 0;
            totalCarbs += nutrients.CHOCDF?.quantity || 0;
            totalFat += nutrients.FAT?.quantity || 0;
            totalCalories += nutrients.ENERC_KCAL?.quantity || 0;

        } catch (error) {
            console.error(`Nutrition API error at: ${ingredientLine}`, error);
        }
    }

    return {
        protein: totalProtein.toFixed(1),
        carbs: totalCarbs.toFixed(1),
        fat: totalFat.toFixed(1),
        calories: totalCalories.toFixed(0)
    };
}

