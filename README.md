# Money Tracker

The **PERN Stack Redux-Toolkit Money Tracker** is a financial management application built with **PostgreSQL**, **Express**, **React**, and **Redux Toolkit**. It enables users to manage their finances effectively by tracking income, expenses, and transfers, managing accounts and currencies, and generating insightful reports with visual charts. The app supports full **CRUD operations** for accounts and transactions.

---

## 🚀 Features

- **Account Management**:
  - Add, edit, delete, and view accounts.
- **Transaction Management**:
  - Track **income**, **expenses**, and **transfers**.
  - Perform CRUD operations for transactions.
- **Currency Management**:
  - View and manage currencies.
  - Switch between currencies.
- **Reports and Charts**:
  - Generate detailed financial reports.
  - Visualize data using interactive charts.

---

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: PostgreSQL

---

## 🔧 Installation and Setup

### Prerequisites
Ensure the following are installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

### Backend Setup
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/money-tracker.git
   cd money-tracker/backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure the environment:
   - Create a \`.env\` file with the following:
     \`\`\`env
     DB_NAME=money_tracker
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_HOST=localhost
     DB_PORT=5432
     \`\`\`
   - Replace placeholders with your database credentials.

4. Migrate the database:
   \`\`\`bash
   npx sequelize-cli db:migrate
   \`\`\`

5. Start the server:
   \`\`\`bash
   npm start
   \`\`\`
   The server will run at \`http://localhost:5000\`.

### Frontend Setup
1. Navigate to the frontend directory:
   \`\`\`bash
   cd ../frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`
   The app will run at \`http://localhost:3000\`.

---

## 🚦 Usage

1. **Add Accounts**: Create and manage financial accounts.
2. **Log Transactions**: Add income, expenses, and transfers.
3. **Analyze Reports**: Use charts and tables to review financial data.
4. **Switch Currencies**: View transactions in different currencies.

---

## 🤝 Contributing

1. Fork this repository.
2. Create a new branch:
   \`\`\`bash
   git checkout -b feature-name
   \`\`\`
3. Commit your changes:
   \`\`\`bash
   git commit -m "Add feature name"
   \`\`\`
4. Push to your branch:
   \`\`\`bash
   git push origin feature-name
   \`\`\`
5. Open a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the \`LICENSE\` file for details.

---

## 🙌 Acknowledgments

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Sequelize](https://sequelize.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)