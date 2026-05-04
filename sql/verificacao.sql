SELECT COUNT(*) AS total_clientes FROM clientes;
SELECT COUNT(*) AS total_analistas FROM analistas;
SELECT COUNT(*) AS total_solicitacoes FROM solicitacoes_credito;
SELECT COUNT(*) AS total_decisoes FROM decisoes;
SELECT MIN(id_analista), MAX(id_analista) FROM analistas;
SELECT MIN(id_cliente), MAX(id_cliente) FROM clientes;
DELETE FROM decisoes;
DELETE FROM solicitacoes_credito;
DELETE FROM analistas;
DELETE FROM clientes;

DBCC CHECKIDENT ('decisoes', RESEED, 0);
DBCC CHECKIDENT ('solicitacoes_credito', RESEED, 0);
DBCC CHECKIDENT ('analistas', RESEED, 0);
DBCC CHECKIDENT ('clientes', RESEED, 0);