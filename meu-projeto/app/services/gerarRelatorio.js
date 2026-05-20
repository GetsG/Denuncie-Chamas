export const gerarRelatorio = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "https://denuncie-chamas-backend.onrender.com/relatorio/denuncias",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Verifica erro HTTP
        if (!response.ok) {

            const erro = await response.text();

            console.log("ERRO BACKEND:", erro);

            throw new Error("Erro ao gerar relatório");

        }

        // Converte para blob PDF
        const blob = await response.blob();

        // URL temporária
        const url = window.URL.createObjectURL(blob);

        // Cria link
        const a = document.createElement("a");

        a.href = url;

        a.download = "relatorio-denuncias.pdf";

        document.body.appendChild(a);

        a.click();

        a.remove();

        window.URL.revokeObjectURL(url);

    } catch (erro) {

        console.log("Erro ao baixar relatório", erro);

    }
};