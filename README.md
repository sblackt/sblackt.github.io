# Board Game Scheduler 🎲

A modern, real-time scheduling application for organizing board game nights with friends. Built with React, TypeScript, and Firebase for seamless collaboration.

## Features

- **No Login Required** - Simple name-based participation
- **Real-time Updates** - See responses from friends instantly
- **Editable Events** - Add dates and times to existing events
- **Event History** - Archive completed events and keep track of past game nights
- **Best Time Suggestions** - Automatically highlights the most popular time slots
- **Mobile Responsive** - Works great on phones and tablets
- **Beautiful UI** - Modern, intuitive interface

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: CSS3 with modern design patterns
- **Backend**: Firebase Firestore (real-time database)
- **Deployment**: GitHub Pages ready

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd boardgame-scheduler
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General
5. Scroll down to "Your apps" and click the web icon (</>)
6. Register your app and copy the config

### 3. Configure Firebase

Replace the placeholder config in `src/firebase.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Firestore Security Rules

In your Firebase Console, go to Firestore Database > Rules and set these rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For development only
    }
  }
}
```

**⚠️ Important**: For production, you should implement proper security rules.

### 5. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

### 6. Deploy to GitHub Pages

1. Add this to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Deploy:
```bash
npm run deploy
```

## How to Use

### Creating an Event
1. Click "New Event" on the home page
2. Fill in the event title and description
3. Add participant names
4. Select available dates (next 14 days)
5. Choose time slots (6 PM - 11:30 PM)
6. Click "Create Event"

### Responding to Availability
1. Click on an event to view details
2. Enter your name in the input field
3. Click ✓ for available times, ✗ for unavailable times
4. Your responses update in real-time for everyone

### Managing Events
- **Mark Complete**: Archive an event after the game night
- **Archive**: Hide events from the main list
- **Edit**: Add more dates/times to existing events

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── EventList.tsx   # List of all events
│   ├── EventDetail.tsx # Event details and availability grid
│   ├── CreateEvent.tsx # Event creation form
│   └── *.css          # Component styles
├── services/
│   └── firebaseService.ts # Firebase operations
├── types.ts           # TypeScript interfaces
├── firebase.ts        # Firebase configuration
└── App.tsx           # Main application component
```

## Customization

### Adding Custom Time Slots
Edit the `timeOptions` array in `CreateEvent.tsx`:

```typescript
const timeOptions = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  // Add your custom times here
];
```

### Changing the Date Range
Modify the `generateDateOptions` function in `CreateEvent.tsx`:

```typescript
for (let i = 0; i < 14; i++) { // Change 14 to your desired number of days
  const date = addDays(today, i);
  options.push(format(date, 'yyyy-MM-dd'));
}
```

### Styling
The app uses CSS custom properties and modern design patterns. Main styles are in:
- `src/App.css` - Global styles and utilities
- `src/components/*.css` - Component-specific styles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own board game groups!

## Support

If you run into any issues:
1. Check the Firebase configuration
2. Ensure Firestore is enabled
3. Verify security rules allow read/write access
4. Check the browser console for errors

Happy gaming! 🎮
