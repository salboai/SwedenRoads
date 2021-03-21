const descriptions = {
  TllstnI: `Tillståndsindex beskriver en sammanvägning av vägytemätningar (IRI och spårdjup) och vägens ålder i förhållande till förväntad livslängd. En helt nybelagd väg har tillståndsindex 100 %, medan en väg som passerat sin förväntade livslängd eller vars vägytemått (IRI och/eller spårdjup) har överskridit gränsvärdena i Trafikverkets underhållstandard har ett tillståndsindex på 20 % eller lägre. Det sämsta värde en väg kan ha är 0.
  
  Läs mer om tillståndsklassificeringen i Transportföretagens rapport [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).`,
  IndxKls: `Tillståndsklass 2020 beskriver vägens tillstånd enligt dess tillståndsindex år 2020. Index 80-100 är ett Mycket bra tillstånd. Index 60-80 är ett Bra tillstånd. Index 40-60 är ett Tillfredsställande tillstånd. Index 20-40 är ett Dåligt tillstånd. Index 0-20 är ett Mycket dåligt tillstånd.
  
  Läs mer om tillståndsklassificeringen i Transportföretagens rapport [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).`,
  IndK2030: `Tillståndet 2030 nuvarande budget är det tillstånd en väg beräknas få år 2030 med nuvarande budgetanslag för underhåll av vägbeläggning. Det nuvarande budgetanslag antas vara cirka 3,4 miljarder kronor per år. Klassificeringen utgår från ett scenario där underhåll prioriteras enligt vägens Drift- och underhållsklass samt trafikmängd. Scenariot är ett möjligt utfall, men ska inte ses som en prediktion då många olika faktorer påverkar underhållsbesluten.
  
  Läs mer om tillståndsklassificeringen i Transportföretagens rapport [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).`,
  IKls_2: `Tillståndet 2030 + 2 miljarder är det tillstånd en väg beräknas få med den budget som så kostnadseffektivt som möjligt upprätthåller vägnätets nuvarande tillstånd och behåller underhållsskulden på samma nivå år 2030 som år 2020. Denna budget beräknas till cirka 5,4 miljarder kronor per år vilket motsvarar en ökning med 2 miljarder per år jämfört med nuvarande budget. Individuella vägars tillstånd kan variera, men vägnätets genomsnittliga tillstånd liksom underhållsskulden är detsamma som år 2020.
  
  Läs mer om tillståndsklassificeringen i Transportföretagens rapport [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).`,
  IKls_3: `Tillståndet 2030 + 4 miljarder det tillstånd en väg beräknas få med den budget som krävs för att minimera underhållsskulden fram till år 2030. Denna budget beräknas till cirka 7,4 miljarder kronor per år vilket motsvarar en ökning med 4 miljarder per år jämfört med nuvarande budget. Scenariot innebär att budgeten kostnadseffektiviserats, vilket gör att individuella vägars tillstånd kan variera gentemot övriga scenarion.
  
  Läs mer om tillståndsklassificeringen i Transportföretagens rapport [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).`,
  Spårdjp: `Spårdjupet beskriver vägens ojämnhet i tvärled och mäts i millimeter. En mycket spårig väg kan bl.a. orsaka vattenplaning. Trafikverket offentliggör spårdjupsmedelvärden per 20 meter väg, och spårdjupsvärdet som presenteras för varje sträcka är den 75:e percentilen av 20-meters medelvärden som överlappar sträckan.
  
  Läs mer om spårdjup i Svenska Byggbranschens Utvecklingsfonds publikation [Jämnt Hela Vägen - handbok i vägytemått](https://vpp.sbuf.se/Public/Documents/ProjectDocuments/60911052-4fae-490d-88d9-84c33cbc74a5/FinalReport/SBUF%2012763%20Slutrapport%20Handbok%20i%20v%C3%A4gytem%C3%A5tt.pdf).`,
  Sprdjp_: `Spårdjup underhållsstandard beskriver det spårdjupsvärde då underhåll bör sättas in enligt Trafikverkets underhållsstandard. Standarden för olika vägsträckor beror på trafikmängd samt skyltad hastighet.
  
  Läs mer om underhållsstandarden hos [Trafikverket](https://www.trafikverket.se/resa-och-trafik/underhall-av-vag-och-jarnvag/Sa-skoter-vi-vagar/Underhall-av-belagda-vagar-/Underhallsstandard-for-belagda-vagnatet/).`,
  IRI: `IRI, International Roughness Index, mäts i enheten millimeter per meter och mäter vägens längsgående ojämnheter. Måttet utvecklades av Världsbanken i mitten på åttiotalet och beskriver vägens åkkomfort. Ju högre IRI-värde, desto skumpigare upplevs vägen för trafikanten. Trafikverket offentliggör IRI-medelvärden per 20 meter väg, och IRI-värdet som presenteras för varje sträcka är den 75:e percentilen av 20-meters medelvärden som överlappar sträckan.
  
  Läs mer om IRI i Svenska Byggbranschens Utvecklingsfonds publikation [Jämnt Hela Vägen - handbok i vägytemått](https://vpp.sbuf.se/Public/Documents/ProjectDocuments/60911052-4fae-490d-88d9-84c33cbc74a5/FinalReport/SBUF%2012763%20Slutrapport%20Handbok%20i%20v%C3%A4gytem%C3%A5tt.pdf).`,
  IRI_ndr: `IRI underhållsstandard beskriver det IRI-värde då underhåll bör sättas in enligt Trafikverkets underhållsstandard. Standarden för varje vägsträcka beror på trafikmängd samt skyltad hastighet.
  
  Läs mer om underhållsstandarden hos [Trafikverket](https://www.trafikverket.se/resa-och-trafik/underhall-av-vag-och-jarnvag/Sa-skoter-vi-vagar/Underhall-av-belagda-vagar-/Underhallsstandard-for-belagda-vagnatet/).`,
  Mätdatm: "Mätdatum är det datum då vägytan (IRI och spårdjup) senast mättes.",

  Blggnngst: `Vägens senast registrerade beläggning till och med år 2019. Beläggningen är vägens översta lager, kallat slitlager. Beroende på vägtyp kan vägen ha flera underliggande lager som tillsammans utgör vägens konstruktion. Den vanligaste beläggningstypen är ytbehandling på bituminöst underlag, följt av varm beläggning. Varm stenrik beläggning används främst på högtrafikerade vägar, medan ytbehandling på grus, indränkt makadam och halvvarm beläggning oftast används på lågtrafikerade vägar (trafikmängd under 2 000 fordon per dygn). Försegling är främst en förebyggande, tunnare typ av beläggningsåtgärd, och tunnskikt kan vara både en förebyggande eller en mer omfattande beläggningsåtgärd.

  Mer om beläggningar och vägkonstruktion finns att läsa hos Asfaltsskolans Utbildningsråd [Asfaltsboken](https://asfaltboken.se/).`,
  Blggnngsd: `Datum då den senast registrerade heltäckande beläggingsåtgärden utförts till och med år 2019. En heltäckande beläggningsåtgärd innebär att en vägsträcka på 100 meter eller längre fått en ny beläggning. Utöver heltäckande beläggningsåtgärder förekommer regelbundet andra typer av underhållsåtgärder, t.ex. lagning av sprickor och potthål.`,

  Ålder: `Vägens ålder år 2020 beräknat från senaste beläggningsdatum.`,
  FrvntdL: `Vägens förväntade livslängd beräknas utifrån en statistisk modell. Modellen tar hänsyn till trafikmängd, region, beläggning, vägbredd, skyltad hastighet och vägtyp. Den förväntade livslängden beskriver en ålder då vägen med hög sannolikhet behöver en ny beläggning, men att en vägsträcka är äldre än den förväntade livslängden innebär inte alltid att den är dålig. Vissa vägar håller längre än den förväntade livslängden, och andra behöver underhåll långt innan.
  
  Läs mer om hur den förväntade livslängden beräknats i Transportföretagens rapport [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/)
  Läs mer om den statistiska modellen i avhandlingen [A Microdata Analysis Approach to Transport Infrastructure Maintenance](http://du.diva-portal.org/smash/get/diva2:1056213/FULLTEXT01.pdf)`,

  Län_nr: ``,
  Kmmn_nr: ``,
  Vägnmmr: `Vägnummer för allmänna vägar.`,
  Vägktgr: `Vägkategori beskriver vägens status: Europaväg, Riksväg, Primär länsväg eller Övrig länsväg.`,
  Vägtyp: `Vägtypen beskriver vägens typ: vanlig väg, motorväg, 4-fälts väg, 2+1 väg eller motortrafikled. Vanliga vägar har ingen mötesseparering. Motorvägar är mötesseparerade och har ingen korsande trafik i samma plan. Motorvägar har även påfarter och avfarter samt väggren. 4-fälts vägar är också mötesseparerade men har inte samma krav som motorvägar på t.ex. vägren samt på- och avfarter. 2+1 vägar är mötesseparerade med ett vajerräcke och alternerar mellan ett och två körfält. Motortrafikled är en äldre vägtyp som bl.a. innebär att ingen korsande trafik förekommer i samma plan.`,
  ÅDT_frd: `Antal fordon (både personbilar och lastbilar) på en vägsträcka beräknas som årsdygnsmedeltrafik (ÅDT) som är ett standardiserat sätt att beräkna trafikmängd.
  
  Mer om ÅDT finns att läsa hos [Trafikverket](https://www.trafikverket.se/tjanster/trafiktjanster/Vagtrafik--och-hastighetsdata/).`,
  ÅDT_tng: `Antal tunga fordon definieras som motordrivna fordon med en totalvikt större än 3,5 ton inklusive eventuella släpfordon. Eftersom mätutrustningen inte kan väga fordonen används istället axelavstånd för att identifiera fordonens typ. Antal tunga fordon på en vägsträcka beräknas som årdsdygnsmedeltrafik (ÅDT).
  
  Mer om ÅDT finns att läsa hos [Trafikverket](https://www.trafikverket.se/tjanster/trafiktjanster/Vagtrafik--och-hastighetsdata/).`,
  ÅDT_mtr: `Datum då årsdygnsmedeltrafiken uppmättes.`,
  Brghtsk: `Bärighetsklass beskriver hur tunga fordon en bro eller väg får belastas med. Gränserna för olika vägar är satta för max bruttotonvikter och det finns fyra klasser: max 64 ton (BK1), max 51,5 ton (BK2), max 47,5 ton (BK3) eller max 74 ton (BK4). Beroende på fordonets axelavstånd och axeltryck kan tillåten bruttovikt vara lägre, och BK4 har ibland särskilda villkor för ekipaget för att tillåta 74 ton.
  
  Mer om bärighetsklass finns att läsa hos [Trafikverket](https://www.trafikverket.se/for-dig-i-branschen/vag/bk--barighetsklasser-pa-vagar-och-broar/).`,
  Hastght: `Skyltad hastighet år 2020.`,
  DoU2017: `Drift- och underhållsklass beskriver den klassificering som Trafikverket använder för bl.a. åtgärdsplanering, uppföljning av vägnätets drift- och underhåll, upphandlingsunderlag och beläggningsplanering. Det finns sex olika drift- och underhållsklasser: storstadsvägar, vägar som bildar större sammanhängande stråk, vägar för dagliga resor och arbetspendling, övriga för näringslivet viktiga vägar, vägar viktiga för landsbygden och lågtrafikerade vägar.`,
  Vägbrdd: `Vägens bredd i meter. För belagd väg avses avståndet mellan beläggningens kanter, eller till vägens kantstöd eller mitträcke om sådana finns.`,
  Längd: `Vägsträckans längd i meter.`,
};

export { descriptions };
