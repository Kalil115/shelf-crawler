USE project;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS gameshelf_item;
DROP TABLE IF EXISTS gameshelf;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS tvshelf_item;
DROP TABLE IF EXISTS tvshelf;
DROP TABLE IF EXISTS tv_series;
DROP TABLE IF EXISTS movieshelf_item;
DROP TABLE IF EXISTS movieshelf;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS bookshelf_item;
DROP TABLE IF EXISTS bookshelf;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS user;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE user (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);


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

CREATE TABLE bookshelf (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
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


create table movie (
    id BIGINT(20) NOT NULL auto_increment,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    director VARCHAR(255),
    cast VARCHAR(255),
    year INT,
    image_url VARCHAR(255),
    primary key(id)
);

create table movieshelf (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    user_id BIGINT(20) NOT NULL,
    goal INT NOT NULL,
    reach_rate FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id) on DELETE RESTRICT ON UPDATE CASCADE
);

create table movieshelf_item (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	movieshelf_id BIGINT(20) NOT NULL,
    movie_id BIGINT(20) NOT NULL,
    comment text,
    rating FLOAT,
    reason VARCHAR(255),
    status VARCHAR(255) NOT NULL,
	date_created DATETIME(6) DEFAULT NULL,
    last_updated DATETIME(6) DEFAULT NULL,
	PRIMARY KEY(id),
    foreign key (movieshelf_id) REFERENCES movieshelf (id) on DELETE RESTRICT ON UPDATE CASCADE,
    foreign key (movie_id) REFERENCES movie (id) on DELETE RESTRICT ON UPDATE CASCADE
);

create table tv_series (
	id BIGINT(20) NOT NULL auto_increment,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year INT,
    image_url VARCHAR(255),
    primary key(id)
);

create table tvshelf (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
    user_id BIGINT(20) NOT NULL,
    goal INT NOT NULL,
    reach_rate FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id) on DELETE RESTRICT ON UPDATE CASCADE
);

create table tvshelf_item (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	tvshelf_id BIGINT(20) NOT NULL,
    tv_series_id BIGINT(20) NOT NULL,
    comment text,
    rating FLOAT,
    reason VARCHAR(255),
    status VARCHAR(255) NOT NULL,
	date_created DATETIME(6) DEFAULT NULL,
    last_updated DATETIME(6) DEFAULT NULL,
	PRIMARY KEY(id),
    foreign key (tvshelf_id) REFERENCES tvshelf (id) on DELETE RESTRICT ON UPDATE CASCADE,
    foreign key (tv_series_id) REFERENCES tv_series (id) on DELETE RESTRICT ON UPDATE CASCADE
);

create table game (
	id BIGINT(20) NOT NULL auto_increment,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    platform VARCHAR(255),
    year INT,
    image_url VARCHAR(255),
    primary key(id)
);

create table gameshelf (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
    user_id BIGINT(20) NOT NULL,
    goal INT NOT NULL,
    reach_rate FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id) on DELETE RESTRICT ON UPDATE CASCADE
);

create table gameshelf_item (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	gameshelf_id BIGINT(20) NOT NULL,
    game_id BIGINT(20) NOT NULL,
    comment text,
    rating FLOAT,
    reason VARCHAR(255),
    status VARCHAR(255) NOT NULL,
	date_created DATETIME(6) DEFAULT NULL,
    last_updated DATETIME(6) DEFAULT NULL,
	PRIMARY KEY(id),
    foreign key (gameshelf_id) REFERENCES gameshelf (id) on DELETE RESTRICT ON UPDATE CASCADE,
    foreign key (game_id) REFERENCES game (id) on DELETE RESTRICT ON UPDATE CASCADE
);

-- INSERT INTO user (username, password, email, role) VALUES('abby', 'abby123', 'abby@gmail.com', 'USER');
-- INSERT INTO user (username, password, email, role) VALUES('Bob', 'bob123', 'bob@gmail.com', 'ADMIN');
-- INSERT INTO user (username, password, email, role) VALUES('Charlie', 'charlie123', 'charlie@gmail.com', 'USER');
INSERT INTO user (username, password, email, role) VALUES('abby', '$2y$12$42QvfbjCGltb/KI/r0UvJuWCFTFwEwDnLt10Fc04tJCkf/bAFqyEq', 'abby@gmail.com', 'USER');
INSERT INTO user (username, password, email, role) VALUES('Bob', '$2y$12$4.rEHJL4QjcNarWF4yYxv.EXm15CKvfDLgewDgI3doPM/JV00A4mC', 'bob@gmail.com', 'ADMIN');
INSERT INTO user (username, password, email, role) VALUES('Charlie', '$2y$12$SlaKuiACH5oa2/yKHnrvc.Z1xjJUfONmb.UHKHePZb.2DJvy5F5u.', 'charlie@gmail.com', 'USER');



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


INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('todo','1', 0, 0.0); 
INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2019','1', 50, 0.04); 
INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2020','1', 50, 0.04);
INSERT INTO bookshelf (name, user_id, goal, reach_rate) VALUES('2021','1', 50, 0.04); 


INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 1, "very helpful", 8.2, "bpv  recommended", "FINISHED", '2019-05-11');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 2, "very useful", 8.7, "amazon  recommended", "FINISHED", '2019-06-01');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 3, "not interested", 5, "amazon  recommended", "DNF", '2019-07-13');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (2, 8, "love it", 9, "friend recommended", "FINISHED", '2019-08-23');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (3, 9, null, null, "friend recommended", "DNF", '2020-04-18');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (4, 7, "very helpful", 8.2, "bpv  recommended", "FINISHED", '2020-10-15');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (4, 4, null, null, "amazon  recommended", "IN_PROGRESS", '2020-11-12');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 5, null, null, null, "LISTING", '2018-01-31');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 6, null, null, null, "LISTING", '2020-03-15');
INSERT INTO bookshelf_item (bookshelf_id, book_id, comment, rating, reason, status, date_created) VALUES (1, 10, null, null, "friend recommended", "LISTING", '2020-10-03');



INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Frank Darabont', 'Tim Robbins, Morgan Freeman, Bob Gunton', '1994', 'assets/images/movies/tt0111161.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Godfather', 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan', '1972', 'assets/images/movies/tt0068646.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Godfather: Part II', 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.', 'Francis Ford Coppola', ' Al Pacino, Robert De Niro, Robert Duvall', '1974', 'assets/images/movies/tt0071562.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart', '2008', 'assets/images/movies/tt0468569.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('12 Angry Men', 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.', 'Sidney Lumet', 'Henry Fonda, Lee J. Cobb, Martin Balsam', '1957', 'assets/images/movies/tt0050083.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('Schindler\'s List', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'Steven Spielberg', 'Liam Neeson, Ralph Fiennes, Ben Kingsley', '1993', 'assets/images/movies/tt0108052.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Lord of the Rings: The Return of the King', 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'Peter Jackson', 'Elijah Wood, Viggo Mortensen, Ian McKellen', '2003', 'assets/images/movies/tt0167260.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'Quentin Tarantino', 'John Travolta, Uma Thurman, Samuel L. Jackson', '1994', 'assets/images/movies/tt0110912.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Good, the Bad and the Ugly', 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', 'Sergio Leone', 'Clint Eastwood, Eli Wallach, Lee Van Cleef', '1966', 'assets/images/movies/tt0060196.jpg');
INSERT INTO movie (title, description, director, cast, year, image_url) VALUE ('The Lord of the Rings: The Fellowship of the Ring', 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', 'Peter Jackson', 'Elijah Wood, Ian McKellen, Orlando Bloom', '2001', 'assets/images/movies/tt0120737.jpg');


INSERT INTO movieshelf (name, user_id, goal, reach_rate) VALUES('todo','1', 0, 0.0); 
INSERT INTO movieshelf (name, user_id, goal, reach_rate) VALUES('2019','1', 50, 0.02); 
INSERT INTO movieshelf (name, user_id, goal, reach_rate) VALUES('2020','1', 50, 0.04); 
INSERT INTO movieshelf (name, user_id, goal, reach_rate) VALUES('2021','1', 50, 0.0); 


INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (1, 1, "exciting", null, "imdb recommended", "LISTING", '2017-01-12');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (1, 2, "exciting", null, "imdb recommended", "LISTING", '2017-05-27');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (1, 3, null, null, "imdb recommended", 'LISTING', '2017-10-23');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (2, 4, null, null, "bpv recommend", 'DNF', '2017-12-30');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (2, 5, null, null, null, 'IN_PROGRESS', '2018-02-13');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (2, 6, 'enjoyed it', 9, null, 'FINISHED', '2018-05-23');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (2, 7, 'not interesting', null, null, 'DNF', '2018-12-01');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (3, 8, null, 7, null, 'FINISHED', '2019-07-20');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (3, 9, 'good', 8.6, null, 'FINISHED', '2020-01-20');
INSERT INTO movieshelf_item (movieshelf_id, movie_id, comment, rating, reason, status, date_created) VALUES (3, 10, 'not interesting', null, null, 'DNF', '2021-01-05');



INSERT INTO tv_series (title, description, year, image_url) VALUE ('Breaking Bad', 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.', '2008', 'assets/images/tvs/tt0903747.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('Game of Thrones', 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.', '2011', 'assets/images/tvs/tt0944947.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('The Wire', 'The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.', '2002', 'assets/images/tvs/tt0306414.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('The Sopranos', 'New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling.', '1999', 'assets/images/tvs/tt0141842.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('Rick and Morty', 'An animated series that follows the exploits of a super scientist and his not-so-bright grandson.', '2013', 'assets/images/tvs/tt2861424.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('Attack on Titan', 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.', '2013', 'assets/images/tvs/tt2560140.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('The Office', 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.', '2005', 'assets/images/tvs/tt0386676.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('Friends', 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', '1994', 'assets/images/tvs/tt0108778.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('Fargo','Various chronicles of deception, intrigue and murder in and around frozen Minnesota. Yet all of these tales mysteriously lead back one way or another to Fargo, North Dakota.','2014','assets/images/tvs/tt2802850.jpg');
INSERT INTO tv_series (title, description, year, image_url) VALUE ('Invincible', 'An adult animated series based on the Skybound/Image comic about a teenager whose father is the most powerful superhero on the planet.', '2021', 'assets/images/tvs/tt6741278.jpg');


INSERT INTO tvshelf (name, user_id, goal, reach_rate) VALUES('todo','1', 0, 0.0); 
INSERT INTO tvshelf (name, user_id, goal, reach_rate) VALUES('2019','1', 50, 0.02); 
INSERT INTO tvshelf (name, user_id, goal, reach_rate) VALUES('2020','1', 50, 0.04); 
INSERT INTO tvshelf (name, user_id, goal, reach_rate) VALUES('2021','1', 50, 0.0); 


INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (1, 1, null, null, "imdb recommended", "LISTING", '2017-01-12');
INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (1, 2, null, null, null, "LISTING", '2021-01-12');
INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (3, 3, "The show is a cross between the Sopranos and the old NBC show Homicide: Life on the Street. The crime/sopranos side and the law/Homicide side run in parallel. Individually, the parallel plot lines are compelling. In tandem, they are complimentary and brilliant.", 8, "friend recommended", "FINISHED", '2020-04-12');
INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (3, 4, null, null, null, "DNF", '2019-10-12');
INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (4, 5, "amazing", null, null, "IN_PROGRESS", '2018-09-12');
INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (4, 6, "This anime is great work", null, "friend recommended", "IN_PROGRESS", '2019-09-12');
INSERT INTO tvshelf_item (tvshelf_id, tv_series_id, comment, rating, reason, status, date_created) VALUES (4, 7, "All the unique characters have depth and are well developed.", "8.5", "imdb recommended", "FINISHED", '2017-01-12');



INSERT INTO game (title, description, platform, year, image_url) VALUES ('It Takes Two','Bring your favorite co-op partner and together step into the shoes of May and Cody. As the couple is going through a divorce, through unknown means their minds are transported into two dolls which their daughter, Rose, made to represent them. Now they must reluctantly find a way to get back into their bodies, a quest which takes them through the most wild, unexpected and fantastical journey imaginable.','steam','2021','assets/images/games/co2t97.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('Disco Elysium', 'A CRPG in which, waking up in a hotel room a total amnesiac with highly opinionated voices in his head, a middle-aged detective on a murder case inadvertently ends up playing a part in the political dispute between a local labour union and a larger international body, all while struggling to piece together his past, diagnose the nature of the reality around him and come to terms with said reality.', 'steam, GOG, Epic', '2019', 'assets/images/games/co1sfj.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('The Witcher 3: Wild Hunt', 'RPG and sequel to The Witcher 2 (2011), The Witcher 3 follows witcher Geralt of Rivia as he seeks out his former lover and his young subject while intermingling with the political workings of the wartorn Northern Kingdoms. Geralt has to fight monsters and deal with people of all sorts in order to solve complex problems and settle contentious disputes, each ranging from the personal to the world-changing.', 'steam, GOG, Epic', '2015', 'assets/images/games/co1wyy.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('God of War', 'It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created...', 'PlayStation', '2018', 'assets/images/games/co1tmu.jpg'); 
INSERT INTO game (title, description, platform, year, image_url) VALUES ('The Last of Us', 'A third person shooter/stealth/survival hybrid, in which twenty years after the outbreak of a parasitic fungus which takes over the neural functions of humans, Joel, a Texan with a tragic familial past, finds himself responsible with smuggling a fourteen year old girl named Ellie to a militia group called the Fireflies, while avoiding strict and deadly authorities, infected fungal hosts and other violent survivors.', 'PlayStation', '2013', 'assets/images/games/co1r7f.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('Paper Mario: The Thousand-Year Door', 'Time passes, the pages turn…and a new chapter unfolds in an unfamiliar land! Get ready for a two-dimensional role-playing adventure for the ages as Mario returns to paper form to discover a mystery that sleeps behind an ancient, legendary portal called the Thousand-Year Door. The quest is long, the dangers many, and this time, Mario will have to make full use of his papery qualities just to survive.', 'Nintendo GameCube', '2004', 'assets/images/games/co25us.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('Chrono Trigger', 'In this turn-based Japanese RPG, young Crono must travel through time through a misfunctioning teleporter to rescue his misfortunate companion and take part in an intricate web of past and present perils. The adventure that ensues soon unveils an evil force set to destroy the world, triggering Crono\'s race against time to change the course of history and bring about a brighter future.', 'PC, Mobile, Console', '1995', 'assets/images/games/co2eqc.jpg'); 
INSERT INTO game (title, description, platform, year, image_url) VALUES ('Persona 5', 'Persona 5, a turn-based JRPG with visual novel elements, follows a high school student with a criminal record for a crime he didn\'t commit. Soon he meets several characters who share similar fates to him, and discovers a metaphysical realm which allows him and his friends to channel their pent-up frustrations into becoming a group of vigilantes reveling in aesthetics and rebellion while fighting corruption.', 'PlayStation', '2016', 'assets/images/games/co1r76.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('Metal Gear Solid 3: Snake Eater', 'A stealth action/survival game and prequel to Metal Gear Solid 1 (1998) and 2 (2001), MGS3 follows Naked Snake as he trudges through rain forests and swamps in order to clear the name of the American government of suspicion at detonating a nuclear missile within Soviet soil by dispatching the organization behind the act, in a story of shifting allegiances, deception, warfare, mentorship and sexuality.', 'PlayStation', '2014', 'assets/images/games/co29pn.jpg');
INSERT INTO game (title, description, platform, year, image_url) VALUES ('Super Mario World', 'A 2D platformer and first entry on the SNES in the Super Mario franchise, Super Mario World follows Mario as he attempts to defeat Bowser\'s underlings and rescue Princess Peach from his clutches. The game features a save system, a less linear world map, an expanded movement arsenal and numerous new items for Mario, alongside new approaches to level design and art direction.', 'Nintendo switch', '1990', 'assets/images/games/co2v5y.jpg');


INSERT INTO gameshelf (name, user_id, goal, reach_rate) VALUES('todo','1', 0, 0.0); 
INSERT INTO gameshelf (name, user_id, goal, reach_rate) VALUES('2019','1', 50, 0.02); 
INSERT INTO gameshelf (name, user_id, goal, reach_rate) VALUES('2020','1', 50, 0.04); 
INSERT INTO gameshelf (name, user_id, goal, reach_rate) VALUES('2021','1', 50, 0.0); 



INSERT INTO gameshelf_item (gameshelf_id, game_id, comment, rating, reason, status, date_created) VALUES (4, 1, 'I love the fact that they made it so only one of you has to buy the full game. I really appreciate that.', 8.5, null, 'FINISHED', '2021-3-25');
INSERT INTO gameshelf_item (gameshelf_id, game_id, comment, rating, reason, status, date_created) VALUES (3, 2, null, null, 'friend recommend', 'LISTING', '2020-10-05');
INSERT INTO gameshelf_item (gameshelf_id, game_id, comment, rating, reason, status, date_created) VALUES (1, 3, null, null, null, 'LISTING', '2018-03-24');
INSERT INTO gameshelf_item (gameshelf_id, game_id, comment, rating, reason, status, date_created) VALUES (2, 4, null, '8.5', null, 'FINISHED', '2019-01-08');
INSERT INTO gameshelf_item (gameshelf_id, game_id, comment, rating, reason, status, date_created) VALUES (3, 5, null, null, null,'DNF', '2015-05-23');
INSERT INTO gameshelf_item (gameshelf_id, game_id, comment, rating, reason, status, date_created) VALUES (4, 6, null, null, null, 'IN_PROGRESS', '2019-05-23');









