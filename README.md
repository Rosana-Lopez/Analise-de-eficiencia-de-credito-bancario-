<div align="center">

# Análise de Eficiência Operacional — Concessão de Crédito Bancário

Sistema completo de análise de crédito e eficiência operacional bancária, desenvolvido como projeto de portfólio para demonstração de competências em Ciência de Dados, Machine Learning e Engenharia de Dados.

</div>

---

## Sobre o Projeto

Este projeto simula um sistema de decisão de crédito e gestão operacional para instituições financeiras. O objetivo é identificar gargalos no processo de concessão de crédito, reduzir perdas financeiras e melhorar a experiência do cliente através de automação e análise de dados.

## Problema

Instituições financeiras enfrentam desafios no processo de concessão de crédito:

- **Dependência de análise manual** — Processos lentos, sujeitos a erros e com alto custo operacional
- **SLA estourado** — Prazos de resposta não cumpridos, gerando perda de clientes para concorrentes
- **Perdas por inadimplência** — Aprovação de clientes de risco por erro humano sob pressão de tempo

## Proposta

Um sistema integrado que combina Machine Learning para classificação de risco com regras de negócio automatizadas, priorização inteligente de fila e simulação operacional para quantificar o impacto financeiro.

## Resultados

| Métrica | Processo Manual | Com o Sistema | Redução |
|---|---|---|---|
| Tempo de análise | 1.250 horas | 79,5 horas | **94%** |
| Analistas necessários | 53 | 4 | **92%** |
| Clientes perdidos | 3.080 | 47 | **98%** |
| Perdas financeiras | R$ 52,1 milhões | R$ 4,3 milhões | **92%** |

---

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
|  Hard Rules + Score ML  |
+-------------------------+
|
+----+----+
|    |    |
v    v    v
+------+-------+-------+
| BAIXO| MÉDIO |  ALTO |
| AUTO |MANUAL |RECUSA |
+------+-------+-------+
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
|   DASHBOARD REACT       |
|  Visualização de KPIs   |
+-------------------------+
|
v
+-------------------------+
|   STREAMLIT + CHATBOT   |
|  Interface web com IA   |
+-------------------------+

---

## Componentes

| Componente | Descrição | Status |
|---|---|---|
| Infraestrutura | Ambiente, banco de dados, estrutura do projeto | ✅ Concluído |
| Geração de Dados | 5.000 clientes simulados com perfis correlacionados | ✅ Concluído |
| Modelo de ML | Random Forest com recall de 69% para inadimplentes | ✅ Concluído |
| Sistema de Decisão | Hard Rules + Score ML com faixas de aprovação | ✅ Concluído |
| Priorização de Fila | Fila inteligente com semáforo e pontuação de prioridade | ✅ Concluído |
| Simulação Operacional | Comparativo manual vs automatizado com impacto financeiro | ✅ Concluído |
| Dashboard React | Visualização de KPIs operacionais | ✅ Concluído |
| Aplicativo Web | Interface Streamlit com chatbot | 🔄 Em desenvolvimento |

---

## Stack Tecnológica

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)

**Linguagem:** Python 3.10+  
**Banco de Dados:** SQL Server  
**Machine Learning:** scikit-learn, imbalanced-learn  
**Visualização:** React + Vite, matplotlib, seaborn  
**Aplicativo Web:** Streamlit  
**Chatbot:** Google Gemini API  

---

## Estrutura do Projeto
eficiencia-operacional-bancaria/
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

---

## Como Executar

**Pré-requisitos**
- Python 3.10+
- SQL Server
- ODBC Driver 17 for SQL Server

**Instalação**

```bash
# Clonar o repositório
git clone https://github.com/Rosana-Lopez/Analise-de-eficiencia-de-credito-bancario-.git
cd Analise-de-eficiencia-de-credito-bancario-

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env

# Criar o banco de dados no SQL Server
CREATE DATABASE CreditoOperacional;

# Executar os notebooks na ordem numérica
```

---

## Dados

Os dados utilizados neste projeto são simulados para fins educacionais, gerados em 3 perfis correlacionados para garantir padrões realistas de comportamento financeiro.

| Perfil | Quantidade | Taxa de Inadimplência |
|---|---|---|
| Bom pagador | 2.750 (55%) | 5% |
| Intermediário | 1.250 (25%) | 30% |
| Risco | 1.000 (20%) | 75% |

---

## Variáveis do Conjunto de Dados

| Variável | Descrição |
|---|---|
| idade | Idade do cliente |
| renda_mensal | Renda mensal declarada |
| valor_solicitado | Valor do empréstimo solicitado |
| prazo_meses | Prazo de pagamento (meses) |
| pontuacao_credito | Pontuação de crédito (0-1000) |
| tem_imovel | Possui imóvel próprio |
| tem_veiculo | Possui veículo próprio |
| tempo_emprego_anos | Tempo no emprego atual |
| qtd_emprestimos_ativos | Empréstimos ativos |
| historico_inadimplencia | Histórico de inadimplência |
| possui_restricao | Restrição ativa no nome |
| inadimplente | Variável alvo do modelo de ML |

---

## Roteiro

- [x] Configuração inicial do projeto
- [x] Estrutura de pastas e versionamento
- [x] Conexão com SQL Server
- [x] Geração de dados simulados
- [x] Treinamento do modelo de ML
- [x] Sistema de decisão automática
- [x] Sistema de priorização
- [x] Simulação operacional
- [x] Dashboard React
- [ ] Aplicativo Streamlit
- [ ] Chatbot com IA

---

## Autor

**Rosana Lopez** — Estudante de Ciência de Dados desenvolvendo competências em Engenharia de Dados, Machine Learning e Business Intelligence.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/rosanalopez-765203219)
[![Portfolio](https://img.shields.io/badge/Portfolio-34d399?style=flat-square&logo=vercel&logoColor=black)](https://rosana-lopez.github.io/rosana-portfolio/)
