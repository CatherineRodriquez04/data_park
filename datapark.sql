/*  Data Park
    CSC 4402 Group Project Fall 2024
    Members: 
        Catherine Rodriquez
        Cleveland Martin
        Jamar Whitfield
        Trent Ellis
        Madeline Yi
        Myles Crockem     
*/

create database am_park;
USE am_park;

CREATE TABLE Visitors (
    visitor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    preferences TEXT,
    virtual_currency_balance DECIMAL(10, 2) DEFAULT 0.00
);


CREATE TABLE Rides (
    ride_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    thrill_level ENUM('Low', 'Medium', 'High', 'Extreme') NOT NULL,
    wait_time INT DEFAULT 0 -- in minutes
);


CREATE TABLE Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    win_chance INT CHECK (win_chance >= 0 AND win_chance <= 100) -- percentage (0-100)
);


CREATE TABLE Staff (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    shift_schedule TEXT,
    pay DECIMAL(10, 2) NOT NULL
);


CREATE TABLE InParkEvents (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    schedule TEXT,
    capacity INT NOT NULL
);


CREATE TABLE Merchandise (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_level INT DEFAULT 0
);


CREATE TABLE FoodVendors (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    menu_items TEXT,
    location VARCHAR(100)
); 
