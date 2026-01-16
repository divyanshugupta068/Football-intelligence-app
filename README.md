# ⚽ Football Intelligence App

A modern, full-stack football analytics application featuring **70+ elite players**, advanced statistics, player comparisons, and real-time match data. Built with React and Node.js.

![Football Intelligence App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB.svg)
![Node](https://img.shields.io/badge/Node.js-Express-339933.svg)

---

## 🌟 Features

### 📊 **Player Database**
- **70+ Elite Players** from top 5 European leagues
- Real FIFA 24/25 attributes and ratings
- Complete season statistics (goals, assists, xG metrics)
- Real player photos from Transfermarkt

### 🔍 **Advanced Filtering**
- Filter by **league** (Premier League, La Liga, Bundesliga, Serie A, Ligue 1)
- Filter by **position** (GK, DEF, MID, FWD)
- Filter by **rating** (90+, 85-89, 80-84, 75-79)
- Sort by overall, pace, shooting, goals, or name
- Real-time search functionality

### ⭐ **Player Favorites**
- Save your favorite players
- Persistent storage with localStorage
- Quick access to saved players

### 📈 **Player Comparison**
- Compare any two players side-by-side
- **4 visualization modes**:
  - Stats comparison (bar charts)
  - Radar chart (6 attributes)
  - Shot maps (heat maps)
  - AI-generated insights

### 📰 **News & Updates**
- Latest football news
- Category filters (All, Transfers, Matches, Teams)
- Real-time updates
- AI-powered recommendations

### 🏆 **Top Stats Dashboard**
- **6 ranking categories**:
  - Top Scorers
  - Top Assisters
  - Fastest Players
  - Best Shooters
  - Highest Rated
  - Best Dribblers
- Top 10 rankings with medals (Gold, Silver, Bronze)

### 🏟️ **Club Pages**
- Squad lists for all major clubs
- Position filters (GK, Defenders, Midfielders, Forwards)
- League standings for all 5 leagues
- Match schedules

### 🎨 **Premium UI/UX**
- Glassmorphism design
- Smooth animations and transitions
- Loading skeletons
- Color-coded ratings
- Responsive design
- Dark theme optimized

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/football-intelligence-app.git
cd football-intelligence-app
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `backend` directory:
```env
NEWS_API_KEY=your_news_api_key_here
FOOTBALL_API_KEY=your_football_api_key_here
PORT=5000
```

5. **Start the backend server**
```bash
cd backend
node index.js
```

6. **Start the frontend**
```bash
cd frontend
npm start
```

7. **Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
football-intelligence-app/
├── backend/
│   ├── data/
│   │   ├── enhanced_players.json    # 70+ players database
│   │   ├── fifa_attributes.js       # FIFA 24/25 ratings
│   │   ├── players.json             # Base player data
│   │   ├── shots.json               # Shot data for maps
│   │   └── users.json               # User preferences
│   ├── index.js                     # Express server
│   ├── package.json
│   └── .env                         # Environment variables
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── App.js                   # Main app component
│   │   ├── Home.js                  # Home page
│   │   ├── PlayersPageEnhanced.js   # Players list with filters
│   │   ├── PlayerDetailPage.js      # Individual player page
│   │   ├── ComparePage.js           # Player comparison
│   │   ├── StatsPage.js             # Top stats dashboard
│   │   ├── NewsPage.js              # News feed
│   │   ├── ClubPage.js              # Club pages
│   │   ├── SquadsPage.js            # Squad lists
│   │   ├── StandingsPage.js         # League standings
│   │   ├── MatchesPage.js           # Match schedules
│   │   ├── theme.js                 # Theme configuration
│   │   └── index.css                # Global styles
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🎯 Key Technologies

### Frontend
- **React** 19.2.3 - UI framework
- **React Router** 7.12.0 - Navigation
- **Chart.js** 4.5.1 - Data visualization
- **Lucide React** 0.562.0 - Icons
- **Custom Theme System** - Consistent styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Node-fetch** - API requests
- **dotenv** - Environment variables

---

## 📊 Database

### Players Database (70+ Players)

#### **Premier League** (20 players)
- Man City: Haaland, De Bruyne, Rodri, Foden, Bernardo Silva
- Liverpool: Salah, Van Dijk, Alisson, Trent Alexander-Arnold
- Arsenal: Saka, Ødegaard, Rice, Martinelli
- And more...

#### **La Liga** (17 players)
- Real Madrid: Mbappé, Bellingham, Vinícius Jr, Modrić, Kroos
- Barcelona: Lewandowski, Pedri, Yamal, De Jong, Gavi
- Atlético Madrid: Griezmann, Morata, Oblak
- And more...

#### **Bundesliga** (12 players)
- Bayern: Kane, Musiala, Sané, Kimmich, Müller, Neuer
- Bayer Leverkusen: Wirtz, Boniface, Xhaka
- And more...

#### **Serie A** (12 players)
- Inter: Lautaro Martínez, Barella
- AC Milan: Leão, Theo Hernández, Maignan
- Napoli: Osimhen, Kvaratskhelia
- And more...

#### **Ligue 1** (9 players)
- PSG: Dembélé, Kolo Muani, Marquinhos, Hakimi, Donnarumma
- And more...

### Player Data Includes:
- ✅ Real photos (Transfermarkt)
- ✅ FIFA 24/25 attributes (Pace, Dribbling, Shooting, Passing, Defending, Physical)
- ✅ Overall rating (75-91)
- ✅ Season stats (Goals, Assists, Matches, Shots)
- ✅ xG metrics (Expected Goals, xG per 90, etc.)
- ✅ Personal info (Age, Nationality, Position, Club)

---

## 🎨 Features Showcase

### **Advanced Filters**
```javascript
// Filter players by multiple criteria
- League: Premier League, La Liga, Bundesliga, Serie A, Ligue 1
- Position: GK, ST, CAM, CDM, CB, LW, RW, etc.
- Rating: 90+, 85-89, 80-84, 75-79
- Sort: Overall, Pace, Shooting, Goals, Name
```

### **Player Comparison**
```javascript
// Compare any two players
- Side-by-side stats
- Radar chart (6 attributes)
- Shot maps with xG
- AI insights
```

### **Top Stats Dashboard**
```javascript
// Rankings in 6 categories
- Top 10 Scorers
- Top 10 Assisters
- Top 10 Fastest
- Top 10 Shooters
- Top 10 Rated
- Top 10 Dribblers
```

---

## 🔧 API Endpoints

### Players
```
GET /players/enhanced              # Get all players
GET /players/enhanced?league=...   # Filter by league
GET /player/:name                  # Get player details
GET /ai/player/:name               # Get AI insights
```

### Clubs
```
GET /club/:club/squad              # Get club squad
GET /standings/:league             # Get league standings
```

### News
```
GET /news/top                      # Top news
GET /news/transfers                # Transfer news
```

### Matches
```
GET /live-matches                  # Live matches
GET /matches-today                 # Today's matches
```

### Other
```
GET /leagues                       # Get all leagues
GET /for-you                       # Personalized feed
```

---

## 🎯 Usage Examples

### **Find All Strikers Rated 85+**
1. Go to Players page
2. Click "Show Filters"
3. Select Position: ST
4. Select Rating: 85-89 or 90+
5. Results filtered instantly

### **Compare Two Players**
1. Go to Compare page
2. Search for Player A (e.g., Haaland)
3. Search for Player B (e.g., Mbappé)
4. View Stats, Radar, Shot Maps, AI tabs

### **View Club Squad**
1. Click any club logo on home page
2. See squad list
3. Filter by position (GK, DEF, MID, FWD)
4. Click player for details

### **Check League Standings**
1. Click any club logo
2. Click "Standings" tab
3. Select league
4. View full table

---

## 🎨 Design Features

### **Color Coding**
- **Gold (#facc15)** - 90+ OVR (World Class)
- **Green (#22c55e)** - 85-89 OVR (Elite)
- **Blue (#3b82f6)** - 80-84 OVR (Excellent)
- **Purple (#a78bfa)** - 75-79 OVR (Very Good)

### **Animations**
- Fade-in animations for cards
- Stagger effect (cards appear sequentially)
- Hover effects (cards lift on hover)
- Loading skeletons (pulse animation)
- Smooth transitions (0.3s cubic-bezier)

### **Glassmorphism**
- Frosted glass backgrounds
- Backdrop blur effects
- Semi-transparent surfaces
- Premium aesthetic

---

## 📱 Responsive Design

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

---

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Team builder (create your dream team)
- [ ] Formation selector
- [ ] Player comparison history
- [ ] Export/share functionality
- [ ] More leagues and players
- [ ] Live match updates
- [ ] Player performance trends
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Player data and photos from [Transfermarkt](https://www.transfermarkt.com/)
- FIFA ratings inspired by EA Sports FIFA 24/25
- Icons from [Lucide React](https://lucide.dev/)
- News API from [NewsAPI](https://newsapi.org/)
- Football API from [API-Football](https://www.api-football.com/)

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Players List with Filters
![Players](screenshots/players.png)

### Player Detail Page
![Player Detail](screenshots/player-detail.png)

### Player Comparison
![Comparison](screenshots/comparison.png)

### Top Stats Dashboard
![Stats](screenshots/stats.png)

### Club Squad
![Squad](screenshots/squad.png)

### League Standings
![Standings](screenshots/standings.png)

---

## 🐛 Known Issues

- None at the moment! 🎉

---

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Built with ❤️ and ⚽ by [Your Name]**
