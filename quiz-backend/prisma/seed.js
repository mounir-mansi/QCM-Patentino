const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Vider les tables
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.achievment.deleteMany();
  await prisma.module.deleteMany();

  // Upsert du module pour éviter les doublons
  const module = await prisma.module.upsert({
    where: { module_title: "PHP" },
    update: {},
    create: { module_title: "PHP" },
  });

  const questionsData = [
    {
      question_title:
        "Cosa fare se il carico sul carrello oscilla leggermente durante il sollevamento?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Accelerare per completare il sollevamento",
          result_answer: false,
        },
        {
          title_answer: "Abbassare lentamente e stabilizzare",
          result_answer: true,
        },
        {
          title_answer: "Sollevare al massimo per evitare collisioni",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Scendendo una pendenza con carico, cosa fare per evitare il ribaltamento?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Frenare bruscamente senza precauzioni",
          result_answer: false,
        },
        {
          title_answer: "Mantenere il carico basso e frenare gradualmente",
          result_answer: true,
        },
        {
          title_answer: "Accelerare per finire più velocemente",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Trasportando un serbatoio di liquido sul carrello, quale precauzione è fondamentale?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Procedere a velocità normale", result_answer: false },
        {
          title_answer: "Procedere lentamente e evitare curve brusche",
          result_answer: true,
        },
        {
          title_answer:
            "Sollevare il più possibile per avere maggiore visibilità",
          result_answer: false,
        },
      ],
    },
    {
      question_title: "Se il carico blocca la visuale frontale, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Procedere normalmente", result_answer: false },
        {
          title_answer:
            "Usare la retromarcia e, se necessario, un accompagnatore",
          result_answer: true,
        },
        {
          title_answer: "Sollevare ulteriormente il carico per vedere",
          result_answer: false,
        },
      ],
    },
    {
      question_title: "Come gestire un carico che sporge dal pallet?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Trasportarlo comunque", result_answer: false },
        {
          title_answer: "Riposizionare o fissare il carico prima del trasporto",
          result_answer: true,
        },
        {
          title_answer: "Sollevare il carico al massimo",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Prima di avviare un carrello elettrico, quale controllo è obbligatorio?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Livello dell’olio motore", result_answer: false },
        {
          title_answer: "Stato della batteria e dei cavi",
          result_answer: true,
        },
        { title_answer: "Colore del carrello", result_answer: false },
      ],
    },
    {
      question_title: "Perché non usare un carrello diesel in ambienti chiusi?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Troppo lento", result_answer: false },
        { title_answer: "Gas di scarico tossici", result_answer: true },
        { title_answer: "Consumo elevato", result_answer: false },
      ],
    },
    {
      question_title: "Salendo una pendenza con carico in curva, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Accelerare", result_answer: false },
        {
          title_answer: "Ridurre la velocità e mantenere il carico basso",
          result_answer: true,
        },
        { title_answer: "Sollevare al massimo", result_answer: false },
      ],
    },
    {
      question_title:
        "Cosa fare se la barra di sicurezza del carrello è rotta?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Ignorare e continuare", result_answer: false },
        { title_answer: "Fermarsi e segnalare", result_answer: true },
        { title_answer: "Ripararla velocemente da soli", result_answer: false },
      ],
    },
    {
      question_title: "Attraversando una zona pedonale, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Suonare il clacson e passare velocemente",
          result_answer: false,
        },
        {
          title_answer: "Procedere lentamente con segnalazione",
          result_answer: true,
        },
        { title_answer: "Ignorare i pedoni", result_answer: false },
      ],
    },
    // 11
    {
      question_title: "Cosa fare se il carrello ha odore di gas GPL?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Continuare a lavorare", result_answer: false },
        { title_answer: "Fermarsi e segnalare il guasto", result_answer: true },
        { title_answer: "Accendere fiamme per testare", result_answer: false },
      ],
    },
    // 12
    {
      question_title: "Qual è la posizione sicura del carico in salita?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Con il carico rivolto a monte", result_answer: true },
        { title_answer: "Con il carico rivolto a valle", result_answer: false },
        { title_answer: "Non importa", result_answer: false },
      ],
    },
    // 13
    {
      question_title: "In discesa, come deve essere il carico?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Con il carico rivolto a monte", result_answer: true },
        { title_answer: "Con il carico rivolto a valle", result_answer: false },
        { title_answer: "Sempre laterale", result_answer: false },
      ],
    },
    // 14
    {
      question_title: "Se il carrello è diesel, dove deve essere usato?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "In ambienti chiusi", result_answer: false },
        {
          title_answer: "All’aperto o in ambienti ben ventilati",
          result_answer: true,
        },
        { title_answer: "In ufficio", result_answer: false },
      ],
    },
    // 15
    {
      question_title: "Prima di sollevare un carico voluminoso, cosa valutare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Stabilità e visibilità durante il trasporto",
          result_answer: true,
        },
        { title_answer: "Solo il peso", result_answer: false },
        { title_answer: "Solo l’imballaggio", result_answer: false },
      ],
    },
    // 16
    {
      question_title:
        "Se un carico è troppo pesante per il carrello, cosa succede?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Il carrello va più veloce", result_answer: false },
        {
          title_answer: "Rischio ribaltamento o perdita stabilità",
          result_answer: true,
        },
        { title_answer: "Nulla", result_answer: false },
      ],
    },
    // 17
    {
      question_title: "Quando si cambia direzione in spazi stretti, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Girare bruscamente", result_answer: false },
        {
          title_answer: "Procedere lentamente e con attenzione",
          result_answer: true,
        },
        { title_answer: "Accelerare", result_answer: false },
      ],
    },
    // 18
    {
      question_title: "Se il carico blocca la visuale frontale, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Procedere normalmente", result_answer: false },
        { title_answer: "Usare retromarcia se possibile", result_answer: true },
        { title_answer: "Sollevare ulteriormente", result_answer: false },
      ],
    },
    // 19
    {
      question_title: "Durante la manutenzione, chi può operare sul carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Qualsiasi operatore", result_answer: false },
        { title_answer: "Solo personale qualificato", result_answer: true },
        { title_answer: "Mai, lasciarlo fermo", result_answer: false },
      ],
    },
    // 20
    {
      question_title:
        "Come devono essere posizionate le forche durante il trasporto?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Al massimo della altezza", result_answer: false },
        { title_answer: "Leggermente sollevate da terra", result_answer: true },
        { title_answer: "Appoggiate completamente", result_answer: false },
      ],
    },
    // 21
    {
      question_title: "Se un pedone attraversa improvvisamente, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Accelerare per evitare il ritardo",
          result_answer: false,
        },
        { title_answer: "Fermarsi e dare precedenza", result_answer: true },
        { title_answer: "Suonare e continuare", result_answer: false },
      ],
    },
    // 22
    {
      question_title: "La velocità di marcia deve essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Massima possibile", result_answer: false },
        {
          title_answer: "Adeguata all’ambiente e alle condizioni di lavoro",
          result_answer: true,
        },
        { title_answer: "Uguale a quella di un’auto", result_answer: false },
      ],
    },
    // 23
    {
      question_title: "Se il carrello inizia a ribaltarsi, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Saltare fuori subito", result_answer: false },
        {
          title_answer: "Restare seduto e tenersi saldamente",
          result_answer: true,
        },
        {
          title_answer: "Sollevare le forche per bilanciare",
          result_answer: false,
        },
      ],
    },
    // 24
    {
      question_title: "Le ruote piene sono più adatte a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Terreni accidentati", result_answer: false },
        { title_answer: "Superfici interne lisce", result_answer: true },
        { title_answer: "Strade asfaltate esterne", result_answer: false },
      ],
    },
    // 25
    {
      question_title: "Il segnalatore acustico serve a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Salutare i colleghi", result_answer: false },
        {
          title_answer: "Segnalare la presenza del carrello",
          result_answer: true,
        },
        { title_answer: "Mai, è vietato", result_answer: false },
      ],
    },
    // 26
    {
      question_title:
        "Quando si parcheggia il carrello su una pendenza, cosa bisogna fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer:
            "Freno a mano inserito, motore spento, forche abbassate",
          result_answer: true,
        },
        { title_answer: "Motore acceso, forche alte", result_answer: false },
        { title_answer: "Solo accostato senza freno", result_answer: false },
      ],
    },
    // 27
    {
      question_title: "Chi deve effettuare la manutenzione straordinaria?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Centri assistenza o tecnico qualificato",
          result_answer: true,
        },
        { title_answer: "Operatore non formato", result_answer: false },
        { title_answer: "Chiunque", result_answer: false },
      ],
    },
    // 28
    {
      question_title: "Qual è la principale funzione del carrello elevatore?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Trasportare persone", result_answer: false },
        {
          title_answer: "Sollevare e movimentare carichi",
          result_answer: true,
        },
        { title_answer: "Spostare automobili", result_answer: false },
      ],
    },
    // 29
    {
      question_title: "Prima di usare un carrello, cosa bisogna controllare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "La pressione delle gomme, i freni e i comandi",
          result_answer: true,
        },
        { title_answer: "Il colore della carrozzeria", result_answer: false },
        {
          title_answer: "Che ci sia il pieno di carburante anche se elettrico",
          result_answer: false,
        },
      ],
    },
    // 30
    {
      question_title: "Chi può guidare un carrello elevatore?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Chiunque abbia la patente B", result_answer: false },
        {
          title_answer: "Solo chi è formato e in possesso del patentino",
          result_answer: true,
        },
        {
          title_answer: "Un minore con autorizzazione dei genitori",
          result_answer: false,
        },
      ],
    },
    // 31
    {
      question_title: "Cosa indica la targhetta di portata del carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "La velocità massima del mezzo", result_answer: false },
        {
          title_answer: "Il peso massimo sollevabile in sicurezza",
          result_answer: true,
        },
        { title_answer: "Il livello di batteria", result_answer: false },
      ],
    },
    // 32
    {
      question_title:
        "Se un carico è troppo pesante rispetto alla portata, cosa succede?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Il carrello si ribalta o perde stabilità",
          result_answer: true,
        },
        { title_answer: "Il carrello va più veloce", result_answer: false },
        { title_answer: "Non succede nulla", result_answer: false },
      ],
    },
    // 33
    {
      question_title:
        "Qual è il posto più sicuro per l’operatore del carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "In piedi sui carichi", result_answer: false },
        {
          title_answer: "A bordo, all’interno della cabina di guida",
          result_answer: true,
        },
        {
          title_answer: "Dietro al carrello mentre si muove",
          result_answer: false,
        },
      ],
    },
    // 34
    {
      question_title: "In salita, come si deve trasportare il carico?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Con il carico rivolto a monte", result_answer: true },
        { title_answer: "Con il carico rivolto a valle", result_answer: false },
        { title_answer: "Non importa", result_answer: false },
      ],
    },
    // 35
    {
      question_title: "In discesa, come si deve trasportare il carico?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Con il carico rivolto a monte", result_answer: true },
        { title_answer: "Con il carico rivolto a valle", result_answer: false },
        { title_answer: "Sempre laterale", result_answer: false },
      ],
    },
    // 36
    {
      question_title:
        "Prima di una fermata prolungata, come devono essere le forche?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "In alto", result_answer: false },
        { title_answer: "Appoggiate a terra", result_answer: true },
        { title_answer: "A metà altezza", result_answer: false },
      ],
    },
    // 37
    {
      question_title: "Il freno di stazionamento serve per:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Mantenere fermo il carrello quando non è in uso",
          result_answer: true,
        },
        { title_answer: "Aumentare la velocità", result_answer: false },
        { title_answer: "Bloccare le forche", result_answer: false },
      ],
    },
    // 38
    {
      question_title: "Le ruote piene sono più adatte:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "A terreni accidentati", result_answer: false },
        { title_answer: "A superfici lisce interne", result_answer: true },
        { title_answer: "A strade asfaltate", result_answer: false },
      ],
    },
    // 39
    {
      question_title: "Il segnalatore acustico si usa:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Solo per salutare i colleghi", result_answer: false },
        {
          title_answer: "Per segnalare la propria presenza",
          result_answer: true,
        },
        { title_answer: "Mai", result_answer: false },
      ],
    },
    // 40
    {
      question_title: "La cintura di sicurezza serve a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Impedire movimenti bruschi", result_answer: false },
        {
          title_answer: "Trattenere l’operatore in caso di ribaltamento",
          result_answer: true,
        },
        { title_answer: "Décorazione", result_answer: false },
      ],
    },
    // 41
    {
      question_title: "Se si sente odore di gas da un carrello a GPL:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Continuare a lavorare", result_answer: false },
        {
          title_answer: "Segnalare il guasto e fermare il mezzo",
          result_answer: true,
        },
        { title_answer: "Accendere una sigaretta", result_answer: false },
      ],
    },
    // 42
    {
      question_title: "È consentito parlare al telefono durante la guida?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Sì, con auricolare", result_answer: false },
        { title_answer: "No, mai", result_answer: true },
        { title_answer: "Solo se si va piano", result_answer: false },
      ],
    },
    // 43
    {
      question_title: "Un carrello diesel va usato:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "In ambienti chiusi", result_answer: false },
        {
          title_answer: "All’aperto o in ambienti ventilati",
          result_answer: true,
        },
        { title_answer: "In ufficio", result_answer: false },
      ],
    },
    // 44
    {
      question_title: "Il libretto d’uso e manutenzione deve essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Sempre disponibile sul posto di lavoro",
          result_answer: true,
        },
        { title_answer: "Solo in ufficio", result_answer: false },
        { title_answer: "Non serve", result_answer: false },
      ],
    },
    // 45
    {
      question_title: "Quando si cambia direzione, cosa bisogna fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Girare bruscamente", result_answer: false },
        { title_answer: "Ridurre la velocità", result_answer: true },
        { title_answer: "Aumentare la velocità", result_answer: false },
      ],
    },
    // 46
    {
      question_title: "La zona di manovra del carrello deve essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Libera da ostacoli e ben segnalata",
          result_answer: true,
        },
        { title_answer: "Sempre affollata", result_answer: false },
        { title_answer: "Senza illuminazione", result_answer: false },
      ],
    },
    // 47
    {
      question_title:
        "La manutenzione ordinaria del carrello deve essere fatta:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Dall’operatore non formato", result_answer: false },
        { title_answer: "Da personale qualificato", result_answer: true },
        { title_answer: "Mai", result_answer: false },
      ],
    },
    // 48
    {
      question_title: "Se un carico è instabile sul pallet:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Si può trasportare lo stesso", result_answer: false },
        { title_answer: "Va sistemato o fissato prima", result_answer: true },
        { title_answer: "Basta andare più veloci", result_answer: false },
      ],
    },
    // 49
    {
      question_title:
        "Cosa succede se si frena bruscamente con un carico pesante?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Il carico può cadere o spostarsi",
          result_answer: true,
        },
        { title_answer: "Nulla", result_answer: false },
        { title_answer: "Migliora la stabilità", result_answer: false },
      ],
    },
    // 50
    {
      question_title: "I dispositivi luminosi del carrello servono a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Rendere visibile il carrello e illuminare l’area",
          result_answer: true,
        },
        { title_answer: "Fare scena", result_answer: false },
        { title_answer: "Non hanno utilità", result_answer: false },
      ],
    },
    // 51
    {
      question_title: "Durante il trasporto, le forche devono essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Alte al massimo", result_answer: false },
        { title_answer: "Leggermente sollevate da terra", result_answer: true },
        {
          title_answer: "Appoggiate completamente a terra",
          result_answer: false,
        },
      ],
    },
    // 52
    {
      question_title: "Cosa fare se il carico oscilla durante il sollevamento?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Accelerare per stabilizzarlo", result_answer: false },
        {
          title_answer: "Abbassare lentamente e fermarsi",
          result_answer: true,
        },
        { title_answer: "Continuare a sollevare", result_answer: false },
      ],
    },
    // 53
    {
      question_title: "Quando è obbligatorio l’uso del casco?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Solo all’aperto", result_answer: false },
        {
          title_answer:
            "In tutte le zone dove è richiesto dal regolamento interno",
          result_answer: true,
        },
        { title_answer: "Mai", result_answer: false },
      ],
    },
    // 54
    {
      question_title:
        "Cosa indica un segnale con triangolo giallo e simbolo carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Pericolo carrelli in movimento", result_answer: true },
        {
          title_answer: "Parcheggio consentito solo ai carrelli",
          result_answer: false,
        },
        { title_answer: "Zona vietata ai carrelli", result_answer: false },
      ],
    },
    // 55
    {
      question_title:
        "Qual è la distanza minima da mantenere tra due carrelli in marcia?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Non ha importanza", result_answer: false },
        {
          title_answer: "Almeno 2 metri o secondo regolamento interno",
          result_answer: true,
        },
        { title_answer: "Appena 50 cm", result_answer: false },
      ],
    },
    // 56
    {
      question_title: "Come bisogna trasportare un carico lungo?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Sempre con lato lungo parallelo al senso di marcia",
          result_answer: true,
        },
        {
          title_answer: "Sempre perpendicolare al senso di marcia",
          result_answer: false,
        },
        { title_answer: "Non importa", result_answer: false },
      ],
    },
    // 57
    {
      question_title: "Cosa fare in caso di guasto durante la marcia?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Continuare fino a fine turno", result_answer: false },
        {
          title_answer: "Fermarsi in sicurezza e segnalare il guasto",
          result_answer: true,
        },
        {
          title_answer: "Spingere il carrello manualmente senza segnalarlo",
          result_answer: false,
        },
      ],
    },
    // 58
    {
      question_title: "Quando si deve usare la retromarcia?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Sempre", result_answer: false },
        {
          title_answer: "Quando la visuale frontale è ostruita",
          result_answer: true,
        },
        { title_answer: "Mai", result_answer: false },
      ],
    },
    // 59
    {
      question_title: "Se un carico sporge dal pallet, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Trasportarlo comunque", result_answer: false },
        {
          title_answer: "Fissarlo o sistemarlo prima del trasporto",
          result_answer: true,
        },
        { title_answer: "Alzarlo al massimo", result_answer: false },
      ],
    },
    // 60
    {
      question_title: "Il carrello deve essere parcheggiato con le ruote:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Libere di girare", result_answer: false },
        {
          title_answer: "Bloccate con freno di stazionamento",
          result_answer: true,
        },
        { title_answer: "Sempre in movimento", result_answer: false },
      ],
    },
    // 61
    {
      question_title: "Come comportarsi se il pavimento è scivoloso?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Aumentare la velocità", result_answer: false },
        {
          title_answer: "Procedere lentamente e con attenzione",
          result_answer: true,
        },
        {
          title_answer: "Nessuna precauzione necessaria",
          result_answer: false,
        },
      ],
    },
    // 62
    {
      question_title: "Qual è il modo corretto di fermarsi in pendenza?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Freno normale e freno di stazionamento",
          result_answer: true,
        },
        { title_answer: "Solo freno normale", result_answer: false },
        {
          title_answer: "Accelerare per bilanciare il carico",
          result_answer: false,
        },
      ],
    },
    // 63
    {
      question_title:
        "Cosa indica una luce lampeggiante arancione sul carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Pericolo o attenzione", result_answer: true },
        { title_answer: "Il carrello è spento", result_answer: false },
        { title_answer: "Solo decorativa", result_answer: false },
      ],
    },
    // 64
    {
      question_title: "È possibile usare il carrello per sollevare persone?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Sì, con supervisore", result_answer: false },
        { title_answer: "No, mai", result_answer: true },
        { title_answer: "Solo se il carico è leggero", result_answer: false },
      ],
    },
    // 65
    {
      question_title:
        "Come devono essere posizionate le mani sull’acceleratore?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Leggermente, senza controllare la velocità",
          result_answer: false,
        },
        {
          title_answer: "Controllando la velocità in modo stabile",
          result_answer: true,
        },
        { title_answer: "Non importa", result_answer: false },
      ],
    },
    // 66
    {
      question_title: "Durante la manovra, come bisogna osservare l’ambiente?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Solo davanti", result_answer: false },
        { title_answer: "Davanti, dietro e ai lati", result_answer: true },
        { title_answer: "Solo dietro", result_answer: false },
      ],
    },
    // 67
    {
      question_title:
        "Se il carico è troppo alto e ostacola la visuale, l’operatore deve:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Sollevare ancora di più", result_answer: false },
        { title_answer: "Abbassarlo o usare retromarcia", result_answer: true },
        { title_answer: "Ignorare e continuare", result_answer: false },
      ],
    },
    // 68
    {
      question_title: "Qual è la funzione dei lampeggianti posteriori?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Illuminare la strada", result_answer: false },
        {
          title_answer: "Segnalare la presenza del carrello",
          result_answer: true,
        },
        { title_answer: "Decorativi", result_answer: false },
      ],
    },
    // 69
    {
      question_title: "Come si trasporta un carico instabile?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Velocemente per ridurre il tempo",
          result_answer: false,
        },
        {
          title_answer: "Stabilizzandolo prima e procedendo lentamente",
          result_answer: true,
        },
        { title_answer: "Alzandolo il più possibile", result_answer: false },
      ],
    },
    // 70
    {
      question_title:
        "Se il carrello è in pendenza e senza freno, cosa succede?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Resta fermo", result_answer: false },
        { title_answer: "Può scivolare o ribaltarsi", result_answer: true },
        { title_answer: "Aumenta la stabilità", result_answer: false },
      ],
    },
    // 71
    {
      question_title: "Quando si usa la retromarcia, cosa bisogna fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Accelerare subito", result_answer: false },
        {
          title_answer: "Procedere lentamente e controllare la visuale",
          result_answer: true,
        },
        { title_answer: "Non importa la velocità", result_answer: false },
      ],
    },
    // 72
    {
      question_title:
        "Se il carico è troppo pesante rispetto al carrello, cosa accade?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Il carrello diventa più veloce",
          result_answer: false,
        },
        {
          title_answer: "Rischio di ribaltamento o perdita di stabilità",
          result_answer: true,
        },
        { title_answer: "Nulla", result_answer: false },
      ],
    },
    // 73
    {
      question_title: "Quando il pavimento è irregolare, come guidare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Velocemente per superare ostacoli",
          result_answer: false,
        },
        {
          title_answer: "Procedere lentamente e con attenzione",
          result_answer: true,
        },
        { title_answer: "Non importa la velocità", result_answer: false },
      ],
    },
    // 74
    {
      question_title: "La manutenzione del carrello deve essere fatta:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Dall’operatore non formato", result_answer: false },
        { title_answer: "Da personale qualificato", result_answer: true },
        { title_answer: "Mai", result_answer: false },
      ],
    },
    // 75
    {
      question_title: "Quando il carico è alto, come si comporta la visuale?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Resta chiara", result_answer: false },
        {
          title_answer:
            "Può essere ostruita, quindi usare attenzione o retromarcia",
          result_answer: true,
        },
        { title_answer: "Si può guidare normalmente", result_answer: false },
      ],
    },
    // 76
    {
      question_title: "Se il carrello a GPL perde gas, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Continuare a lavorare", result_answer: false },
        { title_answer: "Fermarsi e segnalare il guasto", result_answer: true },
        { title_answer: "Accendere fiamme per testare", result_answer: false },
      ],
    },
    // 77
    {
      question_title: "Se il carico ostruisce la visuale, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Guidare a caso", result_answer: false },
        {
          title_answer: "Procedere in retromarcia se possibile",
          result_answer: true,
        },
        { title_answer: "Continuare normalmente", result_answer: false },
      ],
    },
    // 78
    {
      question_title:
        "Quando si solleva un carico pesante, le ruote posteriori tendono:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "A sollevarsi", result_answer: true },
        { title_answer: "A bloccarsi", result_answer: false },
        { title_answer: "A diventare più stabili", result_answer: false },
      ],
    },
    // 79
    {
      question_title:
        "Cosa bisogna fare prima di avviare un carrello elettrico?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Controllare livello dell’olio", result_answer: false },
        { title_answer: "Controllare batteria e cavi", result_answer: true },
        { title_answer: "Gonfiare le gomme a caso", result_answer: false },
      ],
    },
    // 80
    {
      question_title: "È permesso fumare durante la ricarica della batteria?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Sì, se all’aperto", result_answer: false },
        { title_answer: "No, mai", result_answer: true },
        {
          title_answer: "Solo con batteria quasi scarica",
          result_answer: false,
        },
      ],
    },
    // 81
    {
      question_title:
        "Quando si deposita un carico su scaffalature alte, le forche devono essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Inclinate leggermente all’indietro",
          result_answer: true,
        },
        { title_answer: "Inclinate in avanti", result_answer: false },
        { title_answer: "Al massimo della velocità", result_answer: false },
      ],
    },
    // 82
    {
      question_title: "Cosa indica un cartello con simbolo del carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Zona vietata ai carrelli", result_answer: false },
        { title_answer: "Zona di transito dei carrelli", result_answer: true },
        { title_answer: "Area parcheggio auto", result_answer: false },
      ],
    },
    // 83
    {
      question_title: "Durante le manovre, bisogna prestare attenzione a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Specchi e vetrate", result_answer: false },
        { title_answer: "Pedoni e altri mezzi", result_answer: true },
        { title_answer: "Solo scaffalature", result_answer: false },
      ],
    },
    // 84
    {
      question_title: "Se si trasporta un liquido in cisterna sul carrello:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Può spostare il baricentro durante la marcia",
          result_answer: true,
        },
        { title_answer: "Non cambia nulla", result_answer: false },
        { title_answer: "Migliora la stabilità", result_answer: false },
      ],
    },
    // 85
    {
      question_title:
        "Qual è la posizione corretta delle mani durante la guida?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Una sola mano sul volante", result_answer: false },
        { title_answer: "Nessuna mano", result_answer: false },
        { title_answer: "Due mani sul volante", result_answer: true },
      ],
    },
    // 86
    {
      question_title:
        "Prima di una fermata prolungata, come devono essere le forche?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "In alto", result_answer: false },
        { title_answer: "Appoggiate a terra", result_answer: true },
        { title_answer: "A metà altezza", result_answer: false },
      ],
    },
    // 87
    {
      question_title: "Il freno di stazionamento serve per:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Mantenere fermo il carrello quando non è in uso",
          result_answer: true,
        },
        { title_answer: "Aumentare la velocità", result_answer: false },
        { title_answer: "Bloccare le forche", result_answer: false },
      ],
    },
    // 88
    {
      question_title: "Le ruote piene sono più adatte a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Terreni accidentati", result_answer: false },
        { title_answer: "Strade asfaltate esterne", result_answer: false },
        { title_answer: "Superfici interne lisce", result_answer: true },
      ],
    },
    // 89
    {
      question_title: "Il segnalatore acustico serve a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Salutare i colleghi", result_answer: false },
        {
          title_answer: "Segnalare la presenza del carrello",
          result_answer: true,
        },
        { title_answer: "Mai, è vietato", result_answer: false },
      ],
    },
    // 90
    {
      question_title: "Prima di iniziare il turno, cosa deve fare l’operatore?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Controllare il carrello e le attrezzature",
          result_answer: true,
        },
        { title_answer: "Andare subito a lavorare", result_answer: false },
        {
          title_answer: "Ignorare eventuali piccoli danni",
          result_answer: false,
        },
      ],
    },
    // 91
    {
      question_title:
        "Durante il sollevamento, come devono essere le ruote posteriori?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Sollevarsi leggermente se il carico è pesante",
          result_answer: true,
        },
        { title_answer: "Sempre appoggiate a terra", result_answer: false },
        { title_answer: "Girare liberamente", result_answer: false },
      ],
    },
    // 92
    {
      question_title: "Quando si deve usare il freno di stazionamento?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Ogni volta che il carrello è fermo",
          result_answer: true,
        },
        { title_answer: "Solo in pendenza", result_answer: false },
        { title_answer: "Mai", result_answer: false },
      ],
    },
    // 93
    {
      question_title: "Se un pedone si avvicina al carrello, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Accelerare per passare prima", result_answer: false },
        {
          title_answer: "Rallentare o fermarsi per dare precedenza",
          result_answer: true,
        },
        { title_answer: "Ignorare il pedone", result_answer: false },
      ],
    },
    // 94
    {
      question_title: "Come si trasporta un carico fragile?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Velocemente per ridurre il tempo di trasporto",
          result_answer: false,
        },
        { title_answer: "Alzandolo il più possibile", result_answer: false },
        { title_answer: "Con delicatezza e stabilizzato", result_answer: true },
      ],
    },
    // 95
    {
      question_title: "Qual è la posizione corretta delle mani sul volante?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Una mano sola", result_answer: false },
        { title_answer: "Due mani, controllo stabile", result_answer: true },
        { title_answer: "Nessuna mano", result_answer: false },
      ],
    },
    // 96
    {
      question_title:
        "Quando il carrello trasporta un liquido, cosa può succedere?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Il baricentro può spostarsi", result_answer: true },
        { title_answer: "Nulla cambia", result_answer: false },
        { title_answer: "Migliora la stabilità", result_answer: false },
      ],
    },
    // 97
    {
      question_title: "Quale dispositivo serve a rendere visibile il carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "I fari e lampeggianti", result_answer: true },
        { title_answer: "Il volante", result_answer: false },
        { title_answer: "Le forche", result_answer: false },
      ],
    },
    // 98
    {
      question_title: "Se un carico è instabile, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Trasportarlo lo stesso", result_answer: false },
        {
          title_answer: "Sistemarlo o fissarlo prima del trasporto",
          result_answer: true,
        },
        { title_answer: "Alzarlo al massimo", result_answer: false },
      ],
    },
    // 99
    {
      question_title: "Come fermare un carrello su pendenza ripida?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Freno normale + freno di stazionamento",
          result_answer: true,
        },
        { title_answer: "Solo freno normale", result_answer: false },
        { title_answer: "Accelerare", result_answer: false },
      ],
    },
    // 100
    {
      question_title: "Quando il carrello è fermo, le forche devono essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Al massimo", result_answer: false },
        {
          title_answer: "Appoggiate a terra o posizione sicura",
          result_answer: true,
        },
        { title_answer: "In aria", result_answer: false },
      ],
    },
    {
      question_title:
        "Se un carico instabile deve essere trasportato su pavimento irregolare, come deve comportarsi l’operatore?",
      question_level: "difficile",
      question_duration: 45,
      module_id: module.id,
      answer: [
        {
          title_answer: "Ridurre la velocità e mantenere il carico basso",
          result_answer: true,
        },
        {
          title_answer: "Accelerare per completare rapidamente il percorso",
          result_answer: false,
        },
        {
          title_answer: "Sollevare le forche al massimo per stabilizzare",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Durante una curva stretta con carico alto, cosa aumenta il rischio di ribaltamento?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Abbassare il carico vicino al pavimento",
          result_answer: false,
        },
        {
          title_answer:
            "Aumentare la velocità e inclinare il carico all’esterno",
          result_answer: true,
        },
        {
          title_answer: "Mantenere velocità moderata e carico stabile",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Se il carico è troppo pesante rispetto alla portata del carrello, cosa può accadere?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Il carrello rimane stabile", result_answer: false },
        {
          title_answer: "Il carrello aumenta automaticamente la velocità",
          result_answer: false,
        },
        {
          title_answer: "Rischio di ribaltamento o perdita di stabilità",
          result_answer: true,
        },
      ],
    },
    {
      question_title:
        "Quando il carrello è in pendenza, come deve essere gestito il freno di stazionamento?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Non è necessario se il carico è leggero",
          result_answer: false,
        },
        { title_answer: "Deve essere sempre inserito", result_answer: true },
        { title_answer: "Solo per brevi soste", result_answer: false },
      ],
    },
    {
      question_title:
        "Durante la movimentazione di un carico voluminoso che ostruisce la visuale frontale, cosa fare?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer:
            "Usare retromarcia controllata o assistenza di un collega",
          result_answer: true,
        },
        {
          title_answer: "Procedere normalmente ignorando l’ostacolo",
          result_answer: false,
        },
        {
          title_answer:
            "Sollevare il carico al massimo per migliorare la visuale",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Se si trasporta un liquido in cisterna che oscilla, qual è la procedura corretta?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Procedere velocemente per stabilizzare",
          result_answer: false,
        },
        {
          title_answer: "Mantenere velocità bassa e carico vicino al pavimento",
          result_answer: true,
        },
        {
          title_answer: "Sollevare il carico per evitare il movimento",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Quando il carico supera la larghezza del corridoio, come bisogna comportarsi?",
      question_level: "difficile",
      question_duration: 45,
      module_id: module.id,
      answer: [
        {
          title_answer: "Forzare il passaggio rapidamente",
          result_answer: false,
        },
        {
          title_answer: "Tenere le forche alte per passare",
          result_answer: false,
        },
        {
          title_answer:
            "Usare percorsi idonei e assistenza per evitare collisioni",
          result_answer: true,
        },
      ],
    },
    {
      question_title:
        "Se si rileva perdita di olio idraulico durante il turno, cosa fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Continuare fino a fine turno",
          result_answer: false,
        },
        {
          title_answer: "Fermare il mezzo e segnalare immediatamente",
          result_answer: true,
        },
        {
          title_answer: "Pulire con un panno e ignorare",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "Qual è la posizione corretta del carico in salita su rampa?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Con il carico rivolto a monte, vicino al montante",
          result_answer: true,
        },
        {
          title_answer: "Con il carico rivolto a valle",
          result_answer: false,
        },
        { title_answer: "Non importa l’orientamento", result_answer: false },
      ],
    },
    {
      question_title:
        "Durante un trasporto in curva con carico alto e pesante, cosa aumenta la probabilità di ribaltamento laterale?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Procedere lentamente e carico basso",
          result_answer: false,
        },
        {
          title_answer:
            "Accelerare improvvisamente e inclinare il carico all’esterno",
          result_answer: true,
        },
        { title_answer: "Usare retromarcia in curva", result_answer: false },
      ],
    },
    {
      question_title:
        "111. Durante il sollevamento di un carico instabile, cosa deve fare l’operatore se il carrello vibra?",
      question_level: "difficile",
      question_duration: 45,
      module_id: module.id,
      answer: [
        {
          title_answer: "Continuare il sollevamento rapidamente",
          result_answer: false,
        },
        {
          title_answer: "Sollevare le forche al massimo",
          result_answer: false,
        },
        {
          title_answer: "Fermarsi, abbassare lentamente e stabilizzare",
          result_answer: true,
        },
      ],
    },
    {
      question_title:
        "112. Se un carico sporge lateralmente oltre le forche, qual è la procedura corretta?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        { title_answer: "Trasportare comunque", result_answer: false },
        {
          title_answer: "Fissarlo o sistemarlo prima del trasporto",
          result_answer: true,
        },
        {
          title_answer: "Aumentare la velocità per passare rapidamente",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "113. Durante la discesa su rampa con carico pesante, come deve essere orientato il carico?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Con il carico rivolto a monte",
          result_answer: true,
        },
        {
          title_answer: "Con il carico rivolto a valle",
          result_answer: false,
        },
        { title_answer: "Sempre laterale", result_answer: false },
      ],
    },
    {
      question_title:
        "114. Se il carico è alto e blocca la visuale, come procedere in corridoio stretto?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Usare retromarcia controllata o assistenza",
          result_answer: true,
        },
        {
          title_answer: "Accelerare per completare il percorso",
          result_answer: false,
        },
        {
          title_answer: "Sollevare ulteriormente per vedere meglio",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "115. Se il carrello trasporta un liquido oscillante, quale comportamento riduce il rischio di ribaltamento?",
      question_level: "difficile",
      question_duration: 45,
      module_id: module.id,
      answer: [
        { title_answer: "Procedere velocemente", result_answer: false },
        {
          title_answer: "Velocità bassa e carico vicino al pavimento",
          result_answer: true,
        },
        { title_answer: "Sollevare le forche", result_answer: false },
      ],
    },
    {
      question_title:
        "116. Durante la manovra in curva, il carico è alto: cosa aumenta il rischio di ribaltamento laterale?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Mantenere velocità moderata e carico basso",
          result_answer: false,
        },
        { title_answer: "Usare retromarcia in curva", result_answer: false },
        {
          title_answer: "Accelerare e inclinare il carico all’esterno",
          result_answer: true,
        },
      ],
    },
    {
      question_title:
        "117. Se il carrello è diesel e si lavora in ambiente chiuso, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Procedere normalmente", result_answer: false },
        {
          title_answer: "Spostarsi all’aperto o in area ventilata",
          result_answer: true,
        },
        {
          title_answer: "Aprire finestre e proseguire",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "118. Se la batteria al piombo rilascia gas durante la ricarica, cosa è corretto fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Assicurarsi che l’area sia ventilata e non fumare",
          result_answer: true,
        },
        {
          title_answer: "Ignorare e continuare a caricare",
          result_answer: false,
        },
        {
          title_answer: "Aprire la batteria per ridurre pressione",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "119. Se le catene di sollevamento si allungano oltre il 2%, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Possono essere usate comunque",
          result_answer: false,
        },
        { title_answer: "Devono essere sostituite", result_answer: true },
        { title_answer: "Accorciarle manualmente", result_answer: false },
      ],
    },
    {
      question_title:
        "120. Durante il trasporto di più pallet, come bisogna procedere?",
      question_level: "difficile",
      question_duration: 45,
      module_id: module.id,
      answer: [
        { title_answer: "Sempre consentito", result_answer: false },
        {
          title_answer: "Mantenere le forche alte per sicurezza",
          result_answer: false,
        },
        {
          title_answer:
            "Solo se previsto dal carrello e stabilizzati correttamente",
          result_answer: true,
        },
      ],
    },
    // Questions 121-150 : suivre le même modèle
    {
      question_title:
        "121. In caso di ribaltamento longitudinale, qual è la causa più comune?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Su superficie piana con carico basso",
          result_answer: false,
        },
        {
          title_answer: "Pendenza con carico alto e sbilanciato",
          result_answer: true,
        },
        {
          title_answer: "Carico vicino al montante e basso",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "122. Se un carico sporge molto, quale precauzione è necessaria?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Non movimentarlo senza misure di sicurezza",
          result_answer: true,
        },
        { title_answer: "Procedere normalmente", result_answer: false },
        {
          title_answer: "Accelerare per ridurre il tempo di esposizione",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "123. Durante la retromarcia, come deve osservare l’operatore l’ambiente?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        { title_answer: "Solo davanti", result_answer: false },
        {
          title_answer: "Girare la testa e controllare dietro e ai lati",
          result_answer: true,
        },
        {
          title_answer: "Usare solo specchi retrovisori",
          result_answer: false,
        },
      ],
    },
    {
      question_title:
        "124. Come deve essere mantenuto il carrello durante il parcheggio in pendenza?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Freno normale inserito, forche alte",
          result_answer: false,
        },
        { title_answer: "Solo freno normale", result_answer: false },
        {
          title_answer:
            "Freno a mano inserito, forche abbassate, motore spento",
          result_answer: true,
        },
      ],
    },
    {
      question_title:
        "125. Se durante la guida il carrello vibra o emette rumori anomali, cosa fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        { title_answer: "Ignorare e continuare", result_answer: false },
        {
          title_answer: "Fermarsi immediatamente e segnalare il guasto",
          result_answer: true,
        },
        {
          title_answer: "Aumentare la velocità per superare il problema",
          result_answer: false,
        },
      ],
    },
    // 126
    {
      question_title:
        "126. Durante la salita con carico voluminoso e pesante, come va orientato il carico?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        { title_answer: "Verso valle", result_answer: false },
        { title_answer: "Di lato", result_answer: false },
        { title_answer: "Verso monte", result_answer: true },
      ],
    },
    // 127
    {
      question_title:
        "127. Se il carrello deve attraversare una porta stretta con carico alto, cosa fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Accelerare per passare velocemente",
          result_answer: false,
        },
        {
          title_answer: "Abbassare il carico e procedere lentamente",
          result_answer: true,
        },
        {
          title_answer: "Sollevare le forche al massimo per vedere meglio",
          result_answer: false,
        },
      ],
    },
    // 128
    {
      question_title:
        "128. Se il carrello trasporta un liquido in cisterna, quale rischio principale si deve considerare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Baricentro instabile con rischio ribaltamento",
          result_answer: true,
        },
        {
          title_answer: "Riduzione della velocità di marcia",
          result_answer: false,
        },
        { title_answer: "Nessun rischio particolare", result_answer: false },
      ],
    },
    // 129
    {
      question_title:
        "129. Durante il trasporto di carichi multipli, come deve essere posizionato il più pesante?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "In alto e vicino alle forche",
          result_answer: false,
        },
        {
          title_answer: "Sullo strato superiore per stabilità",
          result_answer: false,
        },
        {
          title_answer: "Sul pallet inferiore, vicino al baricentro",
          result_answer: true,
        },
      ],
    },
    // 130
    {
      question_title:
        "130. Se il carrello inizia a ribaltarsi lateralmente, cosa deve fare l’operatore?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Saltare fuori immediatamente",
          result_answer: false,
        },
        {
          title_answer: "Restare seduto e mantenere la cintura di sicurezza",
          result_answer: true,
        },
        {
          title_answer: "Alzare le forche per bilanciare",
          result_answer: false,
        },
      ],
    },
    // 131
    {
      question_title:
        "131. Durante la ricarica della batteria al piombo, cosa non bisogna mai fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Fumare o avvicinare fiamme", result_answer: true },
        { title_answer: "Usare area ventilata", result_answer: false },
        {
          title_answer: "Indossare guanti e occhiali di protezione",
          result_answer: false,
        },
      ],
    },
    // 132
    {
      question_title:
        "132. Se si guida su pavimento irregolare con carico alto, come bisogna procedere?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Velocità massima per ridurre il tempo di esposizione",
          result_answer: false,
        },
        {
          title_answer: "Procedere lentamente e con attenzione",
          result_answer: true,
        },
        {
          title_answer: "Sollevare le forche per evitare ostacoli",
          result_answer: false,
        },
      ],
    },
    // 133
    {
      question_title:
        "133. Durante il sollevamento vicino a scaffalature alte, le forche devono essere:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Inclinate leggermente all’indietro",
          result_answer: true,
        },
        { title_answer: "Inclinate in avanti", result_answer: false },
        { title_answer: "Al massimo sollevamento", result_answer: false },
      ],
    },
    // 134
    {
      question_title:
        "134. Se il carico è troppo vicino al limite di portata, cosa fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Sollevare comunque lentamente",
          result_answer: false,
        },
        {
          title_answer: "Tentare più volte finché non sale",
          result_answer: false,
        },
        {
          title_answer:
            "Consultare targhetta e responsabile prima di sollevare",
          result_answer: true,
        },
      ],
    },
    // 135
    {
      question_title:
        "135. Quando si attraversa un incrocio con scarsa visibilità, cosa fare?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Procedere lentamente e suonare",
          result_answer: true,
        },
        {
          title_answer: "Accelerare per ridurre il tempo di attraversamento",
          result_answer: false,
        },
        { title_answer: "Girare senza guardare", result_answer: false },
      ],
    },
    // 136
    {
      question_title:
        "136. Come si deve comportare l’operatore quando trasporta carico instabile in curva stretta?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Accelerare per completare la curva",
          result_answer: false,
        },
        {
          title_answer: "Ridurre la velocità, tenere carico basso e stabile",
          result_answer: true,
        },
        {
          title_answer: "Sollevare le forche per migliorare stabilità",
          result_answer: false,
        },
      ],
    },
    // 137
    {
      question_title:
        "137. Se il carrello diesel viene usato in interno senza ventilazione, quale rischio principale?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Inquinamento dell’aria e rischio asfissia",
          result_answer: true,
        },
        { title_answer: "Danno immediato al motore", result_answer: false },
        {
          title_answer: "Riduzione stabilità del carico",
          result_answer: false,
        },
      ],
    },
    // 138
    {
      question_title:
        "138. Durante il sollevamento di carico pesante, le ruote posteriori tendono a:",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Rimanere sempre appoggiate", result_answer: false },
        { title_answer: "Bloccarsi completamente", result_answer: false },
        { title_answer: "Sollevarsi leggermente", result_answer: true },
      ],
    },
    // 139
    {
      question_title:
        "139. Se le forche non sono parallele durante il sollevamento, cosa può succedere?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        {
          title_answer: "Carico instabile e rischio caduta",
          result_answer: true,
        },
        {
          title_answer: "Migliore distribuzione del peso",
          result_answer: false,
        },
        { title_answer: "Nessun effetto", result_answer: false },
      ],
    },
    // 140
    {
      question_title:
        "140. Se un carico blocca la visuale frontale, come comportarsi in un corridoio stretto?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Accelerare per passare rapidamente",
          result_answer: false,
        },
        {
          title_answer: "Sollevare ulteriormente il carico",
          result_answer: false,
        },
        {
          title_answer: "Procedere in retromarcia o chiedere assistenza",
          result_answer: true,
        },
      ],
    },
    // 141
    {
      question_title:
        "141. Qual è la funzione del triangolo di stabilità del carrello?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Area di parcheggio", result_answer: false },
        { title_answer: "Area di lavoro pedoni", result_answer: false },
        {
          title_answer: "Zona di equilibrio che previene ribaltamento",
          result_answer: true,
        },
      ],
    },
    // 142
    {
      question_title:
        "142. Durante la manutenzione straordinaria del carrello, chi deve intervenire?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Operatore qualsiasi", result_answer: false },
        {
          title_answer: "Tecnico qualificato o centro assistenza",
          result_answer: true,
        },
        { title_answer: "Nessuno", result_answer: false },
      ],
    },
    // 143
    {
      question_title:
        "143. Se le catene di sollevamento si allungano oltre il limite consentito, cosa fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        { title_answer: "Sostituirle", result_answer: true },
        { title_answer: "Accorciarle manualmente", result_answer: false },
        { title_answer: "Usarle comunque", result_answer: false },
      ],
    },
    // 144
    {
      question_title:
        "144. Durante una curva stretta con carico lungo e pesante, cosa aumenta il rischio di ribaltamento?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        { title_answer: "Ridurre la velocità", result_answer: false },
        { title_answer: "Tenere il carico basso", result_answer: false },
        {
          title_answer: "Accelerare e inclinare il carico verso l’esterno",
          result_answer: true,
        },
      ],
    },
    // 145
    {
      question_title:
        "145. Durante il parcheggio su pendenza, come devono essere posizionate le forche?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        { title_answer: "Al massimo della altezza", result_answer: false },
        { title_answer: "Abbassate a terra", result_answer: true },
        { title_answer: "A metà altezza", result_answer: false },
      ],
    },
    // 146
    {
      question_title:
        "146. Se un carico sporge lateralmente molto, è consentito movimentarlo senza precauzioni?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        { title_answer: "Sì, va bene", result_answer: false },
        {
          title_answer: "Accelerare per ridurre il rischio",
          result_answer: false,
        },
        {
          title_answer: "No, devono essere prese precauzioni",
          result_answer: true,
        },
      ],
    },
    // 147
    {
      question_title:
        "147. Qual è il comportamento corretto se il carrello ha odore di gas GPL?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Fermarsi e segnalare il guasto",
          result_answer: true,
        },
        { title_answer: "Continuare a lavorare", result_answer: false },
        {
          title_answer: "Accendere fiamme per testare",
          result_answer: false,
        },
      ],
    },
    // 148
    {
      question_title:
        "148. Se la visuale è ostruita dal carico durante retromarcia, cosa fare?",
      question_level: "difficile",
      question_duration: 35,
      module_id: module.id,
      answer: [
        { title_answer: "Procedere normalmente", result_answer: false },
        {
          title_answer: "Chiedere assistenza o usare retromarcia controllata",
          result_answer: true,
        },
        {
          title_answer: "Sollevare ulteriormente le forche",
          result_answer: false,
        },
      ],
    },
    // 149
    {
      question_title:
        "149. Se un carico supera la portata del carrello, cosa succede?",
      question_level: "difficile",
      question_duration: 30,
      module_id: module.id,
      answer: [
        {
          title_answer: "Rischio ribaltamento o perdita di stabilità",
          result_answer: true,
        },
        { title_answer: "Carrello diventa più veloce", result_answer: false },
        { title_answer: "Nulla di particolare", result_answer: false },
      ],
    },
    // 150
    {
      question_title:
        "150. Durante l’attraversamento di una rampa con carico instabile, come procedere?",
      question_level: "difficile",
      question_duration: 40,
      module_id: module.id,
      answer: [
        {
          title_answer: "Velocemente per ridurre tempo di esposizione",
          result_answer: false,
        },
        {
          title_answer: "Sollevare le forche per stabilizzare",
          result_answer: false,
        },
        {
          title_answer: "Procedere lentamente mantenendo carico basso",
          result_answer: true,
        },
      ],
    },
  ];

  for (const question of questionsData) {
    await prisma.question.create({
      data: {
        question_title: question.question_title,
        question_level: question.question_level,
        question_duration: question.question_duration,
        module_id: question.module_id,
        answer: {
          create: question.answer,
        },
      },
    });
  }

  console.log("Importazione completata!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function main() {
//   // Vider les tables
//   await prisma.answer.deleteMany();
//   await prisma.question.deleteMany();
//   await prisma.achievment.deleteMany(); // <-- il manquait ça
//   await prisma.module.deleteMany();

//   // Upsert du module pour éviter les doublons
//   const module = await prisma.module.upsert({
//     where: { module_title: "QCM Patentino Carrellista" },
//     update: {},
//     create: { module_title: "QCM Patentino Carrellista" },
//   });

//   const questionsData = [
//     //Question en plus 1 a 25
//     {
//       question_title: "Prima di iniziare il turno, cosa deve fare l’operatore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Controllare il carrello e le attrezzature",
//           result_answer: true,
//         },
//         { title_answer: "Andare subito a lavorare", result_answer: false },
//         {
//           title_answer: "Ignorare eventuali piccoli danni",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Durante il sollevamento, come devono essere le ruote posteriori?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Sollevarsi leggermente se il carico è pesante",
//           result_answer: true,
//         },
//         { title_answer: "Sempre appoggiate a terra", result_answer: false },
//         { title_answer: "Girare liberamente", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si deve usare il freno di stazionamento?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Solo in pendenza", result_answer: false },
//         {
//           title_answer: "Ogni volta che il carrello è fermo",
//           result_answer: true,
//         },
//         { title_answer: "Mai", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un pedone si avvicina al carrello, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Accelerare per passare prima", result_answer: false },
//         {
//           title_answer: "Rallentare o fermarsi per dare precedenza",
//           result_answer: true,
//         },
//         { title_answer: "Ignorare il pedone", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come si trasporta un carico fragile?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Velocemente per ridurre il tempo di trasporto",
//           result_answer: false,
//         },
//         { title_answer: "Con delicatezza e stabilizzato", result_answer: true },
//         { title_answer: "Alzandolo il più possibile", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Qual è la posizione corretta delle mani sul volante?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Una mano sola", result_answer: false },
//         { title_answer: "Due mani, controllo stabile", result_answer: true },
//         { title_answer: "Nessuna mano", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Quando il carrello trasporta un liquido, cosa può succedere?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Il baricentro può spostarsi", result_answer: true },
//         { title_answer: "Nulla cambia", result_answer: false },
//         { title_answer: "Migliora la stabilità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quale dispositivo serve a rendere visibile il carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "I fari e lampeggianti", result_answer: true },
//         { title_answer: "Il volante", result_answer: false },
//         { title_answer: "Le forche", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un carico è instabile, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Trasportarlo velocemente", result_answer: false },
//         {
//           title_answer: "Sistemarlo o fissarlo prima del trasporto",
//           result_answer: true,
//         },
//         {
//           title_answer: "Sollevare più in alto possibile",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Il libretto d’uso e manutenzione deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Sempre disponibile sul posto di lavoro",
//           result_answer: true,
//         },
//         { title_answer: "Solo in ufficio", result_answer: false },
//         { title_answer: "Non serve", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Cosa fare se il carrello ha odore di gas GPL?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Continuare a lavorare", result_answer: false },
//         { title_answer: "Fermarsi e segnalare il guasto", result_answer: true },
//         { title_answer: "Accendere fiamme per testare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Qual è la posizione sicura del carico in salita?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Con il carico rivolto a monte", result_answer: true },
//         { title_answer: "Con il carico rivolto a valle", result_answer: false },
//         { title_answer: "Non importa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "In discesa, come deve essere il carico?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Con il carico rivolto a monte", result_answer: true },
//         { title_answer: "Con il carico rivolto a valle", result_answer: false },
//         { title_answer: "Sempre laterale", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se il carrello è diesel, dove deve essere usato?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In ambienti chiusi", result_answer: false },
//         {
//           title_answer: "All’aperto o in ambienti ben ventilati",
//           result_answer: true,
//         },
//         { title_answer: "In ufficio", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Prima di sollevare un carico voluminoso, cosa valutare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Stabilità e visibilità durante il trasporto",
//           result_answer: true,
//         },
//         { title_answer: "Solo il peso", result_answer: false },
//         { title_answer: "Solo l’imballaggio", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se un carico è troppo pesante per il carrello, cosa succede?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Il carrello va più veloce", result_answer: false },
//         {
//           title_answer: "Rischio ribaltamento o perdita stabilità",
//           result_answer: true,
//         },
//         { title_answer: "Nulla", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si cambia direzione in spazi stretti, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Girare bruscamente", result_answer: false },
//         {
//           title_answer: "Procedere lentamente e con attenzione",
//           result_answer: true,
//         },
//         { title_answer: "Accelerare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se il carico blocca la visuale frontale, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Procedere normalmente", result_answer: false },
//         { title_answer: "Usare retromarcia se possibile", result_answer: true },
//         { title_answer: "Sollevare ulteriormente", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Durante la manutenzione, chi può operare sul carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Qualsiasi operatore", result_answer: false },
//         { title_answer: "Solo personale qualificato", result_answer: true },
//         { title_answer: "Mai, lasciarlo fermo", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Come devono essere posizionate le forche durante il trasporto?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Al massimo della altezza", result_answer: false },
//         { title_answer: "Leggermente sollevate da terra", result_answer: true },
//         { title_answer: "Appoggiate completamente", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un pedone attraversa improvvisamente, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Accelerare per evitare il ritardo",
//           result_answer: false,
//         },
//         { title_answer: "Fermarsi e dare precedenza", result_answer: true },
//         { title_answer: "Suonare e continuare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La velocità di marcia deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Massima possibile", result_answer: false },
//         {
//           title_answer: "Adeguata all’ambiente e alle condizioni di lavoro",
//           result_answer: true,
//         },
//         { title_answer: "Uguale a quella di un’auto", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se il carrello inizia a ribaltarsi, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Saltare fuori subito", result_answer: false },
//         {
//           title_answer: "Restare seduto e tenersi saldamente",
//           result_answer: true,
//         },
//         {
//           title_answer: "Sollevare le forche per bilanciare",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Le ruote piene sono più adatte a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Terreni accidentati", result_answer: false },
//         { title_answer: "Superfici interne lisce", result_answer: true },
//         { title_answer: "Strade asfaltate esterne", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il segnalatore acustico serve a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Salutare i colleghi", result_answer: false },
//         {
//           title_answer: "Segnalare la presenza del carrello",
//           result_answer: true,
//         },
//         { title_answer: "Mai, è vietato", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se il carico è instabile sul pallet, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Trasportarlo comunque", result_answer: false },
//         { title_answer: "Sistemarlo o fissarlo prima", result_answer: true },
//         { title_answer: "Basta andare più veloce", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Cosa succede se si frena bruscamente con un carico pesante?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Il carico può cadere o spostarsi",
//           result_answer: true,
//         },
//         { title_answer: "Nulla, è normale", result_answer: false },
//         {
//           title_answer: "Il carrello migliora stabilità",
//           result_answer: false,
//         },
//       ],
//     },
//     //Questions en plus 1 à 50
//     {
//       question_title: "Durante il trasporto, le forche devono essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Alte al massimo", result_answer: false },
//         { title_answer: "Leggermente sollevate da terra", result_answer: true },
//         {
//           title_answer: "Appoggiate completamente a terra",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Cosa fare se il carico oscilla durante il sollevamento?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Accelerare per stabilizzarlo", result_answer: false },
//         {
//           title_answer: "Abbassare lentamente e fermarsi",
//           result_answer: true,
//         },
//         { title_answer: "Continuare a sollevare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando è obbligatorio l’uso del casco?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Solo all’aperto", result_answer: false },
//         {
//           title_answer:
//             "In tutte le zone dove è richiesto dal regolamento interno",
//           result_answer: true,
//         },
//         { title_answer: "Mai", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Cosa indica un segnale con triangolo giallo e simbolo carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Pericolo carrelli in movimento", result_answer: true },
//         {
//           title_answer: "Parcheggio consentito solo ai carrelli",
//           result_answer: false,
//         },
//         { title_answer: "Zona vietata ai carrelli", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Qual è la distanza minima da mantenere tra due carrelli in marcia?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Non ha importanza", result_answer: false },
//         {
//           title_answer: "Almeno 2 metri o secondo regolamento interno",
//           result_answer: true,
//         },
//         { title_answer: "Appena 50 cm", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come bisogna trasportare un carico lungo?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Sempre con lato lungo parallelo al senso di marcia",
//           result_answer: true,
//         },
//         {
//           title_answer: "Sempre perpendicolare al senso di marcia",
//           result_answer: false,
//         },
//         { title_answer: "Non importa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Cosa fare in caso di guasto durante la marcia?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Continuare fino a fine turno", result_answer: false },
//         {
//           title_answer: "Fermarsi in sicurezza e segnalare il guasto",
//           result_answer: true,
//         },
//         {
//           title_answer: "Spingere il carrello manualmente senza segnalarlo",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Quando si deve usare la retromarcia?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sempre", result_answer: false },
//         {
//           title_answer: "Quando la visuale frontale è ostruita",
//           result_answer: true,
//         },
//         { title_answer: "Mai", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un carico sporge dal pallet, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Trasportarlo comunque", result_answer: false },
//         {
//           title_answer: "Fissarlo o sistemarlo prima del trasporto",
//           result_answer: true,
//         },
//         { title_answer: "Alzarlo al massimo", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il carrello deve essere parcheggiato con le ruote:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Libere di girare", result_answer: false },
//         {
//           title_answer: "Bloccate con freno di stazionamento",
//           result_answer: true,
//         },
//         { title_answer: "Sempre in movimento", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come comportarsi se il pavimento è scivoloso?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Aumentare la velocità per ridurre il tempo di esposizione",
//           result_answer: false,
//         },
//         {
//           title_answer: "Procedere lentamente e con attenzione",
//           result_answer: true,
//         },
//         {
//           title_answer: "Non ci sono precauzioni da prendere",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Qual è il modo corretto di fermarsi in pendenza?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Freno normale e freno di stazionamento",
//           result_answer: true,
//         },
//         { title_answer: "Solo freno normale", result_answer: false },
//         {
//           title_answer: "Accelerare per bilanciare il carico",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Cosa indica una luce lampeggiante arancione sul carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Pericolo o attenzione", result_answer: true },
//         { title_answer: "Il carrello è spento", result_answer: false },
//         { title_answer: "Solo decorativa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "È possibile usare il carrello per sollevare persone?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, con supervisore presente", result_answer: false },
//         { title_answer: "No, mai", result_answer: true },
//         { title_answer: "Solo se il carico è leggero", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Come devono essere posizionate le mani sull’acceleratore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Leggermente, senza controllare la velocità",
//           result_answer: false,
//         },
//         {
//           title_answer: "Controllando la velocità in modo stabile",
//           result_answer: true,
//         },
//         { title_answer: "Non importa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Durante la manovra, come bisogna osservare l’ambiente?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Solo davanti", result_answer: false },
//         { title_answer: "Davanti, dietro e ai lati", result_answer: true },
//         { title_answer: "Solo dietro", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se il carico è troppo alto e ostacola la visuale, l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sollevare ancora di più", result_answer: false },
//         { title_answer: "Abbassarlo o usare retromarcia", result_answer: true },
//         { title_answer: "Ignorare e continuare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Qual è la funzione dei lampeggianti posteriori?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Illuminare la strada", result_answer: false },
//         {
//           title_answer: "Segnalare la presenza del carrello",
//           result_answer: true,
//         },
//         { title_answer: "Decorativi", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come si trasporta un carico instabile?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Velocemente per ridurre il tempo di trasporto",
//           result_answer: false,
//         },
//         {
//           title_answer: "Stabilizzandolo prima e procedendo lentamente",
//           result_answer: true,
//         },
//         { title_answer: "Alzandolo il più possibile", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se il carrello è in pendenza e senza freno, cosa succede?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Resta fermo", result_answer: false },
//         { title_answer: "Può scivolare o ribaltarsi", result_answer: true },
//         { title_answer: "Aumenta la stabilità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si usa la retromarcia, cosa bisogna fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Accelerare subito", result_answer: false },
//         {
//           title_answer: "Procedere lentamente e controllare la visuale",
//           result_answer: true,
//         },
//         { title_answer: "Non importa la velocità", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se il carico è troppo pesante rispetto al carrello, cosa accade?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Il carrello diventa più veloce",
//           result_answer: false,
//         },
//         {
//           title_answer: "Rischio di ribaltamento o perdita di stabilità",
//           result_answer: true,
//         },
//         { title_answer: "Nulla", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando il pavimento è irregolare, come guidare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Velocemente per superare gli ostacoli",
//           result_answer: false,
//         },
//         {
//           title_answer: "Procedere lentamente e con attenzione",
//           result_answer: true,
//         },
//         { title_answer: "Non importa la velocità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La manutenzione del carrello deve essere fatta:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Dall’operatore non formato", result_answer: false },
//         { title_answer: "Da personale qualificato", result_answer: true },
//         { title_answer: "Mai", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando il carico è alto, come si comporta la visuale?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Resta chiara", result_answer: false },
//         {
//           title_answer:
//             "Può essere ostruita, quindi usare attenzione o retromarcia",
//           result_answer: true,
//         },
//         { title_answer: "Si può guidare normalmente", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se il carrello è alimentato a GPL, cosa fare in caso di perdita di gas?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Continuare a lavorare", result_answer: false },
//         { title_answer: "Fermarsi e segnalare il guasto", result_answer: true },
//         { title_answer: "Accendere fiamme per testare", result_answer: false },
//       ],
//     },
//     // Questions 26–50
//     {
//       question_title:
//         "Se durante la marcia il carico ostruisce la visuale, cosa deve fare l’operatore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Guidare a caso", result_answer: false },
//         {
//           title_answer: "Procedere in retromarcia se possibile",
//           result_answer: true,
//         },
//         { title_answer: "Continuare normalmente", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Quando si solleva un carico pesante, le ruote posteriori tendono:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "A sollevarsi", result_answer: true },
//         { title_answer: "A bloccarsi", result_answer: false },
//         { title_answer: "A diventare più stabili", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Cosa bisogna fare prima di avviare un carrello elettrico?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Controllare livello dell’olio", result_answer: false },
//         {
//           title_answer: "Controllare stato della batteria e dei cavi",
//           result_answer: true,
//         },
//         { title_answer: "Gonfiare le gomme a caso", result_answer: false },
//       ],
//     },
//     {
//       question_title: "È permesso fumare durante la ricarica della batteria?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, se si è all’aperto", result_answer: false },
//         { title_answer: "No, mai", result_answer: true },
//         {
//           title_answer: "Solo con batteria quasi scarica",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Quando si deposita un carico su scaffalature alte, le forche devono essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Inclinate leggermente all’indietro durante il sollevamento",
//           result_answer: true,
//         },
//         { title_answer: "Inclinate in avanti sempre", result_answer: false },
//         {
//           title_answer: "Sempre al massimo della velocità",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Cosa indica un cartello con il simbolo del carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Zona vietata ai carrelli", result_answer: false },
//         { title_answer: "Zona di transito dei carrelli", result_answer: true },
//         { title_answer: "Area parcheggio auto", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Durante le manovre, bisogna prestare particolare attenzione a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Specchi e vetrate", result_answer: false },
//         { title_answer: "Pedoni e altri mezzi", result_answer: true },
//         { title_answer: "Solo alle scaffalature", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se si trasporta un liquido in cisterna sul carrello:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Può spostare il baricentro durante la marcia",
//           result_answer: true,
//         },
//         { title_answer: "Non cambia nulla", result_answer: false },
//         { title_answer: "Migliora la stabilità", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Qual è la posizione corretta delle mani durante la guida?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Una sola mano sul volante", result_answer: false },
//         { title_answer: "Due mani sul volante", result_answer: true },
//         { title_answer: "Nessuna mano, solo ginocchia", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Prima di una fermata prolungata, come devono essere posizionate le forche?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In alto", result_answer: false },
//         { title_answer: "Appoggiate a terra", result_answer: true },
//         { title_answer: "A metà altezza", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il dispositivo “freno di stazionamento” serve per:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Mantenere fermo il carrello quando non è in uso",
//           result_answer: true,
//         },
//         { title_answer: "Aumentare la velocità", result_answer: false },
//         { title_answer: "Bloccare le forche", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Le ruote piene (senza aria) sono più adatte:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "A terreni accidentati", result_answer: false },
//         { title_answer: "A superfici lisce interne", result_answer: true },
//         { title_answer: "A strade asfaltate esterne", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il segnalatore acustico del carrello si usa:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Solo per salutare i colleghi", result_answer: false },
//         {
//           title_answer: "Per segnalare la propria presenza",
//           result_answer: true,
//         },
//         { title_answer: "Mai, è vietato", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La cintura di sicurezza sul carrello serve a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Impedire movimenti bruschi dell’operatore",
//           result_answer: false,
//         },
//         {
//           title_answer: "Trattenere l’operatore in caso di ribaltamento",
//           result_answer: true,
//         },
//         { title_answer: "Decorazione, non obbligatoria", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se si avverte odore di gas da un carrello a GPL, cosa bisogna fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Continuare a lavorare", result_answer: false },
//         {
//           title_answer: "Segnalare subito il guasto e fermare il mezzo",
//           result_answer: true,
//         },
//         {
//           title_answer: "Accendere una sigaretta per verificare",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "È consentito parlare al telefono durante la guida del carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, se con auricolare", result_answer: false },
//         { title_answer: "No, mai", result_answer: true },
//         { title_answer: "Solo se si va piano", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Un carrello diesel va usato preferibilmente:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In ambienti chiusi", result_answer: false },
//         {
//           title_answer: "All’aperto o in ambienti ben ventilati",
//           result_answer: true,
//         },
//         { title_answer: "In ufficio", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Il libretto d’uso e manutenzione del carrello deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Sempre disponibile sul posto di lavoro",
//           result_answer: true,
//         },
//         { title_answer: "Solo in ufficio", result_answer: false },
//         { title_answer: "Non serve", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si cambia direzione, cosa bisogna fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Girare bruscamente", result_answer: false },
//         { title_answer: "Ridurre la velocità", result_answer: true },
//         { title_answer: "Aumentare la velocità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La zona di manovra del carrello deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Libera da ostacoli e ben segnalata",
//           result_answer: true,
//         },
//         { title_answer: "Sempre affollata", result_answer: false },
//         { title_answer: "Senza illuminazione", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "La manutenzione ordinaria del carrello deve essere fatta:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Dall’operatore non formato", result_answer: false },
//         { title_answer: "Da personale qualificato", result_answer: true },
//         { title_answer: "Mai, non serve", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un carico è instabile sul pallet:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Si può trasportare lo stesso", result_answer: false },
//         { title_answer: "Va sistemato o fissato prima", result_answer: true },
//         { title_answer: "Basta andare più veloci", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Cosa succede se si frena bruscamente con un carico pesante?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Il carico può cadere o spostarsi",
//           result_answer: true,
//         },
//         { title_answer: "Nulla, è normale", result_answer: false },
//         {
//           title_answer: "Il carrello migliora la stabilità",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "I dispositivi luminosi del carrello (fari, lampeggianti) servono a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Rendere visibile il carrello e illuminare l’area",
//           result_answer: true,
//         },
//         { title_answer: "Fare scena", result_answer: false },
//         { title_answer: "Non hanno utilità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un pedone si trova in prossimità del carrello:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Continuare normalmente", result_answer: false },
//         {
//           title_answer: "Prestare attenzione, rallentare o fermarsi",
//           result_answer: true,
//         },
//         { title_answer: "Suonare e accelerare", result_answer: false },
//       ],
//     },
//     // Questions 1–25
//     {
//       question_title: "Qual è la principale funzione del carrello elevatore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Trasportare persone", result_answer: false },
//         {
//           title_answer: "Sollevare e movimentare carichi",
//           result_answer: true,
//         },
//         { title_answer: "Spostare automobili", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Prima di usare un carrello, cosa bisogna controllare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "La pressione delle gomme, i freni e i comandi",
//           result_answer: true,
//         },
//         { title_answer: "Il colore della carrozzeria", result_answer: false },
//         {
//           title_answer: "Che ci sia il pieno di carburante anche se elettrico",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Chi può guidare un carrello elevatore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Chiunque abbia la patente B", result_answer: false },
//         {
//           title_answer: "Solo chi è formato e in possesso del patentino",
//           result_answer: true,
//         },
//         {
//           title_answer: "Un minore con autorizzazione dei genitori",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Cosa indica la targhetta di portata del carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "La velocità massima del mezzo", result_answer: false },
//         {
//           title_answer: "Il peso massimo sollevabile in sicurezza",
//           result_answer: true,
//         },
//         { title_answer: "Il livello di batteria", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se un carico è troppo pesante rispetto alla portata, cosa succede?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Il carrello si ribalta o perde stabilità",
//           result_answer: true,
//         },
//         { title_answer: "Il carrello va più veloce", result_answer: false },
//         { title_answer: "Non succede nulla", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Qual è il posto più sicuro per l’operatore del carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In piedi sui carichi", result_answer: false },
//         {
//           title_answer: "A bordo, all’interno della cabina di guida",
//           result_answer: true,
//         },
//         {
//           title_answer: "Dietro al carrello mentre si muove",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "In salita, come si deve trasportare il carico?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Con il carico rivolto a monte", result_answer: true },
//         { title_answer: "Con il carico rivolto a valle", result_answer: false },
//         { title_answer: "Non importa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "In discesa, come si deve trasportare il carico?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Con il carico rivolto a monte", result_answer: true },
//         { title_answer: "Con il carico rivolto a valle", result_answer: false },
//         { title_answer: "Sempre laterale", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "È consentito trasportare persone sul carrello elevatore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, se sono colleghi", result_answer: false },
//         { title_answer: "No, mai", result_answer: true },
//         { title_answer: "Solo se il carrello è vuoto", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Prima di una curva, cosa deve fare l’operatore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Accelerare", result_answer: false },
//         {
//           title_answer: "Suonare il clacson e ridurre la velocità",
//           result_answer: true,
//         },
//         {
//           title_answer: "Sollevare al massimo le forche",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Perché non bisogna sollevare il carico troppo in alto durante il trasporto?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Perché può cadere o sbilanciare il mezzo",
//           result_answer: true,
//         },
//         {
//           title_answer: "Perché il motore consuma di più",
//           result_answer: false,
//         },
//         { title_answer: "Perché rallenta la marcia", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Cosa bisogna indossare obbligatoriamente durante l’uso del carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Scarpe antinfortunistiche e dispositivi di protezione individuale",
//           result_answer: true,
//         },
//         { title_answer: "Un cappello da baseball", result_answer: false },
//         { title_answer: "Una sciarpa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il baricentro del carico deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Spostato il più possibile in avanti",
//           result_answer: false,
//         },
//         {
//           title_answer: "Più vicino possibile al montante",
//           result_answer: true,
//         },
//         { title_answer: "Non ha importanza", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se si deve parcheggiare il carrello, cosa bisogna fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Lasciare il motore acceso e scendere",
//           result_answer: false,
//         },
//         {
//           title_answer:
//             "Abbassare le forche, spegnere il motore e tirare il freno a mano",
//           result_answer: true,
//         },
//         {
//           title_answer: "Spegnere il motore con le forche in alto",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Come vanno posizionate le forche durante la marcia?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Alte al massimo", result_answer: false },
//         { title_answer: "A circa 10-15 cm da terra", result_answer: true },
//         { title_answer: "Appoggiate a terra", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se durante la marcia si scarica la batteria, cosa fare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Continuare fino al termine del turno",
//           result_answer: false,
//         },
//         {
//           title_answer: "Fermarsi in sicurezza e ricaricare la batteria",
//           result_answer: true,
//         },
//         {
//           title_answer: "Usare una prolunga per collegarsi alla presa",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Cosa significa il triangolo di stabilità del carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "L’area dove si deve parcheggiare",
//           result_answer: false,
//         },
//         {
//           title_answer: "La zona di equilibrio che evita il ribaltamento",
//           result_answer: true,
//         },
//         {
//           title_answer: "L’area di lavoro pericolosa per i pedoni",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "È permesso usare il carrello come scala per salire in alto?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, se serve", result_answer: false },
//         { title_answer: "No, è vietato", result_answer: true },
//         {
//           title_answer: "Solo se non ci sono scale disponibili",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Prima di sollevare un carico voluminoso, cosa bisogna valutare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "La sua stabilità e la visibilità durante il trasporto",
//           result_answer: true,
//         },
//         { title_answer: "Solo il peso", result_answer: false },
//         { title_answer: "Solo l’imballaggio", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se un pedone attraversa davanti al carrello, l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Accelerare per passare prima", result_answer: false },
//         { title_answer: "Suonare e continuare", result_answer: false },
//         { title_answer: "Fermarsi e dare la precedenza", result_answer: true },
//       ],
//     },
//     {
//       question_title: "La velocità di un carrello elevatore deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Adeguata all’ambiente e alle condizioni di lavoro",
//           result_answer: true,
//         },
//         { title_answer: "Sempre al massimo consentito", result_answer: false },
//         {
//           title_answer: "Non superiore a quella delle automobili",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Quando si deve girare in spazi stretti, cosa è consigliato?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Tenere il carico alto", result_answer: false },
//         {
//           title_answer: "Procedere lentamente e con attenzione",
//           result_answer: true,
//         },
//         { title_answer: "Andare in retromarcia veloce", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Un pavimento bagnato comporta:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Maggior rischio di slittamento", result_answer: true },
//         {
//           title_answer: "Nessun problema per i carrelli",
//           result_answer: false,
//         },
//         { title_answer: "Miglioramento della frenata", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Le forche devono entrare nel pallet:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Solo a metà", result_answer: false },
//         {
//           title_answer: "Completamente, per garantire stabilità",
//           result_answer: true,
//         },
//         { title_answer: "Solo qualche centimetro", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se il carrello inizia a ribaltarsi, l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Saltare fuori subito", result_answer: false },
//         {
//           title_answer: "Restare seduto e tenersi saldamente",
//           result_answer: true,
//         },
//         {
//           title_answer: "Alzare le forche per bilanciare",
//           result_answer: false,
//         },
//       ],
//     },

//     // Questions 51–75
//     {
//       question_title: "Quando si trasporta un carico lungo, bisogna:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Procedere lentamente e fare attenzione agli ingombri",
//           result_answer: true,
//         },
//         {
//           title_answer: "Mettere le forche molto in alto",
//           result_answer: false,
//         },
//         {
//           title_answer: "Guidare velocemente per ridurre il tempo",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "È possibile superare la portata massima del carrello per brevi tratti?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, se il percorso è breve", result_answer: false },
//         { title_answer: "No, mai", result_answer: true },
//         { title_answer: "Solo se il carrello è nuovo", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il piano di carico deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Regolare e stabile", result_answer: true },
//         { title_answer: "Sempre inclinato", result_answer: false },
//         { title_answer: "Non ha importanza", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Durante la retromarcia l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Girare la testa e controllare la zona dietro",
//           result_answer: true,
//         },
//         { title_answer: "Guardare solo davanti", result_answer: false },
//         {
//           title_answer: "Usare solo gli specchi retrovisori",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Le ruote gemellate servono a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Aumentare la capacità di carico e la stabilità",
//           result_answer: true,
//         },
//         { title_answer: "Ridurre la portata", result_answer: false },
//         { title_answer: "Non hanno utilità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "I freni del carrello devono essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Usati solo in emergenza", result_answer: false },
//         {
//           title_answer: "Sempre efficienti e controllati",
//           result_answer: true,
//         },
//         { title_answer: "Evitati per non usurare", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Se durante la guida l’operatore avverte vibrazioni anomale:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Ignorare il problema", result_answer: false },
//         { title_answer: "Fermarsi e segnalare il guasto", result_answer: true },
//         { title_answer: "Aumentare la velocità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "L’uso del lampeggiante giallo serve a:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Segnalare la presenza del carrello in movimento",
//           result_answer: true,
//         },
//         { title_answer: "Decorare il mezzo", result_answer: false },
//         { title_answer: "Accendere le luci interne", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si attraversa una porta, il carico deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Alto al massimo", result_answer: false },
//         { title_answer: "Abbassato per non urtare", result_answer: true },
//         { title_answer: "Sempre inclinato in avanti", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Le forche devono essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Sempre parallele e alla stessa altezza",
//           result_answer: true,
//         },
//         { title_answer: "Una più alta dell’altra", result_answer: false },
//         { title_answer: "Non importa", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Il ribaltamento laterale del carrello avviene più facilmente:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In curva a velocità elevata", result_answer: true },
//         { title_answer: "In marcia lenta", result_answer: false },
//         { title_answer: "Su terreno piano e liscio", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La stabilità del carrello aumenta quando:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Il carico è vicino al montante", result_answer: true },
//         {
//           title_answer: "Il carico è lontano dal montante",
//           result_answer: false,
//         },
//         {
//           title_answer: "Le forche sono inclinate in avanti",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "È consentito modificare il carrello senza autorizzazione del costruttore?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sì, se si è esperti", result_answer: false },
//         { title_answer: "No, è vietato", result_answer: true },
//         { title_answer: "Solo se serve", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "I percorsi pedonali e quelli dei carrelli devono essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Separati e ben segnalati", result_answer: true },
//         { title_answer: "Sempre gli stessi", result_answer: false },
//         { title_answer: "Non segnalati", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se si sente un rumore anomalo dal carrello:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Fermarsi e segnalarlo", result_answer: true },
//         {
//           title_answer: "Continuare finché non si rompe",
//           result_answer: false,
//         },
//         { title_answer: "Alzare la musica", result_answer: false },
//       ],
//     },
//     {
//       question_title: "In un incrocio con scarsa visibilità, l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Procedere lentamente e suonare", result_answer: true },
//         { title_answer: "Passare veloce", result_answer: false },
//         { title_answer: "Girare senza guardare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Le gomme usurate comportano:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Rischio di slittamento e minore stabilità",
//           result_answer: true,
//         },
//         { title_answer: "Maggiore aderenza", result_answer: false },
//         { title_answer: "Nessun problema", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Prima di fare rifornimento di carburante:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Spegnere il motore", result_answer: true },
//         { title_answer: "Tenere il motore acceso", result_answer: false },
//         { title_answer: "Accelerare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "In caso di incendio sul carrello:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Usare un estintore adatto", result_answer: true },
//         { title_answer: "Continuare a lavorare", result_answer: false },
//         { title_answer: "Gettare acqua sempre", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La visibilità dell’operatore deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sempre garantita", result_answer: true },
//         { title_answer: "Non importante", result_answer: false },
//         { title_answer: "Solo in retromarcia", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Le batterie al piombo rilasciano durante la carica:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Gas pericolosi (idrogeno)", result_answer: true },
//         { title_answer: "Ossigeno puro", result_answer: false },
//         { title_answer: "Nessun gas", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si trasporta un pallet difettoso:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Non va usato", result_answer: true },
//         { title_answer: "Si può usare comunque", result_answer: false },
//         { title_answer: "Va capovolto", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "La manutenzione straordinaria del carrello deve essere eseguita da:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Tecnici specializzati", result_answer: true },
//         { title_answer: "L’operatore stesso", result_answer: false },
//         { title_answer: "Nessuno", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se un carico sporge molto dalle forche:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Non deve essere movimentato senza precauzioni",
//           result_answer: true,
//         },
//         { title_answer: "Va bene lo stesso", result_answer: false },
//         { title_answer: "Basta accelerare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si attraversa una rampa:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Procedere lentamente e mantenere il carico basso",
//           result_answer: true,
//         },
//         { title_answer: "Procedere velocemente", result_answer: false },
//         { title_answer: "Sempre in folle", result_answer: false },
//       ],
//     },
//     // Questions 76–100
//     {
//       question_title:
//         "Quando si parcheggia il carrello su una pendenza, bisogna:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Inserire il freno di stazionamento",
//           result_answer: true,
//         },
//         { title_answer: "Lasciare il motore acceso", result_answer: false },
//         { title_answer: "Mettere le forche in alto", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se si deve spostare un carico molto largo:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Bisogna usare percorsi idonei e segnalare la manovra",
//           result_answer: true,
//         },
//         {
//           title_answer: "Accelerare per ridurre i rischi",
//           result_answer: false,
//         },
//         { title_answer: "Usare sempre il clacson", result_answer: false },
//       ],
//     },
//     {
//       question_title: "È consentito trainare altri mezzi con il carrello?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "No, se non previsto dal costruttore",
//           result_answer: true,
//         },
//         { title_answer: "Sì, sempre", result_answer: false },
//         { title_answer: "Solo con corde improvvisate", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si cambia marcia, bisogna:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Fermarsi completamente se richiesto",
//           result_answer: true,
//         },
//         { title_answer: "Cambiare bruscamente", result_answer: false },
//         { title_answer: "Non usare mai i freni", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Il rischio maggiore per i pedoni nelle aree di lavoro con carrelli è:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Investimento o schiacciamento", result_answer: true },
//         { title_answer: "Rumore", result_answer: false },
//         { title_answer: "Scivolamento", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Prima di iniziare il turno, l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Controllare lo stato del mezzo", result_answer: true },
//         { title_answer: "Salire e partire subito", result_answer: false },
//         {
//           title_answer: "Suonare il clacson per annunciare",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "Se le forche urtano contro scaffali o muri:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Può danneggiare carico e struttura",
//           result_answer: true,
//         },
//         { title_answer: "Non succede nulla", result_answer: false },
//         { title_answer: "Migliora la stabilità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Le cinture e i dispositivi di ritenuta devono essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sempre utilizzati", result_answer: true },
//         { title_answer: "Facoltativi", result_answer: false },
//         { title_answer: "Solo per i principianti", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il limite di velocità interno ai magazzini è:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Quello stabilito dall’azienda", result_answer: true },
//         { title_answer: "Sempre 50 km/h", result_answer: false },
//         { title_answer: "Uguale a quello stradale", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si trasportano più pallet contemporaneamente:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "È consentito solo se previsto dal carrello",
//           result_answer: true,
//         },
//         { title_answer: "Sempre consentito", result_answer: false },
//         { title_answer: "Meglio tenere le forche alte", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La portata indicata sulla targhetta vale:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Con carico sollevato a una certa altezza",
//           result_answer: true,
//         },
//         { title_answer: "Sempre e comunque", result_answer: false },
//         { title_answer: "Solo per i carichi leggeri", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Durante le operazioni vicino a pedoni, bisogna:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Procedere a passo d’uomo", result_answer: true },
//         { title_answer: "Correre per liberare l’area", result_answer: false },
//         { title_answer: "Suonare senza rallentare", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Qual è la funzione delle catene di sollevamento?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Trasmettere il movimento al montante",
//           result_answer: true,
//         },
//         { title_answer: "Fissare il carico", result_answer: false },
//         { title_answer: "Bloccare le ruote", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Le operazioni di ricarica della batteria devono essere svolte:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In aree ventilate", result_answer: true },
//         {
//           title_answer: "In spazi chiusi senza precauzioni",
//           result_answer: false,
//         },
//         { title_answer: "In qualsiasi luogo", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il baricentro del carico dipende da:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Forma, peso e distribuzione del carico",
//           result_answer: true,
//         },
//         { title_answer: "Solo dal peso", result_answer: false },
//         { title_answer: "Solo dal tipo di pallet", result_answer: false },
//       ],
//     },
//     {
//       question_title: "La frenata improvvisa con carico sollevato:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Può causare caduta del carico", result_answer: true },
//         { title_answer: "Non crea problemi", result_answer: false },
//         { title_answer: "Migliora la stabilità", result_answer: false },
//       ],
//     },
//     {
//       question_title: "In caso di dubbio sulla portata di un carico:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Consultare la targhetta o il responsabile",
//           result_answer: true,
//         },
//         { title_answer: "Sollevare lo stesso", result_answer: false },
//         { title_answer: "Provare più volte", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Il ribaltamento longitudinale del carrello avviene più facilmente:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Su pendenze con carico alto", result_answer: true },
//         { title_answer: "Su superficie piana", result_answer: false },
//         { title_answer: "Con carico basso", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il clacson va usato:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "In situazioni di pericolo o scarsa visibilità",
//           result_answer: true,
//         },
//         { title_answer: "Sempre, in continuazione", result_answer: false },
//         { title_answer: "Mai", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Il carico deve essere:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Stabile, bilanciato e sicuro", result_answer: true },
//         { title_answer: "Sempre voluminoso", result_answer: false },
//         { title_answer: "Non importa", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Se si nota una perdita di olio idraulico:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Fermare il mezzo e segnalarlo", result_answer: true },
//         { title_answer: "Continuare fino a fine turno", result_answer: false },
//         {
//           title_answer: "Pulire con un panno e ignorare",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title: "La stabilità del carrello peggiora se:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Si solleva il carico troppo in alto",
//           result_answer: true,
//         },
//         { title_answer: "Si mantiene il carico basso", result_answer: false },
//         { title_answer: "Si procede lentamente", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Quando si trasporta un carico in curva:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Ridurre la velocità e mantenere il carico basso",
//           result_answer: true,
//         },
//         { title_answer: "Aumentare la velocità", result_answer: false },
//         { title_answer: "Sollevare il carico", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "È consentito usare auricolari con musica durante la guida?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "No, perché riduce l’attenzione", result_answer: true },
//         { title_answer: "Sì, sempre", result_answer: false },
//         { title_answer: "Solo in magazzini piccoli", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Alla fine del turno, l’operatore deve:",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Parcheggiare in area sicura, abbassare le forche e spegnere il mezzo",
//           result_answer: true,
//         },
//         { title_answer: "Lasciare il carrello acceso", result_answer: false },
//         { title_answer: "Andarsene senza controlli", result_answer: false },
//       ],
//     },
//     // Questions 101–120 (réponses mélangées)
//     {
//       question_title:
//         "Qual è l’altezza totale massima di un carrello con il montante sollevato?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Sempre 2 metri", result_answer: false },
//         {
//           title_answer: "Dipende dal modello e dalla targhetta di portata",
//           result_answer: true,
//         },
//         { title_answer: "Sempre 3 metri", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Che cosa indica il raggio di sterzata minimo?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "La lunghezza delle forche", result_answer: false },
//         {
//           title_answer: "Lo spazio minimo necessario per girare il carrello",
//           result_answer: true,
//         },
//         {
//           title_answer: "La distanza massima di sollevamento",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Quali sono i principali vantaggi di un carrello elettrico rispetto a uno diesel?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Emissioni elevate", result_answer: false },
//         {
//           title_answer: "Silenzioso e adatto per interni",
//           result_answer: true,
//         },
//         { title_answer: "Più robusto e veloce", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Quali sono gli svantaggi principali dei carrelli diesel?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Non necessitano di manutenzione",
//           result_answer: false,
//         },
//         {
//           title_answer: "Producono gas di scarico e non adatti per interni",
//           result_answer: true,
//         },
//         { title_answer: "Costano meno", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Come deve essere eseguita la lubrificazione ordinaria delle catene di sollevamento?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Con olio minerale SAE 30 - ISO VG100, con carrello a riposo e forche abbassate",
//           result_answer: true,
//         },
//         { title_answer: "Solo in movimento", result_answer: false },
//         { title_answer: "Con acqua e detergente", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Quali precauzioni devono essere prese durante la ricarica della batteria?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "In qualsiasi luogo", result_answer: false },
//         {
//           title_answer:
//             "Usare aree ventilate, pompa speciale per acqua, non fumare, evitare metalli vicino ai poli",
//           result_answer: true,
//         },
//         {
//           title_answer: "Nessuna precauzione, basta collegare la spina",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Cosa succede se le catene di sollevamento si allungano oltre il 2%?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Si possono accorciare manualmente",
//           result_answer: false,
//         },
//         { title_answer: "Devono essere sostituite", result_answer: true },
//         {
//           title_answer: "Possono continuare ad essere usate",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Quali controlli quotidiani devono essere effettuati prima del turno?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Solo controllare se il colore è giusto",
//           result_answer: false,
//         },
//         {
//           title_answer:
//             "Pneumatici, freni, luci, livello olio e acqua, batterie",
//           result_answer: true,
//         },
//         { title_answer: "Nessun controllo", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come deve essere pulito un carrello senza rischi?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Con getti d’acqua ad alta pressione",
//           result_answer: false,
//         },
//         {
//           title_answer:
//             "Con un panno umido, carrello spento, freno a mano tirato, forche abbassate",
//           result_answer: true,
//         },
//         { title_answer: "Solo con aspirapolvere", result_answer: false },
//       ],
//     },
//     {
//       question_title: "A cosa serve la leva di sollevamento a tre posizioni?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Sollevare, abbassare o neutralizzare le forche",
//           result_answer: true,
//         },
//         {
//           title_answer: "Accendere e spegnere il motore",
//           result_answer: false,
//         },
//         { title_answer: "Controllare la batteria", result_answer: false },
//       ],
//     },
//     {
//       question_title: "A cosa serve la leva laterale delle forche?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Spostare le forche a sinistra o a destra",
//           result_answer: true,
//         },
//         { title_answer: "Controllare la velocità", result_answer: false },
//         {
//           title_answer: "Regolare il volume della batteria",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Cosa indica la targhetta di portata rispetto al baricentro del carico?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "La capacità massima sicura in base alla distanza del carico dal montante",
//           result_answer: true,
//         },
//         { title_answer: "Il colore delle forche", result_answer: false },
//         {
//           title_answer: "La velocità massima consentita",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Quando si trasporta un carico voluminoso, cosa bisogna valutare?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Stabilità e visibilità del carico",
//           result_answer: true,
//         },
//         { title_answer: "Solo il colore", result_answer: false },
//         { title_answer: "Solo il peso", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come si devono posizionare le forche durante la marcia?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "A 15–30 cm dal suolo", result_answer: true },
//         { title_answer: "Appoggiate a terra", result_answer: false },
//         { title_answer: "Sempre al massimo", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Qual è la funzione dell’indicatore multifunzione?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Controllare stato batteria, motore, potenza, segnalare guasti",
//           result_answer: true,
//         },
//         {
//           title_answer: "Muovere le forche lateralmente",
//           result_answer: false,
//         },
//         { title_answer: "Suonare il clacson", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Cosa bisogna fare se si nota un odore di gas dal carrello a GPL?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Fermare immediatamente e segnalare il guasto",
//           result_answer: true,
//         },
//         {
//           title_answer: "Accendere una sigaretta per testare",
//           result_answer: false,
//         },
//         { title_answer: "Continuare a lavorare", result_answer: false },
//       ],
//     },
//     {
//       question_title:
//         "Come si deve comportare l’operatore in curva con carico pesante?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         { title_answer: "Accelerare per passare prima", result_answer: false },
//         {
//           title_answer: "Ridurre la velocità e mantenere il carico basso",
//           result_answer: true,
//         },
//         {
//           title_answer: "Sollevare il carico al massimo",
//           result_answer: false,
//         },
//       ],
//     },
//     {
//       question_title:
//         "Quali sono le differenze tra pneumatici pieni e pneumatici gonfi?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Pneumatici pieni adatti a superfici lisce, pneumatici gonfi migliori per esterni o terreni accidentati",
//           result_answer: true,
//         },
//         { title_answer: "Pneumatici pieni più veloci", result_answer: false },
//         { title_answer: "Nessuna differenza", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Come deve essere parcheggiato un carrello su pendenza?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer:
//             "Freno a mano inserito, motore spento, forche abbassate",
//           result_answer: true,
//         },
//         { title_answer: "Motore acceso, forche alte", result_answer: false },
//         { title_answer: "Solo accostato senza freno", result_answer: false },
//       ],
//     },
//     {
//       question_title: "Chi deve effettuare la manutenzione straordinaria?",
//       question_level: "facile",
//       question_duration: 30,
//       answers: [
//         {
//           title_answer: "Centri assistenza o tecnico qualificato",
//           result_answer: true,
//         },
//         { title_answer: "Operatore non formato", result_answer: false },
//         { title_answer: "Chiunque", result_answer: false },
//       ],
//     },
//   ];

//   for (const q of questionsData) {
//     await prisma.question.create({
//       data: {
//         module_id: module.id,
//         question_title: q.question_title,
//         question_level: q.question_level,
//         question_duration: q.question_duration,
//         Answer: { create: q.answers },
//       },
//     });
//   }

//   console.log("Seed terminé avec succès !");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
