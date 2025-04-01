import { useEffect, useState } from "react";
import styles from './search.module.css' 

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "d16d8e77cb18429e9e8232a42c6da2c6" //not good coding practise

export default function Search({foodData, setFoodData }) {
    const [query, setQuery] = useState("pizza");
    // syntax for use effect hook useEffect(()=>{},[])
    //useEffect(()=>{
       // function demo() {
           // console.log("Demo function executed");
        //}
       // demo()
   // },[]);
   useEffect(()=>{
    async function fetchFood(){
       const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
       const data = await res.json();
       console.log(data.results);
       setFoodData(data.results);
    }
    fetchFood();
   },[query]);
    return (
        <div className={styles.searchContainer}>
            <input
            className={styles.input} 
                value={query} onChange={(e) => setQuery(e.target.value)} 
                type="text" 
            />
        </div>
  );
}
