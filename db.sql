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


INSERT INTO Users (email, password, role) VALUES
    ('user1@example.com', 'password1', 'admin'),
    ('user2@example.com', 'password2', 'operator'),
    ('user3@example.com', 'password3', 'user')
;


INSERT INTO Escalators (name, status) VALUES
    ('Escalator A', 'operational'),
    ('Escalator B', 'under maintenance'),
    ('Escalator C', 'out of order')
;


INSERT INTO Incidents (escalator_id, description, status, date_begin, date_end) VALUES
    (1, 'Technical issue', 'pending', '2023-01-01 08:00:00', '2023-01-01 09:30:00'),
    (2, 'Routine maintenance', 'resolved', '2023-02-15 10:00:00', '2023-02-15 12:00:00'),
    (3, 'Major malfunction', 'in progress', '2023-03-20 15:45:00', '2023-03-21 10:00:00')
;
