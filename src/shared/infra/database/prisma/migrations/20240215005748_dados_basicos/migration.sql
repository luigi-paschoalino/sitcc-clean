CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "cursos" ("id", "nome", "codigo") VALUES ('802756b2-e92a-4dd7-97ed-5277dfba646e', 'Sistemas de Informação', 'SIN');
INSERT INTO "cursos" ("id", "nome", "codigo") VALUES (uuid_generate_v4(), 'Ciência da Computação', 'CCO');

-- senha: testeadm
INSERT INTO "usuarios" ("id", "nome", "email", "senha", "tipo", "cursoId") VALUES (uuid_generate_v4(), 'Administrador', 'temp.adm@unifei.edu.br', '$2a$12$UESTCCd8Uq3M2n/jNvboguqX28kBQLIaygYhUI8Y8GCl9rteInWk6', 'ADMINISTRADOR', '802756b2-e92a-4dd7-97ed-5277dfba646e')