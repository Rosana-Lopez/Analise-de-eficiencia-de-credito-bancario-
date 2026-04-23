
CREATE TABLE clientes (
    id_cliente         INT IDENTITY(1,1) PRIMARY KEY,
    nome               VARCHAR(100)      NOT NULL,
    cpf                VARCHAR(14)       NOT NULL UNIQUE,
    idade              INT               NOT NULL,
    renda_mensal       DECIMAL(10,2)     NOT NULL,
    score_credito      INT               NOT NULL,
    possui_restricao   BIT               NOT NULL DEFAULT 0,
    historico_produto  VARCHAR(50)       NULL,
    data_cadastro      DATETIME          NOT NULL DEFAULT GETDATE()
);

CREATE TABLE analistas (
    id_analista    INT IDENTITY(1,1) PRIMARY KEY,
    nome           VARCHAR(100)      NOT NULL,
    matricula      VARCHAR(20)       NOT NULL UNIQUE,
    nivel          VARCHAR(20)       NOT NULL,
    turno          VARCHAR(10)       NOT NULL,
    ativo          BIT               NOT NULL DEFAULT 1
);