import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// import PokemonColection from './Components/PokemonColection';
import { Pokemon, Detail, PokemonDetail } from './interface';
import PokemonCollection from './Components/PokemonCollection';

interface Pokemons{
  name: string,
  url: string,
}

const App:React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [viewDetails, setDetails] = useState<Detail>({
    id: 0,
    isOpened: false,
  })
  useEffect(() => {
    const getPokemons =async () => {
      // const pokemonList:Pokemon[] = [];
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
      setNextUrl(res.data.next);
      res.data.results.forEach(async(pke:Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pke.name}`)
        setPokemons(p =>[...p,poke.data])
        setLoading(false);
      })
    }
    getPokemons();
  },[])
  // setPokemons(pokemonList);

 const nextPage =async () =>{
    setLoading(true);
    let res = await axios.get(`${nextUrl}`);
    setNextUrl(res.data.next);
    res.data.results.forEach(async(pke:Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pke.name}`)
      setPokemons(p =>[...p,poke.data])
      setLoading(false);
    })
 }

  return (
    <div className="App">
     <div className="container">
      <header className="pokemon-header">Pokemon</header>
      <PokemonCollection pokemons={pokemons} viewDetails={viewDetails} setDetails={setDetails} />
      {!viewDetails.isOpened && (
        <div className="btn">
        <button onClick={nextPage}>
          {isLoading? "Loading...": "Load more"}
        </button>
      </div>
      )}
     </div>
    </div>
  );
}

export default App;
