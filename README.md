### 🧠 Sprint Planning / Ideas

- [ ] Implement the lock row method => every user have one seat => reservation
- [ ] Implement the WebSocket method to podcast the reservartion name => reservation, WS
- [ ] posdacst to the users that this user is already taking the bus seat => loading => WS
- [ ] Implement the method in case of many user choose one seat at once => reservation
- [ ] Add cron job to delete the reservartion list after one month => reservation
- [ ] Implement swagger 
- [ ] Implement the logique of an authentification more then one!
- [ ] Implement the linting
- [ ] Implement the prettier



=> Deadline 17/05/2025





---

### 📥 Backlog



- [ ] Implement the ZOD validation in every post or input and delete also value



---

### ✅ To Do




---

### 🛠️ Doing

- [ ] Refactoring code
  -[X] Update the response of anauthorized response
  -[ ] delete the unused code and unused file
  -[ ] Add const varaible

- [ ] Find a github project using socket.IO 
- [ ] Find a way how to work with websocket in different file  




---

### ✔️ Done

- [X] Initialize Git repo
- [X] Setup the project and structure
- [X] Setup prisma
- [X] Add prisma schema
- [X] Setup Docker compose file for the pg database
- [X] Implement the seed data in prisma
- [X] Add Enum of role Admin , User
- [X] Implement the folder structure
- [X] Implement the white list user in the database => registration
    - [X] Create User in the database in White list table
    - [X] List all users that in the white list 
    - [X] Delete a user in the white list 
    - [X] Check if user Exist in white list ( by email ? or by id?) 
- [X] it will have an Admin , User as role
- [X] As USER i can see the reservation list => reservation
- [X] Implement the reservartion flow => reservation
    - [X] Change the seatId to unique in prisma schema
    - [X] Add enum of destination
    - [X] As user i can make the reservation
        - [X] i can make a reservation with simple ( no middelware)
        - [X] i can't take already reserved seat
        - [X] i can't make double reservation
        - [X] i can't make reservation if my ID is false
- [X] as Admin i must see the list of booking of the bus of 1 month ago => Admin
- [X] list the booking list of today ( what if after 00H he will make the booking ?) 

- [X] BUGFIX : the user will not be able to make a reservation in another date ( should not make a reservation in the same date )
- [X] The seat will be like this SN-today_date_SEAT_NUMBER 
- [X] I need to be verified to make the reservartion => reservartion
- [X] as Admin i can update the verification of the user => Admin
  - [X] creation route of the update user verification
  - [X] creation controller & service to update the user 
  - [X] check the userId before the update 

- [X] US001- as user i can cancel my reservation => of todays
    -[X] check existing userId
    -[X] add isCanceled att to schema
    -[X] update the reservartion !
    -[X] new router
    -[X] new controller function and service function

- [X] US-002- Implement the registration of the user => registration => 27-05-2025
  -[X] Add password in the user schema
  -[-] check the user is exist on the whitelist or not ? => not required
  -[X] Routing of the registration
  -[X] Controller & service
  -[X] middleware => chech if the user already exist ? 
  -[X] Check if there is any missing data 
  -[X] payload is should be there 
  -[X] Work with jwt => 
    - [X] install jsonwebtoken
    - [X] setup the secret key of JWT in env
    - [X] install bcryptjs
    - [X] hash the password
    - [X] make the util file to generate the token
- [X] Imeplement the token with the right way and safe way => authentification
  -[X] Implement the router of login
  -[X] Implement the controller and service
  -[X] Check the email and password in the body
  -[X] Install the express-jwt
- [X] Implement the guard route

- [X] Implement an error handler => middleware
- [X] Implement not found => middleware
- [X] Implement the auth middleware to retreive the information from the token
- [X] Implement the authentification using cookies => authentification => v2 api
- [X] Implement the logout backend function
- [X] Implement role-based access control
- [X] Make search and read Documentation of Socket.IO 
- [X] Make an example using socket.IO => new branch
  - [X] Example with a room
  - [X] Understand the topic of the socket.IO
  - [X] Make an example chat with 2 people ! 
- [X] Fix the .env prb => .env is existing on .gitignore but it exist on stages changes

---

### 📘 What I Learned
## Prisma
- There is no need to make type in different file , just import the type directly from your prisma client
- in case of relation do not make every attribute true true just make the name of the value to true and it will import the whole fields

- Change of schema prisma
1- pnpm prisma generate
2- pnpm prisma migrate dev --name your_migration_name
3- Optional : pnpm prisma db seed
4- Optional : pnpm prisma studio


## Socket.IO

https://socket.io/docs/v4/

- in Socket.IO we often use the emit and on , when we want send a msg we send thought the emit event function
- we receive a msg with the on and we tell the type of the msg
  - for example we emit a msg with ping we should receive this by ping socket.on('ping')
- first connection is establish using the io.on connection event ! ( the io is our server )
- every connection of user have his own socket.id => 

- Brodcast => send the msg except this socket !
- we use often the io.to("room1)

Sender
```js
socket.emit("hello", "world", (response) => {
  console.log(response); // "got it"
});
```

Receiver
 ```js
socket.on("hello", (arg, callback) => {
  console.log(arg); // "world"
  callback("got it");
})
 ```

 ### Brodcasting
 - sending to all the connected user and clients

 ```js
// to all connected clients
io.emit("hello");

// to all connected clients in the "news" room
io.to("news").emit("hello");
 ```


 ### Connection with Express

 ```js
 import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);
 ```


### Rooms

```js
io.on("connection", (socket) => {
  console.log(socket.rooms); // Set { <socket.id> }
  socket.join("room1");
  console.log(socket.rooms); // Set { <socket.id>, "room1" }
});
```

### Middlewares

```js
io.on("connection", (socket) => {
  socket.use(([event, ...args], next) => {
    if (isUnauthorized(event)) {
      return next(new Error("unauthorized event"));
    }
    next();
  });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
});
```


- every user when he connect he have his own socket.id => when he refresh the page he will get another socket.id => the disconnect event is important 
---

### 📎 Resources & Documentation

https://github.dev/gothinkster/node-express-prisma-v1-official-app/
https://github.dev/YounesseElkars/Express-Prisma-TypeScript/blob/main/prisma/schema.prisma ==> the main inspiration


#### FOR WEBSOCKET
https://github.com/keiken-shin/chatty/blob/master/server.js
https://github.com/rakheshkrishna2005/LiveDocs/blob/main/server/server.ts
https://github.com/krotrn/ChatApp-backend/tree/main/src => need to understand this

---

### 🔗 Git Project



###  Notes

-The route folder will be like this :
    -   Admin file => will be the route of admin
    -   Authentifcation file => will be the route of registration and login
    -   reservation file => will be the flow of the reservation   
-Probably the authentification will be last thing ?
-Thinking about making the reservation with giving a random id ? or should i make the authenficiation first ? 
-i think i am gonne make the authentification first then i will made the reservation 
-first i am gonna make the create Bus then seats
-In reservation post create i will send like this=> seatId, userId that's all but what about the destination ? => i will make the destination enum first in Bus schema , then i will make in reservation destination new field => then in middelware i will check with this destination if the number of seats is still available ? => but how can i see if the bus is having available seats ? 

Reservation Flow => will be like this
```json
{
  "userId": "a5b8c3d9-2f9a-4b15-b8e4-1a2d3f4e5c6b",
  "seatId": 12,
  "destination": "NABEUL"
}
```
- so the workflow of the create reservation will be like this => the user connected will be send in the payload with the userId , 
- the seatId will be the send in the payload , the user connected will be select and click on the seat to detect the seatId and the destination will be selected or clicked first when the user click on the destination 
- the seats will be in the UI coming from the the Bus seatsNumber ? but how ? ah without the seatId => seatsNumber for example => 29 => i am gonna make loop throught the seatsNumber => the user select the seat and send the number so it will be like 
```json
{
  "userId": "some-uuid",
  "seat": "SA1",
  "destination": "NABEUL"
}
```


- okay if the reservation will be stored and the admin wanna see the one month reservation for example ! how can i acheive this ? => here when i make the get reservation i get the 
data without any condition => the seat place will be the date of today with the number ( coming from the front) => 


- the reservation will be like this 

```json
{
  "userId": "some-uuid",
  "seat": "SN-2025-05-17-22",
  "destination": "NABEUL"
}
```


-SN: SEAT OF NABEUL DESTINATION
DATE
Number of seat

US-001 =>send the userId ! => check existing userId => question here ? => how to decrement the seat Number =><b>solution</b> from the front ! => i will always make the get of the reservartion of today when when i see a seat for example a seat 24 dosen't have any reservartion it will be empty or free to take ! => delete reservartion from the data  ====>
i will add a isCanceled and i will put it to false as default and when the user want to cancel this value will be true! to keep everything on the database



---Authentification---
i am right now making the auth with bearer token and get the token from the header and check the token 
what if i want to make with cookies it's better ! and best practice 
so i am thinking to make with another branch from the main and work their and make the auth with the cookies
        

###  BUG

- i made a reservation with another day , and it tell me ' this user have a seat' => or iam in another day => BUGFIX => iam gonna check with the date if the reserved at 
=> if the user make a double reservation at the same date tell him => ' this user have a seat'
