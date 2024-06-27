import { useEffect, useState } from "react";
import RecipeCard from "../recipeCard/RecipeCard.jsx";
import './RecipeList.css'
import { getRecipes, getComments, getDifficulties, getDiets, getCuisines } from '../../utils/apiCalls.jsx';

export default function RecipeList({ recipeName, recipeDifficulty, recipeDiet, recipeCuisine, recipeRating }) {
    const [recipe, setRecipe] = useState([]);
    const [comment, setComment] = useState([])
    const [difficulty, setDifficulty] = useState([])
    const [diet, setDiet] = useState([])
    const [cuisine, setCuisine] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const recipesPerPage = 5;

    useEffect(() => {
        setLoading(true);
        Promise.all([getRecipes(), getComments(), getDifficulties(), getDiets(), getCuisines()])
            .then(([recipe, comment, difficultie, diet, cuisine]) => {
                setRecipe(recipe);
                setComment(comment);
                setDifficulty(difficultie);
                setDiet(diet);
                setCuisine(cuisine);
                setFilteredRecipes(recipe)
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);


    useEffect(() => {
        const filtered = recipe.filter(recipe => {
            const matchesName = recipe.name.toLowerCase().includes(recipeName.toLowerCase());
            const matchesDifficulty = recipe.difficultyId <= recipeDifficulty;
            const matchesDiet = recipeDiet === '' || recipe.dietId === recipeDiet;
            const matchesCuisine = recipeCuisine === '' || recipe.cuisineId === recipeCuisine;
            const matchesRating = !getRating(recipe.id) || getRating(recipe.id) >= recipeRating;
            return matchesName && matchesDifficulty && matchesDiet && matchesCuisine && matchesRating;
        });

        setFilteredRecipes(filtered);
    }, [recipeName, recipeDifficulty, recipeDiet, recipeCuisine, recipeRating, recipe]);

    function getCurrentRecipe(recipeId) {
        return recipe.find(recipe => recipe.id === recipeId)

    }

    function getRecipeComments(recipeId) {
        return comment.filter(comment => comment.recipeId === recipeId);
    }

    function getRating(recipeId) {
        const recipeComments = getRecipeComments(recipeId)

        if (recipeComments.length === 0) return null;

        const totalRating = recipeComments.reduce((acc, comment) => acc + comment.rating, 0);
        return (totalRating / recipeComments.length).toFixed(1);
    }

    function getDifficulty(recipeId) {
        const currentRecipe = getCurrentRecipe(recipeId)
        const recipeDifficulty = difficulty.find(difficulty => difficulty.id === currentRecipe.difficultyId);
        return recipeDifficulty.name
    }

    function getDiet(recipeId) {
        const currentRecipe = getCurrentRecipe(recipeId)
        const recipeDiet = diet.find(diet => diet.id === currentRecipe.dietId);
        return recipeDiet.name
    }

    function getCuisine(recipeId) {
        const currentRecipe = getCurrentRecipe(recipeId)
        const recipeCuisine = cuisine.find(cuisine => cuisine.id === currentRecipe.cuisineId);
        return recipeCuisine.name
    }

    function handleRating(recipeId) {
        if (!getRating(recipeId)) {
            return '2.5'
        } else {
            return getRating(recipeId)
        }
    }
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (loading) {
        return <div className="userMessage"><h2>Loading...</h2></div>;
    }

    if (error) {
        return <div className="userMessage"><h2>Error: {error}</h2 ></div >;
    }

    return (
        <div className="recipeList">

            {currentRecipes.length > 0 ? (
                currentRecipes.map((dish) => (
                    <RecipeCard
                        key={dish.id}
                        dishName={dish.name}
                        dishImg={dish.image}
                        dishRating={handleRating(dish.id)}
                        dishReviews={getRecipeComments(dish.id).length}
                        dishDifficulty={getDifficulty(dish.id)}
                        dishDiet={getDiet(dish.id)}
                        dishCuisine={getCuisine(dish.id)}
                        dishIngredients={dish.ingredients}
                    />
                ))
            ) : (
                <div className="userMessage"><h2>No recipes with the current filters</h2 ></div >
            )}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={(index + 1 === currentPage ? 'active' : '') + "redButton"}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}