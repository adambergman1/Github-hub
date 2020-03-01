# Uppgift

Designrapporten ska beskriva den systemstruktur som valts för webbapplikationen. En bildpresentation (med hjälp av ett UML-komponentdiagram?) av arkitekturen bör presenteras (som visar de viktigaste subsystemen, dataskikten och deras sammankopplingar).

Ta fram en modulär systemarkitektur och förklara förhållande mellan modulerna för att uppnå systemets fullständiga funktionalitet. Detta är en översikt på hög nivå av hur systemets ansvar delas upp och sedan tilldelas till subsystemen.

Identifiera varje high-level subsystem och de roller eller ansvar som det tilldelats. Beskriv hur dessa subsystem samarbetar med varandra för att uppnå önskad funktionalitet. Gå inte för mycket i detalj om de enskilda subsystemen. Huvudsyftet är att få en allmän förståelse för hur och varför systemet bryts ner och hur de enskilda delarna arbetar tillsammans.

---

## Övergripande arkitektur

Den struktur som valts för applikationen är Serverless. Dels på grund av ett intresse som funnits för att få lärdom om att använda molntjänster för serverhantering som Amazon Web Services, Firebase, Azure etc och dels för att det, baserat på research, verkar vara ett bra alternativ för en applikation av den här storleken.

De tjänster som är inblandade i arkitekturen är:

* Amazon Web Services
    S3 Buckets (hosting för klient och server)
    Route53 (domänhantering)
    CloudFront (CDN)
    Lambda (Functions as a Service; funktioner som triggas igång av events)
    DynamoDB (databas för lagring av användare och dess inställningar)

* Serverless Framework
    Verktyg för att utveckla och distribuera till AWS, både för klient- och serverkod

* Github
    Autentisering
    Hämtning av data

BILD: ÖVERGRIPANDE ARKITEKTUR

---

## Server

### Autentisering

I klientapplikationen trycker användaren på en länk för att logga in med sitt Github-konto. Länken tar användaren till Githubs inloggningssida (oAuth) och när användaren fyllt i sina uppgifter och loggat in anropar Github den angivna callback-URL:en som går till en lambdafunktion på AWS. I anropet till lambdafunktionen skickas en `code` parameter med som tillsammans med `Client Secret` och `Client ID` till oAuth-applikationen hos Github gör ett nytt anrop för att få tillbaka en `Access Token`. Därefter svarar lambdafunktionen med att returnera en redirect tillbaka till klienten med `access_token` som parameter. Klienten lyssnar efter parametern och så fort den mottagits är användaren inloggad.

### Inställningar

Anropas av klienten för att spara de inställningar som ställs in på ett repo eller en organisation i databasen. Vid inloggning på klientapplikationen så läses inställningarna in om det redan finns sådana lagrade till den inloggade användaren.

### Notifikationer (webhooks)

Användaren på klientapplikationen väljer att antingen aktivera notifikationer på en organisation eller ett repositorie. När det görs så anropar klienten Github med en URL till organisationen eller repositoriet samt en callback-URL till en lambdafunktion. Callback-URL:en är den som anropas så fort en ny notis (webhook) ska skickas ut. När lambdafunktionen anropas verifierar den om klienten är inloggad och i så fall skicka en WebSocket med meddelandet. Om klienten är utloggad så kontrollerar lambdafunktionen om klienten angett en URL i databasen för att få offline-notiser och i så fall anropa den med meddelandet.

## Klient

Till klientapplikationen används JavaScript tillsammans med ramverket React. Valet av ramverk beror på att det hör till de populäraste ramverken till JavaScript samtidigt som erfarenhet av React finns sedan tidigare. React är smidigt för att kunna rendera om information på samma sida utan att behöva ladda om. Nackdelen är att det kan bli svårhanterligt med State-hantering, vilket har avlösts genom att använda Reacts egenutvecklade lösning Context. Context har lägre inlärningskurva än Redux, vilket var anledningen till varför valet föll på Context. Till React används CSS-ramverket Material UI för effektivisering av design.

Klienten ansvarar för att hämta organisationer och repositorier samt anropa Github med webhooks på de organisationer eller repositorier som användaren vill få notiser på.
