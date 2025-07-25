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

sdsdsddsdssdsddssdsdsdsdsddsdsdsdsdsdsdsdssdsddssddsdsdssddsdsdsdsdsdsqwqwqwqwqw