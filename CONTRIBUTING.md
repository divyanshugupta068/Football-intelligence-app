# Contributing to Football Intelligence App

First off, thank you for considering contributing to Football Intelligence App! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### 🔧 Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## Development Setup

1. **Clone your fork**
```bash
git clone https://github.com/your-username/football-intelligence-app.git
cd football-intelligence-app
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Set up environment variables**
```bash
# Create .env in backend directory
NEWS_API_KEY=your_key
FOOTBALL_API_KEY=your_key
```

4. **Start development servers**
```bash
# Terminal 1 - Backend
cd backend
node index.js

# Terminal 2 - Frontend
cd frontend
npm start
```

## Coding Standards

### JavaScript/React
- Use **functional components** with hooks
- Follow **ES6+** syntax
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep components **small and focused**
- Use **PropTypes** or TypeScript for type checking

### CSS
- Use the **theme system** (`theme.js`)
- Follow **BEM naming** convention
- Keep styles **modular**
- Use **CSS variables** for colors

### Git Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Examples:
```
✅ Add player comparison feature
✅ Fix position filter bug in SquadsPage
✅ Update README with new features
✅ Refactor theme system for better maintainability
```

## Project Structure

```
football-intelligence-app/
├── backend/          # Node.js/Express server
│   ├── data/        # JSON databases
│   └── index.js     # Main server file
├── frontend/         # React application
│   └── src/         # Source files
└── README.md        # Documentation
```

## Adding New Features

### Adding a New Player
1. Add player data to `backend/data/enhanced_players.json`
2. Add FIFA attributes to `backend/data/fifa_attributes.js`
3. Test in the app

### Adding a New Page
1. Create component in `frontend/src/`
2. Add route in `App.js`
3. Add navigation link if needed
4. Update README

### Adding a New API Endpoint
1. Add endpoint in `backend/index.js`
2. Document in README
3. Test with frontend

## Testing

Before submitting a PR:
- ✅ Test all features work
- ✅ Check responsive design
- ✅ Verify no console errors
- ✅ Test on different browsers
- ✅ Check loading states
- ✅ Verify error handling

## Code Review Process

1. **Automated checks** run on all PRs
2. **Maintainer review** within 48 hours
3. **Address feedback** if requested
4. **Merge** when approved

## Community

- Be respectful and inclusive
- Help others learn and grow
- Give constructive feedback
- Celebrate contributions

## Questions?

Feel free to open an issue with the `question` label!

---

**Thank you for contributing! ⚽❤️**
