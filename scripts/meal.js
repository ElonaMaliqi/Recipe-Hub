const apiKey = '98d8daa52e9e4ceb8bd8097f23f88a2f';
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=36`;

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const categoryTitle = document.getElementById('category-title');
    categoryTitle.textContent = category ? category + ' Recipes' : 'Meals';

    if (category) {
        fetchCategoryMeals(category);
    }

    const cuisineLinks = document.querySelectorAll('.aside a');
    cuisineLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const cuisine = this.textContent.trim();


            fetchCategoryMeals(category, cuisine);
        });
    });
});

async function fetchCategoryMeals(category, cuisine) {
    try {
        const response = await fetch(`${apiUrl}&query=${encodeURIComponent(category)}&cuisine=${encodeURIComponent(cuisine)}`);
        const data = await response.json();
        displayData(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(meals) {
    const mealSection = document.querySelector('.meal-card-container');
    mealSection.innerHTML = '';

    if (meals.length === 0) {
        mealSection.innerHTML = '<p>No recipes found for this category.</p>';
        return;
    }

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('card');

        const dishType = meal.dishTypes.length > 0 ? meal.dishTypes[0] : 'Unknown';

        mealCard.innerHTML = `
            <img src="${meal.image}" alt="${meal.title}">
            <div class="card-content">
                <h3 class="meal-name">${meal.title}</h3>
                <a href="${meal.sourceUrl}" class="btn read-more" target="_blank">Read More</a>
                <p class="cuisine-name">${dishType}</p>
            </div>
        `;

        mealSection.appendChild(mealCard);
    });
}


