CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
     imagen TEXT
);

CREATE TABLE viajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    destino TEXT[]  NOT NULL, 
    descripcion TEXT  NOT NULL,
    precio NUMERIC(10,2)  NOT NULL,
    imagen VARCHAR(255)  NOT NULL,
    fecha_salida DATE  NOT NULL,
    duracion INTEGER  NOT NULL,
    capacidad INTEGER  NOT NULL,
    features TEXT[]  NOT NULL
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

CREATE TABLE mis_resenas (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    valoracion INT CHECK (valoracion BETWEEN 1 AND 5), 
    descripcion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    id_viaje INT NOT NULL,
    valoracion INT CHECK (valoracion BETWEEN 1 AND 5), 
    descripcion TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);


CREATE TABLE mis_viajes (
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    PRIMARY KEY (id_usuario, id_viaje),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

INSERT INTO usuario (nombre, apellido, email, password, imagen) VALUES

-- estas son los datos y claves de los usuarios, se enviaron al backend en el archivo 
-- crearUsuarios.js a travez de la terminal con el comando node crearUsuario para que 
-- las claves aparecieran encriptadas 

-- ('Fernanda', 'Pérez', 'fernanda.perez@gmail.com', 'pass1234'),
-- ('Romina', 'Gacitúa', 'romina.gacitua@hotmail.com', 'romi5678'),
-- ('Faviana', 'López', 'faviana.lopez@yahoo.com', 'favi9012'),
-- ('Carlos', 'Reyes', 'carlos.reyes@gmail.com', 'carlospass'),
-- ('Maria', 'Pérez', 'maria.perez@gmail.com', 'mas1234'),
-- ('Juan', 'Gacitúa', 'juan.gacitua@hotmail.com', 'gaci5277'),
-- ('Ana', 'López', 'ana.lopez@yahoo.com', 'ana1523'),
-- ('Franco', 'Reyes', 'franco.reyes@gmail.com', 'fran78542'),
-- ('Ana', 'Torres', 'ana.torres@hotmail.com', 'torres2023'),
-- ('Cecilia', 'Torres', 'ceci.torres@hotmail.com', 'ceci2023'); 
('Romina', 'Gacitúa', 'romina.gacitua@hotmail.com', '$2b$10$i89HUw1efADcA1gGjL8PReFYV6hoomHMX2zbA/hA6GiZG2WiRHrM6', NULL);
('Faviana', 'López', 'faviana.lopez@yahoo.com', '$2b$10$DI2xW.phf71h6P6Y7yoIdu1X1HukyQRR.Eig5qibP9zE7oma3Sfei', NULL),
('Carlos', 'Reyes', 'carlos.reyes@gmail.com', '$2b$10$9bKvaZMqWlw/buRKobe6NufG0eK7/fFKTeKieEFh5LYg5/WxBvmqC', NULL),
('Maria', 'Pérez', 'maria.perez@gmail.com', '$2b$10$AVLXCdlGe98tcGNwhJQZVuvxNjYAoZtMxRs6HXArWkxr8p3V6vuKG', NULL),
('Juan', 'Gacitúa', 'juan.gacitua@hotmail.com', '$2b$10$i5i6IqRHFqOZPrPG.N2BFuYFchJNEpuaZ0CZckwRW7nTI5gK9A/.i', NULL),
('Ana', 'López', 'ana.lopez@yahoo.com', '$2b$10$LovaQ3dGIyTNLiMZMGJ7Fu4Z.jIwyrjdQMfcKZWBlICBJJTgPQJky', NULL),
('Franco', 'Reyes', 'franco.reyes@gmail.com', '$2b$10$71vf1GeFKDqh0VU/F3qjAOMiPCxle6kWPRgQy3stkEUxEPwuF9Xye', NULL),
('Ana', 'Torres', 'ana.torres@hotmail.com', '$2b$10$prQT9XhMVlRmcowxu/spmev6dUGqGqQBFryjm5F/JoPeUS8nwHusW', NULL),
('Cecilia', 'Torres', 'ceci.torres@hotmail.com', '$2b$10$285roB7608d4ES3oDxb6PuA80R/mj8t5cRuSJHbHiE6uszN8J.Swu', NULL),
('Juan', 'Pérez', 'juan@example.com', '$2b$10$A/aA/T8eUOuFRCTB8hwr3ekZ9dKpUcLFgOlPhxFBHahVxaPNV/mT6', NULL),
('Juan', 'Pérez', 'jan@example.com', '$2b$10$vIrrCIkQOZVogoSIf5Ha6uUumeKU4SLxR2NEJxDStnJe3PSztwgWe', NULL),
('Alumno', 'DesafioLatam', 'alumno@desafiolatam.com', '$2b$10$mkTFBgRWdchRSjKiA47ptegcO29D//74GOT3OCcFHPMTb1C/VSB6S', NULL),
('Alex', 'Saez', 'alex@desafiolatam.com', '$2b$10$C592CXISh9P.6MhDQCc6pejOJPNpMFpGJ.S8TVxhRd6orTsWUFYnC', NULL);


INSERT INTO viajes (nombre, destino, descripcion, precio, imagen, fecha_salida, duracion, capacidad, features) VALUES
('Crucero por el Caribe', ARRAY['Bahamas', 'Jamaica', 'Cuba'], 'Crucero por las aguas cristalinas del Caribe', 2500.00, 'https://st2.depositphotos.com/2627021/10713/i/450/depositphotos_107133282-stock-photo-cruise-to-caribbean-with-palm.jpg', '2025-03-01', 7, 200, ARRAY['Todo incluido', 'Piscina infinita', 'Shows nocturnos']),
('Crucero por el Mediterráneo', ARRAY['Italia', 'Grecia', 'España'], 'Tour por las costas históricas del Mediterráneo', 3200.00, 'https://assets.dm.rccl.com/is/image/RoyalCaribbeanCruises/royal/content/destinations/mediterranean/mediterranean-beautiful-coastal-town-cliff.jpg?$880x1428$', '2025-04-10', 10, 250, ARRAY['Cenas gourmet', 'Spa de lujo', 'Excursiones guiadas']),
('Crucero por Alaska', ARRAY['Alaska', 'Canadá', 'Groenlandia'], 'Explora los glaciares y la vida silvestre de Alaska', 2800.00, 'https://deluxetravel.com.co/wp-content/uploads/2021/05/RCI_OV_Alaska_2013-006_RET.jpg', '2025-05-20', 12, 300, ARRAY['Naturaleza', 'Tours en kayak', 'Auroras boreales']),
('Crucero por las Islas Griegas', ARRAY['Santorini', 'Mykonos', 'Atenas'], 'Disfruta de la belleza de las Islas Griegas', 3000.00, 'https://es.ncl.com/sites/default/files/1000x667-ncl-cruise-santorini-couple_0.jpg', '2025-06-05', 8, 220, ARRAY['Vistas impresionantes', 'Buceo', 'Cultura e historia']),
('Crucero por Sudamérica', ARRAY['Colombia', 'Perú', 'Ecuador'], 'Aventura por los países sudamericanos', 2000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mKAuEczHbziLuT3Padz80IRsyIYNsabJfg&s', '2025-07-15', 14, 250, ARRAY['Cenas gourmet', 'Spa de lujo', 'Festivales', 'Noches de salsa']),
('Crucero por el Sur de Chile', ARRAY['Valparaíso', 'Chiloé (Castro)', 'Puerto Natales', 'Torres del Paine'], 'Explora la belleza del sur de Chile, desde los colores de Valparaíso hasta los impresionantes fiordos de la Patagonia', 2700.00, 'https://www.visitchile.cl/cruceros/cata_barco_200_300.jpg', '2025-08-01', 10, 180, ARRAY['Tracking', 'Parques Nacionales', 'Cultura y Gastronomía']);

INSERT INTO favoritos (id_usuario, id_viaje) VALUES
(2, 1),
(3, 3),
(4, 5),
(1, 1),
(1, 5),
(6, 1),
(7, 5);

INSERT INTO resenas (id_usuario, id_viaje, valoracion, descripcion) VALUES
(1, 2, 5, 'Un viaje espectacular, vistas increíbles y excelente servicio.'),
(2, 1, 4, 'Muy bonito, pero creo que podría haber mejorado la comida.'),
(3, 3, 5, 'Una experiencia inolvidable, los glaciares fueron impresionantes.'),
(4, 5, 3, 'El itinerario fue interesante, pero algunos lugares no cumplieron expectativas.'),
(5, 4, 4, 'Hermosos paisajes y un crucero muy cómodo.'),
(1, 3, 5, 'Un viaje increíble, me encantó cada detalle.'),
(1, 4, 5, 'Bellos paisajes, excelente panorama, comida gourmet, lo recomiendo al 100%.');


INSERT INTO mis_viajes (id_usuario, id_viaje) VALUES
(1, 2), -- Fernanda: Mediterráneo
(1, 4), -- Fernanda: Islas Griegas
(2, 1), -- Romina: Caribe
(3, 3), -- Faviana: Alaska
(4, 5); -- Carlos: Sudamérica

INSERT INTO mis_resenas (id_usuario, id_viaje, valoracion, descripcion) VALUES
(1, 2, 5, 'Un viaje espectacular, vistas increíbles y excelente servicio.'),
(2, 1, 4, 'Muy bonito, pero creo que podría haber mejorado la comida.'),
(3, 3, 5, 'Una experiencia inolvidable, los glaciares fueron impresionantes.'),
(4, 5, 3, 'El itinerario fue interesante, pero algunos lugares no cumplieron expectativas.'),
(5, 4, 4, 'Hermosos paisajes y un crucero muy cómodo.');




SELECT * FROM usuario;

SELECT * FROM viajes;


SELECT * FROM favoritos;


SELECT * FROM mis_resenas;


SELECT * FROM resenas;


SELECT * FROM mis_viajes;