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
