# MUSIFY

## Overview

MUSIFY is a command-line music player developed using Node.js. It allows users to play and control locally stored music directly through the terminal.

## Features

- Play songs
- Pause the currently playing song
- Skip to the next song
- Display the list of available songs
- Control music playback through the CLI

## Technologies Used

- Node.js
- JavaScript
- File System (`fs`)
- Command-Line Interface (CLI)

## Project Structure

MUSIFY/
│
├── songs/
│   └── *.mp3
│
├── player.js
└── README.md

## Usage

1. Place your `.mp3` files inside the `songs` folder.
2. Open the terminal in the project directory.
3. Run the following command:

node player.js

4. Select a song from the displayed list.
5. Use the available controls to play, pause, or skip songs.

## Controls

| Action | Description |
|---|---|
| Play | Plays the selected song |
| Pause | Pauses the current song |
| Skip | Plays the next song |
| Quit | Exits the application |

## Future Enhancements

- Volume control
- Previous song functionality
- Shuffle mode
- Repeat mode
- Playlist support
- Playback progress indicator

## Author

Ankan Mondal