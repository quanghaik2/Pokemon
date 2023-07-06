import React, { useEffect, useState } from 'react'
import { Pokemon,Detail } from '../interface';
import './pokemon.css'

interface Props{
    abilities: {
        name: string,
        ability: string,
    }[] | undefined;
    name: string;
    id: number;
    image: string;
    viewDetails: Detail;
    setDetails: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList:React.FC<Props> = (props) => {
    const {name,id,image,abilities,viewDetails,setDetails} = props;
    const [isSelected,setSelect] = useState<boolean>(false);
    useEffect(() => {
        setSelect(id === viewDetails?.id);
    },[viewDetails])
    const closeDetail = () => {
        setDetails({
            id: 0,
            isOpened: false,
        })
    }
  return (
    <div>
        {isSelected ? (
            <section className="pokemon-list-detailed">
                <div className="detail-container">
                    <p className="detail-close" onClick={closeDetail}>X</p>
                    <div className="detail-info">
                        <img src={image} alt="" className='detail-img' />
                        <p className="detail-name">{name}</p>
                    </div>
                    <div className="detail-kill">
                        <p className="detail-ability">Ability: {
                    abilities?.map((ability: any) =>(
                        <div className="">{ability.ability.name} </div>
                    ))
                } </p>
                    </div>
                </div>
            </section>
        ):(
            <section className="pokemon-list-container">
            <p className="pokemon-name">
                {name}
            </p>
            <img src={image} alt="pokemon" />
            
            </section>
        )}
        
    </div>
  )
}

export default PokemonList