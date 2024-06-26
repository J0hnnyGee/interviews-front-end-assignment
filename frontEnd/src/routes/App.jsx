import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import '../App.css'
import RecipeList from '../components/recipeList/RecipeList.jsx'
import NavBar from '../components/navbar/Navbar.jsx'
import LeftBar from '../components/leftBar/LeftBar.jsx'
import AddRecipe from './AddRecipe.jsx'

function App() {
  const [name, setName] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('3')
  const [dietFilter, setDietFilter] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState(1.0)

  return (
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <div className='pageBody'>


            <LeftBar
              name={name}
              setName={setName}
              difficultyFilter={difficultyFilter}
              setDifficultyFilter={setDifficultyFilter}
              setDietFilter={setDietFilter}
              setCuisineFilter={setCuisineFilter}
              setRatingFilter={setRatingFilter}
            />
            <RecipeList className='recipeListComponent'
              recipeName={name}
              recipeDifficulty={difficultyFilter}
              recipeDiet={dietFilter}
              recipeCuisine={cuisineFilter}
              recipeRating={ratingFilter}
            />
          </div>

        } />
        <Route path="/addRecipe" element={<AddRecipe />} />
      </Routes>
    </div>
  )
}

export default App
