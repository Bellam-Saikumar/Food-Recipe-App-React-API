import React, { useState } from 'react';
import Mealcards from './Mealcards';

const Mainpage = () => {
    const [data, setData] = useState()
    const [search, setSearch] = useState();
    const [msg, setMsg] = useState("")

    const handleInput = (event) =>{
        setSearch(event.target.value)

    }
    
    const myFunc = async () => {
        if(search === ""){
            setMsg("Please enter something");
        }
        else{
            const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const jsonData=await get.json();
            setData(jsonData.meals);
            setMsg("");
        }
        }

  return (
    <>
     <div className='titleName'>
                <div>
                <img src="/logo.png" alt="Kitty's Menu Logo" />
                </div>
                <h2>
                Time to eat! 🍛<br/> Explore our menu and find your perfect meal!
                </h2>
    </div>

    <div className='container'>
        <div className='searchBar'>
            <input type='text' placeholder='Search for a dish' onChange={handleInput}/>
            <button onClick={myFunc}>
                Search
            </button>
        </div>
    </div>

    <h4 className='error'  style={{ padding: '10px',fontSize:"20px",color:"#210c01", textAlign:"center" }}>{msg}</h4>
    <div>
        <Mealcards detail={data}/>
    </div>
    </>
  )
}


export default Mainpage;
