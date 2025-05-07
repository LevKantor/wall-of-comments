create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE comment(
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    datetime TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES person (id)
);