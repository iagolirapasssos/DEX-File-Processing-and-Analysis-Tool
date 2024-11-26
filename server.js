const express = require('express');
const multer = require('multer');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

// Função recursiva para ler arquivos smali
function readSmaliFiles(dir) {
    let smaliFiles = [];
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isFile()) {
            smaliFiles.push({ fileName: path.relative(dir, itemPath), content: fs.readFileSync(itemPath, 'utf8') });
        } else if (stats.isDirectory()) {
            smaliFiles = smaliFiles.concat(readSmaliFiles(itemPath)); // Processar recursivamente
        }
    });

    return smaliFiles;
}

// Endpoint para processar arquivos .dex
app.post('/process-dex', upload.single('dexFile'), (req, res) => {
    const dexFilePath = req.file.path;
    const outputDir = path.join(__dirname, 'uploads', `output_${Date.now()}`); // Output dentro de uploads/

    if (!shell.which('java')) {
        return res.status(500).send('Java não está instalado no servidor.');
    }

    const baksmaliJar = path.resolve(__dirname, 'baksmali-2.5.2.jar');
    const command = `java -jar ${baksmaliJar} disassemble ${dexFilePath} -o ${outputDir}`;

    shell.exec(command, { silent: true }, (code, stdout, stderr) => {
        if (code !== 0) {
            return res.status(500).send(`Erro ao processar o arquivo .dex: ${stderr}`);
        }

        try {
            // Ler arquivos .smali gerados
            const smaliFiles = readSmaliFiles(outputDir);
            res.json({ smaliFiles });
        } catch (error) {
            res.status(500).send(`Erro ao ler arquivos Smali: ${error.message}`);
        } finally {
            // Limpeza: Remover arquivos temporários
            fs.rmSync(outputDir, { recursive: true, force: true });
            fs.unlinkSync(dexFilePath); // Remover arquivo original
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

