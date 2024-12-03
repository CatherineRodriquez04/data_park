-- Test Query 1: Select rides with wait time under 30 minutes and capacity over 10
SELECT name, wait_time, capacity
FROM Rides
WHERE wait_time <= 30 AND capacity > 10;

-- Test Query 2: Select average pay by role
SELECT role, ROUND(AVG(pay), 2) AS average_pay
FROM Staff
GROUP BY role;

-- Test Query 3: Select the most popular menu item
SELECT menu_items, COUNT(*) AS frequency
FROM FoodVendors
GROUP BY menu_items
ORDER BY frequency DESC
LIMIT 1;

-- Test Query 4: Find merchandise items with a price less than 20
SELECT name, price
FROM Merchandise
WHERE price < 20;

-- Test Query 5: Find events where the location is 'Whole Park'
SELECT name, schedule
FROM InParkEvents
WHERE location = 'Whole Park';

-- Test Query 6a: Insert a new visitor
INSERT INTO Visitors (name, age, preferences, virtual_currency_balance)
VALUES ('Jane Smith', 30, 'Water rides, Relaxing activities', 25.00);

-- View inserted visitor
SELECT * FROM Visitors
WHERE name = 'Jane Smith' AND age = 30;

-- Test Query 6b: Delete a visitor
DELETE FROM Visitors
WHERE name = 'Jane Smith' AND age = 30;

-- View visitor to confirm deletion
SELECT * FROM Visitors
WHERE name = 'Jane Smith' AND age = 30;