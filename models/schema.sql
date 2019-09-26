DROP DATABASE IF EXISTS produce_db;
CREATE DATABASE produce_db;
USE produce_db;
CREATE TABLE items
(
    id INT NOT NULL
    AUTO_INCREMENT,
    plu VARCHAR
    (255) NOT NULL,
    productName VARCHAR
    (255) NOT NULL,
    prodDesc VARCHAR
    (255),
    category VARCHAR
    (255) NOT NULL,
    subcat VARCHAR
    (255) NOT NULL,
    prodImg VARCHAR
    (255),
    manufacturer VARCHAR
    (255) NOT NULL,
    price DEC
    (10,2) NOT NULL,
    caseCount INT,
    caseDimensions VARCHAR
    (255),
    caseWeight INT,
    onHand INT,
    certs VARCHAR
    (255),
    ndbno VARCHAR
    (255),
    PRIMARY KEY
    (id),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);