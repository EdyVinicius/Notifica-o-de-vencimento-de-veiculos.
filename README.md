
# Vehicle Expiry Control System

This system was developed to facilitate the control of vehicle expirations, for any type of vehicle, and is composed of several scripts in JavaScript and Node.js, each responsible for a specific function. Below are the details of each script and its function in the system:

## Features

1. **Add (adicionar.js):** 
   - Adds a vehicle license plate, document type, expiration date, and phone number to the database.

2. **List (lista.js):**
   - Lists all vehicles registered in the database.

3. **Notifier (notificador.js):**
   - Reads the database, checks expirations, and notifies when a document is about to expire. This is the heart of the system, responsible for checking and sending notifications.

4. **Reports (relatorios.js):**
   - Lists the vehicles in the database and also presents the days remaining until the documents expire.

5. **Number (numero.js):**
   - Changes the phone numbers registered in the system.

6. **Reset (reiniciar.js):**
   - Restores the database and starts the process again.

7. **Remove (remove.js):**
   - Removes a license plate and the documents linked to it from the database.

8. **Expiration (vencimento.js):**
   - Changes the expiration date of a specific document for a specific license plate.

9. **Vehicles (veiculos.bd):**
   - Database file where vehicle information is stored.

## How notificador.js works

When `notificador.js` is executed for the first time, it will open the command prompt and generate a QR Code. You should scan this QR Code with WhatsApp, linking the system to your application. At regular intervals, you will need to scan the QR Code again to keep the link active.

## Usage Instructions

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Execute the scripts as needed, using `node <script.js>`.

## Contact

Developed by Everton Vinicius. 

evertonvinicius071@gmail.com

Feel free to contact for questions, suggestions, or collaborations.

---

This README was generated to provide an overview of the vehicle expiration control system, its features, and usage instructions. We hope this system facilitates the management of your vehicle documents.
