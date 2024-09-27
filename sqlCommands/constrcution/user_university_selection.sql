CREATE TABLE user_university_selections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    university_id INTEGER NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE,
    UNIQUE (user_id, university_id)
);
CREATE INDEX idx_user_university_user_id ON user_university_selections(user_id);
CREATE INDEX idx_user_university_university_id ON user_university_selections(university_id);