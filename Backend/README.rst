Documentazione del File Documentazione del File ======================= 
Questo file contiene il codice per un'applicazione Node.js basata su Express, che periodicamente recupera il numero di follower da un profilo Instagram specificato, pubblica il conteggio attraverso MQTT e fornisce l'informazione al frontend tramite un'API REST. 
Struttura del File ------------------
Il file è diviso in due parti principali: la parte che gestisce le richieste Instagram e l'altra che gestisce le operazioni MQTT. 
### Gestione Richieste Instagram #### Dipendenze -
`express`: framework per gestire le richieste HTTP - 
`cors`: middleware per abilitare la condivisione di risorse tra origini diverse -
`path`: modulo per gestire i percorsi dei file - 
`https`: modulo per effettuare richieste HTTPS -
`mqttClient`: modulo personalizzato per la gestione del protocollo MQTT -
`HttpsProxyAgent`: agente per gestire le richieste attraverso un proxy #### Variabili di Configurazione -
`proxyOptions`: URL del proxy (da configurare) #### Configurazione Express -
Inizializzazione dell'app Express e definizione della porta -
Abilitazione CORS per tutte le route - Servizio dei file statici dalla directory 'Frontend' #### 
Configurazione Richiesta Instagram -
Definizione del nome utente Instagram da cui recuperare il conteggio dei follower -
Opzioni di richiesta per ottenere le informazioni del profilo Instagram 
- Variabili per il conteggio dei follower e il conteggio precedente - 
Funzione `fetchFollowerCount` per ottenere e pubblicare il conteggio dei follower tramite MQTT 
- Chiamata periodica della funzione ogni 2 secondi tramite `setInterval` #
### Route Express - Una route `/getFollowerCount` per fornire il conteggio dei follower al frontend #### Avvio del Server Express - Avvio del server Express sulla porta specificata ### Gestione MQTT #### Dipendenze -
`mqtt`: modulo per la comunicazione MQTT #### Configurazione Connessione MQTT -
Parametri di connessione, come protocollo, host, porta, ID cliente, ecc. 
- Creazione di un'istanza client MQTT e connessione al broker #### Eventi MQTT 
- Gestione degli eventi `connect` e `message` per la connessione al broker e la ricezione di messaggi
#### Funzione di Pubblicazione MQTT - Funzione `publishMessage` per pubblicare un messaggio sul broker MQTT #### Esportazione della Funzione MQTT - Esportazione della funzione `publishMessage` per l'utilizzo esterno Utilizzo -------- 1. Configurare l'URL del proxy nella variabile `proxyOptions`. 2. Assicurarsi che le dipendenze siano installate eseguendo `npm install`. 3. Avviare l'applicazione eseguendo `node `. L'applicazione periodicamente recupera il conteggio dei follower da Instagram, lo pubblica tramite MQTT e fornisce l'informazione al frontend attraverso l'API REST.
 La risposta JSON viene analizzata, e se il conteggio è cambiato rispetto al vecchio valore, viene pubblicato tramite MQTT.

Intervallo di richiesta dei follower: La funzione per ottenere il conteggio dei follower viene chiamata ogni 10 secondi.

Route per ottenere il conteggio dei follower: Viene definita una route che restituisce il conteggio dei follower .

Avvio del server: Il server Express viene avviato sulla porta specificata
 Gestione MQTT

 Dipendenze
- `mqtt`: modulo per la comunicazione MQTT

 Configurazione Connessione MQTT
- Parametri di connessione, come protocollo, host, porta, ID cliente, ecc.
- Creazione di un'istanza client MQTT e connessione al broker

Eventi MQTT
- Gestione degli eventi `connect` e `message` per la connessione al broker e la ricezione di messaggi

Funzione di Pubblicazione MQTT
- Funzione `publishMessage` per pubblicare un messaggio sul broker MQTT

Esportazione della Funzione MQTT
- Esportazione della funzione `publishMessage` per l'utilizzo esterno

Utilizzo

1. Configurare l'URL del proxy nella variabile `proxyOptions`.
2. Assicurarsi che le dipendenze siano installate eseguendo `npm install`.
3. Avviare l'applicazione eseguendo `node <nome_file>`.

L'applicazione periodicamente recupera il conteggio dei follower da Instagram, lo pubblica tramite MQTT e fornisce l'informazione al frontend attraverso l'API REST.
