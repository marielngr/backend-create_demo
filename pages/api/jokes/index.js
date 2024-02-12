// SERVER (/api/jokes)

import dbConnect from '../../../db/connect';
import Joke from '../../../db/models/Joke';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === 'POST') {
    try {
      const newJoke = await Joke.create(request.body);
      return response.status(200).json(newJoke);
    } catch (error) {
      console.log('POST /api/jokes', error);
      return response.status(500).json({ message: 'error creating joke' });
    }
  }

  if (request.method === 'GET') {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }
}
