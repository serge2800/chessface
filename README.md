# ChessFace

A casual live chess MVP where players create accounts, upload a profile picture, enter a random matchmaking queue, play a timed chess game, and connect through video chat.

## Features

- Sign up and log in with username/password
- Optional profile picture upload
- Starting rating of 1000 with Elo-style updates after each game
- Random matchmaking by time control
- Time controls: `3+0`, `5+0`, `10+0`
- Server-validated legal chess moves with `chess.js`
- Live game sync with Socket.IO
- WebRTC video/audio signaling between matched players
- Resign, offer draw, accept draw, and decline draw
- Automatic results for checkmate, draw, timeout, resignation, and disconnect

## Run Locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

To test matchmaking on one computer, open the site in two different browsers or one normal window and one private/incognito window. Create two accounts, choose the same time control, and click **Seek game** on both.

## Notes

This is a functional MVP, not production infrastructure yet. Accounts and users are stored in `data/users.json`, uploaded avatars are stored in `uploads/`, and active sessions/games live in server memory.

For production, the next important steps are PostgreSQL or Supabase storage, persistent sessions, email/password reset, TURN server support for reliable video chat, anti-abuse reporting/blocking, and deployment behind HTTPS.
