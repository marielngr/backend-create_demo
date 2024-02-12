# Backend Create

To run it locally:

```
npm i
npm run dev
```

## Endpoint structure

API

- `GET /api/jokes`: lists all jokes;
- `POST /api/jokes`: creates new joke;
- `GET /api/jokes/[id]`: get single joke.

pages

- `/` homepage, lists all jokes;
- `/new` new page, shows the form;
- `/[id]` detail page, shows single joke.

## Frontend

The form actions does three things:

1. sends info to the server;
2. invalidates cache via `mutate`;
3. redirects to another page.

```js
// import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
// ...
// const router = useRouter();
// ...

async function onSubmit(event) {
  event.preventDefault();
  const joke = event.target.joke.value;

  // #1 send the info to the server
  const response = await fetch('/api/jokes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ joke }),
  });

  const data = await response.json();
  // #2 invalidate cache (tell pages relying on /api/jokes to fetch data again)
  mutate('/api/jokes');

  // #3 redirect to the homepage
  router.push(`/`);
}
```

## Backend

We add a POST case in `/pages/api/jokes/index.js`:

```js
if (request.method === 'POST') {
  try {
    const newJoke = await Joke.create(request.body);
    return response.status(200).json(newJoke);
  } catch (error) {
    console.log('POST /api/jokes', error);
    return response.status(500).json({ message: 'error creating joke' });
  }
}
```