Create an account 
Login
Update your Profile 
Feed Page - explore
send connection Request 
See Our Matches 
See the request we have sent/received
Update your Profile 

# DevTinder APIs

# authRouter
Post /signup
Post /login
Post /logout

# connectionRequestRouter
Post /request/send/intrested/:userId
Post /request/send/ignored/:userId
post /request/review/accepted/:requestId
post /request/review/rejected/:requestId

# userRouter
Get /user/connections
Get /requests/received  
Get /feed - Gets you the profiles of other users on platform

# profileRouter
Get /Profile/view
Patch /Profile/edit
Patch /Profile/password


Status: Ignore, Intrested, accepeted, rejected  



# Deployment 



- Backend 
        - allowed ec2 instance public ip on mongo db server 
        - installed pm2 = npm install pm2 -g
        - pm2 start npm -- start
        - pm2 logs 
        - pm2 list, pm2 flush, <name>, pm2 stop, pm2 delete <name>


/etc/nginx/sites-available/default

socket.io documentation

TODO: show green symbol when online last seen , show profile picture, show profile name, show profile bio, show profile location, show profile
limit msg on api call if i scroll 10 msg load 10 msg at a time 


# DevTinder - The Networking Platform for Developers

**Live Demo:** [https://devtinder.yashwant.xyz](https://devtinder.yashwant.xyz)  

DevTinder is a full-stack social networking application designed to help developers connect, collaborate, and chat in real-time. Built with the MERN stack, it features a modern, responsive UI with a "Tinder-style" swiping feed for discovering and connecting with other coders.


## Key Features

- **Real-Time Chat:** A fully functional, real-time messaging system built with **Socket.IO**, allowing instant, private communication between connected users.
- **Interactive User Feed:** A core "Tinder-style" swiping interface where users can view developer profiles one-by-one and choose to "Connect" or "Ignore".
- **Complete User Authentication:** Secure user registration and login system with JWT (JSON Web Tokens) for session management and `httpOnly` cookies for enhanced security.
- **CRUD Profile Management:** Users can create, view, and update their personal profiles, including their name, bio, and profile picture.
- **Connection & Request System:** A robust backend system for sending, receiving, accepting, and rejecting connection requests.
- **Premium Membership Tier:** A monetization feature with Silver and Gold plans, integrated with the Razorpay payment gateway for secure transactions.

---

## Technology Stack

### Frontend
- **Framework:** React.js
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS (for a utility-first design approach)
- **HTTP Client:** Axios (for API requests)
- **Real-Time:** Socket.IO Client

### Backend
- **Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose (for object data modeling)
- **Authentication:** JSON Web Tokens (JWT)
- **Real-Time:** Socket.IO

### Database & Deployment
- **Database:** MongoDB Atlas (Cloud-hosted NoSQL database)
- **Deployment:**
    - **Backend:** AWS EC2 instance managed by PM2
    - **Frontend:** Static files served directly by Nginx
    - **Proxy:** Nginx used as a reverse proxy to handle API requests and serve the frontend.

---

## Architecture and Design

### Frontend Architecture
The frontend is a single-page application (SPA) built with React. It uses `react-router-dom` for client-side routing. Global state, such as user information and connections, is managed centrally using Redux Toolkit, which simplifies state logic and avoids prop drilling. All components are styled using Tailwind CSS for a modern, responsive, and consistent "Glassmorphism" UI.

### Backend Architecture
The backend is a RESTful API built with Node.js and Express. It follows a modular structure with separate routers for different concerns (authentication, user profiles, requests, chat). User authentication is handled via JWTs, which are stored in secure `httpOnly` cookies. The real-time chat functionality is powered by Socket.IO, which establishes a persistent WebSocket connection between clients and the server for instant messaging.

---

## Getting Started (Local Setup)

To run this project locally, follow these steps:

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or a MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/dev-tinder.git
cd dev-tinder
