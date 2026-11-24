# Athena Desktop Exam Application

Athena is an Electron and React desktop application for preparing a device before an exam and monitoring exam-related device state. The app provides an exam readiness checklist, a timer, camera capture, native exam controls, and local file-storage utilities.

## Features

- Camera permission and live preview
- Microphone permission check without audio recording
- Screen-sharing permission and live preview
- Network connection status
- Fullscreen readiness check
- Exam timer started through the Electron main process
- Automatic updates when camera or screen-sharing access ends
- Camera snapshots captured every 5 seconds after the exam starts
- Native Electron application menu with exam rules and exit controls
- Native dialogs for rules and troubleshooting tools
- Copy shortcut blocked with a warning dialog
- Development and production builds for macOS using Electron Forge

## Tech Stack

- [Electron](https://www.electronjs.org/) - Desktop application shell
- [React](https://react.dev/) - Renderer UI
- [Vite](https://vite.dev/) - React development and build tool
- [Electron Forge](https://www.electronforge.io/) - Packaging and macOS DMG generation
- [ESLint](https://eslint.org/) - JavaScript and React linting

## Project Structure

```text
Athena-Desktop-Project/
├── app/
│   ├── app.js              # Electron main process
│   ├── preload.js          # Secure renderer-to-main IPC bridge
│   ├── user-camera-snap/   # Camera snapshots
│   └── user-screen-snap/   # Reserved for screen captures
├── src/
│   ├── App.jsx             # Exam readiness interface
│   ├── App.css             # Application styles
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── dist/                   # Production renderer build
├── package.json
└── vite.config.js
```

## Requirements

- Node.js 18 or newer
- npm
- macOS with a camera and microphone for complete device testing
- Electron-supported screen-capture permissions

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ahmad-Ibni-Shafi/Athena-Desktop-Project.git
cd Athena-Desktop-Project
npm install
```

## Running the Application

Build the renderer and start Electron:

```bash
npm run electron
```

For Vite and Electron development, run the development server in one terminal:

```bash
npm run dev
```

Then start Electron in a second terminal with the Vite server URL:

```bash
VITE_DEV_SERVER_URL=http://localhost:5173 npm run electron
```

The Electron window loads the Vite development server when `VITE_DEV_SERVER_URL` is set. Otherwise, it loads the production files from `dist/`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production renderer build in `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the Vite production build |
| `npm run electron` | Build the renderer and launch Electron |
| `npm run package` | Package the application with Electron Forge |
| `npm run make` | Create platform-specific distribution files |

## Exam Readiness Flow

The **Begin exam** button is enabled only when all required checks pass:

1. Camera access is allowed.
2. Microphone access is available.
3. Screen sharing is active.
4. The application is in fullscreen mode.
5. The browser reports that the device is connected to a network.

After the exam begins:

- The exam timer updates once per second.
- The renderer is asked for a camera snapshot every 5 seconds.
- Camera snapshots are saved as JPEG files in `app/user-camera-snap/`.
- The app prevents copy shortcuts and displays a warning.

The network status is based on the browser's `navigator.onLine` value. It indicates whether the browser reports connectivity, not that a particular exam server or internet endpoint is reachable.

## Permissions

On macOS, grant the following permissions from **System Settings** when prompted:

- Camera
- Microphone
- Screen & System Audio Recording

Microphone permission is checked once and the temporary stream is stopped immediately. The application does not currently record or store microphone audio.

## Captured Data

Camera snapshots are written locally beneath:

```text
app/user-camera-snap/
```

The screen-capture folder is located at:

```text
app/user-screen-snap/
```

The application stores captured data on the local machine. A production deployment should define retention, encryption, consent, access control, and deletion policies before using real exam recordings.

## Packaging

Package the application:

```bash
npm run package
```

Create a distributable DMG or other configured installer:

```bash
npm run make
```

Electron Forge output is written to the platform-specific output directories under the project.

## Development Notes

- The Electron main process is in `app/app.js`.
- The preload bridge is in `app/preload.js`.
- Renderer features should communicate with Electron through `window.athena`.
- The Electron window enables DevTools so code and network behavior can be inspected during development.
- Utility tools are available under **Troubleshooting & manual tools** in the renderer.

## License

No license is currently specified for this project.
