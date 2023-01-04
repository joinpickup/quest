import Stripe from 'stripe';
import getRawBody from 'raw-body';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const sig = request.headers['stripe-signature'] as string | string[];

    let hasError = false;
    let error:string = "";
    
    getRawBody(request).then((buf) => {
        let event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
        return response.send("")
    }) .catch((err) => {
        hasError = true;
        error = err.message;
        console.log(error)
        response.status(400).send(`Webhook Error: ${error}`);
        return
    });

  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method Not Allowed');
    return
  }
}