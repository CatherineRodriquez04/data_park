# Data Park
CSC 4402 Group Project

## Steps for Importing Database Into MySQL WorkBench:
1. Connect to LocalHost on MySQL
2. Click Schemas 
3. Click Triangle Next to am_park
4. Right Click on Table and Select 'Table Data Import Wizard'
5. Select the CSV File 
6. Choose Correct Table to Connect to the DB 

Repeat the above steps for all csv files to fill the database for all the tables.

Open Visual Studio Code (ensure you have proper extensions):
1. In Terminal: mysql -u root -p
2. Enter your localhost password
3. SELECT * FROM (choose any table name to ensure the database was filled properly from your workbench)

Test Queries:
(1) Select rides with wait time over 30 minutes and capacity over 12

SELECT name, wait_time, capacity
FROM Rides
WHERE wait_time > 30 AND capacity > 10;

ANSWER:
| Name            | Wait Time (min) | Capacity |
|-----------------|-----------------|----------|
| Cosmic Swinger  | 40              | 12       |
| The Void Drop   | 40              | 12       |
| Steel Dragon    | 80              | 20       |


(2) Select average pay by role

SELECT role, ROUND(AVG(pay), 2) AS average_pay
FROM Staff
GROUP BY role;

ANSWER:
| Role                   | Average Pay ($) |
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


(3) Select the most popular menu item

SELECT menu_items, COUNT(*) AS frequency
FROM FoodVendors
GROUP BY menu_items
ORDER BY frequency DESC
LIMIT 1;

ANSWER:
| Menu Items  | Frequency |
|-------------|-----------|
| Greek Gyro  | 2         |

(4) Find all high-thrill rides and their respective wait times

SELECT name, wait_time
FROM Rides
WHERE thrill_level = 'high';

ANSWER:
| Name          | Wait Time (min) |
|---------------|-----------------|
| Thunderclap   | 60              |
| The Void Drop | 40              |
| Steel Dragon  | 80              |

(5) Count the number of food vendors by location

SELECT location, COUNT(*) AS vendor_count
FROM FoodVendors
GROUP BY location
ORDER BY vendor_count DESC;

ANSWER:
| Location            | Vendor Count |
|---------------------|--------------|
| California          | 4            |
| Florida             | 2            |
| Arizona             | 1            |
| Ohio                | 1            |
| Minnesota           | 1            |
| District of Columbia| 1            |
| Texas               | 1            |
| Georgia             | 1            |

(6) Insert and Delete a Visitor

INSERT INTO Visitors (name, age, preferences, virtual_currency_balance)
VALUES ('Jane Smith', 30, 'Water rides, Relaxing activities', 25.00);

DELETE FROM Visitors
WHERE name = 'Jane Smith' AND age = 30;
