import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PokemonCards from './PokemonCards'
import './Pokemon.css'

function Pokemon() {
    const [pokemon,setPokemon]=useState([])
    const [loadind,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const[search,setSearch]=useState("")

const API=  "https://pokeapi.co/api/v2/pokemon?limit=55"  

const fetchPokemon= async()=>{
try{
const res= await fetch(API)
const data=await res.json()
// console.log(data)
const detailPokemonData=data.results.map(async(curPokemon)=>{
    // console.log(curPokemon.url)
    const res=await fetch(curPokemon.url)
    const data1=await res.json()
    return data1
})
const detailResponse= await Promise.all(detailPokemonData)
console.log(detailResponse)
setPokemon(detailResponse)
setLoading(false)
}catch(err){
console.log(err)
setLoading(false)
setError(err)
}
}

useEffect(()=>{
fetchPokemon()
},[])
//search functinality
const searchData=pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase())
);

if(loadind){
    return(
        <div>
            <h1>Loading....</h1>
        </div>
    )
}

if(error){
    return(
        <div>
            <h1>{err.message}</h1>
        </div>
    )
}

  return (
    <>
   <section className='container'>
    <header>
        <h1>Pokemons</h1>
    </header>
    <div className='pokemon-search'>
    <input type="text" placeholder='search pokemon' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </div>
    <div>
        <ul className='cards'>
            {
               searchData.map((curPokemon)=>{
                    return <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                })
            }
        </ul>
    </div>
   </section>
    </>
  )
}

export default Pokemon