/*
const descriptions = {
  ÅtrstnL: "beskrivning ÅtrstnL",
  Hastght: "beskrivning Hastght",
  DoU2017: "beskrivning DoU2017",
  ÅDT_tng: "beskrivning ÅDT_tng",
  ÅDT_mtr: "beskrivning ÅDT_mtr",
  Vägnmmr: "beskrivning Vägnmmr",
  Vägktgr: "Vägktgr beskrivning här",
  Vägtyp: "beskrivning Vägtyp",
  Längd: "beskrivning Längd",
  Blggnngst: "beskrivning Blggnngst",
  Län_nr: "beskrivning Län_nr",
  Kmmn_nr: "beskrivning Kmmn_nr",
  Trfkkls: "beskrivning Trfkkls",
  IRI_ndr: "beskrivning IRI_ndr",
  Sprdjp_: "beskrivning Sprdjp_",
  Region: "beskrivning Region",
  Ålder: "beskrivning Ålder",
  FrvntdL: "beskrivning FrvntdL",
  TllstnI: "beskrivning TllstnI",
  IndxKls: "beskrivning IndxKls",
  ÅDT_frd: "beskrivning ÅDT_frd",
  Spårdjp: "beskrivning Spårdjp",
  IRI: "beskrivning IRI",
  Vägbrdd: "beskrivning Vägbrdd",
  Brghtsk: "beskrivning Brghtsk",
  Blggnngsd: "beskrivning Blggnngsd",
  Mätdatm: "beskrivning Mätdatm",
  IndK2030: "beskrivning IndK2030",
  IKls_2: "beskrivning IKls_2",
  IKls_3: "beskrivning IKls_3",
};
*/

const descriptions = {
  TllstnI:
    "Tillståndsindex beskriver en sammanvägning av vägytemätningar (IRI och spårdjup) och vägens ålder i förhållande till förväntad livslängd. En helt nybelagd väg har tillståndsindex 100, medan en väg som passerat sin förväntade livslängd eller vars vägytemått (IRI och/eller spårdjup) har överskridit gränsvärdena i Trafikverkets underhållstandard har ett tillståndsindex på 20 eller lägre. Det sämsta värde en väg kan ha är 0.",
  IndxKls:
    "Tillståndsklass 2020 beskriver vägens tillstånd enligt dess tillståndsindex år 2020.",
  IndK2030:
    "Den tillståndsklass en väg beräknas få år 2030 med nuvarande budgetanslag för underhåll av vägbeläggning. Nuvarande budgetanslag beräknas vara cirka 3,4 miljader kronor per år.",
  IKls_2:
    "Den tillståndsklass en väg beräknas få med den budget som så kostnadseffektivt som möjligt upprätthåller vägnätets nuvarande genomsnittstillstånd och behåller underhållsskulden på samma nivå år 2030 som år 2020. Denna budget beräknas till cirka 5,4 miljarder kronor per år.",
  IKls_3:
    "Den tillståndsklass en väg beräknas få med den budget som krävs för att minimera underhållsskulden fram till år 2030. Denna budget beräknas till cirka 7,4 miljarder kronor per år.",
  Spårdjp:
    "Spårdjupet beskriver vägens ojämnhet i tvärled och mäts i millimeter. En spårig väg kan bl.a. orsaka vattenplaning.",
  Sprdjp_:
    "Spårdjup underhållsstandard beskriver det spårdjupsvärde då underhåll bör sättas in enligt Trafikverkets underhållsstandard. Standarden för olika vägsträckor beror på trafikmängd samt skyltad hastighet.",
  IRI:
    "IRI, International Roughness Index, mäts i enheten millimeter per meter och mäter vägens längsgående ojämnheter. Måttet utvecklades av Världsbanken i mitten på åttiotalet och beskriver vägens åkkomfort. Trafikverket offentliggör medelvärden per 20 meter uppmätt väg, och IRI-värdet för varje sträcka är den 75:e percentilen av medelvärden för 20-meters sträckor som överlappar sträckan.",
  IRI_ndr:
    "IRI underhållsstandard beskriver det IRI-värde då underhåll bör sättas in enligt Trafikverkets underhållsstandard. Standarden för varje vägsträcka beror på trafikmängd samt skyltad hastighet.",
  Mätdatm: "Mätdatum är det datum då vägytan (IRI och spårdjup) senast mättes.",
  Blggnngst:
    "Vägens senast registrerade beläggning. Beläggningen är vägens översta lagret, det så kallade slitlagret.",
  Blggnngsd: "Datum för senaste beläggning.",
  Ålder: "Vägens ålder år 2020 beräknat från senaste beläggningsdatum.",
  FrvntdL:
    "Vägens förväntade livslängd beräknas utifrån en statistisk modell. Modellen tar hänsyn till trafikmängd, region, beläggning, vägbredd, skyltad hastighet och vägtyp. Den förväntade livslängden beskriver en ålder då vägen med hög sannolikhet behöver en ny beläggning, men att en vägsträcka är äldre än den förväntade livslängden innebär inte alltid att den är dålig. Vissa vägar håller längre än den förväntade livslängden, och andra behöver underhåll långt innan.",
  Län_nr: null,
  Kmmn_nr: null,
  Vägnmmr: "Vägnummer för allmänna vägar.",
  Vägktgr:
    "Vägkategori beskriver vägens status: Europaväg, Riksväg, Primär länsväg eller Övrig länsväg.",
  Vägtyp:
    "Vägtypen beskriver vägens konstruktion: vanlig väg, motorväg, 4-fälts väg eller 2+1 väg. Vanliga vägar har ingen mötesseparering. Motorvägar är mötesseparerade, har ingen korsande trafik i samma plan, påfarter och avfarter samt väggren. 4-fälts vägar är mötesseparerade men har inte samma standard som motorvägar för t.ex. vägren samt på- och avfarter. 2+1 vägar mötesseparerade med ett vajerräcke och alternerar mellan ett eller två körfält.",
  ÅDT_frd:
    "Antal fordon (både personbilar och lastbilar) på en vägsträcka beräknas som årsdygnsmedeltrafik (ÅDT) och är ett standardiserat sätt att beräkna trafikmängd genom slangmätningar.",
  ÅDT_tng:
    "Antal tunga fordon definieras som motordrivna fordon med en totalvikt större än 3,5 ton inklusive eventuella släpfordon. Eftersom mätutrustningen inte kan väga fordonen används istället axelavstånd för att identifiera fordonens typ. Antal tunga fordon på en vägsträcka beräknas som årdsdygnsmedeltrafik (ÅDT).",
  ÅDT_mtr: "Datum då årsdygnsmedeltrafiken uppmättes.",
  Brghtsk:
    "Bärighetsklass beskriver hur tunga fordon en bro eller väg får belastas med. Gränserna för olika vägar är satta för max bruttotonvikter och det finns fyra klasser: max 64 ton (BK1), max 51,5 ton (BK2), max 47,5 ton (BK3) eller max 74 ton (BK4). Beroende på fordonets axelavstånd och axeltryck kan tillåten bruttovikt vara lägre, och BK4 har ibland särskilda villkor för ekipaget för att tillåta 74 ton.",
  Hastght: "Skyltad hastighet år 2020.",
  DoU2017: null,
  Vägbrdd:
    "Vägens bredd i meter. För belagd väg avses avståndet mellan beläggningens kanter, eller till eventuella kantstöd.",
  Längd: "Vägsträckans längd i meter.",
};

const descriptionLinks = {
  TllstnI:
    "https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/",
  IndxKls:
    "https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/",
  IndK2030:
    "https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/",
  IKls_2:
    "https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/",
  IKls_3:
    "https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/",
  Spårdjp: null,
  Sprdjp_:
    "https://www.trafikverket.se/resa-och-trafik/underhall-av-vag-och-jarnvag/Sa-skoter-vi-vagar/Underhall-av-belagda-vagar-/Underhallsstandard-for-belagda-vagnatet/",
  IRI: null,
  IRI_ndr:
    "https://www.trafikverket.se/resa-och-trafik/underhall-av-vag-och-jarnvag/Sa-skoter-vi-vagar/Underhall-av-belagda-vagar-/Underhallsstandard-for-belagda-vagnatet/",
  Mätdatm: null,
  Blggnngst: null,
  Blggnngsd: null,
  Ålder: null,
  FrvntdL: null,
  Län_nr: null,
  Kmmn_nr: null,
  Vägnmmr: null,
  Vägktgr: null,
  Vägtyp: null,
  ÅDT_frd: null,
  ÅDT_tng:
    "https://www.trafikverket.se/tjanster/trafiktjanster/Vagtrafik--och-hastighetsdata/",
  ÅDT_mtr: null,
  Brghtsk: null,
  Hastght: null,
  DoU2017: null,
  Vägbrdd: null,
  Längd: null,
};

export { descriptions, descriptionLinks };
