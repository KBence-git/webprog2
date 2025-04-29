# Webprogramozás 2 projekt
## Projekt célja:
### A "Recipe Garden" projekt célja egy egyszerűen kezelhető, modern és átlátható receptmegosztó webalkalmazás létrehozása, ahol a felhasználók regisztráció után saját receptjeiket feltölthetik, megoszthatják másokkal, illetve böngészhetnek a többi felhasználó által közzétett receptek között.
## Projekt megvalósítások:
#### - Oldalra történő regisztráció és bejentkezés
#### - Receptek feltöltése
#### - Receptek böngészése és kezelése
#### - Összetevők automatikus keresése
#### - Tápérték számítása
## Adatbázis szerkezete:
### Adattárolás json fájlokban:
#### A felhasználók adatai a users.json fájlban találhatóak meg, továbbá a receptek a recipes.json fájlban tárolódnak.
## API végpontok:
## Saját API végpontok:
### POST - /api/login - Felhasználó bejelentkeztetése (users.json alapján).
### POST - /api/recipes - Új recept feltöltése (recipes.json-hez hozzáadása).
### GET - /api/recipes - Összes recept lekérése (recipes.json-ből).
### DELETE - /api/recipes - Egy adott recept törlése ID alapján (recipes.json-ből).
## Külső API végpontok:
### GET - Edamam Food API - Összetevők keresése név alapján (pl. "Apple", "Chicken").
### POST - Edamam Nutrition API - Összesített tápanyag érték számítása (fehérje, szénhidrát, zsír, kalória).
