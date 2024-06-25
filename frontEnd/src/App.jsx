import { useState } from 'react'
import './App.css'
import RecipeList from './components/recipeList/RecipeList.jsx'
import NavBar from './components/navbar/Navbar.jsx'
import LeftBar from './components/leftBar/LeftBar.jsx'

function App() {
  const [name, setName] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('3')
  const [dietFilter, setDietFilter] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('')

  return (
    <div className='app'>
      <NavBar />
      <div className='pageBody'>
        <LeftBar
          name={name}
          setName={setName}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          dietFilter={dietFilter}
          setDietFilter={setDietFilter}
          setCuisineFilter={setCuisineFilter}
        />
        <RecipeList className='recipeListComponent'
          recipeName={name}
          recipeDifficulty={difficultyFilter}
          recipeDiet={dietFilter}
          recipeCuisine={cuisineFilter}
        />
      </div>
    </div>
  )
}

export default App
