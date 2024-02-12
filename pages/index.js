import Link from 'next/link';
import JokeList from '../components/JokeList';

export default function HomePage() {
  return (
    <>
      <Link href="/new">Create New Joke</Link>
      <JokeList />
    </>
  );
}
