
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

CREATE TABLE solicitacoes_credito (
    id_solicitacao      INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente          INT               NOT NULL,
    id_analista         INT               NULL,
    valor_solicitado    DECIMAL(10,2)     NOT NULL,
    finalidade          VARCHAR(50)       NOT NULL,
    nivel_risco         VARCHAR(10)       NOT NULL,
    tipo_analise        VARCHAR(10)       NOT NULL,
    status              VARCHAR(20)       NOT NULL DEFAULT 'aguardando',
    data_solicitacao    DATETIME          NOT NULL DEFAULT GETDATE(),
    data_inicio_analise DATETIME          NULL,
    data_conclusao      DATETIME          NULL,
    canal               VARCHAR(20)       NOT NULL,

    FOREIGN KEY (id_cliente)  REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_analista) REFERENCES analitas(id_analista)
);

CREATE TABLE decisoes (
    id_decisao         INT IDENTITY(1,1) PRIMARY KEY,
    id_solicitacao     INT               NOT NULL,
    resultado          VARCHAR(20)       NOT NULL,  -- 'aprovado', 'recusado', 'cancelado'
    motivo_recusa      VARCHAR(100)      NULL,
    valor_aprovado     DECIMAL(10,2)     NULL,
    tempo_espera_min   INT               NULL,
    tempo_analise_min  INT               NULL,
    cliente_perdido    BIT               NOT NULL DEFAULT 0,

    FOREIGN KEY (id_solicitacao) REFERENCES solicitacoes_credito(id_solicitacao)
);


CREATE TABLE clientes (
    id_cliente              INT IDENTITY(1,1) PRIMARY KEY,
    nome                    VARCHAR(100)      NOT NULL,
    cpf                     VARCHAR(14)       NOT NULL UNIQUE,
    idade                   INT               NOT NULL,
    renda_mensal            DECIMAL(10,2)     NOT NULL,
    score_credito           INT               NOT NULL,
    tem_imovel              BIT               NOT NULL DEFAULT 0,
    tem_veiculo             BIT               NOT NULL DEFAULT 0,
    tempo_emprego_anos      DECIMAL(4,1)      NOT NULL,
    qtd_emprestimos_ativos  INT               NOT NULL DEFAULT 0,
    historico_inadimplencia BIT               NOT NULL DEFAULT 0,
    possui_restricao        BIT               NOT NULL DEFAULT 0,
    historico_produto       VARCHAR(50)       NULL,
    data_cadastro           DATETIME          NOT NULL DEFAULT GETDATE()
);


CREATE TABLE analistas (
    id_analista    INT IDENTITY(1,1) PRIMARY KEY,
    nome           VARCHAR(100)      NOT NULL,
    matricula      VARCHAR(20)       NOT NULL UNIQUE,
    nivel          VARCHAR(20)       NOT NULL,
    turno          VARCHAR(10)       NOT NULL,
    ativo          BIT               NOT NULL DEFAULT 1
);


CREATE TABLE solicitacoes_credito (
    id_solicitacao      INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente          INT               NOT NULL,
    id_analista         INT               NULL,
    valor_solicitado    DECIMAL(10,2)     NOT NULL,
    prazo_meses         INT               NOT NULL,
    finalidade          VARCHAR(50)       NOT NULL,
    tipo_credito        VARCHAR(20)       NOT NULL,
    nivel_risco         VARCHAR(10)       NOT NULL,
    tipo_analise        VARCHAR(10)       NOT NULL,
    status              VARCHAR(20)       NOT NULL DEFAULT 'aguardando',
    data_solicitacao    DATETIME          NOT NULL DEFAULT GETDATE(),
    data_inicio_analise DATETIME          NULL,
    data_conclusao      DATETIME          NULL,
    canal               VARCHAR(20)       NOT NULL,

    FOREIGN KEY (id_cliente)  REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_analista) REFERENCES analistas(id_analista)
);

CREATE TABLE decisoes (
    id_decisao         INT IDENTITY(1,1) PRIMARY KEY,
    id_solicitacao     INT               NOT NULL,
    resultado          VARCHAR(20)       NOT NULL,
    motivo_recusa      VARCHAR(100)      NULL,
    valor_aprovado     DECIMAL(10,2)     NULL,
    inadimplente       BIT               NOT NULL DEFAULT 0,
    tempo_espera_min   INT               NULL,
    tempo_analise_min  INT               NULL,
    cliente_perdido    BIT               NOT NULL DEFAULT 0,

    FOREIGN KEY (id_solicitacao) REFERENCES solicitacoes_credito(id_solicitacao)
);