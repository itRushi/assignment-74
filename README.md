--------------------------------------------------------------------
--------------------------------------------------------------------

# CrediKhaata - Loan Tracker for Shopkeepers

**CrediKhaata** is a RESTful backend service that allows shopkeepers to :
manage customers,
 track credit sales (loans),
  handle repayments,  
  receive overdue payment alerts. 
  
  
  This system is built using Node.js, Express, and MongoDB (or alternatives), providing a simple and scalable solution for small businesses to digitize their credit transactions.


The application will be running on `http://localhost:2025`


--------------------------------------------------------------------
--------------------------------------------------------------------

✅ Step-by-Step Setup Guide how to run it okk follow given steps

Step 1 – Clone or download the project folder
Get the credikhaata-backend folder from me.

Step 2 – Open the project in terminal or VS Code

Step 3 – Install required packages
Run this in the terminal:
bash
Copy
Edit
npm install

Step 4 – Create a .env file in the root folder
Add the following environment variables:
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret_key
⚠️ If using local MongoDB, make sure MongoDB is running on your system.

Step 5 – Start the backend server
To run the server in development mode:
bash
Copy
Edit
npm run dev

OR to run it normally:

bash
Copy
Edit
npm start

Step 6 – Test the API
Use Postman or similar tool to test the API endpoints:
Register/login
Add customer
Create loans
Record repayments
View summary/overdue loans

💡 Notes
Make sure your .env file is correctly configured.

This is a backend-only project. You can build or connect a frontend later if needed.

Contact me if any dependency or command fails — I’ll help!

--------------------------------------------------------------------
--------------------------------------------------------------------

## Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **jsonwebtoken (JWT)**: Authentication middleware using JSON Web Tokens
- **bcryptjs**: Password hashing for user authentication
- **validator**: Email and data validation
- **moment**: Date manipulation library
- **dotenv**: Environment variable management
                PORT="2025"
                MONGODB_URI="mongodb://localhost:27017/credikhaata"
                JWT_SECRET="networthsecretkey"

- **dotenv**: Manage sensitive information like DB connection strings, JWT secrets, etc.

--------------------------------------------------------------------
--------------------------------------------------------------------

## OUTPUT OF THESE ASSIGNMENT 

## API Endpoints
### **User Authentication**

1. **POST /api/user/register**
    - Register a new user (shopkeeper)
    - Request Body:
      ```json
      {
        "name": "Rushi",
        "email": "Rushiborude1971@gmail.com",
        "password": "A"
      }
      ```
    - Response:
      ```json
      {
        "mesaage": "User registered successfully"
      }
      ```

2. **POST /api/user/login**
   ### 2. **POST** `/api/user/login`

    **Description:**  
    Login for shopkeeper.

    **Request Body:**
    ```json
    {
    "email": "Rushiborude1971@gmail.com",
    "password": "A"
    }

    - Response:
       {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTYyNWI2ZTBiMzc5MzQ4YTVkNTg5MSIsImlhdCI6MTc0NjI4MjU3NSwiZXhwIjoxNzQ4MDEtfewNTc1fQ.fqe2lKEEwFcENtQUGDBVOkW7Sw2WWKlb89kHkjFpSdQ",
    "user": {
        "id": "681625b6e0b379348a5d5891",
        "name": "Rushi",
        "email": "rushiborude1971@gmail.com"
    }
    }


---

### **Customer Management**

1. **POST /api/customers**
    - Create a new customer
    - Request Body:
      ```json
      {
        "name": "Customer Name",
        "phone": "1234567890",
        "address": "Customer Address",
        "trustScore": 7,
        "creditLimit": 5000
      }
      ```

2. **GET /api/customers**
    - Get a list of all customers for the logged-in user
    - Response:
      ```json
      [
        {
          "name": "Customer Name",
          "phone": "1234567890",
          "address": "Customer Address",
          "trustScore": 7,
          "creditLimit": 5000
        }
      ]
      ```

3. **PUT /api/customers/:customerId**
    - Update a customer's information
    - Request Body:
      ```json
      {
        "trustScore": 8,
        "creditLimit": 6000
      }
      ```

4. **DELETE /api/customers/:customerId**
    - Delete a customer's profile

---

### **Loan Management**

1. **POST /api/loans**
    - Create a new loan (credit sale)
    - Request Body:
      ```json
      {
        "customerId": "customer_id",
        "item": "Item description",
        "loanAmount": 5000,
        "dueDate": "2025-06-01T00:00:00.000Z",
        "frequency": "monthly"
      }
      ```

2. **GET /api/loans**
    - Get all active loans for the logged-in user
    - Response:
      ```json
      [
        {
          "loanAmount": 5000,
          "status": "pending",
          "dueDate": "2025-06-01T00:00:00.000Z"
        }
      ]
      ```

---

### **Repayment Management**

1. **POST /api/repayments/:loanId**
    - Record a repayment for a specific loan
    - Request Body:
      ```json
      {
        "amount": 1000
      }
      ```

2. **GET /api/repayments/:loanId**
    - Get all repayments for a specific loan
    - Response:
      ```json
      [
        {
          "amount": 1000,
          "repaymentDate": "2025-05-03T00:00:00.000Z"
        }
      ]
      ```

---

### **Loan Summary & Overdue Alerts**

1. **GET /api/summary**
    - Get the loan summary for the shopkeeper
    - Response:
      ```json
      {
        "totalLoaned": 10000,
        "totalCollected": 7000,
        "overdueAmount": 3000,
        "avgRepaymentTime": "15 days"
      }
      ```

2. **GET /api/overdue**
    - Get a list of customers with overdue loans
    - Response:
      ```json
      [
        {
          "customerId": "customer_id",
          "loanAmount": 5000,
          "overdueAmount": 3000
        }
      ]
      ```

--------------------------------------------------------------------
--------------------------------------------------------------------

## Environment Variables

Add the following environment variables to your `.env` file:

- **DB_URI**: MongoDB connection URI.
- **JWT_SECRET**: Secret for signing JWT tokens.

--------------------------------------------------------------------
--------------------------------------------------------------------

## Usage

1. Clone the repository and install dependencies as per the instructions.
2. Create `.env` and add the required environment variables.
3. Start the application with:
    ```bash
    npm start
    ```
4. Test the API using Postman or any HTTP client.

--------------------------------------------------------------------
--------------------------------------------------------------------

##  i use Tech Stack here

• Node.js + Express
• MongoDB (preferred) or PostgreSQL
• JWT Auth
• Moment.js or date-fns for due date logic
• Mongoose (if MongoDB) with clear schema relationships

--------------------------------------------------------------------
--------------------------------------------------------------------
