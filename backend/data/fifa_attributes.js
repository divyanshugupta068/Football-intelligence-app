// FIFA 24/25 Realistic Attributes Database - 100+ Players
// Updated squads and ratings for 2024/25 season

const PLAYER_ATTRIBUTES = {
    // ========== PREMIER LEAGUE ==========

    // Manchester City
    "Erling Haaland": { pace: 89, dribbling: 80, shooting: 94, passing: 65, defending: 45, physical: 88, overall: 91 },
    "Kevin De Bruyne": { pace: 76, dribbling: 88, shooting: 86, passing: 93, defending: 64, physical: 78, overall: 91 },
    "Phil Foden": { pace: 85, dribbling: 90, shooting: 83, passing: 86, defending: 56, physical: 70, overall: 87 },
    "Rodri": { pace: 62, dribbling: 79, shooting: 73, passing: 87, defending: 84, physical: 84, overall: 89 },
    "Bernardo Silva": { pace: 80, dribbling: 91, shooting: 79, passing: 86, defending: 62, physical: 66, overall: 88 },
    "Jack Grealish": { pace: 82, dribbling: 89, shooting: 76, passing: 84, defending: 48, physical: 68, overall: 84 },
    "Rúben Dias": { pace: 62, dribbling: 70, shooting: 39, passing: 71, defending: 88, physical: 85, overall: 88 },
    "Kyle Walker": { pace: 90, dribbling: 78, shooting: 62, passing: 75, defending: 82, physical: 78, overall: 85 },
    "Ederson": { pace: 87, dribbling: 88, shooting: 55, passing: 93, defending: 11, physical: 88, overall: 89 },

    // Arsenal
    "Bukayo Saka": { pace: 86, dribbling: 87, shooting: 80, passing: 81, defending: 46, physical: 73, overall: 87 },
    "Martin Ødegaard": { pace: 78, dribbling: 89, shooting: 82, passing: 89, defending: 59, physical: 68, overall: 88 },
    "Gabriel Jesus": { pace: 88, dribbling: 87, shooting: 83, passing: 79, defending: 41, physical: 71, overall: 85 },
    "Declan Rice": { pace: 72, dribbling: 77, shooting: 72, passing: 81, defending: 86, physical: 84, overall: 87 },
    "William Saliba": { pace: 82, dribbling: 72, shooting: 42, passing: 70, defending: 87, physical: 82, overall: 87 },
    "Gabriel Martinelli": { pace: 93, dribbling: 85, shooting: 79, passing: 77, defending: 42, physical: 70, overall: 84 },
    "Ben White": { pace: 77, dribbling: 74, shooting: 48, passing: 76, defending: 83, physical: 77, overall: 83 },
    "Kai Havertz": { pace: 75, dribbling: 82, shooting: 82, passing: 81, defending: 55, physical: 76, overall: 84 },

    // Liverpool
    "Mohamed Salah": { pace: 90, dribbling: 90, shooting: 87, passing: 81, defending: 45, physical: 75, overall: 89 },
    "Virgil van Dijk": { pace: 77, dribbling: 72, shooting: 60, passing: 71, defending: 91, physical: 86, overall: 90 },
    "Trent Alexander-Arnold": { pace: 76, dribbling: 81, shooting: 77, passing: 89, defending: 76, physical: 71, overall: 87 },
    "Alisson": { pace: 85, dribbling: 85, shooting: 55, passing: 87, defending: 11, physical: 90, overall: 89 },
    "Luis Díaz": { pace: 93, dribbling: 88, shooting: 79, passing: 78, defending: 39, physical: 72, overall: 84 },
    "Darwin Núñez": { pace: 89, dribbling: 79, shooting: 82, passing: 71, defending: 37, physical: 82, overall: 82 },
    "Alexis Mac Allister": { pace: 73, dribbling: 82, shooting: 77, passing: 84, defending: 76, physical: 75, overall: 83 },
    "Dominik Szoboszlai": { pace: 80, dribbling: 84, shooting: 82, passing: 83, defending: 68, physical: 77, overall: 83 },

    // Manchester United
    "Bruno Fernandes": { pace: 75, dribbling: 84, shooting: 85, passing: 89, defending: 68, physical: 77, overall: 88 },
    "Marcus Rashford": { pace: 93, dribbling: 85, shooting: 85, passing: 79, defending: 44, physical: 77, overall: 86 },
    "Casemiro": { pace: 62, dribbling: 72, shooting: 72, passing: 75, defending: 88, physical: 90, overall: 89 },
    "Lisandro Martínez": { pace: 75, dribbling: 73, shooting: 50, passing: 72, defending: 86, physical: 82, overall: 84 },
    "Raphaël Varane": { pace: 75, dribbling: 71, shooting: 42, passing: 72, defending: 87, physical: 78, overall: 86 },
    "Antony": { pace: 82, dribbling: 86, shooting: 78, passing: 77, defending: 42, physical: 64, overall: 82 },
    "André Onana": { pace: 81, dribbling: 82, shooting: 50, passing: 85, defending: 11, physical: 88, overall: 84 },

    // Tottenham
    "Son Heung-min": { pace: 87, dribbling: 87, shooting: 89, passing: 82, defending: 43, physical: 77, overall: 89 },
    "James Maddison": { pace: 74, dribbling: 85, shooting: 83, passing: 86, defending: 59, physical: 68, overall: 85 },
    "Dejan Kulusevski": { pace: 80, dribbling: 85, shooting: 79, passing: 82, defending: 51, physical: 75, overall: 83 },
    "Cristian Romero": { pace: 81, dribbling: 71, shooting: 48, passing: 68, defending: 87, physical: 85, overall: 85 },
    "Guglielmo Vicario": { pace: 78, dribbling: 76, shooting: 48, passing: 72, defending: 11, physical: 82, overall: 81 },

    // Chelsea
    "Cole Palmer": { pace: 75, dribbling: 84, shooting: 82, passing: 83, defending: 48, physical: 65, overall: 84 },
    "Enzo Fernández": { pace: 76, dribbling: 84, shooting: 78, passing: 86, defending: 74, physical: 73, overall: 84 },
    "Moisés Caicedo": { pace: 83, dribbling: 79, shooting: 68, passing: 77, defending: 84, physical: 82, overall: 83 },
    "Raheem Sterling": { pace: 90, dribbling: 88, shooting: 82, passing: 81, defending: 45, physical: 67, overall: 86 },
    "Reece James": { pace: 85, dribbling: 79, shooting: 75, passing: 80, defending: 84, physical: 82, overall: 84 },
    "Christopher Nkunku": { pace: 83, dribbling: 86, shooting: 84, passing: 82, defending: 52, physical: 70, overall: 85 },

    // Newcastle
    "Alexander Isak": { pace: 88, dribbling: 85, shooting: 84, passing: 76, defending: 38, physical: 75, overall: 84 },
    "Bruno Guimarães": { pace: 76, dribbling: 83, shooting: 76, passing: 83, defending: 82, physical: 80, overall: 85 },
    "Sandro Tonali": { pace: 77, dribbling: 80, shooting: 74, passing: 82, defending: 82, physical: 78, overall: 84 },
    "Kieran Trippier": { pace: 70, dribbling: 77, shooting: 72, passing: 85, defending: 82, physical: 70, overall: 83 },

    // Aston Villa
    "Ollie Watkins": { pace: 87, dribbling: 82, shooting: 83, passing: 75, defending: 42, physical: 79, overall: 84 },
    "Emiliano Martínez": { pace: 81, dribbling: 78, shooting: 50, passing: 78, defending: 11, physical: 87, overall: 87 },
    "Douglas Luiz": { pace: 72, dribbling: 81, shooting: 76, passing: 82, defending: 80, physical: 79, overall: 83 },
    "John McGinn": { pace: 75, dribbling: 78, shooting: 77, passing: 79, defending: 75, physical: 82, overall: 81 },

    // West Ham
    "Lucas Paquetá": { pace: 76, dribbling: 86, shooting: 80, passing: 84, defending: 68, physical: 76, overall: 84 },
    "Mohammed Kudus": { pace: 86, dribbling: 85, shooting: 79, passing: 78, defending: 48, physical: 72, overall: 82 },
    "Jarrod Bowen": { pace: 85, dribbling: 83, shooting: 81, passing: 78, defending: 58, physical: 76, overall: 83 },

    // ========== LA LIGA ==========

    // Real Madrid
    "Kylian Mbappé": { pace: 97, dribbling: 92, shooting: 89, passing: 80, defending: 36, physical: 77, overall: 91 },
    "Jude Bellingham": { pace: 78, dribbling: 83, shooting: 82, passing: 78, defending: 78, physical: 84, overall: 87 },
    "Vinícius Júnior": { pace: 95, dribbling: 93, shooting: 83, passing: 79, defending: 29, physical: 61, overall: 89 },
    "Rodrygo": { pace: 91, dribbling: 88, shooting: 81, passing: 78, defending: 35, physical: 63, overall: 85 },
    "Luka Modrić": { pace: 74, dribbling: 90, shooting: 76, passing: 91, defending: 72, physical: 65, overall: 88 },
    "Toni Kroos": { pace: 54, dribbling: 81, shooting: 82, passing: 93, defending: 71, physical: 68, overall: 88 },
    "Antonio Rüdiger": { pace: 82, dribbling: 70, shooting: 55, passing: 73, defending: 87, physical: 86, overall: 87 },
    "Thibaut Courtois": { pace: 78, dribbling: 75, shooting: 52, passing: 75, defending: 11, physical: 89, overall: 90 },
    "Federico Valverde": { pace: 84, dribbling: 82, shooting: 82, passing: 82, defending: 78, physical: 84, overall: 86 },
    "Eduardo Camavinga": { pace: 84, dribbling: 82, shooting: 68, passing: 79, defending: 82, physical: 78, overall: 84 },
    "Aurélien Tchouaméni": { pace: 76, dribbling: 76, shooting: 70, passing: 78, defending: 84, physical: 87, overall: 84 },

    // Barcelona
    "Robert Lewandowski": { pace: 78, dribbling: 86, shooting: 91, passing: 79, defending: 44, physical: 82, overall: 91 },
    "Lamine Yamal": { pace: 82, dribbling: 86, shooting: 72, passing: 77, defending: 33, physical: 58, overall: 81 },
    "Pedri": { pace: 68, dribbling: 88, shooting: 71, passing: 86, defending: 62, physical: 63, overall: 85 },
    "Gavi": { pace: 81, dribbling: 85, shooting: 72, passing: 82, defending: 70, physical: 73, overall: 83 },
    "Frenkie de Jong": { pace: 78, dribbling: 86, shooting: 72, passing: 86, defending: 76, physical: 78, overall: 87 },
    "Raphinha": { pace: 91, dribbling: 86, shooting: 80, passing: 80, defending: 42, physical: 70, overall: 84 },
    "Jules Koundé": { pace: 88, dribbling: 76, shooting: 45, passing: 72, defending: 85, physical: 80, overall: 85 },
    "Marc-André ter Stegen": { pace: 78, dribbling: 82, shooting: 52, passing: 88, defending: 11, physical: 87, overall: 90 },
    "Ilkay Gündogan": { pace: 68, dribbling: 84, shooting: 79, passing: 86, defending: 72, physical: 68, overall: 85 },
    "Ronald Araújo": { pace: 79, dribbling: 68, shooting: 48, passing: 66, defending: 86, physical: 87, overall: 85 },

    // Atlético Madrid
    "Antoine Griezmann": { pace: 80, dribbling: 87, shooting: 84, passing: 86, defending: 62, physical: 72, overall: 87 },
    "Álvaro Morata": { pace: 83, dribbling: 79, shooting: 83, passing: 73, defending: 38, physical: 81, overall: 83 },
    "Jan Oblak": { pace: 87, dribbling: 78, shooting: 50, passing: 78, defending: 11, physical: 90, overall: 89 },
    "Marcos Llorente": { pace: 88, dribbling: 80, shooting: 77, passing: 77, defending: 76, physical: 82, overall: 83 },
    "Koke": { pace: 68, dribbling: 80, shooting: 74, passing: 84, defending: 76, physical: 72, overall: 83 },

    // Real Sociedad
    "Mikel Oyarzabal": { pace: 78, dribbling: 84, shooting: 81, passing: 82, defending: 54, physical: 70, overall: 83 },
    "Alexander Sørloth": { pace: 75, dribbling: 74, shooting: 83, passing: 68, defending: 35, physical: 85, overall: 81 },
    "Takefusa Kubo": { pace: 87, dribbling: 87, shooting: 76, passing: 80, defending: 42, physical: 62, overall: 82 },

    // Villarreal
    "Alexander Sørloth": { pace: 75, dribbling: 74, shooting: 83, passing: 68, defending: 35, physical: 85, overall: 81 },
    "Gerard Moreno": { pace: 78, dribbling: 83, shooting: 84, passing: 79, defending: 45, physical: 73, overall: 83 },

    // Celta Vigo
    "Iago Aspas": { pace: 77, dribbling: 85, shooting: 84, passing: 79, defending: 40, physical: 66, overall: 83 },

    // ========== BUNDESLIGA ==========

    // Bayern Munich
    "Harry Kane": { pace: 70, dribbling: 83, shooting: 93, passing: 83, defending: 47, physical: 83, overall: 90 },
    "Jamal Musiala": { pace: 78, dribbling: 87, shooting: 79, passing: 82, defending: 47, physical: 65, overall: 84 },
    "Leroy Sané": { pace: 91, dribbling: 86, shooting: 83, passing: 81, defending: 44, physical: 76, overall: 86 },
    "Joshua Kimmich": { pace: 70, dribbling: 82, shooting: 75, passing: 88, defending: 84, physical: 74, overall: 89 },
    "Thomas Müller": { pace: 72, dribbling: 82, shooting: 80, passing: 85, defending: 59, physical: 70, overall: 86 },
    "Serge Gnabry": { pace: 84, dribbling: 84, shooting: 81, passing: 79, defending: 45, physical: 72, overall: 84 },
    "Manuel Neuer": { pace: 79, dribbling: 85, shooting: 52, passing: 91, defending: 11, physical: 88, overall: 90 },
    "Dayot Upamecano": { pace: 82, dribbling: 70, shooting: 40, passing: 70, defending: 85, physical: 86, overall: 84 },
    "Alphonso Davies": { pace: 96, dribbling: 82, shooting: 64, passing: 77, defending: 76, physical: 78, overall: 84 },

    // Borussia Dortmund
    "Niclas Füllkrug": { pace: 68, dribbling: 73, shooting: 85, passing: 72, defending: 42, physical: 86, overall: 81 },
    "Donyell Malen": { pace: 93, dribbling: 83, shooting: 79, passing: 76, defending: 38, physical: 70, overall: 82 },
    "Julian Brandt": { pace: 76, dribbling: 86, shooting: 78, passing: 84, defending: 62, physical: 66, overall: 83 },
    "Emre Can": { pace: 72, dribbling: 76, shooting: 74, passing: 77, defending: 83, physical: 84, overall: 82 },
    "Mats Hummels": { pace: 52, dribbling: 70, shooting: 55, passing: 74, defending: 86, physical: 81, overall: 85 },
    "Marco Reus": { pace: 78, dribbling: 85, shooting: 83, passing: 84, defending: 52, physical: 64, overall: 84 },

    // RB Leipzig
    "Xavi Simons": { pace: 82, dribbling: 86, shooting: 78, passing: 82, defending: 52, physical: 65, overall: 82 },
    "Dani Olmo": { pace: 78, dribbling: 86, shooting: 81, passing: 84, defending: 58, physical: 70, overall: 84 },
    "Loïs Openda": { pace: 93, dribbling: 82, shooting: 81, passing: 73, defending: 35, physical: 75, overall: 82 },

    // Bayer Leverkusen
    "Florian Wirtz": { pace: 75, dribbling: 86, shooting: 80, passing: 84, defending: 50, physical: 65, overall: 84 },
    "Victor Boniface": { pace: 85, dribbling: 80, shooting: 82, passing: 72, defending: 40, physical: 80, overall: 82 },
    "Granit Xhaka": { pace: 62, dribbling: 76, shooting: 77, passing: 83, defending: 80, physical: 82, overall: 84 },
    "Jeremie Frimpong": { pace: 95, dribbling: 82, shooting: 72, passing: 76, defending: 72, physical: 75, overall: 82 },
    "Exequiel Palacios": { pace: 74, dribbling: 80, shooting: 74, passing: 81, defending: 78, physical: 76, overall: 81 },

    // VfB Stuttgart
    "Serhou Guirassy": { pace: 82, dribbling: 77, shooting: 84, passing: 70, defending: 38, physical: 84, overall: 82 },

    // ========== SERIE A ==========

    // Inter Milan
    "Lautaro Martínez": { pace: 86, dribbling: 84, shooting: 88, passing: 74, defending: 42, physical: 80, overall: 88 },
    "Nicolò Barella": { pace: 84, dribbling: 84, shooting: 76, passing: 83, defending: 80, physical: 78, overall: 86 },
    "Hakan Çalhanoğlu": { pace: 76, dribbling: 84, shooting: 84, passing: 87, defending: 74, physical: 73, overall: 85 },
    "Marcus Thuram": { pace: 88, dribbling: 81, shooting: 80, passing: 74, defending: 42, physical: 82, overall: 83 },
    "Alessandro Bastoni": { pace: 76, dribbling: 74, shooting: 48, passing: 77, defending: 85, physical: 79, overall: 84 },

    // AC Milan
    "Rafael Leão": { pace: 94, dribbling: 88, shooting: 79, passing: 76, defending: 35, physical: 76, overall: 86 },
    "Christian Pulisic": { pace: 86, dribbling: 85, shooting: 79, passing: 78, defending: 42, physical: 68, overall: 82 },
    "Olivier Giroud": { pace: 65, dribbling: 74, shooting: 84, passing: 73, defending: 39, physical: 83, overall: 83 },
    "Theo Hernández": { pace: 93, dribbling: 82, shooting: 74, passing: 77, defending: 78, physical: 82, overall: 85 },
    "Mike Maignan": { pace: 84, dribbling: 82, shooting: 50, passing: 78, defending: 11, physical: 88, overall: 87 },

    // Napoli
    "Victor Osimhen": { pace: 93, dribbling: 81, shooting: 87, passing: 72, defending: 37, physical: 83, overall: 88 },
    "Khvicha Kvaratskhelia": { pace: 91, dribbling: 88, shooting: 82, passing: 79, defending: 36, physical: 70, overall: 86 },
    "Stanislav Lobotka": { pace: 72, dribbling: 82, shooting: 66, passing: 82, defending: 78, physical: 70, overall: 82 },
    "Giovanni Di Lorenzo": { pace: 80, dribbling: 76, shooting: 66, passing: 75, defending: 82, physical: 79, overall: 82 },

    // Juventus
    "Dusan Vlahovic": { pace: 79, dribbling: 76, shooting: 87, passing: 70, defending: 35, physical: 84, overall: 84 },
    "Federico Chiesa": { pace: 91, dribbling: 87, shooting: 81, passing: 78, defending: 38, physical: 72, overall: 85 },
    "Wojciech Szczęsny": { pace: 78, dribbling: 76, shooting: 50, passing: 70, defending: 11, physical: 87, overall: 85 },
    "Adrien Rabiot": { pace: 72, dribbling: 79, shooting: 74, passing: 79, defending: 78, physical: 82, overall: 82 },

    // Roma
    "Paulo Dybala": { pace: 82, dribbling: 90, shooting: 88, passing: 84, defending: 38, physical: 61, overall: 86 },
    "Romelu Lukaku": { pace: 82, dribbling: 75, shooting: 86, passing: 75, defending: 39, physical: 90, overall: 86 },
    "Lorenzo Pellegrini": { pace: 76, dribbling: 83, shooting: 79, passing: 83, defending: 68, physical: 72, overall: 82 },

    // Lazio
    "Ciro Immobile": { pace: 82, dribbling: 80, shooting: 88, passing: 74, defending: 36, physical: 76, overall: 86 },
    "Luis Alberto": { pace: 72, dribbling: 86, shooting: 79, passing: 88, defending: 58, physical: 64, overall: 84 },

    // ========== LIGUE 1 ==========

    // PSG
    "Ousmane Dembélé": { pace: 95, dribbling: 89, shooting: 78, passing: 83, defending: 38, physical: 63, overall: 86 },
    "Randal Kolo Muani": { pace: 90, dribbling: 81, shooting: 80, passing: 75, defending: 42, physical: 80, overall: 83 },
    "Marquinhos": { pace: 75, dribbling: 74, shooting: 58, passing: 75, defending: 87, physical: 78, overall: 87 },
    "Achraf Hakimi": { pace: 96, dribbling: 82, shooting: 74, passing: 80, defending: 76, physical: 78, overall: 84 },
    "Vitinha": { pace: 76, dribbling: 84, shooting: 76, passing: 85, defending: 72, physical: 68, overall: 83 },
    "Gianluigi Donnarumma": { pace: 83, dribbling: 80, shooting: 50, passing: 79, defending: 11, physical: 90, overall: 89 },
    "Warren Zaïre-Emery": { pace: 78, dribbling: 82, shooting: 72, passing: 80, defending: 74, physical: 72, overall: 80 },

    // Monaco
    "Wissam Ben Yedder": { pace: 82, dribbling: 85, shooting: 86, passing: 78, defending: 40, physical: 68, overall: 84 },
    "Folarin Balogun": { pace: 88, dribbling: 80, shooting: 81, passing: 72, defending: 38, physical: 74, overall: 81 },
    "Youssouf Fofana": { pace: 78, dribbling: 76, shooting: 68, passing: 77, defending: 82, physical: 82, overall: 81 },

    // Lille
    "Jonathan David": { pace: 84, dribbling: 82, shooting: 84, passing: 75, defending: 42, physical: 72, overall: 83 },
    "Edon Zhegrova": { pace: 86, dribbling: 84, shooting: 76, passing: 78, defending: 42, physical: 66, overall: 80 },

    // Lyon
    "Alexandre Lacazette": { pace: 75, dribbling: 83, shooting: 84, passing: 78, defending: 39, physical: 73, overall: 82 },
    "Rayan Cherki": { pace: 80, dribbling: 86, shooting: 74, passing: 81, defending: 45, physical: 62, overall: 79 },

    // Marseille
    "Pierre-Emerick Aubameyang": { pace: 88, dribbling: 81, shooting: 85, passing: 73, defending: 34, physical: 74, overall: 83 },
    "Iliman Ndiaye": { pace: 85, dribbling: 84, shooting: 76, passing: 77, defending: 44, physical: 70, overall: 80 }
};

module.exports = PLAYER_ATTRIBUTES;
