export const login = async (data) => {
  const response = await fetch("https://denuncie-chamas-backend.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Erro ao autenticar")
  }

  return response.json()
}