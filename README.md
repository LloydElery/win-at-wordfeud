# Win at Wordfeud

This project was inspired by my girlfriend, who consistently wins at `Wordfeud`. In an effort to even the playing field, this application was developed to help me and other players find valid words based on the letters they have.

By inputting the letters provided by the game, this application helps users find possible words they can play. It also supports advanced features like tracking reported words, submitting new words, and admin functionalities.

## Project Stack

This project utilizes the [T3 Stack](https://create.t3.gg/), which includes:

- **Next.js** for building both the _frontend_ and _backend_.
- **React.js** for the _frontend_ interface.
- **PostgreSQL** as the _database_ to store words, user reports, and other relevant data.
- **PNPM** as the _package manager_ for efficient dependency management.
- **Vercel** for _deployment_ and hosting the application.
- **Clerk** for _authentication_ and user management, including role-based access control (RBAC).

This application is a T3 Stack project bootstrapped with `create-t3-app`.

## Features

- **Search Functionality**: Enter the letters you have, and the app will return a list of playable words including scores.
- **User Reports**: Users can report inappropriate or invalid words.
- **Admin Controls**: Admins have the ability to review, approve, or delete reported words.
- **Progressive Web App (PWA)**: The app can be installed on mobile devices for a native-like experience.

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (v16+)
- PostgreSQL (with a database set up)
- PNPM (for package management)

### Step-by-Step Guide

> 1. Clone the repository:
>
> ```bash
> git clone https://github.com/LloydElery/win-at-wordfeud.git
> cd win-at-wordfeud
> ```
>
> 2. Install dependencies:
>
> ```bash
> pnpm install
> ```
>
> 3.  Set up environment variables
>
> > Create an `.env.local` file in the root directory and att your `Vercel` variables:
>
> ```bash
> DATABASE_URL=your_postgres_connection_string
> NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
> CLERK_API_KEY=your_clerk_backend_api_key
> NEXT_PUBLIC_ADMIN=your_admin_id
> ```
>
> 4.  Run database migrations
>
> ```bash
> pnpm db:migrate
> ```
>
> 5.  Start a development server: `localhost`
>
> ```bash
> pnpm dev
> ```
>
> The application should be run on `http://localhost:3000`
>
> 6.  View and create your tables needed to run the application
>
> ```bash
> pnpm db:studio
> ```

### Setting up Adin User

Administrating the application is made easy with `Clerk`.
To set up admin users, follow the [Clerk guide for Role-Based Access Control (RBAC)](https://clerk.com/docs/guides/basic-rbac).
Assign the "admin" role to specific accounts through the Clerk dashboard.

> [Clerk Dokumentation | Set up for NextJS](https://clerk.com/docs/quickstarts/nextjs)

### API Documentation

#### Testing the API with Insomnia

To test the API, you can use [Insomnia](https://insomnia.rest/) or[Postman](https://www.postman.com/). Import the following collection into your tool of choice:

1. Set up a new workspace.
2. Create POST, GET, and DELETE requests for the available API routes.
3. Use the API endpoints defined above to test functionality.

#### Endpoints

> 1. **Search for words**
>    > Endpoint: `/api/search`
>    > Method: `POST`
>    > Description: _Find words that can be formd by any number of letter in any random order, input by user._
>    > Specifics: [Link to `/search` Endpoint](documentation.md#search)
> 2. **Sumbit a word**
>    > Endpoint: `/api/add-word`
>    > Method: `POST`
>    > Description: _Add a word to a separate database that can be included in the official searchengine, if a user is logged in and shooses to include `Community Words`._
>    > Specifics: [Link to `/add-word` Endpoint](documentation.md#add-word)
> 3. **Admin**
>    > Endpoint: `/api/admin`
>    > Methods: `POST`, `DELETE`
>    > Description: _Admin verification & deletion of words from the db_
>    > Specifics: [Link to `/admin` Endpoint](documentation.md#admin)

> 4. **Voting on words**
>    > Endpoint: `/api/community-words`
>    > Methods: `POST`, `GET`
>    > Description: _Updating values in the data-table, transaction -> `api/user-votes` and fetching words and values from the `community-words` table_
>    > Specifics: [Link to `/community-words` Endpoint](documentation.md#community-words)

> 5. **Reporting words**
>    > Endpoint: `/api/report`
>    > Methods: `POST`, `GET`, `DELETE`
>    > Description: _Filing user-reports, getting a list of user-reported words and deleteing the report listing of a word_
>    > Specifics: [Link to `/report` Endpoint](documentation.md#`/report`)

> 6. **SAOL Filtering**
>    > Endpoint: `/api/saol`
>    > Methods: `POST`
>    > Description: _Filtering the SAOL Swedish dictionary from unusable words_
>    > Specifics: [Link to `/saol` Endpoint](documentation.md#saol)

> 7. **Update Word value (ADMIN)**
>    > Endpoint: `/api/update-word-value`
>    > Methods: `POST`
>    > Description: _Calculates the value of new words based on their letters_
>    > Specifics: [Link to `/update-word-value` Endpoint](documentation.md#update-word-value)
> 8. **User votes**
>    > Endpoint: `/api/user-vote`
>    > Methods: `POST`, `GET`
>    > Description: _Adds and fetches users votes and "vote_value"_
>    > Specifics: [Link to `/user-vote` Endpoint](documentation.md#user-vote)

### Deployment

This project is deployed on Vercel. The production URL is available [here](https://win-at-wordfeud.vercel.app/).

If you want to deploy your own version, check out [the official T3 guide for Vercel deployment](https://create.t3.gg/en/deployment/vercel).

### Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature/new-feature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/new-feature).
5. Open a pull request.

### License

This project is licensed under the MIT License.
