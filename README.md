# HC PARTNERS TEST MYSQL+EXPRESS+REACT+NODE

# BASIC STEPS
## 1) Clone Project
---

# SETUP DATABASE
## 1) Import the sql script db_hcPartners.sql into your mysql

# SETUP BACKEND

## 1) Go to backend folder

## 2) Install dependencies

```bash
npm install
```

### 3) Make in the root the .env file and paste this code with your own config:

```js
APP_NAME=hcPartnersTest
PORT=YOUR_PORT
DB_HOST=YOUR_DB_HOST
DB_NAME=db_hcPartners
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
SECRET_TOKEN=YOUR_SECRET_KEY
DEFAULT_ROL=2
TOKEN_HOURS_EXPIRE=HOURS_YOU_DESIRE_TO_EXPIRE_JWT
NODE_ENV=development
```
### For example:

```js
APP_NAME=hcPartnersTest
PORT=8105
DB_HOST=localhost
DB_NAME=db_hcPartners
DB_USERNAME=root
DB_PASSWORD=root
SECRET_TOKEN=hcPartnersTest
DEFAULT_ROL=2
TOKEN_HOURS_EXPIRE=24
NODE_ENV=development
```
---

# SETUP FRONTEND

## 1) Go to frontend folder

## 2) Install dependencies

```bash
npm install
```
### 3) Make in the root the .env file and paste this code with your own config:

```js
REACT_APP_API_URL=YOUR_API_NODE_URL
```
### For example:

```js
REACT_APP_API_URL=http://localhost:8105/api/v1
```
---

# RUN PROJECT:

## 1) Go to root folder (You must see backend and frontend folders)

## 2) Run and wait a seconds for building and React open a navigator tab with the frontend
```bash
npm start
```
### 3) Admin Credentials:
```text
email: admin@example.com
pass: password
```

### 4) Enjoy!
