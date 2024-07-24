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
addVeiculo('XXX-0X00', '0000000000000', '0000000000000')
    .then(() => addDocumento('XXX-0X00', 'XXXXXXX', '0000-00-00'))
    .catch(err => {
        console.error(err.message);
    });