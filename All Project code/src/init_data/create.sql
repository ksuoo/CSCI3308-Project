DROP TABLE IF EXISTS recipes CASCADE;
CREATE TABLE recipes(
    Name VARCHAR(100),
    Rating VARCHAR(10),
    Ease_of_Prep VARCHAR(14),
    Prep_Time VARCHAR(10),
    Main_Ingredients VARCHAR(100)
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);