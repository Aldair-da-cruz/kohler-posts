import { useState } from "react";

const POST_TYPES = [
  {
    id: "notas",
    label: "🌸 Notas Olfativas",
    icon: "🌸",
    description: "Destaca os ingredientes e a composição",
    prompt: (p) =>
      `Cria um post de Instagram elegante e persuasivo em Português de Angola para vender o perfume "${p.nome}" ${p.marca ? `da marca ${p.marca}` : ""}.
Foca NAS NOTAS OLFATIVAS: ${p.notas || "notas florais, amadeiradas e almiscaradas"}.
Estrutura: 1 frase de abertura impactante → descreve as notas de forma sensorial e poética → 1 frase de chamada à ação.
Tom: sofisticado, sensorial, que desperta curiosidade.
Máximo 5 linhas + emojis relevantes + 5 hashtags angolanas/lusófonas.`,
  },
  {
    id: "ocasiao",
    label: "✨ Ocasião & Estilo",
    icon: "✨",
    description: "Para que momento ou estilo de vida serve",
    prompt: (p) =>
      `Cria um post de Instagram envolvente em Português de Angola para o perfume "${p.nome}" ${p.marca ? `da marca ${p.marca}` : ""}.
Foca NA OCASIÃO E ESTILO DE VIDA: ${p.ocasiao || "uso diário, trabalho, saídas noturnas"}.
Pinta uma cena/situação concreta onde a pessoa usa este perfume e se sente incrível.
Tom: aspiracional, próximo, como se falasses com uma amiga.
Máximo 5 linhas + emojis relevantes + 5 hashtags.`,
  },
  {
    id: "durabilidade",
    label: "⏳ Fixação & Durabilidade",
    icon: "⏳",
    description: "Destaca a qualidade e a projeção",
    prompt: (p) =>
      `Cria um post de Instagram convincente em Português de Angola para o perfume "${p.nome}" ${p.marca ? `da marca ${p.marca}` : ""}.
Foca na FIXAÇÃO E DURABILIDADE: ${p.fixacao || "longa duração, sillage marcante, fixação excelente"}.
Explica de forma simples e persuasiva porque o cliente vai cheirar bem o dia todo.
Tom: confiante, informativo, como quem entende do assunto.
Máximo 5 linhas + emojis relevantes + 5 hashtags.`,
  },
  {
    id: "comparacao",
    label: "💎 Inspirado Em / Similar A",
    icon: "💎",
    description: "Compara com uma fragrância famosa",
    prompt: (p) =>
      `Cria um post de Instagram inteligente em Português de Angola para o perfume "${p.nome}" ${p.marca ? `da marca ${p.marca}` : ""}.
${p.inspirado ? `Este perfume é inspirado em / similar ao ${p.inspirado}.` : "Sugere que este perfume tem qualidade de grife a um preço acessível."}
Faz o cliente sentir que está a adquirir algo de luxo e prestígio.
Tom: aspiracional, elegante, sem ser arrogante.
Máximo 5 linhas + emojis relevantes + 5 hashtags.`,
  },
  {
    id: "genero",
    label: "👤 Perfil do Cliente",
    icon: "👤",
    description: "Direciona para um público específico",
    prompt: (p) =>
      `Cria um post de Instagram direcionado em Português de Angola para o perfume "${p.nome}" ${p.marca ? `da marca ${p.marca}` : ""}.
Perfil do cliente: ${p.genero || "homem/mulher moderno(a), confiante, que gosta de se destacar"}.
Faz com que a pessoa que lê se identifique imediatamente com o produto.
Tom: pessoal, direto, que cria identificação imediata.
Máximo 5 linhas + emojis relevantes + 5 hashtags.`,
  },
];

const SCHEDULE = [
  "Post da Manhã ☀️ (7h–9h)",
  "Post do Meio-Dia 🌤️ (12h–13h)",
  "Post da Noite 🌙 (19h–21h)",
];

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #0d0d0d 100%)",
    fontFamily: "'Montserrat', 'Georgia', serif",
    color: "#f0e6d3",
    padding: "24px 16px",
  },
  header: { textAlign: "center", marginBottom: 32 },
  rose: { fontSize: 48, marginBottom: 8 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    background: "linear-gradient(90deg, #d4a574, #f0c080, #d4a574)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
    letterSpacing: 2,
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  subtitle: { color: "#a08060", margin: "6px 0 0", fontSize: 14, letterSpacing: 1 },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(212,165,116,0.2)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: { color: "#d4a574", fontSize: 16, margin: "0 0 16px", letterSpacing: 1 },
  label: { display: "block", fontSize: 12, color: "#a08060", marginBottom: 5, letterSpacing: 1 },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(212,165,116,0.25)",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#f0e6d3",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 14,
    fontFamily: "inherit",
  },
  tipBox: {
    background: "rgba(212,165,116,0.05)",
    border: "1px solid rgba(212,165,116,0.15)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  btnPrimary: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #c08040, #d4a574)",
    border: "none",
    borderRadius: 12,
    color: "#0d0d0d",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: 2,
    fontFamily: "inherit",
  },
  btnSecondary: {
    flex: 1,
    padding: "14px",
    background: "rgba(212,165,116,0.1)",
    border: "1px solid rgba(212,165,116,0.3)",
    borderRadius: 12,
    color: "#d4a574",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  btnRegen: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #c08040, #d4a574)",
    border: "none",
    borderRadius: 12,
    color: "#0d0d0d",
    fontSize: 14,
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default function App() {
  const [step, setStep] = useState("form");
  const [perfume, setPerfume] = useState({
    nome: "", marca: "", notas: "", ocasiao: "",
    fixacao: "", inspirado: "", genero: "", preco: "",
  });
  const [selectedTypes, setSelectedTypes] = useState(["notas", "ocasiao", "ocasiao"]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(-1);
  const [copied, setCopied] = useState(null);

  const fields = [
    { key: "nome", label: "Nome do Perfume *", placeholder: "ex: Tobacco Vanilla, Intense Blue...", required: true },
    { key: "marca", label: "Marca", placeholder: "ex: Fragrance World, Lattafa, Venorna..." },
    { key: "notas", label: "Notas Olfativas", placeholder: "ex: Tabaco, baunilha, oud, rosa..." },
    { key: "ocasiao", label: "Ocasião de Uso", placeholder: "ex: Trabalho, saída noturna, dia a dia..." },
    { key: "fixacao", label: "Fixação / Duração", placeholder: "ex: 8–12 horas, sillage intenso..." },
    { key: "inspirado", label: "Inspirado em / Similar a", placeholder: "ex: Tom Ford Tobacco Vanille..." },
    { key: "genero", label: "Para quem é?", placeholder: "ex: Mulher elegante, homem moderno..." },
    { key: "preco", label: "Preço (opcional)", placeholder: "ex: 3.500 Kz" },
  ];

  const generatePosts = async () => {
    if (!perfume.nome.trim()) { setError("Por favor insere o nome do perfume."); return; }
    setError(""); setStep("generating"); setPosts([]);
    const results = [];
    for (let i = 0; i < 3; i++) {
      setLoadingIndex(i);
      const type = POST_TYPES.find((t) => t.id === selectedTypes[i]);
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{ role: "user", content: type.prompt(perfume) }],
          }),
        });
        const data = await res.json();
        const text = data.content?.map((b) => b.text || "").join("") || "Erro ao gerar post.";
        results.push({ slot: SCHEDULE[i], type: type.label, icon: type.icon, text });
      } catch {
        results.push({ slot: SCHEDULE[i], type: type.label, icon: type.icon, text: "❌ Erro ao gerar este post. Tenta novamente." });
      }
    }
    setLoadingIndex(-1);
    setPosts(results);
    setStep("result");
  };

  const copyPost = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.rose}>🌹</div>
        <h1 style={S.title}>PERFUME POSTS</h1>
        <p style={S.subtitle}>Gera 3 posts diários para o teu negócio de perfumes</p>
        <p style={{ color: "#604030", fontSize: 11, marginTop: 4, letterSpacing: 1 }}>Kohler Business · Angola</p>
      </div>

      {/* FORM */}
      {step === "form" && (
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={S.card}>
            <h2 style={S.cardTitle}>📦 INFORMAÇÕES DO PRODUTO</h2>
            {fields.map(({ key, label, placeholder, required }) => (
              <div key={key}>
                <label style={{ ...S.label, ...(required && !perfume[key] && error ? { color: "#e05555" } : {}) }}>{label}</label>
                <input
                  value={perfume[key]}
                  onChange={(e) => setPerfume((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ ...S.input, ...(required && !perfume[key] && error ? { border: "1px solid #e05555" } : {}) }}
                />
              </div>
            ))}
            {error && <p style={{ color: "#e05555", fontSize: 13, margin: "4px 0 0" }}>{error}</p>}
          </div>

          <div style={S.card}>
            <h2 style={S.cardTitle}>🗓️ ESTRATÉGIA DOS 3 POSTS</h2>
            <p style={{ color: "#806040", fontSize: 12, margin: "0 0 16px" }}>Escolhe o ângulo de cada post do dia</p>
            {SCHEDULE.map((slot, si) => (
              <div key={si} style={{ marginBottom: 18 }}>
                <p style={{ color: "#c09050", fontSize: 13, margin: "0 0 8px", fontStyle: "italic" }}>{slot}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {POST_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTypes((prev) => { const n = [...prev]; n[si] = t.id; return n; })}
                      style={{
                        padding: "6px 12px", borderRadius: 20,
                        border: `1px solid ${selectedTypes[si] === t.id ? "#d4a574" : "rgba(212,165,116,0.2)"}`,
                        background: selectedTypes[si] === t.id ? "rgba(212,165,116,0.15)" : "transparent",
                        color: selectedTypes[si] === t.id ? "#d4a574" : "#806040",
                        fontSize: 12, cursor: "pointer",
                      }}
                    >
                      {t.icon} {t.label.replace(/^[^ ]+ /, "")}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={S.tipBox}>
            <p style={{ color: "#a08060", fontSize: 12, margin: 0, lineHeight: 1.7 }}>
              💡 <strong style={{ color: "#d4a574" }}>Dica:</strong> Quanto mais detalhes deres, mais personalizados ficam os posts. Só o nome já chega!
            </p>
          </div>

          <button onClick={generatePosts} style={S.btnPrimary}>✨ GERAR OS 3 POSTS</button>
        </div>
      )}

      {/* GENERATING */}
      {step === "generating" && (
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🌹</div>
          <h2 style={{ color: "#d4a574", marginBottom: 8 }}>A criar os teus posts...</h2>
          <p style={{ color: "#806040", fontSize: 14 }}>Post {loadingIndex + 1} de 3</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: "50%",
                background: i < loadingIndex ? "rgba(212,165,116,0.6)" : i === loadingIndex ? "#d4a574" : "rgba(212,165,116,0.1)",
                border: "2px solid rgba(212,165,116,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, transition: "all 0.5s",
              }}>
                {i < loadingIndex ? "✓" : i === loadingIndex ? "⏳" : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === "result" && (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ color: "#d4a574", fontSize: 18 }}>✅ Posts prontos para <strong>{perfume.nome}</strong>!</p>
          </div>

          {posts.map((post, idx) => (
            <div key={idx} style={{ ...S.card, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <p style={{ color: "#c09050", fontSize: 12, margin: 0, fontStyle: "italic" }}>{post.slot}</p>
                  <p style={{ color: "#d4a574", fontSize: 14, margin: "2px 0 0", fontWeight: "bold" }}>{post.type}</p>
                </div>
                <button
                  onClick={() => copyPost(post.text, idx)}
                  style={{
                    padding: "8px 16px",
                    background: copied === idx ? "rgba(80,180,80,0.2)" : "rgba(212,165,116,0.1)",
                    border: `1px solid ${copied === idx ? "#50b450" : "rgba(212,165,116,0.3)"}`,
                    borderRadius: 8,
                    color: copied === idx ? "#50b450" : "#d4a574",
                    fontSize: 12, cursor: "pointer",
                  }}
                >
                  {copied === idx ? "✓ Copiado!" : "📋 Copiar"}
                </button>
              </div>
              <div style={{
                background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 16,
                whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.7, color: "#e0d0bc",
              }}>
                {post.text}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button onClick={() => { setStep("form"); setPosts([]); }} style={S.btnSecondary}>← Novo Produto</button>
            <button onClick={generatePosts} style={S.btnRegen}>🔄 Regenerar</button>
          </div>
        </div>
      )}
    </div>
  );
}
