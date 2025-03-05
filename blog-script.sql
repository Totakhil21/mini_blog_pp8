USE miniblog;

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id INT(5) AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    content VARCHAR(500),
    created_at DATETIME DEFAULT NOW()
);

INSERT INTO posts (author, title, content) 
VALUES ('John Doe', 'First Post', 'This is the first post on the blog!');

SELECT * FROM posts;
