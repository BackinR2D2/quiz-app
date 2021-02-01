CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email TEXT NOT NULL,
    score INT DEFAULT 0,
    img TEXT NOT NULL,
    timestamp timestamp default current_timestamp,
    PRIMARY KEY(id)
);

CREATE TABLE history (
    id SERIAL primary key,
    userid VARCHAR(255) references users(id) not null,
    score int not null,
    score_value int,
    timestamp timestamp default current_timestamp
);
