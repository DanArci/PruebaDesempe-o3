#Workspace Reservation System SPA

## General Description

This project is a basic Single-Page Application (SPA) built with JavaScript, CSS, and a JSON server.

The application simulates a workspace booking system where users can make reservations. Admin users can view these reservations.

Planned Features:

- Edit rejected reservations
- Edit reservations as an admin
- Secure login
- Secure navigation between routes
- Views for managing workspaces

---

## Technologies used

- JavaScript ES6+
- Vite
- TailwindCSS
- JSON Server
- Concurrently
- HTML5
- CSS3

---

## Folder structure

```txt
├── db.json
├── index.html
├── package.json
├── package-lock.json
├── public
│   ├── favicon.svg
│   └── icons.svg
├── README.md
├── src
│   ├── api
│   │   └── http.js
│   ├── assets
│   │   ├── hero.png
│   │   ├── javascript.svg
│   │   └── vite.svg
│   ├── components
│   │   ├── ReservationCard.js
│   │   └── Sidebar.js
│   ├── controllers
│   │   ├── home.controller.js
│   │   └── login.controller.js
│   ├── main.js
│   ├── router
│   │   └── router.js
│   ├── services
│   │   └── reservation.service.js
│   ├── style.css
│   ├── utils.js
│   └── views
│       ├── homeView.js
│       ├── loginView.js
│       └── notFound.js
└── vite.config.js
```

---

## Explanation of the architecture

### Components

It contains reusable interface components.

Example:

```txt
components/
└── Sidebar.js
```

The Sidebar can be reused in different views and centralizes the main navigation of the system.

### Controllers

They contain the business logic and application events.

Example:

```txt
controllers/
└── login.controller.js
```

### Views

They represent the application screens.

At the moment:

- Login
- Home
- Not Found (404)

Each view returns an HTML template that is dynamically rendered within the main container.

### Router

Manages internal navigation of the SPA.

Responsibilities:

- Render views
- Manage routes
- Redirect users
- Show 404 pages

### Utils

It contains reusable auxiliary functions.

Currently:

- Save session
- Log in
- Delete session
- Validate authentication

---

## API

The application uses JSON Server to simulate a REST API.

Example

```json
{
  "id": 1,
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

---

## Configuración del entorno

Install dependencies:

```bash
npm install
```

Execute project:

```bash
npm run dev
```

This command simultaneously raises:

- Vite
- JSON Server

thanks to the use of Concurrently.

---


## Credenciales de prueba

Administrador:

```txt
admin@test.com
123456
```

Usuario:

```txt
user@test.com
123456
```

---

## Current features

- Functional Login
- API Consumption via JSON Server
- Session Persistence with LocalStorage
- Logout
- SPA Router
- Basic Route Protection
- Reusable Sidebar
- Custom 404 Page
- TailwindCSS Configuration
- Vite Configuration
- Creation of Reservations
