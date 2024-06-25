// document.addEventListener('DOMContentLoaded', () => {

//     let form = document.getElementById('recipe-form');
//     let nameInput = document.getElementById('name');
//     let ingredientInput = document.getElementById('ingredients');
//     let images = document.getElementById('image');
//     let step = document.getElementById('steps');
//     let recipeList = document.getElementById('recipe-list');

//     form.addEventListener('submit', addRecipe);
//     recipeList.addEventListener('click', deleteRecipe);
//     recipeList.addEventListener('click', editRecipe);

//     dispayRecipes();

//     function addRecipe(event) {
//         event.preventDefault();
//         let name = nameInput.value;
//         let ingredients = ingredientInput.value;
//         let image = images.value;
//         let steps = step.value;
        
//         let recipe = {name, ingredients, image, steps};
//         let recipes = JSON.parse(localStorage.getItem('recipes')) ?? [];   //get Recipe

//         recipes.push(recipe);
//         localStorage.setItem('recipes', JSON.stringify('recipes')); //save Recipe

//         dispayRecipes();
//         form.reset();
//     }

//     function deleteRecipe(e) {
//         if (e.target.tagName === 'BUTTON') {
//             // Get the index of the recipe to be deleted from the button's data attribute
//             const index = e.target.dataset.index;

//             // Retrieve existing recipes from Local Storage
//             const recipes = getRecipes();

//             // Remove the recipe from the array
//             recipes.splice(index, 1);

//             // Save the updated recipes array to Local Storage
//             localStorage.setItem('recipes', JSON.stringify('recipes')); //save Recipe

//             // Refresh the displayed recipes
//             displayRecipes();
//         }
//     }

//     function dispayRecipes(){
//         let recipes = JSON.parse(localStorage.getItem('recipes')) ?? [];   //get Recipe
//          recipeList.innerHTML = '';
//         recipes.forEach((recipe, index) => {
//             let recipe1 = document.createElement('div');
//             recipel.classList.add('recipe');
//             recipe1.innerHTML = `<img src = "${recipe.image} alt="${recipe.title}">
//             <h3>${recipe.title}</h3>
//             <p>${recipe.ingredients}</p>
//             <p>${recipe.steps}</p>
//             <button data-index="${index}">Delete</button>
//             <button data-index="${index}">Edit</button>`;
//             recipeList.appendChild(recipel);           
//         });
//     }
// });



document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('recipe-form');
    let nameInput = document.getElementById('name');
    let ingredientInput = document.getElementById('ingredients');
    let images = document.getElementById('image');
    let step = document.getElementById('steps');
    let recipeList = document.getElementById('recipe-list');
    let isEditing = false;
    let editIndex = -1;

    form.addEventListener('submit', addRecipe);
    recipeList.addEventListener('click', handleRecipeActions);

    displayRecipes();

    function addRecipe(event) {
        event.preventDefault();
        let name = nameInput.value;
        let ingredients = ingredientInput.value;
        let image = images.value;
        let steps = step.value;

        let recipe = { name, ingredients, image, steps };
        let recipes = JSON.parse(localStorage.getItem('recipes')) || []; // get Recipe

        if (isEditing) {
            recipes[editIndex] = recipe;
            isEditing = false;
            editIndex = -1;
        } else {
            recipes.push(recipe);
        }

        localStorage.setItem('recipes', JSON.stringify(recipes)); // save Recipe
        displayRecipes();
        form.reset();
    }

    function handleRecipeActions(e) {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;

            if (e.target.textContent === 'Delete') {
                deleteRecipe(index);
            } else if (e.target.textContent === 'Edit') {
                editRecipe(index);
            }
        }
    }

    function deleteRecipe(index) {
        const recipes = getRecipes();
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes)); // save Recipe
        displayRecipes();
    }

    function editRecipe(index) {
        const recipes = getRecipes();
        const recipe = recipes[index];

        nameInput.value = recipe.name;
        ingredientInput.value = recipe.ingredients;
        images.value = recipe.image;
        step.value = recipe.steps;

        isEditing = true;
        editIndex = index;
    }

    function getRecipes() {
        return JSON.parse(localStorage.getItem('recipes')) || [];
    }

    function displayRecipes() {
        let recipes = getRecipes();
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            let recipeEl = document.createElement('div');
            recipeEl.classList.add('recipe');
            recipeEl.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
                <button data-index="${index}">Delete</button>
                <button data-index="${index}">Edit</button>`;
            recipeList.appendChild(recipeEl);
        });
    }
});
