# Ayyappa Devotional Music App - Backend Contracts (Telugu Focus)

## Overview
This document outlines the API contracts and integration plan for converting the frontend-only Telugu Ayyappa devotional music app into a full-stack application with YouTube integration. The app primarily focuses on Telugu devotional content featuring legendary artists like S.P. Balasubrahmanyam, K.J. Yesudas, and Parupalli Ranganath.

## Current Frontend Mock Data (to be replaced)
- **mockData.js**: Contains featured songs, playlists, categories, and recently played data
- **Mock YouTube IDs**: Currently using sample YouTube video IDs for devotional songs
- **Static playlists**: Hardcoded playlist data needs to be dynamic

## API Contracts

### 1. Songs API
```
GET /api/songs
- Returns: List of all devotional songs
- Response: { songs: [{ id, title, artist, album, duration, image, youtubeId, category, language }] }

GET /api/songs/search?q={query}
- Returns: Search results for songs by title, artist, or album
- Response: { songs: [...], total: number }

POST /api/songs
- Creates: New song entry with YouTube URL
- Body: { title, artist, album, youtubeUrl, category, language }
- Response: { song: {...}, message: "Song added successfully" }

GET /api/songs/category/{category}
- Returns: Songs filtered by category (bhajans, keerthanams, etc.)
```

### 2. Playlists API
```
GET /api/playlists
- Returns: User playlists
- Response: { playlists: [{ id, title, description, image, songCount, songs[] }] }

POST /api/playlists
- Creates: New playlist
- Body: { title, description, songs[] }

PUT /api/playlists/{id}/songs
- Updates: Add/remove songs from playlist
- Body: { songId, action: "add"|"remove" }
```

### 3. YouTube Integration API
```
POST /api/youtube/extract
- Extracts: Video metadata from YouTube URL
- Body: { youtubeUrl }
- Response: { title, duration, thumbnail, videoId }

GET /api/youtube/embed/{videoId}
- Returns: YouTube embed configuration for player
```

### 4. User Preferences API
```
GET /api/user/recently-played
- Returns: User's recently played songs

POST /api/user/like-song
- Body: { songId }
- Toggles: Like/unlike song status

GET /api/user/liked-songs
- Returns: User's liked songs collection
```

## Backend Implementation Plan

### 1. Database Schema (MongoDB)
```javascript
// Songs Collection
{
  _id: ObjectId,
  title: String,
  artist: String,
  album: String,
  duration: String,
  image: String,
  youtubeId: String,
  youtubeUrl: String,
  category: String, // bhajans, keerthanams, stotrams, mantras
  language: String, // telugu, malayalam, tamil (telugu as primary)
  createdAt: Date,
  addedBy: ObjectId // User who added the song
}

// Playlists Collection
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String,
  songs: [ObjectId], // References to songs
  createdBy: ObjectId,
  isPublic: Boolean,
  createdAt: Date
}

// User Interactions Collection
{
  _id: ObjectId,
  userId: ObjectId,
  songId: ObjectId,
  action: String, // play, like, add_to_playlist
  timestamp: Date
}
```

### 2. YouTube Integration Strategy
- **Extract Video ID** from YouTube URLs using regex
- **Fetch metadata** using YouTube API or web scraping
- **Store thumbnail** URLs and video information
- **Embed player** using YouTube iframe API for seamless playback

### 3. Frontend Integration Changes
- Replace mock data imports with API calls
- Add loading states and error handling
- Implement YouTube URL submission form
- Add real-time search with debouncing
- Connect music player to actual YouTube embeds

### 4. Key Features to Implement
1. **YouTube URL Upload**: Form to add new devotional songs via YouTube links
2. **Real-time Search**: Backend-powered search across all songs
3. **Dynamic Playlists**: User-created playlists with CRUD operations
4. **Recently Played**: Track user listening history
5. **Liked Songs**: Personal collection management
6. **Categories Filter**: Filter songs by devotional type and language

## Implementation Priority
1. **Phase 1**: Basic CRUD for songs and playlists
2. **Phase 2**: YouTube integration and metadata extraction
3. **Phase 3**: User interactions (likes, recently played)
4. **Phase 4**: Advanced search and recommendations

## Mock Data Replacement Strategy
- **featuredSongs** → `/api/songs` endpoint
- **playlists** → `/api/playlists` endpoint
- **categories** → Static categories with dynamic song counts
- **recentlyPlayed** → `/api/user/recently-played` endpoint

This contract ensures seamless migration from mock data to a fully functional devotional music platform with YouTube integration.