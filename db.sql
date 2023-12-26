CREATE TABLE Users (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   role ENUM('user', 'tech', 'vandal') NOT NULL
);

CREATE TABLE Escalators (
    id TINYINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    status ENUM('En marche', 'En panne', 'En reparation') NOT NULL
);

CREATE TABLE Incidents (
   id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
   escalator_id TINYINT NOT NULL,
   description TEXT NOT NULL,
   status BOOLEAN NOT NULL,
   date_begin DATETIME NOT NULL,
   date_end DATETIME NOT NULL,
   FOREIGN KEY (escalator_id) REFERENCES Escalators(id)
);
