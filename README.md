# [ChatSphere 💬](https://chat-sphere-phi.vercel.app/)

[ChatSphere API](https://github.com/MohamedAlosaili/chatSphere-api)

## Description

ChatSphere is a full-stack web application powered by socket.io, Typescript, MongoDB, ExpressJS, ReactJS (NextJS), and NodeJS.

Experience seamless real-time messaging as you create and join private/public rooms, connect with online users, and effortlessly share files.

## Motivation

[ChatSphere challenge](https://www.okoul.com/challenges/ChatSphere%20%F0%9F%92%AC)

## Application Stack:

> (Front & Back)-end

- [TypeScript](https://www.typescriptlang.org/)

- [Socket.io](https://socket.io/)

> Fronend

- [Reactjs](https://reactjs.org/)([Nextjs](https://nextjs.org/))

- [Tailwindcss](https://tailwindcss.com/)

- [Framer-motion](https://www.framer.com/motion/)

> Backend

- [Nodejs](https://nodejs.org)([Expressjs](https://expressjs.com/))

- [MongoDB](http://mongodb.com/)([Mongoose](https://mongoosejs.com/))

- [Firebase/storage](https://console.firebase.google.com)

## Application Features

- Passwordless magic link authentication for enhanced security and convenience.
- Create private and public room chats for tailored conversations and broader interactions.
- Update room information and manage members with ease in your own rooms.
- Real-time online user status to stay up-to-date with the availability of other users.
- Effortless file sharing, allowing you to share files seamlessly.

## Run project locally

- First, you should have [nodejs](https://nodejs.org), and npm installed

- Second, set up and run the [backend server](https://github.com/MohamedAlosaili/chatSphere-api)

- Third, add the `.env.local` file in the root directory with these variables

```
# Nodejs server API
DEV_API_URL=http://localhost:5000
PROD_API_URL=

# Nodejs socket.io server
NEXT_PUBLIC_DEV_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_PROD_SOCKET_URL=

JWT_SECRET= # A random string. should match with JWT_SECRET in the backend
JWT_EXPIRE=30d

COOKIE_EXPIRE=30
```

- Last step, install the dependencies and run the development server:

```bash
npm install && npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
