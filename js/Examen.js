document.getElementById("btnBuscar").addEventListener("click", buscarPais);
document.getElementById("btnLimpiar").addEventListener("click", limpiar);

async function buscarPais() {
    const nombrePais = document.getElementById("inputPais").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (!nombrePais) {
        mensaje.textContent = "Por favor, ingresa un nombre de país.";
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nombrePais)}?fullText=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se encontró el país.");

        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No se encontró información.");

        const pais = data[0]; 

        document.getElementById("capital").textContent = pais.capital?.[0] || "No disponible";
        document.getElementById("lenguaje").textContent = pais.languages ? Object.values(pais.languages).join(", ") : "No disponible";

        mensaje.textContent = ""; 
    } catch (error) {
        mensaje.textContent = "No se encontró el país. Intenta nuevamente.";
        limpiar();
    }
}

function limpiar() {
    document.getElementById("inputPais").value = "";
    document.getElementById("capital").textContent = "";
    document.getElementById("lenguaje").textContent = "";
    document.getElementById("mensaje").textContent = "";
}
