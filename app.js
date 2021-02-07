const searchForm = document.querySelector('.search_form')
const meals = document.querySelector('.meals')
const result = document.querySelector('.result')
const errorShow = document.querySelector('.error')


// Meals API area
const getMeals = async (formValue) => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php' + formValue)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                result.classList.remove('hidden');
                errorShow.classList.add('hidden');
                data.meals.forEach(meal => {
                    updateData(meal);
                })
            } else {
                result.classList.add('hidden');
                errorShow.classList.remove('hidden');
            }
        })
}

//Data idMeal and html tag area
const updateData = data => {
    let id = data.idMeal
    let htmlTag = `
        <div class="card my-4" data-meal-id="${data.idMeal}" data-bs-toggle="modal" data-bs-target="#exampleModal${id}">
            <img src="${data.strMealThumb}" class="card-img-top" alt="${data.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${data.strMeal}</h5>
                <p class="card-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae minima incidunt laborum provident esse, veritatis dolores distinctio recusandae ipsum sit doloremque molestiae.</p>
            </div>
         </div>

         <div class="modal fade" id="exampleModal${id}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Meal Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" id="meals-details">
                    <img class="img-fluid rounded mb-4" src="${data.strMealThumb}" alt="">
                    <h4>${data.strMeal}</h4>
                    <h5 class="pt-3 pb-2">Ingredients</h5>
                    <ul class="list-unstyled ingredients mb-0">
                        <li>${data.strIngredient1} = ${data.strMeasure1}</li>
                        <li>${data.strIngredient2} = ${data.strMeasure2}</li>
                        <li>${data.strIngredient3} = ${data.strMeasure3}</li>
                        <li>${data.strIngredient4} = ${data.strMeasure4}</li>
                        <li>${data.strIngredient5} = ${data.strMeasure5}</li>
                        <li>${data.strIngredient6} = ${data.strMeasure6}</li>
                    </ul>
                    <h2 class="text-center mt-4">Detailed Instructions</h2>
                    <p class="text-center lead my-4">${data.strInstructions}</p>
                </div>
            </div>
        </div>
    </div>
`
    meals.insertAdjacentHTML('beforeend', htmlTag);
}

//Event Listener area
searchForm.addEventListener('submit', async e => {
    if (searchForm.input.value) {
        e.preventDefault();
        const formValue = `?s=${searchForm.input.value.trim()}`;
        getMeals(formValue);
        meals.innerHTML = '';
        searchForm.input.value = '';
        searchForm.input.focus();
    } else {
        e.preventDefault();
    }
})
