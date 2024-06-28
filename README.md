
* Sistema de Controle de Vencimentos de Veículos

Este sistema foi desenvolvido para facilitar o controle de vencimentos de veículos, de qualquer tipo, e é composto por diversos scripts em JavaScript e Node.js, cada um responsável por uma função específica. Abaixo estão os detalhes de cada script e sua função no sistema:

## Funcionalidades

1. **Adicionar (adicionar.js):** 
   - Adiciona uma placa de veículo, tipo de documento, data de vencimento e número de telefone ao banco de dados.

2. **Listar (lista.js):**
   - Lista todos os veículos registrados no banco de dados.

3. **Notificador (notificador.js):**
   - Lê o banco de dados, verifica os vencimentos e notifica quando um documento está prestes a vencer. Este é o coração do sistema, responsável por fazer a verificação e envio das notificações.

4. **Relatórios (relatorios.js):**
   - Lista os veículos do banco de dados e apresenta também os dias restantes para o vencimento dos documentos.

5. **Número (numero.js):**
   - Altera os números de telefone cadastrados no sistema.

6. **Reiniciar (reiniciar.js):**
   - Restaura o banco de dados e começa o processo novamente.

7. **Remover (remove.js):**
   - Remove uma placa e os documentos vinculados a ela do banco de dados.

8. **Vencimento (vencimento.js):**
   - Altera o vencimento de um determinado documento de uma placa específica.

9. **Veículos (veiculos.json):**
   - Arquivo do banco de dados onde as informações dos veículos são armazenadas.

## Como funciona o notificador.js

Quando o `notificador.js` é executado pela primeira vez, ele abrirá o prompt de comando e gerará um QR Code. Você deverá escanear este QR Code com o WhatsApp, vinculando o sistema ao seu aplicativo. A cada determinado período de tempo, será necessário realizar novamente a leitura do QR Code para manter a vinculação ativa.

## Instruções de Uso

1. Clone o repositório para sua máquina local.
2. Instale as dependências necessárias executando `npm install`.
3. Execute os scripts conforme necessário, utilizando `node <script.js>`.

## Contato

Desenvolvido por Everton Vinicius. 
evertonvinicius071@gmail.com
Sinta-se à vontade para entrar em contato para dúvidas, sugestões ou colaborações.

---

Este README foi gerado para fornecer uma visão geral do sistema de controle de vencimentos de veículos, suas funcionalidades e instruções de uso. Esperamos que este sistema facilite o gerenciamento dos documentos dos seus veículos.
