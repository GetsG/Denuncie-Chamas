export function dropReport(id, onSuccess, onError) {
    const token = localStorage.getItem("token");

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://denuncie-chamas-backend.onrender.com/reports/${id}`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onload = function () {
        if (xhr.status === 204) {
            onSuccess?.();
        } else if (xhr.status === 403) {
            onError?.("Você não tem permissão para remover esta denúncia.");
        } else if (xhr.status === 404) {
            onError?.("Denúncia não encontrada.");
        } else {
            onError?.("Erro ao remover denúncia.");
        }
    };

    xhr.onerror = function () {
        onError?.("Erro na requisição.");
    };

    xhr.send();
}