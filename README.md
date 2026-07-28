

https://github.com/user-attachments/assets/bceb5072-1c80-4190-86da-1b6d4194c3c5

# Project Management React

This is a project management focused React application. It includes user authentication, project filtering/listing, project details, task management, and reporting screens.

## Features

- User authentication (Login / Signup)
- Role-based authorization (read / modify)
- Project filtering and pagination
- Add, update, and delete projects
- Project detail view
- Add, update, and delete tasks with subtask visibility
- Summary report and chart visualization
- Modern and responsive UI built with Material UI

## Tech Stack

- React 19
- TypeScript
- React Router DOM
- Material UI (MUI) + MUI Icons
- MUI X Date Pickers / Date Range Picker
- Day.js
- Recharts
- CRA (react-scripts)
- Docker + Nginx (production image)

## Project Structure

```text
src/
	components/
		Login/
		Navbar/
		Project/
		Report/
		SignUp/
		Task/
		PieChart/
	Contexts/
	Models/
	services/
```

## Environment Variables

The application reads the API URL from the `.env` file:

```env
REACT_APP_BASE_URL=http://localhost:3000
```

Note: Create React App reads environment variables at build time. Restart the app after making any changes.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open in your browser:

```text
http://localhost:3000
```

## Run with Docker

The project is built using the existing `dockerfile` and served via Nginx.

1. Build the image and start the app with Compose:

```bash
docker compose up --build
```

2. Access the application:

```text
http://localhost:3000
```

This setup is defined in [docker-compose.yml](docker-compose.yml) with the `3000:80` port mapping.

## NPM Scripts

- `npm start`: Run development server
- `npm run build`: Create production build
- `npm test`: Run tests

## API Integration

The frontend communicates with these endpoint groups:

- `/api/user/*`
- `/api/project/*`
- `/api/task/*`

Make sure your backend service is running and `REACT_APP_BASE_URL` is configured correctly.

## Contributing

You can open issues and submit pull requests. For major changes, it is recommended to open an issue first and discuss the approach.

## License

No license is currently defined in this repository. You can add a `LICENSE` file if needed.
