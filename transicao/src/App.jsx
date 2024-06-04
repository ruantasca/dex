import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './App.css'
import Header from './components/Header';

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-top: 4px solid red;
  border-radius: 50%;
  display: inline-block;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
`;

const ArrowButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemonData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  useEffect(() => {
    fetchPokemonData(pokemonId);
  }, [pokemonId]);

  const handleNextPokemon = () => {
    setPokemonId((prevId) => prevId + 1);
    setIsLoading(true);
  };

  const handlePrevPokemon = () => {
    if (pokemonId > 1) {
      setPokemonId((prevId) => prevId - 1);
      setIsLoading(true);
    }
  };

  return (
    
    <Container>
      <Header/>
      <LeftArrow onClick={handlePrevPokemon} className='a'>{'◀◀◀'}</LeftArrow>
      {isLoading ? (
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        ></Spinner>
      ) : (
        <div>
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Altura: {pokemonData.height}</p>
          <p>Peso: {pokemonData.weight}</p>
        </div>
      )}
      <RightArrow onClick={handleNextPokemon} className='a' >{'▶▶▶'}</RightArrow>
    </Container>
  );
}

export default App;
