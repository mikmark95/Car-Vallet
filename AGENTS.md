# AGENTS.md

Istruzioni per qualsiasi agente di coding (Claude, Cursor, Codex, Copilot, ecc.) che lavora su questo progetto.

## Panoramica del progetto

Sito web statico a pagina singola per la prenotazione online del valet parking all'Aeroporto di Perugia. Il cliente compila un modulo (modello auto, date di consegna/ritiro), vede il prezzo aggiornarsi in tempo reale e riceve un codice di prenotazione; non essendoci backend, la richiesta viene finalizzata via email (`mailto:`). Dettagli di prodotto in [PRODUCT.md](PRODUCT.md), sistema visivo in [DESIGN.md](DESIGN.md).

## Setup

Nessuna dipendenza da installare: HTML/CSS/JS vanilla, nessun framework, nessun bundler, nessun backend. Basta un editor e un browser.

## Comandi principali

- Avvio locale: apri `index.html` direttamente nel browser, oppure `npx serve .` per servirlo via HTTP.
- Non ci sono script di build, lint o test configurati in questo progetto.

## Convenzioni

- Vanilla JS in IIFE (`(() => { "use strict"; ... })()`) in [js/script.js](js/script.js), nessun modulo/bundler.
- CSS con custom properties per i colori/token del design system (vedi [DESIGN.md](DESIGN.md)); non introdurre framework CSS.
- Testi e contenuti dell'interfaccia in italiano.
- Tariffe e mappatura modello→categoria auto sono placeholder in [js/script.js](js/script.js) (oggetti `RATES` e `CAR_CATALOG`): segnalare sempre chiaramente quando un valore è un placeholder da confermare col cliente.

## Architettura

- `index.html` — markup unico della pagina (hero, come funziona, prezzi, modulo di prenotazione, contatti, modal di conferma).
- `css/style.css` — tutti gli stili, nessun preprocessore.
- `js/script.js` — tutta la logica: catalogo modello→categoria, calcolo prezzo/giorni con animazione del totale, validazione del form, generazione codice prenotazione, apertura modal e link `mailto:` precompilato.
- Nessun backend, nessuna persistenza server-side: le prenotazioni non vengono salvate da nessuna parte, solo mostrate a schermo e proposte via email.

## Note per l'agente

- Non introdurre un backend o uno storage reale senza che l'utente lo richieda esplicitamente: è una decisione di scope presa consapevolmente (vedi PRODUCT.md, sezione "Capabilities and Constraints").
- Non implementare ricerca automatica tramite targa auto: rimandata perché in Italia non esiste un'API pubblica gratuita targa→modello.
- Rispettare rigorosamente il design system in [DESIGN.md](DESIGN.md), in particolare: sfondo blu-inchiostro dominante, ottone come unico colore satura riservato ad azioni/dati vivi, monospace solo per cifre/date/codici, card "Come funziona" senza sfondo/bordo uniforme.
- Aggiornare README.md, AGENTS.md e CHANGELOG.md quando si aggiungono funzionalità rilevanti o si cambiano le convenzioni del progetto.
