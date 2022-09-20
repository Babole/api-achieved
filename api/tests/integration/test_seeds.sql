TRUNCATE users, habits, completed RESTART IDENTITY;

INSERT INTO users (name, password)
VALUES
('test_user1','test_pass1'),
('test_user2','test_pass2');

INSERT INTO habits (description,user_id)
VALUES
($str$ Test description $str$,1);

INSERT INTO completed (achievments_id,date)
VALUES
(1,'16_09_22');
