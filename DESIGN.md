---
name: CarVallet
description: Valet parking per l'Aeroporto di Perugia — sito a pagina singola in stile "tagliando da concierge"
colors:
  ink-950: "#070b14"
  ink-900: "#0b1220"
  ink-850: "#0d1626"
  ink-800: "#111c33"
  ink-700: "#182848"
  brass-300: "#f0d99b"
  brass-400: "#e0b859"
  brass-500: "#c9a44c"
  brass-600: "#a9843a"
  card-ivory: "#f7f1e2"
  card-ivory-edge: "#e4d5ab"
  card-ivory-ink: "#1c1710"
  text-hi: "#f3f0e8"
  text-mid: "#c7cadb"
  text-mute: "#8892ac"
  danger: "#e07a6b"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.35rem, 1.4rem + 3.1vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Outfit, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontWeight: 600
rounded:
  pill: "100px"
  card: "18px"
  input: "10px"
spacing:
  section-y: "6.5rem"
  card-gap: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.brass-500}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.6rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.brass-400}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.6rem"
---

# Design System: CarVallet

## Overview

**Creative North Star: "Il tagliando del concierge"**

CarVallet vende fiducia, non solo un posto auto: chi prenota affida la propria auto a uno sconosciuto per giorni, in un aeroporto. Il sistema visivo traduce questa fiducia nella metafora del tagliando di un concierge notturno — il tipo di ricevuta cartacea, numerata e con matrice, che si riceve consegnando qualcosa di prezioso a un servizio professionale (guardaroba di un hotel, valet di lusso). Lo sfondo resta un inchiostro blu-notte per l'intero sito (mai una base color crema/pergamena, deliberatamente, per non cadere nel cliché "sfondo caldo + serif" ricorrente nelle interfacce generate da AI); l'ottone (brass) è l'unico colore satura ed è riservato agli elementi realmente azionabili — pulsanti, stato attivo, cifre di prezzo — mai decorazione diffusa. Le "tessere" color avorio (biglietti, riepilogo prenotazione, modal di conferma) sono l'unico punto in cui compare un materiale chiaro, e vivono come oggetti fisici appoggiati sullo sfondo scuro, non come base pagina.

**Key Characteristics:**
- Fondo blu-inchiostro dominante (>70% della superficie) in ogni sezione; l'avorio compare solo su elementi-tessera.
- Un solo colore satura (ottone) usato esclusivamente per azioni e dati vivi (prezzo, stato selezionato).
- Numeri, date, codici prenotazione e prezzi sempre in monospace (IBM Plex Mono) — l'unico uso legittimo del monospace nel sistema.
- Titoli in un serif editoriale (Newsreader) con corsivo riservato alle parole chiave di ogni headline.

## Colors

Palette "Committed": neutro blu-inchiostro come base, ottone come singolo accento satura che copre pulsanti, cifre e stati attivi (non il 30-60% letterale della superficie, ma il 100% degli elementi azionabili — la disciplina presa in prestito dal challenger "warm-consumer-app" durante la scelta della direzione).

### Primary
- **Ottone (Brass)** (`#c9a44c`, gradiente verso `#f0d99b`): riservato a CTA, stato attivo delle pill di categoria, cifre di prezzo, medaglioni numerati, focus ring, selezione testo, thumb della scrollbar. Non appare mai come sfondo di sezione.

### Neutral
- **Inchiostro 950/900/850/800** (`#070b14` → `#111c33`): scala di fondo usata per alternare leggermente le sezioni (hero più scura, steps/booking a metà scala, pricing/contact un passo più chiaro) senza mai uscire dal registro notturno.
- **Avorio tagliando** (`#f7f1e2`, bordo `#e4d5ab`): materiale delle "tessere" (pricing card, riepilogo prenotazione, modal) — mai usato come sfondo di pagina.
- **Testo alto/medio/mute** (`#f3f0e8` / `#c7cadb` / `#8892ac`): tre livelli di gerarchia testuale su fondo scuro.

### Named Rules
**La regola dell'unico satura.** L'ottone appare solo dove l'utente può agire o dove un dato è "vivo" (prezzo che cambia, stato selezionato). Un ottone decorativo che non corrisponde a un'azione è un errore di sistema.

## Typography

**Display Font:** Newsreader (serif editoriale con corsivo)
**Body Font:** Outfit (sans geometrico)
**Label/Mono Font:** IBM Plex Mono

**Character:** un serif con carattere per i titoli (richiama l'incisione su ottone di un'insegna da concierge) accostato a un sans pulito e moderno per corpo/UI; il monospace entra solo dove il contenuto è un numero o un codice, mai come costume "tecnico".

### Hierarchy
- **Display** (600, clamp(2.35rem, 1.4rem + 3.1vw, 4rem), line-height 1.08): titolo hero, titoli di sezione.
- **Title** (600, 1.15–1.45rem): titoli di card (step, pricing, form).
- **Body** (400, 1rem, line-height 1.55): paragrafi e copy dei form.
- **Label** (600, 0.86–0.95rem): etichette dei campi, nav, pillole categoria.
- **Mono** (600, 0.8–2.6rem secondo contesto): prezzi, giorni di sosta, codice tagliando, date nel riepilogo.

### Named Rules
**La regola del monospace guadagnato.** Il monospace compare solo su cifre, date e codici — mai su titoli o corpo di testo, per restare fedele al divieto di "monospace come costume tecnico".

## Layout

Sezioni impilate a piena larghezza con contenuto centrato a `max-width: 1180px` e padding verticale generoso (`6.5rem`, ridotto a `4.5rem` sotto 640px). Hero a due colonne (copy + illustrazione tagliando) che collassa a colonna singola sotto 640px. "Come funziona" è una sequenza orizzontale a 4 stazioni collegate da una linea tratteggiata color ottone (non caselle uguali con bordo: le card sono state deliberatamente private di sfondo/bordo per leggersi come tappe di un percorso, non come una griglia generica di icona+titolo+testo). Il modulo di prenotazione è a due colonne (form + riepilogo "tagliando" sticky) sopra i 1080px, impilato sotto.

## Elevation & Depth

Sistema ibrido: le sezioni scure sono piatte (nessuna ombra tra loro, la separazione è tonale, tra `--ink-950/900/850`); le tessere avorio (pricing, riepilogo, modal) usano ombre morbide con offset per staccarsi fisicamente dallo sfondo scuro, coerente con l'idea di un oggetto di carta appoggiato su un piano.

### Shadow Vocabulary
- **shadow-lift** (`0 18px 40px -18px rgba(0,0,0,.55)`): sotto ogni tessera avorio (pricing card, riepilogo, modal).
- **brass-glow** (`0 10px 24px -10px rgba(224,184,89,.35)`): sotto i pulsanti e i medaglioni numerati, per segnalare "azionabile".

### Named Rules
**La regola della carta sollevata.** Solo il materiale "tagliando" (avorio) riceve un'ombra propria; gli elementi sullo sfondo scuro non ne hanno mai bisogno perché la profondità lì è tonale, non proiettata.

## Shapes

Raggio pillola (`100px`) per tutti i pulsanti e le pillole di selezione categoria; raggio `18px` per le tessere; raggio `10px` per i controlli di form. Nessun bordo spigoloso: il mondo del "tagliando" ammette angoli morbidi ovunque tranne che nell'illustrazione SVG del biglietto stesso, che riproduce gli angoli leggermente smussati di un vero cartoncino.

## Components

### Buttons
- **Shape:** pillola (`100px`)
- **Primary (`.btn-brass`):** sfondo gradiente ottone, testo ink-950, ombra brass-glow; unico stile ammesso per l'azione principale di ogni sezione.
- **Outline (`.btn-outline`):** bordo ottone, testo ottone, si riempie di ottone all'hover.
- **Ghost (`.btn-ghost`):** bordo bianco trasparente, per CTA secondarie su fondo scuro (es. "Scopri come funziona").

### Cards / Tessere
- **Corner Style:** 18px
- **Background:** avorio (`#f7f1e2`), mai inchiostro
- **Shadow Strategy:** vedi Elevation & Depth, shadow-lift
- **Border:** 1px `#e4d5ab`; la card "Media" (più scelta) usa bordo ottone pieno come unica eccezione cromatica

### Inputs / Fields
- **Style:** sfondo `ink-800`, bordo `hairline` (ottone 22% opacità), raggio 10px
- **Focus:** bordo ottone pieno + alone `0 0 0 3px rgba(224,184,89,.18)`
- **Error:** bordo `--danger` (`#e07a6b`) sul campo, messaggio in rosso sotto il campo

### Navigation
- **Style:** nav fissa, sfondo trasparente che diventa `rgba(7,11,20,.86)` con blur al passaggio dello scroll; link con sottolineatura ottone che si espande all'hover; su mobile, menu a comparsa a tutta larghezza.

### Riepilogo prenotazione (componente firma)
Tessera avorio sticky accanto al form, con codice prenotazione in monospace, righe di riepilogo (categoria/modello/giorni/tariffa) e un totale che si anima con un conteggio meccanico (ease-out cubico, ~500ms) ogni volta che cambia — l'equivalente digitale di un contatore che scatta.

## Do's and Don'ts

### Do:
- **Do** mantenere lo sfondo dominante blu-inchiostro in ogni nuova sezione; l'avorio resta un materiale di tessera, mai una base pagina.
- **Do** usare il monospace solo per cifre, date e codici.
- **Do** riservare l'ottone alle azioni e ai dati vivi (prezzo, stato selezionato).

### Don't:
- **Don't** introdurre uno sfondo crema/pergamena a piena pagina: è il cliché esatto che questa direzione ha scelto di evitare.
- **Don't** aggiungere un secondo colore satura: il sistema è "Committed" su un solo accento.
- **Don't** rimettere le card "come funziona" dentro caselle con bordo/sfondo uniforme: la sequenza deve leggersi come un percorso, non come una griglia icona+titolo+testo.
