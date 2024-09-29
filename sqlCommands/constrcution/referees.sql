CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    position VARCHAR(255),
    avatar_url VARCHAR(255),
    institution VARCHAR(255),
    recommendation_status VARCHAR(50) NOT NULL
);