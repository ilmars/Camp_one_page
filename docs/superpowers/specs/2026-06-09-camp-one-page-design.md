# Draudzes ģimeņu nometnes vienas lapas mājaslapa — dizaina specifikācija

Datums: 2026-06-09
Statuss: apstiprināts brainstorming sesijā (vizuālais variants A — "Gaišs minimālisms")

## Mērķis

Informatīva programmas lapa nometnes dalībniekiem: kad notiek dievkalpojumi,
svētdienas skola, jauniešu programma un brīvā laika aktivitātes. Nav
reģistrācijas — tikai informācija.

## Tehniskais risinājums

- **Viens pašpietiekams fails `index.html`** projekta saknē — viss CSS un JS
  iekļauts failā, bez ārējām bibliotēkām un bez build soļiem.
- Attēli: Unsplash stock bildes ar tiešajiem URL (lietotājs vēlāk nomainīs
  pret savām pagājušā gada fotogrāfijām — URL viegli atrodami un nomaināmi failā).
- Mobile-first responsīvs dizains; jāizskatās labi gan telefonā, gan datorā.
- Valoda: **latviešu**.
- Darbojas, atverot failu tieši pārlūkā (file://) vai no jebkura statiska servera.

## Vizuālais stils (variants A — gaišs minimālisms)

- Gaišs krēmīgs/balts fons (#fafaf7 tonis), tumši pelēks/melns teksts.
- Akcenta krāsa: silti zaļa (~#2c7a4b) laikiem un aktīvajiem elementiem.
- Liela, trekna tipogrāfija virsrakstos.
- Apaļas "tabletes" (pill) formas dienu pārslēgam.
- Baltas kartītes ar maigām ēnām programmas punktiem.
- Hero sadaļā stock foto kā fons vai liels attēls.

## Lapas uzbūve

1. **Hero**
   - Datumu rindiņa: "21.–26. jūnijs" (bez gada — lietotājs pieliks pats).
   - Liels nosaukums: "Draudzes ģimeņu nometne" (vietturis, lietotājs nomainīs).
   - Vietas rindiņa: vietturis (tukšs/aizpildāms).
   - Trīs grupu žetoni: 👨‍👩‍👧 Pieaugušie · 🙌 Jaunieši (no 12 gadiem) ·
     🎨 Svētdienas skola (3–11 gadi), ar piezīmi, ka dievkalpojumi visām trim
     grupām notiek paralēli.
   - Stock attēls (vasaras nometne / daba).

2. **Dienu pārslēgs**
   - 6 pill pogas: Pirmdiena 21.06 … Sestdiena 26.06.
   - Klikšķis parāda tikai izvēlētās dienas programmu (JS pārslēgšana, bez
     lapas pārlādes).
   - Ja lapa atvērta datumā, kas ietilpst 21.–26.06, automātiski atlasās
     šodienas diena (salīdzina dienu un mēnesi, ignorē gadu); citādi pirmdiena.

3. **Dienas programma** (kartīšu laika līnija)
   - Katra kartīte: laiks (zaļš, trekns) + nosaukums + auditorijas piezīme.
   - Dievkalpojumu kartītēm norāda trīs paralēlās grupas.

4. **Kājene**
   - Neliela rindiņa ar nometnes nosaukumu un "Kopā 10 dievkalpojumi" piezīmi
     vai līdzīgu kopsavilkumu.

## Dienu saturs

**Pirmdiena 21.06 (ierašanās):**
- 18:30 Atklāšanas dievkalpojums (visas grupas paralēli)
- 22:00 Vakara uzkodas
- 22:30 Nakts aktivitāte

**Otrdiena 22.06 – Piektdiena 25.06 (pilnas dienas, vienāds ritms):**
- 8:30 Rīta lūgšanas un brokastis
- 10:00 Rīta dievkalpojums (paralēli: pieaugušie / jaunieši / svētdienas skola)
- 13:00 Pusdienas
- 14:00 Dienas aktivitātes pa kategorijām (paralēli): bērniem, jauniešiem,
  vīriem, sievietēm — katra kategorija ar savu krāsainu žetonu kartītē
- 17:30 Vakariņas
- 18:30 Vakara dievkalpojums (paralēli: pieaugušie / jaunieši / svētdienas skola)
- 22:00 Vakara uzkodas
- 22:30 Nakts aktivitāte

**Sestdiena 26.06 (noslēgums):**
- 8:30 Rīta lūgšanas un brokastis
- 10:00 Noslēguma dievkalpojums (visas grupas kopā)

Kopā: 1 + 4×2 + 1 = **10 dievkalpojumi** (apstiprināts ar lietotāju).

Dienas aktivitātes (14:00) rāda kā vienu laika bloku ar četrām paralēlām
kategorijām: 🧒 Bērniem · 🙌 Jauniešiem · 👔 Vīriem · 🌸 Sievietēm. Katrai
kategorijai datu masīvā ir vieta konkrētam aktivitātes nosaukumam; pagaidām
vispārīgi vietturi (piem., "Spēles un sports"), ko lietotājs nomainīs.
Nakts aktivitātes nosaukums vispārīgs ("Nakts aktivitāte").

## Datu glabāšana kodā

Dienu programma definēta kā JS masīvs (diena → notikumu saraksts ar laiku,
nosaukumu, auditoriju), lai lietotājs varētu viegli labot saturu vienā vietā,
nemainot HTML struktūru.

## Kļūdu apstrāde / malas gadījumi

- Ja Unsplash attēls neielādējas (nav interneta), lapai jāpaliek lietojamai —
  attēliem fona krāsa kā rezerve.
- Dienas auto-izvēle nedrīkst salūzt ārpus nometnes datumiem — tad rāda pirmdienu.

## Testēšana

- Manuāla pārbaude pārlūkā (Chrome) ar telefona izmēra skatu (~380px) un
  desktop izmēru: dienu pārslēgs darbojas, visas 6 dienas rāda pareizo saturu.
- Pārbaude, ka fails darbojas atvērts kā file:// bez servera.

## Ārpus tvēruma

- Reģistrācijas forma, kartes, vairākvalodu atbalsts, CMS — nav vajadzīgs.

## 2. iterācija (2026-06-09, lietotāja labojumi pēc pirmās versijas)

1. **Dienas plāns no Google Sheets.** Lapas augšā JS konstante
   `SHEET_CSV_URL` — publicētas Google izklājlapas CSV adrese
   (Fails → Kopīgot → Publicēt tīmeklī → CSV). Ja adrese norādīta un
   ielāde izdodas, plānu būvē no CSV; citādi (tukša adrese, nav interneta,
   kļūda) klusi izmanto iebūvēto plānu. CSV kolonnas:
   `Diena,Laiks,Nosaukums,Apraksts,Grupa`:
   - `Diena`: Pirmdiena … Sestdiena (rindu secība nosaka notikumu secību dienā);
   - `Grupa` tukša = visiem; `Paralēli` = dievkalpojums ar trim paralēlajām
     grupām; `Bērniem`/`Jauniešiem`/`Vīriem`/`Sievietēm` = vienas dienas un
     laika rindas apvieno vienā "Dienas aktivitātes" kartītē pa kategorijām.
   - Repo pievienots paraugs `dienas-plans-template.csv`, ko ielīmēt izklājlapā.
2. **Bez krāsainajām emoji ikonām.** Visas emoji aizstāj ar tekstu vai
   vienkrāsainām inline SVG ikonām (currentColor).
3. **Sestdienas papildinājums:** 13:00 "Pusdienas un došanās mājās".
4. **Foto saite:** zem galerijas saite "Visas nometnes bildes" (vietturis
   `href="#"` ar komentāru, kur ielīmēt albuma adresi). Galerija paliek.
5. **Kontaktu sadaļa:** kartītes ar atbildīgajām personām — loma, vārds
   (vietturis), telefons kā `tel:` saite. Sākotnējās lomas: nometnes
   vadītājs, svētdienas skola, jaunieši, saimniecības jautājumi.

## 3. iterācija (2026-06-09): konfigurācija atsevišķā failā

Visa aizpildāmā informācija un teksti pārcelti uz `config.js` (JSON objekts
`CONFIG` ar latviskiem laukiem) — `index.html` vairs nav jārediģē. Saturs:
nosaukums, datumi, vieta, grupu žetoni, piezīme, `sheetCsvUrl`, dienu
datumi/piezīmes, hero bilde, galerijas virsraksts un bildes, foto saites
teksts un adrese, kontaktu virsraksts un saraksts, kājenes teksts (nosaukums
pievienojas automātiski).

Tīrs `.json` fails apzināti netiek lietots: atverot lapu kā `file://`,
pārlūks `fetch('config.json')` bloķē (CORS), bet `<script src="config.js">`
strādā gan no faila, gan no servera. Ja `config.js` trūkst, lapa nenokrīt —
attēlo tukšas vērtības un iebūvēto plānu. Dienas automātiskā izvēle tagad
salīdzina gan dienu, gan mēnesi no `dienas` datumiem.
