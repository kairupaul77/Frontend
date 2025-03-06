## Frontend

# Book-A-Meal (Frontend)

Book-A-Meal is an application that allows customers to make food orders and helps the food vendor know what the customers want to eat.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
3. [Features](#features)
4. [API Integration](#api-integration)
5. [Folder Structure](#folder-structure)
6. [Development](#development)
7. [Testing](#testing)
8. [License](#license)

## Technologies Used

- *Frontend Framework:* React
- *Build Tool:* Vite
- *Styling:* CSS and Tailwind CSS
- *Routing:* React Router
- *State Management:* React Context API
- *Authentication:* JWT (JSON Web Tokens) for secure authentication

## Project Setup

### Prerequisites

- Node.js (>= 16.x)
- npm (package manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-a-meal-frontend.git
```

2. Install dependencies:

```bash
cd book-a-meal-frontend
npm install
```

or if you're using Yarn:

```bash
yarn install
```

3. Start the development server:

```bash
npm run dev
```

or if you're using Yarn:

```bash
yarn dev
```

This will start the Vite development server, and you can access the app in your browser at http://localhost:3000 (or the port specified by Vite).

## Features

The Book-A-Meal app includes the following key features:

1. **User Authentication**
   - Users can create an account and log in using their credentials.
   - JWT authentication is used for secure login and session management.

2. **Admin (Caterer) Management**
   - Admin users (caterers) can add, modify, and delete meal options. Examples include:
     - Beef with rice
     - Beef with fries
     - Chicken with rice
   - Admin users can create meal options, and they will appear in the list of available meal choices.

3. **Admin Menu Setup**
   - Admin users can set up a menu for a specific day by selecting from the available meal options.
   - The admin can choose from a list of available meals and publish the menu for the selected day.

4. **Customer Meal Selection**
   - Authenticated users (customers) can view the menu for a specific day.
   - Customers can select an option from the menu for that day.

5. **Customer Meal Modification**
   - Authenticated users can change their meal choice at any time before the order is finalized.

6. **Admin View Orders**
   - Admin users can see the orders made by customers along with details such as the customer's name, selected meal, and order status.

## API Integration

This frontend application communicates with a backend API (typically built with Flask) for user authentication, meal management, and order processing. Ensure that the backend is running and accessible for full functionality.

**Base API URL:** `http://localhost:5000/api/`

**Endpoints:**

- `/auth/signup` - For user registration.
- `/auth/login` - For user login.
- `/meals` - For managing meal options.
- `/menu` - For creating and fetching the daily menu.
- `/orders` - For customer order management.

### Example Request

```bash
POST /auth/login
{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

### Handling Responses

The frontend will handle API responses and display appropriate messages (success or error) to the user.

## Folder Structure

Here is an overview of the project structure:

```bash
/book-a-meal-frontend
├── /src
│   ├── /assets           # Static assets like images, logos
│   ├── /components       # Reusable UI components
│   ├── /context          # React context API for state management
│   ├── /hooks            # Custom hooks
│   ├── /pages            # React pages (e.g., Home, Login, AdminDashboard)
│   ├── /services         # API calls to the backend
│   ├── /styles           # Global styles (CSS/SCSS)
│   ├── /utils            # Helper functions
│   └── /App.jsx          # Main React App Component
├── /public               # Public assets
│   └── index.html        # HTML entry point
└── vite.config.js        # Vite configuration file
```

## Development

To contribute to the development of this project, follow these steps:

1. Create a new feature branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make changes to the codebase as required.

3. Commit your changes:

```bash
git add .
git commit -m "Your commit message"
```

4. Push the branch to the remote repository:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request (PR) to merge your changes into the main branch.

## Testing

Ensure that the frontend application is tested using:

- Unit tests for individual components (using Jest or Mocha).
- Integration tests for ensuring API endpoints work properly with the frontend.

To run tests:

```bash
npm run test
```

or

```bash
yarn test
```

## License

This project is licensed under the# MIT License - see the LICENSE file for details.

---

### Authors:
- **Paul Kairu**
- **Anthony Mwaura**
- **Faith Wangari**

Thank you for using Book-A-Meal. If you have any questions or need further assistance, please feel free to reach out!
## live link
https://pafaan-frontend.vercel.app/
## Demo link
https://www.youtube.com/live/wMjpn8XArHo


