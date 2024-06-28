const sqlite3 = require('sqlite3').verbose();

// Função para adicionar um novo veículo e retornar uma Promise
function addVeiculo(placa, telefone1, telefone2) {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('./veiculos.db');
        db.serialize(() => {
            let stmt = db.prepare(`INSERT OR IGNORE INTO veiculos (placa, telefone1, telefone2) VALUES (?, ?, ?)`);
            stmt.run(placa, telefone1, telefone2, function(err) {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Novo veículo adicionado: ${placa}`);
                    resolve();
                }
                stmt.finalize(() => {
                    db.close();
                });
            });
        });
    });
}

// Função para adicionar um novo documento e retornar uma Promise
function addDocumento(placa, documento, dataVencimento) {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('./veiculos.db');
        db.serialize(() => {
            db.get(`SELECT id FROM veiculos WHERE placa = ?`, [placa], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    let veiculoId = row.id;
                    let stmt = db.prepare(`INSERT INTO documentos (veiculo_id, documento, data_vencimento) VALUES (?, ?, ?)`);
                    stmt.run(veiculoId, documento, dataVencimento, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(`Novo documento adicionado para o veículo ${placa}: ${documento}`);
                            resolve();
                        }
                        stmt.finalize(() => {
                            db.close();
                        });
                    });
                } else {
                    reject(new Error(`Veículo com a placa ${placa} não encontrado.`));
                    db.close();
                }
            });
        });
    });
}

// Adiciona veículo e documentos em sequência
addVeiculo('FZF-6A30', '5567998580009', '5567992244353')
    .then(() => addDocumento('FZF-6A30', 'CRVL', '2025-10-31'))
    .then(() => addDocumento('FZF-6A30', 'IPVA', '2025-01-31'))
    .then(() => addDocumento('FZF-6A30', 'CIPP', '2025-05-17'))
    .then(() => addDocumento('FZF-6A30', 'INMETRO', '2025-02-16'))
    .then(() => addDocumento('FZF-6A30', 'CIV', '2025-05-17'))
    .then(() => addDocumento('FZF-6A30', 'CRONOTACÓGRAFO', '2025-02-15'))
    .catch(err => {
        console.error(err.message);
    });
addVeiculo('FQJ-5F12', '5567998580009', '5567992244353')
    .then(() => addDocumento('FQJ-5F12', 'CRVL', '2025-04-30'))
    .then(() => addDocumento('FQJ-5F12', 'IPVA', '2025-01-31'))
    .then(() => addDocumento('FQJ-5F12', 'CIPP', '2025-01-17'))
    .then(() => addDocumento('FQJ-5F12', 'INMETRO', '2026-01-17'))
    .then(() => addDocumento('FQJ-5F12', 'CIV', '2025-01-17'))
    .then(() => addDocumento('FQJ-5F12', 'CRONOTACÓGRAFO', '2024-11-22'))
    .catch(err => {
        console.error(err.message);
    });
addVeiculo('ITQ-6C27', '5567998580009', '5567992244353')
    .then(() => addDocumento('ITQ-6C27', 'CRVL', '2025-08-31'))
    .then(() => addDocumento('ITQ-6C27', 'IPVA', '2025-01-31'))
    .then(() => addDocumento('ITQ-6C27', 'CIPP', '2024-12-12'))
    .then(() => addDocumento('ITQ-6C27', 'INMETRO', '2025-07-31'))
    .then(() => addDocumento('ITQ-6C27', 'CIV', '2024-12-12'))
    .then(() => addDocumento('ITQ-6C27', 'CRONOTACÓGRAFO', '2024-07-28'))
    .catch(err => {
        console.error(err.message);
    });