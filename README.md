# VBTH - Billing and Inventory Management System

VBTH is a comprehensive Billing and Inventory Management System developed using Node.js for the REST API and React for the frontend. It facilitates sales, purchase transactions, inventory management, and user categorization, allowing multiple pricing levels for products.

## Key Features
- **User Categorization:** Users can be categorized into retail, super retail, normal, and super normal, each with specific pricing structures.
- **Multi-level Product Pricing:** Products support multiple price points for different user categories.
- **Sales and Purchase Management:** Allows for sales, sale returns, purchases, and purchase returns, maintaining comprehensive records.
- **MongoDB Storage:** All data is stored in MongoDB, ensuring efficient and organized data management.
- **PDF Generation:** Ability to generate PDF invoices and view total sales.

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB for data storage
- **Frontend:** React, JavaScript (ES6+), HTML,Tailwind CSS
- **REST API:** Built with Node.js and Express.js

## Setup Instructions
1. Clone the repository: `git clone https://github.com/harshil-vasoya/VBTH
2. Install dependencies for the backend and frontend:

#
    cd VBTH
    cd VBTH FRONTEND && npm install
    cd VBTH BACKEND && npm install
4. Set up MongoDB and configure the connection in the backend.
5. Start the backend server: `cd backend && npm start`
6. Start the frontend: `cd frontend && npm start`

## Usage
- Add users categorized as retail, super retail, normal, or super normal, each with distinct pricing.
- Add products with multiple pricing tiers and units.
- Perform sales, purchases, returns, and view transaction records.
- Generate PDF invoices and check total sales.

## Contributions
Contributions are welcome! Feel free to submit issues or pull requests.
