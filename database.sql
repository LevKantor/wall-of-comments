create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE comment(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    content VARCHAR(255),
    datetime TIMESTAMP
);

-- FOREIGN KEY(user_id) REFERENCES person (id)