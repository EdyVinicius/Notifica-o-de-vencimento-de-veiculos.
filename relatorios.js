const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Função para mostrar vencimentos
function mostrarVencimentos() {
    let db = new sqlite3.Database('./veiculos.db');

    db.serialize(() => {
        db.all(`
            SELECT veiculos.id, veiculos.placa, documentos.documento, documentos.data_vencimento 
            FROM veiculos
            JOIN documentos ON veiculos.id = documentos.veiculo_id
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }

            rows.forEach(row => {
                let diasRestantes = Math.ceil((new Date(row.data_vencimento) - new Date()) / (1000 * 60 * 60 * 24));
                console.log(`ID: ${row.id}, Veículo: ${row.placa}, Documento: ${row.documento}, Dias Restantes: ${diasRestantes}`);
            });
        });
    });

    db.close();
}

// Executa a função para mostrar vencimentos
mostrarVencimentos();
