import "./AddRecipePage.css"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SelectOption from '../leftBar/SelectOption'
import Slider from '../leftBar/Slider.jsx'

import { getDifficulties, getDiets, getCuisines, getRecipes } from '../../utils/apiCalls.jsx'

export default function AddRecipePage() {
    const [localName, setlocalName] = useState('');
    const [cuisine, setCuisine] = useState([]);
    const [cuisineSelection, setCuisineSelection] = useState('');
    const [diet, setDiet] = useState([]);
    const [dietSelection, setDietSelection] = useState('');
    const [difficulty, setDifficulty] = useState([]);
    const [difficultySelection, setDifficultySelection] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const [inputIngredient, setInputIngredient] = useState('');
    const [inputInstructions, setInputInstructions] = useState('');

    const [selectedImage, setSelectedImage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleCuisineChange = (e) => {
        setCuisineSelection(e.target.value);
    };

    const handleDietaryChange = (e) => {
        setDietSelection(e.target.value);
    };

    const handleDifficultyChange = (value) => {
        setDifficultySelection(value);
    };

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

    function handleIngredientChange(e) {
        setInputIngredient(e.target.value);
    }

    function handleIngredientSubmit(e) {
        e.preventDefault();
        if (inputIngredient) {
            setIngredients([inputIngredient, ...ingredients]);
            setInputIngredient('');
        }
    }

    const handleIngredientDelete = (e, index) => {
        e.preventDefault();

        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleExcess = () => {
        const hiddenIngredients = ingredients.length - 4;
        if (ingredients.length === 5) {
            return <p>...Other {hiddenIngredients + ' ingredient'}</p>
        } else if (ingredients.length > 5) {
            return <p>...Other {hiddenIngredients + ' ingredients'}</p>


        };
    }

    const handleRecipeSubmit = (e) => {
        e.preventDefault();

        if (!localName || !cuisineSelection || !dietSelection || !difficultySelection || ingredients.length === 0 || !inputInstructions || !selectedImage) {
            toast.error("Please fill in all the fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", localName);
        formData.append("ingredients", ingredients.join(","));
        formData.append("instructions", inputInstructions);
        formData.append("cuisineId", cuisineSelection);
        formData.append("dietId", dietSelection);
        formData.append("difficultyId", difficultySelection);
        formData.append("image", selectedImage);


        axios
            .post("http://localhost:8080/recipes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.status, response.data.message);
                toast.success("Recipe added successfully!");
                setlocalName("");
                setCuisineSelection("");
                setDietSelection("");
                setDifficultySelection(1);
                setIngredients([]);
                setInputInstructions("");
                setSelectedImage(null);
            })
            .catch((error) => {
                console.error("There was an error creating the recipe!", error);
                toast.error("Error creating the recipe!");
            });
    };

    if (loading) {
        return <div className="userMessage userMessageAddRecipe"><h2>Loading...</h2></div>;
    }

    if (error) {
        return <div className="userMessage userMessageAddRecipe"><h2>Error: {error}</h2 ></div >;
    }

    const currentIngredients = ingredients.slice(0, 4);
    return (
        <div className='addRecipePage'>
            <ToastContainer />
            <div className='card addRecipeCard'>
                <div className='addRecipeCardContent'>
                    <form className="addRecipeForm" onSubmit={handleRecipeSubmit}>
                        <div className="cardHalfContent addRecipeCardLeft">
                            <h2>Add a new recipe</h2>
                            <label className="addLabel">
                                <p className='formLabel'>Recipe name:</p>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder='Pizza'
                                    className='input'
                                    onChange={e => setlocalName(e.target.value)} />
                            </label>
                            <label className="addLabel">
                                <p className='formLabel'>Select cuisine:</p>
                                <select className='input' onChange={handleCuisineChange}>
                                    <option value=''>Select a cuisine</option>
                                    {cuisine.map((cuisine, i) => (
                                        <SelectOption
                                            key={i}
                                            label={cuisine.name}
                                            value={cuisine.id}
                                        />
                                    ))}
                                </select>
                            </label>
                            <label className="addLabel">
                                <p className='formLabel'>Select dietary:</p>
                                <select className='input' onChange={handleDietaryChange}>
                                    <option value=''>Select a diet</option>
                                    {diet.map((diet, i) => (
                                        <SelectOption
                                            key={i}
                                            label={diet.name}
                                            value={diet.id}
                                        />
                                    ))}
                                </select>
                            </label>
                            <div className="addIngredients">
                                <p className='formLabel'>Add Ingredients</p>
                                <input type='text' value={inputIngredient} onChange={handleIngredientChange} className="input" />
                                <button onClick={handleIngredientSubmit} className="button redButton">Add Ingredient</button>
                                <ul className="ingrediensList">
                                    {currentIngredients.map((ingredient, i) => (
                                        <li key={i} className="ingredientAdded">
                                            <button className="buttonIngredient" onClick={(e) => handleIngredientDelete(e, i)}> {ingredient} <button className="buttonDelete">x</button></button>
                                        </li>
                                    ))}
                                    {handleExcess()}
                                </ul>
                            </div>

                        </div>
                        {/*Left Side End*/}
                        <div className="cardHalfContent addRecipeCardRight">
                            <div className="difficultyFilters">
                                <div className='showDifficulty'>
                                    <p className='formLabel'>Difficulty: {getDifficultyName(difficultySelection)}</p>
                                    <img src={getDifficultyImg(difficultySelection)} className="difficultyImg"></img>
                                </div>
                                <div className="selectDifficulty">
                                    <Slider
                                        sliderValue={difficultySelection}
                                        onSliderChange={handleDifficultyChange}
                                        min="1"
                                        max="3"
                                        step="1"
                                    />
                                </div>
                            </div>
                            <label className="addLabel"> <p className='formLabel'>Add Instructions:</p></label>
                            <textarea id="addInstructions" rows="4" cols="50" onChange={e => setInputInstructions(e.target.value)}></textarea>
                            {/*Image upload section */}
                            {selectedImage && (
                                <div>
                                    <img
                                        alt="not found"
                                        width={"150px"}
                                        src={URL.createObjectURL(selectedImage)}
                                        className="uploadedImage"
                                    />
                                    <br /> <br />
                                    <button onClick={() => setSelectedImage(null)} className="button redbutton">Remove</button>
                                </div>
                            )}

                            <br />
                            <label className="imageButtonLabel">
                                <input
                                    type="file"
                                    name="myImage"
                                    className="button redbutton"
                                    onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setSelectedImage(event.target.files[0]);
                                    }}
                                />
                                <span className="fileButton">Add image</span>
                                <br />
                            </label>

                            <input type="submit" value="Submit Recipe" className='button redButton submitButton input' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
