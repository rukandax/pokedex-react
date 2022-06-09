export default function MainHeader() {
  return (
    <div className="container p-10 border-b">
      <a href="/">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokeAPI Explorer Logo"
          className="m-auto mb-10"
        />
      </a>
      <p className="text-center">We visualize the PokeAPI, so you can simply click to explore the whole pokemon database.</p>
    </div>
  );
}
