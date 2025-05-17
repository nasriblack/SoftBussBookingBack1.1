### 🧠 Sprint Planning / Ideas

- [ ] Implement the authentifcation flow in back => authentification
- [ ] Implement the reservartion flow => reservation
- [ ] Implement the lock row method => every user have one seat => reservation
- [ ] Implement the WebSocket method to podcast the reservartion name => reservation, WS
- [ ] posdacst to the users that this user is already taking the bus seat => loading => WS
- [ ] Check if the user have his name in the whitelist db => registration
- [ ] Imeplement the token with the right way and safe way => authentification
- [ ] Implement the method in case of many user choose one seat at once => reservation
- [ ] Implement the lock row method
- [ ] Implement role-based access control
- [ ] Add cron job to delete the reservartion list after one month => reservation
- [ ] As new member it should take the Employe Role => registration



=> Deadline 17/05/2025





---

### 📥 Backlog

---

### ✅ To Do



---

### 🛠️ Doing

- [ ] US001- as user i can cancel my reservation => of todays
      -[X] check existing userId
      -[X] add isCanceled att to schema
      -[X] update the reservartion !
      -[X] new router
      -[X] new controller function and service function  



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
        

###  BUG

- i made a reservation with another day , and it tell me ' this user have a seat' => or iam in another day => BUGFIX => iam gonna check with the date if the reserved at 
=> if the user make a double reservation at the same date tell him => ' this user have a seat'
