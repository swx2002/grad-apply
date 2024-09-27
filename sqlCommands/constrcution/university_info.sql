CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    university_name VARCHAR(255) NOT NULL,
    program_name VARCHAR(255) NOT NULL,
    program_duration VARCHAR(50) NOT NULL,
    gre_requirement VARCHAR(50),
    university_logo_url VARCHAR(255) NOT NULL,
    application_deadline DATE NOT NULL
);