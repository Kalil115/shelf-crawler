USE project;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS bookshelf_item;
DROP TABLE IF EXISTS bookshelf;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS book;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE book (
	id BIGINT(20) NOT NULL auto_increment,
	ISBN VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author VARCHAR(255),
    published INT,
    image_url VARCHAR(255),
    primary key(id)
);

CREATE TABLE user (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL DEFAULT('USER'),
    PRIMARY KEY(id)
);

CREATE TABLE bookshelf (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    user_id BIGINT(20) NOT NULL,
    goal INT NOT NULL,
    reach_rate FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id) on DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE bookshelf_item (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	bookshelf_id BIGINT(20) NOT NULL,
    book_id BIGINT(20) NOT NULL,
    comment text,
    rating FLOAT,
    reason VARCHAR(255),
    status VARCHAR(255) NOT NULL,
	date_created DATETIME(6) DEFAULT NULL,
    last_updated DATETIME(6) DEFAULT NULL,
	PRIMARY KEY(id),
    foreign key (bookshelf_id) REFERENCES bookshelf (id) on DELETE RESTRICT ON UPDATE CASCADE,
    foreign key (book_id) REFERENCES book (id) on DELETE RESTRICT ON UPDATE CASCADE
);


INSERT INTO user (username, password, email, role) VALUES('abby', 'abby123', 'abby@gmail.com', 'USER');
INSERT INTO user (username, password, email, role) VALUES('Bob', 'bob123', 'bob@gmail.com', 'ADMIN');
INSERT INTO user (username, password, email, role) VALUES('Charlie', 'charlie123', 'charlie@gmail.com', 'USER');


INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE ('014311526X', 'Nudge: Improving Decisions About Health, Wealth, and Happiness', 'Every day we make choices—about what to buy or eat, about financial investments or our children’s health and education, even about the causes we champion or the planet itself. Unfortunately, we often choose poorly. Nudge is about how we make these choices and how we can make better ones. Using dozens of eye-opening examples and drawing on decades of behavioral science research, Nobel Prize winner Richard H. Thaler and Harvard Law School professor Cass R. Sunstein show that no choice is ever presented to us in a neutral way, and that we are all susceptible to biases that can lead us to make bad decisions. But by knowing how people think, we can use sensible “choice architecture” to nudge people toward the best decisions for ourselves, our families, and our society, without restricting our freedom of choice.', ' Richard H. Thaler, Cass R. Sunstein', '2009', 'assets/images/books/3450744.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE ('0307264785', 'Traffic: Why We Drive the Way We Do and What It Says About Us', 'Would you be surprised that road rage can be good for society? Or that most crashes happen on sunny, dry days? That our minds can trick us into thinking the next lane is moving faster? Or that you can gauge a nation s driving behavior by its levels of corruption? These are only a few of the remarkable dynamics that Tom Vanderbilt explores in this fascinating tour through the mysteries of the road. \nBased on exhaustive research and interviews with driving experts and traffic officials around the globe, Traffic gets under the hood of the everyday activity of driving to uncover the surprisingly complex web of physical, psychological, and technical factors that explain how traffic works, why we drive the way we do, and what our driving says about us. Vanderbilt examines the perceptual limits and cognitive underpinnings that make us worse drivers than we think we are. He demonstrates why plans to protect pedestrians from cars often lead to more accidents. He shows how roundabouts, which can feel dangerous and chaotic, actually make roads safer and reduce traffic in the bargain. He uncovers who is more likely to honk at whom, and why. He explains why traffic jams form, outlines the unintended consequences of our quest for safety, and even identifies the most common mistake drivers make in parking lots. \nThe car has long been a central part of American life; whether we see it as a symbol of freedom or a symptom of sprawl, we define ourselves by what and how we drive. As Vanderbilt shows, driving is a provocatively revealing prism for examining how our minds work and the ways in which we interact with one another. Ultimately, Traffic is about more than driving: it s about human nature. This book will change the way we see ourselves and the world around us. And who knows? It may even make us better drivers."', 'Tom Vanderbilt', '2008', 'assets/images/books/2776527.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE ('0374275637', 'Thinking, Fast and Slow', 'In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. Kahneman exposes the extraordinary capabilities—and also the faults and biases—of fast thinking, and reveals the pervasive influence of intuitive impressions on our thoughts and behavior. The impact of loss aversion and overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the challenges of properly framing risks at work and at home, the profound effect of cognitive biases on everything from playing the stock market to planning the next vacation—each of these can be understood only by knowing how the two systems work together to shape our judgments and decisions. \nEngaging the reader in a lively conversation about how we think, Kahneman reveals where we can and cannot trust our intuitions and how we can tap into the benefits of slow thinking. He offers practical and enlightening insights into how choices are made in both our business and our personal lives—and how we can use different techniques to guard against the mental glitches that often get us into trouble. Thinking, Fast and Slow will transform the way you think about thinking.', 'Daniel Kahneman', '2011', 'assets/images/books/11468377.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('0765331268', 'The First Days', 'Katie is driving to work one beautiful day when a dead man jumps into her car and tries to eat her.  That same morning, Jenni opens a bedroom door to find her husband devouring their toddler son. \nFate puts Jenni and Katie—total strangers—together in a pickup, fleeing the suddenly zombie-filled streets of the Texas city in which they live. Before the sun has set, they have become more than just friends and allies—they are bonded as tightly as any two people who have been to war together. \nDuring their cross-Texas odyssey to find and rescue Jenni’s oldest son, Jenni discovers the joy of watching a zombie’s head explode when she shoots its brains out. Katie learns that she’s a terrific tactician—and a pretty good shot. \nA chance encounter puts them on the road to an isolated, fortified town, besieged by zombies, where fewer than one hundred people cling to the shreds of civilization. \nIt looks like the end of the world. But Katie and Jenni and many others will do whatever they have to to stay alive. Run, fight, pick each other up when they stumble, fall in love…anything is possible at the end of the world.', 'Rhiannon Frater', ' 2008', 'assets/images/books/9648068.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('0525559477', 'The Midnight Library', 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices . . . Would you have done anything different, if you had the chance to undo your regrets?”', 'Matt Haig', '2020', 'assets/images/books/52578297.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('0316337064', 'No Better Friend: One Man, One Dog, and Their Extraordinary Story of Courage and Survival in WWII', 'Flight technician Frank Williams and Judy, a purebred pointer, met in the most unlikely of places: a World War II internment camp in the Pacific. Judy was a fiercely loyal dog, with a keen sense for who was friend and who was foe, and the pair\'s relationship deepened throughout their captivity. When the prisoners suffered beatings, Judy would repeatedly risk her life to intervene. She survived bombings and other near-death experiences and became a beacon not only for Frank but for all the men, who saw in her survival a flicker of hope for their own.', 'Robert Weintraub', '2015', 'assets/images/books/23197306.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('1947076167', 'Great Battles for Boys: World War I', 'Now you can—with Great Battles for Boys, a series written especially for reluctant readers. Exciting short chapters take boys to the front lines of history\'s most important military conflicts. Each page offers historic photographs, maps, and biographies of remarkable soldiers.', 'Joe Giorello', '2019', 'assets/images/books/52839378.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('1250069793', 'Truly Madly Guilty', 'Sam and Clementine have a wonderful, albeit, busy life: they have two little girls, Sam has just started a new dream job, and Clementine, a cellist, is busy preparing for the audition of a lifetime. If there’s anything they can count on, it’s each other.', 'Liane Moriarty', '2016', 'assets/images/books/26247008.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('0345539842', 'Morning Star','Darrow would have lived in peace, but his enemies brought him war. The Gold overlords demanded his obedience, hanged his wife, and enslaved his people. But Darrow is determined to fight back. Risking everything to transform himself and breach Gold society, Darrow has battled to survive the cutthroat rivalries that breed Society’s mightiest warriors, climbed the ranks, and waited patiently to unleash the revolution that will tear the hierarchy apart from within.', 'Pierce Brown', '2016', 'assets/images/books/18966806.jpg');
INSERT INTO book (ISBN, title, description, author, published, image_url) VALUE('1423178289', 'The Thank You Book', 'Gerald is careful. Piggie is not.\nPiggie cannot help smiling. Gerald can.\nGerald worries so that Piggie does not have to.\nGerald and Piggie are best friends.\nIn The Thank You Book!, Piggie wants to thank EVERYONE. But Gerald is worried Piggie will forget someone . . . someone important. ', 'Mo Willems', '2016', 'assets/images/books/27247476.jpg');


INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2020','1', 50, 0.18); 
INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2019','1', 50, 0.20); 
INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2018','1', 50, 0.12); 
INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2017','1', 100, 0.76);


INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 1, "very helpful", 8.2, "bpv  recommended", "FINISHED", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 2, "very useful", 8.7, "amazon  recommended", "FINISHED", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 3, "not interested", 5, "amazon  recommended", "DNF", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 4, null, null, "amazon  recommended", "READING", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 5, null, null, null, "LISTING", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 6, null, null, null, "LISTING", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 7, "very helpful", 8.2, "bpv  recommended", "FINISHED", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 8, "love it", 9, "friend recommended", "FINISHED", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 9, null, null, "friend recommended", "DNF", NOW());
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 10, null, null, "friend recommended", "LISTING", NOW());