CREATE DATABASE IF NOT EXISTS defaultdb;
USE defaultdb;


CREATE TABLE ROLE (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    id_number_required BOOLEAN DEFAULT FALSE
);

INSERT INTO ROLE (role_name, id_number_required)
VALUES
('Guest', FALSE),
('College Student', TRUE),
('Graduate Student', TRUE),
('Faculty', TRUE),
('Staff', TRUE),
('Admin', TRUE);


CREATE TABLE USER (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    birthday DATE NOT NULL,

    id_number VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    role_id INT NOT NULL,

    FOREIGN KEY (role_id)
        REFERENCES ROLE(role_id)
);

CREATE TABLE BUILDING (
    building_id INT AUTO_INCREMENT PRIMARY KEY,

    building_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE FLOOR (
    floor_id INT AUTO_INCREMENT PRIMARY KEY,

    floor_number VARCHAR(20) NOT NULL,

    floor_name VARCHAR(100),

    building_id INT NOT NULL,

    FOREIGN KEY (building_id)
        REFERENCES BUILDING(building_id)
);


CREATE TABLE ROOM (
    room_id INT AUTO_INCREMENT PRIMARY KEY,

    room_name VARCHAR(100) NOT NULL,

    room_code VARCHAR(50) UNIQUE,

    room_type VARCHAR(50),

    floor_id INT NOT NULL,

    user_id INT NULL,

    FOREIGN KEY (floor_id)
        REFERENCES FLOOR(floor_id),

    FOREIGN KEY (user_id)
        REFERENCES USER(user_id)
);


CREATE TABLE SCHEDULE (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,

    schedule_date DATE NOT NULL,

    schedule_name VARCHAR(100),

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    room_id INT NOT NULL,

    user_id INT NOT NULL,

    FOREIGN KEY (room_id)
        REFERENCES ROOM(room_id),

    FOREIGN KEY (user_id)
        REFERENCES USER(user_id)
);


CREATE TABLE APPOINTMENT_SLOT (
    slot_id INT AUTO_INCREMENT PRIMARY KEY,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    is_booked BOOLEAN DEFAULT FALSE,

    schedule_id INT NOT NULL,

    FOREIGN KEY (schedule_id)
        REFERENCES SCHEDULE(schedule_id)
);


CREATE TABLE APPOINTMENT (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,

    purpose TEXT NOT NULL,

    contact_details VARCHAR(255),

    status ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    requester_id INT NOT NULL,

    slot_id INT NOT NULL,

    FOREIGN KEY (requester_id)
        REFERENCES USER(user_id),

    FOREIGN KEY (slot_id)
        REFERENCES APPOINTMENT_SLOT(slot_id)
);
