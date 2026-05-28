const BASE_URL = "http://localhost:8000";

export const api = {
  metricas:    () => fetch(`${BASE_URL}/dashboard/metricas`).then(r => r.json()),
  comparativo: () => fetch(`${BASE_URL}/dashboard/comparativo`).then(r => r.json()),
  filaRevisao: () => fetch(`${BASE_URL}/dashboard/fila-revisao`).then(r => r.json()),

  saudacao: () => fetch(`${BASE_URL}/chatbot/saudacao`, { method: "POST" }).then(r => r.json()),

  chat: (texto, historico = []) => fetch(`${BASE_URL}/chatbot/mensagem`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, historico })
  }).then(r => r.json()),
};