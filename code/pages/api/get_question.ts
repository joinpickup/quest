import { NextApiRequest, NextApiResponse } from 'next';
import { getTodayQuestion } from '../../lib/notion';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const question = await getTodayQuestion()
    response.send(question)
    return
  } else {
    response.setHeader('Allow', 'GET');
    response.status(405).end('Method Not Allowed');
    return
  }
}