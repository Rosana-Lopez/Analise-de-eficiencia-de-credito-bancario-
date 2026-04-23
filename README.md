# Análise de Eficiência Operacional — Concessão de Crédito Bancário

Sistema completo de análise de crédito e eficiência operacional bancária, desenvolvido como projeto de portfólio para demonstrar competências em Data Science, Machine Learning e Engenharia de Dados.

## Sobre o Projeto

Este projeto simula um sistema de decisão de crédito e gestão operacional para instituições financeiras. O objetivo é identificar gargalos no processo de concessão de crédito, reduzir custos operacionais e melhorar a experiência do cliente através de automação e análise de dados.

### Problema de Negócio

Instituições financeiras enfrentam desafios no processo de concessão de crédito:

- **Dependência de análise manual** — Processos lentos, sujeitos a erros e com alto custo operacional
- **SLA estourado** — Prazos de resposta não cumpridos, gerando insatisfação e perda de clientes
- **Custos ocultos** — Dificuldade em mensurar o impacto financeiro de ineficiências operacionais

### Solução Proposta

Um sistema integrado que combina Machine Learning para classificação de risco com simulação operacional para identificar gargalos e otimizar a alocação de recursos.

## Arquitetura do Sistema
                     FLUXO DO SISTEMA
                     
Cliente solicita crédito
          |
          v
+---------------------+
|   MODELO DE ML      |  Prevê probabilidade de inadimplência
|   (classificação)   |
+---------------------+
          |
          v
+---------------------+
|  SISTEMA DE DECISÃO |  Aplica regras baseadas no risco
+---------------------+
          |
   +------+------+
   |      |      |
   v      v      v
+------+ +------+ +------+
|APROVA| |MANUAL| |REPROVA|
| AUTO | |      | | AUTO  |
+------+ +------+ +------+
|
v
+---------------------+
|    PRIORIZAÇÃO      |  Ordena fila por valor/perfil
|    DA FILA          |
+---------------------+
|
v
+---------------------+
|     SIMULAÇÃO       |  Calcula backlog, tempo de espera,
|    OPERACIONAL      |  gargalos, capacidade de analistas
+---------------------+
|
v
+---------------------+
|     POWER BI        |  Dashboard com KPIs operacionais
+---------------------+
|
v
+---------------------+
|  STREAMLIT + CHAT   |  Interface web com chatbot IA
+---------------------+

## Componentes

| Componente | Descrição | Status |
|------------|-----------|--------|
| Infraestrutura | Ambiente, banco de dados, estrutura do projeto | Concluido |
| Geração de Dados | Dados simulados inseridos no SQL Server | Concluido |
| Modelo de ML | Classificação de risco de inadimplência | Em desenvolvimento |
| Sistema de Decisão | Regras para aprovação/reprovação automática | Pendente |
| Priorização de Fila | Ordenação de análises manuais por criticidade | Pendente |
| Simulação Operacional | Cálculo de backlog e tempo de espera | Pendente |
| Dashboard Power BI | Visualização de KPIs operacionais | Pendente |
| Aplicação Web | Interface Streamlit com chatbot | Pendente |

## Stack Tecnológica

- **Linguagem:** Python 3.14
- **Banco de Dados:** SQL Server
- **Machine Learning:** scikit-learn
- **Visualização:** Power BI, matplotlib, seaborn
- **Aplicação Web:** Streamlit
- **Chatbot:** OpenAI API

## Estrutura do Projeto
eficiencia-operacional-bancaria/
|
├── notebooks/          # Desenvolvimento e análises
├── data/               # Dados gerados
├── src/                # Código fonte (quando necessário)
├── app/                # Aplicação Streamlit
├── sql/                # Scripts SQL
|
├── .env                # Variáveis de ambiente (não versionado)
├── .env.example        # Exemplo de configuração
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Este arquivo
└── requirements.txt    # Dependências Python

## Como Executar

### Pré-requisitos

- Python 3.10+
- SQL Server
- ODBC Driver 17 for SQL Server

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/Rosana-Lopez/Analise-de-eficiencia-de-credito-bancario-.git
cd Analise-de-eficiencia-de-credito-bancario-
```

2. Instale as dependências
```bash
pip install -r requirements.txt
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Crie o banco de dados no SQL Server
```sql
CREATE DATABASE CreditoOperacional;
```

5. Execute os notebooks na ordem numérica

## Dados

Os dados utilizados neste projeto são simulados para fins educacionais e de demonstração. A estrutura foi modelada para refletir cenários reais de concessão de crédito.

### Variáveis do Dataset

| Variável | Descrição |
|----------|-----------|
| idade | Idade do cliente |
| renda_mensal | Renda mensal declarada |
| valor_solicitado | Valor do empréstimo |
| prazo_meses | Prazo de pagamento |
| score_credito | Score de crédito (0-1000) |
| tem_imovel | Possui imóvel próprio |
| tem_veiculo | Possui veículo |
| tempo_emprego_anos | Tempo no emprego atual |
| qtd_emprestimos_ativos | Empréstimos ativos |
| historico_inadimplencia | Histórico de inadimplência |
| tipo_credito | Pessoal ou consignado |
| inadimplente | Variável alvo do modelo de ML |

## Roadmap

- [x] Configuração inicial do projeto
- [x] Estrutura de pastas e versionamento
- [x] Conexão com SQL Server
- [x] Geração de dados simulados
- [ ] Treinamento do modelo de ML
- [ ] Sistema de decisão automática
- [ ] Sistema de priorização
- [ ] Simulação operacional
- [ ] Dashboard Power BI
- [ ] Aplicação Streamlit
- [ ] Chatbot com IA

## Autor

Desenvolvido como projeto de portfólio para demonstração de competências em Data Science e Engenharia de Dados.