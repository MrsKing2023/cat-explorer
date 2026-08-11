# Cat Explorer

A small web app that lets you browse cat breeds and view photos of each breed, built using [TheCatAPI](https://thecatapi.com/).

## Features

- Browse a searchable list of cat breeds (name, origin)
- Click a breed to view its full details (origin, temperament, description)
- View a photo gallery for that specific breed, loaded on demand
- Search field with handling for no-match results

## Tech Stack

- Vanilla JavaScript
- Vite (build tool + dev server)
- HTML / CSS
- [TheCatAPI](https://thecatapi.com/) (breeds + images endpoints)

## Running the Project Locally

1. **Clone this repository**
```bash
    git clone https://github.com/MrsKing2023/cat-explorer.git
    cd cat-explorer
```

2. **Install dependencies**
```bash
   npm install
```

3. **Get a free API key**
   - Sign up at [thecatapi.com/signup](https://thecatapi.com/signup)
   - Copy your API key from your account page

4. **Set up your environment variables**
   - Create a file named `.env` in the project root
   - Add the following line, replacing with your actual key:

   VITE_CAT_API_KEY=your_key_here

   5. **Run the dev server**
```bash
   npm run dev
```
   Open the local URL it prints (usually `http://localhost:5173`) in your browser.

## Project Structure

## Notes

- The app makes two separate API calls: one for the full breed list, and a second (scoped to a specific breed ID) only when you click into that breed's detail page — so photo data isn't fetched until it's actually needed.