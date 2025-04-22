import { useState } from "react";

export default function App() {
  const [ticker, setTicker] = useState("AAPL");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api-pilares-fmp.onrender.com/api/analise/${ticker}`);
      const json = await res.json();
      setDados(json);
    } catch (e) {
      setDados({ erro: "Erro ao buscar dados" });
    } finally {
      setLoading(false);
    }
  };

  const PillarResult = ({ id, resultado }) => (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">Pilar {id}</h3>
      <p className={`text-xl font-bold mt-2 ${
        resultado === "Aprovado" ? "text-green-600" : "text-red-600"}`}>{resultado}</p>
    </div>
  );

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4 font-sans">
      <h1 className="text-2xl font-bold text-center">Análise de Ações (10 Pilares)</h1>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Digite o ticker (ex: AAPL)"
        />
        <button
          onClick={buscar}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analisando..." : "Analisar"}
        </button>
      </div>

      {dados && dados.erro && (
        <p className="text-red-600 text-center">{dados.erro}</p>
      )}

      {dados && dados.resultados && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(dados.resultados).map(([id, resultado]) => (
            <PillarResult key={id} id={id} resultado={resultado} />
          ))}
        </div>
      )}
    </main>
  );
}
