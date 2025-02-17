
DELETE FROM user_badge;
DELETE FROM tasks;
DELETE FROM users;
DELETE FROM rewards;
DELETE FROM families;
DELETE FROM badges;


INSERT INTO users(id, username, password, role, points)
VALUES
 (1,'admin','$2a$10$BpHCzRAsxJCZq4NSr7I8YOd9ZqKf7kHFHPaVyL5j4f/rXQi2X.S2K','ADMIN',0),
 (2,'parinte','$2a$10$BpHCzRAsxJCZq4NSr7I8YOd9ZqKf7kHFHPaVyL5j4f/rXQi2X.S2K','PARENT',5),
 (3,'copil','$2a$10$BpHCzRAsxJCZq4NSr7I8YOd9ZqKf7kHFHPaVyL5j4f/rXQi2X.S2K','COPIL',10);

INSERT INTO families(id, name)
VALUES (1,'Familia Existenta');

UPDATE users SET family_id=1 WHERE id=2;

INSERT INTO rewards(id, description, cost)
VALUES
 (1,'Înghețată la cornet',5),
 (2,'1 oră consolă',10);

INSERT INTO tasks(id,title,description,deadline,difficulty,points,completed,status,user_id)
VALUES
 (10,'Spală vase','Farfurii + tacâmuri','2025-12-31','Mediu',10,false,'NEINCEPUT',3);
