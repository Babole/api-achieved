INSERT INTO users (name, password)
VALUES
('example1','examplepass');

INSERT INTO habits (description,user_id)
VALUES
($str$ this is an example description text. $str$,1);

INSERT INTO completed (habit_id,date)
VALUES
(1,'16_09_22');
