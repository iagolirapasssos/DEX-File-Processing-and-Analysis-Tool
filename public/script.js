async function processDexFile(fileInput) {
    if (!fileInput.files.length) {
        alert("Por favor, faça o upload de um arquivo .dex.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("dexFile", file);

    try {
        const response = await fetch("/process-dex", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        displayDexContent(data.smaliFiles);
    } catch (error) {
        alert(`Erro ao processar o arquivo .dex: ${error.message}`);
    }
}

function displayDexContent(smaliFiles) {
    const resultsDiv = document.getElementById("resultsDEX");
    resultsDiv.innerHTML = "";

    smaliFiles.forEach(({ fileName, content }) => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
            <strong>${fileName}</strong>
            <pre>${content}</pre>
        `;
        resultsDiv.appendChild(resultItem);
    });
}


document.getElementById("searchButtonDEX").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInputDEX");
    processDexFile(fileInput);
});

