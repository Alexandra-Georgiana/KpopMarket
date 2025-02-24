import { useState } from "react";
import { NavLink } from "react-router-dom";

const Artists = ({closeMenu}) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const artists = {
    A: ["Aespa", "Alexa", "Astro", "Ateez", "Akmu", "AKB48"],
    B: ["BtoB", "Blackpink", "BTS", "BabyMonster", "Bibi", "Baekhyun"],
    C: ["Chung Ha", "Cravity", "CIX", "CLC"],
    D: ["Dreamcatcher", "Day6", "Dpr Ian"],
    E: ["Everglow", "Exo", "Enhypen", "Eric Nam"],
    F: ["Fromis_9", "Forestella", "F.T.Island"],
    G: ["Gfriend", "Got7", "Golden Child", "G-idle"],
    H: ["Hyuna", "Hwasa"],
    I: ["Ikon", "Itzy", "IU", "Ive", "Illit", "IIchillin'"],
    J: ["Jennie", "Jisoo", "J-Hope", "Jungkook", "Jakson Wang", "Jay Park", "Jessi", "JYP"],
    K: ["Kang Daniel", "Kai", "Kard"],
    L: ["Loona", "Le Sserafim", "Lisa", "Luna"],
    M: ["Mamamoo", "Monsta X", "Mino", "Miyane", "Mirei Touyama"],
    N: ["Nct", "NiziU", "N.Flying", "Nct Dream", "Nct 127", "New Jeans"],
    O: ["Oneus"],
    P: ["Pentagon", "Psy", "P1Harmony"],
    R: ["Red Velvet", "Rosé", "Rain", "Ren"],
    S: ["Seventeen", "Stray Kids", "Sunmi", "Somi", "Seori", "SuperM", "SF9", "Shinee"],
    T: ["Twice", "TXT", "Taemin", "Taeyong", "Ten"],
    V: ["Victon", "Viviz", "Vixx"],
    W: ["WayV", "Wonho", "Woods"],
    X: ["XG"],
    Y: ["Yuki"],
    Z: ["Zico","ZB1"],
    "#": ["&Team", "2PM", "2NE1"]
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleArtistClick = () => {
    closeMenu();
  };

  return (
    <div className="flex justify-center bg-gradient-to-b from-pink-200 to-purple-200 w-[970px] h-[49vh] z-50 rounded-xl shadow-lg overflow-hidden hidden-scrollbar">
      {/* Letter Buttons */}
      <div className="flex flex-col items-center bg-purple-300 p-3 rounded-l-xl shadow-md overflow-y-auto w-[270px]">	
        <h2 className="text-center text-2xl font-mono text-pink-900 mb-4">Letters</h2>
        <div className="grid grid-cols-4 gap-2">
          {["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className="bg-pink-400 text-white rounded-full p-6 w-10 h-10 text-2xl hover:bg-pink-600 transition duration-300 font-mono flex items-center justify-center"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Artist List */}
      <div className="flex-1 bg-white p-4 rounded-r-xl shadow-md overflow-y-auto w-[190px]">
        <h2 className="text-center text-2xl font-mono text-pink-900 mb-4">
          Artists Starting with "{selectedLetter}"
        </h2>
        <div className="flex flex-col gap-2">
          {selectedLetter && artists[selectedLetter]?.map((artist, index) => (
            <NavLink
              key={index}
              to={`/artist/${artist}`}  
              className="bg-pink-400 text-white rounded-md p-2 text-lg hover:bg-pink-600 transition duration-300"
              onClick={handleArtistClick}
            >
              {artist}
            </NavLink>
          ))}
          {!selectedLetter && (
            <p className="text-center text-lg text-pink-600">Select a letter to see the artists.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Artists;
