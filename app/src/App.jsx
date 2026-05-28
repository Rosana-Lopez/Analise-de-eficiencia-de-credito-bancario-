import { useState, useEffect } from 'react';
import { MessageCircle, Send, Users, AlertTriangle, Clock, DollarSign, TrendingDown, X, Bot, CheckCircle, XCircle, Search, Zap, Brain, ArrowRight } from 'lucide-react';
import { api } from './api'; 
import ReactMarkdown from 'react-markdown';

const Gauge = ({ value, max, sublabel, color, percentage }) => {
  const radius = 70;
  const strokeWidth = 12;
  const circumference = Math.PI * radius;
  const fillPercentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width="180" height="100" viewBox="0 0 180 100">
        <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="#2D3A4A" strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        <text x="90" y="65" textAnchor="middle" fill={color} fontSize="26" fontWeight="600">{typeof value === 'number' ? value.toLocaleString('pt-BR') : value}</text>
        <text x="90" y="85" textAnchor="middle" fill="#8892A0" fontSize="11">{sublabel}</text>
      </svg>
      <div className="text-center mt-1">
        <span style={{ color: color }} className="text-xs font-semibold">{percentage}</span>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, value, label, color, iconBg, trend, trendValue }) => (
  <div className="rounded-xl p-4 flex flex-col justify-between h-24" style={{ backgroundColor: '#1E2A38' }}>
    <div className="flex items-start justify-between">
      <div className="p-2 rounded-lg" style={{ backgroundColor: iconBg }}>
        <Icon size={18} color={color} />
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold" style={{ color: color }}>{value}</span>
        {trend && (
          <div className="flex items-center justify-end gap-1 mt-1">
            <TrendingDown size={14} color="#10B981" />
            <span className="text-xs" style={{ color: '#10B981' }}>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
    <span className="text-xs mt-2" style={{ color: '#8892A0' }}>{label}</span>
  </div>
);

const ComparisonCard = ({ label, before, after, reduction, icon: Icon }) => (
  <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
        <Icon size={20} color="#10B981" />
      </div>
      <span className="text-white font-semibold">{label}</span>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-center">
        <p className="text-xs mb-1" style={{ color: '#8892A0' }}>Antes</p>
        <p className="text-xl font-bold" style={{ color: '#FF6B6B' }}>{before}</p>
      </div>
      <ArrowRight size={24} color="#8892A0" />
      <div className="text-center">
        <p className="text-xs mb-1" style={{ color: '#8892A0' }}>Depois</p>
        <p className="text-xl font-bold" style={{ color: '#10B981' }}>{after}</p>
      </div>
      <div className="text-center px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
        <p className="text-lg font-bold" style={{ color: '#10B981' }}>-{reduction}%</p>
      </div>
    </div>
  </div>
);

const FlowStep = ({ title, description, icon: Icon, color, isLast }) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
        <Icon size={24} color="white" />
      </div>
      {!isLast && <div className="w-0.5 h-12 mt-2" style={{ backgroundColor: '#2D3A4A' }}></div>}
    </div>
    <div className="pt-2">
      <h4 className="text-white font-semibold mb-1">{title}</h4>
      <p className="text-sm" style={{ color: '#8892A0' }}>{description}</p>
    </div>
  </div>
);

const DecisionDistribution = () => {
  const decisions = [
    { label: 'Aprovado Automatico', value: 60.1, count: 3006, color: '#10B981' },
    { label: 'Negado Automatico', value: 33.5, count: 1676, color: '#EF4444' },
    { label: 'Analise Manual', value: 6.4, count: 318, color: '#F59E0B' },
  ];

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
      <h3 className="text-white font-semibold mb-4">Distribuicao das Decisoes</h3>
      <div className="flex rounded-lg overflow-hidden h-8 mb-4">
        {decisions.map((d, i) => (
          <div key={i} style={{ backgroundColor: d.color, width: `${d.value}%` }} className="flex items-center justify-center">
            {d.value > 15 && <span className="text-white text-xs font-medium">{d.value}%</span>}
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {decisions.map((d, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
              <span className="text-sm text-white">{d.label}</span>
            </div>
            <span className="text-sm" style={{ color: '#8892A0' }}>{d.count.toLocaleString()} ({d.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LossesBar = ({ isComparison = false }) => {
  if (isComparison) {
    const losses = [
      { label: 'Inadimplencia', before: 24.37, after: 3.2, color: '#EA2027' },
      { label: 'Credito nao convertido', before: 19.5, after: 0.8, color: '#FF6B6B' },
      { label: 'Custo operacional', before: 8.1, after: 0.3, color: '#FF9F43' },
    ];

    return (
      <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
        <h3 className="text-white font-semibold mb-4">Reducao de Perdas Financeiras</h3>
        <div className="space-y-4">
          {losses.map((loss, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white">{loss.label}</span>
                <span className="text-sm" style={{ color: '#10B981' }}>-{Math.round((1 - loss.after / loss.before) * 100)}%</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: '#2D3A4A' }}>
                  <div className="h-3 rounded-full" style={{ backgroundColor: loss.color, width: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="text-xs" style={{ color: '#8892A0' }}>R${loss.before}Mi</span>
              </div>
              <div className="flex gap-2 items-center mt-1">
                <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: '#2D3A4A' }}>
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#10B981', width: `${(loss.after / loss.before) * 100}%` }}></div>
                </div>
                <span className="text-xs" style={{ color: '#10B981' }}>R${loss.after}Mi</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
          <span className="text-white font-semibold">Total de Economia</span>
          <span className="text-2xl font-bold" style={{ color: '#10B981' }}>R$ 47,8 Mi/mes</span>
        </div>
      </div>
    );
  }

  const losses = [
    { label: 'Inadimplencia', value: 24.37, color: '#EA2027', width: '47%' },
    { label: 'Credito nao convertido', value: 19.5, color: '#FF6B6B', width: '37%' },
    { label: 'Custo operacional', value: 8.1, color: '#FF9F43', width: '16%' },
  ];

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
      <h3 className="text-white font-semibold mb-1">Composicao das Perdas Financeiras</h3>
      <p className="text-xs mb-4" style={{ color: '#8892A0' }}>Total: R$ 52,1 milhoes/mes</p>
      <div className="flex rounded-lg overflow-hidden h-6 mb-4">
        {losses.map((loss, i) => (
          <div key={i} style={{ backgroundColor: loss.color, width: loss.width }} className="flex items-center justify-center">
            <span className="text-white text-xs font-medium">{loss.value > 15 ? `R$${loss.value}Mi` : ''}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {losses.map((loss, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: loss.color }}></div>
            <span className="text-xs text-white">{loss.label}</span>
            <span className="text-xs" style={{ color: '#8892A0' }}>R${loss.value}Mi</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatMessage = ({ message, isBot }) => (
  <div className={`flex gap-2 mb-3 ${isBot ? '' : 'flex-row-reverse'}`}>
    {isBot && (
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#3B82F6' }}>
        <Bot size={16} color="white" />
      </div>
    )}
    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${isBot ? 'rounded-tl-sm' : 'rounded-tr-sm'}`} style={{ backgroundColor: isBot ? '#1E2A38' : '#3B82F6', color: 'white', whiteSpace: 'pre-line' }}>
     {isBot ? <ReactMarkdown>{message}</ReactMarkdown> : message}
    </div>
  </div>
);

const ProblemaPage = ({ comparativo, simulacao }) => (
  <>
    <div className="grid grid-cols-4 gap-4 mb-6">
      <MetricCard icon={Users} value={comparativo?.manual?.analistas ?? '53'} label="Analistas Necessarios" color="#FF6B6B" iconBg="rgba(255, 107, 107, 0.2)" />
      <MetricCard icon={AlertTriangle} value={comparativo?.manual?.clientes_perdidos ?? '3.080'} label="Clientes Perdidos" color="#FF9F43" iconBg="rgba(255, 159, 67, 0.2)" />
      <MetricCard icon={Clock} value={comparativo?.manual?.horas ? `${comparativo.manual.horas}h` : '1.250h'} label="Tempo Operacional" color="#EE5A24" iconBg="rgba(238, 90, 36, 0.2)" />
      <MetricCard icon={DollarSign} value={comparativo?.manual?.prejuizo_mi ? `R$${comparativo.manual.prejuizo_mi}Mi` : 'R$52Mi'} label="Perdas Totais" color="#EA2027" iconBg="rgba(234, 32, 39, 0.2)" />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="rounded-xl p-4" style={{ backgroundColor: '#1E2A38' }}>
        <h3 className="text-white font-semibold mb-1">Capacidade de Analistas</h3>
        <p className="text-xs mb-2" style={{ color: '#8892A0' }}>Necessario vs Disponivel</p>
        <Gauge value={comparativo?.manual?.analistas ?? 53} max={20} sublabel="de 20 disponiveis" color="#FF6B6B" percentage="265% ACIMA DA CAPACIDADE" />
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: '#1E2A38' }}>
        <h3 className="text-white font-semibold mb-1">Clientes Perdidos por Demora</h3>
        <p className="text-xs mb-2" style={{ color: '#8892A0' }}>Taxa de abandono no processo</p>
        <Gauge value={comparativo?.manual?.clientes_perdidos ?? 3080} max={500} sublabel="clientes/mes" color="#FF9F43" percentage="616% ACIMA DO ACEITAVEL" />
      </div>
    </div>
    <LossesBar />
    <FunilConversao simulacao={simulacao} />
  </>
);;

const SolucaoPage = () => (
  <>
    <div className="grid grid-cols-4 gap-4 mb-6">
      <MetricCard icon={Brain} value="95%" label="Acuracia do Modelo ML" color="#8B5CF6" iconBg="rgba(139, 92, 246, 0.2)" />
      <MetricCard icon={Zap} value="93.6%" label="Decisoes Automaticas" color="#3B82F6" iconBg="rgba(59, 130, 246, 0.2)" />
      <MetricCard icon={Search} value="6.4%" label="Revisao Manual" color="#F59E0B" iconBg="rgba(245, 158, 11, 0.2)" />
      <MetricCard icon={CheckCircle} value="318" label="Casos Priorizados" color="#10B981" iconBg="rgba(16, 185, 129, 0.2)" />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
        <h3 className="text-white font-semibold mb-6">Fluxo do Sistema Automatizado</h3>
        <div className="space-y-2">
          <FlowStep title="Solicitacao de Credito" description="Cliente envia pedido pelo canal digital" icon={Users} color="#3B82F6" />
          <FlowStep title="Modelo de ML" description="Analisa probabilidade de inadimplencia" icon={Brain} color="#8B5CF6" />
          <FlowStep title="Sistema de Decisao" description="Classifica em aprovado, negado ou revisao" icon={Zap} color="#10B981" />
          <FlowStep title="Priorizacao da Fila" description="Ordena revisoes por urgencia e valor" icon={Search} color="#F59E0B" isLast />
        </div>
      </div>
      <DecisionDistribution />
    </div>
    <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
      <h3 className="text-white font-semibold mb-4">Regras de Decisao Automatica</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} color="#10B981" />
            <span className="font-semibold" style={{ color: '#10B981' }}>Aprovacao Auto</span>
          </div>
          <p className="text-sm" style={{ color: '#8892A0' }}>Risco menor ou igual a 45%</p>
          <p className="text-2xl font-bold mt-2" style={{ color: '#10B981' }}>3.006</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Search size={20} color="#F59E0B" />
            <span className="font-semibold" style={{ color: '#F59E0B' }}>Revisao Manual</span>
          </div>
          <p className="text-sm" style={{ color: '#8892A0' }}>Risco entre 45% e 85%</p>
          <p className="text-2xl font-bold mt-2" style={{ color: '#F59E0B' }}>318</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={20} color="#EF4444" />
            <span className="font-semibold" style={{ color: '#EF4444' }}>Negacao Auto</span>
          </div>
          <p className="text-sm" style={{ color: '#8892A0' }}>Risco maior que 85%</p>
          <p className="text-2xl font-bold mt-2" style={{ color: '#EF4444' }}>1.676</p>
        </div>
      </div>
    </div>
  </>
);

const ResultadoPage = () => (
  <>
    <div className="grid grid-cols-4 gap-4 mb-6">
      <MetricCard icon={Clock} value="79,5h" label="Tempo Operacional" color="#10B981" iconBg="rgba(16, 185, 129, 0.2)" trend="down" trendValue="-94%" />
      <MetricCard icon={Users} value="4" label="Analistas Necessarios" color="#10B981" iconBg="rgba(16, 185, 129, 0.2)" trend="down" trendValue="-92%" />
      <MetricCard icon={AlertTriangle} value="47" label="Clientes Perdidos" color="#10B981" iconBg="rgba(16, 185, 129, 0.2)" trend="down" trendValue="-98%" />
      <MetricCard icon={DollarSign} value="R$4,3Mi" label="Perdas Totais" color="#10B981" iconBg="rgba(16, 185, 129, 0.2)" trend="down" trendValue="-92%" />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <ComparisonCard label="Tempo de Analise" before="1.250h" after="79,5h" reduction="94" icon={Clock} />
      <ComparisonCard label="Analistas Necessarios" before="53" after="4" reduction="92" icon={Users} />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <ComparisonCard label="Clientes Perdidos" before="3.080" after="47" reduction="98" icon={AlertTriangle} />
      <ComparisonCard label="Perdas Financeiras" before="R$52,1Mi" after="R$4,3Mi" reduction="92" icon={DollarSign} />
    </div>
    <LossesBar isComparison={true} />
  </>
);

const FilaPage = ({ filaRevisao }) => {
  const semaforoCor = {
    VERMELHO: '#EF4444',
    AMARELO: '#F59E0B',
    VERDE: '#10B981',
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl p-4" style={{ backgroundColor: '#1E2A38' }}>
          <p className="text-xs mb-1" style={{ color: '#8892A0' }}>Urgentes</p>
          <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
            {filaRevisao.filter(c => c.semaforo === 'VERMELHO').length}
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#1E2A38' }}>
          <p className="text-xs mb-1" style={{ color: '#8892A0' }}>Atenção</p>
          <p className="text-2xl font-bold" style={{ color: '#F59E0B' }}>
            {filaRevisao.filter(c => c.semaforo === 'AMARELO').length}
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#1E2A38' }}>
          <p className="text-xs mb-1" style={{ color: '#8892A0' }}>Normal</p>
          <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
            {filaRevisao.filter(c => c.semaforo === 'VERDE').length}
          </p>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1E2A38' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: '#162030' }}>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Status</th>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Nome</th>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Score</th>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Renda</th>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Valor Solicitado</th>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Risco</th>
              <th className="text-left p-3" style={{ color: '#8892A0' }}>Espera</th>
            </tr>
          </thead>
          <tbody>
            {filaRevisao.map((cliente, i) => (
              <tr key={i} style={{ borderTop: '1px solid #2D3A4A' }}>
                <td className="p-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: semaforoCor[cliente.semaforo] }}></div>
                </td>
                <td className="p-3 text-white">{cliente.nome}</td>
                <td className="p-3" style={{ color: '#8892A0' }}>{cliente.score_credito}</td>
                <td className="p-3" style={{ color: '#8892A0' }}>R$ {cliente.renda_mensal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="p-3" style={{ color: '#8892A0' }}>R$ {cliente.valor_solicitado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="p-3" style={{ color: semaforoCor[cliente.semaforo] }}>{cliente.probabilidade_risco}</td>
                <td className="p-3" style={{ color: '#8892A0' }}>{cliente.horas_espera ? cliente.horas_espera.toFixed(1) + 'h' : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const FunilConversao = ({ simulacao }) => {
  const manual = simulacao.find(s => s.cenario === 'Manual');
  if (!manual) return null;

  const total = 5000;
  const atendidos = total - manual.clientes_perdidos;
  const perdidos = manual.clientes_perdidos;

  const etapas = [
    { label: 'Solicitações recebidas', valor: total, pct: 100, cor: '#3B82F6' },
    { label: 'Entram na fila de análise', valor: total, pct: 100, cor: '#8B5CF6' },
    { label: 'Aguardam analista disponível', valor: Math.round(total * 0.7), pct: 70, cor: '#F59E0B' },
    { label: 'Clientes que desistem', valor: perdidos, pct: Math.round(perdidos / total * 100), cor: '#EF4444' },
    { label: 'Análise concluída', valor: atendidos, pct: Math.round(atendidos / total * 100), cor: '#10B981' },
  ];

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#1E2A38' }}>
      <h3 className="text-white font-semibold mb-6">Funil de Conversão — Processo Manual</h3>
      <div className="flex flex-col items-center gap-2">
        {etapas.map((etapa, i) => (
          <div key={i} className="w-full flex flex-col items-center">
            <div
              className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-white"
              style={{
                backgroundColor: etapa.cor,
                width: `${Math.max(etapa.pct, 20)}%`,
                opacity: 0.85,
                transition: 'width 0.5s ease'
              }}
            >
              <span>{etapa.label}</span>
              <span className="font-bold">{etapa.valor.toLocaleString('pt-BR')}</span>
            </div>
            {i < etapas.length - 1 && (
              <div className="text-gray-500 text-xs my-1">▼</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('problema');
  const [metricas, setMetricas] = useState(null);
  const [comparativo, setComparativo] = useState(null);
  const [filaRevisao, setFilaRevisao] = useState([]);
  const [simulacao, setSimulacao] = useState([]);

  useEffect(() => {
    api.metricas().then(setMetricas);
    api.comparativo().then(setComparativo);
    api.filaRevisao().then(setFilaRevisao);
    api.simulacao().then(setSimulacao);
  }, []);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    api.saudacao().then(data => {
      setMessages([{ text: data.resposta, isBot: true }]);
    });
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || chatLoading) return;

    const textoUsuario = inputValue;
    setMessages(prev => [...prev, { text: textoUsuario, isBot: false }]);
    setInputValue('');
    setChatLoading(true);

    try {
      const data = await api.chat(textoUsuario, historico);

      const novoHistorico = [
        ...historico,
        { role: 'user', parts: [{ text: textoUsuario }] },
        { role: 'model', parts: [{ text: data.resposta }] },
      ];
      setHistorico(novoHistorico);
      setMessages(prev => [...prev, { text: data.resposta, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Erro ao conectar com o assistente.', isBot: true }]);
    } finally {
      setChatLoading(false);
    }
  };

const pages = [
  { id: 'problema', label: 'Problema', color: '#FF6B6B' },
  { id: 'solucao', label: 'Solucao', color: '#3B82F6' },
  { id: 'fila', label: 'Fila', color: '#F59E0B' },
  { id: 'resultado', label: 'Resultado', color: '#10B981' },
];

const pageConfig = {
  problema: { title: 'CENARIO ATUAL: PROCESSO MANUAL', subtitle: 'Analise do processo manual de concessao de credito', color: '#FF6B6B' },
  solucao: { title: 'SOLUCAO: AUTOMACAO INTELIGENTE', subtitle: 'Sistema de ML + Decisao Automatica + Priorizacao', color: '#3B82F6' },
  fila: { title: 'FILA DE REVISAO PRIORIZADA', subtitle: 'Casos aguardando analise manual ordenados por prioridade', color: '#F59E0B' },
  resultado: { title: 'RESULTADO: IMPACTO DA AUTOMACAO', subtitle: 'Comparativo antes e depois da implementacao', color: '#10B981' },
};

const currentPage = pageConfig[activePage];

return (
  <div className="min-h-screen p-6 relative" style={{ backgroundColor: '#0D1B2A' }}>
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold" style={{ color: currentPage.color }}>{currentPage.title}</h1>
        <div className="flex gap-2">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activePage === page.id ? '#1E2A38' : 'transparent',
                color: activePage === page.id ? page.color : '#8892A0',
                border: activePage === page.id ? `1px solid ${page.color}40` : '1px solid transparent',
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm" style={{ color: '#8892A0' }}>{currentPage.subtitle}</p>
    </div>

   {activePage === 'problema' && <ProblemaPage comparativo={comparativo} simulacao={simulacao} />}
    {activePage === 'resultado' && <ResultadoPage comparativo={comparativo} />}
    {activePage === 'solucao' && <SolucaoPage metricas={metricas} />}
    {activePage === 'fila' && <FilaPage filaRevisao={filaRevisao} />}

    <button
      onClick={() => setChatOpen(!chatOpen)}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: '#3B82F6' }}
    >
      {chatOpen ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
    </button>

    {chatOpen && (
      <div className="fixed bottom-24 right-6 w-80 rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#0D1B2A', border: '1px solid #1E2A38' }}>
        <div className="p-4 flex items-center gap-3" style={{ backgroundColor: '#1E2A38' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3B82F6' }}>
            <Bot size={20} color="white" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Assistente de Credito</h4>
            <p className="text-xs" style={{ color: '#8892A0' }}>Online</p>
          </div>
        </div>
        <div className="h-72 overflow-y-auto p-4" style={{ backgroundColor: '#0D1B2A' }}>
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
          ))}
        </div>
        <div className="p-3 flex gap-2" style={{ backgroundColor: '#1E2A38' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua pergunta..."
            autoComplete="off"    
            autoCorrect="off"     
            autoCapitalize="off"  
            spellCheck="false"    
            className="flex-1 px-4 py-2 rounded-full text-sm text-white placeholder-gray-500 outline-none"
            style={{ backgroundColor: '#0D1B2A', border: '1px solid #2D3A4A' }}
/>
          <button onClick={handleSendMessage} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3B82F6' }}>
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    )}

    <div className="mt-8 pt-4 border-t border-gray-800 text-center">
      <p className="text-xs" style={{ color: '#8892A0' }}>Dashboard de Eficiencia Operacional Bancaria</p>
    </div>
  </div>
);
}