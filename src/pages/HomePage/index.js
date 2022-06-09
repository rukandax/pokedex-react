import { useEffect, useState } from "react";
import axios from "axios";

import PokemonCard from "../../components/PokemonCard";
import InfiniteScroll from "../../components/InfiniteScroll";

import getPokemonDetail from "../../utils/get-pokemon-detail";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const [pokemons, setPokemons] = useState([]); // eslint-disable-line
  const [pokemonDetails, setPokemonDetail] = useState([]);

  const [nextListUrl, setNextListUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  async function getPokemonData(url) {
    setIsLoading(true);

    try {
      const data = await getPokemonDetail(url);

      if (data) {
        setPokemonDetail((prevData) => {
          if (!prevData.find((pokemon) => pokemon.id === data.id)) {
            return [...prevData, data];
          }

          return [...prevData];
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function getPokemonList() {
    setIsLoading(true);

    try {
      const res = await axios.get(nextListUrl);

      if (res?.data?.results) {
        setPokemons(res.data.results);

        res.data.results.forEach((pokemon) => {
          getPokemonData(pokemon.url);
        });
      }

      if (res?.data?.next) {
        setNextListUrl(res.data.next);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function fetchNextPage() {
    getPokemonList();
  }

  useEffect(() => {
    getPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container p-10">
      <div className="grid grid-cols-2 gap-5 mb-5">
        {pokemonDetails.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
        })}
      </div>
      <InfiniteScroll
        isLoading={isLoading}
        nextListUrl={nextListUrl}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
