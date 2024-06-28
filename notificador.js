const { create } = require('venom-bot');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Função para enviar mensagem pelo WhatsApp
function sendWhatsAppMessage(client, to, message) {
    const chatId = `${to}@c.us`;
    console.log(`Tentando enviar mensagem para ${chatId}: ${message}`);
    client.sendText(chatId, message)
        .then(response => {
            console.log(`Mensagem enviada para ${chatId} com sucesso: `, response);
        })
        .catch(error => {
            console.error(`Erro ao enviar mensagem para ${chatId}: `, error);
        });
}

// Função para verificar vencimentos e enviar notificações
function verificarVencimentos(client) {
    let db = new sqlite3.Database('./veiculos.db');

    db.serialize(() => {
        db.all(`
            SELECT veiculos.placa, documentos.documento, documentos.data_vencimento, veiculos.telefone1, veiculos.telefone2 
            FROM veiculos
            JOIN documentos ON veiculos.id = documentos.veiculo_id
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }

            rows.forEach(row => {
                let diasRestantes = Math.ceil((new Date(row.data_vencimento) - new Date()) / (1000 * 60 * 60 * 24));
                console.log(`Veículo: ${row.placa}, Documento: ${row.documento}, Dias Restantes: ${diasRestantes}`);

                if ([30, 25, 20, 15, 10, 7, 5, 3, 1, 0].includes(diasRestantes)) {
                    let message = `O documento ${row.documento} do veículo ${row.placa} vence em ${diasRestantes} dias.`;

                    console.log(`Enviando notificações para ${row.placa}: ${message}`);
                    sendWhatsAppMessage(client, row.telefone1, message);
                    if (row.telefone1 !== row.telefone2) {
                        sendWhatsAppMessage(client, row.telefone2, message);
                    }
                } else if (diasRestantes <= 0) {
                    let message = `O documento ${row.documento} do veículo ${row.placa} está vencido.`;

                    console.log(`Enviando notificações de vencimento para ${row.placa}: ${message}`);
                    sendWhatsAppMessage(client, row.telefone1, message);
                    if (row.telefone1 !== row.telefone2) {
                        sendWhatsAppMessage(client, row.telefone2, message);
                    }
                }
            });
        });
    });

    db.close();
}

// Cria o cliente Venom, verifica vencimentos e atualiza números de telefone
create({
    session: 'session-name', // Nome da sessão
    multidevice: true // Suporte a múltiplos dispositivos
})
.then(client => {
    console.log('Cliente do WhatsApp criado com sucesso!');
    console.log('Verificando vencimentos...');
    verificarVencimentos(client);
})
.catch(error => {
    console.error('Erro ao criar cliente do WhatsApp:', error);
});
