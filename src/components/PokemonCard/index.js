import PokemonImage from "../PokemonImage";

export default function PokemonCard(props) {
  return (
    <div className="border-2 rounded text-center p-3">
      {props.pokemon && <PokemonImage pokemon={props.pokemon} />}
      <hr />
      <div className="my-2 font-semibold text-lg uppercase">
        {props.pokemon.name}
      </div>
      <a
        href={`/${props.pokemon.id}`}
        className="block border rounded text-xs p-1 text-white bg-[#333]"
      >
        DETAIL
      </a>
    </div>
  );
}
