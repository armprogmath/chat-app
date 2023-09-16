## versions
```bash
nodejs: 18.17.1
nestjs: 10.2.5
PostgreSQL: 15

``````
## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```
## Database

```bash
DB_URL example:
DB-URL: postgresql://localhost/nestjsChatApp?user=postgres&password=root
``````
## SOCKET_PORT
```bash
SOCKET_PORT=5000
url: http://localhost:5000
1. Create User: POST-> localhost:3000/api/users
2. Get token:   POST-> localhost:3000/api/users/login
3. Add token:   header -->  Autorization - Token
4. Send event 
``````







