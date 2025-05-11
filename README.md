### 🧠 Sprint Planning / Ideas

- [ ] Implement the authentifcation flow in back => authentification
- [ ] Implement the reservartion flow => reservation
- [ ] Implement the lock row method => every user have one seat => reservation
- [ ] Implement the WebSocket method to podcast the reservartion name => reservation, WS
- [ ] posdacst to the users that this user is already taking the bus seat => loading => WS
- [ ] Check if the user have his name in the whitelist db => registration
- [ ] Imeplement the token with the right way and safe way => authentification
- [ ] Implement the method in case of many user choose one seat at once => reservation
- [ ] as Admin i must see the list of booking of the bus of 1 month ago => Admin
- [ ] as Admin i must verify the user after his registration => Admin
- [ ] Implement the lock row method
- [ ] Implement role-based access control
- [ ] Add cron job to delete the reservartion list after one month => reservation
- [ ] As new member it should take the Employe Role => registration
- [ ] I need to be verified to make the registration => registration
- [ ] Check the reservation number is less or equal than the number of seats of the bus
- [ ] How to check if the seat of the bus is taken or not ? => reservation
    - [ ] Add in Seat Schema isTaken boolean
    - [ ] Implement a cron job to delete the isTaken and return it to false in time
    - [ ] as user i want cancel my reservartion (isTaken) will be false => reservation ( BUT    HERE IN PRISMA MODEL WE HAVE UNIQUE FIELD WHICH IS REFERT TO THE USER)


=> Deadline 17/05/2025





---

### 📥 Backlog

---

### ✅ To Do

---

### 🛠️ Doing

- [ ] Implement the reservartion flow => reservation
    - [ ] Change the seatId to unique in prisma schema
    - [ ] Add enum of destination
    - [ ] As user i can make the reservation
        - [ ] i can't take already reserved seat
        - [ ] i can't take seat if the bus haven't free seat
        - [ ] i can't take seat if the bus haven't free seat

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

---

### 📘 What I Learned
## Prisma
- There is no need to make type in different file , just import the type directly from your prisma client
- in case of relation do not make every attribute true true just make the name of the value to true and it will import the whole fields


---

### 📎 Resources & Documentation


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