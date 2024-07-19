const apiKey = '98d8daa52e9e4ceb8bd8097f23f88a2f';
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true`;




async function fetchData(query) {
    try {
        const response = await fetch(`${apiUrl}&query=${query}`);
        const data = await response.json();
        displayData(data.results);

        setTimeout(() => {
            const mealCardContainer = document.querySelector('.meal-card-container');
            mealCardContainer.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(meals) {
    const mealSection = document.querySelector('.meal-card-container');
    mealSection.innerHTML = '';

    meals.slice(0, 4).forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('card');

        const dishType = meal.dishTypes.length > 0 ? meal.dishTypes[0] : '';

        mealCard.innerHTML = `
            <img src="${meal.image}" alt="${meal.title}">
            <div class="card-content">
                <h3 class="meal-name">${meal.title}</h3>
                <a  href="${meal.sourceUrl}" class="btn read-more" target = _blank>Read More</a>
                <p class="cuisine-name">${dishType}</p>
            </div>
        `;

        mealSection.appendChild(mealCard);
    });

}

document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', function () {
        const category = this.querySelector('.category-type').textContent.trim();
        window.location.href = `meal.html?category=${encodeURIComponent(category)}`;
    });
});



document.getElementById('burgerMenu').addEventListener('click', function () {
    var navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        var navLinks = document.getElementById('navLinks');
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
});

document.querySelector('.search-button').addEventListener('click', function () {
    const query = document.querySelector('.recipe-search-box').value;
    fetchData(query);
});


document.querySelector('.recipe-search-box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = document.querySelector('.recipe-search-box').value;
        fetchData(query);
    }
});



