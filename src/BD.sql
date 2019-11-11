create table roles(
    id_rol int not null auto_increment PRIMARY KEY,
    nom_rol varchar(30) not null, 
    est_rol boolean not null
);

create table sucursales(
    id_suc int not null auto_increment PRIMARY KEY,
    nom_suc varchar(30) not null, 
    dir_suc varchar(30) not null, 
    tel_suc varchar(30) not null, 
    est_suc boolean not null
);

create table usuarios(
	ced_usu varchar(15) not null PRIMARY KEY,
    pas_usu varchar(15) not null,
    nom_usu varchar(50) not null,
    dir_usu varchar(50),
    ciu_usu varchar(50),
    dep_usu varchar(50),
    fec_nac_usu Date,
    id_rol int not null,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    id_suc int not null,
    FOREIGN KEY (id_suc) REFERENCES sucursales(id_suc),
    est_usu boolean not null
);