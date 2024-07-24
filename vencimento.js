const sqlite3 = require('sqlite3').verbose();

// Função para atualizar a data de vencimento de um documento específico
function atualizarDataVencimento(placa, documento, novaDataVencimento) {
    let db = new sqlite3.Database('./veiculos.db');

    db.serialize(() => {
        // Primeiro, obtenha o ID do veículo pela placa
        db.get(`SELECT id FROM veiculos WHERE placa = ?`, [placa], (err, row) => {
            if (err) {
                console.error(err.message);
                db.close();
                return;
            }
            if (row) {
                let veiculoId = row.id;

                // Atualize a data de vencimento do documento associado ao veículo
                db.run(`UPDATE documentos SET data_vencimento = ? WHERE veiculo_id = ? AND documento = ?`, [novaDataVencimento, veiculoId, documento], function(err) {
                    if (err) {
                        console.error(err.message);
                    } else if (this.changes === 0) {
                        console.log(`Documento ${documento} do veículo ${placa} não encontrado.`);
                    } else {
                        console.log(`Data de vencimento do documento ${documento} do veículo ${placa} atualizada para ${novaDataVencimento}.`);
                    }

                    // Feche o banco de dados após a operação
                    db.close((err) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log('Banco de dados fechado com sucesso.');
                        }
                    });
                });
            } else {
                console.log(`Veículo com a placa ${placa} não encontrado.`);
                db.close();
            }
        });
    });
}

// Exemplo de uso da função
atualizarDataVencimento('XXX-0X00', 'XXXXXXXXXXX', '0000-00-00');