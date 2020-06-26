create database db_projetos

create table tb_alunos(
id int not null auto_increment primary key,
nome varchar(255) not null,
email varchar(50) not null,
senha varchar(100) not null,
cidade varchar(150) not null,
uf varchar (2) not null
)

select * from tb_alunos
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'negrolas@123'

