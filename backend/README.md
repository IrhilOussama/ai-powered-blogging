# My Node.js Project

This project is a Node.js application that serves images, retrieves blogs and categories from a MySQL database, and provides RESTful routes for managing blogs and categories.

## Project Structure

```
my-nodejs-project
├── public
│   └── images
│       └── myimage.jpg
├── src
│   ├── controllers
│   │   ├── blogController.js
│   │   └── categoryController.js
│   ├── models
│   │   ├── blogModel.js
│   │   └── categoryModel.js
│   ├── routes
│   │   ├── blogRoutes.js
│   │   └── categoryRoutes.js
│   ├── app.js
│   └── db.js
├── package.json
└── README.md
```

## Features

- Serve images from the `/public/images` directory at the route `/api/images/myimage.jpg`.
- Retrieve, create, update, and delete blogs.
- Retrieve, create, update, and delete categories.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-nodejs-project
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Blogs
- `GET /api/blogs` - Retrieve all blogs
- `GET /api/blogs/:id` - Retrieve a blog by ID
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog by ID
- `DELETE /api/blogs/:id` - Delete a blog by ID

### Categories
- `GET /api/categories` - Retrieve all categories
- `GET /api/categories/:id` - Retrieve a category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category by ID
- `DELETE /api/categories/:id` - Delete a category by ID

## License

This project is licensed under the MIT License.