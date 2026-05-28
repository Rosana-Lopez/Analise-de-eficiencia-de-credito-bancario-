const BASE_URL = "http://localhost:8000";

export const api = {
  metricas:    () => fetch(`${BASE_URL}/dashboard/metricas`).then(r => r.json()),
  comparativo: () => fetch(`${BASE_URL}/dashboard/comparativo`).then(r => r.json()),
  filaRevisao: () => fetch(`${BASE_URL}/dashboard/fila-revisao`).then(r => r.json()),
};