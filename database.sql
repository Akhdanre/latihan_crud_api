-- Active: 1710850075448@@127.0.0.1@5432@latihan_crud_api_db
CREATE DATABASE latihan_crud_api_db;

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    is_available BOOLEAN DEFAULT true
);

-- SHOW TABLE PENGGANTI /DT
SELECT
    *
FROM
    pg_catalog.pg_tables
WHERE
    schemaname NOT IN ('pg_catalog', 'information_schema');

-- DESCRIBE TABLE /d+
select
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
from
    INFORMATION_SCHEMA.COLUMNS
where
    table_name = 'products';


    
SELECT * FROM products;