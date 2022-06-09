import { useEffect, useState } from "react";

import flipUI from "../../assets/ui/flip.png";
import flipWhiteUI from "../../assets/ui/flip-white.png";

import femaleUI from "../../assets/ui/female.png";
import femaleWhiteUI from "../../assets/ui/female-white.png";
import femaleGrayUI from "../../assets/ui/female-gray.png";

import shinyUI from "../../assets/ui/shiny.png";
import shinyWhiteUI from "../../assets/ui/shiny-white.png";
import shinyGrayUI from "../../assets/ui/shiny-gray.png";

export default function PokemonImage(props) {
  const [isFrontSprite, setIsFrontSprite] = useState(true);
  const [isFemaleSprite, setIsFemaleSprite] = useState(false);
  const [isShinySprite, setIsShinySprite] = useState(false);

  const [displayedSprite, setDisplayedSprite] = useState("");
  const [isFemaleSpriteExist, setIsFemaleSpriteExist] = useState(false);
  const [isShinySpriteExist, setIsShinySpriteExist] = useState(false);

  function toggleSide() {
    setIsFrontSprite((prevData) => !prevData);
  }

  function toggleGender(_, booleanData = undefined) {
    if (typeof booleanData !== "undefined") {
      setIsFemaleSprite(booleanData);
    } else {
      setIsFemaleSprite((prevData) => {
        if (!prevData && isShinySprite) {
          toggleShiny(null, false);
        }

        return !prevData;
      });
    }
  }

  function toggleShiny(_, booleanData = undefined) {
    if (typeof booleanData !== "undefined") {
      setIsShinySprite(booleanData);
    } else {
      setIsShinySprite((prevData) => {
        if (!prevData && isFemaleSprite) {
          toggleGender(null, false);
        }

        return !prevData;
      });
    }
  }

  useEffect(() => {
    if (isFrontSprite) {
      if (isFemaleSprite) {
        setDisplayedSprite(props.pokemon.sprites.front_female);
      } else {
        if (isShinySprite) {
          setDisplayedSprite(props.pokemon.sprites.front_shiny);
        } else {
          setDisplayedSprite(props.pokemon.sprites.front_default);
        }
      }
    } else {
      if (isFemaleSprite) {
        setDisplayedSprite(props.pokemon.sprites.back_female);
      } else {
        if (isShinySprite) {
          setDisplayedSprite(props.pokemon.sprites.back_shiny);
        } else {
          setDisplayedSprite(props.pokemon.sprites.back_default);
        }
      }
    }
  }, [isFrontSprite, isFemaleSprite, isShinySprite]);

  useEffect(() => {
    if (props?.pokemon?.sprites?.front_female) {
      setIsFemaleSpriteExist(true);
    }

    if (props?.pokemon?.sprites?.front_shiny) {
      setIsShinySpriteExist(true);
    }
  }, []);

  return (
    <div className="flex justify-center mb-2">
      <div>
        <img
          src={displayedSprite}
          className="m-auto border rounded mr-2 w-[95px] h-[95px]"
          alt={props.pokemon.name}
          title={`${props.pokemon.name} ${isFemaleSprite ? "female" : ""} ${
            isShinySprite ? "shiny" : ""
          } image`}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`flex items-center justify-center p-1 rounded mb-1 ${
            isFrontSprite ? "bg-white" : "bg-[#333]"
          }`}
        >
          <img
            src={isFrontSprite ? flipUI : flipWhiteUI}
            className="w-[16px] cursor-pointer"
            onClick={toggleSide}
            alt="Flip"
            title="Flip Image"
          />
        </div>
        <div
          className={`flex items-center justify-center p-1 rounded mb-1 ${
            !isFemaleSprite ? "bg-white" : "bg-[#333]"
          }`}
        >
          <img
            src={
              !isFemaleSpriteExist
                ? femaleGrayUI
                : isFemaleSprite
                ? femaleWhiteUI
                : femaleUI
            }
            className="w-[16px] cursor-pointer"
            onClick={isFemaleSpriteExist ? toggleGender : null}
            alt="Female"
            title="Female Version"
          />
        </div>
        <div
          className={`flex items-center justify-center p-1 rounded ${
            !isShinySprite ? "bg-white" : "bg-[#333]"
          }`}
        >
          <img
            src={
              !isShinySpriteExist
                ? shinyGrayUI
                : isShinySprite
                ? shinyWhiteUI
                : shinyUI
            }
            className="w-[16px] cursor-pointer"
            onClick={isShinySpriteExist ? toggleShiny : null}
            alt="Shiny"
            title="Shiny Version"
          />
        </div>
      </div>
    </div>
  );
}
