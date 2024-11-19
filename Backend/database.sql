CREATE DATABASE Money_Tracker;
CREATE DATABASE test_sequelize;

//currencies table//


CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    currency_name VARCHAR(100) NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    currency_value DECIMAL NOT NULL,
    currency_flag VARCHAR(250) NOT NULL
);

SELECT * FROM currencies;

INSERT INTO currencies ( currency_name, currency_code, currency_value, currency_flag ) VALUES
('Indian Rupee', 'INR', 1.00, ''),
('US Dollar', 'USD', 0.012, ''),
('Euro', 'EUR', 0.011, ''),
('Japanese Yen', 'JPY', 1.81, ''),
('Singapore Dollar', 'SGD', 0.016, '');

SELECT * FROM currencies WHERE id = $1, [id]


//accounts table//


CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(100) NOT NULL,
    account_balance DECIMAL NOT NULL,
    account_currency_code VARCHAR(10) NOT NULL,
    account_currency_name VARCHAR(100) NOT NULL,
    account_currency_name_check BOOLEAN DEFAULT false,
    show_on_dashboard BOOLEAN DEFAULT false
);

SELECT * FROM accounts;

INSERT INTO accounts (account_name, account_type, account_balance, account_currency_code,account_currency_name,account_currency_name_check, show_on_dashboard) VALUES
($1, $2, $3, $4, $5, $6, $7) RETURNING *,
  [ 
    account_name,
    account_type, 
    account_balance,
    account_currency_code, 
    account_currency_name, 
    account_currency_name_check, 
    show_on_dashboard 
  ]

SELECT * FROM accounts WHERE id = $1, [id]

UPDATE accounts SET account_name = $1, account_type = $2, account_balance = $3, account_currency_code = $4, account_currency_name = $5, account_currency_name_check = $6, show_on_dashboard = $7 WHERE id = $8 RETURNING *,
        [ 
            account_name, 
            account_type, 
            account_balance, 
            account_currency_code,
            account_currency_name,
            account_currency_name_check, 
            show_on_dashboard, 
            id 
        ]

DELETE FROM accounts WHERE id = $1, [id]


//expense table//


CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    from_account_name VARCHAR(100) NOT NULL,
    expense_amount DECIMAL NOT NULL,
    expense_currency_code VARCHAR(10) NOT NULL,
    expense_tags VARCHAR(100) NOT NULL,
    expense_date date,
    expense_note VARCHAR(500) NOT NULL
);

SELECT * FROM expenses;

INSERT INTO expenses ( from_account_name, expense_amount, expense_currency_code, expense_tags, expense_date, expense_note) VALUES($1, $2, $3, $4, $5, $6) RETURNING *,
        [ 
            from_account_name, 
            expense_amount, 
            expense_currency_code, 
            expense_tags, 
            expense_date,
            expense_note 
        ]

SELECT * FROM expenses WHERE id = $1, [id]

UPDATE expenses SET from_account_name = $1, expense_amount = $2, expense_currency_code = $3, expense_tags = $4, expense_date = $5, expense_note = $6 WHERE id = $7 RETURNING *,
        [ 
            from_account_name, 
            expense_amount, 
            expense_currency_code, 
            expense_tags, 
            expense_date, 
            expense_note, 
            id 
        ]

DELETE FROM expenses WHERE id = $1,[id]


//transfer table//


CREATE TABLE transfer (
    id SERIAL PRIMARY KEY,
    from_account_name VARCHAR(100) NOT NULL,
    transfer_amount DECIMAL NOT NULL,
    from_currency_code VARCHAR(10) NOT NULL,
    to_account_name VARCHAR(100) NOT NULL,
    income_amount DECIMAL NOT NULL,
    to_currency_code VARCHAR(10) NOT NULL,
    transfer_date date,
    transfer_note VARCHAR(500) NOT NULL
);

SELECT * FROM transfer;

INSERT INTO transfer ( from_account_name, transfer_amount, from_currency_code, to_account_name, income_amount, to_currency_code, transfer_date, transfer_note) VALUES($1, $2, $3, $4, $5, $6, $7, &8) RETURNING *,
        [ 
            from_account_name, 
            transfer_amount, 
            from_currency_code, 
            to_account_name, 
            income_amount, 
            to_currency_code, 
            transfer_date, 
            transfer_note 
        ]

SELECT * FROM transfer WHERE id = $1, [id]

UPDATE transfer SET from_account_name = $1, transfer_amount = $2, from_currency_code = $3, to_account_name = $4, income_amount = $5, to_currency_code = $6, transfer_date = $7, transfer_note = $8 WHERE id = $9 RETURNING *,
        [ 
            from_account_name, 
            transfer_amount, 
            from_currency_code, 
            to_account_name, 
            income_amount, 
            to_currency_code, 
            transfer_date, 
            transfer_note, 
            id 
        ]

DELETE FROM transfer WHERE id = $1, [id]


//income table//


CREATE TABLE income (
    id SERIAL PRIMARY KEY,
    to_account_name VARCHAR(100) NOT NULL,
    income_amount DECIMAL NOT NULL,
    to_currency_code VARCHAR(10) NOT NULL,
    income_tags VARCHAR(100) NOT NULL,
    income_date date,
    income_note VARCHAR(500) NOT NULL
);

SELECT * FROM income;

INSERT INTO income ( to_account_name, income_amount, to_currency_code, income_tags, income_date, income_note) VALUES($1, $2, $3, $4, $5, $6) RETURNING *,
        [ 
            to_account_name, 
            income_amount, 
            to_currency_code, 
            income_tags, 
            income_date, 
            income_note 
        ]

UPDATE income SET to_account_name = $1, income_amount = $2, to_currency_code = $3, income_tags = $4, income_date = $5, income_note = $6 WHERE id = $7 RETURNING *,
        [ 
            to_account_name, 
            income_amount, 
            to_currency_code, 
            income_tags, 
            income_date, 
            income_note, 
            id 
        ]

SELECT * FROM income WHERE id = $1, [id]

DELETE FROM income WHERE id = $1, [id]