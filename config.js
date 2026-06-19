/*
 * NOMETNES LAPAS KONFIGURĀCIJA
 * Šeit ir VISA aizpildāmā informācija un teksti — index.html nav jāmaina.
 * Pēc labojumiem vienkārši saglabā failu un pārlādē lapu.
 */
const CONFIG = {

  /* ===== Pamatinformācija ===== */
  "nosaukums": "Dieva Mājas nometne 2026",
  "datumi": "22.–27. jūnijs",
  "vieta": "Norkalni",

  /* Nometnes logo virsraksta zonā (attēla adrese, piem., "logo.png" vai pilns URL).
   * Tukšs "" = logo nerāda, ir tikai teksta virsraksts.
   * Ja gribi TIKAI logo bez teksta, ieliec "heroVirsraksts": "" —
   * nosaukums tāpat paliks lapas cilnē un kājenē.
   * Ar "heroVirsraksts" vari hero zonā rādīt arī citu tekstu nekā "nosaukums". */
  "logo": "",
  "heroVirsraksts": "Apsolītā zeme",

  /* Hero augšējā rinda (kā plakātā): zīmols pa kreisi, sadaļa + gads pa labi.
   * Tukšs lauks = nerāda. Gadu (4 cipari) automātiski sadala 20 / 26. */
  "brends": "Dieva Mājas",
  "apaksvirsraksts": "Sadraudzības nedēļa",
  "gads": "2026",

  /* Grupu žetoni lapas augšā */
  // "grupas": ["Pieaugušie", "Jaunieši (no 12 g.)", "Svētdienas skola (3–11 g.)"],
  
  "grupas": [],
  "piezime": "Jo tas jums nav tukšs vārds, bet ir jūsu dzīvība un ar šo vārdu jūs ilgi dzīvosit tanī zemē, uz kuru jūs ejat pāri Jordānai, lai to iemantotu. 5.Mozus 32:47",

  /* ===== Dienas plāns no Google izklājlapas =====
   * 1) Izveido Google izklājlapu ar kolonnām:
   *    Diena,Laiks,Nosaukums,Apraksts,Grupa,YouTube,Veids
   *    (paraugs failā dienas-plans-template.csv — importē to izklājlapā).
   *    Kolonnas atpazīst pēc nosaukumiem galvenē, tāpēc to secība nav svarīga.
   *    Grupa: tukša = parasts notikums visiem; "Paralēli" = trīs standarta
   *    grupu birkas; aktivitātēm (un rindām bez Veida) jebkura cita vērtība
   *    (Bērniem, Vīriem, Pieaugušajiem ...) = kategorija, kas apvienojas ar
   *    citām tā paša laika kategorijām vienā "Dienas aktivitātes" kartītē.
   *    Pārējiem veidiem (Dievkalpojums, Lūgšanas, Ēdienreize) Grupa kolonnā
   *    vari rakstīt savas birkas, atdalot ar semikolu, piem.:
   *    "Pieaugušie un jaunieši; Svētdienas skola (3–11 g.)" → divas birkas.
   *    YouTube: tiešraides vai ieraksta saite — pie notikuma parādīsies
   *    poga "Skatīties YouTube".
   *    Veids (neobligāts): Dievkalpojums / Ēdienreize / Lūgšanas / Seminārs /
   *    Aktivitāte — katram veidam sava krāsu svītra kartītes kreisajā malā.
   *    Aktivitāšu veidiem teksts kļūst par grupas kartītes virsrakstu:
   *    rindas ar vienādu dienu, laiku un veidu (piem., "Nakts aktivitātes")
   *    sagrupējas vienā kartītē — kastītes nosaukums ir Grupa (ja norādīta)
   *    vai notikuma nosaukums. Viena aktivitāte bez grupas paliek parasta kartīte.
   *    Aktīvs (neobligāta kolonna): ja tāda ir, lapā rāda tikai rindas ar
   *    TRUE (ērti ar izvēles rūtiņām — ieķeksētās rindas redzamas, pārējās nē).
   *    Vieta (neobligāta kolonna): norises vieta — rādās ar kartes marķiera
   *    ikonu zem notikuma nosaukuma.
   * 2) Izklājlapā: Fails → Kopīgot → Publicēt tīmeklī → formāts CSV.
   * 3) Nokopēto adresi ielīmē šeit starp pēdiņām.
   *
   * Ja adrese tukša vai neielādējas, lapa mēģina ielasīt lokālo failu
   * dienas-plans.csv (jāatrodas blakus index.html; strādā tikai tad, ja lapa
   * atvērta caur serveri, ne ar dubultklikšķi uz faila). Ja arī tā nav,
   * rāda iebūvēto plānu. dienas-plans-template.csv ir tikai paraugs
   * izklājlapai — lapa to nelasa.
   */
  "sheetCsvUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXw3iUnnLOqkK_phnID0EyDymIXJMbW7a9_dSiTvLAYwT1rEJXiSJfcRxrpFzw0dEu4PD2K-lVIb2i/pub?gid=1492567129&single=true&output=csv",

  /* Dienu datumi un piezīmes (datums formātā DD.MM) */
  "dienas": {
    "Pirmdiena":   { "datums": "22.06", "piezime": "Ierašanās diena" },
    "Otrdiena":    { "datums": "23.06" },
    "Trešdiena":   { "datums": "24.06" },
    "Ceturtdiena": { "datums": "25.06" },
    "Piektdiena":  { "datums": "26.06" },
    "Sestdiena":   { "datums": "27.06", "piezime": "Noslēguma diena" }
  },

  /* ===== Programmu apraksti (informatīvā sadaļa zem dienas plāna) =====
   * Vari brīvi mainīt tekstus, pievienot vai dzēst grupas. */
  "programmuVirsraksts": "Programmas bērniem un jauniešiem",
  "programmas": [
    {
      "virsraksts": "Svētdienas skola (3–11 g.)",
      "apraksts": "Kamēr pieaugušie ir dievkalpojumā, bērni savā programmā mācās Bībeles stāstus, dzied, spēlējas un darbojas radošajās darbnīcās. Bērnus sagaida pieredzējuši svētdienas skolas skolotāji. Bērni pulcējas pirms katra rīta un vakara dievkalpojuma."
    },
    {
      "virsraksts": "Jaunieši (no 12 g.)",
      "apraksts": "Jauniešiem ir sava programma ar slavēšanu, sarunām par dzīvi un ticību, sportu un  aktivitātēm. Dievkalpojumu laikā jaunieši pulcējas lielajā zālē."
    }
  ],

  /* ===== Bildes ===== */
  "heroBilde": "header_1.jpg",
  "galerijasVirsraksts": "Mirkļi no nometnes",
  "galerija": [
    "TH1.jpg",
    "TH2.jpg",
    "TH3.jpg"
  ],
  "fotoSaitesTeksts": "Visas nometnes bildes",
  "fotoAlbumaSaite": "#",

  /* ===== Kontakti =====
   * Var pievienot/dzēst neierobežotu skaitu. "izcelts": true padara kontaktu
   * par izceltu pilna platuma joslu (akcenta krāsā) — der galvenajam numuram. */
  "kontaktuVirsraksts": "Kontakti",
  "kontakti": [
    { "loma": "Nometnes jautājumi",      "vards": "", "telefons": "+371 20 000 000", "izcelts": true },
    { "loma": "Nometnes vadītājs",      "vards": "Kristaps Āboltiņš", "telefons": "+371 29 966 307" },
    { "loma": "Svētdienas skola",       "vards": "Ilmārs Lazdiņš", "telefons": "+371 26 667 647" },
    { "loma": "Jaunieši",               "vards": "Alesha Nutter", "telefons": "+371 27 542 001" },
    { "loma": "Saimnieciskie jautājumi", "vards": "Andrējs Gūtmanis", "telefons": "+371 26 161 351" },
    { "loma": "Medmāsa",                "vards": "Iveta Ivaško", "telefons": "+371 25 139 820" }
  ],

  /* ===== Kājene (nosaukums tiek pielikts automātiski priekšā) ===== */
  "kajene": "22.–27. jūnijs, Norkalni | Dieva Mājas 2026"
};
