# Blog-Express

Blog-Express is a web application built with Node.js and Express.js for creating and managing blogs. It allows users to register, login, create, read, and comment on blogs.

## Key Features

- **User authentication:** Users can register, login, and logout securely.
- **Create blogs:** Authenticated users can create, edit, and delete their blogs.
- **Comments:** Comments section is added for each blog for users to read. Only registered users can add a comment on the blog.
- **Frontend Interface:** Includes a simple web interface created with the help of ejs and bootstrap for users to interact.

## Dependencies

- **cookie-parser**
- **dotenv**
- **ejs:** `ejs` is used to generate the server side rendered pages.
- **express:** Fast, unopinionated web framework for Node.js.
- **jsonwebtokens:** JSON web tokens used for authentication and authorization.
- **mongoose:** The Database choosen is MongoDB, the repository uses `mongoose` as database driver.
- **multer:** File uploads (like: blog's cover image) are handled using `multer`.

## Usage

1. Clone the repository:
   ```
   git clone https://github.com/vaibhav-goklani/Blog-Express.git
   ```
2. Navigate to the project directory:
   ```
   cd Discord-Bot
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Configure environment variables. Create a `.env` file in the root directory and add the following variables:
    ```
    MONGODB_URI = <your_mongodb_connection_string>

    API_KEY = <your_google_generative_ai_api_key>
    ```
5. Start the server:
   ```
   npm start
   ```

## Note:

- Ensure you have MongoDB installed and running. Replace `your_mongodb_connection_string` with your MongoDB connection URI.

## Author

[Vaibhav Goklani](https://github.com/vaibhav-goaklani)