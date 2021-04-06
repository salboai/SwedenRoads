const welcomecontent = `Välkommen till Transportföretagens Våra vägar! Här kan du se hur våra statliga
vägar mår idag och hur de beräknas må år 2030 beroende på hur mycket
budgetmedel som satsas. Sidan innehåller en stor mängd data som kan ta en minut att ladda.

Sverige behöver satsa mer på underhåll av vägarna. För bättre trafiksäkerhet, ökad
konkurrenskraft och för att hela Sverige ska leva.`;

const informationcontent = `Sverige har en underhållsskuld på våra statliga vägar. Den beräknas till omkring 19
miljarder kronor år 2020 och beräknas växa till 42 miljarder kronor 2030 om inte ytterligare medel tillförs
vägunderhållet, enligt rapporten [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).

På den här sidan kan du se tillståndet på de statliga vägarna visualiserat i rött, gult
och grönt. Mörkrött är vägar i mycket dåligt skick, rött är vägar i dåligt skick, gult är
vägar med tillfredsställande skick, grönt i bra skick och mörkgrönt i mycket bra
skick. Kategoriseringen av vägarna vilar på tillståndsindexet som presenterades i
rapporten [Långsiktiga effekter av ett underfinansierat vägunderhåll](https://www.transportforetagen.se/nyhetslista/ny-rapport-mer-an-var-tionde-vag-ar-i-mycket-daligt-skick/).

Sök på en kommun uppe i högra hörnet så ser du hur vägarna mår där du bor.
Markera den väg du är intresserad av så ser du i vänsterspalten fakta om vägen.
Zooma ut så ser du hela Sveriges statliga vägnät.
Alla uppgifter på sidan bygger på öppen data från Trafikverket fram till år 2019.

Sverige behöver satsa mer på underhåll av vägnätet. Transportföretagen är
bransch- och arbetsgivarorganisation för transportsektorn inom Svenskt Näringsliv.

Feedback skickas till: [varavagar@transportforetagen.se](mailto:varavagar@transportforetagen.se)`;

const FAQcontent = [
  { Q: `Jag tycker inte att skicket på en väg jag kör på ofta stämmer överens med färgen på kartan. Varför är det så?`, A: `Datamaterialet från Trafikverket som färgerna baseras på är ifrån 2019. Vägar som öppnades eller fick ny beläggning år 2020 kan alltså ha fel färg därför att det finns en eftersläpning i registreringen. Vissa individuella vägsträckor kan upplevas som bättre eller sämre i verkligheten än vad färgen på kartan visar även där registreringen är rätt. Färgerna baseras på mätningar av vägytan och på vägens ålder, men det finns även andra faktorer som påverkar vägens skick. Sprickor och potthål lagas regelbundet och förbättrar skicket, men registreras inte alltid. Vissa tider på året, t ex under tjällossning, kan vägen upplevas som sämre än vad den gör på sommaren när vägytan mäts.` },

  { Q: `Varför ser det ut som att skicket på vägarna i min kommun är sämre år 2030 med 2 miljarder extra i budget per år, än vad de är 2030 med nuvarande budgetanslag?`, A: `Budgeten fördelas lite olika. Precis som att det lönar sig att byta olja i en bil i förebyggande syfte, så lönar sig förebyggande underhåll av vägarna i det långa loppet. Det är således fördelaktigt att underhålla bra vägar först, innan dyrare åtgärder sätts in på sämre vägar. Ytterligare 2 miljarder kommer ha en positiv effekt på vägnätet som helhet, men räcker kanske inte för att nå alla vägar i din kommun. Med den nuvarande budgeten prioriteras högtrafikerade vägar, som är dyrare att underhålla, och underhållsskulden på det lågtrafikerade vägnätet ökar. De två extra miljarderna går även till det lågtrafikerade vägnätet, så att dessa inte ska försämras ytterligare. För att förbättra både högtrafikerade vägar och lågtrafikerade vägar visar våra beräkningar att ytterligare 4 miljarder extra behöver skjutas till underhållsbudgeten varje år.` },

  { Q: `Vad menas med vägens tillstånd?`, A: `Vägens tillstånd är en sammanvägning av tre olika indikatorer. En faktor är det som på fackspråk kallas IRI och beskriver väges åkkomfort. Enkelt uttryckt är IRI ett mått som visar om det går att köra på vägen och dricka kaffe utan att spilla det. Den andra indikatorn mäter om vägen är spårig av t ex dubbdäcksslitage. Den tredje indikatorn är vägens förväntade livslängd. Den förväntade livslängden beräknas av en statistisk modell som tar hänsyn till vägens konstruktion, trafikmängd, beläggning, och ett flertal andra faktorer. Vägens tillstånd avgör vilken typ av underhållsåtgärd som behövs för att så kostnadseffektivt som möjligt uppnå en väg som är säker och komfortabel att köra på.` },

  { Q: `Är IRI och spårdjup samt livslängd de enda indikatorerna på en dålig väg?`, A: `Nej, det finns fler indikatorer än IRI, spårdjup och livslängd, men analysens omfattning och syfte krävde att vissa begränsningar gjordes. Dessa tre indikatorer är etablerade genom erfarenhet och forskning, och fångar olika aspekter av vägens tillstånd.` },

  { Q: `Hur kan det se ut på en dålig väg i Sverige?`, A: `En väg kan ha funktionella brister, t ex att en kurva är felaktigt doserad eller att vägrenen är för smal. Denna analys handlar om vägbeläggningen och omfattar spårdjupet och ojämnheter liksom att vägen kan vara gammal och ha passerat sin förväntade livslängd. En dålig väg kan vara gropig, spårig, ha sprickor eller stensläpp, problem med vattenavrinning, etc. Det finns även äldre vägar som inte har några stora problem trots att de är gamla. Vissa vägar åldras bättre än andra.` },

  { Q: `Hur definierar ni underhållsskulden?`, A: `Underhållsskulden utgörs av de vägar vars IRI eller spårdjup överstiger Trafikverkets underhållsstandard, eller vars ålder passerat den förväntade livslängden. Underhållsskulden är kostnaden för att åtgärda dessa vägar.` },
];

export { welcomecontent, informationcontent, FAQcontent };
