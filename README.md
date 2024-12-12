# GraphQL Real-Time API with WebSockets

This project is a **GraphQL API** with real-time features using **WebSockets** and **Socket.IO**. It also integrates **JWT authentication** and uses a **PostgreSQL** database for persistence. The project is built with **Node.js**, **Express**, and **TypeScript**.

---

## Features

- **GraphQL API**: Supports basic CRUD operations with a `User` resource.
- **Real-time Communication**: Uses **WebSockets** via **Socket.IO** for bidirectional communication.
- **JWT Authentication**: Secure endpoints using JWT tokens.
- **Subscriptions**: Real-time updates using GraphQL subscriptions.
- **PostgreSQL Database**: Uses PostgreSQL for data storage with `pg-promise` ORM.
- **Docker**: Includes a `docker-compose` setup for PostgreSQL.

---

## Table of Contents

1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Docker Setup](#docker-setup)
6. [Testing the API](#testing-the-api)
7. [Postman Collection](#postman-collection)
8. [API Documentation](#api-documentation)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/graphql-api-real-time.git
cd graphql-api-real-time
```

### 2. Install dependencies

Make sure you have Node.js (v20.18.0) installed. Then, run:

```bash
npm install
```

This installs all the necessary dependencies, including:

- `express` for the server.
- `apollo-server-express` for GraphQL integration.
- `pg-promise` for PostgreSQL interaction.
- `jsonwebtoken` for JWT-based authentication.
- `socket.io` for WebSocket communication.
- `graphql-subscriptions` for real-time subscriptions.

---

## Environment Setup

Create a `.env` file at the root of the project and add the following environment variables:

```env
PORT=4000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=saurabh-development-db
DB_PASSWORD=postgres
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

**Explanation:**

- `PORT`: The port on which the server will run.
- `DB_*`: PostgreSQL database credentials.
- `JWT_SECRET`: A secret key used for signing JWT tokens.

---

## Database Setup

### 1. PostgreSQL

If you're using Docker (recommended), you can start a PostgreSQL container using the provided `docker-compose.yml` file. This file will set up PostgreSQL with the credentials defined in your `.env` file.

Run:

```bash
docker-compose up
```

This will start a PostgreSQL instance at `localhost:5432` with the credentials defined in the `.env` file.

### 2. Create the Users Table

Run the following SQL to create the `users` table in the PostgreSQL database:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

You can run this query using a PostgreSQL client like **pgAdmin** or through the `psql` command line tool.

---

## Running the Application

### 1. Start the Application

Once your environment is set up and PostgreSQL is running, you can start the application using:

```bash
npm start
```

This will start the server on port `4000`.

The GraphQL API will be available at `http://localhost:4000/graphql`.

The WebSocket server will also be available on the same port, allowing clients to connect to real-time communication channels.

---

## Docker Setup

To set up the PostgreSQL service via Docker, make sure you have Docker installed, and run the following:

```bash
docker-compose up
```

This will start the PostgreSQL database in a container. The credentials will be the same as the ones defined in the `.env` file.

---

## Testing the API

### 1. GraphQL Queries and Mutations

You can use **GraphQL Playground** or any other GraphQL client to test the queries and mutations.

#### Example Queries

1. **Login (Authentication)**

```graphql
mutation {
  login(email: "test@domain.com", password: "password") {
    token
  }
}
```

2. **Add a User (Mutation)**

```graphql
mutation {
  addUser(name: "John Doe", email: "john.doe@example.com", password: "password") 
}
```

3. **Get All Users (Query)**

```graphql
query {
  users {
    id
    name
    email
  }
}
```

#### Example Subscription

```graphql
subscription {
  userAdded {
    id
    name
    email
  }
}
```

This will listen for any new users added to the system and return the updated user.

### 2. WebSocket Communication

Use a WebSocket client like **Postman** or **Socket.IO** to test real-time messaging.

```js
const socket = io('http://localhost:4000');
socket.emit('joinRoom', 'room1'); // Join a specific room
socket.emit('message', { room: 'room1', text: 'Hello, Room 1!' }); // Send a message
socket.on('message', (data) => console.log(data)); // Listen for messages
```

---

## Postman Collection

The Postman collection contains all the GraphQL queries and mutations, as well as WebSocket examples for testing. Download it from the root directory of the project (`Postman_Collection.json`).

---

## API Documentation

This API supports:

- **Queries**: `users` - Retrieve all users.
- **Mutations**:
  - `addUser`: Add a new user.
  - `login`: Login with email and password to receive a JWT token.
- **Subscriptions**:
  - `userAdded`: Get real-time updates when a new user is added.

### Authentication

- JWT authentication is required for access to protected routes. Use the `login` mutation to get a JWT token, and include the token in the `Authorization` header (e.g., `Bearer <token>`).

### WebSocket Communication

- WebSocket is used for real-time communication. Clients can join specific rooms and receive messages broadcasted to them.

---

## Contributing

Feel free to fork this repository and make improvements or fix issues. To contribute, simply follow these steps:

1. Fork the repository.
2. Clone your fork: `git clone https://github.com/your-username/graphql-api-real-time.git`
3. Create a new branch for your feature or fix: `git checkout -b my-feature`
4. Make your changes and commit: `git commit -m "Add my feature"`
5. Push your changes: `git push origin my-feature`
6. Submit a pull request.



Let me know if you need further help!