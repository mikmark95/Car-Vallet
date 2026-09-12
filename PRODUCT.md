# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS (vanilla, nessun framework, nessun backend) — richiesto esplicitamente dall'utente.

## Users

Viaggiatori che partono dall'aeroporto di Perugia e vogliono prenotare online, prima della partenza, un servizio di parcheggio con valet: consegnano l'auto a un operatore che la parcheggia e la riconsegna al ritorno, all'orario/giorno stabilito, direttamente al veicolo personale.

## Product Purpose

Servizio di car valet parking per l'aeroporto di Perugia, dichiarato dall'utente come attualmente inesistente in loco. Il sito permette di prenotare online il servizio, calcolare il costo in base alla categoria dell'auto (piccola/media/grande) e alle date di sosta, e inviare la richiesta di prenotazione. Successo = prenotazione compilata correttamente e inviata (via email, non essendoci backend in questa fase).

## Positioning

[INFERITO] Nessun servizio equivalente esiste oggi all'aeroporto di Perugia — il vantaggio dichiarato è la comodità: l'auto viene ritirata e riconsegnata direttamente al veicolo del cliente, senza navette o parcheggi da raggiungere a piedi.

## Operating Context

Flusso dichiarato dall'utente: 1) il cliente prenota online indicando date/orari di consegna e ritiro e il modello/categoria dell'auto; 2) il giorno della partenza consegna l'auto a un operatore in aeroporto; 3) l'operatore la parcheggia; 4) al ritorno (data/ora stabilita) l'operatore riconsegna l'auto al cliente.

## Capabilities and Constraints

- Prezzo calcolato in base alla categoria dell'auto (piccola/media/grande); la categoria si ottiene selezionando manualmente il modello dell'auto (mappato a una categoria) — niente ricerca automatica tramite targa in questa fase: concordato con l'utente, rimandato perché in Italia non esiste un'API pubblica gratuita targa→modello (serve un servizio a pagamento di terze parti).
- Nessun backend: l'invio della prenotazione avviene lato client — [INFERITO: nessuna persistenza server-side delle prenotazioni in questa fase, da rivedere quando si vorrà uno storage reale].
- Tariffe giornaliere per categoria e lista modello→categoria: [INFERITO, valori placeholder ragionevoli — da sostituire con i dati reali del cliente prima del lancio].

## Evidence on Hand

Nessun asset reale fornito (logo, foto, prezzi ufficiali, testimonianze). I prezzi e la mappatura modello→categoria nel form sono placeholder da sostituire con dati reali.

## Product Principles

1. Fiducia e professionalità prima di tutto: chi affida la propria auto a un operatore deve sentirsi rassicurato — sicurezza, trasparenza, chiarezza sul processo.
2. Zero attrito nella prenotazione: modulo veloce da compilare anche da mobile, magari mentre si è già in viaggio verso l'aeroporto.
3. Trasparenza sul prezzo: il costo totale è sempre visibile e si aggiorna in tempo reale durante la compilazione.

## Accessibility & Inclusion

[Non specificato dall'utente — nessun requisito oltre le buone pratiche standard: contrasto, focus visibili, form navigabile da tastiera.]
