CREATE TABLE users (
    id BIGSERIAL NOT NULL,
    username VARCHAR(50) NOT NULL,
    email TEXT NOT NULL,
    score INT DEFAULT 0,
    img TEXT NOT NULL
);
