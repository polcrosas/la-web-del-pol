# MTG Victory Tracker - Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "mtg-tracker")
4. Disable Google Analytics (optional, not needed for this)
5. Click "Create project"

## Step 2: Set up Realtime Database

1. In your Firebase project, click "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose a location (e.g., "United States" or closest to you)
4. Start in **test mode** for now (we'll secure it later)
5. Click "Enable"

## Step 3: Get Your Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register your app with a nickname (e.g., "mtg-web")
6. Copy the `firebaseConfig` object

## Step 4: Update Your Code

1. Open `src/firebase.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 5: Secure Your Database (Important!)

1. Go back to "Realtime Database" in Firebase Console
2. Click the "Rules" tab
3. Replace the rules with:

```json
{
  "rules": {
    "mtg": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Click "Publish"

**Note:** These rules allow anyone to read/write. For a private tracker, you'd want to add authentication. But for a simple personal tracker, this works.

## Step 6: Test It!

1. Make sure `npm install firebase` has completed
2. Start your dev server: `npm start`
3. Navigate to `/mtg`
4. Click "pol wins" or "dome wins"
5. Check Firebase Console > Realtime Database to see the data appear!

## How It Works

- Data is stored in Firebase Realtime Database at path `/mtg`
- Changes sync in real-time across all devices
- Works on phone, tablet, desktop - anywhere with internet
- Free tier includes 1GB storage and 10GB/month bandwidth (more than enough!)

## Troubleshooting

**Error: "Failed to load data"**
- Check that your Firebase config in `src/firebase.js` is correct
- Make sure Realtime Database is enabled in Firebase Console
- Check browser console for specific error messages

**Data not syncing**
- Check your internet connection
- Verify database rules allow read/write access
- Check Firebase Console > Realtime Database to see if data is there

## Optional: Add Authentication

If you want to make it private (only you and Dome can access):

1. Enable Email/Password authentication in Firebase Console
2. Add login page
3. Update database rules to require authentication

Let me know if you need help with this!
