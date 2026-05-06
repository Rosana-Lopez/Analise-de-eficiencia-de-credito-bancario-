# Análise de Eficiência Operacional — Concessão de Crédito Bancário

Sistema completo de análise de crédito e eficiência operacional bancária, desenvolvido como projeto de portfólio para demonstrar competências em Data Science, Machine Learning e Engenharia de Dados.

## Sobre o Projeto

Este projeto simula um sistema de decisão de crédito e gestão operacional para instituições financeiras. O objetivo é identificar gargalos no processo de concessão de crédito, reduzir perdas financeiras e melhorar a experiência do cliente através de automação e análise de dados.

### Problema de Negócio

Instituições financeiras enfrentam desafios no processo de concessão de crédito:

- **Dependência de análise manual** — Processos lentos, sujeitos a erros e com alto custo operacional
- **SLA estourado** — Prazos de resposta não cumpridos, gerando perda de clientes para concorrentes
- **Perdas por inadimplência** — Aprovação de clientes de risco por erro humano sob pressão de tempo

### Solução Proposta

Um sistema integrado que combina Machine Learning para classificação de risco com regras de negócio automatizadas, priorização inteligente de fila e simulação operacional para quantificar o impacto financeiro.

### Resultados Alcançados

| Métrica | Processo Manual | Com o Sistema | Redução |
|---|---|---|---|
| Tempo de análise | 1.250 horas | 79,5 horas | 94% |
| Analistas necessários | 53 | 4 | 92% |
| Clientes perdidos | 3.080 | 47 | 98% |
| Total de perdas | R$52,1 milhões | R$4,3 milhões | 92% |

## Arquitetura do Sistema
Cliente solicita crédito
|
v
+-------------------------+
|      MODELO DE ML       |
|  Prevê inadimplência    |
+-------------------------+
|
v
+-------------------------+
|   SISTEMA DE DECISÃO    |
|  Hard rules + Score ML  |
+-------------------------+
|
+-----+-----+
|     |     |
v     v     v
+-------+-------+--------+
| BAIXO | MÉDIO |  ALTO  |
| AUTO  |MANUAL | RECUSA |
+-------+-------+--------+
|
v
+-------------------------+
|     PRIORIZAÇÃO         |
|  Fila inteligente por   |
|    perfil e prazo       |
+-------------------------+
|
v
+-------------------------+
|  SIMULAÇÃO OPERACIONAL  |
|  Comparativo manual vs  |
|      automatizado       |
+-------------------------+
|
v
+-------------------------+
|       POWER BI          |
|  Dashboard KPIs         |
+-------------------------+
|
v
+-------------------------+
|   STREAMLIT + CHATBOT   |
|  Interface web com IA   |
+-------------------------+

## Componentes

| Componente | Descrição | Status |
|---|---|---|
| Infraestrutura | Ambiente, banco de dados, estrutura do projeto | Concluído |
| Geração de Dados | 5.000 clientes simulados com perfis correlacionados | Concluído |
| Modelo de ML | Random Forest com recall de 69% para inadimplentes | Concluído |
| Sistema de Decisão | Hard rules + score ML com faixas de aprovação | Concluído |
| Priorização de Fila | Fila inteligente com semáforo e pontuação de prioridade | Concluído |
| Simulação Operacional | Comparativo manual vs automatizado com impacto financeiro | Concluído |
| Dashboard Power BI | Visualização de KPIs operacionais | Pendente |
| Aplicação Web | Interface Streamlit com chatbot | Pendente |

## Stack Tecnológica

- **Linguagem:** Python 3.14
- **Banco de Dados:** SQL Server
- **Machine Learning:** scikit-learn, imbalanced-learn
- **Visualização:** Power BI, matplotlib, seaborn
- **Aplicação Web:** Streamlit
- **Chatbot:** Anthropic API

## Estrutura do Projeto
eficiencia-operacional-bancaria/
|
├── notebooks/
│   ├── 01_contexto_e_geracao_dados.ipynb
│   ├── 02_geracao_dados.ipynb
│   ├── 02_geracao_dados_v2.ipynb
│   ├── 03_modelo_ml.ipynb
│   ├── 04_sistema_decisao.ipynb
│   ├── 05_sistema_priorizacao.ipynb
│   └── 06_simulacao_operacional.ipynb
├── data/
├── src/
├── app/
├── sql/
├── .env
├── .env.example
├── .gitignore
├── README.md
└── requirements.txt

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
```

4. Crie o banco de dados no SQL Server

```sql
CREATE DATABASE CreditoOperacional;
```

5. Execute os notebooks na ordem numérica

## Dados

Os dados utilizados neste projeto são simulados para fins educacionais. Gerados em 3 perfis correlacionados para garantir padrões realistas de comportamento financeiro.

| Perfil | Quantidade | Taxa de Inadimplência |
|---|---|---|
| Bom pagador | 2.750 (55%) | 5% |
| Intermediário | 1.250 (25%) | 30% |
| Risco | 1.000 (20%) | 75% |

### Variáveis do Dataset

| Variável | Descrição |
|---|---|
| idade | Idade do cliente |
| renda_mensal | Renda mensal declarada |
| valor_solicitado | Valor do empréstimo |
| prazo_meses | Prazo de pagamento |
| score_credito | Pontuação de crédito (0-1000) |
| tem_imovel | Possui imóvel próprio |
| tem_veiculo | Possui veículo |
| tempo_emprego_anos | Tempo no emprego atual |
| qtd_emprestimos_ativos | Empréstimos ativos |
| historico_inadimplencia | Histórico de inadimplência |
| possui_restricao | Restrição ativa no nome |
| inadimplente | Variável alvo do modelo de ML |

## Roadmap

- [x] Configuração inicial do projeto
- [x] Estrutura de pastas e versionamento
- [x] Conexão com SQL Server
- [x] Geração de dados simulados
- [x] Treinamento do modelo de ML
- [x] Sistema de decisão automático
- [x] Sistema de priorização
- [x] Simulação operacional
- [ ] Dashboard Power BI
- [ ] Aplicação Streamlit
- [ ] Chatbot com IA

## Autor

Rosana Lopez — Estudante de Ciência de Dados desenvolvendo competências em Engenharia de Dados, Machine Learning e Business Intelligence.