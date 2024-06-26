import { useEffect, useState } from "react";
import SelectOption from './SelectOption'
import './leftBar.css'
import { getDifficulties, getDiets, getCuisines } from '../../utils/apiCalls.jsx'
import Slider from './Slider.jsx'

export default function LeftBar({ name, setName, difficultyFilter, setDifficultyFilter, setDietFilter, setCuisineFilter, setRatingFilter }) {
    const [difficulty, setDifficulty] = useState([])
    const [diet, setDiet] = useState([])
    const [cuisine, setCuisine] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [ratingSelection, setRatingSelection] = useState(1.1);
    const [difficultySelection, setDifficultySelection] = useState(3);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [localName, setlocalName] = useState(name);
    const [dietSelection, setDietSelection] = useState('')
    const [cuisineSelection, setCuisineSelection] = useState('')

    useEffect(() => {
        setLoading(true);
        Promise.all([getDifficulties(), getDiets(), getCuisines()])
            .then(([difficulty, diet, cuisine]) => {
                setDifficulty(difficulty);
                setDiet(diet);
                setCuisine(cuisine);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    function getDifficultyName(difficultyId) {
        if (!difficulty || difficulty.length === 0) {
            console.log('Data not loaded yet');
            return null;
        }


        const recipeDifficulty = difficulty.find(difficulty => difficulty.id === difficultyId.toString());
        if (!recipeDifficulty) {
            console.log('Difficulty not found:', difficultyId);
            return null;
        }

        return recipeDifficulty.name;
    }

    function getDifficultyImg(difficultyId) {
        if (!difficulty || difficulty.length === 0) {
            console.log('Data not loaded yet');
            return null;
        }
        if (difficultyId === 1) {
            return './Easy.svg'
        } else if (difficultyId === 2) {
            return './Medium.svg'
        } else {
            return './Hard.svg'
        }

    }



    const handleRatingChange = (value) => {
        setRatingSelection(value);
    };

    const handleDifficultyChange = (value) => {
        setDifficultySelection(value)
    };

    const handleDietaryChange = (e) => {
        setDietSelection(e.target.value);
    };

    const handleCuisineChange = (e) => {
        setCuisineSelection(e.target.value);
    };

    const handleSubmit = (e) => {

        e.preventDefault()
        setName(localName)
        setDifficultyFilter(difficultySelection)
        setDietFilter(dietSelection)
        setCuisineFilter(cuisineSelection)
        setRatingFilter(ratingSelection)
    }

    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };

    if (loading) {
        return <div className="userMessage"><h2>Loading...</h2></div>;
    }

    if (error) {
        return <div><h2>Error: {error}</h2 ></div >;
    }

    return (
        <div className={`leftBar ${isSidebarHidden ? 'hidden' : ''}`}>
            <div className="toggleArrow" onClick={toggleSidebar}>
                <img src='./left-arrow.svg' alt='Toggle Arrow' className={`logoImg ${isSidebarHidden ? 'rotate' : ''}`} />
            </div>
            <form className="filtersForm" onSubmit={handleSubmit}>
                <h2>Discover recipes</h2>
                <div className="discoverForm">
                    <label>
                        <p className='formLabel'>Search by name:</p>
                        <input
                            type="text"
                            name="nome"
                            placeholder='Pizza'
                            className='input'
                            onChange={e => setlocalName(e.target.value)} />
                    </label>
                    <label>
                        <p className='formLabel'>Select cuisine:</p>
                        <select className='input' onChange={handleCuisineChange}>
                            <option value='' className='input' >Select a cuisine</option>
                            {cuisine.map((cuisine, i) => (
                                <SelectOption
                                    key={i}
                                    label={cuisine.name}
                                    value={cuisine.id}
                                />
                            ))}
                        </select>
                    </label>
                    <label className='input'>
                        <p className='formLabel'>Select dietary:</p>
                        <select className='input' onChange={handleDietaryChange}>
                            <option value='' className='input'>Select a diet</option>
                            {diet.map((diet, i) => (
                                <SelectOption
                                    key={i}
                                    label={diet.name}
                                    value={diet.id}
                                />
                            ))}
                        </select>
                    </label>
                </div>
                <div className="difficultyFilters">
                    <div className='showDifficulty'>
                        <h2>Difficulty: {getDifficultyName(difficultySelection)}</h2>
                        <img src={getDifficultyImg(difficultySelection)} className="difficultyImg"></img>
                    </div>
                    <div className="selectDifficulty">
                        <Slider
                            sliderValue={difficultyFilter}
                            onSliderChange={handleDifficultyChange}
                            min="1"
                            max="3"
                            step="1"
                        />
                    </div>
                </div>
                <div className="userReviewsFilters">
                    <h2>Rating &gt; {(ratingSelection - 0.1).toFixed(1)}</h2>
                    <div className="selectReviews">
                        <Slider
                            sliderValue={ratingSelection}
                            onSliderChange={handleRatingChange}
                            min="1.0"
                            max="5.0"
                            step="0.1"
                        />
                    </div>
                    <div className="submitFiltersSection">
                        <input type="submit" value="Submit" className='button redButton submitButton input' />
                    </div>
                </div>
            </form>
        </div>
    )
}
