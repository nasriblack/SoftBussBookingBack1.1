### 🧠 Sprint Planning / Ideas

- [ ] Implement the authentifcation flow in back => authentification
- [ ] Implement the reservartion flow => reservation
- [ ] Implement the lock row method => every user have one seat => reservation
- [ ] Implement the WebSocket method to podcast the reservartion name => reservation, WS
- [ ] posdacst to the users that this user is already taking the bus seat => loading => WS
- [ ] Check if the user have his name in the whitelist db => registration
- [ ] Imeplement the token with the right way and safe way => authentification
- [ ] as user i want cancel my reservartion => reservation
- [ ] Implement the method in case of many user choose one seat at once => reservation
- [ ] it will have an Admin , User as role
- [ ] as Admin i must see the list of booking of the bus of 1 month ago => Admin
- [ ] as Admin i must verify the user after his registration => Admin
- [ ] As user i can see the reservation list => reservation
- [ ] Implement the lock row method
- [ ] Implement role-based access control
- [ ] Add cron job to delete the reservartion list after one month => reservation
- [ ] As new member it should take the Employe Role => registration
- [ ] I need to be verified to make the registration => registration
- [ ] Check the reservation number is less or equal than the number of seats of the bus


=> Deadline 17/05/2025





---

### 📥 Backlog

---

### ✅ To Do

---

### 🛠️ Doing

- [ ] Implement the white list user in the database => registration
    - [X] Create User in the database in White list table
    - [ ] List all users that in the white list 
    - [ ] Delete a user in the white list 

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

---

### 📘 What I Learned



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