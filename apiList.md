# DevTinder API List.

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/interest/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter
- GET /user/connections  (userConnections)
- GET /user/requests/received.
- GET /user/feed - Get you the Profiles of other users on platform.

status: ignore, interested, accepted, rejected.