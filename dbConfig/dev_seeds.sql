INSERT INTO users (name, password, streak, last_update)
VALUES
('example1','examplepass',5,'21_09_22');

INSERT INTO habits (description,frequency,user_id)
VALUES
($str$ this is an example description text. $str$,'weekly',1);

INSERT INTO completed (habit_id,date)
VALUES
(1,'2_09_22'),
(1,'16_09_22'),
(1,'21_09_22');
