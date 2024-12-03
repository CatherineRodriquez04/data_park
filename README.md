# Data Park
CSC 4402 Group Project

## Steps for Importing Database Into MySQL WorkBench:
1. Connect to LocalHost on MySQL
2. Click Schemas (located next to administration)
3. Click Triangle Next to am_park (if am_park does not show up then click the datapark file followed by clicking the lightening bolt to load the database and tables)
4. Right Click on Table and Select 'Table Data Import Wizard'
5. Select the CSV File 
6. Select Existing Table and Choose the Table that Matches the Name of the CSV File
7. Press 'next' until it was successfully completed and gives the option to press 'finish'
8. Repeat the Above Steps for All CSV Files to Fill the Database for All the Tables

## Setting Up mySQL in Visual Studio Code (ensure proper extensions are installed):
1. In Terminal: mysql -u root -p
2. Enter your localhost password
3. USE am_park;
4. SELECT * FROM (choose any table name to ensure the database was filled properly from your workbench)

## Run Test Queries:
1. Ensure the setup for mySQL in Visual Studio Code is complete (should see 'Database changed')
2. SOURCE test_queries.sql;

## Frontend:
1. cd frontend
2. npm install
3. npm run build
4. npm start (editing phase: npm run dev)

## Test Queries and Answers:
1. Select rides with wait time under 30 minutes and capacity over 10<br>

SELECT name, wait_time, capacity<br>
FROM Rides<br>
WHERE wait_time <= 30 AND capacity > 10;<br>

Answer:
| name            | wait_time       | capacity |
|-----------------|-----------------|----------|
| Vertigo Peak    | 25              | 14       |
| Meteor Madness  | 30              | 16       |
| Turbo Twister   | 10              | 25       |
<br>
<br>


2. Select average pay by role<br>

SELECT role, ROUND(AVG(pay), 2) AS average_pay<br>
FROM Staff<br>
GROUP BY role;<br>

Answer:
| role                   | average_pay     |
|------------------------|-----------------|
| Ride Operator          | 16.40           |
| Ticketing Agent        | 11.00           |
| Security Officer       | 17.25           |
| Entertainer            | 25.00           |
| Park Manager           | 40.00           |
| Maintenance Technician | 19.33           |
| Nurse                  | 22.00           |
| Custodian              | 27.50           |
| Photographer           | 23.00           |
<br>
<br>


3. Select the most popular menu item<br>

SELECT menu_items, COUNT(*) AS frequency<br>
FROM FoodVendors<br>
GROUP BY menu_items<br>
ORDER BY frequency DESC<br>
LIMIT 1;<br>

Answer:
| menu_items  | frequency |
|-------------|-----------|
| Greek Gyro  | 2         |
<br>
<br>

4. Find the name and price of merchandise items with a price less than 20<br> 

SELECT name, price<br>
FROM Merchandise<br>
WHERE price < 40;<br>

Answer:
| name         | price   |
|--------------|---------|
| Hat          | 14.99   |
| Keychain     | 4.99    |
| Souvenir Cup | 9.99    |
| Stickers     | 4.99    |
<br>
<br>

5. Find the event names and schedules where the location is 'Whole Park'<br> 

SELECT name, schedule<br>
FROM InParkEvents<br>
WHERE location = 'Whole Park';<br>

Answer:
| name                  | schedule       |
|-----------------------|----------------|
| Summer Splash Bash    | 6/1 - 9/1      |
| Fright Fest           | 10/1 -10/31    |
| Turkey Fest           | 11/1  - 11/30  |
| Winter Wonderland     | 12/1 - 1/15    |
| Fireworks             | 8pm            |

<br>
<br>

6. Insert and Delete a Visitor<br>

(insert)<br>
INSERT INTO Visitors (name, age, preferences, virtual_currency_balance)<br>
VALUES ('Jane Smith', 30, 'Water rides, Relaxing activities', 25.00);

View that visitor was added:<br>
SELECT * FROM Visitors<br>
WHERE name = 'Jane Smith' AND age = 30;<br>

<br>
| name         | price   | age  | preferences                       | virtual_currency_balance |
|--------------|---------|------|-----------------------------------|--------------------------|
| Hat          | 14.99   | 30   | Water rides, Relaxing activities  | 25.00                    |


(delete)<br>
DELETE FROM Visitors<br>
WHERE name = 'Jane Smith' AND age = 30;

View that visitor was deleted: <br>
SELECT * FROM Visitors<br>
WHERE name = 'Jane Smith' AND age = 30;<br><br>

Empty set