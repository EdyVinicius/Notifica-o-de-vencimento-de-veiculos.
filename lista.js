const sqlite3 = require('sqlite3').verbose();

// Função para listar todos os veículos no banco de dados
function listarVeiculos() {
    let db = new sqlite3.Database('./veiculos.db');

    db.serialize(() => {
        db.all(`SELECT veiculos.id, veiculos.placa, veiculos.telefone1, veiculos.telefone2, documentos.documento, documentos.data_vencimento
                FROM veiculos
                LEFT JOIN documentos ON veiculos.id = documentos.veiculo_id`, (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Conteúdo do banco de dados 'veiculos':");
                rows.forEach(row => {
                    console.log(`ID: ${row.id}, Placa: ${row.placa}, Documento: ${row.documento || 'N/A'}, Data de Vencimento: ${row.data_vencimento || 'N/A'}, Telefone1: ${row.telefone1}, Telefone2: ${row.telefone2}`);
                });
            }
            db.close();
        });
    });
}

// Executa a função para listar os veículos
listarVeiculos();
