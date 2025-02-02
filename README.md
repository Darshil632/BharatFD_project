# FAQ Management System

A full-stack FAQ management system built with React, Node.js, Express, MongoDB, and Redis. This application allows users to create, update, delete, and manage frequently asked questions (FAQs).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, update, and delete FAQs
- Translation of FAQs to multiple languages
- Caching with Redis for faster performance
- Responsive design for various screen sizes

## Technologies Used

- **Frontend:**
  - React
  - Axios
  - CSS for styling
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Redis for caching
- **Tools:**
  - Postman for API testing
  - Dotenv for environment variables

## Installation

### Prerequisites

- Node.js (version 14 or later)
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)

### Steps

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/faq-management-system.git
    cd faq-management-system
    ```

2. **Install Dependencies for Backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Install Dependencies for Frontend:**

    ```bash
    cd ../faq-frontend
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    MONGO_URI=mongodb://localhost:27017/your-database-name
    REDIS_URL=redis://username:password@hostname:port
    ```

5. **Run the Backend Server:**

    ```bash
    cd backend
    node server.js
    ```

6. **Run the Frontend Application:**

    ```bash
    cd ../faq-frontend
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend application.
2. Use the interface to create, update, and delete FAQs.
3. The backend API will handle all CRUD operations and translations.

## API Endpoints

### Base URL
http://localhost:3000/api/faqs


### Endpoints

- **GET /api/faqs**: Get all FAQs.
- **POST /api/faqs**: Create a new FAQ.
- **PUT /api/faqs/:id**: Update an existing FAQ.
- **DELETE /api/faqs/:id**: Delete an FAQ.

### Request and Response Formats

#### Create a New FAQ

- **Request:**

    ```json
    {
      "question": "What is Node.js?",
      "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
    }
    ```

- **Response:**

    ```json
    {
      "message": "FAQ Created",
      "faq": {
        "_id": "605c72b18f1a4b5244e5d1b3",
        "question": "What is Node.js?",
        "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
        "translations": {
          "hi": {
            "question": "Node.js क्या है?",
            "answer": "Node.js एक जावास्क्रिप्ट रनटाइम है जो Chrome के V8 जावास्क्रिप्ट इंजन पर आधारित है।"
          },
          "bn": {
            "question": "Node.js কি?",
            "answer": "Node.js একটি জাভাস্ক্রিপ্ট রানটাইম যা Chrome এর V8 জাভাস্ক্রিপ্ট ইঞ্জিনে নির্মিত।"
          }
        },
        "createdAt": "2021-03-25T12:34:56.789Z",
        "updatedAt": "2021-03-25T12:34:56.789Z"
      }
    }
    ```

## Environment Variables

- **MONGO_URI**: The MongoDB connection URI.
- **REDIS_URL**: The Redis connection URI.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
