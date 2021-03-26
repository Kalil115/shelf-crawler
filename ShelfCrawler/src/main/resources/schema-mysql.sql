USE project;
DROP TABLE IF EXISTS book_list;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS user;


CREATE TABLE book (
	id BIGINT(20) NOT NULL auto_increment,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author VARCHAR(255),
    year INT,
    image_url VARCHAR(255),
    active BIT DEFAULT 1,
    last_updated DATETIME(6),
    primary key(id)
);

CREATE TABLE user (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);



CREATE TABLE book_list (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    user_id BIGINT(20) NOT NULL,
    reach_rate FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id) on DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE book_list_detail (
	book_list_id BIGINT(20) NOT NULL,
    book_id BIGINT(20) NOT NULL,
    comment text,
    rate FLOAT,
    reason VARCHAR(255),
    status VARCHAR(255) NOT NULL,
	PRIMARY KEY(book_list_id, book_id),
    foreign key (book_list_id) REFERENCES book_list (id) on DELETE RESTRICT ON UPDATE CASCADE,
    foreign key (book_id) REFERENCES book (id) on DELETE RESTRICT ON UPDATE CASCADE
);

select* from user;
INSERT INTO user (username, password, email ) VALUES('abby', 'abby123', 'abby@gmail.com');
INSERT INTO user (username, password, email ) VALUES('Bob', 'bob123', 'bob@gmail.com');
INSERT INTO user (username, password, email ) VALUES('Charlie', 'charlie123', 'charlie@gmail.com');



select* from book;
INSERT INTO book (title, description, author, year, image_url, active, last_updated) VALUE ('Pig & Goose and the first day of spring', 
                                                                                            'On the first day of spring Pig sets out to have a picnic by the pond, meets Goose, and so discovers a new friend. ', 
                                                                                            'Rebecca Bond', 
                                                                                            '2017', 
                                                                                            'https://covers.openlibrary.org/b/id/10662021-L.jpg', 1, '2021-03-23');
                                                                                            
INSERT INTO book (title, description, author, year, image_url, active, last_updated) VALUE ('The fires of spring', 
                                                                                             'The "Arab Spring" all started when a young Tunisian fruit-seller set himself on fire in protest of a government official confiscating his apples without cause and slapping his face. The aftermath of that one personal protest grew to become the Middle East movement known as the Arab Spring -- a wave of disparate events that included revolutions, protests, government overthrows, hopeful reform movements, and bloody civil wars. This book will be the first to bring the post Arab Spring world to light in a holistic context. It is a narrative of the author Shelly Culbertson\'s journey through six countries of the Middle East, describing countries, historical perspective, and interviews with revolution and government figures. Culbertson, RAND Middle East analyst and former U.S. State Department officer who has been involved with the Middle East for two decades, is uniquely equipped to analyze the current social, political, economic, and cultural effects of the movement. With honesty, empathy, and expert historical accuracy, Culbertson strives to answer the questions "what led to the Arab Spring," "what is it like there now," and "what trends after the Arab Spring are shaping the future of the Middle East?" The Fires of Spring tells the story by weaving together a sense of place, history, insight about key issues of our time, and personal stories and adventures. It navigates street life and peers into ministries, mosques, and women\'s worlds. It delves into what Arab Spring optimism was about, and at the same time sheds light on the pain and dysfunction that continues to plague some parts of the region.',
                                                                                             'Shelly Culbertson', 
                                                                                             '2016', 
                                                                                             'https://covers.openlibrary.org/b/id/10267753-L.jpg', 1, '2021-03-23');
INSERT INTO book (title, description, author, year, image_url, active, last_updated) VALUE ('Bad blood',
																							'Investigative journalist Judith Reitman delivers the never-before-told story of the American Red Cross's fall from grace -- an incredible account of gross mismanagement and shocking neglect. From the Red Cross's decision in 1983 not to use an HIV-screening test, to May 1993 when the FDA brought an unprecedented lawsuit against the organization and its president for thousands of violations of federal blood safety laws, this explosive true account exposes a system that is slowly killing the very people it has sworn to protect.',
                                                                                            'Judith Reitman',
                                                                                            '1996',
                                                                                            'https://ia800602.us.archive.org/view_archive.php?archive=/23/items/olcovers707/olcovers707-L.zip&file=7074974-L.jpg', 1, '2021-03-23');


select * from book_list;
INSERT INTO book_list (name, user_id, book_id, rate, reason, status) VALUES('2020','1', '1', 8.5,'recommended by friend', 'FINISHED');
