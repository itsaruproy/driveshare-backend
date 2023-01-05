# DriveShare Backend

The DriveShare backend is a Node.js server that powers the [DriveShare frontend](https://github.com/itsaruproy/driveshare-frontend) application. It uses the [Express.js](https://expressjs.com/) framework, [MongoDB](https://www.mongodb.com/) for storing user data, and the Google Cloud Console's [Drive API v3](https://developers.google.com/drive/api/v3/) for uploading files to Google Drive.

## Prerequisites

Before you can use the backend, you will need to set up an OAuth app and obtain the necessary access and refresh tokens. Follow the instructions in the [Google Drive API documentation](https://developers.google.com/drive/api/guides/authentication) to create an OAuth app and obtain the tokens.

## Getting Started

To get started with the backend, follow these steps:

1. Clone the repository: `git clone https://github.com/itsaruproy/driveshare-backend.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following environment variables:
   - `CONNECTIONSTRING`: The connection string for your MongoDB database.
   - `GOOGLE_CLIENT_ID`: The client ID of your OAuth app.
   - `GOOGLE_CLIENT_SECRET`: The client secret of your OAuth app.
   - `GOOGLE_REFRESH_TOKEN`: The refresh token obtained during the OAuth app setup.
   - `JWTSECRET`: A random and secure phrase for JWT authentication.
   - `PORT`: The port on which the server will be reachable (for example `4000`).
4. Start the server: `npm start`

The server will be running at http://localhost:4000/.

## Future Features

- Uploading files by splitting them into smaller chunks, allowing for pausing and resuming of the upload process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

