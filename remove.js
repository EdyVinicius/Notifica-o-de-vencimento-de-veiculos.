const sqlite3 = require('sqlite3').verbose();

// Função para remover um registro de veículo e seus documentos associados
function removeVeiculo(placa) {
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

                // Remova os documentos associados ao veículo
                db.run(`DELETE FROM documentos WHERE veiculo_id = ?`, [veiculoId], function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(`Documentos do veículo removidos: ${placa}`);
                    }

                    // Remova o veículo
                    db.run(`DELETE FROM veiculos WHERE id = ?`, [veiculoId], function(err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`Veículo removido: ${placa}`);
                        }

                        // Feche o banco de dados após todas as operações
                        db.close((err) => {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log('Banco de dados fechado com sucesso.');
                            }
                        });
                    });
                });
            } else {
                console.log(`Veículo com a placa ${placa} não encontrado.`);
                db.close();
            }
        });
    });
}

// Exemplo de uso das funções
removeVeiculo('RWH-3J54');
