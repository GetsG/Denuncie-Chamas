export const cadastro = async (data) => {
  const response = await fetch("https://denuncie-chamas-backend.onrender.com/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(result?.message || "Erro ao registrar");
    error.status = response.status;
    throw error
  }

  return result;
};