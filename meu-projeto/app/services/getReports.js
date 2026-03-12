export const getReports = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch("https://denuncie-chamas-backend.onrender.com/reports", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const texto = await response.text();

  if (!response.ok) {
    throw new Error(`Status ${response.status} - ${texto}`);
  }

  try {
    return JSON.parse(texto);
  } catch {
    return [];
  }
};