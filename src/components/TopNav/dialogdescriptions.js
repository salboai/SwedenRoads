const welcomecontent = `Välkommen till Transportföretagens Våra vägar! Här kan du se hur våra statliga
vägar mår idag och hur de beräknas må år 2030 beroende på hur mycket
budgetmedel som satsas.

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
Alla uppgifter på sidan bygger på öppen data från Trafikverket.

Sverige behöver satsa mer på underhåll av vägnätet. Transportföretagen är
bransch- och arbetsgivarorganisation för transportsektorn inom Svenskt Näringsliv.

Feedback skickas till: [anders.josephsson@transportforetagen.se](mailto:anders.josephsson@transportforetagen.se)`;

const FAQcontent = [
  { Q: `Varför ser det ut som att skicket på vägarna i min kommun är sämre år 2030 med 2 miljarder extra i budget per år, än vad de är 2030 med nuvarande budgetanslag?`, A: `Budgeten fördelas lite olika. Med nuvarande budget prioriteras högtrafikerade vägar, som är dyrare att underhålla, och underhållsskulden på det lågtrafikerade vägnätet ökar. De två extra miljarderna går delvis även till det lågtrafikerade vägnätet, så att dessa inte ska försämras ytterligare. För att förbättra både högtrafikerade vägar och lågtrafikerade vägar behövs 4 miljarder extra skjutas till varje år.` },

  { Q: `Vad menas med vägens tillstånd?`, A: `Vägens tillstånd är en sammanvägning av tre olika indikatorer. Den ena är det som på fackspråk kallas IRI som handlar om vägens ojämnheter i längsled, eller enkelt beskrivet vägens åkkomfort. Den andra är spårdjupet som beskriver vägens ojämnheter i tvärled, och den tredje indikatorn är livslängd, som är den förväntade tiden mellan två underhållsåtgärder. En nybelagd väg med lågt IRI och spårdjup har ett mycket bra tillstånd, medan en väg som är gammal och/eller har ett mycket högt IRI eller spårdjup har ett dåligt tillstånd.` },

  { Q: `Är IRI och spårdjup samt livslängd de enda indikatorerna på en dålig väg?`, A: `Nej, det är de inte, det finns andra, såsom kantdjup. Vi skulle ha kunnat basera indexet på fler indikatorer men studiens omfattning och syfte krävde att vissa begränsningar gjordes. Dessa tre indikatorer är etablerade genom erfarenhet och forskning, och fångar olika aspekter av vägens tillstånd.` },

  { Q: `Hur kan det se ut på en dålig väg i Sverige?`, A: `En väg kan ha funktionella brister, t ex att en kurva är felaktigt doserad eller att vägrenen är för smal. Denna analys handlar om vägbeläggningen och omfattar spårdjup och ojämnheter liksom att vägen kan vara gammal och ha passerat sin förväntade livslängd. En dålig väg kan vara gropig, spårig, ha sprickor eller stensläpp, problem med vattenavrinning, etc. Det finns äldre vägar som inte har några stora problem trots att de är gamla, då den förväntade livslängden baseras på historiska åtgärdsintervall. Vissa vägar åldras bättre än andra.` },

  { Q: `Hur definierar ni underhållsskulden?`, A: `Underhållsskulden utgörs av de vägar vars IRI eller spårdjup överstiger Trafikverkets underhållsstandard, eller vars ålder passerat den förväntade livslängden. Underhållsskulden är kostnaden för att åtgärda dessa vägar.` },
];

export { welcomecontent, informationcontent, FAQcontent };
