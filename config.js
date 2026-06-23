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
      "virsraksts": "Jaunieši (12–18 g.)",
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
  "fotoAlbumaSaite": "https://pie.lv/foto",

  /* ===== Kontakti =====
   * Var pievienot/dzēst neierobežotu skaitu. "izcelts": true padara kontaktu
   * par izceltu pilna platuma joslu (akcenta krāsā) — der galvenajam numuram.
   * Pie katra numura ir zvana ikona (tel:) un WhatsApp ikona (wa.me).
   * WhatsApp ikonu konkrētam kontaktam var izslēgt ar "whatsapp": false.
   * "whatsappGrupa" — kopīgais WhatsApp grupas links (poga zem kontaktiem). */
  "whatsappGrupa": "https://chat.whatsapp.com/GQTdtQEN99NF0mNnbsRv3y?s=cl&p=i&mlu=1",
  "whatsappGrupaTeksts": "Pievienojies nometnes WhatsApp grupai",
  "kontaktuVirsraksts": "Kontakti",
  "kontakti": [
    { "loma": "Nometnes jautājumi",      "vards": "", "telefons": "+371 28 796 539", "izcelts": true },
    { "loma": "Nometnes vadītājs",      "vards": "Kristaps Āboltiņš", "telefons": "+371 29 966 307" },
    { "loma": "Svētdienas skola",       "vards": "Ilmārs Lazdiņš", "telefons": "+371 26 667 647" },
    { "loma": "Jaunieši",               "vards": "Alesha Nutter", "telefons": "+371 27 542 001" },
    { "loma": "Saimnieciskie jautājumi", "vards": "Andrējs Gūtmanis", "telefons": "+371 26 161 351" },
    { "loma": "Medmāsa",                "vards": "Iveta Ivaško", "telefons": "+371 25 139 820" }
  ],

  /* ===== Karte =====
   * Iebūvēta OpenStreetMap karte ar lokāciju marķieriem.
   *
   * Lokācijas ielādē no Google izklājlapas CSV ("lokacijuCsvUrl"), ja norādīts.
   * Izklājlapas kolonnas: Nosaukums, Lat, Lng, Active (rāda tikai Active=TRUE).
   * Publicēšana: Fails → Kopīgot → Publicēt tīmeklī → izvēlas lapu, formāts CSV.
   * Ja CSV nav vai neielādējas, lieto zemāk esošo "lokacijas" sarakstu (rezerve).
   *
   * "lokacijas" rezerves formāts: "koord": [lat, lng].
   * Koordinātes: Google Maps → labais klikšķis → uzklikšķini uz cipariem. */
  "karteVirsraksts": "Nometnes karte",
  "karteTuvinajums": 17,
  "lokacijuCsvUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXw3iUnnLOqkK_phnID0EyDymIXJMbW7a9_dSiTvLAYwT1rEJXiSJfcRxrpFzw0dEu4PD2K-lVIb2i/pub?gid=124817012&single=true&output=csv",
  "lokacijas": [
    { "nosaukums": "Lielā telts",          "koord": [56.955619803932635, 24.589514465373902] },
    { "nosaukums": "Ēdnīca",               "koord": [56.95593582869828, 24.58627823657708] },
    { "nosaukums": "Ēdamtelts",            "koord": [56.95582188276289, 24.586702195086453] },
    { "nosaukums": "Jauniešu zāle",        "koord": [56.95604952651114, 24.586614540715505] },
    { "nosaukums": "Ciānas nams, 1. stāvs ","koord": [56.95574961314416, 24.588189905977927] },
    { "nosaukums": "Mājiņas",              "koord": [56.95551876368299, 24.586149086409307] },
    { "nosaukums": "Futbola laukums",      "koord": [56.957438891308335, 24.587798430324003] },
    { "nosaukums": "Reģistratūra",         "koord": [56.95597304231187, 24.58653568257369] },
    { "nosaukums": "Baltā māja",           "koord": [56.95593798867099, 24.58676419868489] },
    { "nosaukums": "Volejbola laukums",    "koord": [56.95619017321824, 24.58727956957034] },
    { "nosaukums": "Pirts",                "koord": [56.95564964636889, 24.588171253372536] }
  ],

  /* ===== Kājene (nosaukums tiek pielikts automātiski priekšā) ===== */
  "kajene": "22.–27. jūnijs, Norkalni | Dieva Mājas 2026"
};
