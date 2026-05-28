from fastapi import APIRouter, Depends
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/metricas")
def get_metricas(db=Depends(get_db)):
    result = db.execute(text("""
        SELECT
            COUNT(*) AS total,
           SUM(CASE WHEN decisao = 'APROVADO' THEN 1 ELSE 0 END) AS aprovado_auto,
           SUM(CASE WHEN decisao = 'NEGADO' THEN 1 ELSE 0 END) AS negado_auto,
           SUM(CASE WHEN decisao = 'REVISAO' THEN 1 ELSE 0 END) AS revisao_manual  
        FROM decisoes_credito
    """)).fetchone()

    total = result.total or 1
    return {
        "total": result.total,
        "aprovado_auto": {
            "qtd": result.aprovado_auto,
            "pct": round((result.aprovado_auto or 0) / total * 100, 1)
        },
        "negado_auto": {
            "qtd": result.negado_auto,
            "pct": round((result.negado_auto or 0) / total * 100, 1)
        },
        "revisao_manual": {
            "qtd": result.revisao_manual,
            "pct": round((result.revisao_manual or 0) / total * 100, 1)
        },
    }

@router.get("/debug")
def debug(db=Depends(get_db)):
    row = db.execute(text(
        "SELECT TOP 1 * FROM decisoes_credito"
    )).fetchone()
    return dict(row._mapping)


@router.get("/comparativo")
def get_comparativo():
    return {
        "manual": {
            "analistas":         53,
            "clientes_perdidos": 3080,
            "horas":             1250,
            "prejuizo_mi":       52.1,
        },
        "automatizado": {
            "analistas":         4,
            "clientes_perdidos": 47,
            "horas":             79.5,
            "prejuizo_mi":       4.3,
        },
        "economia_mi": 47.8,
    }

@router.get("/fila-revisao")
def get_fila_revisao(db=Depends(get_db)):
    rows = db.execute(text("""
        SELECT TOP 20
            nome,
            score_credito,
            renda_mensal,
            valor_solicitado,
            probabilidade_risco,
            motivo
        FROM decisoes_credito
        WHERE decisao = 'REVISAO'
        ORDER BY valor_solicitado DESC
    """)).fetchall()
    return [dict(r._mapping) for r in rows]