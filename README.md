# Car-Vallet

Sito web statico per prenotare il servizio di valet parking all'Aeroporto di Perugia: il cliente consegna le chiavi a un operatore, che parcheggia l'auto e la riconsegna direttamente al veicolo al ritorno.

## Cosa fa

Pagina singola (HTML/CSS/JS vanilla, nessun backend) con:

- presentazione del servizio e dei passaggi ("Come funziona");
- prezzi per categoria auto (piccola / media / grande);
- modulo di prenotazione con autocompletamento del modello auto (la categoria viene rilevata automaticamente dal modello, correggibile manualmente) e calcolo del totale in tempo reale in base a categoria e giorni di sosta;
- riepilogo "tagliando" con codice prenotazione generato lato client e modal di conferma con link `mailto:` precompilato (non essendoci un backend, l'invio effettivo avviene via email).

## Struttura

```text
index.html       markup della pagina
css/style.css     stili (design system "concierge", vedi DESIGN.md)
js/script.js      logica del form, catalogo modello→categoria, validazione, modal
PRODUCT.md        contesto di prodotto (utenti, scope, decisioni)
DESIGN.md         design system e regole visive
```

## Come avviarlo in locale

Nessuna build necessaria: è HTML/CSS/JS statico. Basta aprire `index.html` in un browser, oppure servirlo con un server statico qualsiasi, ad esempio:

```bash
npx serve .
```

## Note

- Tariffe (€6/9/13 al giorno) e mappatura modello→categoria in [js/script.js](js/script.js) sono placeholder: da sostituire con i dati reali del cliente prima del lancio.
- Non esiste ricerca automatica tramite targa: la categoria si ottiene selezionando/digitando il modello dell'auto.
- Vedi [AGENTS.md](AGENTS.md) per le istruzioni destinate agli agenti di coding.
