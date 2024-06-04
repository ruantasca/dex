import { useState, useEffect } from "react"

export default function Pokedex() {
    const [id, setid] = useState(1)
    const [pokemon, setPokemon] = useState(null)

    const fetchData = async () => {
        try {
            const response = await fetch(`link API: https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])
    //useEffect acontece quando é feita a  conexão com a Api retornando os dados do pokemon a partir do iD


const nextPokemon = () =>{
    setId(id + 1)
}

    return (
    <div>
        {
        pokemon && (
            <div className="pokemon">
                <h1>Pokémon</h1>
                <p>{pokemon.name}</p>
                <p>Peso: {pokemon.weight}g</p>

            <button onClick={nextPokemon}>Proximo</button>
            </div>
        )}

    </div> 
)
}