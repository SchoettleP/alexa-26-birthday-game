import type { Station } from "../types/hunt";

export const STATIONS: Station[] = [
  {
    id: "station_1_schlafzimmer",
    step: 1,
    room: "Schlafzimmer",
    zone: "Obergeschoss",
    title: "Station 1: Das Fragment im Licht",
    icon: "Moon",
    storyIntro:
      "Irgendwo im Haus wartet deine geheime Geburtstags-Schatzkammer, versiegelt mit einem echten Vorhängeschloss. Der Schlüssel dazu existiert nur ein einziges Mal – verborgen an einem geheimen Ort auf diesem Anwesen. Eine Spur aus kryptischen Raum-Chiffren trennt dich vom Schlüssel und vom Ort der Schatzkammer. Dein erster Hinweis liegt direkt am Schlafplatz...",
    physicalTask: {
      taskType: "code",
      instruction:
        "Öffne die Nachttischschublade und entnimm die ersten beiden Artefakte. Bringe die Fragmente des Faltblatts (Artefakt #1) gegen eine Lichtquelle zusammen. Welcher zweistellige Code schmilzt im Gegenlicht zusammen? (Stecke Artefakt #2 unbedingt in deinen Rucksack!):",
      inputPlaceholder: "Code eingeben...",
      inputType: "text",
      correctCode: "26",
      alternateCodes: ["TRAUM", "BETT", "START", "SCHLUESSEL"],
      decoys: {
        "11": "Falle erwischt! Im Kleiderschrank hängen nur Kleider. Gesucht ist der Umschlag direkt am Schlafplatz!",
        SCHRANK: "Im Kleiderschrank ist die Kleidung ordentlich, aber der Umschlag liegt direkt an der Matratze!",
        KISSEN: "Unter dem Kissen schläft es sich weich, aber schau genauer in die Schublade!",
        WECKER: "Der Wecker tickt brav, birgt aber keine Nachricht!",
      },
      hints: [
        "Achte auf die rote Falzlinie in der Mitte des Blattes.",
        "Knicke das Blatt an der Linie und halte es gegen eine Lichtquelle (Lampe oder Fenster).",
        "Notlösung: Durch das Gegenlicht verschmelzen die Linienfragmente zur Zahl 26.",
      ],
    },
    inventoryAwarded: {
      id: "lochstreifen",
      name: "Tastatur-Chiffrekarte",
      icon: "KeyRound",
      description:
        "Ein Protokoll mit den Tastatur-Koordinaten C4 · B9 · C8 · B7 · C2. Stecke sie ein – du brauchst sie im Arbeitszimmer!",
      stationAcquired: 1,
      badge: "Artefakt #2",
    },
    unlockedStory:
      "Erster Code verifiziert! Die Zahl 26 hat die Fährte eröffnet. Stecke die Tastatur-Chiffrekarte gut ein – sie wird noch eine entscheidende Rolle spielen. Eine Notiz weist den Weg ins Freie...",
  },
  {
    id: "station_2_balkon",
    step: 2,
    room: "Balkon",
    zone: "Obergeschoss",
    title: "Station 2: Der schwebende Himmelsstürmer",
    icon: "Mountain",
    storyIntro:
      "Wohin führt die nächste Spur? Das Rätsel lautet: ‚Verlasse die vier Wände, ohne das obere Stockwerk zu verlassen. Tritt hinaus auf die Freiluft-Plattform mit weitem Blick über das Anwesen. Blicke nach oben: Dort schwebt ein stiller Himmelsstürmer, der normalerweise mit heißer Luft in die Wolken steigt...‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Tritt hinaus auf den Balkon und blicke nach oben zur Heißluftballon-Lampe! Greife in den Korb des Ballons: Dort hat der Schlüsselmeister ein Dokument versteckt. Löse das Rätsel der Gondel und gib das Lösungswort ein:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "BALLON",
      alternateCodes: ["HEISSLUFTBALLON", "KORB", "AUFTRIEB", "LUFT", "LAMPE", "WIND"],
      decoys: {
        "84": "Falle erwischt! Frische Luft stimmt zwar, aber du bist viel zu tief gelaufen! Gesucht ist eine Freiluft-Plattform auf der oberen Etage!",
        GARTEN: "Falle erwischt! Du bist ganz unten im Garten gelandet. Gesucht ist der erhöhte Ausguck im Obergeschoss mit der schwebenden Ballon-Lampe!",
        TERRASSE: "Die Terrasse liegt zu tief! Geh nach oben und tritt dort hinaus!",
        RASEN: "Auf dem Rasen stehst du zwar im Freien, aber die Heißluftballon-Lampe schwebt oben auf dem Balkon!",
      },
      hints: [
        "Bleibe auf der oberen Schlafetage.",
        "Tritt hinaus auf den Balkon und blicke an die Decke zur Heißluftballon-Lampe.",
        "Greife in den Korb des Ballons nach dem Hinweiskärtchen.",
        "Notlösung: Das Lösungswort lautet BALLON.",
      ],
    },
    unlockedStory:
      "Himmelsstürmer gemeistert! Das Wort BALLON bestätigt die luftige Lampe. Im Korb haftet die nächste Spur: ‚Der Schlüssel liegt nicht draußen in der Luft. Die Fährte führt zurück ins Haus in ein enges Nadelöhr...‘",
  },
  {
    id: "station_3_flur_klein",
    step: 3,
    room: "Flur klein",
    zone: "Obergeschoss",
    title: "Station 3: Das schmale Nadelöhr",
    icon: "Footprints",
    storyIntro:
      "Das Rätsel lautet: ‚Zurück im Inneren. Gesucht ist kein Aufenthaltsraum, sondern ein schmaler, unscheinbarer Verbindungsgang dieser Etage. Hier kreuzen sich die Pfade, mehrere Türen stehen Spalier und eine steile Stiege wartet auf mutige Schritte.‘",
    physicalTask: {
      taskType: "directional",
      instruction:
        "Tritt in den schmalen Verbindungsgang vor die Stiege und finde das dort hinterlegte Richtungs-Protokoll. Es beschreibt den Aufstiegspfad: Gib die 4-teilige Pfeil-Kombination über das D-Pad in das Schloss ein:",
      directional: {
        gridTitle: "Stiegen-Aufstiegspfad",
        targetSequence: ["UP", "UP", "RIGHT", "UP"],
      },
      correctCode: "15",
      alternateCodes: ["STIEGE", "TREPPE", "DURCHGANG", "STUFEN"],
      decoys: {
        "99": "Falle erwischt! Hier ist viel zu viel Platz! Gesucht war nicht die breite Hauptachse mit der Garderobe, sondern der engere Verbindungsgang mit der Stiege!",
        GROSSERFLUR: "Zu weitläufig! Gesucht ist der kleine, schmale Durchgang mit der Stiege!",
        GARDEROBE: "An der Garderobe bist du falsch. Geh zurück in das schmale Nadelöhr!",
      },
      hints: [
        "Untersuche den Antritt der Stiege nach dem Richtungs-Protokoll.",
        "Lies die 4 Pfeilschritte (▲ ▲ ▶ ▲) von oben nach unten auf dem Kärtchen ab.",
        "Notlösung: Drücke ▲, ▲, ▶, ▲ auf dem D-Pad.",
      ],
    },
    unlockedStory:
      "Richtungspfad verifiziert! Die Stiegen-Kombination öffnet den Weg: ‚Die Fährte führt steil hinauf ins Gebälk, ganz nah an den Dachfirst...‘",
  },
  {
    id: "station_4_dachboden",
    step: 4,
    room: "Dachgeschoss (Dachwohnung)",
    zone: "Dachgeschoss",
    title: "Station 4: Das Refugium unter den Schrägen",
    icon: "Sparkles",
    storyIntro:
      "Das Rätsel lautet: ‚Erklimme die Stufen bis ganz nach oben unter die Schrägen. Gesucht ist die gemütliche Dachgeschoss-Wohnung ganz oben im Haus, wo die schrägen Fenster den weiten Blick nach draußen freigeben.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Gehe hinauf in die Dachwohnung und untersuche die Fensterbank des Dachfensters nach dem Hinweiskärtchen. Löse das Himmels-Rätsel und gib das Lösungswort ein:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "HIMMEL",
      alternateCodes: ["33", "WOLKE", "DACH", "DACHGESCHOSS", "FENSTER", "AUSSICHT", "STERNE", "GIEBEL", "FIRST"],
      decoys: {
        "52": "Falle erwischt! Du bist auf der falschen Etage gelandet! Geh ganz nach oben unter die Dachschrägen!",
        KELLER: "Ganz falsche Richtung! Du bist in den Keller gelaufen! Das gesuchte Refugium liegt ganz oben im Dachgeschoss!",
        BALKON: "Draußen warst du vorhin schon! Geh hinauf in die Dachgeschoss-Wohnung!",
      },
      hints: [
        "Steige die Treppe bis ganz nach oben in die Dachwohnung.",
        "Suche am schrägen Dachfenster / auf der Fensterbank nach der Hinweis-Karte.",
        "Notlösung: Das gesuchte Lösungswort lautet HIMMEL.",
      ],
    },
    unlockedStory:
      "Himmelsblick gemeistert! Das Wort HIMMEL öffnet die nächste Spur: ‚Genug der Aussicht unter den Dachschrägen! Die Fährte zieht hinab zu fließendem Wasser und glänzenden Spiegeln...‘",
  },
  {
    id: "station_5_bad",
    step: 5,
    room: "Bad",
    zone: "Obergeschoss",
    title: "Station 5: Die optische Täuschung",
    icon: "Droplets",
    storyIntro:
      "Das Rätsel lautet: ‚Nach dem staubigen Gebälk ruft das nasse Element. Gesucht ist der geflieste Raum voller Spiegel, Armaturen und Keramik zur Erfrischung und Pflege. Doch Vorsicht: Es gibt mehr als einen Raum mit fließendem Nass!‘",
    physicalTask: {
      taskType: "safe",
      instruction:
        "Finde das Kärtchen (Artefakt #3) im Badezimmer. Entziffere die verborgene Botschaft und gib den Code ein (oder stelle die 3 Räder des Schlosses ein):",
      hints: [
        "Die Digitalanzeige wirkt auf den ersten Blick wie eine normale Zahl – doch trügt der Schein?",
        "Ein reflektierendes Objekt in diesem Raum bringt die wahre Natur der Ziffern ans Licht.",
        "Notlösung: Im Badezimmerspiegel wird aus der Anzeige 55 die Zahl 22 (der Code lautet 22 bzw. Drehschloss 0, 2, 2).",
      ],
      safeDial: {
        dialLabels: ["Z1", "Z2", "Z3"],
        targetCombination: [0, 2, 2],
      },
      correctCode: "22",
      alternateCodes: [
        "22",
        "022",
        "BAD22",
        "BAD-22",
        "CODE22",
        "CODE-22",
        "BAD22CODE",
        "CODE22BAD",
        "TMX22",
        "TMX-22",
        "52",
        "25",
        "55",
        "WASSER",
        "44",
      ],
      decoys: {
        "55": "Falle erwischt! Du hast die Digitalanzeige mit bloßem Auge abgelesen! Die Ziffern täuschen: Im Badezimmerspiegel kehren sich 7-Segment-Ziffern um – aus 55 wird 22! Halte die Karte vor den Spiegel!",
        CODE55BAD:
          "Falle erwischt! Du hast die Anzeige ohne Spiegel abgelesen! Achte auf die spiegelverkehrten Buchstaben (CODE und BAD) und halte die Karte vor den Badezimmerspiegel!",
        BAD55CODE:
          "Falle erwischt! Du hast die Anzeige ohne Spiegel abgelesen! Achte auf die spiegelverkehrten Buchstaben (CODE und BAD) und halte die Karte vor den Badezimmerspiegel!",
        "12": "Falle erwischt! Das Wasser plätschert hier zwar, aber dieser Raum ist viel zu klein! Wo kann man sich von Kopf bis Fuß abduschen und in die Wanne steigen?",
        WC: "Im Gäste-WC gibt es zwar ein Waschbecken, aber keine Dusche oder Badewanne! Suche das große Bad!",
        GAESTEWC: "Gäste-WC ist zu winzig! Das richtige Badezimmer hat Wanne und Dusche!",
      },
    },
    unlockedStory:
      "Spiegel-Täuschung durchschaut! Im Spiegelbild verwandelte sich die 55 in eine glasklare 22: ‚Wasser schadet dem Vorhängeschloss! Die Fährte führt weiter zur Kammer der nützlichen Vorräte...‘",
  },
  {
    id: "station_6_abstellkammer",
    step: 6,
    room: "Abstellkammer",
    zone: "Obergeschoss",
    title: "Station 6: Die Kammer der Vorräte",
    icon: "Package",
    storyIntro:
      "Das Rätsel lautet: ‚Hinter einer schmalen Tür verbirgt sich das organisierte Chaos: Ein fensterloser Raum voller Regale, Vorräte, Putzutensilien und Haushaltsgeräte auf dieser Etage.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Durchsuche die Abstellkammer nach dem dort hinterlegten Hinweiskärtchen. Finde den Pfad durch das Regal-Wortgitter und gib das Lösungswort ein:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "VORRAT",
      alternateCodes: ["68", "RUMPEL", "CHAOS"],
      decoys: {
        BESEN: "Falle erwischt! Der Besen steht zwar im Regal, aber das gesuchte Wort hat 6 Buchstaben und liegt schräg!",
        KARTON: "Falle erwischt! Ein Karton steht hier zwar, aber das gesuchte Hauptwort liegt schräg im Gitter!",
        EIMER: "Falle erwischt! Der Eimer ist nur ein Hilfsmittel, nicht der wahre Zweck der Kammer!",
        DOSE: "Falle erwischt! Dosen stehen hier viele, aber das gesuchte Wort hat 6 Buchstaben!",
        REGAL: "Falle erwischt! Auf dem Regal stehen die Dinge, aber das gesuchte Wort liegt diagonal im Gitter!",
        "31": "Falle erwischt! Du bist zu tief gelaufen! Suche nicht im Keller. Die gesuchte Abstellkammer liegt direkt hier oben auf der Schlafetage!",
        KELLER: "Falsche Etage! Lauf nicht in den Keller hinab, die Kammer ist hier im Obergeschoss!",
        PUTZSCHRANK: "Im Küchenschrank steht zwar auch Spülmittel, aber gesucht ist eine echte begehbare Kammer im OG!",
      },
      hints: [
        "Bleibe im Obergeschoss und durchsuche die Regale der Kammer.",
        "Folge dem markierten Pfeil durch das Buchstaben-Gitter.",
        "Notlösung: Das Lösungswort lautet VORRAT.",
      ],
    },
    unlockedStory:
      "Kammer der Vorräte gemeistert! Das Wort VORRAT entriegelt die Kammer: ‚Zwischen Putzlappen liegt der Schlüssel nicht! Begib dich dorthin, wo konzentriert gearbeitet und Notizen studiert werden...‘",
  },
  {
    id: "station_7_arbeitszimmer",
    step: 7,
    room: "Arbeitszimmer",
    zone: "Obergeschoss",
    title: "Station 7: Das Eingabe-Terminal",
    icon: "BookOpen",
    storyIntro:
      "Das Rätsel lautet: ‚Ein Raum des Wissens, der Pläne und Bildschirme. Wo Bücherreihen stehen, Dokumente sortiert werden und der Schreibtisch das Zentrum bildet.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "KOMBI-RÄTSEL: Nimm das Koordinaten-Protokoll (Artefakt #2) aus deinem Rucksack. Tritt an die Computertastatur im Arbeitszimmer und entschlüssele die 5 Koordinaten: C4 – B9 – C8 – B7 – C2. Welches Lösungswort verbirgt sich dahinter?",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "FOKUS",
      alternateCodes: ["82", "BUCH", "SCHREIBTISCH", "F-O-K-U-S", "F O K U S"],
      decoys: {
        "47": "Falle erwischt! Hier auf dem Sofa wird gemütlich gelesen, aber nicht gearbeitet! Gesucht ist der Schreibtisch!",
        TASTATUR:
          "Du stehst genau vor dem richtigen Gerät! Entschlüssele die 5 Koordinaten deines Protokolls an den Tasten!",
        LESEN: "Die Leseecke ist gemütlich, aber nicht das gesuchte Arbeitszimmer!",
        SOFA: "Auf der Couch wird entspannt, geh an den echten Schreibtisch!",
        SCHREIBTISCH:
          "Am Schreibtisch bist du goldrichtig! Nutze das Protokoll auf der Tastatur!",
      },
      hints: [
        "Die Kalibrierung auf dem Protokoll verrät: C1 entspricht dem Buchstaben A. Sondertasten wie CapsLock oder Tab werden nicht mitgezählt.",
        "Buchstabe = Buchstabenreihe von oben nach unten (B = QWERTZ, C = ASDF). Zahl = Buchstabe von links.",
        "Notlösung: Die Koordinaten ergeben das Wort FOKUS (oder Code 82).",
      ],
    },
    requiredInventoryId: "lochstreifen",
    unlockedStory:
      "Fokus bewiesen! Die Tastatur-Koordinaten haben das Wort FOKUS enthüllt. In den Notizen stand: ‚Der Schlüssel liegt nicht bei den Büchern. Gönn dir eine kurze Pause am isoliertesten Ort der Etage...‘",
  },
  {
    id: "station_8_wc",
    step: 8,
    room: "WC",
    zone: "Obergeschoss",
    title: "Station 8: Das isolierte Refugium",
    icon: "Sparkles",
    storyIntro:
      "Das Rätsel lautet: ‚Der nächste Hinweis liegt im kleinsten, isoliertesten Rückzugsort dieser Etage. Ein einzelner, fensterloser Raum, reduziert auf das absolute Minimum für ungestörte Momente abseits des großen Bades.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Durchsuche das kleine WC nach dem dort hinterlegten Hinweiskärtchen. Entwirre die Buchstaben-Chiffre und gib das Lösungswort ein:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "ECHO",
      alternateCodes: ["28", "PAUSE", "STILLE", "WC"],
      decoys: {
        "71": "Falle erwischt! Schon wieder im großen Badezimmer? Gesucht ist das kleine, separate Gäste-WC!",
        BAD: "Du bist wieder im großen Bad gelandet! Gesucht ist das separate kleine WC!",
        BADEWANNE: "In der Wanne sitzt du falsch. Geh in das kleine WC!",
      },
      hints: [
        "Gehe in das separate kleine WC des Obergeschosses.",
        "Bringe die Buchstaben des Kärtchens in die sinnvolle Reihenfolge.",
        "Notlösung: Das Lösungswort lautet ECHO.",
      ],
    },
    unlockedStory:
      "Chiffre gelöst! Das Wort ECHO hallt wider: ‚Pause beendet! Die Fährte des Schlüssels zieht über die große Hauptachse des Hauses hinab in tiefere Gefilde...‘",
  },
  {
    id: "station_9_flur_gross",
    step: 9,
    room: "Flur groß",
    zone: "Obergeschoss",
    title: "Station 9: Die zentrale Hauptachse",
    icon: "Compass",
    storyIntro:
      "Das Rätsel lautet: ‚Tritt heraus auf die zentrale Lebensader des oberen Reiches. Die breite Hauptachse, an der Mäntel und Jacken hängen, Schuhe Spalier stehen und von der fast alle Türen abzweigen.‘",
    physicalTask: {
      taskType: "qr",
      instruction:
        "Finde das Kontrollschild (Artefakt #4) an der großen Garderobe. Scanne den QR-Code mit der Handykamera oder gib den Sicherheitscode manuell ein:",
      hints: [
        "Gehe zur großen Garderobe im Hauptflur.",
        "Halte die Kamera auf das dort angebrachte Schild oder tippe die Zahl ab.",
        "Notlösung: Der Code lautet 95 (oder ACHSE).",
      ],
      qrScan: {
        expectedPayload: "ALEXA_FLUR_26",
        instructionText: "Halte die Kamera auf das QR-Schild an der Flurgarderobe oder tippe den Code ab.",
        manualFallbackCode: "95",
      },
      correctCode: "95",
      alternateCodes: ["ACHSE", "GARDEROBE", "FLUR"],
      decoys: {
        "19": "Falle erwischt! Nicht wieder in das schmale Nadelöhr zur Stiege laufen! Gesucht ist die breite Garderobe im Hauptflur!",
        KLEIN: "Der kleine Flur war vorhin dran! Jetzt bist du auf dem großen Flur gefragt!",
        TREPPE: "Nicht an der schmalen Stiege suchen, sondern bei der großen Garderobe!",
      },
    },
    unlockedStory:
      "Hauptachse passiert! An der Garderobe haftet die nächste Anweisung: ‚Verlasse das Haupthaus über die Treppe nach unten in das separate Nebenreich...‘",
  },
  {
    id: "station_10_einliegerwohnung",
    step: 10,
    room: "Untere Einliegerwohnung",
    zone: "Untergeschoss",
    title: "Station 10: Das separate Areal",
    icon: "Key",
    storyIntro:
      "Das Rätsel lautet: ‚Verlasse das gewohnte Terrain. Gesucht ist eine eigenständige Wohneinheit unter demselben Dach – mit eigener Tür und privatem Bereich, abseits des Haupttrubels.‘",
    physicalTask: {
      taskType: "directional",
      instruction:
        "Begib dich in die untere Einliegerwohnung und finde das dort hinterlegte Navigations-Chart. Gib die 4-teilige Pfeil-Kombination des Abstiegs in das Schloss ein:",
      directional: {
        gridTitle: "Keller-Abstiegspfad",
        targetSequence: ["LEFT", "DOWN", "RIGHT", "DOWN"],
      },
      correctCode: "53",
      alternateCodes: ["STUDIO", "WOHNUNG", "SEPARAT"],
      decoys: {
        "87": "Falle erwischt! Verkehrte Richtung! Nicht wieder hinauf ins Gebälk, sondern hinab in das untere separate Reich!",
        OBEN: "Nicht nach oben steigen! Die gesuchte Einliegerwohnung liegt weiter unten!",
        DACH: "Oben warst du schon! Der Weg führt dich nach unten!",
      },
      hints: [
        "Suche auf dem Tisch oder im Eingangsbereich der Einliegerwohnung nach dem Navigations-Chart.",
        "Lies die 4 Richtungspfeile (◀ ▼ ▶ ▼) auf dem Kärtchen ab.",
        "Notlösung: Drücke ◀, ▼, ▶, ▼ auf dem D-Pad.",
      ],
    },
    unlockedStory:
      "Areal erreicht! Der Keller-Abstiegspfad öffnet die Tür: ‚Der Schlüsselmeister wanderte noch tiefer hinab: Dorthin, wo ewige, eisige Kälte herrscht...‘",
  },
  {
    id: "station_11_keller",
    step: 11,
    room: "keller",
    zone: "Untergeschoss",
    title: "Station 11: Das kalte Fundament",
    icon: "Snowflake",
    storyIntro:
      "Das Rätsel lautet: ‚Steige hinab ins kälteste Fundament des Hauses. Dicke Steinwände, feuchte Kälte und Vorräte, die vor Verderb geschützt werden. Wo herrscht ewiger Winter?‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Finde die Kälte-Karte (Artefakt #5) im Kellergewölbe. Sie birgt eine fundamentale Zahl für das Finale. Welche Kältezahl steht darauf? (Nimm die Karte unbedingt mit in deinen Rucksack!):",
      inputPlaceholder: "Kältezahl eingeben...",
      inputType: "text",
      correctCode: "4",
      alternateCodes: ["14", "EISKALT", "KUEHL", "WINTER", "FROST"],
      decoys: {
        "07": "Haha, eiskalt erwischt! Im Kühlschrank frieren zwar Milch und Joghurt, aber gesucht ist ein ganzer, begehbarer Raum ganz tief unten im Fundament des Hauses!",
        KUEHLSCHRANK: "Falle erwischt! Der Kühlschrank in der Küche ist zwar kalt, aber gesucht ist ein ganzer Raum tief im Keller!",
        GEFRIERFACH: "Im Gefrierfach ist es frostig, aber der gesuchte Ort hat echte Steinwände im Kellergeschoss!",
      },
      hints: [
        "Verlasse die Wohnräume und gehe tief in den Keller hinab.",
        "Suche am Metallregal im Vorratskeller nach der blauen Karte.",
        "Notlösung: Die Kälte-Konstante lautet 4.",
      ],
      photoChallenge: {
        challengeTitle: "Das Zitter-Selfie im Eiskeller!",
        prompt: "Knipse ein lustiges Zitter-Foto mit Gänsehaut-Blick für dein Geburtstags-Album!",
        badgeText: "Eiskeller-Expedition",
        cameraFacing: "user",
      },
    },
    inventoryAwarded: {
      id: "kaeltekarte",
      name: "Eiskristall-Karte",
      icon: "Snowflake",
      description: "Elementar-Konstante I: KÄLTE = 4. Gut aufbewahren!",
      stationAcquired: 11,
      badge: "KÄLTE = 4",
    },
    unlockedStory:
      "Kaltes Fundament bezwungen! Kälte-Konstante 4 ist im Rucksack verstaut. Ein Pfeil zeigt zur nächsten Tür: ‚Doch der Schlüsselmeister brauchte Werkzeug zur Vorbereitung des Verstecks. Geh hinüber in die Werkstatt...‘",
  },
  {
    id: "station_12_keller",
    step: 12,
    room: "keller",
    zone: "Untergeschoss",
    title: "Station 12: Der Werkbank-Mechanismus",
    icon: "Wrench",
    storyIntro:
      "Das Rätsel lautet: ‚Wo Metall bearbeitet wird, Späne fallen und Werkzeuge an Lochwänden hängen. Gesucht ist der Raum des Handwerks mit schwerem Schraubstock.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Am Schraubstock der Werkbank klemmt ein codierter Papierstreifen (Artefakt #6). Falte den Streifen im Zick-Zack (Leporello-Falz) zusammen: Welches 8-buchstabige Wort schließt sich an den vorderen Kanten zusammen?:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "SCHRAUBE",
      alternateCodes: ["WERKBANK", "WERKSTATT", "SCHRAUBSTOCK"],
      decoys: {
        "38": "Falle erwischt! In der Garage parken die Fahrzeuge und Reifen! Die gesuchte Handwerker-Werkbank mit Schraubstock liegt drinnen im Kellergewölbe!",
        GARAGE:
          "In der Garage riecht es nach Motoren, aber der gesuchte Werkstattbereich liegt hier im Keller!",
        AUTO: "Nicht beim Auto suchen! Die Werkbank liegt im Keller!",
      },
      hints: [
        "Untersuche das Faltband.",
        "Falte den Streifen wie eine Ziehharmonika: Die Segmente mit Dreieck nach oben (▲) bleiben vorn, die Segmente mit Dreieck nach unten (▼) klappen nach hinten weg.",
        "Notlösung: Das Lösungswort lautet SCHRAUBE.",
      ],
    },
    unlockedStory:
      "Werkstatt gemeistert! Das Faltband hat das Wort SCHRAUBE offenbart. Auf einem Zettel stand: ‚Hier wurde an der Schatulle gefeilt! Folge nun den dicken, warmen Rohren an der Decke zum wärmenden Kessel...‘",
  },
  {
    id: "station_13_heizungsraum",
    step: 13,
    room: "Heizungsraum (Auch im Keller)",
    zone: "Untergeschoss",
    title: "Station 13: Der thermische Gegenpol",
    icon: "Flame",
    storyIntro:
      "Das Rätsel lautet: ‚Vom Eiskeller zum feurigen Gegenpol. Gesucht ist das technische Kraftwerk des Gebäudes, das heißes Wasser durch Rohre pumpt und das gesamte Anwesen wärmt.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Untersuche den Heizkessel nach der Feuer-Karte (Artefakt #7). Sie ist das Gegenstück zur Kälte-Karte. Welche Wärmezahl steht darauf? (Nimm sie unbedingt mit in deinen Rucksack!):",
      inputPlaceholder: "Wärme-Konstante...",
      inputType: "text",
      correctCode: "3",
      alternateCodes: ["73", "KESSEL", "WAERME", "FEUER"],
      decoys: {
        "29": "Falle erwischt! Am Kamin im Wohnzimmer lodert zwar Gemütlichkeit, aber das technische Kraftwerk steht im Heizungskeller!",
        KAMIN: "Der Kamin wärmt das Sofa, aber das zentrale Heizkraftwerk liegt im Keller!",
        OFEN: "Nicht der Kaminofen oben! Gesucht ist der echte Heizkessel unten!",
      },
      hints: [
        "Gehe in den Heizungsraum im Keller.",
        "Prüfe die Rohrleitungen oder das Manometer direkt am Heizkessel nach der roten Karte.",
        "Notlösung: Die Wärme-Konstante lautet 3.",
      ],
    },
    inventoryAwarded: {
      id: "feuerkarte",
      name: "Feuer-Karte",
      icon: "Flame",
      description: "Elementar-Konstante II: WÄRME = 3. Das Gegenstück zur Kälte aus dem Eiskeller!",
      stationAcquired: 13,
      badge: "WÄRME = 3",
    },
    unlockedStory:
      "Heizungsraum decodiert! Wärme-Konstante 3 ist im Gepäck. Jetzt hast du beide Pole: Kälte (4) und Wärme (3)! Ein Wegweiser führt nach draußen zu den Motoren...",
  },
  {
    id: "station_14_garage",
    step: 14,
    room: "Garage",
    zone: "Außenbereich",
    title: "Station 14: Die Maschinen-Halle",
    icon: "Car",
    storyIntro:
      "Das Rätsel lautet: ‚Wo Motoren ruhen und Reifen lagern. Gesucht ist der geschützte Unterschlupf für rollende Gefährte mit großem Tor, Werkzeugwänden und Benzinduft.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Durchsuche die Garage nach der dort hinterlegten Hinweiskarte. Löse den Getriebe-Mechanismus vor Ort und gib das Lösungswort ein:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "MOTOR",
      alternateCodes: ["89", "BOLIDE", "GARAGE", "ANTRIEB"],
      decoys: {
        "41": "Falle erwischt! Draußen unterm Carport pfeift der Wind! Der gesuchte Wagen-Unterschlupf hat vier feste Wände und ein großes Tor!",
        CARPORT: "Der Carport ist nur ein Unterstand! Gesucht ist die geschlossene Garage!",
        EINFAHRT: "Auf der Einfahrt steht man im Regen! Geh in die Garage!",
      },
      hints: [
        "Betrete das Innere der Garage.",
        "Suche am Werkzeugregal oder in der Nähe des Fahrzeugs nach dem Kärtchen.",
        "Notlösung: Das Lösungswort lautet MOTOR.",
      ],
    },
    unlockedStory:
      "Getriebe decodiert! Das Wort MOTOR öffnet das Garagentor: ‚Der Schlüsselmeister hat die Garage verlassen und ist hinaus in die grüne Natur gewandert...‘",
  },
  {
    id: "station_15_garten",
    step: 15,
    room: "Garten",
    zone: "Außenbereich",
    title: "Station 15: Die unteilbare Natur",
    icon: "TreePine",
    storyIntro:
      "Das Rätsel lautet: ‚Tritt hinaus unter den freien Himmel in das weiteste Areal des Grundstücks. Echtes Grün unter den Füßen, frische Luft und wachsende Natur.‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "Tritt hinaus in den Garten und finde das dort an einem Zweig oder Strauch befestigte Hinweiskärtchen. Entziffere die Botanik-Chiffre und gib das Lösungswort ein:",
      inputPlaceholder: "Lösungswort eingeben...",
      inputType: "text",
      correctCode: "FLORA",
      alternateCodes: ["37", "NATUR", "GARTEN", "GRUEN", "BLUME"],
      decoys: {
        "16": "Falle erwischt! Von oben herab auf die Blumen schauen zählt nicht! Geh mit beiden Füßen auf den echten Rasen in den Garten!",
        BALKON: "Du stehst schon wieder auf dem Balkon! Geh runter auf den Rasen in den Garten!",
        TERRASSE: "Bleib nicht auf den Steinplatten der Terrasse stehen, geh hinaus ins weite Grün!",
      },
      hints: [
        "Gehe hinaus in den Garten und suche an einer Pflanze oder einem Baum nach der Karte.",
        "Ordne die Buchstaben den Blüten-Symbolen zu.",
        "Notlösung: Das Lösungswort lautet FLORA.",
      ],
      photoChallenge: {
        challengeTitle: "Natur-Power Selfie im Garten!",
        prompt: "Knipse ein strahlendes Geburtstags-Selfie im Garten für deine Erinnerungswand!",
        badgeText: "Garten-Idylle",
        cameraFacing: "user",
      },
    },
    unlockedStory:
      "Garten-Rätsel gelöst! Am Zweig flattert das vorletzte Kartenstück: ‚Der Schlüssel ist zurück im Haus! Folge dem Duft nach frischem Geburtstagskuchen in die Küche...‘",
  },
  {
    id: "station_16_kueche",
    step: 16,
    room: "Küche",
    zone: "Erdgeschoss",
    title: "Station 16: Die Fusion der Elemente & Der Schlüssel",
    icon: "Key",
    storyIntro:
      "Das Rätsel lautet: ‚Folge der Spur der Düfte in die kulinarische Schaltzentrale des Hauses, wo gekocht, gebacken und vorbereitet wird. Hier hat der Schlüsselmeister den echten Schlüssel zur Schatzkammer verborgen!‘",
    physicalTask: {
      taskType: "code",
      instruction:
        "KOMBI-RÄTSEL: Hier treffen die gesammelten Elemente zusammen! Kombiniere die Element-Konstanten aus deinem Rucksack mit den Kochzonen dieses Raumes:\n\nFormel: (KÄLTE × WÄRME) + Anzahl der Kochzonen auf dem Herd.\n\nGib den Master-Code ein, um das Schlüsselversteck in der Küche zu entriegeln:",
      inputPlaceholder: "Zahl eingeben...",
      inputType: "text",
      correctCode: "16",
      alternateCodes: ["REZEPT", "KUECHE", "KUCHEN", "HERD", "SCHLUESSEL"],
      decoys: {
        "12": "Falle erwischt! 4 × 3 = 12 ist erst der halbe Weg! Addiere noch die 4 Herdplatten auf dem Kochfeld hinzu!",
        "7": "Du hast addiert statt multipliziert! Formel: Erst (Kälte × Wärme), dann + Herdplatten!",
        "4": "Das ist nur die Kälte-Konstante aus dem Eiskeller!",
        "3": "Das ist nur die Wärme-Konstante vom Heizkessel!",
        ESSTISCH: "Am Esstisch sitzt man gemütlich, aber die Töpfe kochen auf dem Herd!",
      },
      hints: [
        "Schau in deinen Rucksack nach der Kälte- (4) und Wärme-Konstante (3).",
        "Zähle die Kochzonen des Herdes (4) und rechne: (4 × 3) + 4 = 16.",
        "Notlösung: (4 × 3) + 4 = 16.",
      ],
    },
    inventoryAwarded: {
      id: "schatzschluessel",
      name: "Schlüssel zur Schatzkammer",
      icon: "Key",
      description: "Der echte physische Schlüssel zum Vorhängeschloss der Schatzkammer! Gefunden in der Küche.",
      stationAcquired: 16,
      badge: "ECHTER SCHLÜSSEL",
    },
    unlockedStory:
      "🗝️ DER ECHTE SCHLÜSSEL IST GEFUNDEN! Code 16 hat das Geheimfach geöffnet! Greife in der Küche hinter die Kaffeemaschine (oder in die Besteckschublade) – dort liegt der echte, physische Schlüssel zur Schatzkammer! Nimm ihn an dich! Doch welche Tür im ganzen Haus sperrt er auf? Wo liegt die geheime Schatzkammer? Eile ins Wohnzimmer für das finale Orts-Rätsel!",
  },
  {
    id: "station_17_wohnzimmer",
    step: 17,
    room: "Wohnzimmer",
    zone: "Erdgeschoss",
    title: "Station 17: Das Geheimnis der Schatzkammer",
    icon: "Crown",
    storyIntro:
      "Du hältst den echten Schlüssel zur Schatzkammer fest in deinen Händen – aber wo im Haus verbirgt sich die geheime Schatzkammer mit deinem Geburtstagsgeschenk? Welcher Raum wurde mit dem schweren Vorhängeschloss versiegelt?",
    physicalTask: {
      taskType: "code",
      instruction:
        "DAS FINALE ORTS-RÄTSEL: Um den genauen Raum der Schatzkammer zu enttarnen, vereine die zwei Grundzahlen deiner Reise:\n\n1. Dein Start-Code aus Station 1 (26)\n2. Der Küchen-Code aus Station 16 (16)\n\nAddiere beide Zahlen (26 + 16 = ?): Welcher Master-Code enthüllt, wo die Schatzkammer liegt?:",
      inputPlaceholder: "Mastercode eingeben...",
      inputType: "text",
      correctCode: "42",
      alternateCodes: ["SCHATZKAMMER", "KELLER", "ALEXA26", "26", "16", "FINALE", "SCHATZ", "TUER", "VORHAENGESCHLOSS"],
      decoys: {
        "90": "Falle erwischt! Das Finale und das Geheimnis der Schatzkammer warten hier!",
        BETT: "Zurück ins Bett geht es erst nach der Feier! Das Finale wartet im Wohnzimmer!",
        "1234": "Zu gewöhnlich! Vereine deinen Start-Code (26) und deinen Küchen-Code (16)!",
      },
      hints: [
        "Schau auf deine Start-Zahl (26) und die Küchen-Zahl (16).",
        "Rechne: 26 + 16 = 42.",
        "Notlösung: Der Master-Code lautet 42 (oder SCHATZKAMMER).",
      ],
    },
    unlockedStory:
      "🎉 DIE SCHATZKAMMER IST ENTTARNT! Die geheime Schatzkammer liegt tief unten im Haus: Einer der Kellerräume wurde mit dem schweren Vorhängeschloss versiegelt! Steige hinab in den Kellerflur, finde das Vorhängeschloss an der Kellertür, stecke deinen gefundenen Schlüssel hinein und öffne deine persönliche Schatzkammer! 🎂 HERZLICHEN GLÜCKWUNSCH ZUM 26. GEBURTSTAG, ALEXA!",
  },
];
