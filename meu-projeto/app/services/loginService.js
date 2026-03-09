export const login = async (data) => {

  let response

  try {
    response = await fetch("https://denuncie-chamas-backend.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

  } catch (error) {
    throw new Error("Servidor iniciando, tente novamente em alguns segundos")
  }

  let result = null

  try {
    result = await response.json()
  } catch {
    result = null
  }

  if (!response.ok) {

    if (response.status === 401) {
      throw new Error("E-mail ou senha incorretos")
    }

    if (response.status === 502 || response.status === 503) {
      throw new Error("Servidor iniciando, tente novamente em alguns segundos")
    }

    throw new Error("Erro no servidor")
  }

  return result
}