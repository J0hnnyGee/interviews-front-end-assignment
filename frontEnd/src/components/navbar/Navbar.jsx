import MenuItem from './MenuItem'
import './navbar.css'
import { Link } from "react-router-dom"
export default function NavBar() {

    return (
        <>
            <div className="navBar">
                <div className="leftElems">
                    <Link to="/">
                        <div className="logo">
                            <button className='logoButton'>
                                <p className='logoText'>RecipeBook</p>
                                <img src='./book.svg' alt='bookImage' className='logoImg' />
                            </button>
                        </div>
                    </Link>
                    <div className="navigationMenu">
                        <MenuItem label={"Cuisines"} />
                        <MenuItem label={"Dietary"} />
                    </div>
                </div>
                <div className="rightElems">
                    <Link to="/addRecipe">
                        <button>Add</button>
                    </Link>
                    <button className='redButton'>Filter</button>
                </div>
            </div>
        </>
    )
}