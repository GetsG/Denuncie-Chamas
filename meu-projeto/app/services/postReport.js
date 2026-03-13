import { converterParaBase64 } from "@/utils/converterParaBase64";

export const postReport = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const arquivoImagem = data.imagem;

  if (!arquivoImagem) {
    throw new Error("Imagem não selecionada");
  }

  const imagemBase64 = await converterParaBase64(arquivoImagem);
  const base64Limpo = imagemBase64.split(",")[1];

  const body = {
    tipoIncendio: data.tipoIncendio,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    descricao: data.descricao,
    gravidade: !!data.gravidade,
    imagem: base64Limpo
  };

  const response = await fetch("https://denuncie-chamas-backend.onrender.com/reports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const texto = await response.text();

  if (!response.ok) {
    throw new Error(`Status ${response.status} - ${texto}`);
  }

  try {
    return JSON.parse(texto);
  } catch {
    return texto;
  }
};