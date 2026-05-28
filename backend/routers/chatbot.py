from fastapi import APIRouter, Depends
from pydantic import BaseModel
from google import genai
from google.genai import types
from sqlalchemy import text
from database import get_db
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = "gemini-2.5-flash"

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

class Mensagem(BaseModel):
    texto: str
    historico: list = []

@router.post("/saudacao")
def saudacao():
    return {
        "resposta": "Olá! Sou seu assistente de análise de crédito bancário.\n\nPosso te ajudar com:\n• Métricas e resultados do sistema\n• Explicações sobre o modelo de ML\n• Comparativo manual vs automatizado\n• Detalhes sobre as decisões de crédito\n\nPara começar, qual é o seu nome?"
    }

@router.post("/mensagem")
def chat(msg: Mensagem, db=Depends(get_db)):
    result = db.execute(text("""
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN decisao = 'APROVADO' THEN 1 ELSE 0 END) AS aprovados,
            SUM(CASE WHEN decisao = 'NEGADO' THEN 1 ELSE 0 END) AS negados,
            SUM(CASE WHEN decisao = 'REVISAO' THEN 1 ELSE 0 END) AS revisao
        FROM decisoes_credito
    """)).fetchone()

    system = f"""Você é um assistente especialista em análise de crédito bancário.
                  Responda sempre em português de forma objetiva e técnica. Seja conciso. Responda apenas o que foi perguntado. Se o usuário só disse o nome ou cumprimentou, apenas cumprimente-o pelo nome e pergunte como pode ajudar. Não mostre todos os dados sem ser solicitado.

DADOS REAIS DO BANCO:
- Total de decisões: {result.total}
- Aprovados automaticamente: {result.aprovados} ({round(result.aprovados/result.total*100,1)}%)
- Negados automaticamente: {result.negados} ({round(result.negados/result.total*100,1)}%)
- Em revisão manual: {result.revisao} ({round(result.revisao/result.total*100,1)}%)

COMPARATIVO:
- Processo manual: 53 analistas, 3.080 clientes perdidos, 1.250h, R$52,1Mi/mês
- Com automação: 4 analistas, 47 clientes perdidos, 79,5h, R$4,3Mi/mês
- Economia: R$47,8 milhões/mês

MODELO DE ML: Random Forest, acurácia 82.6%"""

    historico_formatado = []
    for item in msg.historico:
        historico_formatado.append(
            types.Content(role=item["role"], parts=[types.Part(text=item["parts"][0]["text"])])
        )
    historico_formatado.append(
        types.Content(role="user", parts=[types.Part(text=msg.texto)])
    )

    resposta = client.models.generate_content(
        model=MODEL,
        contents=historico_formatado,
        config=types.GenerateContentConfig(
            system_instruction=system,
            max_output_tokens=500,
            temperature=0.3
        )
    )
    return {"resposta": resposta.text}