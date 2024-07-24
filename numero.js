const sqlite3 = require('sqlite3').verbose();

// Função para atualizar os números de telefone
function updatePhoneNumbers() {
    let db = new sqlite3.Database('./veiculos.db');

    let newPhone1 = '0000000000000';
    let newPhone2 = '0000000000000';

    // Atualiza os números de telefone para todos os registros
    db.serialize(() => {
        db.run(`UPDATE veiculos SET telefone1 = ?, telefone2 = ?`, [newPhone1, newPhone2], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Linhas atualizadas: ${this.changes}`);
        });
    });

    db.close();
}

// Executa a função de atualização
updatePhoneNumbers();
