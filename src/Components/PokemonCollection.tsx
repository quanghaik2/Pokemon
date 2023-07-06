import React from 'react'
import { Detail, Pokemon, PokemonDetail } from '../interface'
import PokemonList from './PokemonList';
import './pokemon.css'

interface Props{
    pokemons: PokemonDetail[],
    viewDetails: Detail,
    setDetails: React.Dispatch<React.SetStateAction<Detail>>
}



const PokemonCollection:React.FC<Props> = (props) => {
    const {pokemons,viewDetails,setDetails} = props;
    const selecPokemon = (id: number) =>{
       if(!viewDetails.isOpened){
        setDetails({
            id: id,
            isOpened: true,
        })
       }
    }
  return (
    <>
        <section className={viewDetails.isOpened? 'collection-container-active': 'collection-container'}>
            {viewDetails.isOpened ? (
                <div className="overlay">
                    
                </div>
            ) : (
                <div className=""></div>
            )}
        {pokemons.map((pokemon) => (
            <div onClick={() => selecPokemon(pokemon.id)}>
                <PokemonList
                    viewDetails={viewDetails}
                    setDetails = {setDetails}
                    key={pokemon.id}
                    name={pokemon.name}
                    id={pokemon.id}
                    abilities={pokemon.abilities}
                    image={pokemon.sprites.front_default}
                />
            </div>
        ))}
        </section>
    </>
  )
}

export default PokemonCollection