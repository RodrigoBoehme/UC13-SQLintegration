Codigo database MySql

create database if not exists petshop_api2;use petshop_api2;create table if not exists pets(id int auto_increment primary key,nome varchar(80) not null,especie enum('cachorro','gato','outro')not null,idade int not null,tutorvarchar(120) not null,criado_em timestamp default current_timestamp);

Outras dependencias

-express 
-mysql2
-ts-node-dev
-dotenv


começar com 
npm init -y
npm i express mysql2
npm i -D typescript ts-node-dev @types/express @types/node
npm i dotenv
npx tsc --init

