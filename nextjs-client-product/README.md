This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The clients in the Navbar select are automatically populated on render, once the clients have been rendered the picker will navigate to the first client. If a new clients page is implemented the picker can re-route to the new page.

Possible Improvements:

- Update operation on the products/client page sometimes needs a page refresh to reflect the front end
- Add some kind of state control (context, redux, recoil, etc) to store the client/product info in state and make page rendering faster.
- Add better pagination logic to the products table (currently it's front end only pagination, this can be updated to use the endpoints)
- Add/Implement auth so the clients/products need a user logged in to interact with
- Implement SSR for the pages
