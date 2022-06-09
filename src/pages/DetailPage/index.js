import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonImage from "../../components/PokemonImage";

import getPokemonDetail from "../../utils/get-pokemon-detail";

export default function DetailPage() {
  const { id: pokemonId } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function getData() {
    try {
      const pokemon = await getPokemonDetail(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      if (pokemon) {
        setPokemon(pokemon);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const loadingRender = <div className="container p-10">Loading Data...</div>;
  const render = (
    <div className="container p-10">
      <div className="flex justify-start pb-5 mb-5 border-b">
        <div className="mr-10">
          <PokemonImage pokemon={pokemon} />
        </div>
        <div>
          <div className="text-sm text-slate-500">Pokemon Name</div>
          <div className="text-xl mb-3 uppercase">{pokemon.name}</div>
          <div className="text-sm text-slate-500">Pokemon Types</div>
          <div className="flex mt-2">
            {pokemon.types &&
              pokemon.types.map((type, index) => {
                return (
                  <div
                    key={index}
                    className="text-sm mr-2 uppercase py-1 px-2 border rounded"
                  >
                    {type.type.name}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {pokemon.stats &&
          pokemon.stats.map((stat, index) => {
            return (
              <div
                key={index}
                className="text-xs text-center border rounded p-1 uppercase"
              >
                {stat.stat.name} : {stat.base_stat}
              </div>
            );
          })}
      </div>
    </div>
  );

  return Object.keys(pokemon).length ? render : loadingRender;
}
