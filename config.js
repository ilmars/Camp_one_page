/*
 * NOMETNES LAPAS KONFIGURĀCIJA
 * Šeit ir VISA aizpildāmā informācija un teksti — index.html nav jāmaina.
 * Pēc labojumiem vienkārši saglabā failu un pārlādē lapu.
 */
const CONFIG = {

  /* ===== Pamatinformācija ===== */
  "nosaukums": "Draudzes nometne",
  "datumi": "21.–26. jūnijs",
  "vieta": "Norkalni",

  /* Nometnes logo virsraksta zonā (attēla adrese, piem., "logo.png" vai pilns URL).
   * Tukšs "" = logo nerāda, ir tikai teksta virsraksts.
   * Ja gribi TIKAI logo bez teksta, ieliec "heroVirsraksts": "" —
   * nosaukums tāpat paliks lapas cilnē un kājenē.
   * Ar "heroVirsraksts" vari hero zonā rādīt arī citu tekstu nekā "nosaukums". */
  "logo": "",
  "heroVirsraksts": "Draudzes nometne",

  /* Grupu žetoni lapas augšā */
  "grupas": ["Pieaugušie", "Jaunieši (no 12 g.)", "Svētdienas skola (3–11 g.)"],
  "piezime": "Dievkalpojumi visām trim grupām notiek paralēli — katrai grupai sava programma.",

  /* ===== Dienas plāns no Google izklājlapas =====
   * 1) Izveido Google izklājlapu ar kolonnām: Diena,Laiks,Nosaukums,Apraksts,Grupa,YouTube
   *    (paraugs failā dienas-plans-template.csv — importē to izklājlapā).
   *    YouTube kolonnā vari ielikt tiešraides vai ieraksta saiti —
   *    pie notikuma parādīsies poga "Skatīties YouTube".
   * 2) Izklājlapā: Fails → Kopīgot → Publicēt tīmeklī → formāts CSV.
   * 3) Nokopēto adresi ielīmē šeit starp pēdiņām.
   * Ja adrese tukša vai neielādējas, lapa rāda iebūvēto plānu.
   */
  "sheetCsvUrl": "",

  /* Dienu datumi un piezīmes (datums formātā DD.MM) */
  "dienas": {
    "Pirmdiena":   { "datums": "21.06", "piezime": "Ierašanās diena" },
    "Otrdiena":    { "datums": "22.06" },
    "Trešdiena":   { "datums": "23.06" },
    "Ceturtdiena": { "datums": "24.06" },
    "Piektdiena":  { "datums": "25.06" },
    "Sestdiena":   { "datums": "26.06", "piezime": "Noslēguma diena" }
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
      "apraksts": "Jauniešiem ir sava programma ar slavēšanu, sarunām par dzīvi un ticību, sportu un vakara aktivitātēm. Dievkalpojumu laikā jaunieši pulcējas atsevišķi, bet ēdienreizēs un brīvajā laikā visi ir kopā ar ģimenēm."
    }
  ],

  /* ===== Bildes ===== */
  "heroBilde": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1600&q=80",
  "galerijasVirsraksts": "Mirkļi no nometnes",
  "galerija": [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
  ],
  "fotoSaitesTeksts": "Visas nometnes bildes",
  "fotoAlbumaSaite": "#",

  /* ===== Kontakti ===== */
  "kontaktuVirsraksts": "Kontakti",
  "kontakti": [
    { "loma": "Nometnes vadītājs",      "vards": "Vārds Uzvārds", "telefons": "+371 20 000 000" },
    { "loma": "Svētdienas skola",       "vards": "Vārds Uzvārds", "telefons": "+371 20 000 000" },
    { "loma": "Jaunieši",               "vards": "Vārds Uzvārds", "telefons": "+371 20 000 000" },
    { "loma": "Saimniecības jautājumi", "vards": "Vārds Uzvārds", "telefons": "+371 20 000 000" }
  ],

  /* ===== Kājene (nosaukums tiek pielikts automātiski priekšā) ===== */
  "kajene": "21.–26. jūnijs, Norkalni | Dieva Mājas 2026"
};
