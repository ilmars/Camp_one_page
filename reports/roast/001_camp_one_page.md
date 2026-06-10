# Code Roast: camp one page (index.html, config.js, serve.py, pages.yml)

**Reviewed:** 2026-06-10
**Target:** visa repo saknes mape (index.html ~500 rindas, config.js, serve.py, .github/workflows/pages.yml)
**Reviewer:** Claude (Senior Engineer Mode)

---

## 1. Review Summary

Top-impact issues (max 5 bullets):
- **Plāna ielādei nav taimauta un nav ielādes stāvokļa** — sliktā tīklā (nometnes wi-fi!) grafika zona stāv tukša neierobežoti ilgi; iebūvētā rezerve neparādās, kamēr abi fetch nav *pabeigušies*.
- **serve.py klausās uz visām tīkla saskarnēm (`("", port)`)** un servē visu mapi, ieskaitot `.git/` — publiskā wi-fi tīklā jebkurš var izvilkt repo ar visu vēsturi.
- **Klusais `dienas-plans.csv` rezerves ceļš jau vienreiz radīja apjukumu** (lapā rādījās rezerves dati, lietotājs domāja, ka redz izklājlapu) — vienīgā pazīme ir console.info, ko parasts lietotājs neredz.
- **Pelēkais teksts (`--muted: #8a8a82`, `.cat i: #b3b3aa`) nesasniedz WCAG AA kontrastu** — tieši apraksti un vietas, ko lasīs saulē uz telefona.
- parseCSV/buildDays ir tīras funkcijas bez neviena automātiska testa — visa regresiju ķeršana notiek ar roku pārlūkā.

---

## 2. Top Issues Table (Prioritized)

| Done | Severity | Location | Category | Description |
|------|----------|----------|----------|-------------|
| [x] | P1 | index.html:478-502 (`loadCsv`, `init`) | Reliability | IZLABOTS: iebūvētais plāns renderējas uzreiz, CSV atsvaidzina klusi; fetch ar 8s taimautu |
| [x] | P2 | serve.py:36 (`("", port)`) | Security | IZLABOTS: serveris klausās tikai uz 127.0.0.1 |
| [ ] | P2 | index.html:495-498 + pages.yml:34 | Operability | Klusā pārslēgšanās uz `dienas-plans.csv` maskē izklājlapas kļūdas ar novecojušiem datiem |
| [x] | P2 | index.html:21,89 (`--muted`, `.cat i`) | Accessibility | IZLABOTS: --muted #6f6f66 (~4.6:1), .cat i #85857c + lielāks fonts |
| [x] | P3 | index.html:447-456 (`renderNav`) | Accessibility | IZLABOTS: aktīvajai dienai aria-current="true" |
| [ ] | P3 | index.html:293-308, 329-406 | Tests | parseCSV/buildDays bez vienības testiem, lai gan ir tīras funkcijas |
| [ ] | P3 | index.html:356 (`byName[diena]`) | Maintainability | Dienas vārdam jāsakrīt burts burtā — "otrdiena"/"Otrdiena " rada divas atsevišķas dienas pogas |
| [ ] | P3 | config.js:69 (`heroBilde` w=1600) | Performance | Telefons lejupielādē 1600px hero bildi; nav `srcset`/izmēra varianta |

---

## 3. Detailed Findings

### [P1] index.html:478-502 — Tukšs grafiks, kamēr karājas tīkls (Correctness & Reliability)

**Problem:** `init()` rāda dienu pogas un grafiku tikai **pēc** tam, kad secīgi pabeigti līdz pat diviem fetch (izklājlapa → lokālais CSV). Nevienam fetch nav taimauta (`AbortController`), un ielādes laikā `#daynav` un `#sched` ir pilnīgi tukši — bez skeleta, bez "ielādējas".

**Risk:** Nometnē ar vāju mobilo tīklu pieprasījums uz `docs.google.com` var karāties desmitiem sekunžu vai minūtes (pārlūka noklusējums). Visu šo laiku lapas galvenais saturs — programma — neeksistē. Lietotājs nolemj, ka lapa salūzusi. Iebūvētais rezerves plāns šajā scenārijā **nekad neparādās**, jo tas tiek lietots tikai pēc abu fetch *pabeigšanās*.

**Reproduction:** Chrome DevTools → Network → "Slow 3G" + throttling uz docs.google.com (vai vienkārši lifts/mežs nometnē). Lapa: hero ir, grafika nav.

**Why not a false positive:** kods rindās 489-502 ir vienīgais ceļš, kas izsauc `renderNav()`/`autoSelect()`, un tas ir aiz diviem `await` bez jebkāda laika ierobežojuma — uzvedība deterministiska.

**Fix:**
- Renderēt `DEFAULT_DAYS` uzreiz (sinhroni), tad pēc veiksmīgas CSV ielādes izsaukt `renderNav(); renderDay(pašreizējais)` vēlreiz — "render first, update later".
- Pievienot `AbortSignal.timeout(8000)` (vai AbortController) abiem fetch.

```js
async function init(){
  renderStatic();
  renderNav(); autoSelect();            // uzreiz rāda iebūvēto plānu
  const ok = (C.sheetCsvUrl && await loadCsv(C.sheetCsvUrl)) || await loadCsv('dienas-plans.csv');
  if (ok) { renderNav(); autoSelect(); } // klusi atsvaidzina ar īstajiem datiem
}
// loadCsv iekšā:
const res = await fetch(url, {signal: AbortSignal.timeout(8000)});
```

---

### [P2] serve.py:36 — Dev serveris atvērts visam lokālajam tīklam (Security)

**Problem:** `socketserver.ThreadingTCPServer(("", port), Handler)` — tukšs hosts nozīmē 0.0.0.0. `SimpleHTTPRequestHandler` servē **visu** projekta mapi ar direktoriju sarakstiem, ieskaitot `.git/` (visa commit vēsture, arī tas, kas vēlāk izdzēsts — piem., kontaktu telefoni, kad tos aizpildīsi).

**Risk:** Palaižot `serve.bat` uz klēpjdatora publiskā/nometnes wi-fi, jebkura ierīce tīklā var atvērt `http://<tavs-ip>:8765/.git/` un lejupielādēt repo. Tas nav hipotētiski — `git clone http://ip:8765/.git` strādā pret SimpleHTTPRequestHandler ar dumb-http protokolu.

**Why not a false positive:** pārbaudīta koda rinda; SimpleHTTPRequestHandler pēc noklusējuma rāda direktoriju sarakstus un neslēpj dotfiles; serveris reāli tiek darbināts (serve.bat ir dokumentēts lietošanai).

**Fix:**
```python
httpd = socketserver.ThreadingTCPServer(("127.0.0.1", port), Handler)
```
Ja vajag telefona priekšskatu LAN tīklā — pievienot apzinātu karogu `--lan`, kas pārslēdz uz `0.0.0.0`, un vismaz noliegt `.git` ceļu Handler.do_GET pārrakstē.

---

### [P2] index.html:495-498 + pages.yml:34 — Klusā rezerves CSV maskē problēmas ar novecojušiem datiem (Observability & Operability)

**Problem:** Ja izklājlapas fetch neizdodas (vai Google vēl nav pārpublicējis), lapa klusi rāda `dienas-plans.csv`, kas tiek publicēts GitHub Pages un praktiski vienmēr atpaliek no izklājlapas. Vienīgā pazīme ir `console.info`.

**Risk:** Nometnes dalībnieks redz vakardienas laikus un nezina, ka tie nav aktuālie. Šī sesijā jau notika tieši šāds incidents (lietotājs salīdzināja lapu ar izklājlapu un laiki nesakrita).

**Why not a false positive:** abu avotu satura novirze jau ir novērota praksē šajā projektā; deploy darbplūsma pages.yml:34 turpina publicēt rezerves failu.

**Fix (izvēlies vienu):**
- Izņemt `dienas-plans.csv` no pages.yml deploy saraksta — tad rezerve paliek tikai iebūvētais plāns (kas arī jāuztur, bet tas vismaz acīmredzami "bāzes" līmenī), VAI
- Rādīt nelielu vizuālu piezīmi zem dienu pogām, kad ielādēts rezerves avots: "Rādīts saglabātais plāns — aktuālāko skaties vēlāk".

---

### [P2] index.html:21,89 — Pelēkā teksta kontrasts zem WCAG AA (Accessibility / Maintainability)

**Problem:** `--muted: #8a8a82` uz `--bg: #fafaf7` ≈ 3.2:1; `.cat i` krāsa `#b3b3aa` uz `#f7f7f2` ≈ 2.1:1. WCAG AA pieprasa 4.5:1 parastam tekstam. Šajās krāsās ir tieši praktiskā informācija: apraksti, vietas ("Volejbola laukumā"), dienas piezīmes.

**Risk:** Lapu lietos ārā, saulē, uz telefona — tieši apstākļos, kur zems kontrasts kļūst nelasāms arī cilvēkiem ar perfektu redzi.

**Why not a false positive:** kontrasta attiecības aprēķinātas no faktiskajām hex vērtībām failā; šīs klases tiek lietotas reālā saturā (desc, ev-vieta, cat i).

**Fix:**
```css
--muted:#6f6f66;            /* ~4.6:1 uz #fafaf7 */
.cat i{color:#85857c}       /* ~3.5:1 maza, sekundāra rinda — vēlams arī palielināt fontu līdz .78rem */
```

---

### [P3] index.html:447-456 — Dienu pogām nav pieejamības stāvokļa (Accessibility)

**Problem:** Aktīvā diena tiek atzīmēta tikai ar CSS klasi `.active`. Ekrānlasītājs nevar pateikt, kura diena atlasīta.

**Fix:** `renderDay` iekšā līdzās `classList.toggle` pievienot `p.setAttribute('aria-current', j === i ? 'true' : 'false')`. Konteineram `role="tablist"` nav obligāts — pietiek ar `aria-current`.

**Why not a false positive:** DOM tiek ģenerēts tieši šajā kodā; neviens cits mehānisms stāvokli nepublicē.

---

### [P3] index.html:293-308, 329-406 — Nulle automātisko testu parserim un grupētājam (Test Coverage)

**Problem:** `parseCSV` (pēdiņas, CRLF, komati šūnās) un `buildDays` (8 dažādi zarojumi: veidi, grupas, Aktīvs, degrupēšana) ir projekta vienīgā netriviālā loģika — un to regresijas šobrīd ķer tikai manuāli pārlūkā. Pēdējo 5 funkciju pievienošanā katru reizi manuāli pārbaudīji ~4 scenārijus; tas nemērogojas.

**Fix:** Viens `tests.html` (vai Node skripts) ar ~10 assert izsaukumiem pret abām tīrajām funkcijām — bez ietvariem, bez build. Palaižams ar dubultklikšķi.

**Why not a false positive:** repo nav neviena testa faila (pārbaudīts ar failu sarakstu); abas funkcijas ir tīras un triviāli testējamas.

---

### [P3] index.html:356 — Dienas vārds jāraksta burts burtā precīzi (Maintainability)

**Problem:** `byName[diena]` grupē pēc precīzas virknes. "otrdiena" (mazais burts) vai "Trešdiena" bez mīkstinājuma izklājlapā radīs **divas** dienu pogas, un DAY_META (datumi, auto-izvēle) otrajai nepiesaistīsies.

**Fix:** normalizēt atslēgu ar jau esošo `slug(diena)` un vārdu rādīt no pirmās sastaptās rindas. ~3 rindas.

**Why not a false positive:** izklājlapu rediģē vairāki cilvēki nometnes laikā no telefoniem — rakstības variācija ir gandrīz garantēta.

---

### [P3] config.js:69 — Hero bilde vienā 1600px izmērā (Performance)

**Problem:** Telefons ielādē to pašu `w=1600` Unsplash bildi, ko desktops (~300-400 KB). Nav kritiski (Unsplash `auto=format` atdod webp), bet pirmajai ielādei mobilajā tīklā tas ir lielākais baits lapā.

**Fix:** vai nu `w=900` (kompromiss — hero tāpat pārklāts ar tumšu gradientu, asums nav svarīgs), vai `srcset` ar 800/1600 variantiem. Kad nomainīsi pret savām bildēm — saspied līdz ~150 KB.

**Why not a false positive:** bilde ir lielākais lejupielādējamais resurss lapā; URL parametrs redzams config.js:69.

---

## 4. Configuration & Standards Violations

| Location | Value/Pattern | Issue | Fix |
|----------|---------------|-------|-----|
| config.js:78-83 | `"Vārds Uzvārds", "+371 20 000 000"` | Kontaktu vietturi joprojām publicēti dzīvajā lapā | Aizpildīt vai pagaidām iztukšot `kontakti` masīvu (sadaļa pazudīs... tukšs masīvs šobrīd atstāj tukšu virsrakstu — skat. piezīmi zemāk) |
| config.js:74 | `"fotoAlbumaSaite": "#"` | Saite "Visas nometnes bildes" ved uz nekurieni | Ielikt albuma adresi vai pagaidām iztukšot un paslēpt saiti |
| pages.yml:34 | `cp ... dienas-plans.csv ...` | Publicē rezerves CSV, kas noveco (skat. P2) | Izņemt no deploy vai ieviest sinhronizācijas soli |

Piezīme: `kontakti: []` šobrīd renderē tukšu sadaļu ar virsrakstu "Kontakti" — vērts pievienot tādu pašu `hidden` loģiku kā `programmas` sadaļai.

---

## 5. Security Concerns

- **XSS no izklājlapas datiem: nosegts.** Visi izklājlapas lauki iet caur `esc()` (`&<>"`), ģenerētie atribūti ir tikai dubultpēdiņās, YouTube saites filtrētas ar `^https?://`, `target="_blank"` ir ar `rel="noopener"`. `esc()` neeskepē `'`, bet vienpēdiņu atribūtu ģenerētajā HTML nav — ja kāds nākotnē pievienos, tas kļūs par caurumu; ieteikums pievienot `'` mapei aizsardzībai pret nākotnes sevi.
- **config.js ir īpašnieka kontrolēts** — `fotoAlbumaSaite`/`logo` netiek validēti, bet tos raksta tas pats cilvēks, kas var rediģēt visu HTML; nav reāls uzbrukuma vektors.
- **Publicētā izklājlapas adrese ir publiska pēc dizaina** (jebkurš ar saiti var lasīt CSV) — saturs ir publisks nometnes plāns, tātad pieņemami; tikai neturēt izklājlapā neko privātu (piem., dalībnieku sarakstus citā lapā tajā pašā dokumentā publicēt NEDRĪKST — publicēšana "tikai šī lapa" to gan ierobežo).
- **serve.py LAN ekspozīcija** — skat. P2 augstāk; vienīgais reālais drošības darbs šajā repo.

---

## 6. Observability Gaps

- [x] Konsoles ziņa par datu avotu (laba!)
- [ ] **Lietotājam redzama** pazīme, ka rādīts rezerves/iebūvētais plāns, nevis izklājlapa
- [ ] Ielādes stāvoklis grafika zonai (skat. P1)
- Metrikas/tracing šāda mēroga statiskai lapai — apzināti nevajag; neuzskaitu kā trūkumu.

---

## 7. Test & Verification Notes

- Trūkst vienības testu: `parseCSV` (pēdiņas, `""` eskeips, CRLF, pēdējā rinda bez \n), `buildDays` (visi 5 veidi, Paralēli vs savas birkas, Aktīvs filtrs, vienas aktivitātes degrupēšana, galvenes atpazīšana jauktā secībā, pozicionālā rezerve bez galvenes).
- `autoSelect` datuma loģika (diena+mēnesis, gads ignorēts) nav testējama bez laika "iesaldēšanas" — vērts izcelt par tīru funkciju `pickDayIndex(days, now)`.
- Manuālā pārbaude pārlūkā līdz šim bijusi konsekventa, bet katrs jauns Veids/kolonna palielina kombināciju skaitu ģeometriski.

---

## 8. Quick Wins

1. `serve.py`: `("", port)` → `("127.0.0.1", port)` — viena rinda, novērš LAN ekspozīciju.
2. `init()`: renderēt iebūvēto plānu uzreiz un atsvaidzināt pēc CSV ielādes + `AbortSignal.timeout(8000)` — ~6 rindas, novērš tukšo lapu vājā tīklā.
3. `--muted` → `#6f6f66` — viena rinda, lasāmība saulē.
4. `renderDay`: pievienot `aria-current` — viena rinda.
5. `kontakti`/`galerija` sadaļām tāda pati `hidden` loģika kā `programmas` — tukšas sadaļas nerāda virsrakstu.

---

*Generated by Claude Code /roast command*
