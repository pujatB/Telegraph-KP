DROP TABLE IF EXISTS telegraph ;

CREATE TABLE telegraph (
    id SERIAL PRIMARY KEY,
    title varchar(100),
    author varchar(100),
    story varchar(255)
);

