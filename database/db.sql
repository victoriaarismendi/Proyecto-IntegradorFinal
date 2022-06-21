DROP SCHEMA IF EXISTS joyas;
CREATE SCHEMA joyas;
USE joyas;
CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  contrasena VARCHAR(255) DEFAULT NULL,
  fechaDeNacimiento date DEFAULT NULL,
  fotoDePerfil VARCHAR(255) DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT current_timestamp,
updatedAt DATETIME NOT NULL DEFAULT current_timestamp
  
);
CREATE TABLE joyas(
id INT PRIMARY KEY AUTO_INCREMENT,
producto VARCHAR(255) DEFAULT NULL,
piedras VARCHAR(255) DEFAULT NULL,
material VARCHAR(255) DEFAULT NULL,
imagen VARCHAR(255) DEFAULT NULL,
usuario_id INT DEFAULT NULL,
createdAt DATETIME NOT NULL DEFAULT current_timestamp,
updatedAt DATETIME NOT NULL DEFAULT current_timestamp,
FOREIGN KEY (usuario_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO user VALUES 
(DEFAULT,'delfigalarza1','dgalarzagraf@udesa.edu.ar','$2a$10$i1L9n1gwuxI8.duzPWBCFOjfqCX7QbuGOnfritx5iTlEf8172XxpO','2022-10-23','/images/users/delfi.jpg', DEFAULT, DEFAULT),
(DEFAULT,'vicuharimsendi','varismendi@udesa.edu.ar','$2a$10$i1L9n1gwuxI8.duzPWBCFOjfqCX7QbuGOnfritx5iTlEf8172XxpO','2022-10-23','/images/users/vicu.jpg', DEFAULT, DEFAULT),
(DEFAULT,'antoniareynal','reynala@udesa.edu.ar','$2a$10$i1L9n1gwuxI8.duzPWBCFOjfqCX7QbuGOnfritx5iTlEf8172XxpO','2002-04-01','/images/users/antonia.jpg', DEFAULT, DEFAULT);

INSERT INTO joyas VALUES 
(DEFAULT,'Anillo Onix','Contiene un diamante y una lepidolita','Oro','/images/products/anilloOnix.JPG',1,DEFAULT, DEFAULT),
(DEFAULT,'Anillo Cuarzo','Contiene un Cuarzo','Oro','/images/products/anilloCuarzo.jpeg',2,DEFAULT, DEFAULT),
(DEFAULT,'Collar Jade','Contiene un Jade','Plata','/images/products/collarJade.JPG',3,DEFAULT, DEFAULT),
(DEFAULT,'Collar Amazonita','Contiene un diamante y un jade','Acero','/images/products/collarAmazonita.JPG',1,DEFAULT, DEFAULT),
(DEFAULT,'Collar Zafiro','Contiene un Zafiro','Oro','/images/products/collarZafiro.JPG',2,DEFAULT, DEFAULT),
(DEFAULT,'Collar Obsidiana','Contiene una Obsidiana','Oro','/images/products/collarObsidiana.JPG',3,DEFAULT, DEFAULT),
(DEFAULT,'Collar Kiara','Contiene dos perlas','Oro','/images/products/collarKiara.JPG',1,DEFAULT, DEFAULT),
(DEFAULT,'Aros Lumini','Contiene dos Obsidianas','Oro','/images/products/arosReika.JPG',2,DEFAULT, DEFAULT),
(DEFAULT,'Aros Howlita','Contiene dos Obsidianas','Oro','/images/products/arosLumini.JPG',3,DEFAULT, DEFAULT),
(DEFAULT,'Aros Rubi','Contiene dos rubies','Bronce','/images/products/arosHowlita.JPG',1,DEFAULT, DEFAULT),
(DEFAULT,'Aros Reika','Contiene un Zafiro y un diamante','Acero','/images/products/arosRubi.JPG',2,DEFAULT, DEFAULT),
(DEFAULT,'Anillo Helix','Contiene un zircón naranja','Acero','/images/products/anilloHelix.JPG',3,DEFAULT, DEFAULT);



CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
comentario TEXT NOT NULL,
usuario_id INT NOT NULL,
producto_id INT NOT NULL, 
createdAt DATETIME NOT NULL DEFAULT current_timestamp,
updatedAt DATETIME NOT NULL DEFAULT current_timestamp,

FOREIGN KEY (usuario_id) REFERENCES user(id) ON DELETE CASCADE,
FOREIGN KEY (producto_id) REFERENCES joyas(id) ON DELETE CASCADE

);

INSERT INTO comentarios VALUES 
(DEFAULT,'Muy bueno! El material es de increible calidad, se puden usuar en el agua y no se destiñen',1,7,DEFAULT, DEFAULT),
(DEFAULT,'Me encanta el color',2,10, DEFAULT, DEFAULT);

