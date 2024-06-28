const sqlite3 = require('sqlite3').verbose();

// Função para zerar e recriar o banco de dados
function reiniciarBancoDeDados() {
    let db = new sqlite3.Database('./veiculos.db');

    db.serialize(() => {
        // Drop table veiculos e documentos se existirem
        db.run(`DROP TABLE IF EXISTS veiculos`);
        db.run(`DROP TABLE IF EXISTS documentos`);

        // Criar a tabela veiculos
        db.run(`CREATE TABLE IF NOT EXISTS veiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            placa TEXT UNIQUE,
            telefone1 TEXT,
            telefone2 TEXT
        )`);

        // Criar a tabela documentos
        db.run(`CREATE TABLE IF NOT EXISTS documentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            veiculo_id INTEGER,
            documento TEXT,
            data_vencimento TEXT,
            FOREIGN KEY (veiculo_id) REFERENCES veiculos (id)
        )`);

        console.log("Banco de dados 'veiculos.db' reiniciado com sucesso.");
    });

    db.close();
}

// Executa a função para reiniciar o banco de dados
reiniciarBancoDeDados();
