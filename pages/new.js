import { useRouter } from 'next/router';
import { mutate } from 'swr';
import Link from 'next/link';

export default function NewJokePage() {
  const router = useRouter();

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

    // #3 redirect
    router.push(`/`);
  }

  return (
    <>
      <h1>Add New Joke</h1>
      <form onSubmit={onSubmit}>
        <label>
          Joke Text:
          <textarea name="joke" required></textarea>
        </label>
        <button>Send</button>
      </form>
      <Link href="/">Back to the homepage</Link>
    </>
  );
}
