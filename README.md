# Draudzes ģimeņu nometnes lapa

Vienas lapas mājaslapa nometnes dalībniekiem: dienas plāns pa dienām,
dievkalpojumi ar YouTube saitēm, svētdienas skolas un jauniešu programmas
apraksti, galerija un kontakti.

**Dzīvā lapa:** https://ilmars.github.io/Camp_one_page/

Bez bibliotēkām un build soļiem — tīrs HTML/CSS/JS. Latviešu valodā,
pielāgota telefonam.

## Faili

| Fails | Kas tas ir |
|---|---|
| `index.html` | Visa lapa (HTML + CSS + JS vienā failā). Ikdienā nav jāmaina. |
| `config.js` | **Visa rediģējamā informācija un teksti** — nosaukums, vieta, logo, izklājlapas adrese, bildes, programmu apraksti, kontakti. |
| `dienas-plans.csv` | Rezerves dienas plāns, ja Google izklājlapa nav pieejama. |
| `dienas-plans-template.csv` | Paraugs, ko importēt Google izklājlapā. Lapa šo failu **nelasa**. |
| `serve.py`, `serve.bat` | Lokāls serveris lapas apskatei datorā. |
| `.github/workflows/pages.yml` | Automātiska publicēšana GitHub Pages pēc katra push. |

## Satura rediģēšana

Viss teksts un aizpildāmā informācija ir `config.js` failā (katram laukam
komentārs ar paskaidrojumu): nosaukums, datumi, vieta, logo, grupu žetoni,
dienu datumi, programmu apraksti, bildes, foto albuma saite, kontakti, kājene.
Saglabā failu, pārlādē lapu — gatavs.

## Dienas plāns no Google izklājlapas

Plāna avoti pēc prioritātes:

1. **Google izklājlapa** (`sheetCsvUrl` config.js failā) — galvenais avots,
   maināms arī nometnes laikā no telefona;
2. **`dienas-plans.csv`** blakus lapai — rezerve, ja izklājlapa nav pieejama;
3. **iebūvētais plāns** `index.html` failā — pēdējā rezerve.

Konsolē (F12 → Console) lapa pasaka, kurš avots ielādēts.

### Izklājlapas kolonnas

Kolonnas atpazīst pēc nosaukumiem galvenes rindā, secībai nav nozīmes:

| Kolonna | Nozīme |
|---|---|
| `Diena` | Pirmdiena … Sestdiena. Rindu secība nosaka notikumu secību dienā. |
| `Laiks` | Piem., `8:00` vai `08:00` — rāda kā ierakstīts. |
| `Nosaukums` | Notikuma nosaukums (aktivitātei ar grupu — aktivitātes nosaukums). |
| `Apraksts` | Neobligāts pelēks teksts zem nosaukuma, piem., `Lielajā teltī`. |
| `Grupa` | Skat. zemāk. |
| `YouTube` | Tiešraides/ieraksta saite — parādās poga "Skatīties YouTube". |
| `Veids` | `Dievkalpojums` / `Ēdienreize` / `Aktivitāte` / `Lūgšanas` — krāsu svītra kartītes malā. Neobligāts. |

### Grupa kolonna

- **tukša** — parasts notikums visiem, bez birkām;
- **`Paralēli`** — trīs standarta grupu birkas (no `config.js` → `grupas`);
- **savas birkas ar semikolu** (notikumiem ar Veidu, izņemot aktivitātes) —
  piem., `Pieaugušie un jaunieši; Svētdienas skola (3–11 g.)` → divas birkas;
- **aktivitātēm** (Veids = `Aktivitāte` vai tukšs) jebkura vērtība (`Bērniem`,
  `Vīriem`, `Pieaugušajiem`…) kļūst par apakškategoriju, kas apvienojas ar
  citām tā paša laika kategorijām vienā "Dienas aktivitātes" kartītē.

### Izklājlapas publicēšana

1. Google izklājlapā: **Fails → Kopīgot → Publicēt tīmeklī**.
2. Izvēlies konkrēto lapu (ne visu dokumentu) un formātu **CSV**.
3. Nokopēto adresi ielīmē `config.js` → `sheetCsvUrl`.

Izmaiņas izklājlapā publicētajā CSV parādās ar **~5 minūšu aizkavi**;
pārlūkā dažkārt vajag piespiedu pārlādi (Ctrl+F5).

## Lapas apskate datorā

Dubultklikšķis uz `index.html` lapu atver, bet drošības ierobežojumu dēļ
neielādē ne izklājlapu, ne lokālo CSV (rāda iebūvēto plānu). Pilnai apskatei:

```
serve.bat        (vai: python serve.py)
```

Atvērsies http://localhost:8765 (ja ports aizņemts, skripts pats atrod nākamo).
Serveris neko nekešo — labojumi redzami uzreiz pēc pārlādes. Aptur ar Ctrl+C.

## Saites uz konkrētu dienu

Katrai dienai ir savs enkurs — ērti sūtīt grupas čatā:

```
https://ilmars.github.io/Camp_one_page/#otrdiena
```

`#pirmdiena`, `#otrdiena`, `#tresdiena`, `#ceturtdiena`, `#piektdiena`,
`#sestdiena` (darbojas arī ar mīkstinājumiem — `#trešdiena`).

## Publicēšana

Push uz `master` automātiski pārpublicē lapu GitHub Pages (darbplūsma
`.github/workflows/pages.yml`, publicē `index.html`, `config.js` un CSV failus).
Parasti dzīvs ~1–2 minūtēs.

```
git add -A
git commit -m "apraksts"
git push origin master
```
