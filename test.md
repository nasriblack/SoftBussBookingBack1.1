# Test Scenarios


1- The user is able to make the regitration 
1- The user is able to connect
1- The user is able to select a seat
1- The user is able to book a seat
1- The user is able to delete a seat
1- The user is able to see all the seats


# Integration test
[ ] The User make the registration => check if he is on the whitlist or not
[ ] The Admin can add users on the whitlist
[ ] The Admin can delete users from the whitlist
[ ] The user can make the login 
    - [ ] ws connection must be establish 
    - [ ] the user will join to the room of bus Nabeul and to the onlinesUsers
    - [ ] All the users inside this room will get informed
[ ] The user is able to select a seat 
    -[ ] ws => a notification will be send to all the users showing that this seat is selected
    -[ ] No one can select this seat 
[ ] The user is able to book a seat
    -[ ] ws => a notification will be send to all the users showing that this seat is taking
    -[ ] No one can select this seat 
[ ] The user is able to release a seat
    -[ ] ws => a notification will be send to all the users showing that this seat is free
[ ] The user is able to see today reservartion 
[ ] The admin is able to see all reservation
[ ] The user is able to logout
