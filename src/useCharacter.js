import { useState, useEffect } from "react";

import { parseCharacter } from "./helper";

function useCharacter(selected) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
  
    parseCharacter(selected, setCharacter);

  }, [selected]);

  return {
    character
  };
}

export default useCharacter;