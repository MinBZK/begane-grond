// Rijksoverheid seed data, scaled up from Polder-fed anchors by /tmp/gen-seed.mjs.
// All original ids are preserved; generated entries are appended for realism.
// Deterministic (no randomness). Edit the anchors + regenerate, do not hand-tune.

export const organisations = [
  {
    "id": "bzk",
    "name": "Ministerie van BZK",
    "short": "BZK"
  },
  {
    "id": "dictu",
    "name": "Dienst ICT Uitvoering",
    "short": "DICTU"
  },
  {
    "id": "logius",
    "name": "Logius",
    "short": "LOGIUS"
  },
  {
    "id": "rvig",
    "name": "Rijksdienst voor Identiteitsgegevens",
    "short": "RvIG"
  },
  {
    "id": "nldd",
    "name": "Nederlandse Digitale Dienst",
    "short": "NLDD"
  },
  {
    "id": "bd",
    "name": "Belastingdienst",
    "short": "BD"
  },
  {
    "id": "cjib",
    "name": "Centraal Justitieel Incassobureau",
    "short": "CJIB"
  },
  {
    "id": "dhc",
    "name": "Dienst van de Huurcommissie",
    "short": "DHC"
  },
  {
    "id": "dji",
    "name": "Dienst Justitiële Inrichtingen",
    "short": "DJI"
  },
  {
    "id": "dpc",
    "name": "Dienst Publiek en Communicatie",
    "short": "DPC"
  },
  {
    "id": "duo",
    "name": "Dienst Uitvoering Onderwijs",
    "short": "DUO"
  },
  {
    "id": "ind",
    "name": "Immigratie- en Naturalisatiedienst",
    "short": "IND"
  },
  {
    "id": "jio",
    "name": "Justitiële ICT Organisatie",
    "short": "JIO"
  },
  {
    "id": "justid",
    "name": "Justitiële Informatiedienst",
    "short": "Justid"
  },
  {
    "id": "rvo",
    "name": "Rijksdienst voor Ondernemend Nederland",
    "short": "RVO"
  },
  {
    "id": "rws",
    "name": "Rijkswaterstaat",
    "short": "RWS"
  },
  {
    "id": "aenm",
    "name": "Asiel en Migratie",
    "short": "AenM"
  },
  {
    "id": "az",
    "name": "Algemene Zaken",
    "short": "AZ"
  },
  {
    "id": "bz",
    "name": "Buitenlandse Zaken",
    "short": "BZ"
  },
  {
    "id": "def",
    "name": "Defensie",
    "short": "Def"
  },
  {
    "id": "ez",
    "name": "Economische Zaken",
    "short": "EZ"
  },
  {
    "id": "ezk",
    "name": "Economische Zaken en Klimaat",
    "short": "EZK"
  },
  {
    "id": "fin",
    "name": "Financiën",
    "short": "Fin"
  },
  {
    "id": "ienw",
    "name": "Infrastructuur en Waterstaat",
    "short": "IenW"
  },
  {
    "id": "jenv",
    "name": "Justitie en Veiligheid",
    "short": "JenV"
  },
  {
    "id": "kgg",
    "name": "Klimaat en Groene Groei",
    "short": "KGG"
  },
  {
    "id": "lnv",
    "name": "Landbouw, Natuur en Voedselkwaliteit",
    "short": "LNV"
  },
  {
    "id": "ocw",
    "name": "Onderwijs, Cultuur en Wetenschap",
    "short": "OCW"
  },
  {
    "id": "szw",
    "name": "Sociale Zaken en Werkgelegenheid",
    "short": "SZW"
  },
  {
    "id": "vws",
    "name": "Volksgezondheid, Welzijn en Sport",
    "short": "VWS"
  },
  {
    "id": "acm",
    "name": "Autoriteit Consument en Markt",
    "short": "ACM"
  },
  {
    "id": "afm",
    "name": "Autoriteit Financiële Markten",
    "short": "AFM"
  },
  {
    "id": "cbr",
    "name": "Centraal Bureau Rijvaardigheidsbewijzen",
    "short": "CBR"
  },
  {
    "id": "cbs",
    "name": "Centraal Bureau voor de Statistiek",
    "short": "CBS"
  },
  {
    "id": "ksa",
    "name": "Kansspelautoriteit",
    "short": "Ksa"
  },
  {
    "id": "kvk",
    "name": "Kamer van Koophandel",
    "short": "KVK"
  },
  {
    "id": "nza",
    "name": "Nederlandse Zorgautoriteit",
    "short": "NZa"
  },
  {
    "id": "svb",
    "name": "Sociale Verzekeringsbank",
    "short": "SVB"
  },
  {
    "id": "uwv",
    "name": "Uitvoeringsinstituut Werknemersverzekeringen",
    "short": "UWV"
  }
];

export const people = [
  {
    "id": "ans",
    "name": "Anne Schuth",
    "role": "Platform engineer",
    "org": "nldd",
    "team": "team-platform",
    "matrix": "@anne:rijk.chat",
    "avatar": "AS",
    "history": [
      {
        "period": "2023–nu",
        "what": "Platform engineer, Nederlandse Digitale Dienst"
      },
      {
        "period": "2020–2023",
        "what": "DevOps engineer, DICTU"
      }
    ]
  },
  {
    "id": "joost",
    "name": "Joost de Vries",
    "role": "Tech lead",
    "org": "bzk",
    "team": "team-burgerzaken",
    "matrix": "@joost:rijk.chat",
    "avatar": "JV",
    "history": [
      {
        "period": "2021–nu",
        "what": "Tech lead Burgerzaken, BZK"
      }
    ]
  },
  {
    "id": "fatima",
    "name": "Fatima El Amrani",
    "role": "SRE",
    "org": "nldd",
    "team": "team-platform",
    "matrix": "@fatima:rijk.chat",
    "avatar": "FA",
    "history": [
      {
        "period": "2022–nu",
        "what": "SRE, Nederlandse Digitale Dienst"
      }
    ]
  },
  {
    "id": "pieter",
    "name": "Pieter Jansen",
    "role": "Data engineer",
    "org": "logius",
    "team": "team-data",
    "matrix": "@pieter:rijk.chat",
    "avatar": "PJ",
    "history": [
      {
        "period": "2019–nu",
        "what": "Data engineer, Logius"
      }
    ]
  },
  {
    "id": "sanne",
    "name": "Sanne Visser",
    "role": "Backend developer",
    "org": "bzk",
    "team": "team-toeslagen",
    "matrix": "@sanne:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2023–nu",
        "what": "Backend developer Toeslagen, BZK"
      }
    ]
  },
  {
    "id": "sanne-de-vries",
    "name": "Sanne De Vries",
    "role": "Frontend developer",
    "org": "bd",
    "team": "team-bd-inning",
    "matrix": "@sanne-de-vries:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, BD"
      }
    ]
  },
  {
    "id": "thijs-van-dijk",
    "name": "Thijs Van Dijk",
    "role": "Security engineer",
    "org": "bd",
    "team": "team-bd-inning",
    "matrix": "@thijs-van-dijk:rijk.chat",
    "avatar": "TV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, BD"
      }
    ]
  },
  {
    "id": "maud-vermeulen",
    "name": "Maud Vermeulen",
    "role": "Tech lead",
    "org": "bd",
    "team": "team-bd-aangifte",
    "matrix": "@maud-vermeulen:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, BD"
      }
    ]
  },
  {
    "id": "mohammed-van-vliet",
    "name": "Mohammed Van Vliet",
    "role": "Scrum master",
    "org": "bd",
    "team": "team-bd-aangifte",
    "matrix": "@mohammed-van-vliet:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, BD"
      }
    ]
  },
  {
    "id": "ans-kaya",
    "name": "Ans Kaya",
    "role": "Information security officer",
    "org": "bd",
    "team": "team-bd-gegevens",
    "matrix": "@ans-kaya:rijk.chat",
    "avatar": "AK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, BD"
      }
    ]
  },
  {
    "id": "amira-mol",
    "name": "Amira Mol",
    "role": "Business analist",
    "org": "bd",
    "team": "team-bd-gegevens",
    "matrix": "@amira-mol:rijk.chat",
    "avatar": "AM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, BD"
      }
    ]
  },
  {
    "id": "omar-van-es",
    "name": "Omar Van Es",
    "role": "Database administrator",
    "org": "bd",
    "team": "team-bd-fraude",
    "matrix": "@omar-van-es:rijk.chat",
    "avatar": "OV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, BD"
      }
    ]
  },
  {
    "id": "henk-wagenaar",
    "name": "Henk Wagenaar",
    "role": "Platform engineer",
    "org": "bd",
    "team": "team-bd-fraude",
    "matrix": "@henk-wagenaar:rijk.chat",
    "avatar": "HW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, BD"
      }
    ]
  },
  {
    "id": "marieke-lubbers",
    "name": "Marieke Lubbers",
    "role": "Frontend developer",
    "org": "bd",
    "team": "team-bd-iam",
    "matrix": "@marieke-lubbers:rijk.chat",
    "avatar": "ML",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, BD"
      }
    ]
  },
  {
    "id": "yvonne-erdem",
    "name": "Yvonne Erdem",
    "role": "Security engineer",
    "org": "bd",
    "team": "team-bd-iam",
    "matrix": "@yvonne-erdem:rijk.chat",
    "avatar": "YE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, BD"
      }
    ]
  },
  {
    "id": "sander-slootweg",
    "name": "Sander Slootweg",
    "role": "Tech lead",
    "org": "bd",
    "team": "team-bd-platform",
    "matrix": "@sander-slootweg:rijk.chat",
    "avatar": "SS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, BD"
      }
    ]
  },
  {
    "id": "mark-asik",
    "name": "Mark Asik",
    "role": "Scrum master",
    "org": "bd",
    "team": "team-bd-platform",
    "matrix": "@mark-asik:rijk.chat",
    "avatar": "MA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, BD"
      }
    ]
  },
  {
    "id": "julia-el-amrani",
    "name": "Julia El Amrani",
    "role": "Information security officer",
    "org": "duo",
    "team": "team-duo-studiefinanciering",
    "matrix": "@julia-el-amrani:rijk.chat",
    "avatar": "JE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, DUO"
      }
    ]
  },
  {
    "id": "liv-ozturk",
    "name": "Liv Ozturk",
    "role": "Business analist",
    "org": "duo",
    "team": "team-duo-studiefinanciering",
    "matrix": "@liv-ozturk:rijk.chat",
    "avatar": "LO",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DUO"
      }
    ]
  },
  {
    "id": "mees-maas",
    "name": "Mees Maas",
    "role": "Database administrator",
    "org": "duo",
    "team": "team-duo-register",
    "matrix": "@mees-maas:rijk.chat",
    "avatar": "MM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DUO"
      }
    ]
  },
  {
    "id": "khalid-veenstra",
    "name": "Khalid Veenstra",
    "role": "Platform engineer",
    "org": "duo",
    "team": "team-duo-register",
    "matrix": "@khalid-veenstra:rijk.chat",
    "avatar": "KV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DUO"
      }
    ]
  },
  {
    "id": "lieke-arslan",
    "name": "Lieke Arslan",
    "role": "Frontend developer",
    "org": "duo",
    "team": "team-duo-examens",
    "matrix": "@lieke-arslan:rijk.chat",
    "avatar": "LA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DUO"
      }
    ]
  },
  {
    "id": "isa-roeloffzen",
    "name": "Isa Roeloffzen",
    "role": "Security engineer",
    "org": "duo",
    "team": "team-duo-examens",
    "matrix": "@isa-roeloffzen:rijk.chat",
    "avatar": "IR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DUO"
      }
    ]
  },
  {
    "id": "selin-van-loon",
    "name": "Selin Van Loon",
    "role": "Tech lead",
    "org": "duo",
    "team": "team-duo-data",
    "matrix": "@selin-van-loon:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, DUO"
      }
    ]
  },
  {
    "id": "daan-lammers",
    "name": "Daan Lammers",
    "role": "Scrum master",
    "org": "duo",
    "team": "team-duo-data",
    "matrix": "@daan-lammers:rijk.chat",
    "avatar": "DL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, DUO"
      }
    ]
  },
  {
    "id": "iris-nijhuis",
    "name": "Iris Nijhuis",
    "role": "Information security officer",
    "org": "duo",
    "team": "team-duo-platform",
    "matrix": "@iris-nijhuis:rijk.chat",
    "avatar": "IN",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, DUO"
      }
    ]
  },
  {
    "id": "jeroen-holwerda",
    "name": "Jeroen Holwerda",
    "role": "Business analist",
    "org": "duo",
    "team": "team-duo-platform",
    "matrix": "@jeroen-holwerda:rijk.chat",
    "avatar": "JH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DUO"
      }
    ]
  },
  {
    "id": "noor-naber",
    "name": "Noor Naber",
    "role": "Database administrator",
    "org": "uwv",
    "team": "team-uwv-uitkeringen",
    "matrix": "@noor-naber:rijk.chat",
    "avatar": "NN",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, UWV"
      }
    ]
  },
  {
    "id": "esra-veldhuis",
    "name": "Esra Veldhuis",
    "role": "Platform engineer",
    "org": "uwv",
    "team": "team-uwv-uitkeringen",
    "matrix": "@esra-veldhuis:rijk.chat",
    "avatar": "EV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, UWV"
      }
    ]
  },
  {
    "id": "tariq-mulder",
    "name": "Tariq Mulder",
    "role": "Frontend developer",
    "org": "uwv",
    "team": "team-uwv-werk",
    "matrix": "@tariq-mulder:rijk.chat",
    "avatar": "TM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, UWV"
      }
    ]
  },
  {
    "id": "soumaya-janssen",
    "name": "Soumaya Janssen",
    "role": "Security engineer",
    "org": "uwv",
    "team": "team-uwv-werk",
    "matrix": "@soumaya-janssen:rijk.chat",
    "avatar": "SJ",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, UWV"
      }
    ]
  },
  {
    "id": "jan-huisman",
    "name": "Jan Huisman",
    "role": "Tech lead",
    "org": "uwv",
    "team": "team-uwv-gegevens",
    "matrix": "@jan-huisman:rijk.chat",
    "avatar": "JH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, UWV"
      }
    ]
  },
  {
    "id": "ingrid-vink",
    "name": "Ingrid Vink",
    "role": "Scrum master",
    "org": "uwv",
    "team": "team-uwv-gegevens",
    "matrix": "@ingrid-vink:rijk.chat",
    "avatar": "IV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, UWV"
      }
    ]
  },
  {
    "id": "jasper-ennaji",
    "name": "Jasper Ennaji",
    "role": "Information security officer",
    "org": "uwv",
    "team": "team-uwv-arbeidsmarkt",
    "matrix": "@jasper-ennaji:rijk.chat",
    "avatar": "JE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, UWV"
      }
    ]
  },
  {
    "id": "robin-roos",
    "name": "Robin Roos",
    "role": "Business analist",
    "org": "uwv",
    "team": "team-uwv-arbeidsmarkt",
    "matrix": "@robin-roos:rijk.chat",
    "avatar": "RR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, UWV"
      }
    ]
  },
  {
    "id": "fenna-bruins",
    "name": "Fenna Bruins",
    "role": "Database administrator",
    "org": "uwv",
    "team": "team-uwv-platform",
    "matrix": "@fenna-bruins:rijk.chat",
    "avatar": "FB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, UWV"
      }
    ]
  },
  {
    "id": "sterre-van-der-veen",
    "name": "Sterre Van der Veen",
    "role": "Platform engineer",
    "org": "uwv",
    "team": "team-uwv-platform",
    "matrix": "@sterre-van-der-veen:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, UWV"
      }
    ]
  },
  {
    "id": "levi-mohamed",
    "name": "Levi Mohamed",
    "role": "Frontend developer",
    "org": "rvo",
    "team": "team-rvo-subsidies",
    "matrix": "@levi-mohamed:rijk.chat",
    "avatar": "LM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, RVO"
      }
    ]
  },
  {
    "id": "gijs-van-os",
    "name": "Gijs Van Os",
    "role": "Security engineer",
    "org": "rvo",
    "team": "team-rvo-subsidies",
    "matrix": "@gijs-van-os:rijk.chat",
    "avatar": "GV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RVO"
      }
    ]
  },
  {
    "id": "olivier-el-khattabi",
    "name": "Olivier El Khattabi",
    "role": "Tech lead",
    "org": "rvo",
    "team": "team-rvo-vergunningen",
    "matrix": "@olivier-el-khattabi:rijk.chat",
    "avatar": "OE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RVO"
      }
    ]
  },
  {
    "id": "senna-wielinga",
    "name": "Senna Wielinga",
    "role": "Scrum master",
    "org": "rvo",
    "team": "team-rvo-vergunningen",
    "matrix": "@senna-wielinga:rijk.chat",
    "avatar": "SW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RVO"
      }
    ]
  },
  {
    "id": "meryem-hendriks",
    "name": "Meryem Hendriks",
    "role": "Information security officer",
    "org": "rvo",
    "team": "team-rvo-geodata",
    "matrix": "@meryem-hendriks:rijk.chat",
    "avatar": "MH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RVO"
      }
    ]
  },
  {
    "id": "lotte-hofman",
    "name": "Lotte Hofman",
    "role": "Business analist",
    "org": "rvo",
    "team": "team-rvo-geodata",
    "matrix": "@lotte-hofman:rijk.chat",
    "avatar": "LH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RVO"
      }
    ]
  },
  {
    "id": "tim-willems",
    "name": "Tim Willems",
    "role": "Database administrator",
    "org": "rvo",
    "team": "team-rvo-portaal",
    "matrix": "@tim-willems:rijk.chat",
    "avatar": "TW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, RVO"
      }
    ]
  },
  {
    "id": "bas-demir",
    "name": "Bas Demir",
    "role": "Platform engineer",
    "org": "rvo",
    "team": "team-rvo-portaal",
    "matrix": "@bas-demir:rijk.chat",
    "avatar": "BD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, RVO"
      }
    ]
  },
  {
    "id": "nadia-van-der-velde",
    "name": "Nadia Van der Velde",
    "role": "Frontend developer",
    "org": "rws",
    "team": "team-rws-areaal",
    "matrix": "@nadia-van-der-velde:rijk.chat",
    "avatar": "NV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, RWS"
      }
    ]
  },
  {
    "id": "layla-groen",
    "name": "Layla Groen",
    "role": "Security engineer",
    "org": "rws",
    "team": "team-rws-areaal",
    "matrix": "@layla-groen:rijk.chat",
    "avatar": "LG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RWS"
      }
    ]
  },
  {
    "id": "hassan-tuinstra",
    "name": "Hassan Tuinstra",
    "role": "Tech lead",
    "org": "rws",
    "team": "team-rws-verkeer",
    "matrix": "@hassan-tuinstra:rijk.chat",
    "avatar": "HT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RWS"
      }
    ]
  },
  {
    "id": "said-schipper",
    "name": "Said Schipper",
    "role": "Scrum master",
    "org": "rws",
    "team": "team-rws-verkeer",
    "matrix": "@said-schipper:rijk.chat",
    "avatar": "SS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RWS"
      }
    ]
  },
  {
    "id": "gerard-polat",
    "name": "Gerard Polat",
    "role": "Information security officer",
    "org": "rws",
    "team": "team-rws-sensoren",
    "matrix": "@gerard-polat:rijk.chat",
    "avatar": "GP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RWS"
      }
    ]
  },
  {
    "id": "wilma-korteweg",
    "name": "Wilma Korteweg",
    "role": "Business analist",
    "org": "rws",
    "team": "team-rws-sensoren",
    "matrix": "@wilma-korteweg:rijk.chat",
    "avatar": "WK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RWS"
      }
    ]
  },
  {
    "id": "casper-bulut",
    "name": "Casper Bulut",
    "role": "Database administrator",
    "org": "rws",
    "team": "team-rws-inspectie",
    "matrix": "@casper-bulut:rijk.chat",
    "avatar": "CB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, RWS"
      }
    ]
  },
  {
    "id": "bart-visser",
    "name": "Bart Visser",
    "role": "Platform engineer",
    "org": "rws",
    "team": "team-rws-inspectie",
    "matrix": "@bart-visser:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, RWS"
      }
    ]
  },
  {
    "id": "suze-kok",
    "name": "Suze Kok",
    "role": "Frontend developer",
    "org": "rws",
    "team": "team-rws-platform",
    "matrix": "@suze-kok:rijk.chat",
    "avatar": "SK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, RWS"
      }
    ]
  },
  {
    "id": "nina-van-der-heijden",
    "name": "Nina Van der Heijden",
    "role": "Security engineer",
    "org": "rws",
    "team": "team-rws-platform",
    "matrix": "@nina-van-der-heijden:rijk.chat",
    "avatar": "NV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RWS"
      }
    ]
  },
  {
    "id": "loes-van-den-heuvel",
    "name": "Loes Van den Heuvel",
    "role": "Tech lead",
    "org": "ind",
    "team": "team-ind-aanvragen",
    "matrix": "@loes-van-den-heuvel:rijk.chat",
    "avatar": "LV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, IND"
      }
    ]
  },
  {
    "id": "boris-sahin",
    "name": "Boris Sahin",
    "role": "Scrum master",
    "org": "ind",
    "team": "team-ind-aanvragen",
    "matrix": "@boris-sahin:rijk.chat",
    "avatar": "BS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, IND"
      }
    ]
  },
  {
    "id": "jelle-driessen",
    "name": "Jelle Driessen",
    "role": "Information security officer",
    "org": "ind",
    "team": "team-ind-dossiers",
    "matrix": "@jelle-driessen:rijk.chat",
    "avatar": "JD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, IND"
      }
    ]
  },
  {
    "id": "anne-faber",
    "name": "Anne Faber",
    "role": "Business analist",
    "org": "ind",
    "team": "team-ind-dossiers",
    "matrix": "@anne-faber:rijk.chat",
    "avatar": "AF",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, IND"
      }
    ]
  },
  {
    "id": "ilias-theunissen",
    "name": "Ilias Theunissen",
    "role": "Database administrator",
    "org": "ind",
    "team": "team-ind-iam",
    "matrix": "@ilias-theunissen:rijk.chat",
    "avatar": "IT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, IND"
      }
    ]
  },
  {
    "id": "joost-strik",
    "name": "Joost Strik",
    "role": "Platform engineer",
    "org": "ind",
    "team": "team-ind-iam",
    "matrix": "@joost-strik:rijk.chat",
    "avatar": "JS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, IND"
      }
    ]
  },
  {
    "id": "eva-van-zanten",
    "name": "Eva Van Zanten",
    "role": "Frontend developer",
    "org": "ind",
    "team": "team-ind-data",
    "matrix": "@eva-van-zanten:rijk.chat",
    "avatar": "EV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, IND"
      }
    ]
  },
  {
    "id": "stijn-wubben",
    "name": "Stijn Wubben",
    "role": "Security engineer",
    "org": "ind",
    "team": "team-ind-data",
    "matrix": "@stijn-wubben:rijk.chat",
    "avatar": "SW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, IND"
      }
    ]
  },
  {
    "id": "aisha-snijders",
    "name": "Aisha Snijders",
    "role": "Tech lead",
    "org": "logius",
    "team": "team-logius-digid",
    "matrix": "@aisha-snijders:rijk.chat",
    "avatar": "AS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, LOGIUS"
      }
    ]
  },
  {
    "id": "pieter-de-boer",
    "name": "Pieter De Boer",
    "role": "Scrum master",
    "org": "logius",
    "team": "team-logius-digid",
    "matrix": "@pieter-de-boer:rijk.chat",
    "avatar": "PD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, LOGIUS"
      }
    ]
  },
  {
    "id": "rachid-kuipers",
    "name": "Rachid Kuipers",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-logius-digikoppeling",
    "matrix": "@rachid-kuipers:rijk.chat",
    "avatar": "RK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "hala-prins",
    "name": "Hala Prins",
    "role": "Business analist",
    "org": "logius",
    "team": "team-logius-digikoppeling",
    "matrix": "@hala-prins:rijk.chat",
    "avatar": "HP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, LOGIUS"
      }
    ]
  },
  {
    "id": "cornelis-smeets",
    "name": "Cornelis Smeets",
    "role": "Database administrator",
    "org": "logius",
    "team": "team-logius-machtigen",
    "matrix": "@cornelis-smeets:rijk.chat",
    "avatar": "CS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, LOGIUS"
      }
    ]
  },
  {
    "id": "saskia-karaca",
    "name": "Saskia Karaca",
    "role": "Platform engineer",
    "org": "logius",
    "team": "team-logius-machtigen",
    "matrix": "@saskia-karaca:rijk.chat",
    "avatar": "SK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, LOGIUS"
      }
    ]
  },
  {
    "id": "floris-van-beek",
    "name": "Floris Van Beek",
    "role": "Frontend developer",
    "org": "logius",
    "team": "team-logius-stelsel",
    "matrix": "@floris-van-beek:rijk.chat",
    "avatar": "FV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, LOGIUS"
      }
    ]
  },
  {
    "id": "roel-reijnders",
    "name": "Roel Reijnders",
    "role": "Security engineer",
    "org": "logius",
    "team": "team-logius-stelsel",
    "matrix": "@roel-reijnders:rijk.chat",
    "avatar": "RR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, LOGIUS"
      }
    ]
  },
  {
    "id": "vincent-van-dam",
    "name": "Vincent Van Dam",
    "role": "Tech lead",
    "org": "dictu",
    "team": "team-dictu-hosting",
    "matrix": "@vincent-van-dam:rijk.chat",
    "avatar": "VV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, DICTU"
      }
    ]
  },
  {
    "id": "sophie-doornbos",
    "name": "Sophie Doornbos",
    "role": "Scrum master",
    "org": "dictu",
    "team": "team-dictu-hosting",
    "matrix": "@sophie-doornbos:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, DICTU"
      }
    ]
  },
  {
    "id": "indy-bijl",
    "name": "Indy Bijl",
    "role": "Information security officer",
    "org": "dictu",
    "team": "team-dictu-werkplek",
    "matrix": "@indy-bijl:rijk.chat",
    "avatar": "IB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, DICTU"
      }
    ]
  },
  {
    "id": "finn-charradi",
    "name": "Finn Charradi",
    "role": "Business analist",
    "org": "dictu",
    "team": "team-dictu-werkplek",
    "matrix": "@finn-charradi:rijk.chat",
    "avatar": "FC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DICTU"
      }
    ]
  },
  {
    "id": "wessel-verschuren",
    "name": "Wessel Verschuren",
    "role": "Database administrator",
    "org": "dictu",
    "team": "team-dictu-security",
    "matrix": "@wessel-verschuren:rijk.chat",
    "avatar": "WV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DICTU"
      }
    ]
  },
  {
    "id": "britt-peters",
    "name": "Britt Peters",
    "role": "Platform engineer",
    "org": "dictu",
    "team": "team-dictu-security",
    "matrix": "@britt-peters:rijk.chat",
    "avatar": "BP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DICTU"
      }
    ]
  },
  {
    "id": "abdel-bakkal",
    "name": "Abdel Bakkal",
    "role": "Frontend developer",
    "org": "dictu",
    "team": "team-dictu-data",
    "matrix": "@abdel-bakkal:rijk.chat",
    "avatar": "AB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DICTU"
      }
    ]
  },
  {
    "id": "dilan-scholten",
    "name": "Dilan Scholten",
    "role": "Security engineer",
    "org": "dictu",
    "team": "team-dictu-data",
    "matrix": "@dilan-scholten:rijk.chat",
    "avatar": "DS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DICTU"
      }
    ]
  },
  {
    "id": "sven-ben-ali",
    "name": "Sven Ben Ali",
    "role": "Tech lead",
    "org": "rvig",
    "team": "team-rvig-brp",
    "matrix": "@sven-ben-ali:rijk.chat",
    "avatar": "SB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RvIG"
      }
    ]
  },
  {
    "id": "hugo-ouali",
    "name": "Hugo Ouali",
    "role": "Scrum master",
    "org": "rvig",
    "team": "team-rvig-brp",
    "matrix": "@hugo-ouali:rijk.chat",
    "avatar": "HO",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RvIG"
      }
    ]
  },
  {
    "id": "anouk-dekker",
    "name": "Anouk Dekker",
    "role": "Information security officer",
    "org": "rvig",
    "team": "team-rvig-reisdocumenten",
    "matrix": "@anouk-dekker:rijk.chat",
    "avatar": "AD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RvIG"
      }
    ]
  },
  {
    "id": "fatima-linders",
    "name": "Fatima Linders",
    "role": "Business analist",
    "org": "rvig",
    "team": "team-rvig-reisdocumenten",
    "matrix": "@fatima-linders:rijk.chat",
    "avatar": "FL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RvIG"
      }
    ]
  },
  {
    "id": "bilal-verbruggen",
    "name": "Bilal Verbruggen",
    "role": "Database administrator",
    "org": "rvig",
    "team": "team-rvig-iam",
    "matrix": "@bilal-verbruggen:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, RvIG"
      }
    ]
  },
  {
    "id": "zeynep-cetin",
    "name": "Zeynep Cetin",
    "role": "Platform engineer",
    "org": "rvig",
    "team": "team-rvig-iam",
    "matrix": "@zeynep-cetin:rijk.chat",
    "avatar": "ZC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, RvIG"
      }
    ]
  },
  {
    "id": "willem-van-der-plas",
    "name": "Willem Van der Plas",
    "role": "Frontend developer",
    "org": "jio",
    "team": "team-jio-platform",
    "matrix": "@willem-van-der-plas:rijk.chat",
    "avatar": "WV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, JIO"
      }
    ]
  },
  {
    "id": "kees-cinar",
    "name": "Kees Cinar",
    "role": "Security engineer",
    "org": "jio",
    "team": "team-jio-platform",
    "matrix": "@kees-cinar:rijk.chat",
    "avatar": "KC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, JIO"
      }
    ]
  },
  {
    "id": "carla-bakker",
    "name": "Carla Bakker",
    "role": "Tech lead",
    "org": "jio",
    "team": "team-jio-keten",
    "matrix": "@carla-bakker:rijk.chat",
    "avatar": "CB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, JIO"
      }
    ]
  },
  {
    "id": "niels-brouwer",
    "name": "Niels Brouwer",
    "role": "Scrum master",
    "org": "jio",
    "team": "team-jio-keten",
    "matrix": "@niels-brouwer:rijk.chat",
    "avatar": "NB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, JIO"
      }
    ]
  },
  {
    "id": "koen-schouten",
    "name": "Koen Schouten",
    "role": "Information security officer",
    "org": "jio",
    "team": "team-jio-security",
    "matrix": "@koen-schouten:rijk.chat",
    "avatar": "KS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, JIO"
      }
    ]
  },
  {
    "id": "roos-sanders",
    "name": "Roos Sanders",
    "role": "Business analist",
    "org": "jio",
    "team": "team-jio-security",
    "matrix": "@roos-sanders:rijk.chat",
    "avatar": "RS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, JIO"
      }
    ]
  },
  {
    "id": "mila-celik",
    "name": "Mila Celik",
    "role": "Database administrator",
    "org": "cjib",
    "team": "team-cjib-inning",
    "matrix": "@mila-celik:rijk.chat",
    "avatar": "MC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, CJIB"
      }
    ]
  },
  {
    "id": "sem-van-der-laan",
    "name": "Sem Van der Laan",
    "role": "Platform engineer",
    "org": "cjib",
    "team": "team-cjib-inning",
    "matrix": "@sem-van-der-laan:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, CJIB"
      }
    ]
  },
  {
    "id": "ahmed-wijnands",
    "name": "Ahmed Wijnands",
    "role": "Frontend developer",
    "org": "cjib",
    "team": "team-cjib-sanctie",
    "matrix": "@ahmed-wijnands:rijk.chat",
    "avatar": "AW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, CJIB"
      }
    ]
  },
  {
    "id": "mats-engelen",
    "name": "Mats Engelen",
    "role": "Security engineer",
    "org": "cjib",
    "team": "team-cjib-sanctie",
    "matrix": "@mats-engelen:rijk.chat",
    "avatar": "ME",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CJIB"
      }
    ]
  },
  {
    "id": "puck-van-hattem",
    "name": "Puck Van Hattem",
    "role": "Tech lead",
    "org": "cjib",
    "team": "team-cjib-data",
    "matrix": "@puck-van-hattem:rijk.chat",
    "avatar": "PV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CJIB"
      }
    ]
  },
  {
    "id": "hatice-gunes",
    "name": "Hatice Gunes",
    "role": "Scrum master",
    "org": "cjib",
    "team": "team-cjib-data",
    "matrix": "@hatice-gunes:rijk.chat",
    "avatar": "HG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, CJIB"
      }
    ]
  },
  {
    "id": "emma-geerts",
    "name": "Emma Geerts",
    "role": "Information security officer",
    "org": "svb",
    "team": "team-svb-aow",
    "matrix": "@emma-geerts:rijk.chat",
    "avatar": "EG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, SVB"
      }
    ]
  },
  {
    "id": "lars-kraaijeveld",
    "name": "Lars Kraaijeveld",
    "role": "Business analist",
    "org": "svb",
    "team": "team-svb-aow",
    "matrix": "@lars-kraaijeveld:rijk.chat",
    "avatar": "LK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, SVB"
      }
    ]
  },
  {
    "id": "femke-meijer",
    "name": "Femke Meijer",
    "role": "Database administrator",
    "org": "svb",
    "team": "team-svb-kinderbijslag",
    "matrix": "@femke-meijer:rijk.chat",
    "avatar": "FM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, SVB"
      }
    ]
  },
  {
    "id": "sara-de-wit",
    "name": "Sara De Wit",
    "role": "Platform engineer",
    "org": "svb",
    "team": "team-svb-kinderbijslag",
    "matrix": "@sara-de-wit:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, SVB"
      }
    ]
  },
  {
    "id": "mehmet-koster",
    "name": "Mehmet Koster",
    "role": "Frontend developer",
    "org": "svb",
    "team": "team-svb-gegevens",
    "matrix": "@mehmet-koster:rijk.chat",
    "avatar": "MK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, SVB"
      }
    ]
  },
  {
    "id": "imane-gerritsen",
    "name": "Imane Gerritsen",
    "role": "Security engineer",
    "org": "svb",
    "team": "team-svb-gegevens",
    "matrix": "@imane-gerritsen:rijk.chat",
    "avatar": "IG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, SVB"
      }
    ]
  },
  {
    "id": "fatih-korkmaz",
    "name": "Fatih Korkmaz",
    "role": "Tech lead",
    "org": "svb",
    "team": "team-svb-platform",
    "matrix": "@fatih-korkmaz:rijk.chat",
    "avatar": "FK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, SVB"
      }
    ]
  },
  {
    "id": "dirk-verbeek",
    "name": "Dirk Verbeek",
    "role": "Scrum master",
    "org": "svb",
    "team": "team-svb-platform",
    "matrix": "@dirk-verbeek:rijk.chat",
    "avatar": "DV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, SVB"
      }
    ]
  },
  {
    "id": "annemarie-van-wijk",
    "name": "Annemarie Van Wijk",
    "role": "Information security officer",
    "org": "kvk",
    "team": "team-kvk-handelsregister",
    "matrix": "@annemarie-van-wijk:rijk.chat",
    "avatar": "AV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, KVK"
      }
    ]
  },
  {
    "id": "quinten-de-groot",
    "name": "Quinten De Groot",
    "role": "Business analist",
    "org": "kvk",
    "team": "team-kvk-handelsregister",
    "matrix": "@quinten-de-groot:rijk.chat",
    "avatar": "QD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, KVK"
      }
    ]
  },
  {
    "id": "maarten-berends",
    "name": "Maarten Berends",
    "role": "Database administrator",
    "org": "kvk",
    "team": "team-kvk-api",
    "matrix": "@maarten-berends:rijk.chat",
    "avatar": "MB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, KVK"
      }
    ]
  },
  {
    "id": "tess-tromp",
    "name": "Tess Tromp",
    "role": "Platform engineer",
    "org": "kvk",
    "team": "team-kvk-api",
    "matrix": "@tess-tromp:rijk.chat",
    "avatar": "TT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, KVK"
      }
    ]
  },
  {
    "id": "veerle-bouazza",
    "name": "Veerle Bouazza",
    "role": "Frontend developer",
    "org": "kvk",
    "team": "team-kvk-ondernemersplein",
    "matrix": "@veerle-bouazza:rijk.chat",
    "avatar": "VB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, KVK"
      }
    ]
  },
  {
    "id": "marit-roozendaal",
    "name": "Marit Roozendaal",
    "role": "Security engineer",
    "org": "kvk",
    "team": "team-kvk-ondernemersplein",
    "matrix": "@marit-roozendaal:rijk.chat",
    "avatar": "MR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, KVK"
      }
    ]
  },
  {
    "id": "teun-vos",
    "name": "Teun Vos",
    "role": "Tech lead",
    "org": "ienw",
    "team": "team-ienw-kenteken",
    "matrix": "@teun-vos:rijk.chat",
    "avatar": "TV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, IenW"
      }
    ]
  },
  {
    "id": "ties-van-der-meer",
    "name": "Ties Van der Meer",
    "role": "Scrum master",
    "org": "ienw",
    "team": "team-ienw-kenteken",
    "matrix": "@ties-van-der-meer:rijk.chat",
    "avatar": "TV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, IenW"
      }
    ]
  },
  {
    "id": "romy-de-lange",
    "name": "Romy De Lange",
    "role": "Information security officer",
    "org": "ienw",
    "team": "team-ienw-voertuig",
    "matrix": "@romy-de-lange:rijk.chat",
    "avatar": "RD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, IenW"
      }
    ]
  },
  {
    "id": "younes-bouali",
    "name": "Younes Bouali",
    "role": "Business analist",
    "org": "ienw",
    "team": "team-ienw-voertuig",
    "matrix": "@younes-bouali:rijk.chat",
    "avatar": "YB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, IenW"
      }
    ]
  },
  {
    "id": "bram-el-hadioui",
    "name": "Bram El Hadioui",
    "role": "Database administrator",
    "org": "ienw",
    "team": "team-ienw-data",
    "matrix": "@bram-el-hadioui:rijk.chat",
    "avatar": "BE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, IenW"
      }
    ]
  },
  {
    "id": "ruben-van-der-wal",
    "name": "Ruben Van der Wal",
    "role": "Platform engineer",
    "org": "ienw",
    "team": "team-ienw-data",
    "matrix": "@ruben-van-der-wal:rijk.chat",
    "avatar": "RV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, IenW"
      }
    ]
  },
  {
    "id": "yara-goossens",
    "name": "Yara Goossens",
    "role": "Frontend developer",
    "org": "cbs",
    "team": "team-cbs-statline",
    "matrix": "@yara-goossens:rijk.chat",
    "avatar": "YG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, CBS"
      }
    ]
  },
  {
    "id": "youssef-van-driel",
    "name": "Youssef Van Driel",
    "role": "Security engineer",
    "org": "cbs",
    "team": "team-cbs-statline",
    "matrix": "@youssef-van-driel:rijk.chat",
    "avatar": "YV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CBS"
      }
    ]
  },
  {
    "id": "karim-bakhti",
    "name": "Karim Bakhti",
    "role": "Tech lead",
    "org": "cbs",
    "team": "team-cbs-microdata",
    "matrix": "@karim-bakhti:rijk.chat",
    "avatar": "KB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CBS"
      }
    ]
  },
  {
    "id": "samira-renkema",
    "name": "Samira Renkema",
    "role": "Scrum master",
    "org": "cbs",
    "team": "team-cbs-microdata",
    "matrix": "@samira-renkema:rijk.chat",
    "avatar": "SR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, CBS"
      }
    ]
  },
  {
    "id": "bouchra-yildiz",
    "name": "Bouchra Yildiz",
    "role": "Information security officer",
    "org": "cbs",
    "team": "team-cbs-platform",
    "matrix": "@bouchra-yildiz:rijk.chat",
    "avatar": "BY",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, CBS"
      }
    ]
  },
  {
    "id": "johan-jansen",
    "name": "Johan Jansen",
    "role": "Business analist",
    "org": "cbs",
    "team": "team-cbs-platform",
    "matrix": "@johan-jansen:rijk.chat",
    "avatar": "JJ",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, CBS"
      }
    ]
  },
  {
    "id": "petra-dijkstra",
    "name": "Petra Dijkstra",
    "role": "Database administrator",
    "org": "cbs",
    "team": "team-cbs-privacy",
    "matrix": "@petra-dijkstra:rijk.chat",
    "avatar": "PD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, CBS"
      }
    ]
  },
  {
    "id": "tobias-van-leeuwen",
    "name": "Tobias Van Leeuwen",
    "role": "Platform engineer",
    "org": "cbs",
    "team": "team-cbs-privacy",
    "matrix": "@tobias-van-leeuwen:rijk.chat",
    "avatar": "TV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, CBS"
      }
    ]
  },
  {
    "id": "wouter-hoekstra",
    "name": "Wouter Hoekstra",
    "role": "Frontend developer",
    "org": "justid",
    "team": "team-justid-documentatie",
    "matrix": "@wouter-hoekstra:rijk.chat",
    "avatar": "WH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, Justid"
      }
    ]
  },
  {
    "id": "erik-aydin",
    "name": "Erik Aydin",
    "role": "Security engineer",
    "org": "justid",
    "team": "team-justid-documentatie",
    "matrix": "@erik-aydin:rijk.chat",
    "avatar": "EA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, Justid"
      }
    ]
  },
  {
    "id": "lara-kuiper",
    "name": "Lara Kuiper",
    "role": "Tech lead",
    "org": "justid",
    "team": "team-justid-vog",
    "matrix": "@lara-kuiper:rijk.chat",
    "avatar": "LK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, Justid"
      }
    ]
  },
  {
    "id": "fleur-stam",
    "name": "Fleur Stam",
    "role": "Scrum master",
    "org": "justid",
    "team": "team-justid-vog",
    "matrix": "@fleur-stam:rijk.chat",
    "avatar": "FS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, Justid"
      }
    ]
  },
  {
    "id": "luuk-bosman",
    "name": "Luuk Bosman",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-koop-wetten",
    "matrix": "@luuk-bosman:rijk.chat",
    "avatar": "LB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "pim-donker",
    "name": "Pim Donker",
    "role": "Business analist",
    "org": "logius",
    "team": "team-koop-wetten",
    "matrix": "@pim-donker:rijk.chat",
    "avatar": "PD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, LOGIUS"
      }
    ]
  },
  {
    "id": "demi-tekin",
    "name": "Demi Tekin",
    "role": "Database administrator",
    "org": "logius",
    "team": "team-koop-officielebekendmakingen",
    "matrix": "@demi-tekin:rijk.chat",
    "avatar": "DT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, LOGIUS"
      }
    ]
  },
  {
    "id": "driss-buitenhuis",
    "name": "Driss Buitenhuis",
    "role": "Platform engineer",
    "org": "logius",
    "team": "team-koop-officielebekendmakingen",
    "matrix": "@driss-buitenhuis:rijk.chat",
    "avatar": "DB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, LOGIUS"
      }
    ]
  },
  {
    "id": "sanne-van-bommel",
    "name": "Sanne Van Bommel",
    "role": "Frontend developer",
    "org": "dpc",
    "team": "team-dpc-rijksoverheid",
    "matrix": "@sanne-van-bommel:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DPC"
      }
    ]
  },
  {
    "id": "thijs-smit",
    "name": "Thijs Smit",
    "role": "Security engineer",
    "org": "dpc",
    "team": "team-dpc-rijksoverheid",
    "matrix": "@thijs-smit:rijk.chat",
    "avatar": "TS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DPC"
      }
    ]
  },
  {
    "id": "maud-yilmaz",
    "name": "Maud Yilmaz",
    "role": "Tech lead",
    "org": "dpc",
    "team": "team-dpc-content",
    "matrix": "@maud-yilmaz:rijk.chat",
    "avatar": "MY",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, DPC"
      }
    ]
  },
  {
    "id": "mohammed-verhoeven",
    "name": "Mohammed Verhoeven",
    "role": "Scrum master",
    "org": "dpc",
    "team": "team-dpc-content",
    "matrix": "@mohammed-verhoeven:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, DPC"
      }
    ]
  },
  {
    "id": "ans-wolters",
    "name": "Ans Wolters",
    "role": "Information security officer",
    "org": "dji",
    "team": "team-dji-detentie",
    "matrix": "@ans-wolters:rijk.chat",
    "avatar": "AW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, DJI"
      }
    ]
  },
  {
    "id": "amira-dogan",
    "name": "Amira Dogan",
    "role": "Business analist",
    "org": "dji",
    "team": "team-dji-detentie",
    "matrix": "@amira-dogan:rijk.chat",
    "avatar": "AD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DJI"
      }
    ]
  },
  {
    "id": "omar-timmermans",
    "name": "Omar Timmermans",
    "role": "Database administrator",
    "org": "dji",
    "team": "team-dji-data",
    "matrix": "@omar-timmermans:rijk.chat",
    "avatar": "OT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DJI"
      }
    ]
  },
  {
    "id": "henk-evers",
    "name": "Henk Evers",
    "role": "Platform engineer",
    "org": "dji",
    "team": "team-dji-data",
    "matrix": "@henk-evers:rijk.chat",
    "avatar": "HE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DJI"
      }
    ]
  },
  {
    "id": "marieke-van-rijn",
    "name": "Marieke Van Rijn",
    "role": "Frontend developer",
    "org": "cbr",
    "team": "team-cbr-rijbewijs",
    "matrix": "@marieke-van-rijn:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, CBR"
      }
    ]
  },
  {
    "id": "yvonne-van-ginkel",
    "name": "Yvonne Van Ginkel",
    "role": "Security engineer",
    "org": "cbr",
    "team": "team-cbr-rijbewijs",
    "matrix": "@yvonne-van-ginkel:rijk.chat",
    "avatar": "YV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CBR"
      }
    ]
  },
  {
    "id": "sander-sikkema",
    "name": "Sander Sikkema",
    "role": "Tech lead",
    "org": "cbr",
    "team": "team-cbr-reservering",
    "matrix": "@sander-sikkema:rijk.chat",
    "avatar": "SS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CBR"
      }
    ]
  },
  {
    "id": "mark-vreeswijk",
    "name": "Mark Vreeswijk",
    "role": "Scrum master",
    "org": "cbr",
    "team": "team-cbr-reservering",
    "matrix": "@mark-vreeswijk:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, CBR"
      }
    ]
  },
  {
    "id": "julia-pijnenburg",
    "name": "Julia Pijnenburg",
    "role": "Information security officer",
    "org": "acm",
    "team": "team-acm-toezicht",
    "matrix": "@julia-pijnenburg:rijk.chat",
    "avatar": "JP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, ACM"
      }
    ]
  },
  {
    "id": "liv-bos",
    "name": "Liv Bos",
    "role": "Business analist",
    "org": "acm",
    "team": "team-acm-toezicht",
    "matrix": "@liv-bos:rijk.chat",
    "avatar": "LB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, ACM"
      }
    ]
  },
  {
    "id": "mees-van-den-berg",
    "name": "Mees Van den Berg",
    "role": "Database administrator",
    "org": "afm",
    "team": "team-afm-toezicht",
    "matrix": "@mees-van-den-berg:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, AFM"
      }
    ]
  },
  {
    "id": "khalid-postma",
    "name": "Khalid Postma",
    "role": "Platform engineer",
    "org": "afm",
    "team": "team-afm-toezicht",
    "matrix": "@khalid-postma:rijk.chat",
    "avatar": "KP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, AFM"
      }
    ]
  },
  {
    "id": "lieke-el-idrissi",
    "name": "Lieke El Idrissi",
    "role": "Frontend developer",
    "org": "ksa",
    "team": "team-ksa-handhaving",
    "matrix": "@lieke-el-idrissi:rijk.chat",
    "avatar": "LE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, Ksa"
      }
    ]
  },
  {
    "id": "isa-boutaleb",
    "name": "Isa Boutaleb",
    "role": "Security engineer",
    "org": "ksa",
    "team": "team-ksa-handhaving",
    "matrix": "@isa-boutaleb:rijk.chat",
    "avatar": "IB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, Ksa"
      }
    ]
  },
  {
    "id": "selin-blom",
    "name": "Selin Blom",
    "role": "Tech lead",
    "org": "nza",
    "team": "team-nza-zorgdata",
    "matrix": "@selin-blom:rijk.chat",
    "avatar": "SB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, NZa"
      }
    ]
  },
  {
    "id": "daan-heijmans",
    "name": "Daan Heijmans",
    "role": "Scrum master",
    "org": "nza",
    "team": "team-nza-zorgdata",
    "matrix": "@daan-heijmans:rijk.chat",
    "avatar": "DH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, NZa"
      }
    ]
  },
  {
    "id": "iris-koning",
    "name": "Iris Koning",
    "role": "Information security officer",
    "org": "fin",
    "team": "team-fin-financieel",
    "matrix": "@iris-koning:rijk.chat",
    "avatar": "IK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, Fin"
      }
    ]
  },
  {
    "id": "jeroen-hamid",
    "name": "Jeroen Hamid",
    "role": "Business analist",
    "org": "fin",
    "team": "team-fin-financieel",
    "matrix": "@jeroen-hamid:rijk.chat",
    "avatar": "JH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, Fin"
      }
    ]
  },
  {
    "id": "noor-diks",
    "name": "Noor Diks",
    "role": "Database administrator",
    "org": "fin",
    "team": "team-fin-platform",
    "matrix": "@noor-diks:rijk.chat",
    "avatar": "ND",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, Fin"
      }
    ]
  },
  {
    "id": "esra-akkaya",
    "name": "Esra Akkaya",
    "role": "Platform engineer",
    "org": "fin",
    "team": "team-fin-platform",
    "matrix": "@esra-akkaya:rijk.chat",
    "avatar": "EA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, Fin"
      }
    ]
  },
  {
    "id": "tariq-de-vries",
    "name": "Tariq De Vries",
    "role": "Frontend developer",
    "org": "szw",
    "team": "team-szw-regelingen",
    "matrix": "@tariq-de-vries:rijk.chat",
    "avatar": "TD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, SZW"
      }
    ]
  },
  {
    "id": "soumaya-van-dijk",
    "name": "Soumaya Van Dijk",
    "role": "Security engineer",
    "org": "szw",
    "team": "team-szw-regelingen",
    "matrix": "@soumaya-van-dijk:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, SZW"
      }
    ]
  },
  {
    "id": "jan-vermeulen",
    "name": "Jan Vermeulen",
    "role": "Tech lead",
    "org": "vws",
    "team": "team-vws-zorgregister",
    "matrix": "@jan-vermeulen:rijk.chat",
    "avatar": "JV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, VWS"
      }
    ]
  },
  {
    "id": "ingrid-van-vliet",
    "name": "Ingrid Van Vliet",
    "role": "Scrum master",
    "org": "vws",
    "team": "team-vws-zorgregister",
    "matrix": "@ingrid-van-vliet:rijk.chat",
    "avatar": "IV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, VWS"
      }
    ]
  },
  {
    "id": "jasper-kaya",
    "name": "Jasper Kaya",
    "role": "Information security officer",
    "org": "vws",
    "team": "team-vws-data",
    "matrix": "@jasper-kaya:rijk.chat",
    "avatar": "JK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, VWS"
      }
    ]
  },
  {
    "id": "robin-mol",
    "name": "Robin Mol",
    "role": "Business analist",
    "org": "vws",
    "team": "team-vws-data",
    "matrix": "@robin-mol:rijk.chat",
    "avatar": "RM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, VWS"
      }
    ]
  },
  {
    "id": "fenna-van-es",
    "name": "Fenna Van Es",
    "role": "Database administrator",
    "org": "jenv",
    "team": "team-jenv-keten",
    "matrix": "@fenna-van-es:rijk.chat",
    "avatar": "FV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, JenV"
      }
    ]
  },
  {
    "id": "sterre-wagenaar",
    "name": "Sterre Wagenaar",
    "role": "Platform engineer",
    "org": "jenv",
    "team": "team-jenv-keten",
    "matrix": "@sterre-wagenaar:rijk.chat",
    "avatar": "SW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, JenV"
      }
    ]
  },
  {
    "id": "levi-lubbers",
    "name": "Levi Lubbers",
    "role": "Frontend developer",
    "org": "ocw",
    "team": "team-ocw-cultuurdata",
    "matrix": "@levi-lubbers:rijk.chat",
    "avatar": "LL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, OCW"
      }
    ]
  },
  {
    "id": "gijs-erdem",
    "name": "Gijs Erdem",
    "role": "Security engineer",
    "org": "ocw",
    "team": "team-ocw-cultuurdata",
    "matrix": "@gijs-erdem:rijk.chat",
    "avatar": "GE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, OCW"
      }
    ]
  },
  {
    "id": "olivier-slootweg",
    "name": "Olivier Slootweg",
    "role": "Tech lead",
    "org": "lnv",
    "team": "team-lnv-natuur",
    "matrix": "@olivier-slootweg:rijk.chat",
    "avatar": "OS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, LNV"
      }
    ]
  },
  {
    "id": "senna-asik",
    "name": "Senna Asik",
    "role": "Scrum master",
    "org": "lnv",
    "team": "team-lnv-natuur",
    "matrix": "@senna-asik:rijk.chat",
    "avatar": "SA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, LNV"
      }
    ]
  },
  {
    "id": "meryem-el-amrani",
    "name": "Meryem El Amrani",
    "role": "Information security officer",
    "org": "ezk",
    "team": "team-ezk-ondernemen",
    "matrix": "@meryem-el-amrani:rijk.chat",
    "avatar": "ME",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, EZK"
      }
    ]
  },
  {
    "id": "lotte-ozturk",
    "name": "Lotte Ozturk",
    "role": "Business analist",
    "org": "ezk",
    "team": "team-ezk-ondernemen",
    "matrix": "@lotte-ozturk:rijk.chat",
    "avatar": "LO",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, EZK"
      }
    ]
  },
  {
    "id": "tim-maas",
    "name": "Tim Maas",
    "role": "Database administrator",
    "org": "kgg",
    "team": "team-kgg-energie",
    "matrix": "@tim-maas:rijk.chat",
    "avatar": "TM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, KGG"
      }
    ]
  },
  {
    "id": "bas-veenstra",
    "name": "Bas Veenstra",
    "role": "Platform engineer",
    "org": "kgg",
    "team": "team-kgg-energie",
    "matrix": "@bas-veenstra:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, KGG"
      }
    ]
  },
  {
    "id": "nadia-arslan",
    "name": "Nadia Arslan",
    "role": "Frontend developer",
    "org": "az",
    "team": "team-az-comms",
    "matrix": "@nadia-arslan:rijk.chat",
    "avatar": "NA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, AZ"
      }
    ]
  },
  {
    "id": "layla-roeloffzen",
    "name": "Layla Roeloffzen",
    "role": "Security engineer",
    "org": "az",
    "team": "team-az-comms",
    "matrix": "@layla-roeloffzen:rijk.chat",
    "avatar": "LR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, AZ"
      }
    ]
  },
  {
    "id": "hassan-van-loon",
    "name": "Hassan Van Loon",
    "role": "Tech lead",
    "org": "bz",
    "team": "team-bz-consulair",
    "matrix": "@hassan-van-loon:rijk.chat",
    "avatar": "HV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, BZ"
      }
    ]
  },
  {
    "id": "said-lammers",
    "name": "Said Lammers",
    "role": "Scrum master",
    "org": "bz",
    "team": "team-bz-consulair",
    "matrix": "@said-lammers:rijk.chat",
    "avatar": "SL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, BZ"
      }
    ]
  },
  {
    "id": "gerard-nijhuis",
    "name": "Gerard Nijhuis",
    "role": "Information security officer",
    "org": "def",
    "team": "team-def-secinfra",
    "matrix": "@gerard-nijhuis:rijk.chat",
    "avatar": "GN",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, Def"
      }
    ]
  },
  {
    "id": "wilma-holwerda",
    "name": "Wilma Holwerda",
    "role": "Business analist",
    "org": "def",
    "team": "team-def-secinfra",
    "matrix": "@wilma-holwerda:rijk.chat",
    "avatar": "WH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, Def"
      }
    ]
  },
  {
    "id": "casper-naber",
    "name": "Casper Naber",
    "role": "Database administrator",
    "org": "aenm",
    "team": "team-aenm-keten",
    "matrix": "@casper-naber:rijk.chat",
    "avatar": "CN",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, AenM"
      }
    ]
  },
  {
    "id": "bart-veldhuis",
    "name": "Bart Veldhuis",
    "role": "Platform engineer",
    "org": "aenm",
    "team": "team-aenm-keten",
    "matrix": "@bart-veldhuis:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, AenM"
      }
    ]
  },
  {
    "id": "suze-mulder",
    "name": "Suze Mulder",
    "role": "Frontend developer",
    "org": "dhc",
    "team": "team-dhc-geschillen",
    "matrix": "@suze-mulder:rijk.chat",
    "avatar": "SM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DHC"
      }
    ]
  },
  {
    "id": "nina-janssen",
    "name": "Nina Janssen",
    "role": "Security engineer",
    "org": "dhc",
    "team": "team-dhc-geschillen",
    "matrix": "@nina-janssen:rijk.chat",
    "avatar": "NJ",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DHC"
      }
    ]
  },
  {
    "id": "loes-huisman",
    "name": "Loes Huisman",
    "role": "Tech lead",
    "org": "ez",
    "team": "team-ez-markt",
    "matrix": "@loes-huisman:rijk.chat",
    "avatar": "LH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, EZ"
      }
    ]
  },
  {
    "id": "boris-vink",
    "name": "Boris Vink",
    "role": "Scrum master",
    "org": "ez",
    "team": "team-ez-markt",
    "matrix": "@boris-vink:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, EZ"
      }
    ]
  },
  {
    "id": "jelle-ennaji",
    "name": "Jelle Ennaji",
    "role": "Information security officer",
    "org": "bzk",
    "team": "team-bzk-iam",
    "matrix": "@jelle-ennaji:rijk.chat",
    "avatar": "JE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, BZK"
      }
    ]
  },
  {
    "id": "anne-roos",
    "name": "Anne Roos",
    "role": "Business analist",
    "org": "bzk",
    "team": "team-bzk-iam",
    "matrix": "@anne-roos:rijk.chat",
    "avatar": "AR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, BZK"
      }
    ]
  },
  {
    "id": "ilias-bruins",
    "name": "Ilias Bruins",
    "role": "Database administrator",
    "org": "bzk",
    "team": "team-bzk-security",
    "matrix": "@ilias-bruins:rijk.chat",
    "avatar": "IB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, BZK"
      }
    ]
  },
  {
    "id": "joost-van-der-veen",
    "name": "Joost Van der Veen",
    "role": "Platform engineer",
    "org": "bzk",
    "team": "team-bzk-security",
    "matrix": "@joost-van-der-veen:rijk.chat",
    "avatar": "JV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, BZK"
      }
    ]
  },
  {
    "id": "eva-mohamed",
    "name": "Eva Mohamed",
    "role": "Frontend developer",
    "org": "nldd",
    "team": "team-nldd-docs",
    "matrix": "@eva-mohamed:rijk.chat",
    "avatar": "EM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, RIJKSICT"
      }
    ]
  },
  {
    "id": "stijn-van-os",
    "name": "Stijn Van Os",
    "role": "Security engineer",
    "org": "nldd",
    "team": "team-nldd-docs",
    "matrix": "@stijn-van-os:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RIJKSICT"
      }
    ]
  },
  {
    "id": "aisha-el-khattabi",
    "name": "Aisha El Khattabi",
    "role": "Tech lead",
    "org": "nldd",
    "team": "team-nldd-iam",
    "matrix": "@aisha-el-khattabi:rijk.chat",
    "avatar": "AE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RIJKSICT"
      }
    ]
  },
  {
    "id": "pieter-wielinga",
    "name": "Pieter Wielinga",
    "role": "Scrum master",
    "org": "nldd",
    "team": "team-nldd-iam",
    "matrix": "@pieter-wielinga:rijk.chat",
    "avatar": "PW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RIJKSICT"
      }
    ]
  },
  {
    "id": "rachid-hendriks",
    "name": "Rachid Hendriks",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-logius-docs",
    "matrix": "@rachid-hendriks:rijk.chat",
    "avatar": "RH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "hala-hofman",
    "name": "Hala Hofman",
    "role": "Business analist",
    "org": "logius",
    "team": "team-logius-docs",
    "matrix": "@hala-hofman:rijk.chat",
    "avatar": "HH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, LOGIUS"
      }
    ]
  },
  {
    "id": "cornelis-willems",
    "name": "Cornelis Willems",
    "role": "Database administrator",
    "org": "bd",
    "team": "team-bd-inning",
    "matrix": "@cornelis-willems:rijk.chat",
    "avatar": "CW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, BD"
      }
    ]
  },
  {
    "id": "saskia-demir",
    "name": "Saskia Demir",
    "role": "Platform engineer",
    "org": "bd",
    "team": "team-bd-aangifte",
    "matrix": "@saskia-demir:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, BD"
      }
    ]
  },
  {
    "id": "floris-van-der-velde",
    "name": "Floris Van der Velde",
    "role": "Frontend developer",
    "org": "bd",
    "team": "team-bd-gegevens",
    "matrix": "@floris-van-der-velde:rijk.chat",
    "avatar": "FV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, BD"
      }
    ]
  },
  {
    "id": "roel-groen",
    "name": "Roel Groen",
    "role": "Security engineer",
    "org": "bd",
    "team": "team-bd-fraude",
    "matrix": "@roel-groen:rijk.chat",
    "avatar": "RG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, BD"
      }
    ]
  },
  {
    "id": "vincent-tuinstra",
    "name": "Vincent Tuinstra",
    "role": "Tech lead",
    "org": "bd",
    "team": "team-bd-iam",
    "matrix": "@vincent-tuinstra:rijk.chat",
    "avatar": "VT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, BD"
      }
    ]
  },
  {
    "id": "sophie-schipper",
    "name": "Sophie Schipper",
    "role": "Scrum master",
    "org": "bd",
    "team": "team-bd-platform",
    "matrix": "@sophie-schipper:rijk.chat",
    "avatar": "SS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, BD"
      }
    ]
  },
  {
    "id": "indy-polat",
    "name": "Indy Polat",
    "role": "Information security officer",
    "org": "duo",
    "team": "team-duo-studiefinanciering",
    "matrix": "@indy-polat:rijk.chat",
    "avatar": "IP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, DUO"
      }
    ]
  },
  {
    "id": "finn-korteweg",
    "name": "Finn Korteweg",
    "role": "Business analist",
    "org": "duo",
    "team": "team-duo-register",
    "matrix": "@finn-korteweg:rijk.chat",
    "avatar": "FK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DUO"
      }
    ]
  },
  {
    "id": "wessel-bulut",
    "name": "Wessel Bulut",
    "role": "Database administrator",
    "org": "duo",
    "team": "team-duo-examens",
    "matrix": "@wessel-bulut:rijk.chat",
    "avatar": "WB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DUO"
      }
    ]
  },
  {
    "id": "britt-visser",
    "name": "Britt Visser",
    "role": "Platform engineer",
    "org": "duo",
    "team": "team-duo-data",
    "matrix": "@britt-visser:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DUO"
      }
    ]
  },
  {
    "id": "abdel-kok",
    "name": "Abdel Kok",
    "role": "Frontend developer",
    "org": "duo",
    "team": "team-duo-platform",
    "matrix": "@abdel-kok:rijk.chat",
    "avatar": "AK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DUO"
      }
    ]
  },
  {
    "id": "dilan-van-der-heijden",
    "name": "Dilan Van der Heijden",
    "role": "Security engineer",
    "org": "uwv",
    "team": "team-uwv-uitkeringen",
    "matrix": "@dilan-van-der-heijden:rijk.chat",
    "avatar": "DV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, UWV"
      }
    ]
  },
  {
    "id": "sven-van-den-heuvel",
    "name": "Sven Van den Heuvel",
    "role": "Tech lead",
    "org": "uwv",
    "team": "team-uwv-werk",
    "matrix": "@sven-van-den-heuvel:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, UWV"
      }
    ]
  },
  {
    "id": "hugo-sahin",
    "name": "Hugo Sahin",
    "role": "Scrum master",
    "org": "uwv",
    "team": "team-uwv-gegevens",
    "matrix": "@hugo-sahin:rijk.chat",
    "avatar": "HS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, UWV"
      }
    ]
  },
  {
    "id": "anouk-driessen",
    "name": "Anouk Driessen",
    "role": "Information security officer",
    "org": "uwv",
    "team": "team-uwv-arbeidsmarkt",
    "matrix": "@anouk-driessen:rijk.chat",
    "avatar": "AD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, UWV"
      }
    ]
  },
  {
    "id": "fatima-faber",
    "name": "Fatima Faber",
    "role": "Business analist",
    "org": "uwv",
    "team": "team-uwv-platform",
    "matrix": "@fatima-faber:rijk.chat",
    "avatar": "FF",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, UWV"
      }
    ]
  },
  {
    "id": "bilal-theunissen",
    "name": "Bilal Theunissen",
    "role": "Database administrator",
    "org": "rvo",
    "team": "team-rvo-subsidies",
    "matrix": "@bilal-theunissen:rijk.chat",
    "avatar": "BT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, RVO"
      }
    ]
  },
  {
    "id": "zeynep-strik",
    "name": "Zeynep Strik",
    "role": "Platform engineer",
    "org": "rvo",
    "team": "team-rvo-vergunningen",
    "matrix": "@zeynep-strik:rijk.chat",
    "avatar": "ZS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, RVO"
      }
    ]
  },
  {
    "id": "willem-van-zanten",
    "name": "Willem Van Zanten",
    "role": "Frontend developer",
    "org": "rvo",
    "team": "team-rvo-geodata",
    "matrix": "@willem-van-zanten:rijk.chat",
    "avatar": "WV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, RVO"
      }
    ]
  },
  {
    "id": "kees-wubben",
    "name": "Kees Wubben",
    "role": "Security engineer",
    "org": "rvo",
    "team": "team-rvo-portaal",
    "matrix": "@kees-wubben:rijk.chat",
    "avatar": "KW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RVO"
      }
    ]
  },
  {
    "id": "carla-snijders",
    "name": "Carla Snijders",
    "role": "Tech lead",
    "org": "rws",
    "team": "team-rws-areaal",
    "matrix": "@carla-snijders:rijk.chat",
    "avatar": "CS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RWS"
      }
    ]
  },
  {
    "id": "niels-de-boer",
    "name": "Niels De Boer",
    "role": "Scrum master",
    "org": "rws",
    "team": "team-rws-verkeer",
    "matrix": "@niels-de-boer:rijk.chat",
    "avatar": "ND",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RWS"
      }
    ]
  },
  {
    "id": "koen-kuipers",
    "name": "Koen Kuipers",
    "role": "Information security officer",
    "org": "rws",
    "team": "team-rws-sensoren",
    "matrix": "@koen-kuipers:rijk.chat",
    "avatar": "KK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RWS"
      }
    ]
  },
  {
    "id": "roos-prins",
    "name": "Roos Prins",
    "role": "Business analist",
    "org": "rws",
    "team": "team-rws-inspectie",
    "matrix": "@roos-prins:rijk.chat",
    "avatar": "RP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RWS"
      }
    ]
  },
  {
    "id": "mila-smeets",
    "name": "Mila Smeets",
    "role": "Database administrator",
    "org": "rws",
    "team": "team-rws-platform",
    "matrix": "@mila-smeets:rijk.chat",
    "avatar": "MS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, RWS"
      }
    ]
  },
  {
    "id": "sem-karaca",
    "name": "Sem Karaca",
    "role": "Platform engineer",
    "org": "ind",
    "team": "team-ind-aanvragen",
    "matrix": "@sem-karaca:rijk.chat",
    "avatar": "SK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, IND"
      }
    ]
  },
  {
    "id": "ahmed-van-beek",
    "name": "Ahmed Van Beek",
    "role": "Frontend developer",
    "org": "ind",
    "team": "team-ind-dossiers",
    "matrix": "@ahmed-van-beek:rijk.chat",
    "avatar": "AV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, IND"
      }
    ]
  },
  {
    "id": "mats-reijnders",
    "name": "Mats Reijnders",
    "role": "Security engineer",
    "org": "ind",
    "team": "team-ind-iam",
    "matrix": "@mats-reijnders:rijk.chat",
    "avatar": "MR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, IND"
      }
    ]
  },
  {
    "id": "puck-van-dam",
    "name": "Puck Van Dam",
    "role": "Tech lead",
    "org": "ind",
    "team": "team-ind-data",
    "matrix": "@puck-van-dam:rijk.chat",
    "avatar": "PV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, IND"
      }
    ]
  },
  {
    "id": "hatice-doornbos",
    "name": "Hatice Doornbos",
    "role": "Scrum master",
    "org": "logius",
    "team": "team-logius-digid",
    "matrix": "@hatice-doornbos:rijk.chat",
    "avatar": "HD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, LOGIUS"
      }
    ]
  },
  {
    "id": "emma-bijl",
    "name": "Emma Bijl",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-logius-digikoppeling",
    "matrix": "@emma-bijl:rijk.chat",
    "avatar": "EB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "lars-charradi",
    "name": "Lars Charradi",
    "role": "Business analist",
    "org": "logius",
    "team": "team-logius-machtigen",
    "matrix": "@lars-charradi:rijk.chat",
    "avatar": "LC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, LOGIUS"
      }
    ]
  },
  {
    "id": "femke-verschuren",
    "name": "Femke Verschuren",
    "role": "Database administrator",
    "org": "logius",
    "team": "team-logius-stelsel",
    "matrix": "@femke-verschuren:rijk.chat",
    "avatar": "FV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, LOGIUS"
      }
    ]
  },
  {
    "id": "sara-peters",
    "name": "Sara Peters",
    "role": "Platform engineer",
    "org": "dictu",
    "team": "team-dictu-hosting",
    "matrix": "@sara-peters:rijk.chat",
    "avatar": "SP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DICTU"
      }
    ]
  },
  {
    "id": "mehmet-bakkal",
    "name": "Mehmet Bakkal",
    "role": "Frontend developer",
    "org": "dictu",
    "team": "team-dictu-werkplek",
    "matrix": "@mehmet-bakkal:rijk.chat",
    "avatar": "MB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DICTU"
      }
    ]
  },
  {
    "id": "imane-scholten",
    "name": "Imane Scholten",
    "role": "Security engineer",
    "org": "dictu",
    "team": "team-dictu-security",
    "matrix": "@imane-scholten:rijk.chat",
    "avatar": "IS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DICTU"
      }
    ]
  },
  {
    "id": "fatih-ben-ali",
    "name": "Fatih Ben Ali",
    "role": "Tech lead",
    "org": "dictu",
    "team": "team-dictu-data",
    "matrix": "@fatih-ben-ali:rijk.chat",
    "avatar": "FB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, DICTU"
      }
    ]
  },
  {
    "id": "dirk-ouali",
    "name": "Dirk Ouali",
    "role": "Scrum master",
    "org": "rvig",
    "team": "team-rvig-brp",
    "matrix": "@dirk-ouali:rijk.chat",
    "avatar": "DO",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RvIG"
      }
    ]
  },
  {
    "id": "annemarie-dekker",
    "name": "Annemarie Dekker",
    "role": "Information security officer",
    "org": "rvig",
    "team": "team-rvig-reisdocumenten",
    "matrix": "@annemarie-dekker:rijk.chat",
    "avatar": "AD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RvIG"
      }
    ]
  },
  {
    "id": "quinten-linders",
    "name": "Quinten Linders",
    "role": "Business analist",
    "org": "rvig",
    "team": "team-rvig-iam",
    "matrix": "@quinten-linders:rijk.chat",
    "avatar": "QL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RvIG"
      }
    ]
  },
  {
    "id": "maarten-verbruggen",
    "name": "Maarten Verbruggen",
    "role": "Database administrator",
    "org": "jio",
    "team": "team-jio-platform",
    "matrix": "@maarten-verbruggen:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, JIO"
      }
    ]
  },
  {
    "id": "tess-cetin",
    "name": "Tess Cetin",
    "role": "Platform engineer",
    "org": "jio",
    "team": "team-jio-keten",
    "matrix": "@tess-cetin:rijk.chat",
    "avatar": "TC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, JIO"
      }
    ]
  },
  {
    "id": "veerle-van-der-plas",
    "name": "Veerle Van der Plas",
    "role": "Frontend developer",
    "org": "jio",
    "team": "team-jio-security",
    "matrix": "@veerle-van-der-plas:rijk.chat",
    "avatar": "VV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, JIO"
      }
    ]
  },
  {
    "id": "marit-cinar",
    "name": "Marit Cinar",
    "role": "Security engineer",
    "org": "cjib",
    "team": "team-cjib-inning",
    "matrix": "@marit-cinar:rijk.chat",
    "avatar": "MC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CJIB"
      }
    ]
  },
  {
    "id": "teun-bakker",
    "name": "Teun Bakker",
    "role": "Tech lead",
    "org": "cjib",
    "team": "team-cjib-sanctie",
    "matrix": "@teun-bakker:rijk.chat",
    "avatar": "TB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CJIB"
      }
    ]
  },
  {
    "id": "ties-brouwer",
    "name": "Ties Brouwer",
    "role": "Scrum master",
    "org": "cjib",
    "team": "team-cjib-data",
    "matrix": "@ties-brouwer:rijk.chat",
    "avatar": "TB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, CJIB"
      }
    ]
  },
  {
    "id": "romy-schouten",
    "name": "Romy Schouten",
    "role": "Information security officer",
    "org": "svb",
    "team": "team-svb-aow",
    "matrix": "@romy-schouten:rijk.chat",
    "avatar": "RS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, SVB"
      }
    ]
  },
  {
    "id": "younes-sanders",
    "name": "Younes Sanders",
    "role": "Business analist",
    "org": "svb",
    "team": "team-svb-kinderbijslag",
    "matrix": "@younes-sanders:rijk.chat",
    "avatar": "YS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, SVB"
      }
    ]
  },
  {
    "id": "bram-celik",
    "name": "Bram Celik",
    "role": "Database administrator",
    "org": "svb",
    "team": "team-svb-gegevens",
    "matrix": "@bram-celik:rijk.chat",
    "avatar": "BC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, SVB"
      }
    ]
  },
  {
    "id": "ruben-van-der-laan",
    "name": "Ruben Van der Laan",
    "role": "Platform engineer",
    "org": "svb",
    "team": "team-svb-platform",
    "matrix": "@ruben-van-der-laan:rijk.chat",
    "avatar": "RV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, SVB"
      }
    ]
  },
  {
    "id": "yara-wijnands",
    "name": "Yara Wijnands",
    "role": "Frontend developer",
    "org": "kvk",
    "team": "team-kvk-handelsregister",
    "matrix": "@yara-wijnands:rijk.chat",
    "avatar": "YW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, KVK"
      }
    ]
  },
  {
    "id": "youssef-engelen",
    "name": "Youssef Engelen",
    "role": "Security engineer",
    "org": "kvk",
    "team": "team-kvk-api",
    "matrix": "@youssef-engelen:rijk.chat",
    "avatar": "YE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, KVK"
      }
    ]
  },
  {
    "id": "karim-van-hattem",
    "name": "Karim Van Hattem",
    "role": "Tech lead",
    "org": "kvk",
    "team": "team-kvk-ondernemersplein",
    "matrix": "@karim-van-hattem:rijk.chat",
    "avatar": "KV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, KVK"
      }
    ]
  },
  {
    "id": "samira-gunes",
    "name": "Samira Gunes",
    "role": "Scrum master",
    "org": "ienw",
    "team": "team-ienw-kenteken",
    "matrix": "@samira-gunes:rijk.chat",
    "avatar": "SG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, IenW"
      }
    ]
  },
  {
    "id": "bouchra-geerts",
    "name": "Bouchra Geerts",
    "role": "Information security officer",
    "org": "ienw",
    "team": "team-ienw-voertuig",
    "matrix": "@bouchra-geerts:rijk.chat",
    "avatar": "BG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, IenW"
      }
    ]
  },
  {
    "id": "johan-kraaijeveld",
    "name": "Johan Kraaijeveld",
    "role": "Business analist",
    "org": "ienw",
    "team": "team-ienw-data",
    "matrix": "@johan-kraaijeveld:rijk.chat",
    "avatar": "JK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, IenW"
      }
    ]
  },
  {
    "id": "petra-meijer",
    "name": "Petra Meijer",
    "role": "Database administrator",
    "org": "cbs",
    "team": "team-cbs-statline",
    "matrix": "@petra-meijer:rijk.chat",
    "avatar": "PM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, CBS"
      }
    ]
  },
  {
    "id": "tobias-de-wit",
    "name": "Tobias De Wit",
    "role": "Platform engineer",
    "org": "cbs",
    "team": "team-cbs-microdata",
    "matrix": "@tobias-de-wit:rijk.chat",
    "avatar": "TD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, CBS"
      }
    ]
  },
  {
    "id": "wouter-koster",
    "name": "Wouter Koster",
    "role": "Frontend developer",
    "org": "cbs",
    "team": "team-cbs-platform",
    "matrix": "@wouter-koster:rijk.chat",
    "avatar": "WK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, CBS"
      }
    ]
  },
  {
    "id": "erik-gerritsen",
    "name": "Erik Gerritsen",
    "role": "Security engineer",
    "org": "cbs",
    "team": "team-cbs-privacy",
    "matrix": "@erik-gerritsen:rijk.chat",
    "avatar": "EG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CBS"
      }
    ]
  },
  {
    "id": "lara-korkmaz",
    "name": "Lara Korkmaz",
    "role": "Tech lead",
    "org": "justid",
    "team": "team-justid-documentatie",
    "matrix": "@lara-korkmaz:rijk.chat",
    "avatar": "LK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, Justid"
      }
    ]
  },
  {
    "id": "fleur-verbeek",
    "name": "Fleur Verbeek",
    "role": "Scrum master",
    "org": "justid",
    "team": "team-justid-vog",
    "matrix": "@fleur-verbeek:rijk.chat",
    "avatar": "FV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, Justid"
      }
    ]
  },
  {
    "id": "luuk-van-wijk",
    "name": "Luuk Van Wijk",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-koop-wetten",
    "matrix": "@luuk-van-wijk:rijk.chat",
    "avatar": "LV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "pim-de-groot",
    "name": "Pim De Groot",
    "role": "Business analist",
    "org": "logius",
    "team": "team-koop-officielebekendmakingen",
    "matrix": "@pim-de-groot:rijk.chat",
    "avatar": "PD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, LOGIUS"
      }
    ]
  },
  {
    "id": "demi-berends",
    "name": "Demi Berends",
    "role": "Database administrator",
    "org": "dpc",
    "team": "team-dpc-rijksoverheid",
    "matrix": "@demi-berends:rijk.chat",
    "avatar": "DB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DPC"
      }
    ]
  },
  {
    "id": "driss-tromp",
    "name": "Driss Tromp",
    "role": "Platform engineer",
    "org": "dpc",
    "team": "team-dpc-content",
    "matrix": "@driss-tromp:rijk.chat",
    "avatar": "DT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DPC"
      }
    ]
  },
  {
    "id": "sanne-bouazza",
    "name": "Sanne Bouazza",
    "role": "Frontend developer",
    "org": "dji",
    "team": "team-dji-detentie",
    "matrix": "@sanne-bouazza:rijk.chat",
    "avatar": "SB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DJI"
      }
    ]
  },
  {
    "id": "thijs-roozendaal",
    "name": "Thijs Roozendaal",
    "role": "Security engineer",
    "org": "dji",
    "team": "team-dji-data",
    "matrix": "@thijs-roozendaal:rijk.chat",
    "avatar": "TR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DJI"
      }
    ]
  },
  {
    "id": "maud-vos",
    "name": "Maud Vos",
    "role": "Tech lead",
    "org": "cbr",
    "team": "team-cbr-rijbewijs",
    "matrix": "@maud-vos:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CBR"
      }
    ]
  },
  {
    "id": "mohammed-van-der-meer",
    "name": "Mohammed Van der Meer",
    "role": "Scrum master",
    "org": "cbr",
    "team": "team-cbr-reservering",
    "matrix": "@mohammed-van-der-meer:rijk.chat",
    "avatar": "MV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, CBR"
      }
    ]
  },
  {
    "id": "ans-de-lange",
    "name": "Ans De Lange",
    "role": "Information security officer",
    "org": "acm",
    "team": "team-acm-toezicht",
    "matrix": "@ans-de-lange:rijk.chat",
    "avatar": "AD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, ACM"
      }
    ]
  },
  {
    "id": "amira-bouali",
    "name": "Amira Bouali",
    "role": "Business analist",
    "org": "afm",
    "team": "team-afm-toezicht",
    "matrix": "@amira-bouali:rijk.chat",
    "avatar": "AB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, AFM"
      }
    ]
  },
  {
    "id": "omar-el-hadioui",
    "name": "Omar El Hadioui",
    "role": "Database administrator",
    "org": "ksa",
    "team": "team-ksa-handhaving",
    "matrix": "@omar-el-hadioui:rijk.chat",
    "avatar": "OE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, Ksa"
      }
    ]
  },
  {
    "id": "henk-van-der-wal",
    "name": "Henk Van der Wal",
    "role": "Platform engineer",
    "org": "nza",
    "team": "team-nza-zorgdata",
    "matrix": "@henk-van-der-wal:rijk.chat",
    "avatar": "HV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, NZa"
      }
    ]
  },
  {
    "id": "marieke-goossens",
    "name": "Marieke Goossens",
    "role": "Frontend developer",
    "org": "fin",
    "team": "team-fin-financieel",
    "matrix": "@marieke-goossens:rijk.chat",
    "avatar": "MG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, Fin"
      }
    ]
  },
  {
    "id": "yvonne-van-driel",
    "name": "Yvonne Van Driel",
    "role": "Security engineer",
    "org": "fin",
    "team": "team-fin-platform",
    "matrix": "@yvonne-van-driel:rijk.chat",
    "avatar": "YV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, Fin"
      }
    ]
  },
  {
    "id": "sander-bakhti",
    "name": "Sander Bakhti",
    "role": "Tech lead",
    "org": "szw",
    "team": "team-szw-regelingen",
    "matrix": "@sander-bakhti:rijk.chat",
    "avatar": "SB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, SZW"
      }
    ]
  },
  {
    "id": "mark-renkema",
    "name": "Mark Renkema",
    "role": "Scrum master",
    "org": "vws",
    "team": "team-vws-zorgregister",
    "matrix": "@mark-renkema:rijk.chat",
    "avatar": "MR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, VWS"
      }
    ]
  },
  {
    "id": "julia-yildiz",
    "name": "Julia Yildiz",
    "role": "Information security officer",
    "org": "vws",
    "team": "team-vws-data",
    "matrix": "@julia-yildiz:rijk.chat",
    "avatar": "JY",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, VWS"
      }
    ]
  },
  {
    "id": "liv-jansen",
    "name": "Liv Jansen",
    "role": "Business analist",
    "org": "jenv",
    "team": "team-jenv-keten",
    "matrix": "@liv-jansen:rijk.chat",
    "avatar": "LJ",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, JenV"
      }
    ]
  },
  {
    "id": "mees-dijkstra",
    "name": "Mees Dijkstra",
    "role": "Database administrator",
    "org": "ocw",
    "team": "team-ocw-cultuurdata",
    "matrix": "@mees-dijkstra:rijk.chat",
    "avatar": "MD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, OCW"
      }
    ]
  },
  {
    "id": "khalid-van-leeuwen",
    "name": "Khalid Van Leeuwen",
    "role": "Platform engineer",
    "org": "lnv",
    "team": "team-lnv-natuur",
    "matrix": "@khalid-van-leeuwen:rijk.chat",
    "avatar": "KV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, LNV"
      }
    ]
  },
  {
    "id": "lieke-hoekstra",
    "name": "Lieke Hoekstra",
    "role": "Frontend developer",
    "org": "ezk",
    "team": "team-ezk-ondernemen",
    "matrix": "@lieke-hoekstra:rijk.chat",
    "avatar": "LH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, EZK"
      }
    ]
  },
  {
    "id": "isa-aydin",
    "name": "Isa Aydin",
    "role": "Security engineer",
    "org": "kgg",
    "team": "team-kgg-energie",
    "matrix": "@isa-aydin:rijk.chat",
    "avatar": "IA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, KGG"
      }
    ]
  },
  {
    "id": "selin-kuiper",
    "name": "Selin Kuiper",
    "role": "Tech lead",
    "org": "az",
    "team": "team-az-comms",
    "matrix": "@selin-kuiper:rijk.chat",
    "avatar": "SK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, AZ"
      }
    ]
  },
  {
    "id": "daan-stam",
    "name": "Daan Stam",
    "role": "Scrum master",
    "org": "bz",
    "team": "team-bz-consulair",
    "matrix": "@daan-stam:rijk.chat",
    "avatar": "DS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, BZ"
      }
    ]
  },
  {
    "id": "iris-bosman",
    "name": "Iris Bosman",
    "role": "Information security officer",
    "org": "def",
    "team": "team-def-secinfra",
    "matrix": "@iris-bosman:rijk.chat",
    "avatar": "IB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, Def"
      }
    ]
  },
  {
    "id": "jeroen-donker",
    "name": "Jeroen Donker",
    "role": "Business analist",
    "org": "aenm",
    "team": "team-aenm-keten",
    "matrix": "@jeroen-donker:rijk.chat",
    "avatar": "JD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, AenM"
      }
    ]
  },
  {
    "id": "noor-tekin",
    "name": "Noor Tekin",
    "role": "Database administrator",
    "org": "dhc",
    "team": "team-dhc-geschillen",
    "matrix": "@noor-tekin:rijk.chat",
    "avatar": "NT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DHC"
      }
    ]
  },
  {
    "id": "esra-buitenhuis",
    "name": "Esra Buitenhuis",
    "role": "Platform engineer",
    "org": "ez",
    "team": "team-ez-markt",
    "matrix": "@esra-buitenhuis:rijk.chat",
    "avatar": "EB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, EZ"
      }
    ]
  },
  {
    "id": "tariq-van-bommel",
    "name": "Tariq Van Bommel",
    "role": "Frontend developer",
    "org": "bzk",
    "team": "team-bzk-iam",
    "matrix": "@tariq-van-bommel:rijk.chat",
    "avatar": "TV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, BZK"
      }
    ]
  },
  {
    "id": "soumaya-smit",
    "name": "Soumaya Smit",
    "role": "Security engineer",
    "org": "bzk",
    "team": "team-bzk-security",
    "matrix": "@soumaya-smit:rijk.chat",
    "avatar": "SS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, BZK"
      }
    ]
  },
  {
    "id": "jan-yilmaz",
    "name": "Jan Yilmaz",
    "role": "Tech lead",
    "org": "nldd",
    "team": "team-nldd-docs",
    "matrix": "@jan-yilmaz:rijk.chat",
    "avatar": "JY",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RIJKSICT"
      }
    ]
  },
  {
    "id": "ingrid-verhoeven",
    "name": "Ingrid Verhoeven",
    "role": "Scrum master",
    "org": "nldd",
    "team": "team-nldd-iam",
    "matrix": "@ingrid-verhoeven:rijk.chat",
    "avatar": "IV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RIJKSICT"
      }
    ]
  },
  {
    "id": "jasper-wolters",
    "name": "Jasper Wolters",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-logius-docs",
    "matrix": "@jasper-wolters:rijk.chat",
    "avatar": "JW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "robin-dogan",
    "name": "Robin Dogan",
    "role": "Business analist",
    "org": "bd",
    "team": "team-bd-inning",
    "matrix": "@robin-dogan:rijk.chat",
    "avatar": "RD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, BD"
      }
    ]
  },
  {
    "id": "fenna-timmermans",
    "name": "Fenna Timmermans",
    "role": "Database administrator",
    "org": "bd",
    "team": "team-bd-aangifte",
    "matrix": "@fenna-timmermans:rijk.chat",
    "avatar": "FT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, BD"
      }
    ]
  },
  {
    "id": "sterre-evers",
    "name": "Sterre Evers",
    "role": "Platform engineer",
    "org": "bd",
    "team": "team-bd-gegevens",
    "matrix": "@sterre-evers:rijk.chat",
    "avatar": "SE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, BD"
      }
    ]
  },
  {
    "id": "levi-van-rijn",
    "name": "Levi Van Rijn",
    "role": "Frontend developer",
    "org": "bd",
    "team": "team-bd-fraude",
    "matrix": "@levi-van-rijn:rijk.chat",
    "avatar": "LV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, BD"
      }
    ]
  },
  {
    "id": "gijs-van-ginkel",
    "name": "Gijs Van Ginkel",
    "role": "Security engineer",
    "org": "bd",
    "team": "team-bd-iam",
    "matrix": "@gijs-van-ginkel:rijk.chat",
    "avatar": "GV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, BD"
      }
    ]
  },
  {
    "id": "olivier-sikkema",
    "name": "Olivier Sikkema",
    "role": "Tech lead",
    "org": "bd",
    "team": "team-bd-platform",
    "matrix": "@olivier-sikkema:rijk.chat",
    "avatar": "OS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, BD"
      }
    ]
  },
  {
    "id": "senna-vreeswijk",
    "name": "Senna Vreeswijk",
    "role": "Scrum master",
    "org": "duo",
    "team": "team-duo-studiefinanciering",
    "matrix": "@senna-vreeswijk:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, DUO"
      }
    ]
  },
  {
    "id": "meryem-pijnenburg",
    "name": "Meryem Pijnenburg",
    "role": "Information security officer",
    "org": "duo",
    "team": "team-duo-register",
    "matrix": "@meryem-pijnenburg:rijk.chat",
    "avatar": "MP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, DUO"
      }
    ]
  },
  {
    "id": "lotte-bos",
    "name": "Lotte Bos",
    "role": "Business analist",
    "org": "duo",
    "team": "team-duo-examens",
    "matrix": "@lotte-bos:rijk.chat",
    "avatar": "LB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DUO"
      }
    ]
  },
  {
    "id": "tim-van-den-berg",
    "name": "Tim Van den Berg",
    "role": "Database administrator",
    "org": "duo",
    "team": "team-duo-data",
    "matrix": "@tim-van-den-berg:rijk.chat",
    "avatar": "TV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DUO"
      }
    ]
  },
  {
    "id": "bas-postma",
    "name": "Bas Postma",
    "role": "Platform engineer",
    "org": "duo",
    "team": "team-duo-platform",
    "matrix": "@bas-postma:rijk.chat",
    "avatar": "BP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DUO"
      }
    ]
  },
  {
    "id": "nadia-el-idrissi",
    "name": "Nadia El Idrissi",
    "role": "Frontend developer",
    "org": "uwv",
    "team": "team-uwv-uitkeringen",
    "matrix": "@nadia-el-idrissi:rijk.chat",
    "avatar": "NE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, UWV"
      }
    ]
  },
  {
    "id": "layla-boutaleb",
    "name": "Layla Boutaleb",
    "role": "Security engineer",
    "org": "uwv",
    "team": "team-uwv-werk",
    "matrix": "@layla-boutaleb:rijk.chat",
    "avatar": "LB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, UWV"
      }
    ]
  },
  {
    "id": "hassan-blom",
    "name": "Hassan Blom",
    "role": "Tech lead",
    "org": "uwv",
    "team": "team-uwv-gegevens",
    "matrix": "@hassan-blom:rijk.chat",
    "avatar": "HB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, UWV"
      }
    ]
  },
  {
    "id": "said-heijmans",
    "name": "Said Heijmans",
    "role": "Scrum master",
    "org": "uwv",
    "team": "team-uwv-arbeidsmarkt",
    "matrix": "@said-heijmans:rijk.chat",
    "avatar": "SH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, UWV"
      }
    ]
  },
  {
    "id": "gerard-koning",
    "name": "Gerard Koning",
    "role": "Information security officer",
    "org": "uwv",
    "team": "team-uwv-platform",
    "matrix": "@gerard-koning:rijk.chat",
    "avatar": "GK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, UWV"
      }
    ]
  },
  {
    "id": "wilma-hamid",
    "name": "Wilma Hamid",
    "role": "Business analist",
    "org": "rvo",
    "team": "team-rvo-subsidies",
    "matrix": "@wilma-hamid:rijk.chat",
    "avatar": "WH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RVO"
      }
    ]
  },
  {
    "id": "casper-diks",
    "name": "Casper Diks",
    "role": "Database administrator",
    "org": "rvo",
    "team": "team-rvo-vergunningen",
    "matrix": "@casper-diks:rijk.chat",
    "avatar": "CD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, RVO"
      }
    ]
  },
  {
    "id": "bart-akkaya",
    "name": "Bart Akkaya",
    "role": "Platform engineer",
    "org": "rvo",
    "team": "team-rvo-geodata",
    "matrix": "@bart-akkaya:rijk.chat",
    "avatar": "BA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, RVO"
      }
    ]
  },
  {
    "id": "suze-de-vries",
    "name": "Suze De Vries",
    "role": "Frontend developer",
    "org": "rvo",
    "team": "team-rvo-portaal",
    "matrix": "@suze-de-vries:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, RVO"
      }
    ]
  },
  {
    "id": "nina-van-dijk",
    "name": "Nina Van Dijk",
    "role": "Security engineer",
    "org": "rws",
    "team": "team-rws-areaal",
    "matrix": "@nina-van-dijk:rijk.chat",
    "avatar": "NV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RWS"
      }
    ]
  },
  {
    "id": "loes-vermeulen",
    "name": "Loes Vermeulen",
    "role": "Tech lead",
    "org": "rws",
    "team": "team-rws-verkeer",
    "matrix": "@loes-vermeulen:rijk.chat",
    "avatar": "LV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RWS"
      }
    ]
  },
  {
    "id": "boris-van-vliet",
    "name": "Boris Van Vliet",
    "role": "Scrum master",
    "org": "rws",
    "team": "team-rws-sensoren",
    "matrix": "@boris-van-vliet:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RWS"
      }
    ]
  },
  {
    "id": "jelle-kaya",
    "name": "Jelle Kaya",
    "role": "Information security officer",
    "org": "rws",
    "team": "team-rws-inspectie",
    "matrix": "@jelle-kaya:rijk.chat",
    "avatar": "JK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RWS"
      }
    ]
  },
  {
    "id": "anne-mol",
    "name": "Anne Mol",
    "role": "Business analist",
    "org": "rws",
    "team": "team-rws-platform",
    "matrix": "@anne-mol:rijk.chat",
    "avatar": "AM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, RWS"
      }
    ]
  },
  {
    "id": "ilias-van-es",
    "name": "Ilias Van Es",
    "role": "Database administrator",
    "org": "ind",
    "team": "team-ind-aanvragen",
    "matrix": "@ilias-van-es:rijk.chat",
    "avatar": "IV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, IND"
      }
    ]
  },
  {
    "id": "joost-wagenaar",
    "name": "Joost Wagenaar",
    "role": "Platform engineer",
    "org": "ind",
    "team": "team-ind-dossiers",
    "matrix": "@joost-wagenaar:rijk.chat",
    "avatar": "JW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, IND"
      }
    ]
  },
  {
    "id": "eva-lubbers",
    "name": "Eva Lubbers",
    "role": "Frontend developer",
    "org": "ind",
    "team": "team-ind-iam",
    "matrix": "@eva-lubbers:rijk.chat",
    "avatar": "EL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, IND"
      }
    ]
  },
  {
    "id": "stijn-erdem",
    "name": "Stijn Erdem",
    "role": "Security engineer",
    "org": "ind",
    "team": "team-ind-data",
    "matrix": "@stijn-erdem:rijk.chat",
    "avatar": "SE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, IND"
      }
    ]
  },
  {
    "id": "aisha-slootweg",
    "name": "Aisha Slootweg",
    "role": "Tech lead",
    "org": "logius",
    "team": "team-logius-digid",
    "matrix": "@aisha-slootweg:rijk.chat",
    "avatar": "AS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, LOGIUS"
      }
    ]
  },
  {
    "id": "pieter-asik",
    "name": "Pieter Asik",
    "role": "Scrum master",
    "org": "logius",
    "team": "team-logius-digikoppeling",
    "matrix": "@pieter-asik:rijk.chat",
    "avatar": "PA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, LOGIUS"
      }
    ]
  },
  {
    "id": "rachid-el-amrani",
    "name": "Rachid El Amrani",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-logius-machtigen",
    "matrix": "@rachid-el-amrani:rijk.chat",
    "avatar": "RE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "hala-ozturk",
    "name": "Hala Ozturk",
    "role": "Business analist",
    "org": "logius",
    "team": "team-logius-stelsel",
    "matrix": "@hala-ozturk:rijk.chat",
    "avatar": "HO",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, LOGIUS"
      }
    ]
  },
  {
    "id": "cornelis-maas",
    "name": "Cornelis Maas",
    "role": "Database administrator",
    "org": "dictu",
    "team": "team-dictu-hosting",
    "matrix": "@cornelis-maas:rijk.chat",
    "avatar": "CM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DICTU"
      }
    ]
  },
  {
    "id": "saskia-veenstra",
    "name": "Saskia Veenstra",
    "role": "Platform engineer",
    "org": "dictu",
    "team": "team-dictu-werkplek",
    "matrix": "@saskia-veenstra:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DICTU"
      }
    ]
  },
  {
    "id": "floris-arslan",
    "name": "Floris Arslan",
    "role": "Frontend developer",
    "org": "dictu",
    "team": "team-dictu-security",
    "matrix": "@floris-arslan:rijk.chat",
    "avatar": "FA",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DICTU"
      }
    ]
  },
  {
    "id": "roel-roeloffzen",
    "name": "Roel Roeloffzen",
    "role": "Security engineer",
    "org": "dictu",
    "team": "team-dictu-data",
    "matrix": "@roel-roeloffzen:rijk.chat",
    "avatar": "RR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, DICTU"
      }
    ]
  },
  {
    "id": "vincent-van-loon",
    "name": "Vincent Van Loon",
    "role": "Tech lead",
    "org": "rvig",
    "team": "team-rvig-brp",
    "matrix": "@vincent-van-loon:rijk.chat",
    "avatar": "VV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RvIG"
      }
    ]
  },
  {
    "id": "sophie-lammers",
    "name": "Sophie Lammers",
    "role": "Scrum master",
    "org": "rvig",
    "team": "team-rvig-reisdocumenten",
    "matrix": "@sophie-lammers:rijk.chat",
    "avatar": "SL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, RvIG"
      }
    ]
  },
  {
    "id": "indy-nijhuis",
    "name": "Indy Nijhuis",
    "role": "Information security officer",
    "org": "rvig",
    "team": "team-rvig-iam",
    "matrix": "@indy-nijhuis:rijk.chat",
    "avatar": "IN",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, RvIG"
      }
    ]
  },
  {
    "id": "finn-holwerda",
    "name": "Finn Holwerda",
    "role": "Business analist",
    "org": "jio",
    "team": "team-jio-platform",
    "matrix": "@finn-holwerda:rijk.chat",
    "avatar": "FH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, JIO"
      }
    ]
  },
  {
    "id": "wessel-naber",
    "name": "Wessel Naber",
    "role": "Database administrator",
    "org": "jio",
    "team": "team-jio-keten",
    "matrix": "@wessel-naber:rijk.chat",
    "avatar": "WN",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, JIO"
      }
    ]
  },
  {
    "id": "britt-veldhuis",
    "name": "Britt Veldhuis",
    "role": "Platform engineer",
    "org": "jio",
    "team": "team-jio-security",
    "matrix": "@britt-veldhuis:rijk.chat",
    "avatar": "BV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, JIO"
      }
    ]
  },
  {
    "id": "abdel-mulder",
    "name": "Abdel Mulder",
    "role": "Frontend developer",
    "org": "cjib",
    "team": "team-cjib-inning",
    "matrix": "@abdel-mulder:rijk.chat",
    "avatar": "AM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, CJIB"
      }
    ]
  },
  {
    "id": "dilan-janssen",
    "name": "Dilan Janssen",
    "role": "Security engineer",
    "org": "cjib",
    "team": "team-cjib-sanctie",
    "matrix": "@dilan-janssen:rijk.chat",
    "avatar": "DJ",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CJIB"
      }
    ]
  },
  {
    "id": "sven-huisman",
    "name": "Sven Huisman",
    "role": "Tech lead",
    "org": "cjib",
    "team": "team-cjib-data",
    "matrix": "@sven-huisman:rijk.chat",
    "avatar": "SH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CJIB"
      }
    ]
  },
  {
    "id": "hugo-vink",
    "name": "Hugo Vink",
    "role": "Scrum master",
    "org": "svb",
    "team": "team-svb-aow",
    "matrix": "@hugo-vink:rijk.chat",
    "avatar": "HV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, SVB"
      }
    ]
  },
  {
    "id": "anouk-ennaji",
    "name": "Anouk Ennaji",
    "role": "Information security officer",
    "org": "svb",
    "team": "team-svb-kinderbijslag",
    "matrix": "@anouk-ennaji:rijk.chat",
    "avatar": "AE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, SVB"
      }
    ]
  },
  {
    "id": "fatima-roos",
    "name": "Fatima Roos",
    "role": "Business analist",
    "org": "svb",
    "team": "team-svb-gegevens",
    "matrix": "@fatima-roos:rijk.chat",
    "avatar": "FR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, SVB"
      }
    ]
  },
  {
    "id": "bilal-bruins",
    "name": "Bilal Bruins",
    "role": "Database administrator",
    "org": "svb",
    "team": "team-svb-platform",
    "matrix": "@bilal-bruins:rijk.chat",
    "avatar": "BB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, SVB"
      }
    ]
  },
  {
    "id": "zeynep-van-der-veen",
    "name": "Zeynep Van der Veen",
    "role": "Platform engineer",
    "org": "kvk",
    "team": "team-kvk-handelsregister",
    "matrix": "@zeynep-van-der-veen:rijk.chat",
    "avatar": "ZV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, KVK"
      }
    ]
  },
  {
    "id": "willem-mohamed",
    "name": "Willem Mohamed",
    "role": "Frontend developer",
    "org": "kvk",
    "team": "team-kvk-api",
    "matrix": "@willem-mohamed:rijk.chat",
    "avatar": "WM",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, KVK"
      }
    ]
  },
  {
    "id": "kees-van-os",
    "name": "Kees Van Os",
    "role": "Security engineer",
    "org": "kvk",
    "team": "team-kvk-ondernemersplein",
    "matrix": "@kees-van-os:rijk.chat",
    "avatar": "KV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, KVK"
      }
    ]
  },
  {
    "id": "carla-el-khattabi",
    "name": "Carla El Khattabi",
    "role": "Tech lead",
    "org": "ienw",
    "team": "team-ienw-kenteken",
    "matrix": "@carla-el-khattabi:rijk.chat",
    "avatar": "CE",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, IenW"
      }
    ]
  },
  {
    "id": "niels-wielinga",
    "name": "Niels Wielinga",
    "role": "Scrum master",
    "org": "ienw",
    "team": "team-ienw-voertuig",
    "matrix": "@niels-wielinga:rijk.chat",
    "avatar": "NW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, IenW"
      }
    ]
  },
  {
    "id": "koen-hendriks",
    "name": "Koen Hendriks",
    "role": "Information security officer",
    "org": "ienw",
    "team": "team-ienw-data",
    "matrix": "@koen-hendriks:rijk.chat",
    "avatar": "KH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, IenW"
      }
    ]
  },
  {
    "id": "roos-hofman",
    "name": "Roos Hofman",
    "role": "Business analist",
    "org": "cbs",
    "team": "team-cbs-statline",
    "matrix": "@roos-hofman:rijk.chat",
    "avatar": "RH",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, CBS"
      }
    ]
  },
  {
    "id": "mila-willems",
    "name": "Mila Willems",
    "role": "Database administrator",
    "org": "cbs",
    "team": "team-cbs-microdata",
    "matrix": "@mila-willems:rijk.chat",
    "avatar": "MW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, CBS"
      }
    ]
  },
  {
    "id": "sem-demir",
    "name": "Sem Demir",
    "role": "Platform engineer",
    "org": "cbs",
    "team": "team-cbs-platform",
    "matrix": "@sem-demir:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, CBS"
      }
    ]
  },
  {
    "id": "ahmed-van-der-velde",
    "name": "Ahmed Van der Velde",
    "role": "Frontend developer",
    "org": "cbs",
    "team": "team-cbs-privacy",
    "matrix": "@ahmed-van-der-velde:rijk.chat",
    "avatar": "AV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, CBS"
      }
    ]
  },
  {
    "id": "mats-groen",
    "name": "Mats Groen",
    "role": "Security engineer",
    "org": "justid",
    "team": "team-justid-documentatie",
    "matrix": "@mats-groen:rijk.chat",
    "avatar": "MG",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, Justid"
      }
    ]
  },
  {
    "id": "puck-tuinstra",
    "name": "Puck Tuinstra",
    "role": "Tech lead",
    "org": "justid",
    "team": "team-justid-vog",
    "matrix": "@puck-tuinstra:rijk.chat",
    "avatar": "PT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, Justid"
      }
    ]
  },
  {
    "id": "hatice-schipper",
    "name": "Hatice Schipper",
    "role": "Scrum master",
    "org": "logius",
    "team": "team-koop-wetten",
    "matrix": "@hatice-schipper:rijk.chat",
    "avatar": "HS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, LOGIUS"
      }
    ]
  },
  {
    "id": "emma-polat",
    "name": "Emma Polat",
    "role": "Information security officer",
    "org": "logius",
    "team": "team-koop-officielebekendmakingen",
    "matrix": "@emma-polat:rijk.chat",
    "avatar": "EP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, LOGIUS"
      }
    ]
  },
  {
    "id": "lars-korteweg",
    "name": "Lars Korteweg",
    "role": "Business analist",
    "org": "dpc",
    "team": "team-dpc-rijksoverheid",
    "matrix": "@lars-korteweg:rijk.chat",
    "avatar": "LK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DPC"
      }
    ]
  },
  {
    "id": "femke-bulut",
    "name": "Femke Bulut",
    "role": "Database administrator",
    "org": "dpc",
    "team": "team-dpc-content",
    "matrix": "@femke-bulut:rijk.chat",
    "avatar": "FB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, DPC"
      }
    ]
  },
  {
    "id": "sara-visser",
    "name": "Sara Visser",
    "role": "Platform engineer",
    "org": "dji",
    "team": "team-dji-detentie",
    "matrix": "@sara-visser:rijk.chat",
    "avatar": "SV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, DJI"
      }
    ]
  },
  {
    "id": "mehmet-kok",
    "name": "Mehmet Kok",
    "role": "Frontend developer",
    "org": "dji",
    "team": "team-dji-data",
    "matrix": "@mehmet-kok:rijk.chat",
    "avatar": "MK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, DJI"
      }
    ]
  },
  {
    "id": "imane-van-der-heijden",
    "name": "Imane Van der Heijden",
    "role": "Security engineer",
    "org": "cbr",
    "team": "team-cbr-rijbewijs",
    "matrix": "@imane-van-der-heijden:rijk.chat",
    "avatar": "IV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, CBR"
      }
    ]
  },
  {
    "id": "fatih-van-den-heuvel",
    "name": "Fatih Van den Heuvel",
    "role": "Tech lead",
    "org": "cbr",
    "team": "team-cbr-reservering",
    "matrix": "@fatih-van-den-heuvel:rijk.chat",
    "avatar": "FV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, CBR"
      }
    ]
  },
  {
    "id": "dirk-sahin",
    "name": "Dirk Sahin",
    "role": "Scrum master",
    "org": "acm",
    "team": "team-acm-toezicht",
    "matrix": "@dirk-sahin:rijk.chat",
    "avatar": "DS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, ACM"
      }
    ]
  },
  {
    "id": "annemarie-driessen",
    "name": "Annemarie Driessen",
    "role": "Information security officer",
    "org": "afm",
    "team": "team-afm-toezicht",
    "matrix": "@annemarie-driessen:rijk.chat",
    "avatar": "AD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, AFM"
      }
    ]
  },
  {
    "id": "quinten-faber",
    "name": "Quinten Faber",
    "role": "Business analist",
    "org": "ksa",
    "team": "team-ksa-handhaving",
    "matrix": "@quinten-faber:rijk.chat",
    "avatar": "QF",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, Ksa"
      }
    ]
  },
  {
    "id": "maarten-theunissen",
    "name": "Maarten Theunissen",
    "role": "Database administrator",
    "org": "nza",
    "team": "team-nza-zorgdata",
    "matrix": "@maarten-theunissen:rijk.chat",
    "avatar": "MT",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, NZa"
      }
    ]
  },
  {
    "id": "tess-strik",
    "name": "Tess Strik",
    "role": "Platform engineer",
    "org": "fin",
    "team": "team-fin-financieel",
    "matrix": "@tess-strik:rijk.chat",
    "avatar": "TS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, Fin"
      }
    ]
  },
  {
    "id": "veerle-van-zanten",
    "name": "Veerle Van Zanten",
    "role": "Frontend developer",
    "org": "fin",
    "team": "team-fin-platform",
    "matrix": "@veerle-van-zanten:rijk.chat",
    "avatar": "VV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, Fin"
      }
    ]
  },
  {
    "id": "marit-wubben",
    "name": "Marit Wubben",
    "role": "Security engineer",
    "org": "szw",
    "team": "team-szw-regelingen",
    "matrix": "@marit-wubben:rijk.chat",
    "avatar": "MW",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, SZW"
      }
    ]
  },
  {
    "id": "teun-snijders",
    "name": "Teun Snijders",
    "role": "Tech lead",
    "org": "vws",
    "team": "team-vws-zorgregister",
    "matrix": "@teun-snijders:rijk.chat",
    "avatar": "TS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, VWS"
      }
    ]
  },
  {
    "id": "ties-de-boer",
    "name": "Ties De Boer",
    "role": "Scrum master",
    "org": "vws",
    "team": "team-vws-data",
    "matrix": "@ties-de-boer:rijk.chat",
    "avatar": "TD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, VWS"
      }
    ]
  },
  {
    "id": "romy-kuipers",
    "name": "Romy Kuipers",
    "role": "Information security officer",
    "org": "jenv",
    "team": "team-jenv-keten",
    "matrix": "@romy-kuipers:rijk.chat",
    "avatar": "RK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, JenV"
      }
    ]
  },
  {
    "id": "younes-prins",
    "name": "Younes Prins",
    "role": "Business analist",
    "org": "ocw",
    "team": "team-ocw-cultuurdata",
    "matrix": "@younes-prins:rijk.chat",
    "avatar": "YP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, OCW"
      }
    ]
  },
  {
    "id": "bram-smeets",
    "name": "Bram Smeets",
    "role": "Database administrator",
    "org": "lnv",
    "team": "team-lnv-natuur",
    "matrix": "@bram-smeets:rijk.chat",
    "avatar": "BS",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, LNV"
      }
    ]
  },
  {
    "id": "ruben-karaca",
    "name": "Ruben Karaca",
    "role": "Platform engineer",
    "org": "ezk",
    "team": "team-ezk-ondernemen",
    "matrix": "@ruben-karaca:rijk.chat",
    "avatar": "RK",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, EZK"
      }
    ]
  },
  {
    "id": "yara-van-beek",
    "name": "Yara Van Beek",
    "role": "Frontend developer",
    "org": "kgg",
    "team": "team-kgg-energie",
    "matrix": "@yara-van-beek:rijk.chat",
    "avatar": "YV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, KGG"
      }
    ]
  },
  {
    "id": "youssef-reijnders",
    "name": "Youssef Reijnders",
    "role": "Security engineer",
    "org": "az",
    "team": "team-az-comms",
    "matrix": "@youssef-reijnders:rijk.chat",
    "avatar": "YR",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, AZ"
      }
    ]
  },
  {
    "id": "karim-van-dam",
    "name": "Karim Van Dam",
    "role": "Tech lead",
    "org": "bz",
    "team": "team-bz-consulair",
    "matrix": "@karim-van-dam:rijk.chat",
    "avatar": "KV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, BZ"
      }
    ]
  },
  {
    "id": "samira-doornbos",
    "name": "Samira Doornbos",
    "role": "Scrum master",
    "org": "def",
    "team": "team-def-secinfra",
    "matrix": "@samira-doornbos:rijk.chat",
    "avatar": "SD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, Def"
      }
    ]
  },
  {
    "id": "bouchra-bijl",
    "name": "Bouchra Bijl",
    "role": "Information security officer",
    "org": "aenm",
    "team": "team-aenm-keten",
    "matrix": "@bouchra-bijl:rijk.chat",
    "avatar": "BB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, AenM"
      }
    ]
  },
  {
    "id": "johan-charradi",
    "name": "Johan Charradi",
    "role": "Business analist",
    "org": "dhc",
    "team": "team-dhc-geschillen",
    "matrix": "@johan-charradi:rijk.chat",
    "avatar": "JC",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, DHC"
      }
    ]
  },
  {
    "id": "petra-verschuren",
    "name": "Petra Verschuren",
    "role": "Database administrator",
    "org": "ez",
    "team": "team-ez-markt",
    "matrix": "@petra-verschuren:rijk.chat",
    "avatar": "PV",
    "history": [
      {
        "period": "2022–nu",
        "what": "Database administrator, EZ"
      }
    ]
  },
  {
    "id": "tobias-peters",
    "name": "Tobias Peters",
    "role": "Platform engineer",
    "org": "bzk",
    "team": "team-bzk-iam",
    "matrix": "@tobias-peters:rijk.chat",
    "avatar": "TP",
    "history": [
      {
        "period": "2022–nu",
        "what": "Platform engineer, BZK"
      }
    ]
  },
  {
    "id": "wouter-bakkal",
    "name": "Wouter Bakkal",
    "role": "Frontend developer",
    "org": "bzk",
    "team": "team-bzk-security",
    "matrix": "@wouter-bakkal:rijk.chat",
    "avatar": "WB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Frontend developer, BZK"
      }
    ]
  },
  {
    "id": "erik-scholten",
    "name": "Erik Scholten",
    "role": "Security engineer",
    "org": "nldd",
    "team": "team-nldd-docs",
    "matrix": "@erik-scholten:rijk.chat",
    "avatar": "ES",
    "history": [
      {
        "period": "2022–nu",
        "what": "Security engineer, RIJKSICT"
      }
    ]
  },
  {
    "id": "lara-ben-ali",
    "name": "Lara Ben Ali",
    "role": "Tech lead",
    "org": "nldd",
    "team": "team-nldd-iam",
    "matrix": "@lara-ben-ali:rijk.chat",
    "avatar": "LB",
    "history": [
      {
        "period": "2022–nu",
        "what": "Tech lead, RIJKSICT"
      }
    ]
  },
  {
    "id": "fleur-ouali",
    "name": "Fleur Ouali",
    "role": "Scrum master",
    "org": "logius",
    "team": "team-logius-docs",
    "matrix": "@fleur-ouali:rijk.chat",
    "avatar": "FO",
    "history": [
      {
        "period": "2022–nu",
        "what": "Scrum master, LOGIUS"
      }
    ]
  },
  {
    "id": "luuk-dekker",
    "name": "Luuk Dekker",
    "role": "Information security officer",
    "org": "bd",
    "team": "team-bd-inning",
    "matrix": "@luuk-dekker:rijk.chat",
    "avatar": "LD",
    "history": [
      {
        "period": "2022–nu",
        "what": "Information security officer, BD"
      }
    ]
  },
  {
    "id": "pim-linders",
    "name": "Pim Linders",
    "role": "Business analist",
    "org": "bd",
    "team": "team-bd-aangifte",
    "matrix": "@pim-linders:rijk.chat",
    "avatar": "PL",
    "history": [
      {
        "period": "2022–nu",
        "what": "Business analist, BD"
      }
    ]
  }
];

export const teams = [
  {
    "id": "team-platform",
    "name": "Platform Engineering",
    "org": "nldd",
    "matrix": "#platform:rijk.chat",
    "members": [
      "ans",
      "fatima"
    ],
    "owns": {
      "apps": [
        "app-platformportaal"
      ],
      "instances": [
        "k8s-platform-prod",
        "llm-gilde-prod"
      ],
      "racks": [
        "r-dh-a1",
        "r-dh-a3",
        "r-ap-a1"
      ]
    },
    "oncall": "fatima"
  },
  {
    "id": "team-burgerzaken",
    "name": "Burgerzaken",
    "org": "bzk",
    "matrix": "#burgerzaken:rijk.chat",
    "members": [
      "joost"
    ],
    "owns": {
      "apps": [
        "app-paspoort"
      ],
      "instances": [
        "pg-burgerzaken-prod"
      ],
      "racks": [
        "r-dh-b1"
      ]
    },
    "oncall": "joost"
  },
  {
    "id": "team-toeslagen",
    "name": "Toeslagen",
    "org": "bzk",
    "matrix": "#toeslagen:rijk.chat",
    "members": [
      "sanne"
    ],
    "owns": {
      "apps": [
        "app-toeslagen"
      ],
      "instances": [
        "pg-toeslagen-acc",
        "kafka-toeslagen-prod"
      ],
      "racks": []
    },
    "oncall": "sanne"
  },
  {
    "id": "team-data",
    "name": "Data & koppelvlakken",
    "org": "logius",
    "matrix": "#data:rijk.chat",
    "members": [
      "pieter"
    ],
    "owns": {
      "apps": [
        "app-datadeling"
      ],
      "instances": [],
      "racks": [
        "r-dh-a2",
        "r-ap-a2"
      ]
    },
    "oncall": "pieter"
  },
  {
    "id": "team-bd-inning",
    "name": "Inning & Invordering",
    "org": "bd",
    "matrix": "#bd-inning:rijk.chat",
    "members": [
      "sanne-de-vries",
      "thijs-van-dijk",
      "cornelis-willems",
      "robin-dogan",
      "luuk-dekker"
    ],
    "owns": {
      "apps": [
        "app-mijnoverheid-portaal",
        "app-rooster-uitvoering"
      ],
      "instances": [
        "kubernetes-mijnoverheid-portaal-test",
        "kafka-mijnoverheid-portaal-acc",
        "postgres-rooster-uitvoering-dev"
      ],
      "racks": []
    },
    "oncall": "sanne-de-vries",
    "archetype": "betalingen"
  },
  {
    "id": "team-bd-aangifte",
    "name": "Aangifteplatform",
    "org": "bd",
    "matrix": "#bd-aangifte:rijk.chat",
    "members": [
      "maud-vermeulen",
      "mohammed-van-vliet",
      "saskia-demir",
      "fenna-timmermans",
      "pim-linders"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "maud-vermeulen",
    "archetype": "product"
  },
  {
    "id": "team-bd-gegevens",
    "name": "Gegevensmagazijn",
    "org": "bd",
    "matrix": "#bd-gegevens:rijk.chat",
    "members": [
      "ans-kaya",
      "amira-mol",
      "floris-van-der-velde",
      "sterre-evers"
    ],
    "owns": {
      "apps": [
        "app-rijbewijs-vernieuwen",
        "app-loonheffing"
      ],
      "instances": [
        "redis-rijbewijs-vernieuwen-prod",
        "postgres-rijbewijs-vernieuwen-dev",
        "kubernetes-loonheffing-test"
      ],
      "racks": []
    },
    "oncall": "ans-kaya",
    "archetype": "gegevens"
  },
  {
    "id": "team-bd-fraude",
    "name": "Fraudedetectie & Risicomodellen",
    "org": "bd",
    "matrix": "#bd-fraude:rijk.chat",
    "members": [
      "omar-van-es",
      "henk-wagenaar",
      "roel-groen",
      "levi-van-rijn"
    ],
    "owns": {
      "apps": [
        "app-diplomaregister"
      ],
      "instances": [
        "postgres-diplomaregister-dev",
        "kubernetes-diplomaregister-test"
      ],
      "racks": []
    },
    "oncall": "omar-van-es",
    "archetype": "data"
  },
  {
    "id": "team-bd-iam",
    "name": "Identiteit & Toegang",
    "org": "bd",
    "matrix": "#bd-iam:rijk.chat",
    "members": [
      "marieke-lubbers",
      "yvonne-erdem",
      "vincent-tuinstra",
      "gijs-van-ginkel"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "marieke-lubbers",
    "archetype": "iam"
  },
  {
    "id": "team-bd-platform",
    "name": "Cloudplatform Belastingdienst",
    "org": "bd",
    "matrix": "#bd-platform:rijk.chat",
    "members": [
      "sander-slootweg",
      "mark-asik",
      "sophie-schipper",
      "olivier-sikkema"
    ],
    "owns": {
      "apps": [
        "app-woz-bezwaar",
        "app-terugmeldvoorziening"
      ],
      "instances": [
        "kubernetes-woz-bezwaar-test",
        "kafka-woz-bezwaar-acc",
        "redis-woz-bezwaar-prod",
        "kubernetes-terugmeldvoorziening-test",
        "kafka-terugmeldvoorziening-acc"
      ],
      "racks": []
    },
    "oncall": "sander-slootweg",
    "archetype": "platform"
  },
  {
    "id": "team-duo-studiefinanciering",
    "name": "Studiefinanciering",
    "org": "duo",
    "matrix": "#duo-studiefinanciering:rijk.chat",
    "members": [
      "julia-el-amrani",
      "liv-ozturk",
      "indy-polat",
      "senna-vreeswijk"
    ],
    "owns": {
      "apps": [
        "app-naturalisatie-aanvraag",
        "app-bsn-validatie",
        "app-incasso-cjib"
      ],
      "instances": [
        "postgres-naturalisatie-aanvraag-dev",
        "kubernetes-naturalisatie-aanvraag-test",
        "kafka-naturalisatie-aanvraag-acc",
        "kubernetes-bsn-validatie-test",
        "kafka-bsn-validatie-acc",
        "kafka-incasso-cjib-acc"
      ],
      "racks": []
    },
    "oncall": "julia-el-amrani",
    "archetype": "betalingen"
  },
  {
    "id": "team-duo-register",
    "name": "Onderwijsregister (BRON)",
    "org": "duo",
    "matrix": "#duo-register:rijk.chat",
    "members": [
      "mees-maas",
      "khalid-veenstra",
      "finn-korteweg",
      "meryem-pijnenburg"
    ],
    "owns": {
      "apps": [
        "app-subsidieportaal-rvo",
        "app-statuspagina"
      ],
      "instances": [
        "postgres-subsidieportaal-rvo-dev",
        "kubernetes-statuspagina-test"
      ],
      "racks": []
    },
    "oncall": "mees-maas",
    "archetype": "gegevens"
  },
  {
    "id": "team-duo-examens",
    "name": "Examendiensten",
    "org": "duo",
    "matrix": "#duo-examens:rijk.chat",
    "members": [
      "lieke-arslan",
      "isa-roeloffzen",
      "wessel-bulut",
      "lotte-bos"
    ],
    "owns": {
      "apps": [
        "app-secretsmanager"
      ],
      "instances": [
        "redis-secretsmanager-prod"
      ],
      "racks": []
    },
    "oncall": "lieke-arslan",
    "archetype": "product"
  },
  {
    "id": "team-duo-data",
    "name": "Onderwijsdata & Analytics",
    "org": "duo",
    "matrix": "#duo-data:rijk.chat",
    "members": [
      "selin-van-loon",
      "daan-lammers",
      "britt-visser",
      "tim-van-den-berg"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "selin-van-loon",
    "archetype": "data"
  },
  {
    "id": "team-duo-platform",
    "name": "DevOps & Platformbeheer",
    "org": "duo",
    "matrix": "#duo-platform:rijk.chat",
    "members": [
      "iris-nijhuis",
      "jeroen-holwerda",
      "abdel-kok",
      "bas-postma"
    ],
    "owns": {
      "apps": [
        "app-documentmanagement"
      ],
      "instances": [
        "kafka-documentmanagement-acc",
        "redis-documentmanagement-prod",
        "postgres-documentmanagement-dev"
      ],
      "racks": []
    },
    "oncall": "iris-nijhuis",
    "archetype": "platform"
  },
  {
    "id": "team-uwv-uitkeringen",
    "name": "Uitkeringen WW & WIA",
    "org": "uwv",
    "matrix": "#uwv-uitkeringen:rijk.chat",
    "members": [
      "noor-naber",
      "esra-veldhuis",
      "dilan-van-der-heijden",
      "nadia-el-idrissi"
    ],
    "owns": {
      "apps": [
        "app-deploy-orchestrator"
      ],
      "instances": [
        "postgres-deploy-orchestrator-dev"
      ],
      "racks": []
    },
    "oncall": "noor-naber",
    "archetype": "betalingen"
  },
  {
    "id": "team-uwv-werk",
    "name": "Werk.nl & Vacaturediensten",
    "org": "uwv",
    "matrix": "#uwv-werk:rijk.chat",
    "members": [
      "tariq-mulder",
      "soumaya-janssen",
      "sven-van-den-heuvel",
      "layla-boutaleb"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "tariq-mulder",
    "archetype": "product"
  },
  {
    "id": "team-uwv-gegevens",
    "name": "Polisadministratie",
    "org": "uwv",
    "matrix": "#uwv-gegevens:rijk.chat",
    "members": [
      "jan-huisman",
      "ingrid-vink",
      "hugo-sahin",
      "hassan-blom"
    ],
    "owns": {
      "apps": [
        "app-belastingaangifte-ib"
      ],
      "instances": [
        "postgres-belastingaangifte-ib-dev",
        "kubernetes-belastingaangifte-ib-test",
        "kafka-belastingaangifte-ib-acc"
      ],
      "racks": []
    },
    "oncall": "jan-huisman",
    "archetype": "gegevens"
  },
  {
    "id": "team-uwv-arbeidsmarkt",
    "name": "Arbeidsmarktanalyse",
    "org": "uwv",
    "matrix": "#uwv-arbeidsmarkt:rijk.chat",
    "members": [
      "jasper-ennaji",
      "robin-roos",
      "anouk-driessen",
      "said-heijmans"
    ],
    "owns": {
      "apps": [
        "app-studielening-rekentool"
      ],
      "instances": [
        "kafka-studielening-rekentool-acc"
      ],
      "racks": []
    },
    "oncall": "jasper-ennaji",
    "archetype": "data"
  },
  {
    "id": "team-uwv-platform",
    "name": "Platformdiensten UWV",
    "org": "uwv",
    "matrix": "#uwv-platform:rijk.chat",
    "members": [
      "fenna-bruins",
      "sterre-van-der-veen",
      "fatima-faber",
      "gerard-koning"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "fenna-bruins",
    "archetype": "platform"
  },
  {
    "id": "team-rvo-subsidies",
    "name": "Subsidieverlening",
    "org": "rvo",
    "matrix": "#rvo-subsidies:rijk.chat",
    "members": [
      "levi-mohamed",
      "gijs-van-os",
      "bilal-theunissen",
      "wilma-hamid"
    ],
    "owns": {
      "apps": [
        "app-subsidie-aanvraag"
      ],
      "instances": [
        "kubernetes-subsidie-aanvraag-test",
        "kafka-subsidie-aanvraag-acc",
        "redis-subsidie-aanvraag-prod"
      ],
      "racks": []
    },
    "oncall": "levi-mohamed",
    "archetype": "betalingen"
  },
  {
    "id": "team-rvo-vergunningen",
    "name": "Vergunningen & Regelingen",
    "org": "rvo",
    "matrix": "#rvo-vergunningen:rijk.chat",
    "members": [
      "olivier-el-khattabi",
      "senna-wielinga",
      "zeynep-strik",
      "casper-diks"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "olivier-el-khattabi",
    "archetype": "uitvoering"
  },
  {
    "id": "team-rvo-geodata",
    "name": "Geodata & Percelen",
    "org": "rvo",
    "matrix": "#rvo-geodata:rijk.chat",
    "members": [
      "meryem-hendriks",
      "lotte-hofman",
      "willem-van-zanten",
      "bart-akkaya"
    ],
    "owns": {
      "apps": [
        "app-aow-uitkering",
        "app-brief-generator"
      ],
      "instances": [
        "redis-aow-uitkering-prod",
        "redis-brief-generator-prod",
        "postgres-brief-generator-dev",
        "kubernetes-brief-generator-test"
      ],
      "racks": []
    },
    "oncall": "meryem-hendriks",
    "archetype": "data"
  },
  {
    "id": "team-rvo-portaal",
    "name": "Ondernemersportaal (mijn.rvo)",
    "org": "rvo",
    "matrix": "#rvo-portaal:rijk.chat",
    "members": [
      "tim-willems",
      "bas-demir",
      "kees-wubben",
      "suze-de-vries"
    ],
    "owns": {
      "apps": [
        "app-inspectieplanner-ilt",
        "app-brp-bevraging",
        "app-open-data-portaal",
        "app-logaggregatie"
      ],
      "instances": [
        "kafka-inspectieplanner-ilt-acc",
        "redis-inspectieplanner-ilt-prod",
        "postgres-inspectieplanner-ilt-dev",
        "postgres-brp-bevraging-dev",
        "kubernetes-brp-bevraging-test",
        "kafka-open-data-portaal-acc",
        "redis-open-data-portaal-prod",
        "postgres-open-data-portaal-dev",
        "redis-logaggregatie-prod",
        "postgres-logaggregatie-dev",
        "kubernetes-logaggregatie-test"
      ],
      "racks": []
    },
    "oncall": "tim-willems",
    "archetype": "product"
  },
  {
    "id": "team-rws-areaal",
    "name": "Areaalregistratie & Assets",
    "org": "rws",
    "matrix": "#rws-areaal:rijk.chat",
    "members": [
      "nadia-van-der-velde",
      "layla-groen",
      "carla-snijders",
      "nina-van-dijk"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "nadia-van-der-velde",
    "archetype": "gegevens"
  },
  {
    "id": "team-rws-verkeer",
    "name": "Verkeersmanagement",
    "org": "rws",
    "matrix": "#rws-verkeer:rijk.chat",
    "members": [
      "hassan-tuinstra",
      "said-schipper",
      "niels-de-boer",
      "loes-vermeulen"
    ],
    "owns": {
      "apps": [
        "app-factuurverwerking",
        "app-klachtenregistratie"
      ],
      "instances": [
        "postgres-factuurverwerking-dev",
        "kubernetes-factuurverwerking-test",
        "kafka-factuurverwerking-acc",
        "redis-klachtenregistratie-prod",
        "postgres-klachtenregistratie-dev",
        "kubernetes-klachtenregistratie-test"
      ],
      "racks": []
    },
    "oncall": "hassan-tuinstra",
    "archetype": "product"
  },
  {
    "id": "team-rws-sensoren",
    "name": "Sensordata & Telemetrie",
    "org": "rws",
    "matrix": "#rws-sensoren:rijk.chat",
    "members": [
      "gerard-polat",
      "wilma-korteweg",
      "koen-kuipers",
      "boris-van-vliet"
    ],
    "owns": {
      "apps": [
        "app-pki-certificaatbeheer",
        "app-pdf-generator"
      ],
      "instances": [
        "kafka-pki-certificaatbeheer-acc",
        "redis-pki-certificaatbeheer-prod",
        "postgres-pki-certificaatbeheer-dev",
        "kafka-pdf-generator-acc",
        "redis-pdf-generator-prod"
      ],
      "racks": []
    },
    "oncall": "gerard-polat",
    "archetype": "data"
  },
  {
    "id": "team-rws-inspectie",
    "name": "Inspectie-tooling Kunstwerken",
    "org": "rws",
    "matrix": "#rws-inspectie:rijk.chat",
    "members": [
      "casper-bulut",
      "bart-visser",
      "roos-prins",
      "jelle-kaya"
    ],
    "owns": {
      "apps": [
        "app-huisstijl-bibliotheek"
      ],
      "instances": [
        "kubernetes-huisstijl-bibliotheek-test",
        "kafka-huisstijl-bibliotheek-acc",
        "redis-huisstijl-bibliotheek-prod"
      ],
      "racks": []
    },
    "oncall": "casper-bulut",
    "archetype": "inspectie"
  },
  {
    "id": "team-rws-platform",
    "name": "Geoplatform & Kaartdiensten",
    "org": "rws",
    "matrix": "#rws-platform:rijk.chat",
    "members": [
      "suze-kok",
      "nina-van-der-heijden",
      "mila-smeets",
      "anne-mol"
    ],
    "owns": {
      "apps": [
        "app-betaalverzoek",
        "app-handhavingsdossier"
      ],
      "instances": [
        "postgres-betaalverzoek-dev",
        "kubernetes-betaalverzoek-test",
        "kafka-betaalverzoek-acc",
        "kafka-handhavingsdossier-acc",
        "redis-handhavingsdossier-prod"
      ],
      "racks": []
    },
    "oncall": "suze-kok",
    "archetype": "platform"
  },
  {
    "id": "team-ind-aanvragen",
    "name": "Aanvraagstraat Verblijf",
    "org": "ind",
    "matrix": "#ind-aanvragen:rijk.chat",
    "members": [
      "loes-van-den-heuvel",
      "boris-sahin",
      "sem-karaca",
      "ilias-van-es"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "loes-van-den-heuvel",
    "archetype": "product"
  },
  {
    "id": "team-ind-dossiers",
    "name": "Dossier & Zaaksysteem",
    "org": "ind",
    "matrix": "#ind-dossiers:rijk.chat",
    "members": [
      "jelle-driessen",
      "anne-faber",
      "ahmed-van-beek",
      "joost-wagenaar"
    ],
    "owns": {
      "apps": [
        "app-formulierenbouwer",
        "app-gegevensmakelaar",
        "app-virusscanner-gateway"
      ],
      "instances": [
        "kafka-formulierenbouwer-acc",
        "redis-formulierenbouwer-prod",
        "postgres-formulierenbouwer-dev",
        "redis-gegevensmakelaar-prod",
        "postgres-gegevensmakelaar-dev",
        "kubernetes-gegevensmakelaar-test",
        "postgres-virusscanner-gateway-dev",
        "kubernetes-virusscanner-gateway-test"
      ],
      "racks": []
    },
    "oncall": "jelle-driessen",
    "archetype": "uitvoering"
  },
  {
    "id": "team-ind-iam",
    "name": "Identiteitsvaststelling",
    "org": "ind",
    "matrix": "#ind-iam:rijk.chat",
    "members": [
      "ilias-theunissen",
      "joost-strik",
      "mats-reijnders",
      "eva-lubbers"
    ],
    "owns": {
      "apps": [
        "app-ideal-koppeling",
        "app-inkooporder-verwerking"
      ],
      "instances": [
        "kubernetes-ideal-koppeling-test",
        "redis-inkooporder-verwerking-prod",
        "postgres-inkooporder-verwerking-dev"
      ],
      "racks": []
    },
    "oncall": "ilias-theunissen",
    "archetype": "iam"
  },
  {
    "id": "team-ind-data",
    "name": "Stuurinformatie & Ketendata",
    "org": "ind",
    "matrix": "#ind-data:rijk.chat",
    "members": [
      "eva-van-zanten",
      "stijn-wubben",
      "puck-van-dam",
      "stijn-erdem"
    ],
    "owns": {
      "apps": [
        "app-studiefinanciering-portaal",
        "app-milieumelding",
        "app-anonimisering-pipeline",
        "app-rollenmatrix"
      ],
      "instances": [
        "kubernetes-studiefinanciering-portaal-test",
        "kafka-studiefinanciering-portaal-acc",
        "redis-studiefinanciering-portaal-prod",
        "kubernetes-milieumelding-test",
        "kafka-anonimisering-pipeline-acc",
        "redis-rollenmatrix-prod",
        "postgres-rollenmatrix-dev"
      ],
      "racks": []
    },
    "oncall": "eva-van-zanten",
    "archetype": "data"
  },
  {
    "id": "team-logius-digid",
    "name": "DigiD & Authenticatie",
    "org": "logius",
    "matrix": "#logius-digid:rijk.chat",
    "members": [
      "aisha-snijders",
      "pieter-de-boer",
      "hatice-doornbos",
      "aisha-slootweg"
    ],
    "owns": {
      "apps": [
        "app-verkeersboete-viewer"
      ],
      "instances": [
        "redis-verkeersboete-viewer-prod",
        "postgres-verkeersboete-viewer-dev",
        "kubernetes-verkeersboete-viewer-test"
      ],
      "racks": []
    },
    "oncall": "aisha-snijders",
    "archetype": "iam"
  },
  {
    "id": "team-logius-digikoppeling",
    "name": "Digikoppeling & Berichtverkeer",
    "org": "logius",
    "matrix": "#logius-digikoppeling:rijk.chat",
    "members": [
      "rachid-kuipers",
      "hala-prins",
      "emma-bijl",
      "pieter-asik"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "rachid-kuipers",
    "archetype": "platform"
  },
  {
    "id": "team-logius-machtigen",
    "name": "Machtigen & DigiD Machtigen",
    "org": "logius",
    "matrix": "#logius-machtigen:rijk.chat",
    "members": [
      "cornelis-smeets",
      "saskia-karaca",
      "lars-charradi",
      "rachid-el-amrani"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "cornelis-smeets",
    "archetype": "iam"
  },
  {
    "id": "team-logius-stelsel",
    "name": "Stelselvoorzieningen",
    "org": "logius",
    "matrix": "#logius-stelsel:rijk.chat",
    "members": [
      "floris-van-beek",
      "roel-reijnders",
      "femke-verschuren",
      "hala-ozturk"
    ],
    "owns": {
      "apps": [
        "app-leerplicht-melding"
      ],
      "instances": [
        "kubernetes-leerplicht-melding-test",
        "kafka-leerplicht-melding-acc",
        "redis-leerplicht-melding-prod"
      ],
      "racks": []
    },
    "oncall": "floris-van-beek",
    "archetype": "gegevens"
  },
  {
    "id": "team-dictu-hosting",
    "name": "Hosting & Infrastructuur",
    "org": "dictu",
    "matrix": "#dictu-hosting:rijk.chat",
    "members": [
      "vincent-van-dam",
      "sophie-doornbos",
      "sara-peters",
      "cornelis-maas"
    ],
    "owns": {
      "apps": [
        "app-betaalbatch-generator"
      ],
      "instances": [
        "kubernetes-betaalbatch-generator-test"
      ],
      "racks": []
    },
    "oncall": "vincent-van-dam",
    "archetype": "platform"
  },
  {
    "id": "team-dictu-werkplek",
    "name": "Digitale Werkplek",
    "org": "dictu",
    "matrix": "#dictu-werkplek:rijk.chat",
    "members": [
      "indy-bijl",
      "finn-charradi",
      "mehmet-bakkal",
      "saskia-veenstra"
    ],
    "owns": {
      "apps": [
        "app-notificatieservice",
        "app-declaratie-indienen"
      ],
      "instances": [
        "kafka-notificatieservice-acc",
        "redis-declaratie-indienen-prod",
        "postgres-declaratie-indienen-dev",
        "kubernetes-declaratie-indienen-test"
      ],
      "racks": []
    },
    "oncall": "indy-bijl",
    "archetype": "product"
  },
  {
    "id": "team-dictu-security",
    "name": "Security Operations Center",
    "org": "dictu",
    "matrix": "#dictu-security:rijk.chat",
    "members": [
      "wessel-verschuren",
      "britt-peters",
      "imane-scholten",
      "floris-arslan"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "wessel-verschuren",
    "archetype": "security"
  },
  {
    "id": "team-dictu-data",
    "name": "Dataplatform DICTU",
    "org": "dictu",
    "matrix": "#dictu-data:rijk.chat",
    "members": [
      "abdel-bakkal",
      "dilan-scholten",
      "fatih-ben-ali",
      "roel-roeloffzen"
    ],
    "owns": {
      "apps": [
        "app-bezwaarafhandeling",
        "app-bouwvergunning"
      ],
      "instances": [
        "kafka-bezwaarafhandeling-acc",
        "postgres-bouwvergunning-dev",
        "kubernetes-bouwvergunning-test",
        "kafka-bouwvergunning-acc"
      ],
      "racks": []
    },
    "oncall": "abdel-bakkal",
    "archetype": "data"
  },
  {
    "id": "team-rvig-brp",
    "name": "BRP-voorziening",
    "org": "rvig",
    "matrix": "#rvig-brp:rijk.chat",
    "members": [
      "sven-ben-ali",
      "hugo-ouali",
      "dirk-ouali",
      "vincent-van-loon"
    ],
    "owns": {
      "apps": [
        "app-risicoscoring",
        "app-api-catalogus",
        "app-publicatieplatform"
      ],
      "instances": [
        "postgres-risicoscoring-dev",
        "redis-api-catalogus-prod",
        "postgres-api-catalogus-dev",
        "kubernetes-publicatieplatform-test",
        "kafka-publicatieplatform-acc"
      ],
      "racks": []
    },
    "oncall": "sven-ben-ali",
    "archetype": "gegevens"
  },
  {
    "id": "team-rvig-reisdocumenten",
    "name": "Reisdocumenten & RAAS",
    "org": "rvig",
    "matrix": "#rvig-reisdocumenten:rijk.chat",
    "members": [
      "anouk-dekker",
      "fatima-linders",
      "annemarie-dekker",
      "sophie-lammers"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "anouk-dekker",
    "archetype": "product"
  },
  {
    "id": "team-rvig-iam",
    "name": "Identiteitsbeheer eID",
    "org": "rvig",
    "matrix": "#rvig-iam:rijk.chat",
    "members": [
      "bilal-verbruggen",
      "zeynep-cetin",
      "quinten-linders",
      "indy-nijhuis"
    ],
    "owns": {
      "apps": [
        "app-datakwaliteit-monitor"
      ],
      "instances": [
        "kubernetes-datakwaliteit-monitor-test",
        "kafka-datakwaliteit-monitor-acc",
        "redis-datakwaliteit-monitor-prod"
      ],
      "racks": []
    },
    "oncall": "bilal-verbruggen",
    "archetype": "iam"
  },
  {
    "id": "team-jio-platform",
    "name": "Justitieel Cloudplatform",
    "org": "jio",
    "matrix": "#jio-platform:rijk.chat",
    "members": [
      "willem-van-der-plas",
      "kees-cinar",
      "maarten-verbruggen",
      "finn-holwerda"
    ],
    "owns": {
      "apps": [
        "app-zaaksysteem"
      ],
      "instances": [
        "kubernetes-zaaksysteem-test",
        "kafka-zaaksysteem-acc"
      ],
      "racks": []
    },
    "oncall": "willem-van-der-plas",
    "archetype": "platform"
  },
  {
    "id": "team-jio-keten",
    "name": "Ketenvoorzieningen Strafrecht",
    "org": "jio",
    "matrix": "#jio-keten:rijk.chat",
    "members": [
      "carla-bakker",
      "niels-brouwer",
      "tess-cetin",
      "wessel-naber"
    ],
    "owns": {
      "apps": [
        "app-wachtrij-manager"
      ],
      "instances": [
        "kubernetes-wachtrij-manager-test",
        "kafka-wachtrij-manager-acc",
        "redis-wachtrij-manager-prod"
      ],
      "racks": []
    },
    "oncall": "carla-bakker",
    "archetype": "uitvoering"
  },
  {
    "id": "team-jio-security",
    "name": "Beveiliging & Hardening",
    "org": "jio",
    "matrix": "#jio-security:rijk.chat",
    "members": [
      "koen-schouten",
      "roos-sanders",
      "veerle-van-der-plas",
      "britt-veldhuis"
    ],
    "owns": {
      "apps": [
        "app-servicedesk-portaal",
        "app-cloudevents-broker"
      ],
      "instances": [
        "postgres-servicedesk-portaal-dev",
        "kubernetes-servicedesk-portaal-test",
        "kafka-servicedesk-portaal-acc",
        "postgres-cloudevents-broker-dev",
        "kubernetes-cloudevents-broker-test"
      ],
      "racks": []
    },
    "oncall": "koen-schouten",
    "archetype": "security"
  },
  {
    "id": "team-cjib-inning",
    "name": "Inning & Incasso",
    "org": "cjib",
    "matrix": "#cjib-inning:rijk.chat",
    "members": [
      "mila-celik",
      "sem-van-der-laan",
      "marit-cinar",
      "abdel-mulder"
    ],
    "owns": {
      "apps": [
        "app-statistiek-dashboard-cbs",
        "app-oidc-provider",
        "app-personeelsdossier"
      ],
      "instances": [
        "redis-statistiek-dashboard-cbs-prod",
        "kafka-oidc-provider-acc",
        "kubernetes-personeelsdossier-test"
      ],
      "racks": []
    },
    "oncall": "mila-celik",
    "archetype": "betalingen"
  },
  {
    "id": "team-cjib-sanctie",
    "name": "Sanctievoorzieningen",
    "org": "cjib",
    "matrix": "#cjib-sanctie:rijk.chat",
    "members": [
      "ahmed-wijnands",
      "mats-engelen",
      "teun-bakker",
      "dilan-janssen"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "ahmed-wijnands",
    "archetype": "uitvoering"
  },
  {
    "id": "team-cjib-data",
    "name": "Inningsdata & Rapportage",
    "org": "cjib",
    "matrix": "#cjib-data:rijk.chat",
    "members": [
      "puck-van-hattem",
      "hatice-gunes",
      "ties-brouwer",
      "sven-huisman"
    ],
    "owns": {
      "apps": [
        "app-documentatiesite"
      ],
      "instances": [
        "kafka-documentatiesite-acc"
      ],
      "racks": []
    },
    "oncall": "puck-van-hattem",
    "archetype": "data"
  },
  {
    "id": "team-svb-aow",
    "name": "AOW & Pensioenuitkeringen",
    "org": "svb",
    "matrix": "#svb-aow:rijk.chat",
    "members": [
      "emma-geerts",
      "lars-kraaijeveld",
      "romy-schouten",
      "hugo-vink"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "emma-geerts",
    "archetype": "betalingen"
  },
  {
    "id": "team-svb-kinderbijslag",
    "name": "Kinderbijslag (AKW)",
    "org": "svb",
    "matrix": "#svb-kinderbijslag:rijk.chat",
    "members": [
      "femke-meijer",
      "sara-de-wit",
      "younes-sanders",
      "anouk-ennaji"
    ],
    "owns": {
      "apps": [
        "app-adrescheck-bag",
        "app-wob-verzoek"
      ],
      "instances": [
        "redis-adrescheck-bag-prod",
        "postgres-wob-verzoek-dev"
      ],
      "racks": []
    },
    "oncall": "femke-meijer",
    "archetype": "betalingen"
  },
  {
    "id": "team-svb-gegevens",
    "name": "Verzekerdenadministratie",
    "org": "svb",
    "matrix": "#svb-gegevens:rijk.chat",
    "members": [
      "mehmet-koster",
      "imane-gerritsen",
      "bram-celik",
      "fatima-roos"
    ],
    "owns": {
      "apps": [
        "app-sms-gateway"
      ],
      "instances": [
        "redis-sms-gateway-prod",
        "postgres-sms-gateway-dev"
      ],
      "racks": []
    },
    "oncall": "mehmet-koster",
    "archetype": "gegevens"
  },
  {
    "id": "team-svb-platform",
    "name": "Platform & Integratie",
    "org": "svb",
    "matrix": "#svb-platform:rijk.chat",
    "members": [
      "fatih-korkmaz",
      "dirk-verbeek",
      "ruben-van-der-laan",
      "bilal-bruins"
    ],
    "owns": {
      "apps": [
        "app-toegangsbeheer"
      ],
      "instances": [
        "kubernetes-toegangsbeheer-test",
        "kafka-toegangsbeheer-acc",
        "redis-toegangsbeheer-prod"
      ],
      "racks": []
    },
    "oncall": "fatih-korkmaz",
    "archetype": "platform"
  },
  {
    "id": "team-kvk-handelsregister",
    "name": "Handelsregister",
    "org": "kvk",
    "matrix": "#kvk-handelsregister:rijk.chat",
    "members": [
      "annemarie-van-wijk",
      "quinten-de-groot",
      "yara-wijnands",
      "zeynep-van-der-veen"
    ],
    "owns": {
      "apps": [
        "app-reisdocument-aanvraag"
      ],
      "instances": [
        "kubernetes-reisdocument-aanvraag-test"
      ],
      "racks": []
    },
    "oncall": "annemarie-van-wijk",
    "archetype": "gegevens"
  },
  {
    "id": "team-kvk-api",
    "name": "Open Dataservices & API",
    "org": "kvk",
    "matrix": "#kvk-api:rijk.chat",
    "members": [
      "maarten-berends",
      "tess-tromp",
      "youssef-engelen",
      "willem-mohamed"
    ],
    "owns": {
      "apps": [
        "app-vergunningchecker"
      ],
      "instances": [
        "kafka-vergunningchecker-acc"
      ],
      "racks": []
    },
    "oncall": "maarten-berends",
    "archetype": "data"
  },
  {
    "id": "team-kvk-ondernemersplein",
    "name": "Ondernemersplein",
    "org": "kvk",
    "matrix": "#kvk-ondernemersplein:rijk.chat",
    "members": [
      "veerle-bouazza",
      "marit-roozendaal",
      "karim-van-hattem",
      "kees-van-os"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "veerle-bouazza",
    "archetype": "product"
  },
  {
    "id": "team-ienw-kenteken",
    "name": "Kentekenregister",
    "org": "ienw",
    "matrix": "#ienw-kenteken:rijk.chat",
    "members": [
      "teun-vos",
      "ties-van-der-meer",
      "samira-gunes",
      "carla-el-khattabi"
    ],
    "owns": {
      "apps": [
        "app-rijksbegroting-explorer"
      ],
      "instances": [
        "kubernetes-rijksbegroting-explorer-test",
        "kafka-rijksbegroting-explorer-acc"
      ],
      "racks": []
    },
    "oncall": "teun-vos",
    "archetype": "gegevens"
  },
  {
    "id": "team-ienw-voertuig",
    "name": "Voertuigdiensten & Keuring",
    "org": "ienw",
    "matrix": "#ienw-voertuig:rijk.chat",
    "members": [
      "romy-de-lange",
      "younes-bouali",
      "bouchra-geerts",
      "niels-wielinga"
    ],
    "owns": {
      "apps": [
        "app-etl-basisregisters",
        "app-sanctielijst-check",
        "app-backup-scheduler"
      ],
      "instances": [
        "postgres-etl-basisregisters-dev",
        "kubernetes-etl-basisregisters-test",
        "kubernetes-sanctielijst-check-test",
        "kafka-sanctielijst-check-acc",
        "kubernetes-backup-scheduler-test",
        "kafka-backup-scheduler-acc",
        "redis-backup-scheduler-prod"
      ],
      "racks": []
    },
    "oncall": "romy-de-lange",
    "archetype": "product"
  },
  {
    "id": "team-ienw-data",
    "name": "Mobiliteitsdata",
    "org": "ienw",
    "matrix": "#ienw-data:rijk.chat",
    "members": [
      "bram-el-hadioui",
      "ruben-van-der-wal",
      "johan-kraaijeveld",
      "koen-hendriks"
    ],
    "owns": {
      "apps": [
        "app-fraudedetectie"
      ],
      "instances": [
        "redis-fraudedetectie-prod",
        "postgres-fraudedetectie-dev",
        "kubernetes-fraudedetectie-test"
      ],
      "racks": []
    },
    "oncall": "bram-el-hadioui",
    "archetype": "data"
  },
  {
    "id": "team-cbs-statline",
    "name": "StatLine & Publicatie",
    "org": "cbs",
    "matrix": "#cbs-statline:rijk.chat",
    "members": [
      "yara-goossens",
      "youssef-van-driel",
      "petra-meijer",
      "roos-hofman"
    ],
    "owns": {
      "apps": [
        "app-kentekencheck",
        "app-audit-logboek",
        "app-stelselcatalogus",
        "app-kostenrapportage"
      ],
      "instances": [
        "postgres-kentekencheck-dev",
        "kubernetes-kentekencheck-test",
        "postgres-audit-logboek-dev",
        "kubernetes-audit-logboek-test",
        "postgres-stelselcatalogus-dev",
        "kafka-kostenrapportage-acc"
      ],
      "racks": []
    },
    "oncall": "yara-goossens",
    "archetype": "data"
  },
  {
    "id": "team-cbs-microdata",
    "name": "Microdataservices",
    "org": "cbs",
    "matrix": "#cbs-microdata:rijk.chat",
    "members": [
      "karim-bakhti",
      "samira-renkema",
      "tobias-de-wit",
      "mila-willems"
    ],
    "owns": {
      "apps": [
        "app-nachtelijke-batchrun",
        "app-feature-flags"
      ],
      "instances": [
        "postgres-nachtelijke-batchrun-dev",
        "kubernetes-nachtelijke-batchrun-test",
        "kafka-nachtelijke-batchrun-acc",
        "kafka-feature-flags-acc",
        "redis-feature-flags-prod",
        "postgres-feature-flags-dev"
      ],
      "racks": []
    },
    "oncall": "karim-bakhti",
    "archetype": "data"
  },
  {
    "id": "team-cbs-platform",
    "name": "Onderzoeksplatform",
    "org": "cbs",
    "matrix": "#cbs-platform:rijk.chat",
    "members": [
      "bouchra-yildiz",
      "johan-jansen",
      "wouter-koster",
      "sem-demir"
    ],
    "owns": {
      "apps": [
        "app-iban-validatie",
        "app-config-store",
        "app-berichtenbox"
      ],
      "instances": [
        "kafka-iban-validatie-acc",
        "redis-iban-validatie-prod",
        "postgres-iban-validatie-dev",
        "redis-config-store-prod",
        "postgres-berichtenbox-dev"
      ],
      "racks": []
    },
    "oncall": "bouchra-yildiz",
    "archetype": "platform"
  },
  {
    "id": "team-cbs-privacy",
    "name": "Statistische Beveiliging",
    "org": "cbs",
    "matrix": "#cbs-privacy:rijk.chat",
    "members": [
      "petra-dijkstra",
      "tobias-van-leeuwen",
      "erik-gerritsen",
      "ahmed-van-der-velde"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "petra-dijkstra",
    "archetype": "security"
  },
  {
    "id": "team-justid-documentatie",
    "name": "Justitiële Documentatie",
    "org": "justid",
    "matrix": "#justid-documentatie:rijk.chat",
    "members": [
      "wouter-hoekstra",
      "erik-aydin",
      "lara-korkmaz",
      "mats-groen"
    ],
    "owns": {
      "apps": [
        "app-standaarden-checker"
      ],
      "instances": [
        "postgres-standaarden-checker-dev",
        "kubernetes-standaarden-checker-test",
        "kafka-standaarden-checker-acc"
      ],
      "racks": []
    },
    "oncall": "wouter-hoekstra",
    "archetype": "gegevens"
  },
  {
    "id": "team-justid-vog",
    "name": "VOG-diensten",
    "org": "justid",
    "matrix": "#justid-vog:rijk.chat",
    "members": [
      "lara-kuiper",
      "fleur-stam",
      "fleur-verbeek",
      "puck-tuinstra"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "lara-kuiper",
    "archetype": "product"
  },
  {
    "id": "team-koop-wetten",
    "name": "Wetten & Regelgeving Publicatie",
    "org": "logius",
    "matrix": "#koop-wetten:rijk.chat",
    "members": [
      "luuk-bosman",
      "pim-donker",
      "luuk-van-wijk",
      "hatice-schipper"
    ],
    "owns": {
      "apps": [
        "app-omgevingsloket"
      ],
      "instances": [
        "redis-omgevingsloket-prod",
        "postgres-omgevingsloket-dev"
      ],
      "racks": []
    },
    "oncall": "luuk-bosman",
    "archetype": "docs"
  },
  {
    "id": "team-koop-officielebekendmakingen",
    "name": "Officiële Bekendmakingen",
    "org": "logius",
    "matrix": "#koop-officielebekendmakingen:rijk.chat",
    "members": [
      "demi-tekin",
      "driss-buitenhuis",
      "pim-de-groot",
      "emma-polat"
    ],
    "owns": {
      "apps": [
        "app-aangifte-omzetbelasting"
      ],
      "instances": [
        "postgres-aangifte-omzetbelasting-dev",
        "kubernetes-aangifte-omzetbelasting-test",
        "kafka-aangifte-omzetbelasting-acc"
      ],
      "racks": []
    },
    "oncall": "demi-tekin",
    "archetype": "docs"
  },
  {
    "id": "team-dpc-rijksoverheid",
    "name": "Rijksoverheid.nl",
    "org": "dpc",
    "matrix": "#dpc-rijksoverheid:rijk.chat",
    "members": [
      "sanne-van-bommel",
      "thijs-smit",
      "demi-berends",
      "lars-korteweg"
    ],
    "owns": {
      "apps": [
        "app-verblijfsvergunning",
        "app-toegankelijkheid-scanner"
      ],
      "instances": [
        "kubernetes-verblijfsvergunning-test",
        "kubernetes-toegankelijkheid-scanner-test"
      ],
      "racks": []
    },
    "oncall": "sanne-van-bommel",
    "archetype": "product"
  },
  {
    "id": "team-dpc-content",
    "name": "Contentplatform & CMS",
    "org": "dpc",
    "matrix": "#dpc-content:rijk.chat",
    "members": [
      "maud-yilmaz",
      "mohammed-verhoeven",
      "driss-tromp",
      "femke-bulut"
    ],
    "owns": {
      "apps": [
        "app-fsc-inway"
      ],
      "instances": [
        "redis-fsc-inway-prod"
      ],
      "racks": []
    },
    "oncall": "maud-yilmaz",
    "archetype": "docs"
  },
  {
    "id": "team-dji-detentie",
    "name": "Detentievoorzieningen",
    "org": "dji",
    "matrix": "#dji-detentie:rijk.chat",
    "members": [
      "ans-wolters",
      "amira-dogan",
      "sanne-bouazza",
      "sara-visser"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "ans-wolters",
    "archetype": "uitvoering"
  },
  {
    "id": "team-dji-data",
    "name": "Capaciteitsmanagement",
    "org": "dji",
    "matrix": "#dji-data:rijk.chat",
    "members": [
      "omar-timmermans",
      "henk-evers",
      "thijs-roozendaal",
      "mehmet-kok"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "omar-timmermans",
    "archetype": "data"
  },
  {
    "id": "team-cbr-rijbewijs",
    "name": "Rijbewijsdiensten",
    "org": "cbr",
    "matrix": "#cbr-rijbewijs:rijk.chat",
    "members": [
      "marieke-van-rijn",
      "yvonne-van-ginkel",
      "maud-vos",
      "imane-van-der-heijden"
    ],
    "owns": {
      "apps": [
        "app-zorgtoeslag-portaal",
        "app-sepa-incasso-job",
        "app-energieverbruik-monitor"
      ],
      "instances": [
        "kafka-zorgtoeslag-portaal-acc",
        "redis-zorgtoeslag-portaal-prod",
        "kafka-sepa-incasso-job-acc",
        "redis-sepa-incasso-job-prod",
        "postgres-energieverbruik-monitor-dev",
        "kubernetes-energieverbruik-monitor-test",
        "kafka-energieverbruik-monitor-acc"
      ],
      "racks": []
    },
    "oncall": "marieke-van-rijn",
    "archetype": "product"
  },
  {
    "id": "team-cbr-reservering",
    "name": "Examenreservering",
    "org": "cbr",
    "matrix": "#cbr-reservering:rijk.chat",
    "members": [
      "sander-sikkema",
      "mark-vreeswijk",
      "mohammed-van-der-meer",
      "fatih-van-den-heuvel"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "sander-sikkema",
    "archetype": "product"
  },
  {
    "id": "team-acm-toezicht",
    "name": "Markttoezicht-tooling",
    "org": "acm",
    "matrix": "#acm-toezicht:rijk.chat",
    "members": [
      "julia-pijnenburg",
      "liv-bos",
      "ans-de-lange",
      "dirk-sahin"
    ],
    "owns": {
      "apps": [
        "app-eherkenning-broker",
        "app-pgb-beheer",
        "app-onderwijsregistratie"
      ],
      "instances": [
        "postgres-eherkenning-broker-dev",
        "redis-pgb-beheer-prod",
        "postgres-pgb-beheer-dev",
        "kubernetes-pgb-beheer-test",
        "redis-onderwijsregistratie-prod"
      ],
      "racks": []
    },
    "oncall": "julia-pijnenburg",
    "archetype": "inspectie"
  },
  {
    "id": "team-afm-toezicht",
    "name": "Toezichtdata Financiële Markten",
    "org": "afm",
    "matrix": "#afm-toezicht:rijk.chat",
    "members": [
      "mees-van-den-berg",
      "khalid-postma",
      "amira-bouali",
      "annemarie-driessen"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "mees-van-den-berg",
    "archetype": "inspectie"
  },
  {
    "id": "team-ksa-handhaving",
    "name": "Kansspelhandhaving",
    "org": "ksa",
    "matrix": "#ksa-handhaving:rijk.chat",
    "members": [
      "lieke-el-idrissi",
      "isa-boutaleb",
      "omar-el-hadioui",
      "quinten-faber"
    ],
    "owns": {
      "apps": [
        "app-afspraakplanner"
      ],
      "instances": [
        "postgres-afspraakplanner-dev",
        "kubernetes-afspraakplanner-test"
      ],
      "racks": []
    },
    "oncall": "lieke-el-idrissi",
    "archetype": "inspectie"
  },
  {
    "id": "team-nza-zorgdata",
    "name": "Zorgdeclaratiedata",
    "org": "nza",
    "matrix": "#nza-zorgdata:rijk.chat",
    "members": [
      "selin-blom",
      "daan-heijmans",
      "henk-van-der-wal",
      "maarten-theunissen"
    ],
    "owns": {
      "apps": [
        "app-monitoring-collector",
        "app-vragenlijst-engine",
        "app-verlofaanvraag"
      ],
      "instances": [
        "kafka-monitoring-collector-acc",
        "redis-monitoring-collector-prod",
        "redis-vragenlijst-engine-prod",
        "kafka-verlofaanvraag-acc",
        "redis-verlofaanvraag-prod"
      ],
      "racks": []
    },
    "oncall": "selin-blom",
    "archetype": "data"
  },
  {
    "id": "team-fin-financieel",
    "name": "Financiële Systemen",
    "org": "fin",
    "matrix": "#fin-financieel:rijk.chat",
    "members": [
      "iris-koning",
      "jeroen-hamid",
      "marieke-goossens",
      "tess-strik"
    ],
    "owns": {
      "apps": [
        "app-besluitenregister"
      ],
      "instances": [
        "kafka-besluitenregister-acc",
        "redis-besluitenregister-prod",
        "postgres-besluitenregister-dev"
      ],
      "racks": []
    },
    "oncall": "iris-koning",
    "archetype": "betalingen"
  },
  {
    "id": "team-fin-platform",
    "name": "Departementaal Platform",
    "org": "fin",
    "matrix": "#fin-platform:rijk.chat",
    "members": [
      "noor-diks",
      "esra-akkaya",
      "yvonne-van-driel",
      "veerle-van-zanten"
    ],
    "owns": {
      "apps": [
        "app-waterschapsheffing"
      ],
      "instances": [
        "kafka-waterschapsheffing-acc",
        "redis-waterschapsheffing-prod"
      ],
      "racks": []
    },
    "oncall": "noor-diks",
    "archetype": "platform"
  },
  {
    "id": "team-szw-regelingen",
    "name": "Regelingen & Uitvoering",
    "org": "szw",
    "matrix": "#szw-regelingen:rijk.chat",
    "members": [
      "tariq-de-vries",
      "soumaya-van-dijk",
      "sander-bakhti",
      "marit-wubben"
    ],
    "owns": {
      "apps": [
        "app-digid-koppeling",
        "app-boete-bezwaar"
      ],
      "instances": [
        "redis-digid-koppeling-prod",
        "postgres-digid-koppeling-dev",
        "kubernetes-digid-koppeling-test",
        "redis-boete-bezwaar-prod",
        "postgres-boete-bezwaar-dev"
      ],
      "racks": []
    },
    "oncall": "tariq-de-vries",
    "archetype": "uitvoering"
  },
  {
    "id": "team-vws-zorgregister",
    "name": "Zorgregister & CIBG",
    "org": "vws",
    "matrix": "#vws-zorgregister:rijk.chat",
    "members": [
      "jan-vermeulen",
      "ingrid-van-vliet",
      "mark-renkema",
      "teun-snijders"
    ],
    "owns": {
      "apps": [
        "app-vaccinatieregister"
      ],
      "instances": [
        "kubernetes-vaccinatieregister-test",
        "kafka-vaccinatieregister-acc"
      ],
      "racks": []
    },
    "oncall": "jan-vermeulen",
    "archetype": "gegevens"
  },
  {
    "id": "team-vws-data",
    "name": "Volksgezondheid Data",
    "org": "vws",
    "matrix": "#vws-data:rijk.chat",
    "members": [
      "jasper-kaya",
      "robin-mol",
      "julia-yildiz",
      "ties-de-boer"
    ],
    "owns": {
      "apps": [
        "app-aanbestedingsportaal"
      ],
      "instances": [
        "kafka-aanbestedingsportaal-acc"
      ],
      "racks": []
    },
    "oncall": "jasper-kaya",
    "archetype": "data"
  },
  {
    "id": "team-jenv-keten",
    "name": "Strafrechtketen-integratie",
    "org": "jenv",
    "matrix": "#jenv-keten:rijk.chat",
    "members": [
      "fenna-van-es",
      "sterre-wagenaar",
      "liv-jansen",
      "romy-kuipers"
    ],
    "owns": {
      "apps": [
        "app-jeugdzorg-dossier",
        "app-archief-export"
      ],
      "instances": [
        "kafka-jeugdzorg-dossier-acc",
        "redis-jeugdzorg-dossier-prod",
        "postgres-jeugdzorg-dossier-dev",
        "redis-archief-export-prod",
        "postgres-archief-export-dev"
      ],
      "racks": []
    },
    "oncall": "fenna-van-es",
    "archetype": "uitvoering"
  },
  {
    "id": "team-ocw-cultuurdata",
    "name": "Cultuur- & Erfgoeddata",
    "org": "ocw",
    "matrix": "#ocw-cultuurdata:rijk.chat",
    "members": [
      "levi-lubbers",
      "gijs-erdem",
      "mees-dijkstra",
      "younes-prins"
    ],
    "owns": {
      "apps": [
        "app-ci-runnerpool",
        "app-machtigingenregister"
      ],
      "instances": [
        "kubernetes-ci-runnerpool-test",
        "kafka-ci-runnerpool-acc",
        "kafka-machtigingenregister-acc",
        "redis-machtigingenregister-prod"
      ],
      "racks": []
    },
    "oncall": "levi-lubbers",
    "archetype": "data"
  },
  {
    "id": "team-lnv-natuur",
    "name": "Natuurregister & Stikstof",
    "org": "lnv",
    "matrix": "#lnv-natuur:rijk.chat",
    "members": [
      "olivier-slootweg",
      "senna-asik",
      "khalid-van-leeuwen",
      "bram-smeets"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "olivier-slootweg",
    "archetype": "gegevens"
  },
  {
    "id": "team-ezk-ondernemen",
    "name": "Ondernemersdiensten",
    "org": "ezk",
    "matrix": "#ezk-ondernemen:rijk.chat",
    "members": [
      "meryem-el-amrani",
      "lotte-ozturk",
      "lieke-hoekstra",
      "ruben-karaca"
    ],
    "owns": {
      "apps": [
        "app-bijstandsuitkering",
        "app-zorgverzekeraar-koppeling"
      ],
      "instances": [
        "kafka-bijstandsuitkering-acc",
        "redis-bijstandsuitkering-prod",
        "postgres-zorgverzekeraar-koppeling-dev"
      ],
      "racks": []
    },
    "oncall": "meryem-el-amrani",
    "archetype": "product"
  },
  {
    "id": "team-kgg-energie",
    "name": "Energiedata & Verduurzaming",
    "org": "kgg",
    "matrix": "#kgg-energie:rijk.chat",
    "members": [
      "tim-maas",
      "bas-veenstra",
      "isa-aydin",
      "yara-van-beek"
    ],
    "owns": {
      "apps": [
        "app-parkeervergunning",
        "app-digikoppeling-adapter"
      ],
      "instances": [
        "postgres-parkeervergunning-dev",
        "kafka-digikoppeling-adapter-acc",
        "redis-digikoppeling-adapter-prod",
        "postgres-digikoppeling-adapter-dev"
      ],
      "racks": []
    },
    "oncall": "tim-maas",
    "archetype": "data"
  },
  {
    "id": "team-az-comms",
    "name": "Communicatieplatform AZ",
    "org": "az",
    "matrix": "#az-comms:rijk.chat",
    "members": [
      "nadia-arslan",
      "layla-roeloffzen",
      "selin-kuiper",
      "youssef-reijnders"
    ],
    "owns": {
      "apps": [
        "app-handelsregister-zoeker"
      ],
      "instances": [
        "kubernetes-handelsregister-zoeker-test",
        "kafka-handelsregister-zoeker-acc",
        "redis-handelsregister-zoeker-prod"
      ],
      "racks": []
    },
    "oncall": "nadia-arslan",
    "archetype": "docs"
  },
  {
    "id": "team-bz-consulair",
    "name": "Consulaire Dienstverlening",
    "org": "bz",
    "matrix": "#bz-consulair:rijk.chat",
    "members": [
      "hassan-van-loon",
      "said-lammers",
      "daan-stam",
      "karim-van-dam"
    ],
    "owns": {
      "apps": [
        "app-capaciteitsplanner-dc"
      ],
      "instances": [
        "redis-capaciteitsplanner-dc-prod",
        "postgres-capaciteitsplanner-dc-dev"
      ],
      "racks": []
    },
    "oncall": "hassan-van-loon",
    "archetype": "product"
  },
  {
    "id": "team-def-secinfra",
    "name": "Beveiligde Infrastructuur",
    "org": "def",
    "matrix": "#def-secinfra:rijk.chat",
    "members": [
      "gerard-nijhuis",
      "wilma-holwerda",
      "iris-bosman",
      "samira-doornbos"
    ],
    "owns": {
      "apps": [
        "app-kadaster-viewer"
      ],
      "instances": [
        "redis-kadaster-viewer-prod",
        "postgres-kadaster-viewer-dev",
        "kubernetes-kadaster-viewer-test"
      ],
      "racks": []
    },
    "oncall": "gerard-nijhuis",
    "archetype": "security"
  },
  {
    "id": "team-aenm-keten",
    "name": "Migratieketen-voorzieningen",
    "org": "aenm",
    "matrix": "#aenm-keten:rijk.chat",
    "members": [
      "casper-naber",
      "bart-veldhuis",
      "jeroen-donker",
      "bouchra-bijl"
    ],
    "owns": {
      "apps": [
        "app-huurtoeslag-rekenen"
      ],
      "instances": [
        "kafka-huurtoeslag-rekenen-acc",
        "redis-huurtoeslag-rekenen-prod"
      ],
      "racks": []
    },
    "oncall": "casper-naber",
    "archetype": "uitvoering"
  },
  {
    "id": "team-dhc-geschillen",
    "name": "Geschilbeslechting Huur",
    "org": "dhc",
    "matrix": "#dhc-geschillen:rijk.chat",
    "members": [
      "suze-mulder",
      "nina-janssen",
      "noor-tekin",
      "johan-charradi"
    ],
    "owns": {
      "apps": [
        "app-nldd-componenten"
      ],
      "instances": [
        "postgres-nldd-componenten-dev",
        "kubernetes-nldd-componenten-test"
      ],
      "racks": []
    },
    "oncall": "suze-mulder",
    "archetype": "uitvoering"
  },
  {
    "id": "team-ez-markt",
    "name": "Marktdiensten EZ",
    "org": "ez",
    "matrix": "#ez-markt:rijk.chat",
    "members": [
      "loes-huisman",
      "boris-vink",
      "esra-buitenhuis",
      "petra-verschuren"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "loes-huisman",
    "archetype": "product"
  },
  {
    "id": "team-bzk-iam",
    "name": "Rijksbreed IAM & Toegang",
    "org": "bzk",
    "matrix": "#bzk-iam:rijk.chat",
    "members": [
      "jelle-ennaji",
      "anne-roos",
      "tariq-van-bommel",
      "tobias-peters"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "jelle-ennaji",
    "archetype": "iam"
  },
  {
    "id": "team-bzk-security",
    "name": "Informatiebeveiliging BZK",
    "org": "bzk",
    "matrix": "#bzk-security:rijk.chat",
    "members": [
      "ilias-bruins",
      "joost-van-der-veen",
      "soumaya-smit",
      "wouter-bakkal"
    ],
    "owns": {
      "apps": [],
      "instances": [],
      "racks": []
    },
    "oncall": "ilias-bruins",
    "archetype": "security"
  },
  {
    "id": "team-nldd-docs",
    "name": "Documentatie & Developer Experience",
    "org": "nldd",
    "matrix": "#nldd-docs:rijk.chat",
    "members": [
      "eva-mohamed",
      "stijn-van-os",
      "jan-yilmaz",
      "erik-scholten"
    ],
    "owns": {
      "apps": [
        "app-inspectierapport-generator"
      ],
      "instances": [
        "kubernetes-inspectierapport-generator-test"
      ],
      "racks": []
    },
    "oncall": "eva-mohamed",
    "archetype": "docs"
  },
  {
    "id": "team-nldd-iam",
    "name": "Gilde IAM & Federatie",
    "org": "nldd",
    "matrix": "#nldd-iam:rijk.chat",
    "members": [
      "aisha-el-khattabi",
      "pieter-wielinga",
      "ingrid-verhoeven",
      "lara-ben-ali"
    ],
    "owns": {
      "apps": [
        "app-inkomenstoets"
      ],
      "instances": [
        "redis-inkomenstoets-prod",
        "postgres-inkomenstoets-dev"
      ],
      "racks": []
    },
    "oncall": "aisha-el-khattabi",
    "archetype": "iam"
  },
  {
    "id": "team-logius-docs",
    "name": "Standaarden & Documentatie",
    "org": "logius",
    "matrix": "#logius-docs:rijk.chat",
    "members": [
      "rachid-hendriks",
      "hala-hofman",
      "jasper-wolters",
      "fleur-ouali"
    ],
    "owns": {
      "apps": [
        "app-ww-aanvraag",
        "app-kinderbijslag",
        "app-handtekening-validatie"
      ],
      "instances": [
        "kubernetes-ww-aanvraag-test",
        "kafka-ww-aanvraag-acc",
        "postgres-kinderbijslag-dev",
        "kubernetes-kinderbijslag-test",
        "redis-handtekening-validatie-prod"
      ],
      "racks": []
    },
    "oncall": "rachid-hendriks",
    "archetype": "docs"
  }
];

export const oncall = [
  {
    "team": "team-platform",
    "person": "fatima",
    "until": "ma 9:00",
    "escalation": [
      "ans"
    ]
  },
  {
    "team": "team-burgerzaken",
    "person": "joost",
    "until": "ma 9:00",
    "escalation": []
  },
  {
    "team": "team-toeslagen",
    "person": "sanne",
    "until": "ma 9:00",
    "escalation": []
  },
  {
    "team": "team-data",
    "person": "pieter",
    "until": "ma 9:00",
    "escalation": []
  },
  {
    "team": "team-bd-inning",
    "person": "sanne-de-vries",
    "until": "ma 9:00",
    "escalation": [
      "thijs-van-dijk"
    ]
  },
  {
    "team": "team-bd-aangifte",
    "person": "maud-vermeulen",
    "until": "ma 9:00",
    "escalation": [
      "mohammed-van-vliet"
    ]
  },
  {
    "team": "team-bd-gegevens",
    "person": "ans-kaya",
    "until": "ma 9:00",
    "escalation": [
      "amira-mol"
    ]
  },
  {
    "team": "team-bd-fraude",
    "person": "omar-van-es",
    "until": "ma 9:00",
    "escalation": [
      "henk-wagenaar"
    ]
  },
  {
    "team": "team-bd-iam",
    "person": "marieke-lubbers",
    "until": "ma 9:00",
    "escalation": [
      "yvonne-erdem"
    ]
  },
  {
    "team": "team-bd-platform",
    "person": "sander-slootweg",
    "until": "ma 9:00",
    "escalation": [
      "mark-asik"
    ]
  },
  {
    "team": "team-duo-studiefinanciering",
    "person": "julia-el-amrani",
    "until": "ma 9:00",
    "escalation": [
      "liv-ozturk"
    ]
  },
  {
    "team": "team-duo-register",
    "person": "mees-maas",
    "until": "ma 9:00",
    "escalation": [
      "khalid-veenstra"
    ]
  },
  {
    "team": "team-duo-examens",
    "person": "lieke-arslan",
    "until": "ma 9:00",
    "escalation": [
      "isa-roeloffzen"
    ]
  },
  {
    "team": "team-duo-data",
    "person": "selin-van-loon",
    "until": "ma 9:00",
    "escalation": [
      "daan-lammers"
    ]
  },
  {
    "team": "team-duo-platform",
    "person": "iris-nijhuis",
    "until": "ma 9:00",
    "escalation": [
      "jeroen-holwerda"
    ]
  },
  {
    "team": "team-uwv-uitkeringen",
    "person": "noor-naber",
    "until": "ma 9:00",
    "escalation": [
      "esra-veldhuis"
    ]
  },
  {
    "team": "team-uwv-werk",
    "person": "tariq-mulder",
    "until": "ma 9:00",
    "escalation": [
      "soumaya-janssen"
    ]
  },
  {
    "team": "team-uwv-gegevens",
    "person": "jan-huisman",
    "until": "ma 9:00",
    "escalation": [
      "ingrid-vink"
    ]
  },
  {
    "team": "team-uwv-arbeidsmarkt",
    "person": "jasper-ennaji",
    "until": "ma 9:00",
    "escalation": [
      "robin-roos"
    ]
  },
  {
    "team": "team-uwv-platform",
    "person": "fenna-bruins",
    "until": "ma 9:00",
    "escalation": [
      "sterre-van-der-veen"
    ]
  },
  {
    "team": "team-rvo-subsidies",
    "person": "levi-mohamed",
    "until": "ma 9:00",
    "escalation": [
      "gijs-van-os"
    ]
  },
  {
    "team": "team-rvo-vergunningen",
    "person": "olivier-el-khattabi",
    "until": "ma 9:00",
    "escalation": [
      "senna-wielinga"
    ]
  },
  {
    "team": "team-rvo-geodata",
    "person": "meryem-hendriks",
    "until": "ma 9:00",
    "escalation": [
      "lotte-hofman"
    ]
  },
  {
    "team": "team-rvo-portaal",
    "person": "tim-willems",
    "until": "ma 9:00",
    "escalation": [
      "bas-demir"
    ]
  },
  {
    "team": "team-rws-areaal",
    "person": "nadia-van-der-velde",
    "until": "ma 9:00",
    "escalation": [
      "layla-groen"
    ]
  },
  {
    "team": "team-rws-verkeer",
    "person": "hassan-tuinstra",
    "until": "ma 9:00",
    "escalation": [
      "said-schipper"
    ]
  },
  {
    "team": "team-rws-sensoren",
    "person": "gerard-polat",
    "until": "ma 9:00",
    "escalation": [
      "wilma-korteweg"
    ]
  },
  {
    "team": "team-rws-inspectie",
    "person": "casper-bulut",
    "until": "ma 9:00",
    "escalation": [
      "bart-visser"
    ]
  },
  {
    "team": "team-rws-platform",
    "person": "suze-kok",
    "until": "ma 9:00",
    "escalation": [
      "nina-van-der-heijden"
    ]
  },
  {
    "team": "team-ind-aanvragen",
    "person": "loes-van-den-heuvel",
    "until": "ma 9:00",
    "escalation": [
      "boris-sahin"
    ]
  },
  {
    "team": "team-ind-dossiers",
    "person": "jelle-driessen",
    "until": "ma 9:00",
    "escalation": [
      "anne-faber"
    ]
  },
  {
    "team": "team-ind-iam",
    "person": "ilias-theunissen",
    "until": "ma 9:00",
    "escalation": [
      "joost-strik"
    ]
  },
  {
    "team": "team-ind-data",
    "person": "eva-van-zanten",
    "until": "ma 9:00",
    "escalation": [
      "stijn-wubben"
    ]
  },
  {
    "team": "team-logius-digid",
    "person": "aisha-snijders",
    "until": "ma 9:00",
    "escalation": [
      "pieter-de-boer"
    ]
  },
  {
    "team": "team-logius-digikoppeling",
    "person": "rachid-kuipers",
    "until": "ma 9:00",
    "escalation": [
      "hala-prins"
    ]
  },
  {
    "team": "team-logius-machtigen",
    "person": "cornelis-smeets",
    "until": "ma 9:00",
    "escalation": [
      "saskia-karaca"
    ]
  },
  {
    "team": "team-logius-stelsel",
    "person": "floris-van-beek",
    "until": "ma 9:00",
    "escalation": [
      "roel-reijnders"
    ]
  },
  {
    "team": "team-dictu-hosting",
    "person": "vincent-van-dam",
    "until": "ma 9:00",
    "escalation": [
      "sophie-doornbos"
    ]
  },
  {
    "team": "team-dictu-werkplek",
    "person": "indy-bijl",
    "until": "ma 9:00",
    "escalation": [
      "finn-charradi"
    ]
  },
  {
    "team": "team-dictu-security",
    "person": "wessel-verschuren",
    "until": "ma 9:00",
    "escalation": [
      "britt-peters"
    ]
  },
  {
    "team": "team-dictu-data",
    "person": "abdel-bakkal",
    "until": "ma 9:00",
    "escalation": [
      "dilan-scholten"
    ]
  },
  {
    "team": "team-rvig-brp",
    "person": "sven-ben-ali",
    "until": "ma 9:00",
    "escalation": [
      "hugo-ouali"
    ]
  },
  {
    "team": "team-rvig-reisdocumenten",
    "person": "anouk-dekker",
    "until": "ma 9:00",
    "escalation": [
      "fatima-linders"
    ]
  },
  {
    "team": "team-rvig-iam",
    "person": "bilal-verbruggen",
    "until": "ma 9:00",
    "escalation": [
      "zeynep-cetin"
    ]
  },
  {
    "team": "team-jio-platform",
    "person": "willem-van-der-plas",
    "until": "ma 9:00",
    "escalation": [
      "kees-cinar"
    ]
  },
  {
    "team": "team-jio-keten",
    "person": "carla-bakker",
    "until": "ma 9:00",
    "escalation": [
      "niels-brouwer"
    ]
  },
  {
    "team": "team-jio-security",
    "person": "koen-schouten",
    "until": "ma 9:00",
    "escalation": [
      "roos-sanders"
    ]
  },
  {
    "team": "team-cjib-inning",
    "person": "mila-celik",
    "until": "ma 9:00",
    "escalation": [
      "sem-van-der-laan"
    ]
  },
  {
    "team": "team-cjib-sanctie",
    "person": "ahmed-wijnands",
    "until": "ma 9:00",
    "escalation": [
      "mats-engelen"
    ]
  },
  {
    "team": "team-cjib-data",
    "person": "puck-van-hattem",
    "until": "ma 9:00",
    "escalation": [
      "hatice-gunes"
    ]
  },
  {
    "team": "team-svb-aow",
    "person": "emma-geerts",
    "until": "ma 9:00",
    "escalation": [
      "lars-kraaijeveld"
    ]
  },
  {
    "team": "team-svb-kinderbijslag",
    "person": "femke-meijer",
    "until": "ma 9:00",
    "escalation": [
      "sara-de-wit"
    ]
  },
  {
    "team": "team-svb-gegevens",
    "person": "mehmet-koster",
    "until": "ma 9:00",
    "escalation": [
      "imane-gerritsen"
    ]
  },
  {
    "team": "team-svb-platform",
    "person": "fatih-korkmaz",
    "until": "ma 9:00",
    "escalation": [
      "dirk-verbeek"
    ]
  },
  {
    "team": "team-kvk-handelsregister",
    "person": "annemarie-van-wijk",
    "until": "ma 9:00",
    "escalation": [
      "quinten-de-groot"
    ]
  },
  {
    "team": "team-kvk-api",
    "person": "maarten-berends",
    "until": "ma 9:00",
    "escalation": [
      "tess-tromp"
    ]
  },
  {
    "team": "team-kvk-ondernemersplein",
    "person": "veerle-bouazza",
    "until": "ma 9:00",
    "escalation": [
      "marit-roozendaal"
    ]
  },
  {
    "team": "team-ienw-kenteken",
    "person": "teun-vos",
    "until": "ma 9:00",
    "escalation": [
      "ties-van-der-meer"
    ]
  },
  {
    "team": "team-ienw-voertuig",
    "person": "romy-de-lange",
    "until": "ma 9:00",
    "escalation": [
      "younes-bouali"
    ]
  },
  {
    "team": "team-ienw-data",
    "person": "bram-el-hadioui",
    "until": "ma 9:00",
    "escalation": [
      "ruben-van-der-wal"
    ]
  },
  {
    "team": "team-cbs-statline",
    "person": "yara-goossens",
    "until": "ma 9:00",
    "escalation": [
      "youssef-van-driel"
    ]
  },
  {
    "team": "team-cbs-microdata",
    "person": "karim-bakhti",
    "until": "ma 9:00",
    "escalation": [
      "samira-renkema"
    ]
  },
  {
    "team": "team-cbs-platform",
    "person": "bouchra-yildiz",
    "until": "ma 9:00",
    "escalation": [
      "johan-jansen"
    ]
  },
  {
    "team": "team-cbs-privacy",
    "person": "petra-dijkstra",
    "until": "ma 9:00",
    "escalation": [
      "tobias-van-leeuwen"
    ]
  },
  {
    "team": "team-justid-documentatie",
    "person": "wouter-hoekstra",
    "until": "ma 9:00",
    "escalation": [
      "erik-aydin"
    ]
  },
  {
    "team": "team-justid-vog",
    "person": "lara-kuiper",
    "until": "ma 9:00",
    "escalation": [
      "fleur-stam"
    ]
  },
  {
    "team": "team-koop-wetten",
    "person": "luuk-bosman",
    "until": "ma 9:00",
    "escalation": [
      "pim-donker"
    ]
  },
  {
    "team": "team-koop-officielebekendmakingen",
    "person": "demi-tekin",
    "until": "ma 9:00",
    "escalation": [
      "driss-buitenhuis"
    ]
  },
  {
    "team": "team-dpc-rijksoverheid",
    "person": "sanne-van-bommel",
    "until": "ma 9:00",
    "escalation": [
      "thijs-smit"
    ]
  },
  {
    "team": "team-dpc-content",
    "person": "maud-yilmaz",
    "until": "ma 9:00",
    "escalation": [
      "mohammed-verhoeven"
    ]
  },
  {
    "team": "team-dji-detentie",
    "person": "ans-wolters",
    "until": "ma 9:00",
    "escalation": [
      "amira-dogan"
    ]
  },
  {
    "team": "team-dji-data",
    "person": "omar-timmermans",
    "until": "ma 9:00",
    "escalation": [
      "henk-evers"
    ]
  },
  {
    "team": "team-cbr-rijbewijs",
    "person": "marieke-van-rijn",
    "until": "ma 9:00",
    "escalation": [
      "yvonne-van-ginkel"
    ]
  },
  {
    "team": "team-cbr-reservering",
    "person": "sander-sikkema",
    "until": "ma 9:00",
    "escalation": [
      "mark-vreeswijk"
    ]
  },
  {
    "team": "team-acm-toezicht",
    "person": "julia-pijnenburg",
    "until": "ma 9:00",
    "escalation": [
      "liv-bos"
    ]
  },
  {
    "team": "team-afm-toezicht",
    "person": "mees-van-den-berg",
    "until": "ma 9:00",
    "escalation": [
      "khalid-postma"
    ]
  },
  {
    "team": "team-ksa-handhaving",
    "person": "lieke-el-idrissi",
    "until": "ma 9:00",
    "escalation": [
      "isa-boutaleb"
    ]
  },
  {
    "team": "team-nza-zorgdata",
    "person": "selin-blom",
    "until": "ma 9:00",
    "escalation": [
      "daan-heijmans"
    ]
  },
  {
    "team": "team-fin-financieel",
    "person": "iris-koning",
    "until": "ma 9:00",
    "escalation": [
      "jeroen-hamid"
    ]
  },
  {
    "team": "team-fin-platform",
    "person": "noor-diks",
    "until": "ma 9:00",
    "escalation": [
      "esra-akkaya"
    ]
  },
  {
    "team": "team-szw-regelingen",
    "person": "tariq-de-vries",
    "until": "ma 9:00",
    "escalation": [
      "soumaya-van-dijk"
    ]
  },
  {
    "team": "team-vws-zorgregister",
    "person": "jan-vermeulen",
    "until": "ma 9:00",
    "escalation": [
      "ingrid-van-vliet"
    ]
  },
  {
    "team": "team-vws-data",
    "person": "jasper-kaya",
    "until": "ma 9:00",
    "escalation": [
      "robin-mol"
    ]
  },
  {
    "team": "team-jenv-keten",
    "person": "fenna-van-es",
    "until": "ma 9:00",
    "escalation": [
      "sterre-wagenaar"
    ]
  },
  {
    "team": "team-ocw-cultuurdata",
    "person": "levi-lubbers",
    "until": "ma 9:00",
    "escalation": [
      "gijs-erdem"
    ]
  },
  {
    "team": "team-lnv-natuur",
    "person": "olivier-slootweg",
    "until": "ma 9:00",
    "escalation": [
      "senna-asik"
    ]
  },
  {
    "team": "team-ezk-ondernemen",
    "person": "meryem-el-amrani",
    "until": "ma 9:00",
    "escalation": [
      "lotte-ozturk"
    ]
  },
  {
    "team": "team-kgg-energie",
    "person": "tim-maas",
    "until": "ma 9:00",
    "escalation": [
      "bas-veenstra"
    ]
  },
  {
    "team": "team-az-comms",
    "person": "nadia-arslan",
    "until": "ma 9:00",
    "escalation": [
      "layla-roeloffzen"
    ]
  },
  {
    "team": "team-bz-consulair",
    "person": "hassan-van-loon",
    "until": "ma 9:00",
    "escalation": [
      "said-lammers"
    ]
  },
  {
    "team": "team-def-secinfra",
    "person": "gerard-nijhuis",
    "until": "ma 9:00",
    "escalation": [
      "wilma-holwerda"
    ]
  },
  {
    "team": "team-aenm-keten",
    "person": "casper-naber",
    "until": "ma 9:00",
    "escalation": [
      "bart-veldhuis"
    ]
  },
  {
    "team": "team-dhc-geschillen",
    "person": "suze-mulder",
    "until": "ma 9:00",
    "escalation": [
      "nina-janssen"
    ]
  },
  {
    "team": "team-ez-markt",
    "person": "loes-huisman",
    "until": "ma 9:00",
    "escalation": [
      "boris-vink"
    ]
  },
  {
    "team": "team-bzk-iam",
    "person": "jelle-ennaji",
    "until": "ma 9:00",
    "escalation": [
      "anne-roos"
    ]
  },
  {
    "team": "team-bzk-security",
    "person": "ilias-bruins",
    "until": "ma 9:00",
    "escalation": [
      "joost-van-der-veen"
    ]
  },
  {
    "team": "team-nldd-docs",
    "person": "eva-mohamed",
    "until": "ma 9:00",
    "escalation": [
      "stijn-van-os"
    ]
  },
  {
    "team": "team-nldd-iam",
    "person": "aisha-el-khattabi",
    "until": "ma 9:00",
    "escalation": [
      "pieter-wielinga"
    ]
  },
  {
    "team": "team-logius-docs",
    "person": "rachid-hendriks",
    "until": "ma 9:00",
    "escalation": [
      "hala-hofman"
    ]
  }
];

export const datacenters = [
  {
    "id": "dc-denhaag",
    "name": "DC Den Haag",
    "city": "Den Haag",
    "status": "operationeel",
    "pue": 1.28,
    "redundancy": "N+1",
    "capacityKw": 1200,
    "usedKw": 740,
    "racks": 48,
    "uplinks": "2× 100GbE",
    "haven": true
  },
  {
    "id": "dc-apeldoorn",
    "name": "DC Apeldoorn",
    "city": "Apeldoorn",
    "status": "operationeel",
    "pue": 1.34,
    "redundancy": "N+1",
    "capacityKw": 900,
    "usedKw": 410,
    "racks": 36,
    "uplinks": "2× 100GbE",
    "haven": true
  },
  {
    "id": "dc-zwolle",
    "name": "DC Zwolle",
    "city": "Zwolle",
    "status": "in aanbouw",
    "pue": 1.22,
    "redundancy": "2N",
    "capacityKw": 1500,
    "usedKw": 0,
    "racks": 0,
    "uplinks": "gepland",
    "haven": false
  },
  {
    "id": "dc-groningen",
    "name": "DC Groningen",
    "city": "Groningen",
    "status": "operationeel",
    "pue": 1.25,
    "redundancy": "N+1",
    "capacityKw": 1000,
    "usedKw": 300,
    "racks": 30,
    "uplinks": "2× 100GbE",
    "haven": true
  },
  {
    "id": "dc-maastricht",
    "name": "DC Maastricht",
    "city": "Maastricht",
    "status": "operationeel",
    "pue": 1.31,
    "redundancy": "N+1",
    "capacityKw": 800,
    "usedKw": 250,
    "racks": 24,
    "uplinks": "2× 40GbE",
    "haven": true
  }
];

export const alleys = [
  {
    "id": "dh-a",
    "dc": "dc-denhaag",
    "name": "Rij A",
    "aisle": "cold",
    "racks": [
      "r-dh-a1",
      "r-dh-a2",
      "r-dh-a3"
    ]
  },
  {
    "id": "dh-b",
    "dc": "dc-denhaag",
    "name": "Rij B",
    "aisle": "hot",
    "racks": [
      "r-dh-b1",
      "r-dh-b2"
    ]
  },
  {
    "id": "ap-a",
    "dc": "dc-apeldoorn",
    "name": "Rij A",
    "aisle": "cold",
    "racks": [
      "r-ap-a1",
      "r-ap-a2"
    ]
  },
  {
    "id": "dh-c",
    "dc": "dc-denhaag",
    "name": "Rij C",
    "aisle": "cold",
    "racks": [
      "r-dh-c1",
      "r-dh-c2",
      "r-dh-c3",
      "r-dh-c4"
    ]
  },
  {
    "id": "ap-b",
    "dc": "dc-apeldoorn",
    "name": "Rij B",
    "aisle": "hot",
    "racks": [
      "r-ap-b1",
      "r-ap-b2",
      "r-ap-b3",
      "r-ap-b4"
    ]
  },
  {
    "id": "zw-a",
    "dc": "dc-zwolle",
    "name": "Rij A",
    "aisle": "cold",
    "racks": [
      "r-zw-a1",
      "r-zw-a2",
      "r-zw-a3",
      "r-zw-a4"
    ]
  },
  {
    "id": "zw-b",
    "dc": "dc-zwolle",
    "name": "Rij B",
    "aisle": "hot",
    "racks": [
      "r-zw-b1",
      "r-zw-b2",
      "r-zw-b3",
      "r-zw-b4"
    ]
  },
  {
    "id": "gr-a",
    "dc": "dc-groningen",
    "name": "Rij A",
    "aisle": "cold",
    "racks": [
      "r-gr-a1",
      "r-gr-a2",
      "r-gr-a3",
      "r-gr-a4"
    ]
  },
  {
    "id": "gr-b",
    "dc": "dc-groningen",
    "name": "Rij B",
    "aisle": "hot",
    "racks": [
      "r-gr-b1",
      "r-gr-b2",
      "r-gr-b3",
      "r-gr-b4"
    ]
  },
  {
    "id": "mt-a",
    "dc": "dc-maastricht",
    "name": "Rij A",
    "aisle": "cold",
    "racks": [
      "r-mt-a1",
      "r-mt-a2",
      "r-mt-a3",
      "r-mt-a4"
    ]
  }
];

export const racks = [
  {
    "id": "r-dh-a1",
    "dc": "dc-denhaag",
    "alley": "dh-a",
    "label": "DH-A1",
    "heightU": 42,
    "team": "team-platform",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 209,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-01",
        "watts": 404,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-02",
        "watts": 357,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 10,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-03",
        "watts": 373,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-04",
        "watts": 337,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 16,
        "height": 1,
        "type": "server",
        "label": "compute-dh-a1-05",
        "watts": 205,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 18,
        "height": 4,
        "type": "server",
        "label": "storage-dh-a1-06",
        "watts": 539,
        "status": "warn",
        "team": "team-platform",
        "vcpu": 32,
        "memGB": 640,
        "storageTB": 210
      },
      {
        "u": 22,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-07",
        "watts": 318,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 24,
        "height": 1,
        "type": "server",
        "label": "compute-dh-a1-08",
        "watts": 233,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 64,
        "memGB": 768
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-09",
        "watts": 440,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-dh-a1-10",
        "watts": 379,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 160,
        "memGB": 896
      }
    ]
  },
  {
    "id": "r-dh-a2",
    "dc": "dc-denhaag",
    "alley": "dh-a",
    "label": "DH-A2",
    "heightU": 42,
    "team": "team-data",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 154,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 8,
        "type": "gpu",
        "label": "hgx-h200-dh-a2-01",
        "team": "team-platform",
        "watts": 10200,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 160,
        "memGB": 5120
      },
      {
        "u": 15,
        "height": 8,
        "type": "gpu",
        "label": "hgx-h200-dh-a2-02",
        "team": "team-platform",
        "watts": 10200,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 160,
        "memGB": 5120
      },
      {
        "u": 24,
        "height": 1,
        "type": "switch",
        "label": "ai-fabric-dh-a2",
        "watts": 240,
        "status": "ok"
      }
    ]
  },
  {
    "id": "r-dh-a3",
    "dc": "dc-denhaag",
    "alley": "dh-a",
    "label": "DH-A3",
    "heightU": 42,
    "team": "team-platform",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 205,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 4,
        "type": "gpu",
        "label": "h200-infer-dh-a3-01",
        "team": "team-platform",
        "watts": 5600,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 160,
        "memGB": 5120
      },
      {
        "u": 11,
        "height": 4,
        "type": "gpu",
        "label": "h200-infer-dh-a3-02",
        "team": "team-platform",
        "watts": 5600,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 112,
        "memGB": 2048
      },
      {
        "u": 16,
        "height": 4,
        "type": "gpu",
        "label": "b200-infer-dh-a3-03",
        "team": "team-platform",
        "watts": 6100,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 128,
        "memGB": 3072
      },
      {
        "u": 21,
        "height": 1,
        "type": "switch",
        "label": "ai-fabric-dh-a3",
        "watts": 240,
        "status": "ok"
      }
    ]
  },
  {
    "id": "r-dh-b1",
    "dc": "dc-denhaag",
    "alley": "dh-b",
    "label": "DH-B1",
    "heightU": 42,
    "team": "team-burgerzaken",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 204,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-01",
        "watts": 233,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b1-02",
        "watts": 436,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b1-03",
        "watts": 395,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 14,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-04",
        "watts": 166,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 15,
        "height": 4,
        "type": "server",
        "label": "storage-dh-b1-05",
        "watts": 542,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 48,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 19,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-06",
        "watts": 235,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 64,
        "memGB": 768
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b1-07",
        "watts": 363,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 22,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-08",
        "watts": 216,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b1-09",
        "watts": 321,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 25,
        "height": 4,
        "type": "server",
        "label": "storage-dh-b1-10",
        "watts": 524,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 80,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 29,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-11",
        "watts": 239,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b1-12",
        "watts": 373,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 32,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-13",
        "watts": 201,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 34,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b1-14",
        "watts": 212,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 160,
        "memGB": 256
      }
    ]
  },
  {
    "id": "r-dh-b2",
    "dc": "dc-denhaag",
    "alley": "dh-b",
    "label": "DH-B2",
    "heightU": 42,
    "team": "team-burgerzaken",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 177,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-01",
        "watts": 440,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-02",
        "watts": 320,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 11,
        "height": 4,
        "type": "server",
        "label": "storage-dh-b2-03",
        "watts": 606,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 48,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 15,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-04",
        "watts": 401,
        "status": "warn",
        "team": "team-burgerzaken",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-05",
        "watts": 425,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 20,
        "height": 4,
        "type": "server",
        "label": "storage-dh-b2-06",
        "watts": 609,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 32,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-07",
        "watts": 458,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 27,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b2-08",
        "watts": 260,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 28,
        "height": 1,
        "type": "server",
        "label": "compute-dh-b2-09",
        "watts": 181,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-10",
        "watts": 382,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-dh-b2-11",
        "watts": 340,
        "status": "ok",
        "team": "team-burgerzaken",
        "vcpu": 192,
        "memGB": 256
      }
    ]
  },
  {
    "id": "r-ap-a1",
    "dc": "dc-apeldoorn",
    "alley": "ap-a",
    "label": "AP-A1",
    "heightU": 42,
    "team": "team-platform",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 159,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 6,
        "type": "gpu",
        "label": "h200-node-ap-a1-01",
        "team": "team-platform",
        "watts": 8400,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 160,
        "memGB": 5120
      },
      {
        "u": 13,
        "height": 6,
        "type": "gpu",
        "label": "h200-node-ap-a1-02",
        "team": "team-platform",
        "watts": 8400,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 128,
        "memGB": 3072
      },
      {
        "u": 20,
        "height": 1,
        "type": "switch",
        "label": "ai-fabric-ap-a1",
        "watts": 240,
        "status": "ok"
      }
    ]
  },
  {
    "id": "r-ap-a2",
    "dc": "dc-apeldoorn",
    "alley": "ap-a",
    "label": "AP-A2",
    "heightU": 42,
    "team": "team-data",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 183,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-01",
        "watts": 360,
        "status": "ok",
        "team": "team-data",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 9,
        "height": 1,
        "type": "server",
        "label": "compute-ap-a2-02",
        "watts": 236,
        "status": "ok",
        "team": "team-data",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 10,
        "height": 1,
        "type": "server",
        "label": "compute-ap-a2-03",
        "watts": 255,
        "status": "ok",
        "team": "team-data",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-04",
        "watts": 336,
        "status": "ok",
        "team": "team-data",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 13,
        "height": 4,
        "type": "server",
        "label": "storage-ap-a2-05",
        "watts": 614,
        "status": "ok",
        "team": "team-data",
        "vcpu": 64,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 18,
        "height": 1,
        "type": "server",
        "label": "compute-ap-a2-06",
        "watts": 189,
        "status": "ok",
        "team": "team-data",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 19,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-07",
        "watts": 317,
        "status": "ok",
        "team": "team-data",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 22,
        "height": 4,
        "type": "server",
        "label": "storage-ap-a2-08",
        "watts": 634,
        "status": "warn",
        "team": "team-data",
        "vcpu": 96,
        "memGB": 256,
        "storageTB": 120
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-09",
        "watts": 388,
        "status": "ok",
        "team": "team-data",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-10",
        "watts": 385,
        "status": "ok",
        "team": "team-data",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-11",
        "watts": 360,
        "status": "ok",
        "team": "team-data",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 32,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-12",
        "watts": 325,
        "status": "ok",
        "team": "team-data",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 34,
        "height": 1,
        "type": "server",
        "label": "compute-ap-a2-13",
        "watts": 256,
        "status": "ok",
        "team": "team-data",
        "vcpu": 128,
        "memGB": 512
      },
      {
        "u": 35,
        "height": 1,
        "type": "server",
        "label": "compute-ap-a2-14",
        "watts": 206,
        "status": "ok",
        "team": "team-data",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 37,
        "height": 2,
        "type": "server",
        "label": "compute-ap-a2-15",
        "watts": 332,
        "status": "ok",
        "team": "team-data",
        "vcpu": 128,
        "memGB": 384
      }
    ]
  },
  {
    "id": "r-dh-c1",
    "dc": "dc-denhaag",
    "alley": "dh-c",
    "label": "DH-C1",
    "heightU": 42,
    "team": "team-rvo-vergunningen",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 208,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 8,
        "type": "gpu",
        "label": "gb200-nvl-dh-c1-01",
        "team": "team-platform",
        "watts": 13200,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 160,
        "memGB": 5120
      },
      {
        "u": 15,
        "height": 8,
        "type": "gpu",
        "label": "gb200-nvl-dh-c1-02",
        "team": "team-platform",
        "watts": 13200,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 112,
        "memGB": 2048
      },
      {
        "u": 24,
        "height": 1,
        "type": "switch",
        "label": "ai-fabric-dh-c1",
        "watts": 240,
        "status": "ok"
      }
    ]
  },
  {
    "id": "r-dh-c2",
    "dc": "dc-denhaag",
    "alley": "dh-c",
    "label": "DH-C2",
    "heightU": 42,
    "team": "team-rws-areaal",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 168,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 8,
        "type": "gpu",
        "label": "hgx-b200-dh-c2-01",
        "team": "team-platform",
        "watts": 11800,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 128,
        "memGB": 3072
      },
      {
        "u": 15,
        "height": 8,
        "type": "gpu",
        "label": "hgx-b200-dh-c2-02",
        "team": "team-platform",
        "watts": 11800,
        "status": "ok",
        "gpuCount": 8,
        "gpuModel": "H200",
        "gpuMemGB": 192,
        "vcpu": 144,
        "memGB": 4096
      },
      {
        "u": 24,
        "height": 1,
        "type": "switch",
        "label": "ai-fabric-dh-c2",
        "watts": 240,
        "status": "ok"
      }
    ]
  },
  {
    "id": "r-dh-c3",
    "dc": "dc-denhaag",
    "alley": "dh-c",
    "label": "DH-C3",
    "heightU": 42,
    "team": "team-rws-inspectie",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 179,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c3-01",
        "watts": 397,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c3-02",
        "watts": 390,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c3-03",
        "watts": 365,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 13,
        "height": 1,
        "type": "server",
        "label": "compute-dh-c3-04",
        "watts": 206,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 14,
        "height": 1,
        "type": "server",
        "label": "compute-dh-c3-05",
        "watts": 239,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 15,
        "height": 1,
        "type": "server",
        "label": "compute-dh-c3-06",
        "watts": 219,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 16,
        "height": 4,
        "type": "server",
        "label": "storage-dh-c3-07",
        "watts": 683,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 96,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c3-08",
        "watts": 404,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 23,
        "height": 4,
        "type": "server",
        "label": "storage-dh-c3-09",
        "watts": 627,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 48,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c3-10",
        "watts": 399,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 29,
        "height": 4,
        "type": "server",
        "label": "storage-dh-c3-11",
        "watts": 692,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 48,
        "memGB": 640,
        "storageTB": 210
      },
      {
        "u": 34,
        "height": 1,
        "type": "server",
        "label": "compute-dh-c3-12",
        "watts": 214,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 35,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c3-13",
        "watts": 322,
        "status": "ok",
        "team": "team-rws-inspectie",
        "vcpu": 192,
        "memGB": 512
      }
    ]
  },
  {
    "id": "r-dh-c4",
    "dc": "dc-denhaag",
    "alley": "dh-c",
    "label": "DH-C4",
    "heightU": 42,
    "team": "team-ind-dossiers",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 165,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-01",
        "watts": 346,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-02",
        "watts": 364,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-03",
        "watts": 397,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 14,
        "height": 1,
        "type": "server",
        "label": "compute-dh-c4-04",
        "watts": 184,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 15,
        "height": 1,
        "type": "server",
        "label": "compute-dh-c4-05",
        "watts": 256,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-06",
        "watts": 392,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 19,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-07",
        "watts": 337,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 21,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-08",
        "watts": 396,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 128,
        "memGB": 512
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-09",
        "watts": 360,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-10",
        "watts": 474,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-11",
        "watts": 410,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-dh-c4-12",
        "watts": 399,
        "status": "ok",
        "team": "team-ind-dossiers",
        "vcpu": 160,
        "memGB": 256
      }
    ]
  },
  {
    "id": "r-ap-b1",
    "dc": "dc-apeldoorn",
    "alley": "ap-b",
    "label": "AP-B1",
    "heightU": 42,
    "team": "team-logius-digid",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 191,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-01",
        "watts": 241,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 7,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-02",
        "watts": 386,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 10,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-03",
        "watts": 189,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 11,
        "height": 4,
        "type": "server",
        "label": "storage-ap-b1-04",
        "watts": 602,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 80,
        "memGB": 256,
        "storageTB": 240
      },
      {
        "u": 15,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-05",
        "watts": 411,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-06",
        "watts": 437,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 19,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-07",
        "watts": 318,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 21,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-08",
        "watts": 214,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 23,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-09",
        "watts": 208,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-10",
        "watts": 399,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-11",
        "watts": 379,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 28,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-12",
        "watts": 228,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 30,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-13",
        "watts": 242,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 32,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b1-14",
        "watts": 206,
        "status": "ok",
        "team": "team-logius-digid",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 33,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b1-15",
        "watts": 388,
        "status": "crit",
        "team": "team-logius-digid",
        "vcpu": 96,
        "memGB": 384
      }
    ]
  },
  {
    "id": "r-ap-b2",
    "dc": "dc-apeldoorn",
    "alley": "ap-b",
    "label": "AP-B2",
    "heightU": 42,
    "team": "team-logius-stelsel",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 197,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-01",
        "watts": 238,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 7,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-02",
        "watts": 216,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 8,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-03",
        "watts": 172,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 9,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-04",
        "watts": 419,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 12,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-05",
        "watts": 360,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-06",
        "watts": 400,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 16,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-07",
        "watts": 234,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 18,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-08",
        "watts": 356,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-09",
        "watts": 343,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 22,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-10",
        "watts": 388,
        "status": "warn",
        "team": "team-logius-stelsel",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 25,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-11",
        "watts": 187,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 64,
        "memGB": 768
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-12",
        "watts": 337,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 28,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-13",
        "watts": 200,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-14",
        "watts": 375,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 32,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-15",
        "watts": 332,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 34,
        "height": 1,
        "type": "server",
        "label": "compute-ap-b2-16",
        "watts": 204,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 128,
        "memGB": 512
      },
      {
        "u": 35,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b2-17",
        "watts": 346,
        "status": "ok",
        "team": "team-logius-stelsel",
        "vcpu": 192,
        "memGB": 640
      }
    ]
  },
  {
    "id": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "alley": "ap-b",
    "label": "AP-B3",
    "heightU": 42,
    "team": "team-dictu-security",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 208,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-01",
        "watts": 379,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 9,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-02",
        "watts": 417,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-03",
        "watts": 382,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-04",
        "watts": 367,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 15,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-05",
        "watts": 448,
        "status": "warn",
        "team": "team-dictu-security",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 18,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-06",
        "watts": 304,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 20,
        "height": 4,
        "type": "server",
        "label": "storage-ap-b3-07",
        "watts": 542,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 96,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-08",
        "watts": 317,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-09",
        "watts": 406,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b3-10",
        "watts": 350,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 30,
        "height": 4,
        "type": "server",
        "label": "storage-ap-b3-11",
        "watts": 648,
        "status": "ok",
        "team": "team-dictu-security",
        "vcpu": 64,
        "memGB": 256,
        "storageTB": 240
      }
    ]
  },
  {
    "id": "r-ap-b4",
    "dc": "dc-apeldoorn",
    "alley": "ap-b",
    "label": "AP-B4",
    "heightU": 42,
    "team": "team-rvig-reisdocumenten",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 150,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-01",
        "watts": 323,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-02",
        "watts": 419,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-03",
        "watts": 403,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-04",
        "watts": 307,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-05",
        "watts": 390,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 19,
        "height": 4,
        "type": "server",
        "label": "storage-ap-b4-06",
        "watts": 694,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-07",
        "watts": 326,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-08",
        "watts": 405,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-09",
        "watts": 353,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-10",
        "watts": 432,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 33,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-11",
        "watts": 329,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 36,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-12",
        "watts": 312,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 39,
        "height": 2,
        "type": "server",
        "label": "compute-ap-b4-13",
        "watts": 465,
        "status": "ok",
        "team": "team-rvig-reisdocumenten",
        "vcpu": 160,
        "memGB": 896
      }
    ]
  },
  {
    "id": "r-zw-a1",
    "dc": "dc-zwolle",
    "alley": "zw-a",
    "label": "ZW-A1",
    "heightU": 42,
    "team": "team-jio-keten",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 160,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a1-01",
        "watts": 385,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 8,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a1-02",
        "watts": 238,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 10,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a1-03",
        "watts": 538,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 15,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a1-04",
        "watts": 371,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a1-05",
        "watts": 384,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 19,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a1-06",
        "watts": 668,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 48,
        "memGB": 256,
        "storageTB": 240
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a1-07",
        "watts": 344,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 128,
        "memGB": 512
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a1-08",
        "watts": 371,
        "status": "ok",
        "team": "team-jio-keten",
        "vcpu": 96,
        "memGB": 256
      }
    ]
  },
  {
    "id": "r-zw-a2",
    "dc": "dc-zwolle",
    "alley": "zw-a",
    "label": "ZW-A2",
    "heightU": 42,
    "team": "team-cjib-sanctie",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 197,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a2-01",
        "watts": 233,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 7,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a2-02",
        "watts": 189,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 8,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a2-03",
        "watts": 179,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 9,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a2-04",
        "watts": 202,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 10,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a2-05",
        "watts": 216,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 12,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a2-06",
        "watts": 351,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 15,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a2-07",
        "watts": 175,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a2-08",
        "watts": 361,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 19,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a2-09",
        "watts": 523,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 32,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a2-10",
        "watts": 304,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a2-11",
        "watts": 305,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a2-12",
        "watts": 387,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a2-13",
        "watts": 378,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 31,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a2-14",
        "watts": 610,
        "status": "ok",
        "team": "team-cjib-sanctie",
        "vcpu": 48,
        "memGB": 384,
        "storageTB": 150
      }
    ]
  },
  {
    "id": "r-zw-a3",
    "dc": "dc-zwolle",
    "alley": "zw-a",
    "label": "ZW-A3",
    "heightU": 42,
    "team": "team-svb-kinderbijslag",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 175,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a3-01",
        "watts": 575,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 32,
        "memGB": 256,
        "storageTB": 120
      },
      {
        "u": 10,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a3-02",
        "watts": 428,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 12,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a3-03",
        "watts": 342,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 15,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-04",
        "watts": 181,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 16,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a3-05",
        "watts": 625,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 20,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-06",
        "watts": 203,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 22,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a3-07",
        "watts": 429,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 25,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-08",
        "watts": 184,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a3-09",
        "watts": 349,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a3-10",
        "watts": 371,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 31,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-11",
        "watts": 233,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 32,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-12",
        "watts": 191,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 34,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-13",
        "watts": 167,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 35,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-14",
        "watts": 184,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 36,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a3-15",
        "watts": 203,
        "status": "ok",
        "team": "team-svb-kinderbijslag",
        "vcpu": 128,
        "memGB": 384
      }
    ]
  },
  {
    "id": "r-zw-a4",
    "dc": "dc-zwolle",
    "alley": "zw-a",
    "label": "ZW-A4",
    "heightU": 42,
    "team": "team-kvk-handelsregister",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 173,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-01",
        "watts": 479,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-02",
        "watts": 412,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-03",
        "watts": 308,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-04",
        "watts": 404,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 15,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a4-05",
        "watts": 630,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 19,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a4-06",
        "watts": 190,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 21,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a4-07",
        "watts": 230,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 22,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-08",
        "watts": 357,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-09",
        "watts": 355,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-10",
        "watts": 409,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 128,
        "memGB": 512
      },
      {
        "u": 29,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a4-11",
        "watts": 177,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 128,
        "memGB": 512
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-zw-a4-12",
        "watts": 372,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 32,
        "height": 1,
        "type": "server",
        "label": "compute-zw-a4-13",
        "watts": 163,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 33,
        "height": 4,
        "type": "server",
        "label": "storage-zw-a4-14",
        "watts": 544,
        "status": "ok",
        "team": "team-kvk-handelsregister",
        "vcpu": 64,
        "memGB": 640,
        "storageTB": 330
      }
    ]
  },
  {
    "id": "r-zw-b1",
    "dc": "dc-zwolle",
    "alley": "zw-b",
    "label": "ZW-B1",
    "heightU": 42,
    "team": "team-ienw-kenteken",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 177,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b1-01",
        "watts": 527,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 48,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b1-02",
        "watts": 440,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b1-03",
        "watts": 360,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b1-04",
        "watts": 324,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 19,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b1-05",
        "watts": 304,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 22,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b1-06",
        "watts": 205,
        "status": "warn",
        "team": "team-ienw-kenteken",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b1-07",
        "watts": 407,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 26,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b1-08",
        "watts": 210,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 27,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b1-09",
        "watts": 209,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 28,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b1-10",
        "watts": 180,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b1-11",
        "watts": 345,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 32,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b1-12",
        "watts": 204,
        "status": "ok",
        "team": "team-ienw-kenteken",
        "vcpu": 64,
        "memGB": 768
      }
    ]
  },
  {
    "id": "r-zw-b2",
    "dc": "dc-zwolle",
    "alley": "zw-b",
    "label": "ZW-B2",
    "heightU": 42,
    "team": "team-cbs-statline",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 153,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b2-01",
        "watts": 196,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 7,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b2-02",
        "watts": 388,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 64,
        "memGB": 768
      },
      {
        "u": 9,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b2-03",
        "watts": 223,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 10,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b2-04",
        "watts": 198,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 12,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b2-05",
        "watts": 523,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 16,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b2-06",
        "watts": 183,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b2-07",
        "watts": 313,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b2-08",
        "watts": 455,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 23,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b2-09",
        "watts": 699,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 80,
        "memGB": 640,
        "storageTB": 210
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b2-10",
        "watts": 469,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b2-11",
        "watts": 330,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 33,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b2-12",
        "watts": 626,
        "status": "ok",
        "team": "team-cbs-statline",
        "vcpu": 64,
        "memGB": 384,
        "storageTB": 270
      }
    ]
  },
  {
    "id": "r-zw-b3",
    "dc": "dc-zwolle",
    "alley": "zw-b",
    "label": "ZW-B3",
    "heightU": 42,
    "team": "team-cbs-privacy",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 176,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-01",
        "watts": 248,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 7,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-02",
        "watts": 231,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 8,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-03",
        "watts": 166,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 10,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-04",
        "watts": 237,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b3-05",
        "watts": 355,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b3-06",
        "watts": 340,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 16,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-07",
        "watts": 175,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 18,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-08",
        "watts": 184,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b3-09",
        "watts": 376,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 23,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b3-10",
        "watts": 525,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 96,
        "memGB": 640,
        "storageTB": 210
      },
      {
        "u": 27,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b3-11",
        "watts": 562,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 80,
        "memGB": 256,
        "storageTB": 240
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b3-12",
        "watts": 331,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 34,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b3-13",
        "watts": 195,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 35,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b3-14",
        "watts": 420,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 38,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b3-15",
        "watts": 384,
        "status": "ok",
        "team": "team-cbs-privacy",
        "vcpu": 96,
        "memGB": 640
      }
    ]
  },
  {
    "id": "r-zw-b4",
    "dc": "dc-zwolle",
    "alley": "zw-b",
    "label": "ZW-B4",
    "heightU": 42,
    "team": "team-koop-wetten",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 201,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b4-01",
        "watts": 614,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 64,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 10,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b4-02",
        "watts": 366,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 12,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b4-03",
        "watts": 313,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b4-04",
        "watts": 395,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 17,
        "height": 4,
        "type": "server",
        "label": "storage-zw-b4-05",
        "watts": 679,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 96,
        "memGB": 512,
        "storageTB": 300
      },
      {
        "u": 22,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b4-06",
        "watts": 187,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 24,
        "height": 1,
        "type": "server",
        "label": "compute-zw-b4-07",
        "watts": 216,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b4-08",
        "watts": 407,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b4-09",
        "watts": 436,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-zw-b4-10",
        "watts": 423,
        "status": "ok",
        "team": "team-koop-wetten",
        "vcpu": 64,
        "memGB": 896
      }
    ]
  },
  {
    "id": "r-gr-a1",
    "dc": "dc-groningen",
    "alley": "gr-a",
    "label": "GR-A1",
    "heightU": 42,
    "team": "team-dpc-content",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 166,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-01",
        "watts": 318,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 9,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-02",
        "watts": 430,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-03",
        "watts": 382,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-04",
        "watts": 332,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 16,
        "height": 4,
        "type": "server",
        "label": "storage-gr-a1-05",
        "watts": 540,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 48,
        "memGB": 256,
        "storageTB": 120
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-06",
        "watts": 382,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 23,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a1-07",
        "watts": 259,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 25,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a1-08",
        "watts": 195,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 26,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a1-09",
        "watts": 204,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 27,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a1-10",
        "watts": 223,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-11",
        "watts": 400,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 31,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a1-12",
        "watts": 221,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 33,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a1-13",
        "watts": 381,
        "status": "ok",
        "team": "team-dpc-content",
        "vcpu": 192,
        "memGB": 768
      }
    ]
  },
  {
    "id": "r-gr-a2",
    "dc": "dc-groningen",
    "alley": "gr-a",
    "label": "GR-A2",
    "heightU": 42,
    "team": "team-cbr-rijbewijs",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 150,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-01",
        "watts": 325,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-02",
        "watts": 347,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-03",
        "watts": 437,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-04",
        "watts": 358,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 16,
        "height": 4,
        "type": "server",
        "label": "storage-gr-a2-05",
        "watts": 665,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 48,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 21,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a2-06",
        "watts": 175,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 22,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a2-07",
        "watts": 203,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-08",
        "watts": 472,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-09",
        "watts": 382,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 28,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a2-10",
        "watts": 185,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 30,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a2-11",
        "watts": 361,
        "status": "ok",
        "team": "team-cbr-rijbewijs",
        "vcpu": 192,
        "memGB": 512
      }
    ]
  },
  {
    "id": "r-gr-a3",
    "dc": "dc-groningen",
    "alley": "gr-a",
    "label": "GR-A3",
    "heightU": 42,
    "team": "team-afm-toezicht",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 195,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a3-01",
        "watts": 224,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 7,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-02",
        "watts": 396,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 9,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a3-03",
        "watts": 259,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 10,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-04",
        "watts": 374,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 12,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a3-05",
        "watts": 174,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 13,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a3-06",
        "watts": 239,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-07",
        "watts": 326,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-08",
        "watts": 399,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 18,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-09",
        "watts": 338,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 21,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-10",
        "watts": 394,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-11",
        "watts": 316,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-12",
        "watts": 425,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-13",
        "watts": 411,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-14",
        "watts": 317,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a3-15",
        "watts": 319,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 33,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a3-16",
        "watts": 226,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 34,
        "height": 4,
        "type": "server",
        "label": "storage-gr-a3-17",
        "watts": 626,
        "status": "ok",
        "team": "team-afm-toezicht",
        "vcpu": 80,
        "memGB": 640,
        "storageTB": 210
      }
    ]
  },
  {
    "id": "r-gr-a4",
    "dc": "dc-groningen",
    "alley": "gr-a",
    "label": "GR-A4",
    "heightU": 42,
    "team": "team-fin-financieel",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 159,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-01",
        "watts": 331,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-02",
        "watts": 459,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 10,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a4-03",
        "watts": 164,
        "status": "warn",
        "team": "team-fin-financieel",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 11,
        "height": 4,
        "type": "server",
        "label": "storage-gr-a4-04",
        "watts": 655,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 16,
        "height": 4,
        "type": "server",
        "label": "storage-gr-a4-05",
        "watts": 536,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 80,
        "memGB": 384,
        "storageTB": 270
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-06",
        "watts": 328,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 22,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-07",
        "watts": 359,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-08",
        "watts": 437,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 26,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a4-09",
        "watts": 235,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 27,
        "height": 1,
        "type": "server",
        "label": "compute-gr-a4-10",
        "watts": 223,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-11",
        "watts": 471,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 32,
        "height": 2,
        "type": "server",
        "label": "compute-gr-a4-12",
        "watts": 374,
        "status": "ok",
        "team": "team-fin-financieel",
        "vcpu": 128,
        "memGB": 896
      }
    ]
  },
  {
    "id": "r-gr-b1",
    "dc": "dc-groningen",
    "alley": "gr-b",
    "label": "GR-B1",
    "heightU": 42,
    "team": "team-vws-zorgregister",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 178,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b1-01",
        "watts": 239,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 7,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b1-02",
        "watts": 198,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 9,
        "height": 4,
        "type": "server",
        "label": "storage-gr-b1-03",
        "watts": 613,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 96,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 13,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b1-04",
        "watts": 184,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b1-05",
        "watts": 419,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b1-06",
        "watts": 411,
        "status": "warn",
        "team": "team-vws-zorgregister",
        "vcpu": 64,
        "memGB": 896
      },
      {
        "u": 18,
        "height": 4,
        "type": "server",
        "label": "storage-gr-b1-07",
        "watts": 601,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b1-08",
        "watts": 395,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b1-09",
        "watts": 401,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b1-10",
        "watts": 342,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 30,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b1-11",
        "watts": 207,
        "status": "ok",
        "team": "team-vws-zorgregister",
        "vcpu": 64,
        "memGB": 512
      }
    ]
  },
  {
    "id": "r-gr-b2",
    "dc": "dc-groningen",
    "alley": "gr-b",
    "label": "GR-B2",
    "heightU": 42,
    "team": "team-ocw-cultuurdata",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 166,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b2-01",
        "watts": 200,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 7,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-02",
        "watts": 358,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 9,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b2-03",
        "watts": 193,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 10,
        "height": 4,
        "type": "server",
        "label": "storage-gr-b2-04",
        "watts": 532,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 64,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-05",
        "watts": 387,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-06",
        "watts": 379,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 64,
        "memGB": 384
      },
      {
        "u": 18,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-07",
        "watts": 315,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 21,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b2-08",
        "watts": 232,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 22,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b2-09",
        "watts": 253,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 24,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-10",
        "watts": 411,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 160,
        "memGB": 256
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-11",
        "watts": 446,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 28,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b2-12",
        "watts": 364,
        "status": "ok",
        "team": "team-ocw-cultuurdata",
        "vcpu": 64,
        "memGB": 640
      }
    ]
  },
  {
    "id": "r-gr-b3",
    "dc": "dc-groningen",
    "alley": "gr-b",
    "label": "GR-B3",
    "heightU": 42,
    "team": "team-kgg-energie",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 182,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b3-01",
        "watts": 230,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 7,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-02",
        "watts": 399,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 10,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-03",
        "watts": 405,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 12,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-04",
        "watts": 405,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 15,
        "height": 4,
        "type": "server",
        "label": "storage-gr-b3-05",
        "watts": 676,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 32,
        "memGB": 384,
        "storageTB": 150
      },
      {
        "u": 19,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-06",
        "watts": 418,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 21,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-07",
        "watts": 394,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-08",
        "watts": 389,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-09",
        "watts": 436,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-10",
        "watts": 406,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b3-11",
        "watts": 356,
        "status": "ok",
        "team": "team-kgg-energie",
        "vcpu": 160,
        "memGB": 384
      }
    ]
  },
  {
    "id": "r-gr-b4",
    "dc": "dc-groningen",
    "alley": "gr-b",
    "label": "GR-B4",
    "heightU": 42,
    "team": "team-def-secinfra",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 183,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-01",
        "watts": 377,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 128,
        "memGB": 256
      },
      {
        "u": 8,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b4-02",
        "watts": 180,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 9,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-03",
        "watts": 385,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 11,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b4-04",
        "watts": 197,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 12,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-05",
        "watts": 426,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 96,
        "memGB": 768
      },
      {
        "u": 14,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b4-06",
        "watts": 193,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 64,
        "memGB": 640
      },
      {
        "u": 15,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-07",
        "watts": 380,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-08",
        "watts": 343,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-09",
        "watts": 371,
        "status": "crit",
        "team": "team-def-secinfra",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 22,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-10",
        "watts": 464,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 24,
        "height": 1,
        "type": "server",
        "label": "compute-gr-b4-11",
        "watts": 165,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-12",
        "watts": 369,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-13",
        "watts": 302,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-gr-b4-14",
        "watts": 395,
        "status": "ok",
        "team": "team-def-secinfra",
        "vcpu": 160,
        "memGB": 256
      }
    ]
  },
  {
    "id": "r-mt-a1",
    "dc": "dc-maastricht",
    "alley": "mt-a",
    "label": "MT-A1",
    "heightU": 42,
    "team": "team-ez-markt",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 197,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-01",
        "watts": 335,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 96,
        "memGB": 896
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-02",
        "watts": 469,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 10,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-03",
        "watts": 358,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 160,
        "memGB": 640
      },
      {
        "u": 13,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a1-04",
        "watts": 191,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 96,
        "memGB": 256
      },
      {
        "u": 14,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a1-05",
        "watts": 179,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-06",
        "watts": 343,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 18,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-07",
        "watts": 309,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 20,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a1-08",
        "watts": 200,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 160,
        "memGB": 512
      },
      {
        "u": 21,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-09",
        "watts": 317,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 96,
        "memGB": 512
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-10",
        "watts": 364,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 26,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a1-11",
        "watts": 260,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 128,
        "memGB": 896
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-12",
        "watts": 392,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 192,
        "memGB": 768
      },
      {
        "u": 30,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a1-13",
        "watts": 212,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 31,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-14",
        "watts": 328,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 34,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a1-15",
        "watts": 428,
        "status": "ok",
        "team": "team-ez-markt",
        "vcpu": 128,
        "memGB": 896
      }
    ]
  },
  {
    "id": "r-mt-a2",
    "dc": "dc-maastricht",
    "alley": "mt-a",
    "label": "MT-A2",
    "heightU": 42,
    "team": "team-nldd-docs",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 152,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-01",
        "watts": 405,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 9,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-02",
        "watts": 393,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-03",
        "watts": 423,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 160,
        "memGB": 896
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-04",
        "watts": 348,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 15,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-05",
        "watts": 371,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 17,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a2-06",
        "watts": 228,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 96,
        "memGB": 384
      },
      {
        "u": 18,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a2-07",
        "watts": 206,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 192,
        "memGB": 512
      },
      {
        "u": 19,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-08",
        "watts": 405,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 21,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-09",
        "watts": 374,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 23,
        "height": 4,
        "type": "server",
        "label": "storage-mt-a2-10",
        "watts": 637,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 64,
        "memGB": 640,
        "storageTB": 330
      },
      {
        "u": 27,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-11",
        "watts": 325,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 160,
        "memGB": 384
      },
      {
        "u": 29,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a2-12",
        "watts": 470,
        "status": "ok",
        "team": "team-nldd-docs",
        "vcpu": 192,
        "memGB": 768
      }
    ]
  },
  {
    "id": "r-mt-a3",
    "dc": "dc-maastricht",
    "alley": "mt-a",
    "label": "MT-A3",
    "heightU": 42,
    "team": "team-platform",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-02",
        "watts": 201,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-01",
        "watts": 442,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 128,
        "memGB": 640
      },
      {
        "u": 8,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-02",
        "watts": 382,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 96,
        "memGB": 640
      },
      {
        "u": 11,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-03",
        "watts": 327,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 13,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a3-04",
        "watts": 232,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 14,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-05",
        "watts": 414,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 192,
        "memGB": 640
      },
      {
        "u": 17,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-06",
        "watts": 311,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 64,
        "memGB": 256
      },
      {
        "u": 19,
        "height": 4,
        "type": "server",
        "label": "storage-mt-a3-07",
        "watts": 637,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 80,
        "memGB": 256,
        "storageTB": 240
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-08",
        "watts": 418,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 192,
        "memGB": 384
      },
      {
        "u": 25,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a3-09",
        "watts": 428,
        "status": "ok",
        "team": "team-platform",
        "vcpu": 96,
        "memGB": 896
      }
    ]
  },
  {
    "id": "r-mt-a4",
    "dc": "dc-maastricht",
    "alley": "mt-a",
    "label": "MT-A4",
    "heightU": 42,
    "team": "team-data",
    "units": [
      {
        "u": 1,
        "height": 1,
        "type": "pdu",
        "label": "PDU-A",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 2,
        "height": 2,
        "type": "switch",
        "label": "leaf-sw-01",
        "watts": 153,
        "status": "ok"
      },
      {
        "u": 4,
        "height": 1,
        "type": "patch",
        "label": "patchpanel-01",
        "watts": 0,
        "status": "ok"
      },
      {
        "u": 6,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-01",
        "watts": 395,
        "status": "ok",
        "team": "team-data",
        "vcpu": 192,
        "memGB": 256
      },
      {
        "u": 8,
        "height": 4,
        "type": "server",
        "label": "storage-mt-a4-02",
        "watts": 528,
        "status": "ok",
        "team": "team-data",
        "vcpu": 96,
        "memGB": 512,
        "storageTB": 180
      },
      {
        "u": 13,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-03",
        "watts": 319,
        "status": "ok",
        "team": "team-data",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 15,
        "height": 1,
        "type": "server",
        "label": "compute-mt-a4-04",
        "watts": 207,
        "status": "ok",
        "team": "team-data",
        "vcpu": 128,
        "memGB": 768
      },
      {
        "u": 16,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-05",
        "watts": 373,
        "status": "ok",
        "team": "team-data",
        "vcpu": 64,
        "memGB": 512
      },
      {
        "u": 18,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-06",
        "watts": 440,
        "status": "ok",
        "team": "team-data",
        "vcpu": 160,
        "memGB": 768
      },
      {
        "u": 20,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-07",
        "watts": 376,
        "status": "ok",
        "team": "team-data",
        "vcpu": 192,
        "memGB": 896
      },
      {
        "u": 23,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-08",
        "watts": 399,
        "status": "ok",
        "team": "team-data",
        "vcpu": 128,
        "memGB": 384
      },
      {
        "u": 26,
        "height": 2,
        "type": "server",
        "label": "compute-mt-a4-09",
        "watts": 400,
        "status": "ok",
        "team": "team-data",
        "vcpu": 160,
        "memGB": 384
      }
    ]
  }
];

export const cables = [
  {
    "id": "cab-1",
    "from": "leaf-sw-01:1",
    "to": "k8s-node-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-2",
    "from": "leaf-sw-01:2",
    "to": "k8s-node-02:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-3",
    "from": "leaf-sw-01:48",
    "to": "spine-01:12",
    "type": "OM4",
    "length": "15m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-4",
    "from": "patchpanel-01:1",
    "to": "pg-primary-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "warn"
  },
  {
    "id": "cab-r-dh-c1",
    "from": "leaf-sw-7:1",
    "to": "node-7-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-dh-c2",
    "from": "leaf-sw-8:1",
    "to": "node-8-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-dh-c3",
    "from": "leaf-sw-9:1",
    "to": "node-9-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-dh-c4",
    "from": "leaf-sw-10:1",
    "to": "node-10-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-ap-b1",
    "from": "leaf-sw-11:1",
    "to": "node-11-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-ap-b2",
    "from": "leaf-sw-12:1",
    "to": "node-12-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-ap-b3",
    "from": "leaf-sw-13:1",
    "to": "node-13-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-ap-b4",
    "from": "leaf-sw-14:1",
    "to": "node-14-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-a1",
    "from": "leaf-sw-15:1",
    "to": "node-15-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-a2",
    "from": "leaf-sw-16:1",
    "to": "node-16-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-a3",
    "from": "leaf-sw-17:1",
    "to": "node-17-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-a4",
    "from": "leaf-sw-18:1",
    "to": "node-18-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-b1",
    "from": "leaf-sw-19:1",
    "to": "node-19-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-b2",
    "from": "leaf-sw-20:1",
    "to": "node-20-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-b3",
    "from": "leaf-sw-21:1",
    "to": "node-21-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-zw-b4",
    "from": "leaf-sw-22:1",
    "to": "node-22-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-a1",
    "from": "leaf-sw-23:1",
    "to": "node-23-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-a2",
    "from": "leaf-sw-24:1",
    "to": "node-24-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-a3",
    "from": "leaf-sw-25:1",
    "to": "node-25-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-a4",
    "from": "leaf-sw-26:1",
    "to": "node-26-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-b1",
    "from": "leaf-sw-27:1",
    "to": "node-27-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-b2",
    "from": "leaf-sw-28:1",
    "to": "node-28-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-b3",
    "from": "leaf-sw-29:1",
    "to": "node-29-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-gr-b4",
    "from": "leaf-sw-30:1",
    "to": "node-30-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-mt-a1",
    "from": "leaf-sw-31:1",
    "to": "node-31-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  },
  {
    "id": "cab-r-mt-a2",
    "from": "leaf-sw-32:1",
    "to": "node-32-01:nic0",
    "type": "OM4",
    "length": "3m",
    "color": "geel",
    "status": "ok"
  },
  {
    "id": "cab-r-mt-a3",
    "from": "leaf-sw-33:1",
    "to": "node-33-01:nic0",
    "type": "DAC",
    "length": "1m",
    "color": "blauw",
    "status": "ok"
  },
  {
    "id": "cab-r-mt-a4",
    "from": "leaf-sw-34:1",
    "to": "node-34-01:nic0",
    "type": "Cat6a",
    "length": "2m",
    "color": "groen",
    "status": "ok"
  }
];

export const procurement = [
  {
    "id": "po-2024-031",
    "supplier": "Dell Technologies",
    "item": "6× R760 server",
    "amount": 84000,
    "lead": "8 wk",
    "status": "geleverd",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2024-044",
    "supplier": "Arista",
    "item": "4× 7050X switch",
    "amount": 52000,
    "lead": "10 wk",
    "status": "besteld",
    "dc": "dc-zwolle"
  },
  {
    "id": "po-2024-058",
    "supplier": "Rittal",
    "item": "12× 42U rack",
    "amount": 36000,
    "lead": "6 wk",
    "status": "offerte",
    "dc": "dc-zwolle"
  },
  {
    "id": "po-2024-061",
    "supplier": "Schleifenbauer",
    "item": "24× PDU",
    "amount": 19200,
    "lead": "4 wk",
    "status": "geïnstalleerd",
    "dc": "dc-apeldoorn"
  },
  {
    "id": "po-2025-010",
    "supplier": "Dell Technologies",
    "item": "8× R760 server",
    "amount": 12000,
    "lead": "4 wk",
    "status": "offerte",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2025-011",
    "supplier": "HPE",
    "item": "4× 7050X switch",
    "amount": 18473,
    "lead": "6 wk",
    "status": "besteld",
    "dc": "dc-apeldoorn"
  },
  {
    "id": "po-2025-012",
    "supplier": "Lenovo",
    "item": "12× 42U rack",
    "amount": 24946,
    "lead": "8 wk",
    "status": "geleverd",
    "dc": "dc-zwolle"
  },
  {
    "id": "po-2025-013",
    "supplier": "Arista",
    "item": "24× PDU",
    "amount": 31419,
    "lead": "10 wk",
    "status": "geïnstalleerd",
    "dc": "dc-groningen"
  },
  {
    "id": "po-2025-014",
    "supplier": "Juniper",
    "item": "2× core-router",
    "amount": 37892,
    "lead": "4 wk",
    "status": "offerte",
    "dc": "dc-maastricht"
  },
  {
    "id": "po-2025-015",
    "supplier": "Rittal",
    "item": "40× SSD 4TB",
    "amount": 44365,
    "lead": "6 wk",
    "status": "besteld",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2025-016",
    "supplier": "Schneider Electric",
    "item": "koelunit N+1",
    "amount": 50838,
    "lead": "8 wk",
    "status": "geleverd",
    "dc": "dc-apeldoorn"
  },
  {
    "id": "po-2025-017",
    "supplier": "Dell Technologies",
    "item": "8× R760 server",
    "amount": 57311,
    "lead": "10 wk",
    "status": "geïnstalleerd",
    "dc": "dc-zwolle"
  },
  {
    "id": "po-2025-018",
    "supplier": "HPE",
    "item": "4× 7050X switch",
    "amount": 63784,
    "lead": "4 wk",
    "status": "offerte",
    "dc": "dc-groningen"
  },
  {
    "id": "po-2025-019",
    "supplier": "Lenovo",
    "item": "12× 42U rack",
    "amount": 70257,
    "lead": "6 wk",
    "status": "besteld",
    "dc": "dc-maastricht"
  },
  {
    "id": "po-2025-020",
    "supplier": "Arista",
    "item": "24× PDU",
    "amount": 76730,
    "lead": "8 wk",
    "status": "geleverd",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2025-021",
    "supplier": "Juniper",
    "item": "2× core-router",
    "amount": 83203,
    "lead": "10 wk",
    "status": "geïnstalleerd",
    "dc": "dc-apeldoorn"
  },
  {
    "id": "po-2025-022",
    "supplier": "Rittal",
    "item": "40× SSD 4TB",
    "amount": 89676,
    "lead": "4 wk",
    "status": "offerte",
    "dc": "dc-zwolle"
  },
  {
    "id": "po-2025-023",
    "supplier": "Schneider Electric",
    "item": "koelunit N+1",
    "amount": 96149,
    "lead": "6 wk",
    "status": "besteld",
    "dc": "dc-groningen"
  },
  {
    "id": "po-2026-007",
    "supplier": "NVIDIA / SuperMicro",
    "item": "4× HGX H200 8-GPU systeem",
    "amount": 1480000,
    "lead": "16 wk",
    "status": "geleverd",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2026-011",
    "supplier": "NVIDIA",
    "item": "2× GB200 NVL72-rack",
    "amount": 6200000,
    "lead": "26 wk",
    "status": "besteld",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2026-014",
    "supplier": "Dell Technologies",
    "item": "4× HGX B200 8-GPU systeem",
    "amount": 1720000,
    "lead": "20 wk",
    "status": "offerte",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2026-018",
    "supplier": "Schneider Electric",
    "item": "Direct-liquid-cooling voor AI-rijen (CDU + manifolds)",
    "amount": 540000,
    "lead": "12 wk",
    "status": "besteld",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2026-021",
    "supplier": "Vertiv",
    "item": "12× hoogvermogen-PDU (63A) voor GPU-racks",
    "amount": 88000,
    "lead": "5 wk",
    "status": "geleverd",
    "dc": "dc-denhaag"
  },
  {
    "id": "po-2026-024",
    "supplier": "NVIDIA / SuperMicro",
    "item": "2× HGX H200 8-GPU systeem",
    "amount": 740000,
    "lead": "16 wk",
    "status": "offerte",
    "dc": "dc-apeldoorn"
  }
];

export const serviceCatalog = [
  {
    "kind": "kubernetes",
    "name": "Kubernetes",
    "icon": "ship-wheel",
    "tagline": "Cluster of namespace",
    "tier": "Gold",
    "priceHint": "vanaf €120/mnd"
  },
  {
    "kind": "postgres",
    "name": "PostgreSQL",
    "icon": "cylinder-split",
    "tagline": "Managed database",
    "tier": "Gold",
    "priceHint": "vanaf €60/mnd"
  },
  {
    "kind": "kafka",
    "name": "Kafka",
    "icon": "folder-stack",
    "tagline": "Message broker / event streaming",
    "tier": "Silver",
    "priceHint": "vanaf €90/mnd"
  },
  {
    "kind": "mail",
    "name": "Mail / SMTP-relay",
    "icon": "envelope",
    "tagline": "Transactionele mail",
    "tier": "Silver",
    "priceHint": "vanaf €20/mnd"
  },
  {
    "kind": "objectstore",
    "name": "Object storage",
    "icon": "cloud",
    "tagline": "S3-compatible opslag",
    "tier": "Silver",
    "priceHint": "vanaf €15/mnd"
  },
  {
    "kind": "redis",
    "name": "Redis cache",
    "icon": "cylinder-split",
    "tagline": "In-memory cache",
    "tier": "Bronze",
    "priceHint": "vanaf €25/mnd"
  },
  {
    "kind": "llm",
    "name": "LLM-API",
    "icon": "sparkles",
    "tagline": "Overheids-LLM-gateway",
    "tier": "Gold",
    "priceHint": "per 1M tokens"
  }
];

export const instances = [
  {
    "id": "pg-burgerzaken-prod",
    "kind": "postgres",
    "name": "pg-burgerzaken-prod",
    "team": "team-burgerzaken",
    "app": "app-paspoort",
    "env": "prod",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-a1",
    "dc": "dc-denhaag",
    "costMonth": 240
  },
  {
    "id": "pg-toeslagen-acc",
    "kind": "postgres",
    "name": "pg-toeslagen-acc",
    "team": "team-toeslagen",
    "app": "app-toeslagen",
    "env": "acc",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-a2",
    "dc": "dc-denhaag",
    "costMonth": 120
  },
  {
    "id": "k8s-platform-prod",
    "kind": "kubernetes",
    "name": "k8s-platform-prod",
    "team": "team-platform",
    "app": null,
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-a1",
    "dc": "dc-denhaag",
    "costMonth": 980,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-toeslagen-prod",
    "kind": "kafka",
    "name": "kafka-toeslagen-prod",
    "team": "team-toeslagen",
    "app": "app-toeslagen",
    "env": "prod",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-a2",
    "dc": "dc-denhaag",
    "costMonth": 180
  },
  {
    "id": "llm-gilde-prod",
    "kind": "llm",
    "name": "llm-gilde-prod",
    "team": "team-platform",
    "app": "app-platformportaal",
    "env": "prod",
    "size": "overheids-llm-l",
    "status": "ready",
    "rack": null,
    "dc": "dc-denhaag",
    "costMonth": 320
  },
  {
    "id": "postgres-kentekencheck-dev",
    "kind": "postgres",
    "name": "postgres-kentekencheck-dev",
    "team": "team-cbs-statline",
    "app": "app-kentekencheck",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 208
  },
  {
    "id": "kubernetes-kentekencheck-test",
    "kind": "kubernetes",
    "name": "kubernetes-kentekencheck-test",
    "team": "team-cbs-statline",
    "app": "app-kentekencheck",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 261,
    "havenCompliant": false
  },
  {
    "id": "kubernetes-studiefinanciering-portaal-test",
    "kind": "kubernetes",
    "name": "kubernetes-studiefinanciering-portaal-test",
    "team": "team-ind-data",
    "app": "app-studiefinanciering-portaal",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 245,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-studiefinanciering-portaal-acc",
    "kind": "kafka",
    "name": "kafka-studiefinanciering-portaal-acc",
    "team": "team-ind-data",
    "app": "app-studiefinanciering-portaal",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 298
  },
  {
    "id": "redis-studiefinanciering-portaal-prod",
    "kind": "redis",
    "name": "redis-studiefinanciering-portaal-prod",
    "team": "team-ind-data",
    "app": "app-studiefinanciering-portaal",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 351
  },
  {
    "id": "kafka-vergunningchecker-acc",
    "kind": "kafka",
    "name": "kafka-vergunningchecker-acc",
    "team": "team-kvk-api",
    "app": "app-vergunningchecker",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 282
  },
  {
    "id": "redis-inkomenstoets-prod",
    "kind": "redis",
    "name": "redis-inkomenstoets-prod",
    "team": "team-nldd-iam",
    "app": "app-inkomenstoets",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 319
  },
  {
    "id": "postgres-inkomenstoets-dev",
    "kind": "postgres",
    "name": "postgres-inkomenstoets-dev",
    "team": "team-nldd-iam",
    "app": "app-inkomenstoets",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 372
  },
  {
    "id": "postgres-aangifte-omzetbelasting-dev",
    "kind": "postgres",
    "name": "postgres-aangifte-omzetbelasting-dev",
    "team": "team-koop-officielebekendmakingen",
    "app": "app-aangifte-omzetbelasting",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 356
  },
  {
    "id": "kubernetes-aangifte-omzetbelasting-test",
    "kind": "kubernetes",
    "name": "kubernetes-aangifte-omzetbelasting-test",
    "team": "team-koop-officielebekendmakingen",
    "app": "app-aangifte-omzetbelasting",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 409,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-aangifte-omzetbelasting-acc",
    "kind": "kafka",
    "name": "kafka-aangifte-omzetbelasting-acc",
    "team": "team-koop-officielebekendmakingen",
    "app": "app-aangifte-omzetbelasting",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 462
  },
  {
    "id": "kubernetes-reisdocument-aanvraag-test",
    "kind": "kubernetes",
    "name": "kubernetes-reisdocument-aanvraag-test",
    "team": "team-kvk-handelsregister",
    "app": "app-reisdocument-aanvraag",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 393,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-bijstandsuitkering-acc",
    "kind": "kafka",
    "name": "kafka-bijstandsuitkering-acc",
    "team": "team-ezk-ondernemen",
    "app": "app-bijstandsuitkering",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 430
  },
  {
    "id": "redis-bijstandsuitkering-prod",
    "kind": "redis",
    "name": "redis-bijstandsuitkering-prod",
    "team": "team-ezk-ondernemen",
    "app": "app-bijstandsuitkering",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 483
  },
  {
    "id": "redis-kadaster-viewer-prod",
    "kind": "redis",
    "name": "redis-kadaster-viewer-prod",
    "team": "team-def-secinfra",
    "app": "app-kadaster-viewer",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 467
  },
  {
    "id": "postgres-kadaster-viewer-dev",
    "kind": "postgres",
    "name": "postgres-kadaster-viewer-dev",
    "team": "team-def-secinfra",
    "app": "app-kadaster-viewer",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 520
  },
  {
    "id": "kubernetes-kadaster-viewer-test",
    "kind": "kubernetes",
    "name": "kubernetes-kadaster-viewer-test",
    "team": "team-def-secinfra",
    "app": "app-kadaster-viewer",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 573,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-subsidieportaal-rvo-dev",
    "kind": "postgres",
    "name": "postgres-subsidieportaal-rvo-dev",
    "team": "team-duo-register",
    "app": "app-subsidieportaal-rvo",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 504
  },
  {
    "id": "kubernetes-ww-aanvraag-test",
    "kind": "kubernetes",
    "name": "kubernetes-ww-aanvraag-test",
    "team": "team-logius-docs",
    "app": "app-ww-aanvraag",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 541,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-ww-aanvraag-acc",
    "kind": "kafka",
    "name": "kafka-ww-aanvraag-acc",
    "team": "team-logius-docs",
    "app": "app-ww-aanvraag",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 594
  },
  {
    "id": "kafka-inspectieplanner-ilt-acc",
    "kind": "kafka",
    "name": "kafka-inspectieplanner-ilt-acc",
    "team": "team-rvo-portaal",
    "app": "app-inspectieplanner-ilt",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 578
  },
  {
    "id": "redis-inspectieplanner-ilt-prod",
    "kind": "redis",
    "name": "redis-inspectieplanner-ilt-prod",
    "team": "team-rvo-portaal",
    "app": "app-inspectieplanner-ilt",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 631
  },
  {
    "id": "postgres-inspectieplanner-ilt-dev",
    "kind": "postgres",
    "name": "postgres-inspectieplanner-ilt-dev",
    "team": "team-rvo-portaal",
    "app": "app-inspectieplanner-ilt",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 684
  },
  {
    "id": "redis-aow-uitkering-prod",
    "kind": "redis",
    "name": "redis-aow-uitkering-prod",
    "team": "team-rvo-geodata",
    "app": "app-aow-uitkering",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 615
  },
  {
    "id": "postgres-kinderbijslag-dev",
    "kind": "postgres",
    "name": "postgres-kinderbijslag-dev",
    "team": "team-logius-docs",
    "app": "app-kinderbijslag",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 652
  },
  {
    "id": "kubernetes-kinderbijslag-test",
    "kind": "kubernetes",
    "name": "kubernetes-kinderbijslag-test",
    "team": "team-logius-docs",
    "app": "app-kinderbijslag",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 705,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-woz-bezwaar-test",
    "kind": "kubernetes",
    "name": "kubernetes-woz-bezwaar-test",
    "team": "team-bd-platform",
    "app": "app-woz-bezwaar",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 689,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-woz-bezwaar-acc",
    "kind": "kafka",
    "name": "kafka-woz-bezwaar-acc",
    "team": "team-bd-platform",
    "app": "app-woz-bezwaar",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 742
  },
  {
    "id": "redis-woz-bezwaar-prod",
    "kind": "redis",
    "name": "redis-woz-bezwaar-prod",
    "team": "team-bd-platform",
    "app": "app-woz-bezwaar",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 795
  },
  {
    "id": "kafka-bezwaarafhandeling-acc",
    "kind": "kafka",
    "name": "kafka-bezwaarafhandeling-acc",
    "team": "team-dictu-data",
    "app": "app-bezwaarafhandeling",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 726
  },
  {
    "id": "redis-rijbewijs-vernieuwen-prod",
    "kind": "redis",
    "name": "redis-rijbewijs-vernieuwen-prod",
    "team": "team-bd-gegevens",
    "app": "app-rijbewijs-vernieuwen",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 763
  },
  {
    "id": "postgres-rijbewijs-vernieuwen-dev",
    "kind": "postgres",
    "name": "postgres-rijbewijs-vernieuwen-dev",
    "team": "team-bd-gegevens",
    "app": "app-rijbewijs-vernieuwen",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 816
  },
  {
    "id": "postgres-naturalisatie-aanvraag-dev",
    "kind": "postgres",
    "name": "postgres-naturalisatie-aanvraag-dev",
    "team": "team-duo-studiefinanciering",
    "app": "app-naturalisatie-aanvraag",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 800
  },
  {
    "id": "kubernetes-naturalisatie-aanvraag-test",
    "kind": "kubernetes",
    "name": "kubernetes-naturalisatie-aanvraag-test",
    "team": "team-duo-studiefinanciering",
    "app": "app-naturalisatie-aanvraag",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 853,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-naturalisatie-aanvraag-acc",
    "kind": "kafka",
    "name": "kafka-naturalisatie-aanvraag-acc",
    "team": "team-duo-studiefinanciering",
    "app": "app-naturalisatie-aanvraag",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 906
  },
  {
    "id": "kubernetes-verblijfsvergunning-test",
    "kind": "kubernetes",
    "name": "kubernetes-verblijfsvergunning-test",
    "team": "team-dpc-rijksoverheid",
    "app": "app-verblijfsvergunning",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 837,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-huurtoeslag-rekenen-acc",
    "kind": "kafka",
    "name": "kafka-huurtoeslag-rekenen-acc",
    "team": "team-aenm-keten",
    "app": "app-huurtoeslag-rekenen",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 874
  },
  {
    "id": "redis-huurtoeslag-rekenen-prod",
    "kind": "redis",
    "name": "redis-huurtoeslag-rekenen-prod",
    "team": "team-aenm-keten",
    "app": "app-huurtoeslag-rekenen",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 927
  },
  {
    "id": "redis-digid-koppeling-prod",
    "kind": "redis",
    "name": "redis-digid-koppeling-prod",
    "team": "team-szw-regelingen",
    "app": "app-digid-koppeling",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 911
  },
  {
    "id": "postgres-digid-koppeling-dev",
    "kind": "postgres",
    "name": "postgres-digid-koppeling-dev",
    "team": "team-szw-regelingen",
    "app": "app-digid-koppeling",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 64
  },
  {
    "id": "kubernetes-digid-koppeling-test",
    "kind": "kubernetes",
    "name": "kubernetes-digid-koppeling-test",
    "team": "team-szw-regelingen",
    "app": "app-digid-koppeling",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 117,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-eherkenning-broker-dev",
    "kind": "postgres",
    "name": "postgres-eherkenning-broker-dev",
    "team": "team-acm-toezicht",
    "app": "app-eherkenning-broker",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 948
  },
  {
    "id": "kubernetes-bsn-validatie-test",
    "kind": "kubernetes",
    "name": "kubernetes-bsn-validatie-test",
    "team": "team-duo-studiefinanciering",
    "app": "app-bsn-validatie",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 85,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-bsn-validatie-acc",
    "kind": "kafka",
    "name": "kafka-bsn-validatie-acc",
    "team": "team-duo-studiefinanciering",
    "app": "app-bsn-validatie",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 138
  },
  {
    "id": "kafka-iban-validatie-acc",
    "kind": "kafka",
    "name": "kafka-iban-validatie-acc",
    "team": "team-cbs-platform",
    "app": "app-iban-validatie",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 122
  },
  {
    "id": "redis-iban-validatie-prod",
    "kind": "redis",
    "name": "redis-iban-validatie-prod",
    "team": "team-cbs-platform",
    "app": "app-iban-validatie",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 175
  },
  {
    "id": "postgres-iban-validatie-dev",
    "kind": "postgres",
    "name": "postgres-iban-validatie-dev",
    "team": "team-cbs-platform",
    "app": "app-iban-validatie",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 228
  },
  {
    "id": "redis-adrescheck-bag-prod",
    "kind": "redis",
    "name": "redis-adrescheck-bag-prod",
    "team": "team-svb-kinderbijslag",
    "app": "app-adrescheck-bag",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 159
  },
  {
    "id": "postgres-brp-bevraging-dev",
    "kind": "postgres",
    "name": "postgres-brp-bevraging-dev",
    "team": "team-rvo-portaal",
    "app": "app-brp-bevraging",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 196
  },
  {
    "id": "kubernetes-brp-bevraging-test",
    "kind": "kubernetes",
    "name": "kubernetes-brp-bevraging-test",
    "team": "team-rvo-portaal",
    "app": "app-brp-bevraging",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 249,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-handelsregister-zoeker-test",
    "kind": "kubernetes",
    "name": "kubernetes-handelsregister-zoeker-test",
    "team": "team-az-comms",
    "app": "app-handelsregister-zoeker",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 233,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-handelsregister-zoeker-acc",
    "kind": "kafka",
    "name": "kafka-handelsregister-zoeker-acc",
    "team": "team-az-comms",
    "app": "app-handelsregister-zoeker",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 286
  },
  {
    "id": "redis-handelsregister-zoeker-prod",
    "kind": "redis",
    "name": "redis-handelsregister-zoeker-prod",
    "team": "team-az-comms",
    "app": "app-handelsregister-zoeker",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 339
  },
  {
    "id": "kafka-incasso-cjib-acc",
    "kind": "kafka",
    "name": "kafka-incasso-cjib-acc",
    "team": "team-duo-studiefinanciering",
    "app": "app-incasso-cjib",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 270
  },
  {
    "id": "redis-boete-bezwaar-prod",
    "kind": "redis",
    "name": "redis-boete-bezwaar-prod",
    "team": "team-szw-regelingen",
    "app": "app-boete-bezwaar",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 307
  },
  {
    "id": "postgres-boete-bezwaar-dev",
    "kind": "postgres",
    "name": "postgres-boete-bezwaar-dev",
    "team": "team-szw-regelingen",
    "app": "app-boete-bezwaar",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 360
  },
  {
    "id": "postgres-belastingaangifte-ib-dev",
    "kind": "postgres",
    "name": "postgres-belastingaangifte-ib-dev",
    "team": "team-uwv-gegevens",
    "app": "app-belastingaangifte-ib",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 344
  },
  {
    "id": "kubernetes-belastingaangifte-ib-test",
    "kind": "kubernetes",
    "name": "kubernetes-belastingaangifte-ib-test",
    "team": "team-uwv-gegevens",
    "app": "app-belastingaangifte-ib",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 397,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-belastingaangifte-ib-acc",
    "kind": "kafka",
    "name": "kafka-belastingaangifte-ib-acc",
    "team": "team-uwv-gegevens",
    "app": "app-belastingaangifte-ib",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 450
  },
  {
    "id": "kubernetes-loonheffing-test",
    "kind": "kubernetes",
    "name": "kubernetes-loonheffing-test",
    "team": "team-bd-gegevens",
    "app": "app-loonheffing",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 381,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-zorgtoeslag-portaal-acc",
    "kind": "kafka",
    "name": "kafka-zorgtoeslag-portaal-acc",
    "team": "team-cbr-rijbewijs",
    "app": "app-zorgtoeslag-portaal",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 418
  },
  {
    "id": "redis-zorgtoeslag-portaal-prod",
    "kind": "redis",
    "name": "redis-zorgtoeslag-portaal-prod",
    "team": "team-cbr-rijbewijs",
    "app": "app-zorgtoeslag-portaal",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 471
  },
  {
    "id": "redis-pgb-beheer-prod",
    "kind": "redis",
    "name": "redis-pgb-beheer-prod",
    "team": "team-acm-toezicht",
    "app": "app-pgb-beheer",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 455
  },
  {
    "id": "postgres-pgb-beheer-dev",
    "kind": "postgres",
    "name": "postgres-pgb-beheer-dev",
    "team": "team-acm-toezicht",
    "app": "app-pgb-beheer",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 508
  },
  {
    "id": "kubernetes-pgb-beheer-test",
    "kind": "kubernetes",
    "name": "kubernetes-pgb-beheer-test",
    "team": "team-acm-toezicht",
    "app": "app-pgb-beheer",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 561,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-zorgverzekeraar-koppeling-dev",
    "kind": "postgres",
    "name": "postgres-zorgverzekeraar-koppeling-dev",
    "team": "team-ezk-ondernemen",
    "app": "app-zorgverzekeraar-koppeling",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 492
  },
  {
    "id": "kubernetes-vaccinatieregister-test",
    "kind": "kubernetes",
    "name": "kubernetes-vaccinatieregister-test",
    "team": "team-vws-zorgregister",
    "app": "app-vaccinatieregister",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 529,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-vaccinatieregister-acc",
    "kind": "kafka",
    "name": "kafka-vaccinatieregister-acc",
    "team": "team-vws-zorgregister",
    "app": "app-vaccinatieregister",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 582
  },
  {
    "id": "kafka-jeugdzorg-dossier-acc",
    "kind": "kafka",
    "name": "kafka-jeugdzorg-dossier-acc",
    "team": "team-jenv-keten",
    "app": "app-jeugdzorg-dossier",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 566
  },
  {
    "id": "redis-jeugdzorg-dossier-prod",
    "kind": "redis",
    "name": "redis-jeugdzorg-dossier-prod",
    "team": "team-jenv-keten",
    "app": "app-jeugdzorg-dossier",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 619
  },
  {
    "id": "postgres-jeugdzorg-dossier-dev",
    "kind": "postgres",
    "name": "postgres-jeugdzorg-dossier-dev",
    "team": "team-jenv-keten",
    "app": "app-jeugdzorg-dossier",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 672
  },
  {
    "id": "redis-onderwijsregistratie-prod",
    "kind": "redis",
    "name": "redis-onderwijsregistratie-prod",
    "team": "team-acm-toezicht",
    "app": "app-onderwijsregistratie",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 603
  },
  {
    "id": "postgres-diplomaregister-dev",
    "kind": "postgres",
    "name": "postgres-diplomaregister-dev",
    "team": "team-bd-fraude",
    "app": "app-diplomaregister",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 640
  },
  {
    "id": "kubernetes-diplomaregister-test",
    "kind": "kubernetes",
    "name": "kubernetes-diplomaregister-test",
    "team": "team-bd-fraude",
    "app": "app-diplomaregister",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 693,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-leerplicht-melding-test",
    "kind": "kubernetes",
    "name": "kubernetes-leerplicht-melding-test",
    "team": "team-logius-stelsel",
    "app": "app-leerplicht-melding",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 677,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-leerplicht-melding-acc",
    "kind": "kafka",
    "name": "kafka-leerplicht-melding-acc",
    "team": "team-logius-stelsel",
    "app": "app-leerplicht-melding",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 730
  },
  {
    "id": "redis-leerplicht-melding-prod",
    "kind": "redis",
    "name": "redis-leerplicht-melding-prod",
    "team": "team-logius-stelsel",
    "app": "app-leerplicht-melding",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 783
  },
  {
    "id": "kafka-studielening-rekentool-acc",
    "kind": "kafka",
    "name": "kafka-studielening-rekentool-acc",
    "team": "team-uwv-arbeidsmarkt",
    "app": "app-studielening-rekentool",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 714
  },
  {
    "id": "redis-omgevingsloket-prod",
    "kind": "redis",
    "name": "redis-omgevingsloket-prod",
    "team": "team-koop-wetten",
    "app": "app-omgevingsloket",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 751
  },
  {
    "id": "postgres-omgevingsloket-dev",
    "kind": "postgres",
    "name": "postgres-omgevingsloket-dev",
    "team": "team-koop-wetten",
    "app": "app-omgevingsloket",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 804
  },
  {
    "id": "postgres-bouwvergunning-dev",
    "kind": "postgres",
    "name": "postgres-bouwvergunning-dev",
    "team": "team-dictu-data",
    "app": "app-bouwvergunning",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 788
  },
  {
    "id": "kubernetes-bouwvergunning-test",
    "kind": "kubernetes",
    "name": "kubernetes-bouwvergunning-test",
    "team": "team-dictu-data",
    "app": "app-bouwvergunning",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 841,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-bouwvergunning-acc",
    "kind": "kafka",
    "name": "kafka-bouwvergunning-acc",
    "team": "team-dictu-data",
    "app": "app-bouwvergunning",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 894
  },
  {
    "id": "kubernetes-milieumelding-test",
    "kind": "kubernetes",
    "name": "kubernetes-milieumelding-test",
    "team": "team-ind-data",
    "app": "app-milieumelding",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 825,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-waterschapsheffing-acc",
    "kind": "kafka",
    "name": "kafka-waterschapsheffing-acc",
    "team": "team-fin-platform",
    "app": "app-waterschapsheffing",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 862
  },
  {
    "id": "redis-waterschapsheffing-prod",
    "kind": "redis",
    "name": "redis-waterschapsheffing-prod",
    "team": "team-fin-platform",
    "app": "app-waterschapsheffing",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 915
  },
  {
    "id": "redis-verkeersboete-viewer-prod",
    "kind": "redis",
    "name": "redis-verkeersboete-viewer-prod",
    "team": "team-logius-digid",
    "app": "app-verkeersboete-viewer",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 899
  },
  {
    "id": "postgres-verkeersboete-viewer-dev",
    "kind": "postgres",
    "name": "postgres-verkeersboete-viewer-dev",
    "team": "team-logius-digid",
    "app": "app-verkeersboete-viewer",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 952
  },
  {
    "id": "kubernetes-verkeersboete-viewer-test",
    "kind": "kubernetes",
    "name": "kubernetes-verkeersboete-viewer-test",
    "team": "team-logius-digid",
    "app": "app-verkeersboete-viewer",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 105,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-parkeervergunning-dev",
    "kind": "postgres",
    "name": "postgres-parkeervergunning-dev",
    "team": "team-kgg-energie",
    "app": "app-parkeervergunning",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 936
  },
  {
    "id": "kubernetes-rijksbegroting-explorer-test",
    "kind": "kubernetes",
    "name": "kubernetes-rijksbegroting-explorer-test",
    "team": "team-ienw-kenteken",
    "app": "app-rijksbegroting-explorer",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 73,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-rijksbegroting-explorer-acc",
    "kind": "kafka",
    "name": "kafka-rijksbegroting-explorer-acc",
    "team": "team-ienw-kenteken",
    "app": "app-rijksbegroting-explorer",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 126
  },
  {
    "id": "kafka-open-data-portaal-acc",
    "kind": "kafka",
    "name": "kafka-open-data-portaal-acc",
    "team": "team-rvo-portaal",
    "app": "app-open-data-portaal",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 110
  },
  {
    "id": "redis-open-data-portaal-prod",
    "kind": "redis",
    "name": "redis-open-data-portaal-prod",
    "team": "team-rvo-portaal",
    "app": "app-open-data-portaal",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 163
  },
  {
    "id": "postgres-open-data-portaal-dev",
    "kind": "postgres",
    "name": "postgres-open-data-portaal-dev",
    "team": "team-rvo-portaal",
    "app": "app-open-data-portaal",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 216
  },
  {
    "id": "redis-statistiek-dashboard-cbs-prod",
    "kind": "redis",
    "name": "redis-statistiek-dashboard-cbs-prod",
    "team": "team-cjib-inning",
    "app": "app-statistiek-dashboard-cbs",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 147
  },
  {
    "id": "postgres-etl-basisregisters-dev",
    "kind": "postgres",
    "name": "postgres-etl-basisregisters-dev",
    "team": "team-ienw-voertuig",
    "app": "app-etl-basisregisters",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 184
  },
  {
    "id": "kubernetes-etl-basisregisters-test",
    "kind": "kubernetes",
    "name": "kubernetes-etl-basisregisters-test",
    "team": "team-ienw-voertuig",
    "app": "app-etl-basisregisters",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 237,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-datakwaliteit-monitor-test",
    "kind": "kubernetes",
    "name": "kubernetes-datakwaliteit-monitor-test",
    "team": "team-rvig-iam",
    "app": "app-datakwaliteit-monitor",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 221,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-datakwaliteit-monitor-acc",
    "kind": "kafka",
    "name": "kafka-datakwaliteit-monitor-acc",
    "team": "team-rvig-iam",
    "app": "app-datakwaliteit-monitor",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 274
  },
  {
    "id": "redis-datakwaliteit-monitor-prod",
    "kind": "redis",
    "name": "redis-datakwaliteit-monitor-prod",
    "team": "team-rvig-iam",
    "app": "app-datakwaliteit-monitor",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 327
  },
  {
    "id": "kafka-anonimisering-pipeline-acc",
    "kind": "kafka",
    "name": "kafka-anonimisering-pipeline-acc",
    "team": "team-ind-data",
    "app": "app-anonimisering-pipeline",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 258
  },
  {
    "id": "redis-archief-export-prod",
    "kind": "redis",
    "name": "redis-archief-export-prod",
    "team": "team-jenv-keten",
    "app": "app-archief-export",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 295
  },
  {
    "id": "postgres-archief-export-dev",
    "kind": "postgres",
    "name": "postgres-archief-export-dev",
    "team": "team-jenv-keten",
    "app": "app-archief-export",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 348
  },
  {
    "id": "postgres-nachtelijke-batchrun-dev",
    "kind": "postgres",
    "name": "postgres-nachtelijke-batchrun-dev",
    "team": "team-cbs-microdata",
    "app": "app-nachtelijke-batchrun",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 332
  },
  {
    "id": "kubernetes-nachtelijke-batchrun-test",
    "kind": "kubernetes",
    "name": "kubernetes-nachtelijke-batchrun-test",
    "team": "team-cbs-microdata",
    "app": "app-nachtelijke-batchrun",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 385,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-nachtelijke-batchrun-acc",
    "kind": "kafka",
    "name": "kafka-nachtelijke-batchrun-acc",
    "team": "team-cbs-microdata",
    "app": "app-nachtelijke-batchrun",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 438
  },
  {
    "id": "kubernetes-betaalbatch-generator-test",
    "kind": "kubernetes",
    "name": "kubernetes-betaalbatch-generator-test",
    "team": "team-dictu-hosting",
    "app": "app-betaalbatch-generator",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 369,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-sepa-incasso-job-acc",
    "kind": "kafka",
    "name": "kafka-sepa-incasso-job-acc",
    "team": "team-cbr-rijbewijs",
    "app": "app-sepa-incasso-job",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 406
  },
  {
    "id": "redis-sepa-incasso-job-prod",
    "kind": "redis",
    "name": "redis-sepa-incasso-job-prod",
    "team": "team-cbr-rijbewijs",
    "app": "app-sepa-incasso-job",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 459
  },
  {
    "id": "redis-fraudedetectie-prod",
    "kind": "redis",
    "name": "redis-fraudedetectie-prod",
    "team": "team-ienw-data",
    "app": "app-fraudedetectie",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 443
  },
  {
    "id": "postgres-fraudedetectie-dev",
    "kind": "postgres",
    "name": "postgres-fraudedetectie-dev",
    "team": "team-ienw-data",
    "app": "app-fraudedetectie",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 496
  },
  {
    "id": "kubernetes-fraudedetectie-test",
    "kind": "kubernetes",
    "name": "kubernetes-fraudedetectie-test",
    "team": "team-ienw-data",
    "app": "app-fraudedetectie",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 549,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-risicoscoring-dev",
    "kind": "postgres",
    "name": "postgres-risicoscoring-dev",
    "team": "team-rvig-brp",
    "app": "app-risicoscoring",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 480
  },
  {
    "id": "kubernetes-sanctielijst-check-test",
    "kind": "kubernetes",
    "name": "kubernetes-sanctielijst-check-test",
    "team": "team-ienw-voertuig",
    "app": "app-sanctielijst-check",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 517,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-sanctielijst-check-acc",
    "kind": "kafka",
    "name": "kafka-sanctielijst-check-acc",
    "team": "team-ienw-voertuig",
    "app": "app-sanctielijst-check",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 570
  },
  {
    "id": "kafka-pki-certificaatbeheer-acc",
    "kind": "kafka",
    "name": "kafka-pki-certificaatbeheer-acc",
    "team": "team-rws-sensoren",
    "app": "app-pki-certificaatbeheer",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 554
  },
  {
    "id": "redis-pki-certificaatbeheer-prod",
    "kind": "redis",
    "name": "redis-pki-certificaatbeheer-prod",
    "team": "team-rws-sensoren",
    "app": "app-pki-certificaatbeheer",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 607
  },
  {
    "id": "postgres-pki-certificaatbeheer-dev",
    "kind": "postgres",
    "name": "postgres-pki-certificaatbeheer-dev",
    "team": "team-rws-sensoren",
    "app": "app-pki-certificaatbeheer",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 660
  },
  {
    "id": "redis-secretsmanager-prod",
    "kind": "redis",
    "name": "redis-secretsmanager-prod",
    "team": "team-duo-examens",
    "app": "app-secretsmanager",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 591
  },
  {
    "id": "postgres-audit-logboek-dev",
    "kind": "postgres",
    "name": "postgres-audit-logboek-dev",
    "team": "team-cbs-statline",
    "app": "app-audit-logboek",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 628
  },
  {
    "id": "kubernetes-audit-logboek-test",
    "kind": "kubernetes",
    "name": "kubernetes-audit-logboek-test",
    "team": "team-cbs-statline",
    "app": "app-audit-logboek",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 681,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-toegangsbeheer-test",
    "kind": "kubernetes",
    "name": "kubernetes-toegangsbeheer-test",
    "team": "team-svb-platform",
    "app": "app-toegangsbeheer",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 665,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-toegangsbeheer-acc",
    "kind": "kafka",
    "name": "kafka-toegangsbeheer-acc",
    "team": "team-svb-platform",
    "app": "app-toegangsbeheer",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 718
  },
  {
    "id": "redis-toegangsbeheer-prod",
    "kind": "redis",
    "name": "redis-toegangsbeheer-prod",
    "team": "team-svb-platform",
    "app": "app-toegangsbeheer",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 771
  },
  {
    "id": "kafka-oidc-provider-acc",
    "kind": "kafka",
    "name": "kafka-oidc-provider-acc",
    "team": "team-cjib-inning",
    "app": "app-oidc-provider",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 702
  },
  {
    "id": "redis-rollenmatrix-prod",
    "kind": "redis",
    "name": "redis-rollenmatrix-prod",
    "team": "team-ind-data",
    "app": "app-rollenmatrix",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 739
  },
  {
    "id": "postgres-rollenmatrix-dev",
    "kind": "postgres",
    "name": "postgres-rollenmatrix-dev",
    "team": "team-ind-data",
    "app": "app-rollenmatrix",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 792
  },
  {
    "id": "postgres-servicedesk-portaal-dev",
    "kind": "postgres",
    "name": "postgres-servicedesk-portaal-dev",
    "team": "team-jio-security",
    "app": "app-servicedesk-portaal",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 776
  },
  {
    "id": "kubernetes-servicedesk-portaal-test",
    "kind": "kubernetes",
    "name": "kubernetes-servicedesk-portaal-test",
    "team": "team-jio-security",
    "app": "app-servicedesk-portaal",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 829,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-servicedesk-portaal-acc",
    "kind": "kafka",
    "name": "kafka-servicedesk-portaal-acc",
    "team": "team-jio-security",
    "app": "app-servicedesk-portaal",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 882
  },
  {
    "id": "kubernetes-statuspagina-test",
    "kind": "kubernetes",
    "name": "kubernetes-statuspagina-test",
    "team": "team-duo-register",
    "app": "app-statuspagina",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 813,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-monitoring-collector-acc",
    "kind": "kafka",
    "name": "kafka-monitoring-collector-acc",
    "team": "team-nza-zorgdata",
    "app": "app-monitoring-collector",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 850
  },
  {
    "id": "redis-monitoring-collector-prod",
    "kind": "redis",
    "name": "redis-monitoring-collector-prod",
    "team": "team-nza-zorgdata",
    "app": "app-monitoring-collector",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 903
  },
  {
    "id": "redis-logaggregatie-prod",
    "kind": "redis",
    "name": "redis-logaggregatie-prod",
    "team": "team-rvo-portaal",
    "app": "app-logaggregatie",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 887
  },
  {
    "id": "postgres-logaggregatie-dev",
    "kind": "postgres",
    "name": "postgres-logaggregatie-dev",
    "team": "team-rvo-portaal",
    "app": "app-logaggregatie",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 940
  },
  {
    "id": "kubernetes-logaggregatie-test",
    "kind": "kubernetes",
    "name": "kubernetes-logaggregatie-test",
    "team": "team-rvo-portaal",
    "app": "app-logaggregatie",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 93,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-deploy-orchestrator-dev",
    "kind": "postgres",
    "name": "postgres-deploy-orchestrator-dev",
    "team": "team-uwv-uitkeringen",
    "app": "app-deploy-orchestrator",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 924
  },
  {
    "id": "kubernetes-ci-runnerpool-test",
    "kind": "kubernetes",
    "name": "kubernetes-ci-runnerpool-test",
    "team": "team-ocw-cultuurdata",
    "app": "app-ci-runnerpool",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 61,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-ci-runnerpool-acc",
    "kind": "kafka",
    "name": "kafka-ci-runnerpool-acc",
    "team": "team-ocw-cultuurdata",
    "app": "app-ci-runnerpool",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 114
  },
  {
    "id": "kafka-feature-flags-acc",
    "kind": "kafka",
    "name": "kafka-feature-flags-acc",
    "team": "team-cbs-microdata",
    "app": "app-feature-flags",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 98
  },
  {
    "id": "redis-feature-flags-prod",
    "kind": "redis",
    "name": "redis-feature-flags-prod",
    "team": "team-cbs-microdata",
    "app": "app-feature-flags",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 151
  },
  {
    "id": "postgres-feature-flags-dev",
    "kind": "postgres",
    "name": "postgres-feature-flags-dev",
    "team": "team-cbs-microdata",
    "app": "app-feature-flags",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 204
  },
  {
    "id": "redis-config-store-prod",
    "kind": "redis",
    "name": "redis-config-store-prod",
    "team": "team-cbs-platform",
    "app": "app-config-store",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 135
  },
  {
    "id": "postgres-nldd-componenten-dev",
    "kind": "postgres",
    "name": "postgres-nldd-componenten-dev",
    "team": "team-dhc-geschillen",
    "app": "app-nldd-componenten",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 172
  },
  {
    "id": "kubernetes-nldd-componenten-test",
    "kind": "kubernetes",
    "name": "kubernetes-nldd-componenten-test",
    "team": "team-dhc-geschillen",
    "app": "app-nldd-componenten",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 225,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-huisstijl-bibliotheek-test",
    "kind": "kubernetes",
    "name": "kubernetes-huisstijl-bibliotheek-test",
    "team": "team-rws-inspectie",
    "app": "app-huisstijl-bibliotheek",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 209,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-huisstijl-bibliotheek-acc",
    "kind": "kafka",
    "name": "kafka-huisstijl-bibliotheek-acc",
    "team": "team-rws-inspectie",
    "app": "app-huisstijl-bibliotheek",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 262
  },
  {
    "id": "redis-huisstijl-bibliotheek-prod",
    "kind": "redis",
    "name": "redis-huisstijl-bibliotheek-prod",
    "team": "team-rws-inspectie",
    "app": "app-huisstijl-bibliotheek",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 315
  },
  {
    "id": "kafka-documentatiesite-acc",
    "kind": "kafka",
    "name": "kafka-documentatiesite-acc",
    "team": "team-cjib-data",
    "app": "app-documentatiesite",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 246
  },
  {
    "id": "redis-api-catalogus-prod",
    "kind": "redis",
    "name": "redis-api-catalogus-prod",
    "team": "team-rvig-brp",
    "app": "app-api-catalogus",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 283
  },
  {
    "id": "postgres-api-catalogus-dev",
    "kind": "postgres",
    "name": "postgres-api-catalogus-dev",
    "team": "team-rvig-brp",
    "app": "app-api-catalogus",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 336
  },
  {
    "id": "postgres-standaarden-checker-dev",
    "kind": "postgres",
    "name": "postgres-standaarden-checker-dev",
    "team": "team-justid-documentatie",
    "app": "app-standaarden-checker",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 320
  },
  {
    "id": "kubernetes-standaarden-checker-test",
    "kind": "kubernetes",
    "name": "kubernetes-standaarden-checker-test",
    "team": "team-justid-documentatie",
    "app": "app-standaarden-checker",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 373,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-standaarden-checker-acc",
    "kind": "kafka",
    "name": "kafka-standaarden-checker-acc",
    "team": "team-justid-documentatie",
    "app": "app-standaarden-checker",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 426
  },
  {
    "id": "kubernetes-toegankelijkheid-scanner-test",
    "kind": "kubernetes",
    "name": "kubernetes-toegankelijkheid-scanner-test",
    "team": "team-dpc-rijksoverheid",
    "app": "app-toegankelijkheid-scanner",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 357,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-pdf-generator-acc",
    "kind": "kafka",
    "name": "kafka-pdf-generator-acc",
    "team": "team-rws-sensoren",
    "app": "app-pdf-generator",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 394
  },
  {
    "id": "redis-pdf-generator-prod",
    "kind": "redis",
    "name": "redis-pdf-generator-prod",
    "team": "team-rws-sensoren",
    "app": "app-pdf-generator",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 447
  },
  {
    "id": "redis-brief-generator-prod",
    "kind": "redis",
    "name": "redis-brief-generator-prod",
    "team": "team-rvo-geodata",
    "app": "app-brief-generator",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 431
  },
  {
    "id": "postgres-brief-generator-dev",
    "kind": "postgres",
    "name": "postgres-brief-generator-dev",
    "team": "team-rvo-geodata",
    "app": "app-brief-generator",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 484
  },
  {
    "id": "kubernetes-brief-generator-test",
    "kind": "kubernetes",
    "name": "kubernetes-brief-generator-test",
    "team": "team-rvo-geodata",
    "app": "app-brief-generator",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 537,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-berichtenbox-dev",
    "kind": "postgres",
    "name": "postgres-berichtenbox-dev",
    "team": "team-cbs-platform",
    "app": "app-berichtenbox",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 468
  },
  {
    "id": "kubernetes-mijnoverheid-portaal-test",
    "kind": "kubernetes",
    "name": "kubernetes-mijnoverheid-portaal-test",
    "team": "team-bd-inning",
    "app": "app-mijnoverheid-portaal",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 505,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-mijnoverheid-portaal-acc",
    "kind": "kafka",
    "name": "kafka-mijnoverheid-portaal-acc",
    "team": "team-bd-inning",
    "app": "app-mijnoverheid-portaal",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 558
  },
  {
    "id": "kafka-formulierenbouwer-acc",
    "kind": "kafka",
    "name": "kafka-formulierenbouwer-acc",
    "team": "team-ind-dossiers",
    "app": "app-formulierenbouwer",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 542
  },
  {
    "id": "redis-formulierenbouwer-prod",
    "kind": "redis",
    "name": "redis-formulierenbouwer-prod",
    "team": "team-ind-dossiers",
    "app": "app-formulierenbouwer",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 595
  },
  {
    "id": "postgres-formulierenbouwer-dev",
    "kind": "postgres",
    "name": "postgres-formulierenbouwer-dev",
    "team": "team-ind-dossiers",
    "app": "app-formulierenbouwer",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 648
  },
  {
    "id": "redis-vragenlijst-engine-prod",
    "kind": "redis",
    "name": "redis-vragenlijst-engine-prod",
    "team": "team-nza-zorgdata",
    "app": "app-vragenlijst-engine",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 579
  },
  {
    "id": "postgres-afspraakplanner-dev",
    "kind": "postgres",
    "name": "postgres-afspraakplanner-dev",
    "team": "team-ksa-handhaving",
    "app": "app-afspraakplanner",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 616
  },
  {
    "id": "kubernetes-afspraakplanner-test",
    "kind": "kubernetes",
    "name": "kubernetes-afspraakplanner-test",
    "team": "team-ksa-handhaving",
    "app": "app-afspraakplanner",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 669,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-wachtrij-manager-test",
    "kind": "kubernetes",
    "name": "kubernetes-wachtrij-manager-test",
    "team": "team-jio-keten",
    "app": "app-wachtrij-manager",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 653,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-wachtrij-manager-acc",
    "kind": "kafka",
    "name": "kafka-wachtrij-manager-acc",
    "team": "team-jio-keten",
    "app": "app-wachtrij-manager",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 706
  },
  {
    "id": "redis-wachtrij-manager-prod",
    "kind": "redis",
    "name": "redis-wachtrij-manager-prod",
    "team": "team-jio-keten",
    "app": "app-wachtrij-manager",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 759
  },
  {
    "id": "kafka-notificatieservice-acc",
    "kind": "kafka",
    "name": "kafka-notificatieservice-acc",
    "team": "team-dictu-werkplek",
    "app": "app-notificatieservice",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 690
  },
  {
    "id": "redis-sms-gateway-prod",
    "kind": "redis",
    "name": "redis-sms-gateway-prod",
    "team": "team-svb-gegevens",
    "app": "app-sms-gateway",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 727
  },
  {
    "id": "postgres-sms-gateway-dev",
    "kind": "postgres",
    "name": "postgres-sms-gateway-dev",
    "team": "team-svb-gegevens",
    "app": "app-sms-gateway",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 780
  },
  {
    "id": "postgres-betaalverzoek-dev",
    "kind": "postgres",
    "name": "postgres-betaalverzoek-dev",
    "team": "team-rws-platform",
    "app": "app-betaalverzoek",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 764
  },
  {
    "id": "kubernetes-betaalverzoek-test",
    "kind": "kubernetes",
    "name": "kubernetes-betaalverzoek-test",
    "team": "team-rws-platform",
    "app": "app-betaalverzoek",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 817,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-betaalverzoek-acc",
    "kind": "kafka",
    "name": "kafka-betaalverzoek-acc",
    "team": "team-rws-platform",
    "app": "app-betaalverzoek",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 870
  },
  {
    "id": "kubernetes-ideal-koppeling-test",
    "kind": "kubernetes",
    "name": "kubernetes-ideal-koppeling-test",
    "team": "team-ind-iam",
    "app": "app-ideal-koppeling",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 801,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-machtigingenregister-acc",
    "kind": "kafka",
    "name": "kafka-machtigingenregister-acc",
    "team": "team-ocw-cultuurdata",
    "app": "app-machtigingenregister",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 838
  },
  {
    "id": "redis-machtigingenregister-prod",
    "kind": "redis",
    "name": "redis-machtigingenregister-prod",
    "team": "team-ocw-cultuurdata",
    "app": "app-machtigingenregister",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 891
  },
  {
    "id": "redis-gegevensmakelaar-prod",
    "kind": "redis",
    "name": "redis-gegevensmakelaar-prod",
    "team": "team-ind-dossiers",
    "app": "app-gegevensmakelaar",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 875
  },
  {
    "id": "postgres-gegevensmakelaar-dev",
    "kind": "postgres",
    "name": "postgres-gegevensmakelaar-dev",
    "team": "team-ind-dossiers",
    "app": "app-gegevensmakelaar",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 928
  },
  {
    "id": "kubernetes-gegevensmakelaar-test",
    "kind": "kubernetes",
    "name": "kubernetes-gegevensmakelaar-test",
    "team": "team-ind-dossiers",
    "app": "app-gegevensmakelaar",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 81,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-stelselcatalogus-dev",
    "kind": "postgres",
    "name": "postgres-stelselcatalogus-dev",
    "team": "team-cbs-statline",
    "app": "app-stelselcatalogus",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 912
  },
  {
    "id": "kubernetes-terugmeldvoorziening-test",
    "kind": "kubernetes",
    "name": "kubernetes-terugmeldvoorziening-test",
    "team": "team-bd-platform",
    "app": "app-terugmeldvoorziening",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 949,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-terugmeldvoorziening-acc",
    "kind": "kafka",
    "name": "kafka-terugmeldvoorziening-acc",
    "team": "team-bd-platform",
    "app": "app-terugmeldvoorziening",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 102
  },
  {
    "id": "kafka-digikoppeling-adapter-acc",
    "kind": "kafka",
    "name": "kafka-digikoppeling-adapter-acc",
    "team": "team-kgg-energie",
    "app": "app-digikoppeling-adapter",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 86
  },
  {
    "id": "redis-digikoppeling-adapter-prod",
    "kind": "redis",
    "name": "redis-digikoppeling-adapter-prod",
    "team": "team-kgg-energie",
    "app": "app-digikoppeling-adapter",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 139
  },
  {
    "id": "postgres-digikoppeling-adapter-dev",
    "kind": "postgres",
    "name": "postgres-digikoppeling-adapter-dev",
    "team": "team-kgg-energie",
    "app": "app-digikoppeling-adapter",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 192
  },
  {
    "id": "redis-fsc-inway-prod",
    "kind": "redis",
    "name": "redis-fsc-inway-prod",
    "team": "team-dpc-content",
    "app": "app-fsc-inway",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 123
  },
  {
    "id": "postgres-cloudevents-broker-dev",
    "kind": "postgres",
    "name": "postgres-cloudevents-broker-dev",
    "team": "team-jio-security",
    "app": "app-cloudevents-broker",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 160
  },
  {
    "id": "kubernetes-cloudevents-broker-test",
    "kind": "kubernetes",
    "name": "kubernetes-cloudevents-broker-test",
    "team": "team-jio-security",
    "app": "app-cloudevents-broker",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 213,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-subsidie-aanvraag-test",
    "kind": "kubernetes",
    "name": "kubernetes-subsidie-aanvraag-test",
    "team": "team-rvo-subsidies",
    "app": "app-subsidie-aanvraag",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 197,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-subsidie-aanvraag-acc",
    "kind": "kafka",
    "name": "kafka-subsidie-aanvraag-acc",
    "team": "team-rvo-subsidies",
    "app": "app-subsidie-aanvraag",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 250
  },
  {
    "id": "redis-subsidie-aanvraag-prod",
    "kind": "redis",
    "name": "redis-subsidie-aanvraag-prod",
    "team": "team-rvo-subsidies",
    "app": "app-subsidie-aanvraag",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 303
  },
  {
    "id": "kafka-aanbestedingsportaal-acc",
    "kind": "kafka",
    "name": "kafka-aanbestedingsportaal-acc",
    "team": "team-vws-data",
    "app": "app-aanbestedingsportaal",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 234
  },
  {
    "id": "redis-inkooporder-verwerking-prod",
    "kind": "redis",
    "name": "redis-inkooporder-verwerking-prod",
    "team": "team-ind-iam",
    "app": "app-inkooporder-verwerking",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 271
  },
  {
    "id": "postgres-inkooporder-verwerking-dev",
    "kind": "postgres",
    "name": "postgres-inkooporder-verwerking-dev",
    "team": "team-ind-iam",
    "app": "app-inkooporder-verwerking",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 324
  },
  {
    "id": "postgres-factuurverwerking-dev",
    "kind": "postgres",
    "name": "postgres-factuurverwerking-dev",
    "team": "team-rws-verkeer",
    "app": "app-factuurverwerking",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 308
  },
  {
    "id": "kubernetes-factuurverwerking-test",
    "kind": "kubernetes",
    "name": "kubernetes-factuurverwerking-test",
    "team": "team-rws-verkeer",
    "app": "app-factuurverwerking",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 361,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-factuurverwerking-acc",
    "kind": "kafka",
    "name": "kafka-factuurverwerking-acc",
    "team": "team-rws-verkeer",
    "app": "app-factuurverwerking",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 414
  },
  {
    "id": "kubernetes-personeelsdossier-test",
    "kind": "kubernetes",
    "name": "kubernetes-personeelsdossier-test",
    "team": "team-cjib-inning",
    "app": "app-personeelsdossier",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 345,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-verlofaanvraag-acc",
    "kind": "kafka",
    "name": "kafka-verlofaanvraag-acc",
    "team": "team-nza-zorgdata",
    "app": "app-verlofaanvraag",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 382
  },
  {
    "id": "redis-verlofaanvraag-prod",
    "kind": "redis",
    "name": "redis-verlofaanvraag-prod",
    "team": "team-nza-zorgdata",
    "app": "app-verlofaanvraag",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 435
  },
  {
    "id": "redis-declaratie-indienen-prod",
    "kind": "redis",
    "name": "redis-declaratie-indienen-prod",
    "team": "team-dictu-werkplek",
    "app": "app-declaratie-indienen",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 419
  },
  {
    "id": "postgres-declaratie-indienen-dev",
    "kind": "postgres",
    "name": "postgres-declaratie-indienen-dev",
    "team": "team-dictu-werkplek",
    "app": "app-declaratie-indienen",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 472
  },
  {
    "id": "kubernetes-declaratie-indienen-test",
    "kind": "kubernetes",
    "name": "kubernetes-declaratie-indienen-test",
    "team": "team-dictu-werkplek",
    "app": "app-declaratie-indienen",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 525,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-rooster-uitvoering-dev",
    "kind": "postgres",
    "name": "postgres-rooster-uitvoering-dev",
    "team": "team-bd-inning",
    "app": "app-rooster-uitvoering",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 456
  },
  {
    "id": "kubernetes-zaaksysteem-test",
    "kind": "kubernetes",
    "name": "kubernetes-zaaksysteem-test",
    "team": "team-jio-platform",
    "app": "app-zaaksysteem",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 493,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-zaaksysteem-acc",
    "kind": "kafka",
    "name": "kafka-zaaksysteem-acc",
    "team": "team-jio-platform",
    "app": "app-zaaksysteem",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 546
  },
  {
    "id": "kafka-documentmanagement-acc",
    "kind": "kafka",
    "name": "kafka-documentmanagement-acc",
    "team": "team-duo-platform",
    "app": "app-documentmanagement",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 530
  },
  {
    "id": "redis-documentmanagement-prod",
    "kind": "redis",
    "name": "redis-documentmanagement-prod",
    "team": "team-duo-platform",
    "app": "app-documentmanagement",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 583
  },
  {
    "id": "postgres-documentmanagement-dev",
    "kind": "postgres",
    "name": "postgres-documentmanagement-dev",
    "team": "team-duo-platform",
    "app": "app-documentmanagement",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 636
  },
  {
    "id": "redis-handtekening-validatie-prod",
    "kind": "redis",
    "name": "redis-handtekening-validatie-prod",
    "team": "team-logius-docs",
    "app": "app-handtekening-validatie",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 567
  },
  {
    "id": "postgres-virusscanner-gateway-dev",
    "kind": "postgres",
    "name": "postgres-virusscanner-gateway-dev",
    "team": "team-ind-dossiers",
    "app": "app-virusscanner-gateway",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 604
  },
  {
    "id": "kubernetes-virusscanner-gateway-test",
    "kind": "kubernetes",
    "name": "kubernetes-virusscanner-gateway-test",
    "team": "team-ind-dossiers",
    "app": "app-virusscanner-gateway",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 657,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kubernetes-backup-scheduler-test",
    "kind": "kubernetes",
    "name": "kubernetes-backup-scheduler-test",
    "team": "team-ienw-voertuig",
    "app": "app-backup-scheduler",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 641,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-backup-scheduler-acc",
    "kind": "kafka",
    "name": "kafka-backup-scheduler-acc",
    "team": "team-ienw-voertuig",
    "app": "app-backup-scheduler",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 694
  },
  {
    "id": "redis-backup-scheduler-prod",
    "kind": "redis",
    "name": "redis-backup-scheduler-prod",
    "team": "team-ienw-voertuig",
    "app": "app-backup-scheduler",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 747
  },
  {
    "id": "kafka-kostenrapportage-acc",
    "kind": "kafka",
    "name": "kafka-kostenrapportage-acc",
    "team": "team-cbs-statline",
    "app": "app-kostenrapportage",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 678
  },
  {
    "id": "redis-capaciteitsplanner-dc-prod",
    "kind": "redis",
    "name": "redis-capaciteitsplanner-dc-prod",
    "team": "team-bz-consulair",
    "app": "app-capaciteitsplanner-dc",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 715
  },
  {
    "id": "postgres-capaciteitsplanner-dc-dev",
    "kind": "postgres",
    "name": "postgres-capaciteitsplanner-dc-dev",
    "team": "team-bz-consulair",
    "app": "app-capaciteitsplanner-dc",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 768
  },
  {
    "id": "postgres-energieverbruik-monitor-dev",
    "kind": "postgres",
    "name": "postgres-energieverbruik-monitor-dev",
    "team": "team-cbr-rijbewijs",
    "app": "app-energieverbruik-monitor",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 752
  },
  {
    "id": "kubernetes-energieverbruik-monitor-test",
    "kind": "kubernetes",
    "name": "kubernetes-energieverbruik-monitor-test",
    "team": "team-cbr-rijbewijs",
    "app": "app-energieverbruik-monitor",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 805,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-energieverbruik-monitor-acc",
    "kind": "kafka",
    "name": "kafka-energieverbruik-monitor-acc",
    "team": "team-cbr-rijbewijs",
    "app": "app-energieverbruik-monitor",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "costMonth": 858
  },
  {
    "id": "kubernetes-inspectierapport-generator-test",
    "kind": "kubernetes",
    "name": "kubernetes-inspectierapport-generator-test",
    "team": "team-nldd-docs",
    "app": "app-inspectierapport-generator",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-dh-c2",
    "dc": "dc-denhaag",
    "costMonth": 789,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-handhavingsdossier-acc",
    "kind": "kafka",
    "name": "kafka-handhavingsdossier-acc",
    "team": "team-rws-platform",
    "app": "app-handhavingsdossier",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 826
  },
  {
    "id": "redis-handhavingsdossier-prod",
    "kind": "redis",
    "name": "redis-handhavingsdossier-prod",
    "team": "team-rws-platform",
    "app": "app-handhavingsdossier",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-ap-b3",
    "dc": "dc-apeldoorn",
    "costMonth": 879
  },
  {
    "id": "redis-klachtenregistratie-prod",
    "kind": "redis",
    "name": "redis-klachtenregistratie-prod",
    "team": "team-rws-verkeer",
    "app": "app-klachtenregistratie",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 863
  },
  {
    "id": "postgres-klachtenregistratie-dev",
    "kind": "postgres",
    "name": "postgres-klachtenregistratie-dev",
    "team": "team-rws-verkeer",
    "app": "app-klachtenregistratie",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 916
  },
  {
    "id": "kubernetes-klachtenregistratie-test",
    "kind": "kubernetes",
    "name": "kubernetes-klachtenregistratie-test",
    "team": "team-rws-verkeer",
    "app": "app-klachtenregistratie",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "costMonth": 69,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "postgres-wob-verzoek-dev",
    "kind": "postgres",
    "name": "postgres-wob-verzoek-dev",
    "team": "team-svb-kinderbijslag",
    "app": "app-wob-verzoek",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-gr-a1",
    "dc": "dc-groningen",
    "costMonth": 900
  },
  {
    "id": "kubernetes-publicatieplatform-test",
    "kind": "kubernetes",
    "name": "kubernetes-publicatieplatform-test",
    "team": "team-rvig-brp",
    "app": "app-publicatieplatform",
    "env": "test",
    "size": "M",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 937,
    "havenCompliant": true,
    "havenCertDate": "2026-04-15"
  },
  {
    "id": "kafka-publicatieplatform-acc",
    "kind": "kafka",
    "name": "kafka-publicatieplatform-acc",
    "team": "team-rvig-brp",
    "app": "app-publicatieplatform",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-gr-b2",
    "dc": "dc-groningen",
    "costMonth": 90
  },
  {
    "id": "kafka-besluitenregister-acc",
    "kind": "kafka",
    "name": "kafka-besluitenregister-acc",
    "team": "team-fin-financieel",
    "app": "app-besluitenregister",
    "env": "acc",
    "size": "L",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 74
  },
  {
    "id": "redis-besluitenregister-prod",
    "kind": "redis",
    "name": "redis-besluitenregister-prod",
    "team": "team-fin-financieel",
    "app": "app-besluitenregister",
    "env": "prod",
    "size": "XL",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 127
  },
  {
    "id": "postgres-besluitenregister-dev",
    "kind": "postgres",
    "name": "postgres-besluitenregister-dev",
    "team": "team-fin-financieel",
    "app": "app-besluitenregister",
    "env": "dev",
    "size": "S",
    "status": "ready",
    "rack": "r-mt-a3",
    "dc": "dc-maastricht",
    "costMonth": 180
  }
];

export const apps = [
  {
    "id": "app-paspoort",
    "name": "Paspoortaanvraag",
    "team": "team-burgerzaken",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-paspoort",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-toeslagen",
    "name": "Toeslagenmotor",
    "team": "team-toeslagen",
    "type": "service",
    "stack": [
      "Rust",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-toeslagen",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-platformportaal",
    "name": "Platformportaal",
    "team": "team-platform",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD"
    ],
    "repo": "repo-platformportaal",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-datadeling",
    "name": "Datadeling-API",
    "team": "team-data",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-datadeling",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-kentekencheck",
    "name": "Kentekencheck",
    "team": "team-cbs-statline",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-kentekencheck",
    "maturity": "zilver",
    "health": "ok",
    "wet": "wegenverkeerswet"
  },
  {
    "id": "app-studiefinanciering-portaal",
    "name": "Studiefinanciering portaal",
    "team": "team-ind-data",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Java"
    ],
    "repo": "repo-studiefinanciering-portaal",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-vergunningchecker",
    "name": "Vergunningchecker",
    "team": "team-kvk-api",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-vergunningchecker",
    "maturity": "goud",
    "health": "ok",
    "wet": "omgevingswet"
  },
  {
    "id": "app-inkomenstoets",
    "name": "Inkomenstoets",
    "team": "team-nldd-iam",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-inkomenstoets",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-aangifte-omzetbelasting",
    "name": "Aangifte Omzetbelasting",
    "team": "team-koop-officielebekendmakingen",
    "type": "service",
    "stack": [
      "Java",
      "Postgres",
      "Kafka"
    ],
    "repo": "repo-aangifte-omzetbelasting",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-reisdocument-aanvraag",
    "name": "Reisdocument-aanvraag",
    "team": "team-kvk-handelsregister",
    "type": "website",
    "stack": [
      "React",
      "Go"
    ],
    "repo": "repo-reisdocument-aanvraag",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-bijstandsuitkering",
    "name": "Bijstandsuitkering",
    "team": "team-ezk-ondernemen",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-bijstandsuitkering",
    "maturity": "zilver",
    "health": "ok",
    "wet": "participatiewet"
  },
  {
    "id": "app-kadaster-viewer",
    "name": "Kadaster-viewer",
    "team": "team-def-secinfra",
    "type": "website",
    "stack": [
      "Vue",
      "Go",
      "Postgres"
    ],
    "repo": "repo-kadaster-viewer",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-subsidieportaal-rvo",
    "name": "Subsidieportaal RVO",
    "team": "team-duo-register",
    "type": "website",
    "stack": [
      "React",
      "NLDD",
      "Python"
    ],
    "repo": "repo-subsidieportaal-rvo",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-ww-aanvraag",
    "name": "WW-aanvraag",
    "team": "team-logius-docs",
    "type": "service",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-ww-aanvraag",
    "maturity": "zilver",
    "health": "warn",
    "wet": "werkloosheidswet"
  },
  {
    "id": "app-inspectieplanner-ilt",
    "name": "Inspectieplanner ILT",
    "team": "team-rvo-portaal",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-inspectieplanner-ilt",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-aow-uitkering",
    "name": "AOW-uitkering",
    "team": "team-rvo-geodata",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-aow-uitkering",
    "maturity": "goud",
    "health": "ok",
    "wet": "aow"
  },
  {
    "id": "app-kinderbijslag",
    "name": "Kinderbijslag",
    "team": "team-logius-docs",
    "type": "service",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-kinderbijslag",
    "maturity": "zilver",
    "health": "ok",
    "wet": "kinderbijslagwet"
  },
  {
    "id": "app-woz-bezwaar",
    "name": "WOZ-bezwaar",
    "team": "team-bd-platform",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Go"
    ],
    "repo": "repo-woz-bezwaar",
    "maturity": "brons",
    "health": "warn",
    "wet": "woz"
  },
  {
    "id": "app-bezwaarafhandeling",
    "name": "Bezwaarafhandeling",
    "team": "team-dictu-data",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-bezwaarafhandeling",
    "maturity": "goud",
    "health": "ok",
    "wet": "awb"
  },
  {
    "id": "app-rijbewijs-vernieuwen",
    "name": "Rijbewijs vernieuwen",
    "team": "team-bd-gegevens",
    "type": "website",
    "stack": [
      "React",
      "Go"
    ],
    "repo": "repo-rijbewijs-vernieuwen",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-naturalisatie-aanvraag",
    "name": "Naturalisatie-aanvraag",
    "team": "team-duo-studiefinanciering",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-naturalisatie-aanvraag",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-verblijfsvergunning",
    "name": "Verblijfsvergunning IND",
    "team": "team-dpc-rijksoverheid",
    "type": "service",
    "stack": [
      "Java",
      "Postgres",
      "Kafka"
    ],
    "repo": "repo-verblijfsvergunning",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-huurtoeslag-rekenen",
    "name": "Huurtoeslag rekenen",
    "team": "team-aenm-keten",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-huurtoeslag-rekenen",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-digid-koppeling",
    "name": "DigiD-koppeling",
    "team": "team-szw-regelingen",
    "type": "library",
    "stack": [
      "Go"
    ],
    "repo": "repo-digid-koppeling",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-eherkenning-broker",
    "name": "eHerkenning-broker",
    "team": "team-acm-toezicht",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-eherkenning-broker",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-bsn-validatie",
    "name": "BSN-validatie",
    "team": "team-duo-studiefinanciering",
    "type": "library",
    "stack": [
      "Rust"
    ],
    "repo": "repo-bsn-validatie",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-iban-validatie",
    "name": "IBAN-validatie",
    "team": "team-cbs-platform",
    "type": "library",
    "stack": [
      "Go"
    ],
    "repo": "repo-iban-validatie",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-adrescheck-bag",
    "name": "Adrescheck BAG",
    "team": "team-svb-kinderbijslag",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-adrescheck-bag",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-brp-bevraging",
    "name": "BRP-bevraging",
    "team": "team-rvo-portaal",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-brp-bevraging",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-handelsregister-zoeker",
    "name": "Handelsregister-zoeker",
    "team": "team-az-comms",
    "type": "website",
    "stack": [
      "Vue",
      "Go"
    ],
    "repo": "repo-handelsregister-zoeker",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-incasso-cjib",
    "name": "Incasso CJIB",
    "team": "team-duo-studiefinanciering",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-incasso-cjib",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-boete-bezwaar",
    "name": "Boetebezwaar",
    "team": "team-szw-regelingen",
    "type": "website",
    "stack": [
      "React",
      "NLDD",
      "Go"
    ],
    "repo": "repo-boete-bezwaar",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-belastingaangifte-ib",
    "name": "Belastingaangifte IB",
    "team": "team-uwv-gegevens",
    "type": "service",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-belastingaangifte-ib",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-loonheffing",
    "name": "Loonheffing",
    "team": "team-bd-gegevens",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-loonheffing",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-zorgtoeslag-portaal",
    "name": "Zorgtoeslag portaal",
    "team": "team-cbr-rijbewijs",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Java"
    ],
    "repo": "repo-zorgtoeslag-portaal",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-pgb-beheer",
    "name": "PGB-beheer",
    "team": "team-acm-toezicht",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-pgb-beheer",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-zorgverzekeraar-koppeling",
    "name": "Zorgverzekeraar-koppeling",
    "team": "team-ezk-ondernemen",
    "type": "service",
    "stack": [
      "Go",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-zorgverzekeraar-koppeling",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-vaccinatieregister",
    "name": "Vaccinatieregister",
    "team": "team-vws-zorgregister",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-vaccinatieregister",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-jeugdzorg-dossier",
    "name": "Jeugdzorg-dossier",
    "team": "team-jenv-keten",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-jeugdzorg-dossier",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-onderwijsregistratie",
    "name": "Onderwijsregistratie DUO",
    "team": "team-acm-toezicht",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-onderwijsregistratie",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-diplomaregister",
    "name": "Diplomaregister",
    "team": "team-bd-fraude",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-diplomaregister",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-leerplicht-melding",
    "name": "Leerplicht-melding",
    "team": "team-logius-stelsel",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-leerplicht-melding",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-studielening-rekentool",
    "name": "Studielening-rekentool",
    "team": "team-uwv-arbeidsmarkt",
    "type": "website",
    "stack": [
      "React",
      "NLDD"
    ],
    "repo": "repo-studielening-rekentool",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-omgevingsloket",
    "name": "Omgevingsloket",
    "team": "team-koop-wetten",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Java"
    ],
    "repo": "repo-omgevingsloket",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-bouwvergunning",
    "name": "Bouwvergunning",
    "team": "team-dictu-data",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-bouwvergunning",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-milieumelding",
    "name": "Milieumelding",
    "team": "team-ind-data",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-milieumelding",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-waterschapsheffing",
    "name": "Waterschapsheffing",
    "team": "team-fin-platform",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-waterschapsheffing",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-verkeersboete-viewer",
    "name": "Verkeersboete-viewer",
    "team": "team-logius-digid",
    "type": "website",
    "stack": [
      "Vue",
      "Go"
    ],
    "repo": "repo-verkeersboete-viewer",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-parkeervergunning",
    "name": "Parkeervergunning",
    "team": "team-kgg-energie",
    "type": "website",
    "stack": [
      "React",
      "Go"
    ],
    "repo": "repo-parkeervergunning",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-rijksbegroting-explorer",
    "name": "Rijksbegroting-explorer",
    "team": "team-ienw-kenteken",
    "type": "website",
    "stack": [
      "Vue",
      "Python"
    ],
    "repo": "repo-rijksbegroting-explorer",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-open-data-portaal",
    "name": "Open Data Portaal",
    "team": "team-rvo-portaal",
    "type": "website",
    "stack": [
      "React",
      "Python",
      "Postgres"
    ],
    "repo": "repo-open-data-portaal",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-statistiek-dashboard-cbs",
    "name": "Statistiek-dashboard CBS",
    "team": "team-cjib-inning",
    "type": "website",
    "stack": [
      "Vue",
      "Python"
    ],
    "repo": "repo-statistiek-dashboard-cbs",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-etl-basisregisters",
    "name": "ETL Basisregisters",
    "team": "team-ienw-voertuig",
    "type": "job",
    "stack": [
      "Python",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-etl-basisregisters",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-datakwaliteit-monitor",
    "name": "Datakwaliteit-monitor",
    "team": "team-rvig-iam",
    "type": "job",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-datakwaliteit-monitor",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-anonimisering-pipeline",
    "name": "Anonimisering-pipeline",
    "team": "team-ind-data",
    "type": "job",
    "stack": [
      "Rust",
      "Kafka"
    ],
    "repo": "repo-anonimisering-pipeline",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-archief-export",
    "name": "Archief-export",
    "team": "team-jenv-keten",
    "type": "job",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-archief-export",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-nachtelijke-batchrun",
    "name": "Nachtelijke batchrun toeslagen",
    "team": "team-cbs-microdata",
    "type": "job",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-nachtelijke-batchrun",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-betaalbatch-generator",
    "name": "Betaalbatch-generator",
    "team": "team-dictu-hosting",
    "type": "job",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-betaalbatch-generator",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-sepa-incasso-job",
    "name": "SEPA-incasso job",
    "team": "team-cbr-rijbewijs",
    "type": "job",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-sepa-incasso-job",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-fraudedetectie",
    "name": "Fraudedetectie",
    "team": "team-ienw-data",
    "type": "service",
    "stack": [
      "Python",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-fraudedetectie",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-risicoscoring",
    "name": "Risicoscoring",
    "team": "team-rvig-brp",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-risicoscoring",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-sanctielijst-check",
    "name": "Sanctielijst-check",
    "team": "team-ienw-voertuig",
    "type": "library",
    "stack": [
      "Go"
    ],
    "repo": "repo-sanctielijst-check",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-pki-certificaatbeheer",
    "name": "PKI-certificaatbeheer",
    "team": "team-rws-sensoren",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-pki-certificaatbeheer",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-secretsmanager",
    "name": "Secretsmanager",
    "team": "team-duo-examens",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-secretsmanager",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-audit-logboek",
    "name": "Audit-logboek",
    "team": "team-cbs-statline",
    "type": "service",
    "stack": [
      "Go",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-audit-logboek",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-toegangsbeheer",
    "name": "Toegangsbeheer",
    "team": "team-svb-platform",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-toegangsbeheer",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-oidc-provider",
    "name": "OIDC-provider",
    "team": "team-cjib-inning",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-oidc-provider",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-rollenmatrix",
    "name": "Rollenmatrix",
    "team": "team-ind-data",
    "type": "library",
    "stack": [
      "Go"
    ],
    "repo": "repo-rollenmatrix",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-servicedesk-portaal",
    "name": "Servicedesk-portaal",
    "team": "team-jio-security",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Java"
    ],
    "repo": "repo-servicedesk-portaal",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-statuspagina",
    "name": "Statuspagina",
    "team": "team-duo-register",
    "type": "website",
    "stack": [
      "React",
      "Go"
    ],
    "repo": "repo-statuspagina",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-monitoring-collector",
    "name": "Monitoring-collector",
    "team": "team-nza-zorgdata",
    "type": "service",
    "stack": [
      "Go",
      "Kafka"
    ],
    "repo": "repo-monitoring-collector",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-logaggregatie",
    "name": "Logaggregatie",
    "team": "team-rvo-portaal",
    "type": "service",
    "stack": [
      "Go",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-logaggregatie",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-deploy-orchestrator",
    "name": "Deploy-orchestrator",
    "team": "team-uwv-uitkeringen",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-deploy-orchestrator",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-ci-runnerpool",
    "name": "CI-runnerpool",
    "team": "team-ocw-cultuurdata",
    "type": "service",
    "stack": [
      "Go"
    ],
    "repo": "repo-ci-runnerpool",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-feature-flags",
    "name": "Feature-flags",
    "team": "team-cbs-microdata",
    "type": "library",
    "stack": [
      "Go"
    ],
    "repo": "repo-feature-flags",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-config-store",
    "name": "Config-store",
    "team": "team-cbs-platform",
    "type": "service",
    "stack": [
      "Rust",
      "Postgres"
    ],
    "repo": "repo-config-store",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-nldd-componenten",
    "name": "NL Design System-componenten",
    "team": "team-dhc-geschillen",
    "type": "library",
    "stack": [
      "React",
      "NLDD"
    ],
    "repo": "repo-nldd-componenten",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-huisstijl-bibliotheek",
    "name": "Huisstijl-bibliotheek",
    "team": "team-rws-inspectie",
    "type": "library",
    "stack": [
      "Vue",
      "NLDD"
    ],
    "repo": "repo-huisstijl-bibliotheek",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-documentatiesite",
    "name": "Documentatiesite",
    "team": "team-cjib-data",
    "type": "website",
    "stack": [
      "React"
    ],
    "repo": "repo-documentatiesite",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-api-catalogus",
    "name": "API-catalogus",
    "team": "team-rvig-brp",
    "type": "website",
    "stack": [
      "Vue",
      "Go"
    ],
    "repo": "repo-api-catalogus",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-standaarden-checker",
    "name": "Standaarden-checker",
    "team": "team-justid-documentatie",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-standaarden-checker",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-toegankelijkheid-scanner",
    "name": "Toegankelijkheid-scanner",
    "team": "team-dpc-rijksoverheid",
    "type": "job",
    "stack": [
      "Python"
    ],
    "repo": "repo-toegankelijkheid-scanner",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-pdf-generator",
    "name": "PDF-generator",
    "team": "team-rws-sensoren",
    "type": "library",
    "stack": [
      "Rust"
    ],
    "repo": "repo-pdf-generator",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-brief-generator",
    "name": "Brief-generator",
    "team": "team-rvo-geodata",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-brief-generator",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-berichtenbox",
    "name": "Berichtenbox",
    "team": "team-cbs-platform",
    "type": "service",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-berichtenbox",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-mijnoverheid-portaal",
    "name": "MijnOverheid-portaal",
    "team": "team-bd-inning",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Java"
    ],
    "repo": "repo-mijnoverheid-portaal",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-formulierenbouwer",
    "name": "Formulierenbouwer",
    "team": "team-ind-dossiers",
    "type": "website",
    "stack": [
      "React",
      "NLDD",
      "Go"
    ],
    "repo": "repo-formulierenbouwer",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-vragenlijst-engine",
    "name": "Vragenlijst-engine",
    "team": "team-nza-zorgdata",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-vragenlijst-engine",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-afspraakplanner",
    "name": "Afspraakplanner",
    "team": "team-ksa-handhaving",
    "type": "website",
    "stack": [
      "Vue",
      "Go",
      "Postgres"
    ],
    "repo": "repo-afspraakplanner",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-wachtrij-manager",
    "name": "Wachtrij-manager",
    "team": "team-jio-keten",
    "type": "service",
    "stack": [
      "Go",
      "Kafka"
    ],
    "repo": "repo-wachtrij-manager",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-notificatieservice",
    "name": "Notificatieservice",
    "team": "team-dictu-werkplek",
    "type": "service",
    "stack": [
      "Go",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-notificatieservice",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-sms-gateway",
    "name": "SMS-gateway",
    "team": "team-svb-gegevens",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-sms-gateway",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-betaalverzoek",
    "name": "Betaalverzoek",
    "team": "team-rws-platform",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-betaalverzoek",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-ideal-koppeling",
    "name": "iDEAL-koppeling",
    "team": "team-ind-iam",
    "type": "library",
    "stack": [
      "Go"
    ],
    "repo": "repo-ideal-koppeling",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-machtigingenregister",
    "name": "Machtigingenregister",
    "team": "team-ocw-cultuurdata",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-machtigingenregister",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-gegevensmakelaar",
    "name": "Gegevensmakelaar",
    "team": "team-ind-dossiers",
    "type": "service",
    "stack": [
      "Rust",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-gegevensmakelaar",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-stelselcatalogus",
    "name": "Stelselcatalogus",
    "team": "team-cbs-statline",
    "type": "website",
    "stack": [
      "Vue",
      "Postgres"
    ],
    "repo": "repo-stelselcatalogus",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-terugmeldvoorziening",
    "name": "Terugmeldvoorziening",
    "team": "team-bd-platform",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-terugmeldvoorziening",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-digikoppeling-adapter",
    "name": "Digikoppeling-adapter",
    "team": "team-kgg-energie",
    "type": "library",
    "stack": [
      "Java"
    ],
    "repo": "repo-digikoppeling-adapter",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-fsc-inway",
    "name": "FSC-inway",
    "team": "team-dpc-content",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-fsc-inway",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-cloudevents-broker",
    "name": "CloudEvents-broker",
    "team": "team-jio-security",
    "type": "service",
    "stack": [
      "Go",
      "Kafka"
    ],
    "repo": "repo-cloudevents-broker",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-subsidie-aanvraag",
    "name": "Subsidie-aanvraag",
    "team": "team-rvo-subsidies",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Python"
    ],
    "repo": "repo-subsidie-aanvraag",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-aanbestedingsportaal",
    "name": "Aanbestedingsportaal",
    "team": "team-vws-data",
    "type": "website",
    "stack": [
      "React",
      "Java"
    ],
    "repo": "repo-aanbestedingsportaal",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-inkooporder-verwerking",
    "name": "Inkooporder-verwerking",
    "team": "team-ind-iam",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-inkooporder-verwerking",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-factuurverwerking",
    "name": "Factuurverwerking",
    "team": "team-rws-verkeer",
    "type": "service",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-factuurverwerking",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-personeelsdossier",
    "name": "Personeelsdossier",
    "team": "team-cjib-inning",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-personeelsdossier",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-verlofaanvraag",
    "name": "Verlofaanvraag",
    "team": "team-nza-zorgdata",
    "type": "website",
    "stack": [
      "Vue",
      "Go"
    ],
    "repo": "repo-verlofaanvraag",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-declaratie-indienen",
    "name": "Declaratie indienen",
    "team": "team-dictu-werkplek",
    "type": "website",
    "stack": [
      "React",
      "Go",
      "Postgres"
    ],
    "repo": "repo-declaratie-indienen",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-rooster-uitvoering",
    "name": "Rooster uitvoering",
    "team": "team-bd-inning",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-rooster-uitvoering",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-zaaksysteem",
    "name": "Zaaksysteem",
    "team": "team-jio-platform",
    "type": "service",
    "stack": [
      "Java",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-zaaksysteem",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-documentmanagement",
    "name": "Documentmanagement",
    "team": "team-duo-platform",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-documentmanagement",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-handtekening-validatie",
    "name": "Handtekening-validatie",
    "team": "team-logius-docs",
    "type": "library",
    "stack": [
      "Rust"
    ],
    "repo": "repo-handtekening-validatie",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-virusscanner-gateway",
    "name": "Virusscanner-gateway",
    "team": "team-ind-dossiers",
    "type": "service",
    "stack": [
      "Go"
    ],
    "repo": "repo-virusscanner-gateway",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-backup-scheduler",
    "name": "Backup-scheduler",
    "team": "team-ienw-voertuig",
    "type": "job",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-backup-scheduler",
    "maturity": "brons",
    "health": "warn"
  },
  {
    "id": "app-kostenrapportage",
    "name": "Kostenrapportage",
    "team": "team-cbs-statline",
    "type": "job",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-kostenrapportage",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-capaciteitsplanner-dc",
    "name": "Capaciteitsplanner DC",
    "team": "team-bz-consulair",
    "type": "website",
    "stack": [
      "Vue",
      "Go",
      "Postgres"
    ],
    "repo": "repo-capaciteitsplanner-dc",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-energieverbruik-monitor",
    "name": "Energieverbruik-monitor",
    "team": "team-cbr-rijbewijs",
    "type": "service",
    "stack": [
      "Go",
      "Kafka",
      "Postgres"
    ],
    "repo": "repo-energieverbruik-monitor",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-inspectierapport-generator",
    "name": "Inspectierapport-generator",
    "team": "team-nldd-docs",
    "type": "service",
    "stack": [
      "Python",
      "Postgres"
    ],
    "repo": "repo-inspectierapport-generator",
    "maturity": "goud",
    "health": "warn"
  },
  {
    "id": "app-handhavingsdossier",
    "name": "Handhavingsdossier",
    "team": "team-rws-platform",
    "type": "service",
    "stack": [
      "Java",
      "Postgres"
    ],
    "repo": "repo-handhavingsdossier",
    "maturity": "zilver",
    "health": "ok"
  },
  {
    "id": "app-klachtenregistratie",
    "name": "Klachtenregistratie",
    "team": "team-rws-verkeer",
    "type": "website",
    "stack": [
      "Vue",
      "NLDD",
      "Go"
    ],
    "repo": "repo-klachtenregistratie",
    "maturity": "brons",
    "health": "ok"
  },
  {
    "id": "app-wob-verzoek",
    "name": "Woo-verzoek",
    "team": "team-svb-kinderbijslag",
    "type": "website",
    "stack": [
      "React",
      "NLDD",
      "Python"
    ],
    "repo": "repo-wob-verzoek",
    "maturity": "goud",
    "health": "ok"
  },
  {
    "id": "app-publicatieplatform",
    "name": "Publicatieplatform",
    "team": "team-rvig-brp",
    "type": "website",
    "stack": [
      "Vue",
      "Python",
      "Postgres"
    ],
    "repo": "repo-publicatieplatform",
    "maturity": "zilver",
    "health": "warn"
  },
  {
    "id": "app-besluitenregister",
    "name": "Besluitenregister",
    "team": "team-fin-financieel",
    "type": "service",
    "stack": [
      "Go",
      "Postgres"
    ],
    "repo": "repo-besluitenregister",
    "maturity": "brons",
    "health": "ok"
  }
];

export const templates = [
  {
    "id": "tpl-vue-nldd",
    "name": "Vue + NLDD frontend",
    "desc": "SPA met design system, router, CI, a11y-checks",
    "provides": [
      "Vite",
      "NLDD",
      "vitest",
      "pa11y"
    ]
  },
  {
    "id": "tpl-rust-api",
    "name": "Rust API",
    "desc": "Axum service met OpenAPI, migrations, BDD",
    "provides": [
      "axum",
      "sqlx",
      "cucumber"
    ]
  },
  {
    "id": "tpl-python-job",
    "name": "Python data-job",
    "desc": "uv-managed batch job met scheduling",
    "provides": [
      "uv",
      "ruff",
      "pytest"
    ]
  },
  {
    "id": "tpl-astro-docs",
    "name": "Astro docs-site",
    "desc": "Documentatiesite met NLDD + Pagefind",
    "provides": [
      "Astro",
      "NLDD",
      "Pagefind"
    ]
  }
];

export const repos = [
  {
    "id": "repo-platform-config",
    "name": "nldd/platform-config",
    "visibility": "open",
    "lang": "HCL",
    "stars": 47,
    "openPrs": 3,
    "openIssues": 1,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": null
  },
  {
    "id": "repo-paspoort",
    "name": "minbzk/paspoort",
    "visibility": "intern",
    "lang": "Rust",
    "stars": 12,
    "openPrs": 2,
    "openIssues": 5,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-paspoort"
  },
  {
    "id": "repo-toeslagen",
    "name": "minbzk/toeslagenmotor",
    "visibility": "open",
    "lang": "Rust",
    "stars": 84,
    "openPrs": 6,
    "openIssues": 14,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-toeslagen"
  },
  {
    "id": "repo-platformportaal",
    "name": "nldd/platformportaal",
    "visibility": "open",
    "lang": "Vue",
    "stars": 41,
    "openPrs": 3,
    "openIssues": 7,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-platformportaal"
  },
  {
    "id": "repo-datadeling",
    "name": "logius/datadeling-api",
    "visibility": "open",
    "lang": "Python",
    "stars": 23,
    "openPrs": 1,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-datadeling"
  },
  {
    "id": "repo-stuc",
    "name": "nldd/stuc",
    "visibility": "open",
    "lang": "Python",
    "stars": 67,
    "openPrs": 0,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": null
  },
  {
    "id": "repo-kentekencheck",
    "name": "nldd/kentekencheck",
    "visibility": "intern",
    "lang": "Go",
    "stars": 28,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-kentekencheck"
  },
  {
    "id": "repo-studiefinanciering-portaal",
    "name": "nldd/studiefinanciering-portaal",
    "visibility": "open",
    "lang": "Vue",
    "stars": 35,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-studiefinanciering-portaal"
  },
  {
    "id": "repo-vergunningchecker",
    "name": "nldd/vergunningchecker",
    "visibility": "open",
    "lang": "Python",
    "stars": 42,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-vergunningchecker"
  },
  {
    "id": "repo-inkomenstoets",
    "name": "nldd/inkomenstoets",
    "visibility": "open",
    "lang": "Rust",
    "stars": 49,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-inkomenstoets"
  },
  {
    "id": "repo-aangifte-omzetbelasting",
    "name": "logius/aangifte-omzetbelasting",
    "visibility": "intern",
    "lang": "Java",
    "stars": 56,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-aangifte-omzetbelasting"
  },
  {
    "id": "repo-reisdocument-aanvraag",
    "name": "nldd/reisdocument-aanvraag",
    "visibility": "open",
    "lang": "React",
    "stars": 63,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-reisdocument-aanvraag"
  },
  {
    "id": "repo-bijstandsuitkering",
    "name": "nldd/bijstandsuitkering",
    "visibility": "open",
    "lang": "Java",
    "stars": 70,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-bijstandsuitkering"
  },
  {
    "id": "repo-kadaster-viewer",
    "name": "nldd/kadaster-viewer",
    "visibility": "open",
    "lang": "Vue",
    "stars": 77,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-kadaster-viewer"
  },
  {
    "id": "repo-subsidieportaal-rvo",
    "name": "nldd/subsidieportaal-rvo",
    "visibility": "intern",
    "lang": "React",
    "stars": 84,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-subsidieportaal-rvo"
  },
  {
    "id": "repo-ww-aanvraag",
    "name": "logius/ww-aanvraag",
    "visibility": "open",
    "lang": "Java",
    "stars": 1,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-ww-aanvraag"
  },
  {
    "id": "repo-inspectieplanner-ilt",
    "name": "nldd/inspectieplanner-ilt",
    "visibility": "open",
    "lang": "Python",
    "stars": 8,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-inspectieplanner-ilt"
  },
  {
    "id": "repo-aow-uitkering",
    "name": "nldd/aow-uitkering",
    "visibility": "open",
    "lang": "Java",
    "stars": 15,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-aow-uitkering"
  },
  {
    "id": "repo-kinderbijslag",
    "name": "logius/kinderbijslag",
    "visibility": "intern",
    "lang": "Java",
    "stars": 22,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-kinderbijslag"
  },
  {
    "id": "repo-woz-bezwaar",
    "name": "nldd/woz-bezwaar",
    "visibility": "open",
    "lang": "Vue",
    "stars": 29,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-woz-bezwaar"
  },
  {
    "id": "repo-bezwaarafhandeling",
    "name": "dictu/bezwaarafhandeling",
    "visibility": "open",
    "lang": "Python",
    "stars": 36,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-bezwaarafhandeling"
  },
  {
    "id": "repo-rijbewijs-vernieuwen",
    "name": "nldd/rijbewijs-vernieuwen",
    "visibility": "open",
    "lang": "React",
    "stars": 43,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-rijbewijs-vernieuwen"
  },
  {
    "id": "repo-naturalisatie-aanvraag",
    "name": "nldd/naturalisatie-aanvraag",
    "visibility": "intern",
    "lang": "Rust",
    "stars": 50,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-naturalisatie-aanvraag"
  },
  {
    "id": "repo-verblijfsvergunning",
    "name": "nldd/verblijfsvergunning",
    "visibility": "open",
    "lang": "Java",
    "stars": 57,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-verblijfsvergunning"
  },
  {
    "id": "repo-huurtoeslag-rekenen",
    "name": "nldd/huurtoeslag-rekenen",
    "visibility": "open",
    "lang": "Rust",
    "stars": 64,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-huurtoeslag-rekenen"
  },
  {
    "id": "repo-digid-koppeling",
    "name": "nldd/digid-koppeling",
    "visibility": "open",
    "lang": "Go",
    "stars": 71,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-digid-koppeling"
  },
  {
    "id": "repo-eherkenning-broker",
    "name": "nldd/eherkenning-broker",
    "visibility": "intern",
    "lang": "Go",
    "stars": 78,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-eherkenning-broker"
  },
  {
    "id": "repo-bsn-validatie",
    "name": "nldd/bsn-validatie",
    "visibility": "open",
    "lang": "Rust",
    "stars": 85,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-bsn-validatie"
  },
  {
    "id": "repo-iban-validatie",
    "name": "nldd/iban-validatie",
    "visibility": "open",
    "lang": "Go",
    "stars": 2,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-iban-validatie"
  },
  {
    "id": "repo-adrescheck-bag",
    "name": "nldd/adrescheck-bag",
    "visibility": "open",
    "lang": "Go",
    "stars": 9,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-adrescheck-bag"
  },
  {
    "id": "repo-brp-bevraging",
    "name": "nldd/brp-bevraging",
    "visibility": "intern",
    "lang": "Rust",
    "stars": 16,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-brp-bevraging"
  },
  {
    "id": "repo-handelsregister-zoeker",
    "name": "nldd/handelsregister-zoeker",
    "visibility": "open",
    "lang": "Vue",
    "stars": 23,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-handelsregister-zoeker"
  },
  {
    "id": "repo-incasso-cjib",
    "name": "nldd/incasso-cjib",
    "visibility": "open",
    "lang": "Java",
    "stars": 30,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-incasso-cjib"
  },
  {
    "id": "repo-boete-bezwaar",
    "name": "nldd/boete-bezwaar",
    "visibility": "open",
    "lang": "React",
    "stars": 37,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-boete-bezwaar"
  },
  {
    "id": "repo-belastingaangifte-ib",
    "name": "nldd/belastingaangifte-ib",
    "visibility": "intern",
    "lang": "Java",
    "stars": 44,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-belastingaangifte-ib"
  },
  {
    "id": "repo-loonheffing",
    "name": "nldd/loonheffing",
    "visibility": "open",
    "lang": "Java",
    "stars": 51,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-loonheffing"
  },
  {
    "id": "repo-zorgtoeslag-portaal",
    "name": "nldd/zorgtoeslag-portaal",
    "visibility": "open",
    "lang": "Vue",
    "stars": 58,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-zorgtoeslag-portaal"
  },
  {
    "id": "repo-pgb-beheer",
    "name": "nldd/pgb-beheer",
    "visibility": "open",
    "lang": "Python",
    "stars": 65,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-pgb-beheer"
  },
  {
    "id": "repo-zorgverzekeraar-koppeling",
    "name": "nldd/zorgverzekeraar-koppeling",
    "visibility": "intern",
    "lang": "Go",
    "stars": 72,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-zorgverzekeraar-koppeling"
  },
  {
    "id": "repo-vaccinatieregister",
    "name": "nldd/vaccinatieregister",
    "visibility": "open",
    "lang": "Rust",
    "stars": 79,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-vaccinatieregister"
  },
  {
    "id": "repo-jeugdzorg-dossier",
    "name": "nldd/jeugdzorg-dossier",
    "visibility": "open",
    "lang": "Python",
    "stars": 86,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-jeugdzorg-dossier"
  },
  {
    "id": "repo-onderwijsregistratie",
    "name": "nldd/onderwijsregistratie",
    "visibility": "open",
    "lang": "Java",
    "stars": 3,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-onderwijsregistratie"
  },
  {
    "id": "repo-diplomaregister",
    "name": "nldd/diplomaregister",
    "visibility": "intern",
    "lang": "Go",
    "stars": 10,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-diplomaregister"
  },
  {
    "id": "repo-leerplicht-melding",
    "name": "logius/leerplicht-melding",
    "visibility": "open",
    "lang": "Python",
    "stars": 17,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-leerplicht-melding"
  },
  {
    "id": "repo-studielening-rekentool",
    "name": "nldd/studielening-rekentool",
    "visibility": "open",
    "lang": "React",
    "stars": 24,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-studielening-rekentool"
  },
  {
    "id": "repo-omgevingsloket",
    "name": "logius/omgevingsloket",
    "visibility": "open",
    "lang": "Vue",
    "stars": 31,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-omgevingsloket"
  },
  {
    "id": "repo-bouwvergunning",
    "name": "dictu/bouwvergunning",
    "visibility": "intern",
    "lang": "Java",
    "stars": 38,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-bouwvergunning"
  },
  {
    "id": "repo-milieumelding",
    "name": "nldd/milieumelding",
    "visibility": "open",
    "lang": "Python",
    "stars": 45,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-milieumelding"
  },
  {
    "id": "repo-waterschapsheffing",
    "name": "nldd/waterschapsheffing",
    "visibility": "open",
    "lang": "Java",
    "stars": 52,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-waterschapsheffing"
  },
  {
    "id": "repo-verkeersboete-viewer",
    "name": "logius/verkeersboete-viewer",
    "visibility": "open",
    "lang": "Vue",
    "stars": 59,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-verkeersboete-viewer"
  },
  {
    "id": "repo-parkeervergunning",
    "name": "nldd/parkeervergunning",
    "visibility": "intern",
    "lang": "React",
    "stars": 66,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-parkeervergunning"
  },
  {
    "id": "repo-rijksbegroting-explorer",
    "name": "nldd/rijksbegroting-explorer",
    "visibility": "open",
    "lang": "Vue",
    "stars": 73,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-rijksbegroting-explorer"
  },
  {
    "id": "repo-open-data-portaal",
    "name": "nldd/open-data-portaal",
    "visibility": "open",
    "lang": "React",
    "stars": 80,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-open-data-portaal"
  },
  {
    "id": "repo-statistiek-dashboard-cbs",
    "name": "nldd/statistiek-dashboard-cbs",
    "visibility": "open",
    "lang": "Vue",
    "stars": 87,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-statistiek-dashboard-cbs"
  },
  {
    "id": "repo-etl-basisregisters",
    "name": "nldd/etl-basisregisters",
    "visibility": "intern",
    "lang": "Python",
    "stars": 4,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-etl-basisregisters"
  },
  {
    "id": "repo-datakwaliteit-monitor",
    "name": "rvig/datakwaliteit-monitor",
    "visibility": "open",
    "lang": "Python",
    "stars": 11,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-datakwaliteit-monitor"
  },
  {
    "id": "repo-anonimisering-pipeline",
    "name": "nldd/anonimisering-pipeline",
    "visibility": "open",
    "lang": "Rust",
    "stars": 18,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-anonimisering-pipeline"
  },
  {
    "id": "repo-archief-export",
    "name": "nldd/archief-export",
    "visibility": "open",
    "lang": "Go",
    "stars": 25,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-archief-export"
  },
  {
    "id": "repo-nachtelijke-batchrun",
    "name": "nldd/nachtelijke-batchrun",
    "visibility": "intern",
    "lang": "Java",
    "stars": 32,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-nachtelijke-batchrun"
  },
  {
    "id": "repo-betaalbatch-generator",
    "name": "dictu/betaalbatch-generator",
    "visibility": "open",
    "lang": "Java",
    "stars": 39,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-betaalbatch-generator"
  },
  {
    "id": "repo-sepa-incasso-job",
    "name": "nldd/sepa-incasso-job",
    "visibility": "open",
    "lang": "Go",
    "stars": 46,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-sepa-incasso-job"
  },
  {
    "id": "repo-fraudedetectie",
    "name": "nldd/fraudedetectie",
    "visibility": "open",
    "lang": "Python",
    "stars": 53,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-fraudedetectie"
  },
  {
    "id": "repo-risicoscoring",
    "name": "rvig/risicoscoring",
    "visibility": "intern",
    "lang": "Python",
    "stars": 60,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-risicoscoring"
  },
  {
    "id": "repo-sanctielijst-check",
    "name": "nldd/sanctielijst-check",
    "visibility": "open",
    "lang": "Go",
    "stars": 67,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-sanctielijst-check"
  },
  {
    "id": "repo-pki-certificaatbeheer",
    "name": "nldd/pki-certificaatbeheer",
    "visibility": "open",
    "lang": "Go",
    "stars": 74,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-pki-certificaatbeheer"
  },
  {
    "id": "repo-secretsmanager",
    "name": "nldd/secretsmanager",
    "visibility": "open",
    "lang": "Rust",
    "stars": 81,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-secretsmanager"
  },
  {
    "id": "repo-audit-logboek",
    "name": "nldd/audit-logboek",
    "visibility": "intern",
    "lang": "Go",
    "stars": 88,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-audit-logboek"
  },
  {
    "id": "repo-toegangsbeheer",
    "name": "nldd/toegangsbeheer",
    "visibility": "open",
    "lang": "Go",
    "stars": 5,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-toegangsbeheer"
  },
  {
    "id": "repo-oidc-provider",
    "name": "nldd/oidc-provider",
    "visibility": "open",
    "lang": "Go",
    "stars": 12,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-oidc-provider"
  },
  {
    "id": "repo-rollenmatrix",
    "name": "nldd/rollenmatrix",
    "visibility": "open",
    "lang": "Go",
    "stars": 19,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-rollenmatrix"
  },
  {
    "id": "repo-servicedesk-portaal",
    "name": "nldd/servicedesk-portaal",
    "visibility": "intern",
    "lang": "Vue",
    "stars": 26,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-servicedesk-portaal"
  },
  {
    "id": "repo-statuspagina",
    "name": "nldd/statuspagina",
    "visibility": "open",
    "lang": "React",
    "stars": 33,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-statuspagina"
  },
  {
    "id": "repo-monitoring-collector",
    "name": "nldd/monitoring-collector",
    "visibility": "open",
    "lang": "Go",
    "stars": 40,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-monitoring-collector"
  },
  {
    "id": "repo-logaggregatie",
    "name": "nldd/logaggregatie",
    "visibility": "open",
    "lang": "Go",
    "stars": 47,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-logaggregatie"
  },
  {
    "id": "repo-deploy-orchestrator",
    "name": "nldd/deploy-orchestrator",
    "visibility": "intern",
    "lang": "Go",
    "stars": 54,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-deploy-orchestrator"
  },
  {
    "id": "repo-ci-runnerpool",
    "name": "nldd/ci-runnerpool",
    "visibility": "open",
    "lang": "Go",
    "stars": 61,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-ci-runnerpool"
  },
  {
    "id": "repo-feature-flags",
    "name": "nldd/feature-flags",
    "visibility": "open",
    "lang": "Go",
    "stars": 68,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-feature-flags"
  },
  {
    "id": "repo-config-store",
    "name": "nldd/config-store",
    "visibility": "open",
    "lang": "Rust",
    "stars": 75,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-config-store"
  },
  {
    "id": "repo-nldd-componenten",
    "name": "nldd/nldd-componenten",
    "visibility": "intern",
    "lang": "React",
    "stars": 82,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-nldd-componenten"
  },
  {
    "id": "repo-huisstijl-bibliotheek",
    "name": "nldd/huisstijl-bibliotheek",
    "visibility": "open",
    "lang": "Vue",
    "stars": 89,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-huisstijl-bibliotheek"
  },
  {
    "id": "repo-documentatiesite",
    "name": "nldd/documentatiesite",
    "visibility": "open",
    "lang": "React",
    "stars": 6,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-documentatiesite"
  },
  {
    "id": "repo-api-catalogus",
    "name": "rvig/api-catalogus",
    "visibility": "open",
    "lang": "Vue",
    "stars": 13,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-api-catalogus"
  },
  {
    "id": "repo-standaarden-checker",
    "name": "nldd/standaarden-checker",
    "visibility": "intern",
    "lang": "Python",
    "stars": 20,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-standaarden-checker"
  },
  {
    "id": "repo-toegankelijkheid-scanner",
    "name": "nldd/toegankelijkheid-scanner",
    "visibility": "open",
    "lang": "Python",
    "stars": 27,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-toegankelijkheid-scanner"
  },
  {
    "id": "repo-pdf-generator",
    "name": "nldd/pdf-generator",
    "visibility": "open",
    "lang": "Rust",
    "stars": 34,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-pdf-generator"
  },
  {
    "id": "repo-brief-generator",
    "name": "nldd/brief-generator",
    "visibility": "open",
    "lang": "Java",
    "stars": 41,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-brief-generator"
  },
  {
    "id": "repo-berichtenbox",
    "name": "nldd/berichtenbox",
    "visibility": "intern",
    "lang": "Java",
    "stars": 48,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-berichtenbox"
  },
  {
    "id": "repo-mijnoverheid-portaal",
    "name": "nldd/mijnoverheid-portaal",
    "visibility": "open",
    "lang": "Vue",
    "stars": 55,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-mijnoverheid-portaal"
  },
  {
    "id": "repo-formulierenbouwer",
    "name": "nldd/formulierenbouwer",
    "visibility": "open",
    "lang": "React",
    "stars": 62,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-formulierenbouwer"
  },
  {
    "id": "repo-vragenlijst-engine",
    "name": "nldd/vragenlijst-engine",
    "visibility": "open",
    "lang": "Go",
    "stars": 69,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-vragenlijst-engine"
  },
  {
    "id": "repo-afspraakplanner",
    "name": "nldd/afspraakplanner",
    "visibility": "intern",
    "lang": "Vue",
    "stars": 76,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-afspraakplanner"
  },
  {
    "id": "repo-wachtrij-manager",
    "name": "nldd/wachtrij-manager",
    "visibility": "open",
    "lang": "Go",
    "stars": 83,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-wachtrij-manager"
  },
  {
    "id": "repo-notificatieservice",
    "name": "dictu/notificatieservice",
    "visibility": "open",
    "lang": "Go",
    "stars": 0,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-notificatieservice"
  },
  {
    "id": "repo-sms-gateway",
    "name": "nldd/sms-gateway",
    "visibility": "open",
    "lang": "Go",
    "stars": 7,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-sms-gateway"
  },
  {
    "id": "repo-betaalverzoek",
    "name": "nldd/betaalverzoek",
    "visibility": "intern",
    "lang": "Java",
    "stars": 14,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-betaalverzoek"
  },
  {
    "id": "repo-ideal-koppeling",
    "name": "nldd/ideal-koppeling",
    "visibility": "open",
    "lang": "Go",
    "stars": 21,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-ideal-koppeling"
  },
  {
    "id": "repo-machtigingenregister",
    "name": "nldd/machtigingenregister",
    "visibility": "open",
    "lang": "Go",
    "stars": 28,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-machtigingenregister"
  },
  {
    "id": "repo-gegevensmakelaar",
    "name": "nldd/gegevensmakelaar",
    "visibility": "open",
    "lang": "Rust",
    "stars": 35,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-gegevensmakelaar"
  },
  {
    "id": "repo-stelselcatalogus",
    "name": "nldd/stelselcatalogus",
    "visibility": "intern",
    "lang": "Vue",
    "stars": 42,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-stelselcatalogus"
  },
  {
    "id": "repo-terugmeldvoorziening",
    "name": "nldd/terugmeldvoorziening",
    "visibility": "open",
    "lang": "Go",
    "stars": 49,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-terugmeldvoorziening"
  },
  {
    "id": "repo-digikoppeling-adapter",
    "name": "nldd/digikoppeling-adapter",
    "visibility": "open",
    "lang": "Java",
    "stars": 56,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-digikoppeling-adapter"
  },
  {
    "id": "repo-fsc-inway",
    "name": "nldd/fsc-inway",
    "visibility": "open",
    "lang": "Go",
    "stars": 63,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-fsc-inway"
  },
  {
    "id": "repo-cloudevents-broker",
    "name": "nldd/cloudevents-broker",
    "visibility": "intern",
    "lang": "Go",
    "stars": 70,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-cloudevents-broker"
  },
  {
    "id": "repo-subsidie-aanvraag",
    "name": "nldd/subsidie-aanvraag",
    "visibility": "open",
    "lang": "Vue",
    "stars": 77,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-subsidie-aanvraag"
  },
  {
    "id": "repo-aanbestedingsportaal",
    "name": "nldd/aanbestedingsportaal",
    "visibility": "open",
    "lang": "React",
    "stars": 84,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-aanbestedingsportaal"
  },
  {
    "id": "repo-inkooporder-verwerking",
    "name": "nldd/inkooporder-verwerking",
    "visibility": "open",
    "lang": "Java",
    "stars": 1,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-inkooporder-verwerking"
  },
  {
    "id": "repo-factuurverwerking",
    "name": "nldd/factuurverwerking",
    "visibility": "intern",
    "lang": "Java",
    "stars": 8,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-factuurverwerking"
  },
  {
    "id": "repo-personeelsdossier",
    "name": "nldd/personeelsdossier",
    "visibility": "open",
    "lang": "Java",
    "stars": 15,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-personeelsdossier"
  },
  {
    "id": "repo-verlofaanvraag",
    "name": "nldd/verlofaanvraag",
    "visibility": "open",
    "lang": "Vue",
    "stars": 22,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-verlofaanvraag"
  },
  {
    "id": "repo-declaratie-indienen",
    "name": "dictu/declaratie-indienen",
    "visibility": "open",
    "lang": "React",
    "stars": 29,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-declaratie-indienen"
  },
  {
    "id": "repo-rooster-uitvoering",
    "name": "nldd/rooster-uitvoering",
    "visibility": "intern",
    "lang": "Python",
    "stars": 36,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-rooster-uitvoering"
  },
  {
    "id": "repo-zaaksysteem",
    "name": "nldd/zaaksysteem",
    "visibility": "open",
    "lang": "Java",
    "stars": 43,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-zaaksysteem"
  },
  {
    "id": "repo-documentmanagement",
    "name": "nldd/documentmanagement",
    "visibility": "open",
    "lang": "Go",
    "stars": 50,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-documentmanagement"
  },
  {
    "id": "repo-handtekening-validatie",
    "name": "logius/handtekening-validatie",
    "visibility": "open",
    "lang": "Rust",
    "stars": 57,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-handtekening-validatie"
  },
  {
    "id": "repo-virusscanner-gateway",
    "name": "nldd/virusscanner-gateway",
    "visibility": "intern",
    "lang": "Go",
    "stars": 64,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-virusscanner-gateway"
  },
  {
    "id": "repo-backup-scheduler",
    "name": "nldd/backup-scheduler",
    "visibility": "open",
    "lang": "Go",
    "stars": 71,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-backup-scheduler"
  },
  {
    "id": "repo-kostenrapportage",
    "name": "nldd/kostenrapportage",
    "visibility": "open",
    "lang": "Python",
    "stars": 78,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-kostenrapportage"
  },
  {
    "id": "repo-capaciteitsplanner-dc",
    "name": "nldd/capaciteitsplanner-dc",
    "visibility": "open",
    "lang": "Vue",
    "stars": 85,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-capaciteitsplanner-dc"
  },
  {
    "id": "repo-energieverbruik-monitor",
    "name": "nldd/energieverbruik-monitor",
    "visibility": "intern",
    "lang": "Go",
    "stars": 2,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-energieverbruik-monitor"
  },
  {
    "id": "repo-inspectierapport-generator",
    "name": "nldd/inspectierapport-generator",
    "visibility": "open",
    "lang": "Python",
    "stars": 9,
    "openPrs": 3,
    "openIssues": 9,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-inspectierapport-generator"
  },
  {
    "id": "repo-handhavingsdossier",
    "name": "nldd/handhavingsdossier",
    "visibility": "open",
    "lang": "Java",
    "stars": 16,
    "openPrs": 4,
    "openIssues": 12,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-handhavingsdossier"
  },
  {
    "id": "repo-klachtenregistratie",
    "name": "nldd/klachtenregistratie",
    "visibility": "open",
    "lang": "Vue",
    "stars": 23,
    "openPrs": 5,
    "openIssues": 15,
    "ci": "red",
    "license": "EUPL-1.2",
    "app": "app-klachtenregistratie"
  },
  {
    "id": "repo-wob-verzoek",
    "name": "nldd/wob-verzoek",
    "visibility": "intern",
    "lang": "React",
    "stars": 30,
    "openPrs": 0,
    "openIssues": 0,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-wob-verzoek"
  },
  {
    "id": "repo-publicatieplatform",
    "name": "rvig/publicatieplatform",
    "visibility": "open",
    "lang": "Vue",
    "stars": 37,
    "openPrs": 1,
    "openIssues": 3,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-publicatieplatform"
  },
  {
    "id": "repo-besluitenregister",
    "name": "nldd/besluitenregister",
    "visibility": "open",
    "lang": "Go",
    "stars": 44,
    "openPrs": 2,
    "openIssues": 6,
    "ci": "green",
    "license": "EUPL-1.2",
    "app": "app-besluitenregister"
  }
];

export const hardware = [
  {
    "id": "rijkslaptop-linux-14",
    "name": "Rijkslaptop Linux 14\"",
    "category": "laptop",
    "illustration": "laptop",
    "cpu": "AMD Ryzen 7",
    "ram": "32 GB",
    "storage": "1 TB NVMe",
    "stock": 23,
    "lead": "1 wk",
    "price": 1450,
    "repairScore": 7,
    "circular": false
  },
  {
    "id": "rijkslaptop-linux-13",
    "name": "Rijkslaptop Linux 13\"",
    "category": "laptop",
    "illustration": "laptop",
    "cpu": "AMD Ryzen 5",
    "ram": "16 GB",
    "storage": "512 GB NVMe",
    "stock": 8,
    "lead": "2 wk",
    "price": 1150,
    "repairScore": 7,
    "circular": false
  },
  {
    "id": "framework-13",
    "name": "Framework Laptop 13",
    "category": "framework",
    "illustration": "framework",
    "cpu": "AMD Ryzen 7 7840U",
    "ram": "32 GB",
    "storage": "1 TB NVMe",
    "stock": 14,
    "lead": "1 wk",
    "price": 1599,
    "repairScore": 10,
    "circular": true,
    "note": "Modulair, onderdelen zelf vervangbaar"
  },
  {
    "id": "framework-16",
    "name": "Framework Laptop 16",
    "category": "framework",
    "illustration": "framework",
    "cpu": "AMD Ryzen 7 7840HS",
    "ram": "64 GB",
    "storage": "2 TB NVMe",
    "stock": 6,
    "lead": "3 wk",
    "price": 2299,
    "repairScore": 10,
    "circular": true,
    "note": "Uitwisselbare poorten en GPU-module"
  },
  {
    "id": "dev-workstation-xl",
    "name": "Dev-workstation XL",
    "category": "workstation",
    "illustration": "workstation",
    "cpu": "AMD Threadripper (32 cores)",
    "ram": "128 GB",
    "storage": "4 TB NVMe",
    "gpu": "NVIDIA RTX (24 GB)",
    "stock": 3,
    "lead": "4 wk",
    "price": 4850,
    "repairScore": 8,
    "circular": false,
    "note": "Voor zware builds, data en ML"
  },
  {
    "id": "dev-workstation-m",
    "name": "Dev-workstation M",
    "category": "workstation",
    "illustration": "workstation",
    "cpu": "AMD Ryzen 9 (16 cores)",
    "ram": "64 GB",
    "storage": "2 TB NVMe",
    "gpu": "iGPU",
    "stock": 9,
    "lead": "2 wk",
    "price": 2650,
    "repairScore": 8,
    "circular": false
  },
  {
    "id": "rijkstablet-11",
    "name": "Rijkstablet 11\"",
    "category": "tablet",
    "illustration": "tablet",
    "cpu": "ARM (8 cores)",
    "ram": "8 GB",
    "storage": "256 GB",
    "stock": 31,
    "lead": "1 wk",
    "price": 720,
    "repairScore": 5,
    "circular": false,
    "note": "Veldwerk en inspectie, MDM-beheerd"
  },
  {
    "id": "rijkstelefoon",
    "name": "Rijkstelefoon",
    "category": "phone",
    "illustration": "phone",
    "cpu": "ARM (8 cores)",
    "ram": "8 GB",
    "storage": "256 GB",
    "stock": 47,
    "lead": "1 wk",
    "price": 640,
    "repairScore": 6,
    "circular": false,
    "note": "Secure-profiel, versleuteld"
  }
];

export const deviceCategories = [
  {
    "id": "laptop",
    "label": "Laptops",
    "icon": "rectangle-stack"
  },
  {
    "id": "framework",
    "label": "Framework (modulair)",
    "icon": "puzzle-piece"
  },
  {
    "id": "workstation",
    "label": "Dev-workstations",
    "icon": "cylinder-split"
  },
  {
    "id": "tablet",
    "label": "Tablets",
    "icon": "rectangle-stack"
  },
  {
    "id": "phone",
    "label": "Telefoons",
    "icon": "person"
  }
];

export const images = [
  {
    "id": "autonoom-13",
    "name": "Autonome werkplek 13",
    "base": "Fedora Silverblue",
    "desc": "Immutable, MDM, full-disk-encryptie"
  },
  {
    "id": "autonoom-12",
    "name": "Autonome werkplek 12",
    "base": "Ubuntu LTS",
    "desc": "Vorige generatie"
  }
];

export const workplaces = [
  {
    "id": "wp-0001",
    "person": "ans",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0002",
    "person": "fatima",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0003",
    "person": "sanne",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0004",
    "person": "joost",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0005",
    "person": "pieter",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0006",
    "person": "sanne-de-vries",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0007",
    "person": "thijs-van-dijk",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0008",
    "person": "maud-vermeulen",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0009",
    "person": "mohammed-van-vliet",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0010",
    "person": "ans-kaya",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0011",
    "person": "amira-mol",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0012",
    "person": "omar-van-es",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0013",
    "person": "henk-wagenaar",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0014",
    "person": "yvonne-erdem",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0015",
    "person": "sander-slootweg",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0016",
    "person": "mark-asik",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0017",
    "person": "julia-el-amrani",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0018",
    "person": "liv-ozturk",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0019",
    "person": "mees-maas",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0020",
    "person": "khalid-veenstra",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0021",
    "person": "lieke-arslan",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0022",
    "person": "selin-van-loon",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0023",
    "person": "daan-lammers",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0024",
    "person": "iris-nijhuis",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0025",
    "person": "jeroen-holwerda",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0026",
    "person": "noor-naber",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0027",
    "person": "esra-veldhuis",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0028",
    "person": "tariq-mulder",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0029",
    "person": "soumaya-janssen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0030",
    "person": "ingrid-vink",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0031",
    "person": "jasper-ennaji",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0032",
    "person": "robin-roos",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0033",
    "person": "fenna-bruins",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0034",
    "person": "sterre-van-der-veen",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0035",
    "person": "levi-mohamed",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0036",
    "person": "gijs-van-os",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0037",
    "person": "olivier-el-khattabi",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0038",
    "person": "meryem-hendriks",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0039",
    "person": "lotte-hofman",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0040",
    "person": "tim-willems",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0041",
    "person": "bas-demir",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0042",
    "person": "nadia-van-der-velde",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0043",
    "person": "layla-groen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0044",
    "person": "hassan-tuinstra",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0045",
    "person": "said-schipper",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0046",
    "person": "wilma-korteweg",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0047",
    "person": "casper-bulut",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0048",
    "person": "bart-visser",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0049",
    "person": "suze-kok",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0050",
    "person": "nina-van-der-heijden",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0051",
    "person": "loes-van-den-heuvel",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0052",
    "person": "boris-sahin",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0053",
    "person": "jelle-driessen",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0054",
    "person": "ilias-theunissen",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0055",
    "person": "joost-strik",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0056",
    "person": "eva-van-zanten",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0057",
    "person": "stijn-wubben",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0058",
    "person": "aisha-snijders",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0059",
    "person": "pieter-de-boer",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0060",
    "person": "rachid-kuipers",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0061",
    "person": "hala-prins",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0062",
    "person": "saskia-karaca",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0063",
    "person": "floris-van-beek",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0064",
    "person": "roel-reijnders",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0065",
    "person": "vincent-van-dam",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0066",
    "person": "sophie-doornbos",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0067",
    "person": "indy-bijl",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0068",
    "person": "finn-charradi",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0069",
    "person": "wessel-verschuren",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0070",
    "person": "abdel-bakkal",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0071",
    "person": "dilan-scholten",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0072",
    "person": "sven-ben-ali",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0073",
    "person": "hugo-ouali",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0074",
    "person": "anouk-dekker",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0075",
    "person": "fatima-linders",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0076",
    "person": "bilal-verbruggen",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0077",
    "person": "zeynep-cetin",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0078",
    "person": "kees-cinar",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0079",
    "person": "carla-bakker",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0080",
    "person": "niels-brouwer",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0081",
    "person": "koen-schouten",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0082",
    "person": "roos-sanders",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0083",
    "person": "mila-celik",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0084",
    "person": "sem-van-der-laan",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0085",
    "person": "ahmed-wijnands",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0086",
    "person": "puck-van-hattem",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0087",
    "person": "hatice-gunes",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0088",
    "person": "emma-geerts",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0089",
    "person": "lars-kraaijeveld",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0090",
    "person": "femke-meijer",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0091",
    "person": "sara-de-wit",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0092",
    "person": "mehmet-koster",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0093",
    "person": "imane-gerritsen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0094",
    "person": "dirk-verbeek",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0095",
    "person": "annemarie-van-wijk",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0096",
    "person": "quinten-de-groot",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0097",
    "person": "maarten-berends",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0098",
    "person": "tess-tromp",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0099",
    "person": "veerle-bouazza",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0100",
    "person": "marit-roozendaal",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0101",
    "person": "teun-vos",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0102",
    "person": "romy-de-lange",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0103",
    "person": "younes-bouali",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0104",
    "person": "bram-el-hadioui",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0105",
    "person": "ruben-van-der-wal",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0106",
    "person": "yara-goossens",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0107",
    "person": "youssef-van-driel",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0108",
    "person": "karim-bakhti",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0109",
    "person": "samira-renkema",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0110",
    "person": "johan-jansen",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0111",
    "person": "petra-dijkstra",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0112",
    "person": "tobias-van-leeuwen",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0113",
    "person": "wouter-hoekstra",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0114",
    "person": "erik-aydin",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0115",
    "person": "lara-kuiper",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0116",
    "person": "fleur-stam",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0117",
    "person": "luuk-bosman",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0118",
    "person": "demi-tekin",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0119",
    "person": "driss-buitenhuis",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0120",
    "person": "sanne-van-bommel",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0121",
    "person": "thijs-smit",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0122",
    "person": "maud-yilmaz",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0123",
    "person": "mohammed-verhoeven",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0124",
    "person": "ans-wolters",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0125",
    "person": "amira-dogan",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0126",
    "person": "henk-evers",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0127",
    "person": "marieke-van-rijn",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0128",
    "person": "yvonne-van-ginkel",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0129",
    "person": "sander-sikkema",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0130",
    "person": "mark-vreeswijk",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0131",
    "person": "julia-pijnenburg",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0132",
    "person": "liv-bos",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0133",
    "person": "mees-van-den-berg",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0134",
    "person": "lieke-el-idrissi",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0135",
    "person": "isa-boutaleb",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0136",
    "person": "selin-blom",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0137",
    "person": "daan-heijmans",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0138",
    "person": "iris-koning",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0139",
    "person": "jeroen-hamid",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0140",
    "person": "noor-diks",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0141",
    "person": "esra-akkaya",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0142",
    "person": "soumaya-van-dijk",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0143",
    "person": "jan-vermeulen",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0144",
    "person": "ingrid-van-vliet",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0145",
    "person": "jasper-kaya",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0146",
    "person": "robin-mol",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0147",
    "person": "fenna-van-es",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0148",
    "person": "sterre-wagenaar",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0149",
    "person": "levi-lubbers",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0150",
    "person": "olivier-slootweg",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0151",
    "person": "senna-asik",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0152",
    "person": "meryem-el-amrani",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0153",
    "person": "lotte-ozturk",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0154",
    "person": "tim-maas",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0155",
    "person": "bas-veenstra",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0156",
    "person": "nadia-arslan",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0157",
    "person": "layla-roeloffzen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0158",
    "person": "said-lammers",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0159",
    "person": "gerard-nijhuis",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0160",
    "person": "wilma-holwerda",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0161",
    "person": "casper-naber",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0162",
    "person": "bart-veldhuis",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0163",
    "person": "suze-mulder",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0164",
    "person": "nina-janssen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0165",
    "person": "loes-huisman",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0166",
    "person": "jelle-ennaji",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0167",
    "person": "anne-roos",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0168",
    "person": "ilias-bruins",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0169",
    "person": "joost-van-der-veen",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0170",
    "person": "eva-mohamed",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0171",
    "person": "stijn-van-os",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0172",
    "person": "aisha-el-khattabi",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0173",
    "person": "pieter-wielinga",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0174",
    "person": "hala-hofman",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0175",
    "person": "cornelis-willems",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0176",
    "person": "saskia-demir",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0177",
    "person": "floris-van-der-velde",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0178",
    "person": "roel-groen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0179",
    "person": "vincent-tuinstra",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0180",
    "person": "sophie-schipper",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0181",
    "person": "indy-polat",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0182",
    "person": "wessel-bulut",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0183",
    "person": "britt-visser",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0184",
    "person": "abdel-kok",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0185",
    "person": "dilan-van-der-heijden",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0186",
    "person": "sven-van-den-heuvel",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0187",
    "person": "hugo-sahin",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0188",
    "person": "anouk-driessen",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0189",
    "person": "fatima-faber",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0190",
    "person": "zeynep-strik",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0191",
    "person": "willem-van-zanten",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0192",
    "person": "kees-wubben",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0193",
    "person": "carla-snijders",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0194",
    "person": "niels-de-boer",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0195",
    "person": "koen-kuipers",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0196",
    "person": "roos-prins",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0197",
    "person": "mila-smeets",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0198",
    "person": "ahmed-van-beek",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0199",
    "person": "mats-reijnders",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0200",
    "person": "puck-van-dam",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0201",
    "person": "hatice-doornbos",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0202",
    "person": "emma-bijl",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0203",
    "person": "lars-charradi",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0204",
    "person": "femke-verschuren",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0205",
    "person": "sara-peters",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0206",
    "person": "imane-scholten",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0207",
    "person": "fatih-ben-ali",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0208",
    "person": "dirk-ouali",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0209",
    "person": "annemarie-dekker",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0210",
    "person": "quinten-linders",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0211",
    "person": "maarten-verbruggen",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0212",
    "person": "tess-cetin",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0213",
    "person": "veerle-van-der-plas",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0214",
    "person": "teun-bakker",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0215",
    "person": "ties-brouwer",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0216",
    "person": "romy-schouten",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0217",
    "person": "younes-sanders",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0218",
    "person": "bram-celik",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0219",
    "person": "ruben-van-der-laan",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0220",
    "person": "yara-wijnands",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0221",
    "person": "youssef-engelen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0222",
    "person": "samira-gunes",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0223",
    "person": "bouchra-geerts",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0224",
    "person": "johan-kraaijeveld",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0225",
    "person": "petra-meijer",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0226",
    "person": "tobias-de-wit",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0227",
    "person": "wouter-koster",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0228",
    "person": "erik-gerritsen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0229",
    "person": "lara-korkmaz",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0230",
    "person": "luuk-van-wijk",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0231",
    "person": "pim-de-groot",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0232",
    "person": "demi-berends",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0233",
    "person": "driss-tromp",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0234",
    "person": "sanne-bouazza",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0235",
    "person": "thijs-roozendaal",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0236",
    "person": "maud-vos",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0237",
    "person": "mohammed-van-der-meer",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0238",
    "person": "amira-bouali",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0239",
    "person": "omar-el-hadioui",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0240",
    "person": "henk-van-der-wal",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0241",
    "person": "marieke-goossens",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0242",
    "person": "yvonne-van-driel",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0243",
    "person": "sander-bakhti",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0244",
    "person": "mark-renkema",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0245",
    "person": "julia-yildiz",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0246",
    "person": "mees-dijkstra",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0247",
    "person": "khalid-van-leeuwen",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0248",
    "person": "lieke-hoekstra",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0249",
    "person": "isa-aydin",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0250",
    "person": "selin-kuiper",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0251",
    "person": "daan-stam",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0252",
    "person": "iris-bosman",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0253",
    "person": "jeroen-donker",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0254",
    "person": "esra-buitenhuis",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0255",
    "person": "tariq-van-bommel",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0256",
    "person": "soumaya-smit",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0257",
    "person": "jan-yilmaz",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0258",
    "person": "ingrid-verhoeven",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0259",
    "person": "jasper-wolters",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0260",
    "person": "robin-dogan",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0261",
    "person": "fenna-timmermans",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0262",
    "person": "levi-van-rijn",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0263",
    "person": "gijs-van-ginkel",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0264",
    "person": "olivier-sikkema",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0265",
    "person": "senna-vreeswijk",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0266",
    "person": "meryem-pijnenburg",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0267",
    "person": "lotte-bos",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0268",
    "person": "tim-van-den-berg",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0269",
    "person": "bas-postma",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0270",
    "person": "layla-boutaleb",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0271",
    "person": "hassan-blom",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0272",
    "person": "said-heijmans",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0273",
    "person": "gerard-koning",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0274",
    "person": "wilma-hamid",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0275",
    "person": "casper-diks",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0276",
    "person": "bart-akkaya",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0277",
    "person": "suze-de-vries",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0278",
    "person": "loes-vermeulen",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0279",
    "person": "boris-van-vliet",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0280",
    "person": "jelle-kaya",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0281",
    "person": "anne-mol",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0282",
    "person": "ilias-van-es",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0283",
    "person": "joost-wagenaar",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0284",
    "person": "eva-lubbers",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0285",
    "person": "stijn-erdem",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0286",
    "person": "pieter-asik",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0287",
    "person": "rachid-el-amrani",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0288",
    "person": "hala-ozturk",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0289",
    "person": "cornelis-maas",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0290",
    "person": "saskia-veenstra",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0291",
    "person": "floris-arslan",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0292",
    "person": "roel-roeloffzen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0293",
    "person": "vincent-van-loon",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0294",
    "person": "indy-nijhuis",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0295",
    "person": "finn-holwerda",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0296",
    "person": "wessel-naber",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0297",
    "person": "britt-veldhuis",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0298",
    "person": "abdel-mulder",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0299",
    "person": "dilan-janssen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0300",
    "person": "sven-huisman",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0301",
    "person": "hugo-vink",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0302",
    "person": "fatima-roos",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0303",
    "person": "bilal-bruins",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0304",
    "person": "zeynep-van-der-veen",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0305",
    "person": "willem-mohamed",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0306",
    "person": "kees-van-os",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0307",
    "person": "carla-el-khattabi",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0308",
    "person": "niels-wielinga",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0309",
    "person": "koen-hendriks",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0310",
    "person": "mila-willems",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0311",
    "person": "sem-demir",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0312",
    "person": "ahmed-van-der-velde",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0313",
    "person": "mats-groen",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0314",
    "person": "puck-tuinstra",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0315",
    "person": "hatice-schipper",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0316",
    "person": "emma-polat",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0317",
    "person": "lars-korteweg",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0318",
    "person": "sara-visser",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0319",
    "person": "mehmet-kok",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0320",
    "person": "imane-van-der-heijden",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0321",
    "person": "fatih-van-den-heuvel",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0322",
    "person": "dirk-sahin",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0323",
    "person": "annemarie-driessen",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0324",
    "person": "quinten-faber",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0325",
    "person": "maarten-theunissen",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0326",
    "person": "veerle-van-zanten",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0327",
    "person": "marit-wubben",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0328",
    "person": "teun-snijders",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0329",
    "person": "ties-de-boer",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0330",
    "person": "romy-kuipers",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0331",
    "person": "younes-prins",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0332",
    "person": "bram-smeets",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0333",
    "person": "ruben-karaca",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0334",
    "person": "youssef-reijnders",
    "model": "framework-13",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0335",
    "person": "karim-van-dam",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0336",
    "person": "samira-doornbos",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "provisioning",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0337",
    "person": "bouchra-bijl",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0338",
    "person": "johan-charradi",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0339",
    "person": "petra-verschuren",
    "model": "rijkslaptop-linux-13",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0340",
    "person": "tobias-peters",
    "model": "dev-workstation-xl",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0341",
    "person": "wouter-bakkal",
    "model": "rijkstelefoon",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "3 uur geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0342",
    "person": "lara-ben-ali",
    "model": "dev-workstation-m",
    "image": "autonoom-12",
    "status": "geleverd",
    "lastSeen": "—",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0343",
    "person": "fleur-ouali",
    "model": "rijkslaptop-linux-14",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "2 min geleden",
    "encrypted": true,
    "updated": true
  },
  {
    "id": "wp-0344",
    "person": "luuk-dekker",
    "model": "framework-16",
    "image": "autonoom-12",
    "status": "in gebruik",
    "lastSeen": "14 min geleden",
    "encrypted": true,
    "updated": false
  },
  {
    "id": "wp-0345",
    "person": "pim-linders",
    "model": "rijkstablet-11",
    "image": "autonoom-13",
    "status": "in gebruik",
    "lastSeen": "1 uur geleden",
    "encrypted": true,
    "updated": true
  }
];

export const environments = [
  "dev",
  "test",
  "acc",
  "prod"
];

export const deployments = [
  {
    "app": "app-paspoort",
    "dev": "v2.4.1",
    "test": "v2.4.1",
    "acc": "v2.4.0",
    "prod": "v2.3.9"
  },
  {
    "app": "app-toeslagen",
    "dev": "v1.9.0",
    "test": "v1.8.4",
    "acc": "v1.8.4",
    "prod": "v1.8.2"
  },
  {
    "app": "app-platformportaal",
    "dev": "v0.7.0",
    "test": "v0.7.0",
    "acc": "v0.6.5",
    "prod": "v0.6.5"
  },
  {
    "app": "app-kentekencheck",
    "dev": "v2.4.3",
    "test": "v2.4.3",
    "acc": "v2.4.3",
    "prod": "v2.4.2"
  },
  {
    "app": "app-studiefinanciering-portaal",
    "dev": "v3.5.6",
    "test": "v3.5.6",
    "acc": "v3.5.6",
    "prod": "v3.5.5"
  },
  {
    "app": "app-vergunningchecker",
    "dev": "v1.6.0",
    "test": "v1.6.0",
    "acc": "v1.6.0",
    "prod": "v1.6.0"
  },
  {
    "app": "app-inkomenstoets",
    "dev": "v2.7.3",
    "test": "v2.7.3",
    "acc": "v2.7.3",
    "prod": "v2.7.2"
  },
  {
    "app": "app-aangifte-omzetbelasting",
    "dev": "v3.8.6",
    "test": "v3.8.6",
    "acc": "v3.8.6",
    "prod": "v3.8.5"
  },
  {
    "app": "app-reisdocument-aanvraag",
    "dev": "v1.9.0",
    "test": "v1.9.0",
    "acc": "v1.9.0",
    "prod": "v1.9.0"
  },
  {
    "app": "app-bijstandsuitkering",
    "dev": "v2.0.3",
    "test": "v2.0.3",
    "acc": "v2.0.3",
    "prod": "v2.0.2"
  },
  {
    "app": "app-kadaster-viewer",
    "dev": "v3.1.6",
    "test": "v3.1.6",
    "acc": "v3.1.6",
    "prod": "v3.1.5"
  },
  {
    "app": "app-subsidieportaal-rvo",
    "dev": "v1.2.0",
    "test": "v1.2.0",
    "acc": "v1.2.0",
    "prod": "v1.2.0"
  },
  {
    "app": "app-ww-aanvraag",
    "dev": "v2.3.3",
    "test": "v2.3.3",
    "acc": "v2.3.3",
    "prod": "v2.3.2"
  },
  {
    "app": "app-inspectieplanner-ilt",
    "dev": "v3.4.6",
    "test": "v3.4.6",
    "acc": "v3.4.6",
    "prod": "v3.4.5"
  },
  {
    "app": "app-aow-uitkering",
    "dev": "v1.5.0",
    "test": "v1.5.0",
    "acc": "v1.5.0",
    "prod": "v1.5.0"
  },
  {
    "app": "app-kinderbijslag",
    "dev": "v2.6.3",
    "test": "v2.6.3",
    "acc": "v2.6.3",
    "prod": "v2.6.2"
  },
  {
    "app": "app-woz-bezwaar",
    "dev": "v3.7.6",
    "test": "v3.7.6",
    "acc": "v3.7.6",
    "prod": "v3.7.5"
  },
  {
    "app": "app-bezwaarafhandeling",
    "dev": "v1.8.0",
    "test": "v1.8.0",
    "acc": "v1.8.0",
    "prod": "v1.8.0"
  },
  {
    "app": "app-rijbewijs-vernieuwen",
    "dev": "v2.9.3",
    "test": "v2.9.3",
    "acc": "v2.9.3",
    "prod": "v2.9.2"
  },
  {
    "app": "app-naturalisatie-aanvraag",
    "dev": "v3.0.6",
    "test": "v3.0.6",
    "acc": "v3.0.6",
    "prod": "v3.0.5"
  },
  {
    "app": "app-verblijfsvergunning",
    "dev": "v1.1.0",
    "test": "v1.1.0",
    "acc": "v1.1.0",
    "prod": "v1.1.0"
  },
  {
    "app": "app-huurtoeslag-rekenen",
    "dev": "v2.2.3",
    "test": "v2.2.3",
    "acc": "v2.2.3",
    "prod": "v2.2.2"
  },
  {
    "app": "app-digid-koppeling",
    "dev": "v3.3.6",
    "test": "v3.3.6",
    "acc": "v3.3.6",
    "prod": "v3.3.5"
  },
  {
    "app": "app-eherkenning-broker",
    "dev": "v1.4.0",
    "test": "v1.4.0",
    "acc": "v1.4.0",
    "prod": "v1.4.0"
  },
  {
    "app": "app-bsn-validatie",
    "dev": "v2.5.3",
    "test": "v2.5.3",
    "acc": "v2.5.3",
    "prod": "v2.5.2"
  },
  {
    "app": "app-iban-validatie",
    "dev": "v3.6.6",
    "test": "v3.6.6",
    "acc": "v3.6.6",
    "prod": "v3.6.5"
  },
  {
    "app": "app-adrescheck-bag",
    "dev": "v1.7.0",
    "test": "v1.7.0",
    "acc": "v1.7.0",
    "prod": "v1.7.0"
  },
  {
    "app": "app-brp-bevraging",
    "dev": "v2.8.3",
    "test": "v2.8.3",
    "acc": "v2.8.3",
    "prod": "v2.8.2"
  },
  {
    "app": "app-handelsregister-zoeker",
    "dev": "v3.9.6",
    "test": "v3.9.6",
    "acc": "v3.9.6",
    "prod": "v3.9.5"
  },
  {
    "app": "app-incasso-cjib",
    "dev": "v1.0.0",
    "test": "v1.0.0",
    "acc": "v1.0.0",
    "prod": "v1.0.0"
  },
  {
    "app": "app-boete-bezwaar",
    "dev": "v2.1.3",
    "test": "v2.1.3",
    "acc": "v2.1.3",
    "prod": "v2.1.2"
  },
  {
    "app": "app-belastingaangifte-ib",
    "dev": "v3.2.6",
    "test": "v3.2.6",
    "acc": "v3.2.6",
    "prod": "v3.2.5"
  },
  {
    "app": "app-loonheffing",
    "dev": "v1.3.0",
    "test": "v1.3.0",
    "acc": "v1.3.0",
    "prod": "v1.3.0"
  },
  {
    "app": "app-zorgtoeslag-portaal",
    "dev": "v2.4.3",
    "test": "v2.4.3",
    "acc": "v2.4.3",
    "prod": "v2.4.2"
  },
  {
    "app": "app-pgb-beheer",
    "dev": "v3.5.6",
    "test": "v3.5.6",
    "acc": "v3.5.6",
    "prod": "v3.5.5"
  },
  {
    "app": "app-zorgverzekeraar-koppeling",
    "dev": "v1.6.0",
    "test": "v1.6.0",
    "acc": "v1.6.0",
    "prod": "v1.6.0"
  },
  {
    "app": "app-vaccinatieregister",
    "dev": "v2.7.3",
    "test": "v2.7.3",
    "acc": "v2.7.3",
    "prod": "v2.7.2"
  },
  {
    "app": "app-jeugdzorg-dossier",
    "dev": "v3.8.6",
    "test": "v3.8.6",
    "acc": "v3.8.6",
    "prod": "v3.8.5"
  },
  {
    "app": "app-onderwijsregistratie",
    "dev": "v1.9.0",
    "test": "v1.9.0",
    "acc": "v1.9.0",
    "prod": "v1.9.0"
  },
  {
    "app": "app-diplomaregister",
    "dev": "v2.0.3",
    "test": "v2.0.3",
    "acc": "v2.0.3",
    "prod": "v2.0.2"
  },
  {
    "app": "app-leerplicht-melding",
    "dev": "v3.1.6",
    "test": "v3.1.6",
    "acc": "v3.1.6",
    "prod": "v3.1.5"
  },
  {
    "app": "app-studielening-rekentool",
    "dev": "v1.2.0",
    "test": "v1.2.0",
    "acc": "v1.2.0",
    "prod": "v1.2.0"
  },
  {
    "app": "app-omgevingsloket",
    "dev": "v2.3.3",
    "test": "v2.3.3",
    "acc": "v2.3.3",
    "prod": "v2.3.2"
  },
  {
    "app": "app-bouwvergunning",
    "dev": "v3.4.6",
    "test": "v3.4.6",
    "acc": "v3.4.6",
    "prod": "v3.4.5"
  },
  {
    "app": "app-milieumelding",
    "dev": "v1.5.0",
    "test": "v1.5.0",
    "acc": "v1.5.0",
    "prod": "v1.5.0"
  },
  {
    "app": "app-waterschapsheffing",
    "dev": "v2.6.3",
    "test": "v2.6.3",
    "acc": "v2.6.3",
    "prod": "v2.6.2"
  },
  {
    "app": "app-verkeersboete-viewer",
    "dev": "v3.7.6",
    "test": "v3.7.6",
    "acc": "v3.7.6",
    "prod": "v3.7.5"
  },
  {
    "app": "app-parkeervergunning",
    "dev": "v1.8.0",
    "test": "v1.8.0",
    "acc": "v1.8.0",
    "prod": "v1.8.0"
  },
  {
    "app": "app-rijksbegroting-explorer",
    "dev": "v2.9.3",
    "test": "v2.9.3",
    "acc": "v2.9.3",
    "prod": "v2.9.2"
  },
  {
    "app": "app-open-data-portaal",
    "dev": "v3.0.6",
    "test": "v3.0.6",
    "acc": "v3.0.6",
    "prod": "v3.0.5"
  },
  {
    "app": "app-statistiek-dashboard-cbs",
    "dev": "v1.1.0",
    "test": "v1.1.0",
    "acc": "v1.1.0",
    "prod": "v1.1.0"
  },
  {
    "app": "app-etl-basisregisters",
    "dev": "v2.2.3",
    "test": "v2.2.3",
    "acc": "v2.2.3",
    "prod": "v2.2.2"
  },
  {
    "app": "app-datakwaliteit-monitor",
    "dev": "v3.3.6",
    "test": "v3.3.6",
    "acc": "v3.3.6",
    "prod": "v3.3.5"
  },
  {
    "app": "app-anonimisering-pipeline",
    "dev": "v1.4.0",
    "test": "v1.4.0",
    "acc": "v1.4.0",
    "prod": "v1.4.0"
  },
  {
    "app": "app-archief-export",
    "dev": "v2.5.3",
    "test": "v2.5.3",
    "acc": "v2.5.3",
    "prod": "v2.5.2"
  },
  {
    "app": "app-nachtelijke-batchrun",
    "dev": "v3.6.6",
    "test": "v3.6.6",
    "acc": "v3.6.6",
    "prod": "v3.6.5"
  },
  {
    "app": "app-betaalbatch-generator",
    "dev": "v1.7.0",
    "test": "v1.7.0",
    "acc": "v1.7.0",
    "prod": "v1.7.0"
  },
  {
    "app": "app-sepa-incasso-job",
    "dev": "v2.8.3",
    "test": "v2.8.3",
    "acc": "v2.8.3",
    "prod": "v2.8.2"
  },
  {
    "app": "app-fraudedetectie",
    "dev": "v3.9.6",
    "test": "v3.9.6",
    "acc": "v3.9.6",
    "prod": "v3.9.5"
  },
  {
    "app": "app-risicoscoring",
    "dev": "v1.0.0",
    "test": "v1.0.0",
    "acc": "v1.0.0",
    "prod": "v1.0.0"
  },
  {
    "app": "app-sanctielijst-check",
    "dev": "v2.1.3",
    "test": "v2.1.3",
    "acc": "v2.1.3",
    "prod": "v2.1.2"
  },
  {
    "app": "app-pki-certificaatbeheer",
    "dev": "v3.2.6",
    "test": "v3.2.6",
    "acc": "v3.2.6",
    "prod": "v3.2.5"
  },
  {
    "app": "app-secretsmanager",
    "dev": "v1.3.0",
    "test": "v1.3.0",
    "acc": "v1.3.0",
    "prod": "v1.3.0"
  },
  {
    "app": "app-audit-logboek",
    "dev": "v2.4.3",
    "test": "v2.4.3",
    "acc": "v2.4.3",
    "prod": "v2.4.2"
  },
  {
    "app": "app-toegangsbeheer",
    "dev": "v3.5.6",
    "test": "v3.5.6",
    "acc": "v3.5.6",
    "prod": "v3.5.5"
  },
  {
    "app": "app-oidc-provider",
    "dev": "v1.6.0",
    "test": "v1.6.0",
    "acc": "v1.6.0",
    "prod": "v1.6.0"
  },
  {
    "app": "app-rollenmatrix",
    "dev": "v2.7.3",
    "test": "v2.7.3",
    "acc": "v2.7.3",
    "prod": "v2.7.2"
  },
  {
    "app": "app-servicedesk-portaal",
    "dev": "v3.8.6",
    "test": "v3.8.6",
    "acc": "v3.8.6",
    "prod": "v3.8.5"
  },
  {
    "app": "app-statuspagina",
    "dev": "v1.9.0",
    "test": "v1.9.0",
    "acc": "v1.9.0",
    "prod": "v1.9.0"
  },
  {
    "app": "app-monitoring-collector",
    "dev": "v2.0.3",
    "test": "v2.0.3",
    "acc": "v2.0.3",
    "prod": "v2.0.2"
  },
  {
    "app": "app-logaggregatie",
    "dev": "v3.1.6",
    "test": "v3.1.6",
    "acc": "v3.1.6",
    "prod": "v3.1.5"
  },
  {
    "app": "app-deploy-orchestrator",
    "dev": "v1.2.0",
    "test": "v1.2.0",
    "acc": "v1.2.0",
    "prod": "v1.2.0"
  },
  {
    "app": "app-ci-runnerpool",
    "dev": "v2.3.3",
    "test": "v2.3.3",
    "acc": "v2.3.3",
    "prod": "v2.3.2"
  },
  {
    "app": "app-feature-flags",
    "dev": "v3.4.6",
    "test": "v3.4.6",
    "acc": "v3.4.6",
    "prod": "v3.4.5"
  },
  {
    "app": "app-config-store",
    "dev": "v1.5.0",
    "test": "v1.5.0",
    "acc": "v1.5.0",
    "prod": "v1.5.0"
  },
  {
    "app": "app-nldd-componenten",
    "dev": "v2.6.3",
    "test": "v2.6.3",
    "acc": "v2.6.3",
    "prod": "v2.6.2"
  },
  {
    "app": "app-huisstijl-bibliotheek",
    "dev": "v3.7.6",
    "test": "v3.7.6",
    "acc": "v3.7.6",
    "prod": "v3.7.5"
  },
  {
    "app": "app-documentatiesite",
    "dev": "v1.8.0",
    "test": "v1.8.0",
    "acc": "v1.8.0",
    "prod": "v1.8.0"
  },
  {
    "app": "app-api-catalogus",
    "dev": "v2.9.3",
    "test": "v2.9.3",
    "acc": "v2.9.3",
    "prod": "v2.9.2"
  },
  {
    "app": "app-standaarden-checker",
    "dev": "v3.0.6",
    "test": "v3.0.6",
    "acc": "v3.0.6",
    "prod": "v3.0.5"
  },
  {
    "app": "app-toegankelijkheid-scanner",
    "dev": "v1.1.0",
    "test": "v1.1.0",
    "acc": "v1.1.0",
    "prod": "v1.1.0"
  },
  {
    "app": "app-pdf-generator",
    "dev": "v2.2.3",
    "test": "v2.2.3",
    "acc": "v2.2.3",
    "prod": "v2.2.2"
  },
  {
    "app": "app-brief-generator",
    "dev": "v3.3.6",
    "test": "v3.3.6",
    "acc": "v3.3.6",
    "prod": "v3.3.5"
  },
  {
    "app": "app-berichtenbox",
    "dev": "v1.4.0",
    "test": "v1.4.0",
    "acc": "v1.4.0",
    "prod": "v1.4.0"
  },
  {
    "app": "app-mijnoverheid-portaal",
    "dev": "v2.5.3",
    "test": "v2.5.3",
    "acc": "v2.5.3",
    "prod": "v2.5.2"
  },
  {
    "app": "app-formulierenbouwer",
    "dev": "v3.6.6",
    "test": "v3.6.6",
    "acc": "v3.6.6",
    "prod": "v3.6.5"
  },
  {
    "app": "app-vragenlijst-engine",
    "dev": "v1.7.0",
    "test": "v1.7.0",
    "acc": "v1.7.0",
    "prod": "v1.7.0"
  },
  {
    "app": "app-afspraakplanner",
    "dev": "v2.8.3",
    "test": "v2.8.3",
    "acc": "v2.8.3",
    "prod": "v2.8.2"
  },
  {
    "app": "app-wachtrij-manager",
    "dev": "v3.9.6",
    "test": "v3.9.6",
    "acc": "v3.9.6",
    "prod": "v3.9.5"
  },
  {
    "app": "app-notificatieservice",
    "dev": "v1.0.0",
    "test": "v1.0.0",
    "acc": "v1.0.0",
    "prod": "v1.0.0"
  },
  {
    "app": "app-sms-gateway",
    "dev": "v2.1.3",
    "test": "v2.1.3",
    "acc": "v2.1.3",
    "prod": "v2.1.2"
  },
  {
    "app": "app-betaalverzoek",
    "dev": "v3.2.6",
    "test": "v3.2.6",
    "acc": "v3.2.6",
    "prod": "v3.2.5"
  },
  {
    "app": "app-ideal-koppeling",
    "dev": "v1.3.0",
    "test": "v1.3.0",
    "acc": "v1.3.0",
    "prod": "v1.3.0"
  },
  {
    "app": "app-machtigingenregister",
    "dev": "v2.4.3",
    "test": "v2.4.3",
    "acc": "v2.4.3",
    "prod": "v2.4.2"
  },
  {
    "app": "app-gegevensmakelaar",
    "dev": "v3.5.6",
    "test": "v3.5.6",
    "acc": "v3.5.6",
    "prod": "v3.5.5"
  },
  {
    "app": "app-stelselcatalogus",
    "dev": "v1.6.0",
    "test": "v1.6.0",
    "acc": "v1.6.0",
    "prod": "v1.6.0"
  },
  {
    "app": "app-terugmeldvoorziening",
    "dev": "v2.7.3",
    "test": "v2.7.3",
    "acc": "v2.7.3",
    "prod": "v2.7.2"
  },
  {
    "app": "app-digikoppeling-adapter",
    "dev": "v3.8.6",
    "test": "v3.8.6",
    "acc": "v3.8.6",
    "prod": "v3.8.5"
  },
  {
    "app": "app-fsc-inway",
    "dev": "v1.9.0",
    "test": "v1.9.0",
    "acc": "v1.9.0",
    "prod": "v1.9.0"
  },
  {
    "app": "app-cloudevents-broker",
    "dev": "v2.0.3",
    "test": "v2.0.3",
    "acc": "v2.0.3",
    "prod": "v2.0.2"
  },
  {
    "app": "app-subsidie-aanvraag",
    "dev": "v3.1.6",
    "test": "v3.1.6",
    "acc": "v3.1.6",
    "prod": "v3.1.5"
  },
  {
    "app": "app-aanbestedingsportaal",
    "dev": "v1.2.0",
    "test": "v1.2.0",
    "acc": "v1.2.0",
    "prod": "v1.2.0"
  },
  {
    "app": "app-inkooporder-verwerking",
    "dev": "v2.3.3",
    "test": "v2.3.3",
    "acc": "v2.3.3",
    "prod": "v2.3.2"
  },
  {
    "app": "app-factuurverwerking",
    "dev": "v3.4.6",
    "test": "v3.4.6",
    "acc": "v3.4.6",
    "prod": "v3.4.5"
  },
  {
    "app": "app-personeelsdossier",
    "dev": "v1.5.0",
    "test": "v1.5.0",
    "acc": "v1.5.0",
    "prod": "v1.5.0"
  },
  {
    "app": "app-verlofaanvraag",
    "dev": "v2.6.3",
    "test": "v2.6.3",
    "acc": "v2.6.3",
    "prod": "v2.6.2"
  },
  {
    "app": "app-declaratie-indienen",
    "dev": "v3.7.6",
    "test": "v3.7.6",
    "acc": "v3.7.6",
    "prod": "v3.7.5"
  },
  {
    "app": "app-rooster-uitvoering",
    "dev": "v1.8.0",
    "test": "v1.8.0",
    "acc": "v1.8.0",
    "prod": "v1.8.0"
  },
  {
    "app": "app-zaaksysteem",
    "dev": "v2.9.3",
    "test": "v2.9.3",
    "acc": "v2.9.3",
    "prod": "v2.9.2"
  },
  {
    "app": "app-documentmanagement",
    "dev": "v3.0.6",
    "test": "v3.0.6",
    "acc": "v3.0.6",
    "prod": "v3.0.5"
  },
  {
    "app": "app-handtekening-validatie",
    "dev": "v1.1.0",
    "test": "v1.1.0",
    "acc": "v1.1.0",
    "prod": "v1.1.0"
  },
  {
    "app": "app-virusscanner-gateway",
    "dev": "v2.2.3",
    "test": "v2.2.3",
    "acc": "v2.2.3",
    "prod": "v2.2.2"
  },
  {
    "app": "app-backup-scheduler",
    "dev": "v3.3.6",
    "test": "v3.3.6",
    "acc": "v3.3.6",
    "prod": "v3.3.5"
  },
  {
    "app": "app-kostenrapportage",
    "dev": "v1.4.0",
    "test": "v1.4.0",
    "acc": "v1.4.0",
    "prod": "v1.4.0"
  },
  {
    "app": "app-capaciteitsplanner-dc",
    "dev": "v2.5.3",
    "test": "v2.5.3",
    "acc": "v2.5.3",
    "prod": "v2.5.2"
  },
  {
    "app": "app-energieverbruik-monitor",
    "dev": "v3.6.6",
    "test": "v3.6.6",
    "acc": "v3.6.6",
    "prod": "v3.6.5"
  },
  {
    "app": "app-inspectierapport-generator",
    "dev": "v1.7.0",
    "test": "v1.7.0",
    "acc": "v1.7.0",
    "prod": "v1.7.0"
  },
  {
    "app": "app-handhavingsdossier",
    "dev": "v2.8.3",
    "test": "v2.8.3",
    "acc": "v2.8.3",
    "prod": "v2.8.2"
  },
  {
    "app": "app-klachtenregistratie",
    "dev": "v3.9.6",
    "test": "v3.9.6",
    "acc": "v3.9.6",
    "prod": "v3.9.5"
  },
  {
    "app": "app-wob-verzoek",
    "dev": "v1.0.0",
    "test": "v1.0.0",
    "acc": "v1.0.0",
    "prod": "v1.0.0"
  },
  {
    "app": "app-publicatieplatform",
    "dev": "v2.1.3",
    "test": "v2.1.3",
    "acc": "v2.1.3",
    "prod": "v2.1.2"
  },
  {
    "app": "app-besluitenregister",
    "dev": "v3.2.6",
    "test": "v3.2.6",
    "acc": "v3.2.6",
    "prod": "v3.2.5"
  }
];

export const releases = [
  {
    "id": "rel-1",
    "app": "app-paspoort",
    "version": "v2.3.9",
    "env": "prod",
    "by": "joost",
    "when": "gisteren 14:22",
    "notes": "Bugfix in BSN-validatie"
  },
  {
    "id": "rel-2",
    "app": "app-platformportaal",
    "version": "v0.6.5",
    "env": "prod",
    "by": "ans",
    "when": "gisteren 10:05",
    "notes": "NLDD bump + nieuwe rack-view"
  },
  {
    "id": "rel-g6",
    "app": "app-vergunningchecker",
    "version": "v1.6.0",
    "env": "prod",
    "by": "maarten-berends",
    "when": "di 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g9",
    "app": "app-reisdocument-aanvraag",
    "version": "v1.9.0",
    "env": "prod",
    "by": "annemarie-van-wijk",
    "when": "vr 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g12",
    "app": "app-subsidieportaal-rvo",
    "version": "v1.2.0",
    "env": "prod",
    "by": "mees-maas",
    "when": "wo 11:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g15",
    "app": "app-aow-uitkering",
    "version": "v1.5.0",
    "env": "prod",
    "by": "meryem-hendriks",
    "when": "gisteren 14:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g18",
    "app": "app-bezwaarafhandeling",
    "version": "v1.8.0",
    "env": "prod",
    "by": "abdel-bakkal",
    "when": "do 8:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g21",
    "app": "app-verblijfsvergunning",
    "version": "v1.1.0",
    "env": "prod",
    "by": "sanne-van-bommel",
    "when": "di 11:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g24",
    "app": "app-eherkenning-broker",
    "version": "v1.4.0",
    "env": "prod",
    "by": "julia-pijnenburg",
    "when": "vr 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g27",
    "app": "app-adrescheck-bag",
    "version": "v1.7.0",
    "env": "prod",
    "by": "femke-meijer",
    "when": "wo 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g30",
    "app": "app-incasso-cjib",
    "version": "v1.0.0",
    "env": "prod",
    "by": "julia-el-amrani",
    "when": "gisteren 11:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g33",
    "app": "app-loonheffing",
    "version": "v1.3.0",
    "env": "prod",
    "by": "ans-kaya",
    "when": "do 14:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g36",
    "app": "app-zorgverzekeraar-koppeling",
    "version": "v1.6.0",
    "env": "prod",
    "by": "meryem-el-amrani",
    "when": "di 8:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g39",
    "app": "app-onderwijsregistratie",
    "version": "v1.9.0",
    "env": "prod",
    "by": "julia-pijnenburg",
    "when": "vr 11:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g42",
    "app": "app-studielening-rekentool",
    "version": "v1.2.0",
    "env": "prod",
    "by": "jasper-ennaji",
    "when": "wo 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g45",
    "app": "app-milieumelding",
    "version": "v1.5.0",
    "env": "prod",
    "by": "eva-van-zanten",
    "when": "gisteren 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g48",
    "app": "app-parkeervergunning",
    "version": "v1.8.0",
    "env": "prod",
    "by": "tim-maas",
    "when": "do 11:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g51",
    "app": "app-statistiek-dashboard-cbs",
    "version": "v1.1.0",
    "env": "prod",
    "by": "mila-celik",
    "when": "di 14:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g54",
    "app": "app-anonimisering-pipeline",
    "version": "v1.4.0",
    "env": "prod",
    "by": "eva-van-zanten",
    "when": "vr 8:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g57",
    "app": "app-betaalbatch-generator",
    "version": "v1.7.0",
    "env": "prod",
    "by": "vincent-van-dam",
    "when": "wo 11:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g60",
    "app": "app-risicoscoring",
    "version": "v1.0.0",
    "env": "prod",
    "by": "sven-ben-ali",
    "when": "gisteren 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g63",
    "app": "app-secretsmanager",
    "version": "v1.3.0",
    "env": "prod",
    "by": "lieke-arslan",
    "when": "do 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g66",
    "app": "app-oidc-provider",
    "version": "v1.6.0",
    "env": "prod",
    "by": "mila-celik",
    "when": "di 11:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g69",
    "app": "app-statuspagina",
    "version": "v1.9.0",
    "env": "prod",
    "by": "mees-maas",
    "when": "vr 14:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g72",
    "app": "app-deploy-orchestrator",
    "version": "v1.2.0",
    "env": "prod",
    "by": "noor-naber",
    "when": "wo 8:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g75",
    "app": "app-config-store",
    "version": "v1.5.0",
    "env": "prod",
    "by": "bouchra-yildiz",
    "when": "gisteren 11:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g78",
    "app": "app-documentatiesite",
    "version": "v1.8.0",
    "env": "prod",
    "by": "puck-van-hattem",
    "when": "do 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g81",
    "app": "app-toegankelijkheid-scanner",
    "version": "v1.1.0",
    "env": "prod",
    "by": "sanne-van-bommel",
    "when": "di 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g84",
    "app": "app-berichtenbox",
    "version": "v1.4.0",
    "env": "prod",
    "by": "bouchra-yildiz",
    "when": "vr 11:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g87",
    "app": "app-vragenlijst-engine",
    "version": "v1.7.0",
    "env": "prod",
    "by": "selin-blom",
    "when": "wo 14:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g90",
    "app": "app-notificatieservice",
    "version": "v1.0.0",
    "env": "prod",
    "by": "indy-bijl",
    "when": "gisteren 8:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g93",
    "app": "app-ideal-koppeling",
    "version": "v1.3.0",
    "env": "prod",
    "by": "ilias-theunissen",
    "when": "do 11:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g96",
    "app": "app-stelselcatalogus",
    "version": "v1.6.0",
    "env": "prod",
    "by": "yara-goossens",
    "when": "di 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g99",
    "app": "app-fsc-inway",
    "version": "v1.9.0",
    "env": "prod",
    "by": "maud-yilmaz",
    "when": "vr 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g102",
    "app": "app-aanbestedingsportaal",
    "version": "v1.2.0",
    "env": "prod",
    "by": "jasper-kaya",
    "when": "wo 11:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g105",
    "app": "app-personeelsdossier",
    "version": "v1.5.0",
    "env": "prod",
    "by": "mila-celik",
    "when": "gisteren 14:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g108",
    "app": "app-rooster-uitvoering",
    "version": "v1.8.0",
    "env": "prod",
    "by": "sanne-de-vries",
    "when": "do 8:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g111",
    "app": "app-handtekening-validatie",
    "version": "v1.1.0",
    "env": "prod",
    "by": "rachid-hendriks",
    "when": "di 11:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g114",
    "app": "app-kostenrapportage",
    "version": "v1.4.0",
    "env": "prod",
    "by": "yara-goossens",
    "when": "vr 14:00",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g117",
    "app": "app-inspectierapport-generator",
    "version": "v1.7.0",
    "env": "prod",
    "by": "eva-mohamed",
    "when": "wo 8:03",
    "notes": "Reguliere release"
  },
  {
    "id": "rel-g120",
    "app": "app-wob-verzoek",
    "version": "v1.0.0",
    "env": "prod",
    "by": "femke-meijer",
    "when": "gisteren 11:00",
    "notes": "Reguliere release"
  }
];

export const runners = [
  {
    "id": "pool-shared",
    "name": "shared",
    "team": "team-platform",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 12,
    "running": 7,
    "queued": 3,
    "node": "k8s-node-01",
    "rack": "r-dh-a1",
    "dc": "dc-denhaag",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-arm",
    "name": "arm64",
    "team": "team-platform",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "arm64"
    ],
    "status": "operationeel",
    "capacity": 4,
    "running": 1,
    "queued": 0,
    "node": "k8s-node-03",
    "rack": "r-dh-a3",
    "dc": "dc-denhaag",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-toeslagen",
    "name": "toeslagen-isolated",
    "team": "team-toeslagen",
    "kind": "team",
    "labels": [
      "toeslagen-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 6,
    "running": 6,
    "queued": 4,
    "node": "app-node-01",
    "rack": "r-dh-b1",
    "dc": "dc-denhaag",
    "os": "Fedora CoreOS",
    "autoscale": false
  },
  {
    "id": "pool-apeldoorn",
    "name": "apeldoorn-dr",
    "team": "team-platform",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "x64",
      "dr"
    ],
    "status": "stand-by",
    "capacity": 8,
    "running": 0,
    "queued": 0,
    "node": "k8s-node-ap-01",
    "rack": "r-ap-a1",
    "dc": "dc-apeldoorn",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-g0",
    "name": "pool-0",
    "team": "team-platform",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "arm64"
    ],
    "status": "operationeel",
    "capacity": 4,
    "running": 0,
    "queued": 0,
    "node": "k8s-node-03",
    "rack": "r-dh-a3",
    "dc": "dc-denhaag",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-g1",
    "name": "pool-1",
    "team": "team-data",
    "kind": "team",
    "labels": [
      "nldd-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 5,
    "running": 1,
    "queued": 1,
    "node": "node",
    "rack": "r-ap-a2",
    "dc": "dc-apeldoorn",
    "os": "Fedora CoreOS",
    "autoscale": false
  },
  {
    "id": "pool-g2",
    "name": "pool-2",
    "team": "team-ind-dossiers",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 6,
    "running": 2,
    "queued": 2,
    "node": "node-10-01",
    "rack": "r-dh-c4",
    "dc": "dc-denhaag",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-g3",
    "name": "pool-3",
    "team": "team-rvig-reisdocumenten",
    "kind": "team",
    "labels": [
      "nldd-runner",
      "linux",
      "arm64"
    ],
    "status": "operationeel",
    "capacity": 7,
    "running": 3,
    "queued": 0,
    "node": "node-14-01",
    "rack": "r-ap-b4",
    "dc": "dc-apeldoorn",
    "os": "Fedora CoreOS",
    "autoscale": false
  },
  {
    "id": "pool-g4",
    "name": "pool-4",
    "team": "team-kvk-handelsregister",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 8,
    "running": 4,
    "queued": 1,
    "node": "node-18-01",
    "rack": "r-zw-a4",
    "dc": "dc-zwolle",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-g5",
    "name": "pool-5",
    "team": "team-koop-wetten",
    "kind": "team",
    "labels": [
      "nldd-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 9,
    "running": 0,
    "queued": 2,
    "node": "node-22-01",
    "rack": "r-zw-b4",
    "dc": "dc-zwolle",
    "os": "Fedora CoreOS",
    "autoscale": false
  },
  {
    "id": "pool-g6",
    "name": "pool-6",
    "team": "team-fin-financieel",
    "kind": "gedeeld",
    "labels": [
      "nldd-runner",
      "linux",
      "arm64"
    ],
    "status": "operationeel",
    "capacity": 10,
    "running": 1,
    "queued": 0,
    "node": "node-26-01",
    "rack": "r-gr-a4",
    "dc": "dc-groningen",
    "os": "Fedora CoreOS",
    "autoscale": true
  },
  {
    "id": "pool-g7",
    "name": "pool-7",
    "team": "team-def-secinfra",
    "kind": "team",
    "labels": [
      "nldd-runner",
      "linux",
      "x64"
    ],
    "status": "operationeel",
    "capacity": 11,
    "running": 2,
    "queued": 1,
    "node": "node-30-01",
    "rack": "r-gr-b4",
    "dc": "dc-groningen",
    "os": "Fedora CoreOS",
    "autoscale": false
  }
];

export const ciJobs = [
  {
    "id": "job-7781",
    "repo": "repo-toeslagen",
    "workflow": "ci.yml",
    "branch": "feat/kafka-retry",
    "pool": "pool-toeslagen",
    "status": "failing",
    "duration": "3m12s",
    "by": "sanne",
    "at": "vandaag 09:07"
  },
  {
    "id": "job-7780",
    "repo": "repo-platformportaal",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-shared",
    "status": "running",
    "duration": "1m40s",
    "by": "ans",
    "at": "zojuist"
  },
  {
    "id": "job-7779",
    "repo": "repo-paspoort",
    "workflow": "ci.yml",
    "branch": "feat/machtigingen",
    "pool": "pool-shared",
    "status": "queued",
    "duration": "—",
    "by": "joost",
    "at": "zojuist"
  },
  {
    "id": "job-7778",
    "repo": "repo-datadeling",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-shared",
    "status": "passed",
    "duration": "2m05s",
    "by": "pieter",
    "at": "12 min geleden"
  },
  {
    "id": "job-7777",
    "repo": "repo-paspoort",
    "workflow": "deploy.yml",
    "branch": "main",
    "pool": "pool-shared",
    "status": "passed",
    "duration": "4m31s",
    "by": "joost",
    "at": "1 uur geleden"
  },
  {
    "id": "job-g0",
    "repo": "repo-kentekencheck",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-shared",
    "status": "passed",
    "duration": "1m00s",
    "by": "yara-goossens",
    "at": "0 min geleden"
  },
  {
    "id": "job-g1",
    "repo": "repo-inkomenstoets",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-arm",
    "status": "passed",
    "duration": "2m10s",
    "by": "aisha-el-khattabi",
    "at": "1 min geleden"
  },
  {
    "id": "job-g2",
    "repo": "repo-bijstandsuitkering",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-toeslagen",
    "status": "running",
    "duration": "3m20s",
    "by": "meryem-el-amrani",
    "at": "2 min geleden"
  },
  {
    "id": "job-g3",
    "repo": "repo-ww-aanvraag",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-apeldoorn",
    "status": "queued",
    "duration": "4m30s",
    "by": "rachid-hendriks",
    "at": "3 min geleden"
  },
  {
    "id": "job-g4",
    "repo": "repo-kinderbijslag",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g0",
    "status": "failing",
    "duration": "5m40s",
    "by": "rachid-hendriks",
    "at": "4 min geleden"
  },
  {
    "id": "job-g5",
    "repo": "repo-rijbewijs-vernieuwen",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g1",
    "status": "passed",
    "duration": "1m50s",
    "by": "ans-kaya",
    "at": "5 min geleden"
  },
  {
    "id": "job-g6",
    "repo": "repo-huurtoeslag-rekenen",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-g2",
    "status": "passed",
    "duration": "2m00s",
    "by": "casper-naber",
    "at": "6 min geleden"
  },
  {
    "id": "job-g7",
    "repo": "repo-bsn-validatie",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g3",
    "status": "running",
    "duration": "3m10s",
    "by": "julia-el-amrani",
    "at": "7 min geleden"
  },
  {
    "id": "job-g8",
    "repo": "repo-brp-bevraging",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g4",
    "status": "queued",
    "duration": "4m20s",
    "by": "tim-willems",
    "at": "8 min geleden"
  },
  {
    "id": "job-g9",
    "repo": "repo-boete-bezwaar",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-g5",
    "status": "failing",
    "duration": "5m30s",
    "by": "tariq-de-vries",
    "at": "9 min geleden"
  },
  {
    "id": "job-g10",
    "repo": "repo-zorgtoeslag-portaal",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g6",
    "status": "passed",
    "duration": "1m40s",
    "by": "marieke-van-rijn",
    "at": "10 min geleden"
  },
  {
    "id": "job-g11",
    "repo": "repo-vaccinatieregister",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g7",
    "status": "passed",
    "duration": "2m50s",
    "by": "jan-vermeulen",
    "at": "11 min geleden"
  },
  {
    "id": "job-g12",
    "repo": "repo-diplomaregister",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-shared",
    "status": "running",
    "duration": "3m00s",
    "by": "omar-van-es",
    "at": "12 min geleden"
  },
  {
    "id": "job-g13",
    "repo": "repo-omgevingsloket",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-arm",
    "status": "queued",
    "duration": "4m10s",
    "by": "luuk-bosman",
    "at": "13 min geleden"
  },
  {
    "id": "job-g14",
    "repo": "repo-waterschapsheffing",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-toeslagen",
    "status": "failing",
    "duration": "5m20s",
    "by": "noor-diks",
    "at": "14 min geleden"
  },
  {
    "id": "job-g15",
    "repo": "repo-rijksbegroting-explorer",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-apeldoorn",
    "status": "passed",
    "duration": "1m30s",
    "by": "teun-vos",
    "at": "15 min geleden"
  },
  {
    "id": "job-g16",
    "repo": "repo-etl-basisregisters",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g0",
    "status": "passed",
    "duration": "2m40s",
    "by": "romy-de-lange",
    "at": "16 min geleden"
  },
  {
    "id": "job-g17",
    "repo": "repo-archief-export",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g1",
    "status": "running",
    "duration": "3m50s",
    "by": "fenna-van-es",
    "at": "17 min geleden"
  },
  {
    "id": "job-g18",
    "repo": "repo-sepa-incasso-job",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-g2",
    "status": "queued",
    "duration": "4m00s",
    "by": "marieke-van-rijn",
    "at": "18 min geleden"
  },
  {
    "id": "job-g19",
    "repo": "repo-sanctielijst-check",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g3",
    "status": "failing",
    "duration": "5m10s",
    "by": "romy-de-lange",
    "at": "19 min geleden"
  },
  {
    "id": "job-g20",
    "repo": "repo-audit-logboek",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g4",
    "status": "passed",
    "duration": "1m20s",
    "by": "yara-goossens",
    "at": "20 min geleden"
  },
  {
    "id": "job-g21",
    "repo": "repo-rollenmatrix",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-g5",
    "status": "passed",
    "duration": "2m30s",
    "by": "eva-van-zanten",
    "at": "21 min geleden"
  },
  {
    "id": "job-g22",
    "repo": "repo-monitoring-collector",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g6",
    "status": "running",
    "duration": "3m40s",
    "by": "selin-blom",
    "at": "22 min geleden"
  },
  {
    "id": "job-g23",
    "repo": "repo-ci-runnerpool",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g7",
    "status": "queued",
    "duration": "4m50s",
    "by": "levi-lubbers",
    "at": "23 min geleden"
  },
  {
    "id": "job-g24",
    "repo": "repo-nldd-componenten",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-shared",
    "status": "failing",
    "duration": "5m00s",
    "by": "suze-mulder",
    "at": "24 min geleden"
  },
  {
    "id": "job-g25",
    "repo": "repo-api-catalogus",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-arm",
    "status": "passed",
    "duration": "1m10s",
    "by": "sven-ben-ali",
    "at": "25 min geleden"
  },
  {
    "id": "job-g26",
    "repo": "repo-pdf-generator",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-toeslagen",
    "status": "passed",
    "duration": "2m20s",
    "by": "gerard-polat",
    "at": "26 min geleden"
  },
  {
    "id": "job-g27",
    "repo": "repo-mijnoverheid-portaal",
    "workflow": "ci.yml",
    "branch": "main",
    "pool": "pool-apeldoorn",
    "status": "running",
    "duration": "3m30s",
    "by": "sanne-de-vries",
    "at": "27 min geleden"
  },
  {
    "id": "job-g28",
    "repo": "repo-afspraakplanner",
    "workflow": "ci.yml",
    "branch": "feat/x",
    "pool": "pool-g0",
    "status": "queued",
    "duration": "4m40s",
    "by": "lieke-el-idrissi",
    "at": "28 min geleden"
  },
  {
    "id": "job-g29",
    "repo": "repo-sms-gateway",
    "workflow": "ci.yml",
    "branch": "fix/y",
    "pool": "pool-g1",
    "status": "failing",
    "duration": "5m50s",
    "by": "mehmet-koster",
    "at": "29 min geleden"
  }
];

export const incidents = [
  {
    "id": "inc-2024-017",
    "title": "Verhoogde latency Toeslagenmotor",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-toeslagen",
    "team": "team-toeslagen",
    "opened": "vandaag 09:14",
    "oncall": "sanne",
    "timeline": [
      {
        "at": "09:14",
        "what": "Alert: p99 latency > 2s"
      },
      {
        "at": "09:21",
        "what": "Kafka-consumer lag vastgesteld"
      },
      {
        "at": "09:40",
        "what": "Extra replica bijgeschaald, gemitigeerd"
      }
    ]
  },
  {
    "id": "inc-2024-016",
    "title": "pg-burgerzaken-prod hoge temperatuur",
    "severity": "sev3",
    "status": "resolved",
    "service": "pg-burgerzaken-prod",
    "team": "team-burgerzaken",
    "opened": "gisteren 16:02",
    "oncall": "joost",
    "timeline": [
      {
        "at": "16:02",
        "what": "Koeling-alert rack DH-A1 (eigenaar Platform Engineering)"
      },
      {
        "at": "16:30",
        "what": "Airflow hersteld, opgelost"
      }
    ]
  },
  {
    "id": "inc-2025-100",
    "title": "Verstoring Kentekencheck",
    "severity": "sev1",
    "status": "open",
    "service": "app-kentekencheck",
    "team": "team-cbs-statline",
    "opened": "vandaag 8:10",
    "oncall": "yara-goossens",
    "timeline": [
      {
        "at": "09:00",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:30",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-101",
    "title": "Verstoring Inkomenstoets",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-inkomenstoets",
    "team": "team-nldd-iam",
    "opened": "gisteren 9:11",
    "oncall": "aisha-el-khattabi",
    "timeline": [
      {
        "at": "09:01",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:31",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-102",
    "title": "Verstoring Bijstandsuitkering",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-bijstandsuitkering",
    "team": "team-ezk-ondernemen",
    "opened": "di 10:12",
    "oncall": "meryem-el-amrani",
    "timeline": [
      {
        "at": "09:02",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:32",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-103",
    "title": "Verstoring WW-aanvraag",
    "severity": "sev1",
    "status": "open",
    "service": "app-ww-aanvraag",
    "team": "team-logius-docs",
    "opened": "wo 11:13",
    "oncall": "rachid-hendriks",
    "timeline": [
      {
        "at": "09:03",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:33",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-104",
    "title": "Verstoring Kinderbijslag",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-kinderbijslag",
    "team": "team-logius-docs",
    "opened": "vandaag 12:14",
    "oncall": "rachid-hendriks",
    "timeline": [
      {
        "at": "09:04",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:34",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-105",
    "title": "Verstoring Rijbewijs vernieuwen",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-rijbewijs-vernieuwen",
    "team": "team-bd-gegevens",
    "opened": "gisteren 13:15",
    "oncall": "ans-kaya",
    "timeline": [
      {
        "at": "09:05",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:35",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-106",
    "title": "Verstoring Huurtoeslag rekenen",
    "severity": "sev1",
    "status": "open",
    "service": "app-huurtoeslag-rekenen",
    "team": "team-aenm-keten",
    "opened": "di 14:10",
    "oncall": "casper-naber",
    "timeline": [
      {
        "at": "09:06",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:30",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-107",
    "title": "Verstoring BSN-validatie",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-bsn-validatie",
    "team": "team-duo-studiefinanciering",
    "opened": "wo 15:11",
    "oncall": "julia-el-amrani",
    "timeline": [
      {
        "at": "09:07",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:31",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-108",
    "title": "Verstoring BRP-bevraging",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-brp-bevraging",
    "team": "team-rvo-portaal",
    "opened": "vandaag 16:12",
    "oncall": "tim-willems",
    "timeline": [
      {
        "at": "09:08",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:32",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-109",
    "title": "Verstoring Boetebezwaar",
    "severity": "sev1",
    "status": "open",
    "service": "app-boete-bezwaar",
    "team": "team-szw-regelingen",
    "opened": "gisteren 17:13",
    "oncall": "tariq-de-vries",
    "timeline": [
      {
        "at": "09:00",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:33",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-110",
    "title": "Verstoring Zorgtoeslag portaal",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-zorgtoeslag-portaal",
    "team": "team-cbr-rijbewijs",
    "opened": "di 8:14",
    "oncall": "marieke-van-rijn",
    "timeline": [
      {
        "at": "09:01",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:34",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-111",
    "title": "Verstoring Vaccinatieregister",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-vaccinatieregister",
    "team": "team-vws-zorgregister",
    "opened": "wo 9:15",
    "oncall": "jan-vermeulen",
    "timeline": [
      {
        "at": "09:02",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:35",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-112",
    "title": "Verstoring Diplomaregister",
    "severity": "sev1",
    "status": "open",
    "service": "app-diplomaregister",
    "team": "team-bd-fraude",
    "opened": "vandaag 10:10",
    "oncall": "omar-van-es",
    "timeline": [
      {
        "at": "09:03",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:30",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-113",
    "title": "Verstoring Omgevingsloket",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-omgevingsloket",
    "team": "team-koop-wetten",
    "opened": "gisteren 11:11",
    "oncall": "luuk-bosman",
    "timeline": [
      {
        "at": "09:04",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:31",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-114",
    "title": "Verstoring Waterschapsheffing",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-waterschapsheffing",
    "team": "team-fin-platform",
    "opened": "di 12:12",
    "oncall": "noor-diks",
    "timeline": [
      {
        "at": "09:05",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:32",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-115",
    "title": "Verstoring Rijksbegroting-explorer",
    "severity": "sev1",
    "status": "open",
    "service": "app-rijksbegroting-explorer",
    "team": "team-ienw-kenteken",
    "opened": "wo 13:13",
    "oncall": "teun-vos",
    "timeline": [
      {
        "at": "09:06",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:33",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-116",
    "title": "Verstoring ETL Basisregisters",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-etl-basisregisters",
    "team": "team-ienw-voertuig",
    "opened": "vandaag 14:14",
    "oncall": "romy-de-lange",
    "timeline": [
      {
        "at": "09:07",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:34",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-117",
    "title": "Verstoring Archief-export",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-archief-export",
    "team": "team-jenv-keten",
    "opened": "gisteren 15:15",
    "oncall": "fenna-van-es",
    "timeline": [
      {
        "at": "09:08",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:35",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-118",
    "title": "Verstoring SEPA-incasso job",
    "severity": "sev1",
    "status": "open",
    "service": "app-sepa-incasso-job",
    "team": "team-cbr-rijbewijs",
    "opened": "di 16:10",
    "oncall": "marieke-van-rijn",
    "timeline": [
      {
        "at": "09:00",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:30",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-119",
    "title": "Verstoring Sanctielijst-check",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-sanctielijst-check",
    "team": "team-ienw-voertuig",
    "opened": "wo 17:11",
    "oncall": "romy-de-lange",
    "timeline": [
      {
        "at": "09:01",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:31",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-120",
    "title": "Verstoring Audit-logboek",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-audit-logboek",
    "team": "team-cbs-statline",
    "opened": "vandaag 8:12",
    "oncall": "yara-goossens",
    "timeline": [
      {
        "at": "09:02",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:32",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-121",
    "title": "Verstoring Rollenmatrix",
    "severity": "sev1",
    "status": "open",
    "service": "app-rollenmatrix",
    "team": "team-ind-data",
    "opened": "gisteren 9:13",
    "oncall": "eva-van-zanten",
    "timeline": [
      {
        "at": "09:03",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:33",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-122",
    "title": "Verstoring Monitoring-collector",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-monitoring-collector",
    "team": "team-nza-zorgdata",
    "opened": "di 10:14",
    "oncall": "selin-blom",
    "timeline": [
      {
        "at": "09:04",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:34",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-123",
    "title": "Verstoring CI-runnerpool",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-ci-runnerpool",
    "team": "team-ocw-cultuurdata",
    "opened": "wo 11:15",
    "oncall": "levi-lubbers",
    "timeline": [
      {
        "at": "09:05",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:35",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-124",
    "title": "Verstoring NL Design System-componenten",
    "severity": "sev1",
    "status": "open",
    "service": "app-nldd-componenten",
    "team": "team-dhc-geschillen",
    "opened": "vandaag 12:10",
    "oncall": "suze-mulder",
    "timeline": [
      {
        "at": "09:06",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:30",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-125",
    "title": "Verstoring API-catalogus",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-api-catalogus",
    "team": "team-rvig-brp",
    "opened": "gisteren 13:11",
    "oncall": "sven-ben-ali",
    "timeline": [
      {
        "at": "09:07",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:31",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-126",
    "title": "Verstoring PDF-generator",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-pdf-generator",
    "team": "team-rws-sensoren",
    "opened": "di 14:12",
    "oncall": "gerard-polat",
    "timeline": [
      {
        "at": "09:08",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:32",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-127",
    "title": "Verstoring MijnOverheid-portaal",
    "severity": "sev1",
    "status": "open",
    "service": "app-mijnoverheid-portaal",
    "team": "team-bd-inning",
    "opened": "wo 15:13",
    "oncall": "sanne-de-vries",
    "timeline": [
      {
        "at": "09:00",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:33",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-128",
    "title": "Verstoring Afspraakplanner",
    "severity": "sev2",
    "status": "mitigated",
    "service": "app-afspraakplanner",
    "team": "team-ksa-handhaving",
    "opened": "vandaag 16:14",
    "oncall": "lieke-el-idrissi",
    "timeline": [
      {
        "at": "09:01",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:34",
        "what": "Mitigatie toegepast"
      }
    ]
  },
  {
    "id": "inc-2025-129",
    "title": "Verstoring SMS-gateway",
    "severity": "sev3",
    "status": "resolved",
    "service": "app-sms-gateway",
    "team": "team-svb-gegevens",
    "opened": "gisteren 17:15",
    "oncall": "mehmet-koster",
    "timeline": [
      {
        "at": "09:02",
        "what": "Alert ontvangen"
      },
      {
        "at": "09:35",
        "what": "Mitigatie toegepast"
      }
    ]
  }
];

export const changes = [
  {
    "id": "chg-221",
    "title": "Postgres major upgrade 15→16",
    "risk": "middel",
    "status": "goedgekeurd",
    "window": "za 02:00–04:00",
    "team": "team-platform"
  },
  {
    "id": "chg-222",
    "title": "Nieuwe leaf-switch DH-A3",
    "risk": "laag",
    "status": "in beoordeling",
    "window": "wo 20:00",
    "team": "team-platform"
  },
  {
    "id": "chg-310",
    "title": "Wijziging Kentekencheck",
    "risk": "laag",
    "status": "in beoordeling",
    "window": "za 02:00",
    "team": "team-cbs-statline"
  },
  {
    "id": "chg-311",
    "title": "Wijziging Reisdocument-aanvraag",
    "risk": "middel",
    "status": "goedgekeurd",
    "window": "wo 20:00",
    "team": "team-kvk-handelsregister"
  },
  {
    "id": "chg-312",
    "title": "Wijziging Inspectieplanner ILT",
    "risk": "hoog",
    "status": "in beoordeling",
    "window": "zo 06:00",
    "team": "team-rvo-portaal"
  },
  {
    "id": "chg-313",
    "title": "Wijziging Rijbewijs vernieuwen",
    "risk": "laag",
    "status": "goedgekeurd",
    "window": "za 02:00",
    "team": "team-bd-gegevens"
  },
  {
    "id": "chg-314",
    "title": "Wijziging eHerkenning-broker",
    "risk": "middel",
    "status": "in beoordeling",
    "window": "wo 20:00",
    "team": "team-acm-toezicht"
  },
  {
    "id": "chg-315",
    "title": "Wijziging Handelsregister-zoeker",
    "risk": "hoog",
    "status": "goedgekeurd",
    "window": "zo 06:00",
    "team": "team-az-comms"
  },
  {
    "id": "chg-316",
    "title": "Wijziging Zorgtoeslag portaal",
    "risk": "laag",
    "status": "in beoordeling",
    "window": "za 02:00",
    "team": "team-cbr-rijbewijs"
  },
  {
    "id": "chg-317",
    "title": "Wijziging Onderwijsregistratie DUO",
    "risk": "middel",
    "status": "goedgekeurd",
    "window": "wo 20:00",
    "team": "team-acm-toezicht"
  },
  {
    "id": "chg-318",
    "title": "Wijziging Bouwvergunning",
    "risk": "hoog",
    "status": "in beoordeling",
    "window": "zo 06:00",
    "team": "team-dictu-data"
  },
  {
    "id": "chg-319",
    "title": "Wijziging Rijksbegroting-explorer",
    "risk": "laag",
    "status": "goedgekeurd",
    "window": "za 02:00",
    "team": "team-ienw-kenteken"
  },
  {
    "id": "chg-320",
    "title": "Wijziging Anonimisering-pipeline",
    "risk": "middel",
    "status": "in beoordeling",
    "window": "wo 20:00",
    "team": "team-ind-data"
  },
  {
    "id": "chg-321",
    "title": "Wijziging Fraudedetectie",
    "risk": "hoog",
    "status": "goedgekeurd",
    "window": "zo 06:00",
    "team": "team-ienw-data"
  }
];

export const alerts = [
  {
    "id": "al-1",
    "service": "app-toeslagen",
    "severity": "warning",
    "text": "p99 latency boven SLO",
    "since": "34 min"
  },
  {
    "id": "al-2",
    "service": "pg-burgerzaken-prod",
    "severity": "warning",
    "text": "disk 78% vol",
    "since": "2 uur"
  },
  {
    "id": "al-g0",
    "service": "app-kentekencheck",
    "severity": "warning",
    "text": "p99 latency hoog",
    "since": "5 min"
  },
  {
    "id": "al-g1",
    "service": "app-aangifte-omzetbelasting",
    "severity": "critical",
    "text": "foutpercentage gestegen",
    "since": "6 min"
  },
  {
    "id": "al-g2",
    "service": "app-subsidieportaal-rvo",
    "severity": "warning",
    "text": "geheugen bijna vol",
    "since": "7 min"
  },
  {
    "id": "al-g3",
    "service": "app-kinderbijslag",
    "severity": "critical",
    "text": "p99 latency hoog",
    "since": "8 min"
  },
  {
    "id": "al-g4",
    "service": "app-naturalisatie-aanvraag",
    "severity": "warning",
    "text": "foutpercentage gestegen",
    "since": "9 min"
  },
  {
    "id": "al-g5",
    "service": "app-eherkenning-broker",
    "severity": "critical",
    "text": "geheugen bijna vol",
    "since": "10 min"
  },
  {
    "id": "al-g6",
    "service": "app-brp-bevraging",
    "severity": "warning",
    "text": "p99 latency hoog",
    "since": "11 min"
  },
  {
    "id": "al-g7",
    "service": "app-belastingaangifte-ib",
    "severity": "critical",
    "text": "foutpercentage gestegen",
    "since": "12 min"
  },
  {
    "id": "al-g8",
    "service": "app-zorgverzekeraar-koppeling",
    "severity": "warning",
    "text": "geheugen bijna vol",
    "since": "13 min"
  },
  {
    "id": "al-g9",
    "service": "app-diplomaregister",
    "severity": "critical",
    "text": "p99 latency hoog",
    "since": "14 min"
  },
  {
    "id": "al-g10",
    "service": "app-bouwvergunning",
    "severity": "warning",
    "text": "foutpercentage gestegen",
    "since": "15 min"
  },
  {
    "id": "al-g11",
    "service": "app-parkeervergunning",
    "severity": "critical",
    "text": "geheugen bijna vol",
    "since": "16 min"
  },
  {
    "id": "al-g12",
    "service": "app-etl-basisregisters",
    "severity": "warning",
    "text": "p99 latency hoog",
    "since": "17 min"
  },
  {
    "id": "al-g13",
    "service": "app-nachtelijke-batchrun",
    "severity": "critical",
    "text": "foutpercentage gestegen",
    "since": "18 min"
  }
];

export const slos = [
  {
    "service": "app-paspoort",
    "target": 99.9,
    "current": 99.95,
    "budgetLeft": 62
  },
  {
    "service": "app-toeslagen",
    "target": 99.5,
    "current": 99.2,
    "budgetLeft": 8
  },
  {
    "service": "app-platformportaal",
    "target": 99.9,
    "current": 99.99,
    "budgetLeft": 91
  },
  {
    "service": "app-kentekencheck",
    "target": 99.9,
    "current": 99,
    "budgetLeft": 10
  },
  {
    "service": "app-vergunningchecker",
    "target": 99.5,
    "current": 99.1,
    "budgetLeft": 17
  },
  {
    "service": "app-aangifte-omzetbelasting",
    "target": 99.95,
    "current": 99.2,
    "budgetLeft": 24
  },
  {
    "service": "app-bijstandsuitkering",
    "target": 99.9,
    "current": 99.3,
    "budgetLeft": 31
  },
  {
    "service": "app-subsidieportaal-rvo",
    "target": 99.5,
    "current": 99.4,
    "budgetLeft": 38
  },
  {
    "service": "app-inspectieplanner-ilt",
    "target": 99.95,
    "current": 99.5,
    "budgetLeft": 45
  },
  {
    "service": "app-kinderbijslag",
    "target": 99.9,
    "current": 99.6,
    "budgetLeft": 52
  },
  {
    "service": "app-bezwaarafhandeling",
    "target": 99.5,
    "current": 99.7,
    "budgetLeft": 59
  },
  {
    "service": "app-naturalisatie-aanvraag",
    "target": 99.95,
    "current": 99.8,
    "budgetLeft": 66
  },
  {
    "service": "app-huurtoeslag-rekenen",
    "target": 99.9,
    "current": 99.9,
    "budgetLeft": 73
  },
  {
    "service": "app-eherkenning-broker",
    "target": 99.5,
    "current": 99,
    "budgetLeft": 80
  },
  {
    "service": "app-iban-validatie",
    "target": 99.95,
    "current": 99.1,
    "budgetLeft": 87
  },
  {
    "service": "app-brp-bevraging",
    "target": 99.9,
    "current": 99.2,
    "budgetLeft": 14
  },
  {
    "service": "app-incasso-cjib",
    "target": 99.5,
    "current": 99.3,
    "budgetLeft": 21
  },
  {
    "service": "app-belastingaangifte-ib",
    "target": 99.95,
    "current": 99.4,
    "budgetLeft": 28
  },
  {
    "service": "app-zorgtoeslag-portaal",
    "target": 99.9,
    "current": 99.5,
    "budgetLeft": 35
  },
  {
    "service": "app-zorgverzekeraar-koppeling",
    "target": 99.5,
    "current": 99.6,
    "budgetLeft": 42
  },
  {
    "service": "app-jeugdzorg-dossier",
    "target": 99.95,
    "current": 99.7,
    "budgetLeft": 49
  },
  {
    "service": "app-diplomaregister",
    "target": 99.9,
    "current": 99.8,
    "budgetLeft": 56
  },
  {
    "service": "app-studielening-rekentool",
    "target": 99.5,
    "current": 99.9,
    "budgetLeft": 63
  }
];

export const vulnerabilities = [
  {
    "id": "cve-1",
    "cve": "CVE-2024-3094",
    "severity": "critical",
    "repo": "repo-toeslagen",
    "app": "app-toeslagen",
    "team": "team-toeslagen",
    "status": "in behandeling"
  },
  {
    "id": "cve-2",
    "cve": "CVE-2023-44487",
    "severity": "high",
    "repo": "repo-datadeling",
    "app": "app-datadeling",
    "team": "team-data",
    "status": "opgelost"
  },
  {
    "id": "cve-g0",
    "cve": "CVE-2024-3094",
    "severity": "critical",
    "repo": "repo-kentekencheck",
    "app": "app-kentekencheck",
    "team": "team-cbs-statline",
    "status": "open"
  },
  {
    "id": "cve-g1",
    "cve": "CVE-2023-44487",
    "severity": "high",
    "repo": "repo-bijstandsuitkering",
    "app": "app-bijstandsuitkering",
    "team": "team-ezk-ondernemen",
    "status": "in behandeling"
  },
  {
    "id": "cve-g2",
    "cve": "CVE-2024-21626",
    "severity": "medium",
    "repo": "repo-kinderbijslag",
    "app": "app-kinderbijslag",
    "team": "team-logius-docs",
    "status": "opgelost"
  },
  {
    "id": "cve-g3",
    "cve": "CVE-2022-0847",
    "severity": "low",
    "repo": "repo-huurtoeslag-rekenen",
    "app": "app-huurtoeslag-rekenen",
    "team": "team-aenm-keten",
    "status": "open"
  },
  {
    "id": "cve-g4",
    "cve": "CVE-2021-44228",
    "severity": "critical",
    "repo": "repo-brp-bevraging",
    "app": "app-brp-bevraging",
    "team": "team-rvo-portaal",
    "status": "in behandeling"
  },
  {
    "id": "cve-g5",
    "cve": "CVE-2024-3094",
    "severity": "high",
    "repo": "repo-zorgtoeslag-portaal",
    "app": "app-zorgtoeslag-portaal",
    "team": "team-cbr-rijbewijs",
    "status": "opgelost"
  },
  {
    "id": "cve-g6",
    "cve": "CVE-2023-44487",
    "severity": "medium",
    "repo": "repo-diplomaregister",
    "app": "app-diplomaregister",
    "team": "team-bd-fraude",
    "status": "open"
  },
  {
    "id": "cve-g7",
    "cve": "CVE-2024-21626",
    "severity": "low",
    "repo": "repo-waterschapsheffing",
    "app": "app-waterschapsheffing",
    "team": "team-fin-platform",
    "status": "in behandeling"
  },
  {
    "id": "cve-g8",
    "cve": "CVE-2022-0847",
    "severity": "critical",
    "repo": "repo-etl-basisregisters",
    "app": "app-etl-basisregisters",
    "team": "team-ienw-voertuig",
    "status": "opgelost"
  },
  {
    "id": "cve-g9",
    "cve": "CVE-2021-44228",
    "severity": "high",
    "repo": "repo-sepa-incasso-job",
    "app": "app-sepa-incasso-job",
    "team": "team-cbr-rijbewijs",
    "status": "open"
  },
  {
    "id": "cve-g10",
    "cve": "CVE-2024-3094",
    "severity": "medium",
    "repo": "repo-audit-logboek",
    "app": "app-audit-logboek",
    "team": "team-cbs-statline",
    "status": "in behandeling"
  },
  {
    "id": "cve-g11",
    "cve": "CVE-2023-44487",
    "severity": "low",
    "repo": "repo-monitoring-collector",
    "app": "app-monitoring-collector",
    "team": "team-nza-zorgdata",
    "status": "opgelost"
  },
  {
    "id": "cve-g12",
    "cve": "CVE-2024-21626",
    "severity": "critical",
    "repo": "repo-nldd-componenten",
    "app": "app-nldd-componenten",
    "team": "team-dhc-geschillen",
    "status": "open"
  },
  {
    "id": "cve-g13",
    "cve": "CVE-2022-0847",
    "severity": "high",
    "repo": "repo-pdf-generator",
    "app": "app-pdf-generator",
    "team": "team-rws-sensoren",
    "status": "in behandeling"
  },
  {
    "id": "cve-g14",
    "cve": "CVE-2021-44228",
    "severity": "medium",
    "repo": "repo-afspraakplanner",
    "app": "app-afspraakplanner",
    "team": "team-ksa-handhaving",
    "status": "opgelost"
  },
  {
    "id": "cve-g15",
    "cve": "CVE-2024-3094",
    "severity": "low",
    "repo": "repo-machtigingenregister",
    "app": "app-machtigingenregister",
    "team": "team-ocw-cultuurdata",
    "status": "open"
  }
];

export const complianceControls = [
  "encryptie",
  "logging",
  "toegang",
  "patch-status",
  "back-ups",
  "toegankelijkheid"
];

export const secrets = [
  {
    "id": "sec-1",
    "name": "paspoort/db-password",
    "type": "DB-wachtwoord",
    "team": "team-burgerzaken",
    "rotated": "12 dagen geleden",
    "expires": "over 78 dagen"
  },
  {
    "id": "sec-2",
    "name": "toeslagen/kafka-api-key",
    "type": "API-key",
    "team": "team-toeslagen",
    "rotated": "3 dagen geleden",
    "expires": "over 87 dagen"
  },
  {
    "id": "sec-3",
    "name": "platform/llm-gateway-key",
    "type": "API-key",
    "team": "team-platform",
    "rotated": "1 dag geleden",
    "expires": "over 89 dagen"
  },
  {
    "id": "sec-g0",
    "name": "kentekencheck/db-password",
    "type": "DB-wachtwoord",
    "team": "team-cbs-statline",
    "rotated": "1 dagen geleden",
    "expires": "over 30 dagen"
  },
  {
    "id": "sec-g1",
    "name": "inkomenstoets/db-password",
    "type": "API-key",
    "team": "team-nldd-iam",
    "rotated": "2 dagen geleden",
    "expires": "over 31 dagen"
  },
  {
    "id": "sec-g2",
    "name": "bijstandsuitkering/db-password",
    "type": "certificaat",
    "team": "team-ezk-ondernemen",
    "rotated": "3 dagen geleden",
    "expires": "over 32 dagen"
  },
  {
    "id": "sec-g3",
    "name": "ww-aanvraag/db-password",
    "type": "DB-wachtwoord",
    "team": "team-logius-docs",
    "rotated": "4 dagen geleden",
    "expires": "over 33 dagen"
  },
  {
    "id": "sec-g4",
    "name": "kinderbijslag/db-password",
    "type": "API-key",
    "team": "team-logius-docs",
    "rotated": "5 dagen geleden",
    "expires": "over 34 dagen"
  },
  {
    "id": "sec-g5",
    "name": "rijbewijs-vernieuwen/db-password",
    "type": "certificaat",
    "team": "team-bd-gegevens",
    "rotated": "6 dagen geleden",
    "expires": "over 35 dagen"
  },
  {
    "id": "sec-g6",
    "name": "huurtoeslag-rekenen/db-password",
    "type": "DB-wachtwoord",
    "team": "team-aenm-keten",
    "rotated": "7 dagen geleden",
    "expires": "over 36 dagen"
  },
  {
    "id": "sec-g7",
    "name": "bsn-validatie/db-password",
    "type": "API-key",
    "team": "team-duo-studiefinanciering",
    "rotated": "8 dagen geleden",
    "expires": "over 37 dagen"
  },
  {
    "id": "sec-g8",
    "name": "brp-bevraging/db-password",
    "type": "certificaat",
    "team": "team-rvo-portaal",
    "rotated": "9 dagen geleden",
    "expires": "over 38 dagen"
  },
  {
    "id": "sec-g9",
    "name": "boete-bezwaar/db-password",
    "type": "DB-wachtwoord",
    "team": "team-szw-regelingen",
    "rotated": "10 dagen geleden",
    "expires": "over 39 dagen"
  },
  {
    "id": "sec-g10",
    "name": "zorgtoeslag-portaal/db-password",
    "type": "API-key",
    "team": "team-cbr-rijbewijs",
    "rotated": "11 dagen geleden",
    "expires": "over 40 dagen"
  },
  {
    "id": "sec-g11",
    "name": "vaccinatieregister/db-password",
    "type": "certificaat",
    "team": "team-vws-zorgregister",
    "rotated": "12 dagen geleden",
    "expires": "over 41 dagen"
  },
  {
    "id": "sec-g12",
    "name": "diplomaregister/db-password",
    "type": "DB-wachtwoord",
    "team": "team-bd-fraude",
    "rotated": "13 dagen geleden",
    "expires": "over 42 dagen"
  },
  {
    "id": "sec-g13",
    "name": "omgevingsloket/db-password",
    "type": "API-key",
    "team": "team-koop-wetten",
    "rotated": "14 dagen geleden",
    "expires": "over 43 dagen"
  },
  {
    "id": "sec-g14",
    "name": "waterschapsheffing/db-password",
    "type": "certificaat",
    "team": "team-fin-platform",
    "rotated": "15 dagen geleden",
    "expires": "over 44 dagen"
  },
  {
    "id": "sec-g15",
    "name": "rijksbegroting-explorer/db-password",
    "type": "DB-wachtwoord",
    "team": "team-ienw-kenteken",
    "rotated": "16 dagen geleden",
    "expires": "over 45 dagen"
  },
  {
    "id": "sec-g16",
    "name": "etl-basisregisters/db-password",
    "type": "API-key",
    "team": "team-ienw-voertuig",
    "rotated": "17 dagen geleden",
    "expires": "over 46 dagen"
  },
  {
    "id": "sec-g17",
    "name": "archief-export/db-password",
    "type": "certificaat",
    "team": "team-jenv-keten",
    "rotated": "18 dagen geleden",
    "expires": "over 47 dagen"
  },
  {
    "id": "sec-g18",
    "name": "sepa-incasso-job/db-password",
    "type": "DB-wachtwoord",
    "team": "team-cbr-rijbewijs",
    "rotated": "19 dagen geleden",
    "expires": "over 48 dagen"
  },
  {
    "id": "sec-g19",
    "name": "sanctielijst-check/db-password",
    "type": "API-key",
    "team": "team-ienw-voertuig",
    "rotated": "20 dagen geleden",
    "expires": "over 49 dagen"
  },
  {
    "id": "sec-g20",
    "name": "audit-logboek/db-password",
    "type": "certificaat",
    "team": "team-cbs-statline",
    "rotated": "21 dagen geleden",
    "expires": "over 50 dagen"
  },
  {
    "id": "sec-g21",
    "name": "rollenmatrix/db-password",
    "type": "DB-wachtwoord",
    "team": "team-ind-data",
    "rotated": "22 dagen geleden",
    "expires": "over 51 dagen"
  },
  {
    "id": "sec-g22",
    "name": "monitoring-collector/db-password",
    "type": "API-key",
    "team": "team-nza-zorgdata",
    "rotated": "23 dagen geleden",
    "expires": "over 52 dagen"
  },
  {
    "id": "sec-g23",
    "name": "ci-runnerpool/db-password",
    "type": "certificaat",
    "team": "team-ocw-cultuurdata",
    "rotated": "24 dagen geleden",
    "expires": "over 53 dagen"
  },
  {
    "id": "sec-g24",
    "name": "nldd-componenten/db-password",
    "type": "DB-wachtwoord",
    "team": "team-dhc-geschillen",
    "rotated": "25 dagen geleden",
    "expires": "over 54 dagen"
  },
  {
    "id": "sec-g25",
    "name": "api-catalogus/db-password",
    "type": "API-key",
    "team": "team-rvig-brp",
    "rotated": "26 dagen geleden",
    "expires": "over 55 dagen"
  },
  {
    "id": "sec-g26",
    "name": "pdf-generator/db-password",
    "type": "certificaat",
    "team": "team-rws-sensoren",
    "rotated": "27 dagen geleden",
    "expires": "over 56 dagen"
  },
  {
    "id": "sec-g27",
    "name": "mijnoverheid-portaal/db-password",
    "type": "DB-wachtwoord",
    "team": "team-bd-inning",
    "rotated": "28 dagen geleden",
    "expires": "over 57 dagen"
  },
  {
    "id": "sec-g28",
    "name": "afspraakplanner/db-password",
    "type": "API-key",
    "team": "team-ksa-handhaving",
    "rotated": "29 dagen geleden",
    "expires": "over 58 dagen"
  },
  {
    "id": "sec-g29",
    "name": "sms-gateway/db-password",
    "type": "certificaat",
    "team": "team-svb-gegevens",
    "rotated": "30 dagen geleden",
    "expires": "over 59 dagen"
  }
];

export const certificates = [
  {
    "id": "cert-aanvraag-1",
    "cn": "*.nieuwedienst.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "n.v.t.",
    "service": "app-omgevingsloket",
    "status": "aangevraagd",
    "tsp": "KPN",
    "oin": "00000001823288444000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "2 dagen geleden, wacht op TSP-validatie"
  },
  {
    "id": "cert-verlopen-1",
    "cn": "*.milieumelding.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "verlopen",
    "service": "app-milieumelding",
    "status": "verlopen",
    "tsp": "Digidentity",
    "oin": "00000001821002193000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "handmatig aangevraagd, vernieuwing vergeten"
  },
  {
    "id": "cert-1",
    "cn": "*.rijks.app",
    "ca": "PKIoverheid",
    "expires": "over 120 dagen",
    "service": "app-platformportaal",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001002564440000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-2",
    "cn": "api.datadeling.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 30 dagen",
    "service": "app-datadeling",
    "status": "verloopt binnenkort",
    "tsp": "KPN",
    "oin": "00000001003214345000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g0",
    "cn": "*.kentekencheck.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 20 dagen",
    "service": "app-kentekencheck",
    "status": "verloopt binnenkort",
    "tsp": "Digidentity",
    "oin": "00000001003214345000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g1",
    "cn": "*.kadaster-viewer.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 28 dagen",
    "service": "app-kadaster-viewer",
    "status": "verloopt binnenkort",
    "tsp": "Digidentity",
    "oin": "00000001821002193000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g2",
    "cn": "*.bezwaarafhandeling.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 36 dagen",
    "service": "app-bezwaarafhandeling",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001003214345000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g3",
    "cn": "*.bsn-validatie.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 44 dagen",
    "service": "app-bsn-validatie",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001002564440000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g4",
    "cn": "*.belastingaangifte-ib.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 52 dagen",
    "service": "app-belastingaangifte-ib",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001821002193000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "handmatig aangevraagd"
  },
  {
    "id": "cert-g5",
    "cn": "*.onderwijsregistratie.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 60 dagen",
    "service": "app-onderwijsregistratie",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001002564440000",
    "keyType": "ECDSA P-384",
    "autoRenew": false,
    "requested": "handmatig aangevraagd"
  },
  {
    "id": "cert-g6",
    "cn": "*.waterschapsheffing.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 68 dagen",
    "service": "app-waterschapsheffing",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001003214345000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g7",
    "cn": "*.datakwaliteit-monitor.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 76 dagen",
    "service": "app-datakwaliteit-monitor",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001821002193000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g8",
    "cn": "*.risicoscoring.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 84 dagen",
    "service": "app-risicoscoring",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001003214345000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "handmatig aangevraagd"
  },
  {
    "id": "cert-g9",
    "cn": "*.rollenmatrix.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 92 dagen",
    "service": "app-rollenmatrix",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001003214345000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g10",
    "cn": "*.feature-flags.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 100 dagen",
    "service": "app-feature-flags",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001821002193000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g11",
    "cn": "*.toegankelijkheid-scanner.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 108 dagen",
    "service": "app-toegankelijkheid-scanner",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001821002193000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-g12",
    "cn": "*.afspraakplanner.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 116 dagen",
    "service": "app-afspraakplanner",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001821002193000",
    "keyType": "ECDSA P-384",
    "autoRenew": false,
    "requested": "handmatig aangevraagd"
  },
  {
    "id": "cert-g13",
    "cn": "*.gegevensmakelaar.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 124 dagen",
    "service": "app-gegevensmakelaar",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001002564440000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "handmatig aangevraagd"
  },
  {
    "id": "cert-toeslagen",
    "cn": "*.toeslagen.nl",
    "ca": "PKIoverheid",
    "expires": "over 304 dagen",
    "service": "app-toeslagen",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001003214345000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-wild-overheid",
    "cn": "*.overheid.nl",
    "ca": "PKIoverheid",
    "expires": "over 149 dagen",
    "service": "app-platformportaal",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001002564440000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-studie",
    "cn": "*.studiefinanciering.nl",
    "ca": "PKIoverheid",
    "expires": "over 174 dagen",
    "service": "app-studiefinanciering-portaal",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001821002193000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-paspoort",
    "cn": "*.paspoortaanvraag.nl",
    "ca": "PKIoverheid",
    "expires": "over 145 dagen",
    "service": "app-paspoort",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001003214345000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-aangifte",
    "cn": "*.aangifte.belastingdienst.nl",
    "ca": "PKIoverheid",
    "expires": "over 85 dagen",
    "service": "app-aangifte-omzetbelasting",
    "status": "geldig",
    "tsp": "Digidentity",
    "oin": "00000001003214345000",
    "keyType": "RSA 2048",
    "autoRenew": false,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-verblijf",
    "cn": "*.verblijfsvergunning.ind.nl",
    "ca": "PKIoverheid",
    "expires": "over 60 dagen",
    "service": "app-verblijfsvergunning",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001821002193000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-omgevingsloket",
    "cn": "*.omgevingsloket.nl",
    "ca": "PKIoverheid",
    "expires": "over 79 dagen",
    "service": "app-omgevingsloket",
    "status": "geldig",
    "tsp": "QuoVadis",
    "oin": "00000001821002193000",
    "keyType": "RSA 2048",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-subsidie",
    "cn": "*.subsidie.rvo.nl",
    "ca": "PKIoverheid",
    "expires": "over 300 dagen",
    "service": "app-subsidieportaal-rvo",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001002564440000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-statistiek",
    "cn": "*.statline.cbs.nl",
    "ca": "PKIoverheid",
    "expires": "over 238 dagen",
    "service": "app-statistiek-dashboard-cbs",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001002564440000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  },
  {
    "id": "cert-verkeersboete",
    "cn": "*.verkeersboetes.cjib.nl",
    "ca": "PKIoverheid",
    "expires": "over 260 dagen",
    "service": "app-verkeersboete-viewer",
    "status": "geldig",
    "tsp": "KPN",
    "oin": "00000001002564440000",
    "keyType": "ECDSA P-384",
    "autoRenew": true,
    "requested": "automatisch vernieuwd op T-21"
  }

];

export const apis = [
  {
    "id": "api-1",
    "name": "Paspoort API",
    "version": "v2",
    "owner": "team-burgerzaken",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-2",
    "name": "Datadeling API",
    "version": "v1",
    "owner": "team-data",
    "adr": true,
    "rateLimit": "50/s",
    "status": "productie"
  },
  {
    "id": "api-3",
    "name": "Toeslagen API",
    "version": "v1",
    "owner": "team-toeslagen",
    "adr": false,
    "rateLimit": "20/s",
    "status": "beta"
  },
  {
    "id": "api-g0",
    "name": "Kentekencheck API",
    "version": "v1",
    "owner": "team-cbs-statline",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g1",
    "name": "Vergunningchecker API",
    "version": "v2",
    "owner": "team-kvk-api",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g2",
    "name": "Inkomenstoets API",
    "version": "v3",
    "owner": "team-nldd-iam",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g3",
    "name": "Aangifte Omzetbelasting API",
    "version": "v1",
    "owner": "team-koop-officielebekendmakingen",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g4",
    "name": "Bijstandsuitkering API",
    "version": "v2",
    "owner": "team-ezk-ondernemen",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g5",
    "name": "WW-aanvraag API",
    "version": "v3",
    "owner": "team-logius-docs",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g6",
    "name": "Inspectieplanner ILT API",
    "version": "v1",
    "owner": "team-rvo-portaal",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g7",
    "name": "AOW-uitkering API",
    "version": "v2",
    "owner": "team-rvo-geodata",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g8",
    "name": "Kinderbijslag API",
    "version": "v3",
    "owner": "team-logius-docs",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g9",
    "name": "Bezwaarafhandeling API",
    "version": "v1",
    "owner": "team-dictu-data",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g10",
    "name": "Naturalisatie-aanvraag API",
    "version": "v2",
    "owner": "team-duo-studiefinanciering",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g11",
    "name": "Verblijfsvergunning IND API",
    "version": "v3",
    "owner": "team-dpc-rijksoverheid",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g12",
    "name": "Huurtoeslag rekenen API",
    "version": "v1",
    "owner": "team-aenm-keten",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g13",
    "name": "eHerkenning-broker API",
    "version": "v2",
    "owner": "team-acm-toezicht",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g14",
    "name": "Adrescheck BAG API",
    "version": "v3",
    "owner": "team-svb-kinderbijslag",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g15",
    "name": "BRP-bevraging API",
    "version": "v1",
    "owner": "team-rvo-portaal",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g16",
    "name": "Incasso CJIB API",
    "version": "v2",
    "owner": "team-duo-studiefinanciering",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g17",
    "name": "Belastingaangifte IB API",
    "version": "v3",
    "owner": "team-uwv-gegevens",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g18",
    "name": "Loonheffing API",
    "version": "v1",
    "owner": "team-bd-gegevens",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g19",
    "name": "PGB-beheer API",
    "version": "v2",
    "owner": "team-acm-toezicht",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g20",
    "name": "Zorgverzekeraar-koppeling API",
    "version": "v3",
    "owner": "team-ezk-ondernemen",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g21",
    "name": "Vaccinatieregister API",
    "version": "v1",
    "owner": "team-vws-zorgregister",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g22",
    "name": "Jeugdzorg-dossier API",
    "version": "v2",
    "owner": "team-jenv-keten",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g23",
    "name": "Onderwijsregistratie DUO API",
    "version": "v3",
    "owner": "team-acm-toezicht",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g24",
    "name": "Diplomaregister API",
    "version": "v1",
    "owner": "team-bd-fraude",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g25",
    "name": "Leerplicht-melding API",
    "version": "v2",
    "owner": "team-logius-stelsel",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g26",
    "name": "Bouwvergunning API",
    "version": "v3",
    "owner": "team-dictu-data",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g27",
    "name": "Milieumelding API",
    "version": "v1",
    "owner": "team-ind-data",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g28",
    "name": "Waterschapsheffing API",
    "version": "v2",
    "owner": "team-fin-platform",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g29",
    "name": "Fraudedetectie API",
    "version": "v3",
    "owner": "team-ienw-data",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g30",
    "name": "Risicoscoring API",
    "version": "v1",
    "owner": "team-rvig-brp",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g31",
    "name": "PKI-certificaatbeheer API",
    "version": "v2",
    "owner": "team-rws-sensoren",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g32",
    "name": "Secretsmanager API",
    "version": "v3",
    "owner": "team-duo-examens",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g33",
    "name": "Audit-logboek API",
    "version": "v1",
    "owner": "team-cbs-statline",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g34",
    "name": "Toegangsbeheer API",
    "version": "v2",
    "owner": "team-svb-platform",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g35",
    "name": "OIDC-provider API",
    "version": "v3",
    "owner": "team-cjib-inning",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g36",
    "name": "Monitoring-collector API",
    "version": "v1",
    "owner": "team-nza-zorgdata",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g37",
    "name": "Logaggregatie API",
    "version": "v2",
    "owner": "team-rvo-portaal",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g38",
    "name": "Deploy-orchestrator API",
    "version": "v3",
    "owner": "team-uwv-uitkeringen",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g39",
    "name": "CI-runnerpool API",
    "version": "v1",
    "owner": "team-ocw-cultuurdata",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g40",
    "name": "Config-store API",
    "version": "v2",
    "owner": "team-cbs-platform",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g41",
    "name": "Standaarden-checker API",
    "version": "v3",
    "owner": "team-justid-documentatie",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g42",
    "name": "Brief-generator API",
    "version": "v1",
    "owner": "team-rvo-geodata",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g43",
    "name": "Berichtenbox API",
    "version": "v2",
    "owner": "team-cbs-platform",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g44",
    "name": "Vragenlijst-engine API",
    "version": "v3",
    "owner": "team-nza-zorgdata",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g45",
    "name": "Wachtrij-manager API",
    "version": "v1",
    "owner": "team-jio-keten",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g46",
    "name": "Notificatieservice API",
    "version": "v2",
    "owner": "team-dictu-werkplek",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g47",
    "name": "SMS-gateway API",
    "version": "v3",
    "owner": "team-svb-gegevens",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g48",
    "name": "Betaalverzoek API",
    "version": "v1",
    "owner": "team-rws-platform",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g49",
    "name": "Machtigingenregister API",
    "version": "v2",
    "owner": "team-ocw-cultuurdata",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g50",
    "name": "Gegevensmakelaar API",
    "version": "v3",
    "owner": "team-ind-dossiers",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g51",
    "name": "Terugmeldvoorziening API",
    "version": "v1",
    "owner": "team-bd-platform",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g52",
    "name": "FSC-inway API",
    "version": "v2",
    "owner": "team-dpc-content",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g53",
    "name": "CloudEvents-broker API",
    "version": "v3",
    "owner": "team-jio-security",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g54",
    "name": "Inkooporder-verwerking API",
    "version": "v1",
    "owner": "team-ind-iam",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g55",
    "name": "Factuurverwerking API",
    "version": "v2",
    "owner": "team-rws-verkeer",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g56",
    "name": "Personeelsdossier API",
    "version": "v3",
    "owner": "team-cjib-inning",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g57",
    "name": "Rooster uitvoering API",
    "version": "v1",
    "owner": "team-bd-inning",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g58",
    "name": "Zaaksysteem API",
    "version": "v2",
    "owner": "team-jio-platform",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g59",
    "name": "Documentmanagement API",
    "version": "v3",
    "owner": "team-duo-platform",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g60",
    "name": "Virusscanner-gateway API",
    "version": "v1",
    "owner": "team-ind-dossiers",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-g61",
    "name": "Energieverbruik-monitor API",
    "version": "v2",
    "owner": "team-cbr-rijbewijs",
    "adr": true,
    "rateLimit": "100/s",
    "status": "productie"
  },
  {
    "id": "api-g62",
    "name": "Inspectierapport-generator API",
    "version": "v3",
    "owner": "team-nldd-docs",
    "adr": true,
    "rateLimit": "50/s",
    "status": "beta"
  },
  {
    "id": "api-g63",
    "name": "Handhavingsdossier API",
    "version": "v1",
    "owner": "team-rws-platform",
    "adr": true,
    "rateLimit": "20/s",
    "status": "gepland"
  },
  {
    "id": "api-g64",
    "name": "Besluitenregister API",
    "version": "v2",
    "owner": "team-fin-financieel",
    "adr": false,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-k0",
    "name": "Digilevering",
    "version": "v1",
    "owner": "team-data",
    "adr": true,
    "rateLimit": "onbeperkt",
    "status": "productie"
  },
  {
    "id": "api-k1",
    "name": "Digimelding",
    "version": "v2",
    "owner": "team-bd-aangifte",
    "adr": true,
    "rateLimit": "500/s",
    "status": "productie"
  },
  {
    "id": "api-k2",
    "name": "Digipoort",
    "version": "v1",
    "owner": "team-duo-examens",
    "adr": true,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-k3",
    "name": "Stelselcatalogus",
    "version": "v2",
    "owner": "team-uwv-platform",
    "adr": true,
    "rateLimit": "onbeperkt",
    "status": "productie"
  },
  {
    "id": "api-k4",
    "name": "Berichtenbox voor Bedrijven",
    "version": "v1",
    "owner": "team-rws-sensoren",
    "adr": true,
    "rateLimit": "500/s",
    "status": "productie"
  },
  {
    "id": "api-k5",
    "name": "MijnOverheid",
    "version": "v2",
    "owner": "team-logius-digid",
    "adr": true,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-k6",
    "name": "eHerkenning-makelaar",
    "version": "v1",
    "owner": "team-dictu-data",
    "adr": true,
    "rateLimit": "onbeperkt",
    "status": "productie"
  },
  {
    "id": "api-k7",
    "name": "DigiD-koppeling",
    "version": "v2",
    "owner": "team-cjib-inning",
    "adr": true,
    "rateLimit": "500/s",
    "status": "productie"
  },
  {
    "id": "api-k8",
    "name": "Haal Centraal BRP-bevragen",
    "version": "v1",
    "owner": "team-kvk-handelsregister",
    "adr": true,
    "rateLimit": "200/s",
    "status": "productie"
  },
  {
    "id": "api-k9",
    "name": "Haal Centraal BAG",
    "version": "v2",
    "owner": "team-cbs-microdata",
    "adr": true,
    "rateLimit": "onbeperkt",
    "status": "productie"
  },
  {
    "id": "api-k10",
    "name": "OIN-register",
    "version": "v1",
    "owner": "team-dpc-rijksoverheid",
    "adr": true,
    "rateLimit": "500/s",
    "status": "productie"
  },
  {
    "id": "api-k11",
    "name": "PKIoverheid-OCSP",
    "version": "v2",
    "owner": "team-afm-toezicht",
    "adr": true,
    "rateLimit": "200/s",
    "status": "productie"
  }
];

export const fscPeers = [
  {
    "id": "oin-1",
    "org": "BZK",
    "oin": "00000001823288444000",
    "services": [
      "Paspoort API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-2",
    "org": "Logius",
    "oin": "00000001821002193000",
    "services": [
      "Datadeling API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g3",
    "org": "BZK",
    "oin": "00000001003214345000",
    "services": [
      "Paspoort API",
      "Toeslagen API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g4",
    "org": "DICTU",
    "oin": "00000004000000149000",
    "services": [
      "Bezwaarafhandeling API",
      "Bouwvergunning API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g5",
    "org": "LOGIUS",
    "oin": "00000001000002000",
    "services": [
      "Datadeling API",
      "Aangifte Omzetbelasting API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g6",
    "org": "RvIG",
    "oin": "00000001822100824000",
    "services": [
      "Risicoscoring API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g7",
    "org": "NLDD",
    "oin": "00000001000004000",
    "services": [
      "Inkomenstoets API",
      "Inspectierapport-generator API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g8",
    "org": "BD",
    "oin": "00000001000005000",
    "services": [
      "Loonheffing API",
      "Diplomaregister API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g9",
    "org": "CJIB",
    "oin": "00000004000000044000",
    "services": [
      "OIDC-provider API",
      "Personeelsdossier API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g10",
    "org": "DHC",
    "oin": "00000001000007000",
    "services": [
      "DHC dienst"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g11",
    "org": "DJI",
    "oin": "00000001000008000",
    "services": [
      "DJI dienst"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g12",
    "org": "DPC",
    "oin": "00000001000009000",
    "services": [
      "Verblijfsvergunning IND API",
      "FSC-inway API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g13",
    "org": "DUO",
    "oin": "00000001800866472000",
    "services": [
      "Naturalisatie-aanvraag API",
      "Incasso CJIB API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g14",
    "org": "IND",
    "oin": "00000001000011000",
    "services": [
      "Milieumelding API",
      "Gegevensmakelaar API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g15",
    "org": "JIO",
    "oin": "00000001000012000",
    "services": [
      "Wachtrij-manager API",
      "CloudEvents-broker API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g16",
    "org": "Justid",
    "oin": "00000004000000002000",
    "services": [
      "Standaarden-checker API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g17",
    "org": "RVO",
    "oin": "00000004000000006000",
    "services": [
      "Inspectieplanner ILT API",
      "AOW-uitkering API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g18",
    "org": "RWS",
    "oin": "00000001821699180000",
    "services": [
      "PKI-certificaatbeheer API",
      "Betaalverzoek API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g19",
    "org": "AenM",
    "oin": "00000003953209700000",
    "services": [
      "Huurtoeslag rekenen API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g20",
    "org": "AZ",
    "oin": "00000001003227376000",
    "services": [
      "AZ dienst"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g21",
    "org": "BZ",
    "oin": "00000001003227406000",
    "services": [
      "BZ dienst"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g22",
    "org": "Def",
    "oin": "00000001008078452000",
    "services": [
      "Def dienst"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g23",
    "org": "EZ",
    "oin": "00000001003214369000",
    "services": [
      "EZ dienst"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g24",
    "org": "EZK",
    "oin": "00000001000021000",
    "services": [
      "Bijstandsuitkering API",
      "Zorgverzekeraar-koppeling API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g25",
    "org": "Fin",
    "oin": "00000001003214394000",
    "services": [
      "Waterschapsheffing API",
      "Besluitenregister API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g26",
    "org": "IenW",
    "oin": "00000001003214321000",
    "services": [
      "Fraudedetectie API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g27",
    "org": "JenV",
    "oin": "00000001003214436001",
    "services": [
      "Jeugdzorg-dossier API"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g28",
    "org": "KGG",
    "oin": "00000003952069570000",
    "services": [
      "KGG dienst"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g29",
    "org": "LNV",
    "oin": "00000001858272854000",
    "services": [
      "LNV dienst"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g30",
    "org": "OCW",
    "oin": "00000001003214400000",
    "services": [
      "CI-runnerpool API",
      "Machtigingenregister API"
    ],
    "mode": "outway"
  },
  {
    "id": "oin-g31",
    "org": "SZW",
    "oin": "00000001003227522000",
    "services": [
      "SZW dienst"
    ],
    "mode": "inway"
  },
  {
    "id": "oin-g32",
    "org": "VWS",
    "oin": "00000004003182447002",
    "services": [
      "Vaccinatieregister API"
    ],
    "mode": "outway"
  }
];

export const costByTeam = [
  {
    "team": "team-platform",
    "month": 1300,
    "trend": "+4%"
  },
  {
    "team": "team-burgerzaken",
    "month": 240,
    "trend": "0%"
  },
  {
    "team": "team-toeslagen",
    "month": 300,
    "trend": "+12%"
  },
  {
    "team": "team-data",
    "month": 0,
    "trend": "0%"
  },
  {
    "team": "team-bd-inning",
    "month": 1519,
    "trend": "+4%"
  },
  {
    "team": "team-bd-gegevens",
    "month": 1960,
    "trend": "0%"
  },
  {
    "team": "team-bd-fraude",
    "month": 1333,
    "trend": "+12%"
  },
  {
    "team": "team-bd-platform",
    "month": 3277,
    "trend": "-3%"
  },
  {
    "team": "team-duo-studiefinanciering",
    "month": 3052,
    "trend": "+4%"
  },
  {
    "team": "team-duo-register",
    "month": 1317,
    "trend": "0%"
  },
  {
    "team": "team-duo-examens",
    "month": 591,
    "trend": "+12%"
  },
  {
    "team": "team-duo-platform",
    "month": 1749,
    "trend": "-3%"
  },
  {
    "team": "team-uwv-uitkeringen",
    "month": 924,
    "trend": "+4%"
  },
  {
    "team": "team-uwv-gegevens",
    "month": 1191,
    "trend": "0%"
  },
  {
    "team": "team-uwv-arbeidsmarkt",
    "month": 714,
    "trend": "+12%"
  },
  {
    "team": "team-rvo-subsidies",
    "month": 750,
    "trend": "-3%"
  },
  {
    "team": "team-rvo-geodata",
    "month": 2067,
    "trend": "+4%"
  },
  {
    "team": "team-rvo-portaal",
    "month": 4747,
    "trend": "0%"
  },
  {
    "team": "team-rws-verkeer",
    "month": 2931,
    "trend": "+12%"
  },
  {
    "team": "team-rws-sensoren",
    "month": 2662,
    "trend": "-3%"
  },
  {
    "team": "team-rws-inspectie",
    "month": 786,
    "trend": "+4%"
  },
  {
    "team": "team-rws-platform",
    "month": 4156,
    "trend": "0%"
  },
  {
    "team": "team-ind-dossiers",
    "month": 4930,
    "trend": "+12%"
  },
  {
    "team": "team-ind-iam",
    "month": 1396,
    "trend": "-3%"
  },
  {
    "team": "team-ind-data",
    "month": 3508,
    "trend": "+4%"
  },
  {
    "team": "team-logius-digid",
    "month": 1956,
    "trend": "0%"
  },
  {
    "team": "team-logius-stelsel",
    "month": 2190,
    "trend": "+12%"
  },
  {
    "team": "team-dictu-hosting",
    "month": 369,
    "trend": "-3%"
  },
  {
    "team": "team-dictu-werkplek",
    "month": 2106,
    "trend": "+4%"
  },
  {
    "team": "team-dictu-data",
    "month": 3249,
    "trend": "0%"
  },
  {
    "team": "team-rvig-brp",
    "month": 2126,
    "trend": "+12%"
  },
  {
    "team": "team-rvig-iam",
    "month": 822,
    "trend": "-3%"
  },
  {
    "team": "team-jio-platform",
    "month": 1039,
    "trend": "+4%"
  },
  {
    "team": "team-jio-keten",
    "month": 2118,
    "trend": "0%"
  },
  {
    "team": "team-jio-security",
    "month": 2860,
    "trend": "+12%"
  },
  {
    "team": "team-cjib-inning",
    "month": 1194,
    "trend": "-3%"
  },
  {
    "team": "team-cjib-data",
    "month": 246,
    "trend": "+4%"
  },
  {
    "team": "team-svb-kinderbijslag",
    "month": 1059,
    "trend": "0%"
  },
  {
    "team": "team-svb-gegevens",
    "month": 1507,
    "trend": "+12%"
  },
  {
    "team": "team-svb-platform",
    "month": 2154,
    "trend": "-3%"
  },
  {
    "team": "team-kvk-handelsregister",
    "month": 393,
    "trend": "+4%"
  },
  {
    "team": "team-kvk-api",
    "month": 282,
    "trend": "0%"
  },
  {
    "team": "team-ienw-kenteken",
    "month": 199,
    "trend": "+12%"
  },
  {
    "team": "team-ienw-voertuig",
    "month": 3590,
    "trend": "-3%"
  },
  {
    "team": "team-ienw-data",
    "month": 1488,
    "trend": "+4%"
  },
  {
    "team": "team-cbs-statline",
    "month": 3368,
    "trend": "0%"
  },
  {
    "team": "team-cbs-microdata",
    "month": 1608,
    "trend": "+12%"
  },
  {
    "team": "team-cbs-platform",
    "month": 1128,
    "trend": "-3%"
  },
  {
    "team": "team-justid-documentatie",
    "month": 1119,
    "trend": "+4%"
  },
  {
    "team": "team-koop-wetten",
    "month": 1555,
    "trend": "0%"
  },
  {
    "team": "team-koop-officielebekendmakingen",
    "month": 1227,
    "trend": "+12%"
  },
  {
    "team": "team-dpc-rijksoverheid",
    "month": 1194,
    "trend": "-3%"
  },
  {
    "team": "team-dpc-content",
    "month": 123,
    "trend": "+4%"
  },
  {
    "team": "team-cbr-rijbewijs",
    "month": 4169,
    "trend": "0%"
  },
  {
    "team": "team-acm-toezicht",
    "month": 3075,
    "trend": "+12%"
  },
  {
    "team": "team-ksa-handhaving",
    "month": 1285,
    "trend": "-3%"
  },
  {
    "team": "team-nza-zorgdata",
    "month": 3149,
    "trend": "+4%"
  },
  {
    "team": "team-fin-financieel",
    "month": 381,
    "trend": "0%"
  },
  {
    "team": "team-fin-platform",
    "month": 1777,
    "trend": "+12%"
  },
  {
    "team": "team-szw-regelingen",
    "month": 1759,
    "trend": "-3%"
  },
  {
    "team": "team-vws-zorgregister",
    "month": 1111,
    "trend": "+4%"
  },
  {
    "team": "team-vws-data",
    "month": 234,
    "trend": "0%"
  },
  {
    "team": "team-jenv-keten",
    "month": 2500,
    "trend": "+12%"
  },
  {
    "team": "team-ocw-cultuurdata",
    "month": 1904,
    "trend": "-3%"
  },
  {
    "team": "team-ezk-ondernemen",
    "month": 1405,
    "trend": "+4%"
  },
  {
    "team": "team-kgg-energie",
    "month": 1353,
    "trend": "0%"
  },
  {
    "team": "team-az-comms",
    "month": 858,
    "trend": "+12%"
  },
  {
    "team": "team-bz-consulair",
    "month": 1483,
    "trend": "-3%"
  },
  {
    "team": "team-def-secinfra",
    "month": 1560,
    "trend": "+4%"
  },
  {
    "team": "team-aenm-keten",
    "month": 1801,
    "trend": "0%"
  },
  {
    "team": "team-dhc-geschillen",
    "month": 397,
    "trend": "+12%"
  },
  {
    "team": "team-nldd-docs",
    "month": 789,
    "trend": "-3%"
  },
  {
    "team": "team-nldd-iam",
    "month": 691,
    "trend": "+4%"
  },
  {
    "team": "team-logius-docs",
    "month": 3059,
    "trend": "0%"
  }
];

export const budgets = [
  {
    "team": "team-platform",
    "budget": 1500,
    "spent": 1300
  },
  {
    "team": "team-toeslagen",
    "budget": 280,
    "spent": 300
  },
  {
    "team": "team-burgerzaken",
    "budget": 290,
    "spent": 240
  },
  {
    "team": "team-bd-inning",
    "budget": 1820,
    "spent": 1519
  },
  {
    "team": "team-bd-gegevens",
    "budget": 2350,
    "spent": 1960
  },
  {
    "team": "team-bd-fraude",
    "budget": 1200,
    "spent": 1333
  },
  {
    "team": "team-bd-platform",
    "budget": 3930,
    "spent": 3277
  },
  {
    "team": "team-duo-studiefinanciering",
    "budget": 3660,
    "spent": 3052
  },
  {
    "team": "team-duo-register",
    "budget": 1580,
    "spent": 1317
  },
  {
    "team": "team-duo-examens",
    "budget": 710,
    "spent": 591
  },
  {
    "team": "team-duo-platform",
    "budget": 1570,
    "spent": 1749
  },
  {
    "team": "team-uwv-uitkeringen",
    "budget": 1110,
    "spent": 924
  },
  {
    "team": "team-uwv-gegevens",
    "budget": 1430,
    "spent": 1191
  },
  {
    "team": "team-uwv-arbeidsmarkt",
    "budget": 860,
    "spent": 714
  },
  {
    "team": "team-rvo-subsidies",
    "budget": 900,
    "spent": 750
  },
  {
    "team": "team-rvo-geodata",
    "budget": 1860,
    "spent": 2067
  },
  {
    "team": "team-rvo-portaal",
    "budget": 5700,
    "spent": 4747
  },
  {
    "team": "team-rws-verkeer",
    "budget": 3520,
    "spent": 2931
  },
  {
    "team": "team-rws-sensoren",
    "budget": 3190,
    "spent": 2662
  },
  {
    "team": "team-rws-inspectie",
    "budget": 940,
    "spent": 786
  },
  {
    "team": "team-rws-platform",
    "budget": 3740,
    "spent": 4156
  },
  {
    "team": "team-ind-dossiers",
    "budget": 5920,
    "spent": 4930
  },
  {
    "team": "team-ind-iam",
    "budget": 1680,
    "spent": 1396
  },
  {
    "team": "team-ind-data",
    "budget": 4210,
    "spent": 3508
  },
  {
    "team": "team-logius-digid",
    "budget": 2350,
    "spent": 1956
  },
  {
    "team": "team-logius-stelsel",
    "budget": 1970,
    "spent": 2190
  },
  {
    "team": "team-dictu-hosting",
    "budget": 440,
    "spent": 369
  },
  {
    "team": "team-dictu-werkplek",
    "budget": 2530,
    "spent": 2106
  },
  {
    "team": "team-dictu-data",
    "budget": 3900,
    "spent": 3249
  },
  {
    "team": "team-rvig-brp",
    "budget": 2550,
    "spent": 2126
  },
  {
    "team": "team-rvig-iam",
    "budget": 740,
    "spent": 822
  },
  {
    "team": "team-jio-platform",
    "budget": 1250,
    "spent": 1039
  },
  {
    "team": "team-jio-keten",
    "budget": 2540,
    "spent": 2118
  },
  {
    "team": "team-jio-security",
    "budget": 3430,
    "spent": 2860
  },
  {
    "team": "team-cjib-inning",
    "budget": 1430,
    "spent": 1194
  },
  {
    "team": "team-cjib-data",
    "budget": 220,
    "spent": 246
  },
  {
    "team": "team-svb-kinderbijslag",
    "budget": 1270,
    "spent": 1059
  },
  {
    "team": "team-svb-gegevens",
    "budget": 1810,
    "spent": 1507
  },
  {
    "team": "team-svb-platform",
    "budget": 2580,
    "spent": 2154
  },
  {
    "team": "team-kvk-handelsregister",
    "budget": 470,
    "spent": 393
  },
  {
    "team": "team-kvk-api",
    "budget": 250,
    "spent": 282
  },
  {
    "team": "team-ienw-kenteken",
    "budget": 240,
    "spent": 199
  },
  {
    "team": "team-ienw-voertuig",
    "budget": 4310,
    "spent": 3590
  },
  {
    "team": "team-ienw-data",
    "budget": 1790,
    "spent": 1488
  },
  {
    "team": "team-cbs-statline",
    "budget": 4040,
    "spent": 3368
  },
  {
    "team": "team-cbs-microdata",
    "budget": 1450,
    "spent": 1608
  },
  {
    "team": "team-cbs-platform",
    "budget": 1350,
    "spent": 1128
  },
  {
    "team": "team-justid-documentatie",
    "budget": 1340,
    "spent": 1119
  },
  {
    "team": "team-koop-wetten",
    "budget": 1870,
    "spent": 1555
  },
  {
    "team": "team-koop-officielebekendmakingen",
    "budget": 1470,
    "spent": 1227
  },
  {
    "team": "team-dpc-rijksoverheid",
    "budget": 1070,
    "spent": 1194
  },
  {
    "team": "team-dpc-content",
    "budget": 150,
    "spent": 123
  },
  {
    "team": "team-cbr-rijbewijs",
    "budget": 5000,
    "spent": 4169
  },
  {
    "team": "team-acm-toezicht",
    "budget": 3690,
    "spent": 3075
  },
  {
    "team": "team-ksa-handhaving",
    "budget": 1540,
    "spent": 1285
  },
  {
    "team": "team-nza-zorgdata",
    "budget": 2830,
    "spent": 3149
  },
  {
    "team": "team-fin-financieel",
    "budget": 460,
    "spent": 381
  },
  {
    "team": "team-fin-platform",
    "budget": 2130,
    "spent": 1777
  },
  {
    "team": "team-szw-regelingen",
    "budget": 2110,
    "spent": 1759
  },
  {
    "team": "team-vws-zorgregister",
    "budget": 1330,
    "spent": 1111
  },
  {
    "team": "team-vws-data",
    "budget": 210,
    "spent": 234
  },
  {
    "team": "team-jenv-keten",
    "budget": 3000,
    "spent": 2500
  },
  {
    "team": "team-ocw-cultuurdata",
    "budget": 2280,
    "spent": 1904
  },
  {
    "team": "team-ezk-ondernemen",
    "budget": 1690,
    "spent": 1405
  },
  {
    "team": "team-kgg-energie",
    "budget": 1620,
    "spent": 1353
  },
  {
    "team": "team-az-comms",
    "budget": 770,
    "spent": 858
  },
  {
    "team": "team-bz-consulair",
    "budget": 1780,
    "spent": 1483
  },
  {
    "team": "team-def-secinfra",
    "budget": 1870,
    "spent": 1560
  },
  {
    "team": "team-aenm-keten",
    "budget": 2160,
    "spent": 1801
  },
  {
    "team": "team-dhc-geschillen",
    "budget": 480,
    "spent": 397
  },
  {
    "team": "team-nldd-docs",
    "budget": 710,
    "spent": 789
  },
  {
    "team": "team-nldd-iam",
    "budget": 830,
    "spent": 691
  },
  {
    "team": "team-logius-docs",
    "budget": 3670,
    "spent": 3059
  }
];

export const gates = [
  {
    "id": "gate-open",
    "name": "Open-source-tenzij",
    "desc": "Repo is open of heeft motivatie"
  },
  {
    "id": "gate-eupl",
    "name": "EUPL-licentie",
    "desc": "Open repos hebben EUPL-1.2"
  },
  {
    "id": "gate-wcag",
    "name": "Toegankelijkheid (WCAG)",
    "desc": "Frontend voldoet aan WCAG 2.2 AA"
  },
  {
    "id": "gate-bio",
    "name": "Security-baseline (BIO)",
    "desc": "BIO-controls groen"
  }
];

export const rfcs = [
  {
    "id": "rfc-012",
    "title": "Soevereine LLM-gateway",
    "status": "geaccepteerd"
  },
  {
    "id": "rfc-018",
    "title": "Autonome Linux-werkplek standaard",
    "status": "in beoordeling"
  },
  {
    "id": "rfc-019",
    "title": "Fleet-shift campagne-governance",
    "status": "concept"
  }
];

export const auditLog = [
  {
    "id": "a1",
    "actor": "ans",
    "action": "infra afgenomen",
    "resource": "llm-gilde-prod",
    "at": "di 10:02"
  },
  {
    "id": "a2",
    "actor": "fatima",
    "action": "secret geroteerd",
    "resource": "platform/llm-gateway-key",
    "at": "di 09:40"
  },
  {
    "id": "a3",
    "actor": "joost",
    "action": "release gepromoot",
    "resource": "app-paspoort → prod",
    "at": "gisteren 14:22"
  },
  {
    "id": "a-g0",
    "actor": "ans",
    "action": "infra afgenomen",
    "resource": "kafka-toeslagen-prod",
    "at": "vandaag 8:10"
  },
  {
    "id": "a-g1",
    "actor": "omar-van-es",
    "action": "release gepromoot",
    "resource": "app-subsidieportaal-rvo → prod",
    "at": "gisteren 9:11"
  },
  {
    "id": "a-g2",
    "actor": "isa-roeloffzen",
    "action": "secret geroteerd",
    "resource": "bijstandsuitkering/db-password",
    "at": "di 10:12"
  },
  {
    "id": "a-g3",
    "actor": "jasper-ennaji",
    "action": "wet gepubliceerd",
    "resource": "Algemene Kinderbijslagwet",
    "at": "wo 11:13"
  },
  {
    "id": "a-g4",
    "actor": "bas-demir",
    "action": "werkplek uitgerold",
    "resource": "wp-0008",
    "at": "do 12:14"
  },
  {
    "id": "a-g5",
    "actor": "loes-van-den-heuvel",
    "action": "campagne uitgerold",
    "resource": "Voeg SBOM-generatie toe (CycloneDX)",
    "at": "vandaag 13:15"
  },
  {
    "id": "a-g6",
    "actor": "hala-prins",
    "action": "infra afgenomen",
    "resource": "redis-studiefinanciering-portaal-prod",
    "at": "gisteren 14:16"
  },
  {
    "id": "a-g7",
    "actor": "abdel-bakkal",
    "action": "release gepromoot",
    "resource": "app-incasso-cjib → prod",
    "at": "di 15:17"
  },
  {
    "id": "a-g8",
    "actor": "niels-brouwer",
    "action": "secret geroteerd",
    "resource": "brp-bevraging/db-password",
    "at": "wo 16:18"
  },
  {
    "id": "a-g9",
    "actor": "femke-meijer",
    "action": "wet gepubliceerd",
    "resource": "Wegenverkeerswet 1994",
    "at": "do 17:19"
  },
  {
    "id": "a-g10",
    "actor": "marit-roozendaal",
    "action": "werkplek uitgerold",
    "resource": "wp-0014",
    "at": "vandaag 8:20"
  },
  {
    "id": "a-g11",
    "actor": "bouchra-yildiz",
    "action": "campagne uitgerold",
    "resource": "Voeg Dependabot-config toe",
    "at": "gisteren 9:21"
  },
  {
    "id": "a-g12",
    "actor": "driss-buitenhuis",
    "action": "infra afgenomen",
    "resource": "kafka-aangifte-omzetbelasting-acc",
    "at": "di 10:22"
  },
  {
    "id": "a-g13",
    "actor": "sander-sikkema",
    "action": "release gepromoot",
    "resource": "app-parkeervergunning → prod",
    "at": "wo 11:23"
  },
  {
    "id": "a-g14",
    "actor": "jeroen-hamid",
    "action": "secret geroteerd",
    "resource": "waterschapsheffing/db-password",
    "at": "do 12:24"
  },
  {
    "id": "a-g15",
    "actor": "levi-lubbers",
    "action": "wet gepubliceerd",
    "resource": "Wet waardering onroerende zaken (WOZ)",
    "at": "vandaag 13:25"
  },
  {
    "id": "a-g16",
    "actor": "said-lammers",
    "action": "werkplek uitgerold",
    "resource": "wp-0020",
    "at": "gisteren 14:26"
  },
  {
    "id": "a-g17",
    "actor": "ilias-bruins",
    "action": "campagne uitgerold",
    "resource": "Zet EUPL-licentie in elke open repo",
    "at": "di 15:27"
  },
  {
    "id": "a-g18",
    "actor": "roel-groen",
    "action": "infra afgenomen",
    "resource": "kubernetes-kadaster-viewer-test",
    "at": "wo 16:28"
  },
  {
    "id": "a-g19",
    "actor": "anouk-driessen",
    "action": "release gepromoot",
    "resource": "app-oidc-provider → prod",
    "at": "do 17:29"
  },
  {
    "id": "a-g20",
    "actor": "sem-karaca",
    "action": "secret geroteerd",
    "resource": "audit-logboek/db-password",
    "at": "vandaag 8:30"
  },
  {
    "id": "a-g21",
    "actor": "fatih-ben-ali",
    "action": "wet gepubliceerd",
    "resource": "Regeling standaardpremie en bestuursrechtelijke premie",
    "at": "gisteren 9:31"
  },
  {
    "id": "a-g22",
    "actor": "younes-sanders",
    "action": "werkplek uitgerold",
    "resource": "wp-0026",
    "at": "di 10:32"
  },
  {
    "id": "a-g23",
    "actor": "wouter-koster",
    "action": "campagne uitgerold",
    "resource": "Voeg SBOM-generatie toe (CycloneDX)",
    "at": "wo 11:33"
  },
  {
    "id": "a-g24",
    "actor": "mohammed-van-der-meer",
    "action": "infra afgenomen",
    "resource": "postgres-inspectieplanner-ilt-dev",
    "at": "do 12:34"
  },
  {
    "id": "a-g25",
    "actor": "mees-dijkstra",
    "action": "release gepromoot",
    "resource": "app-berichtenbox → prod",
    "at": "vandaag 13:35"
  },
  {
    "id": "a-g26",
    "actor": "soumaya-smit",
    "action": "secret geroteerd",
    "resource": "pdf-generator/db-password",
    "at": "gisteren 14:36"
  },
  {
    "id": "a-g27",
    "actor": "meryem-pijnenburg",
    "action": "wet gepubliceerd",
    "resource": "Werkloosheidswet",
    "at": "di 15:37"
  },
  {
    "id": "a-g28",
    "actor": "bart-akkaya",
    "action": "werkplek uitgerold",
    "resource": "wp-0032",
    "at": "wo 16:38"
  },
  {
    "id": "a-g29",
    "actor": "aisha-slootweg",
    "action": "campagne uitgerold",
    "resource": "Voeg Dependabot-config toe",
    "at": "do 17:39"
  }
];

// platform-config commit history. Every audited action also lands here at
// runtime (see store.commit); these seed entries give the IaC page a populated
// log on first load. Actors match auditLog. Deterministic, no clock/random.
export const commits = [
  {
    id: 'c-seed-1', sha: 'a3f9c21', actor: 'ans',
    message: 'feat(infra): provision llm-gilde-prod',
    path: 'infra/llm-gilde-prod.tf', action: 'infra afgenomen', at: 'di 10:02',
    diff: '--- a/infra/llm-gilde-prod.tf\n+++ b/infra/llm-gilde-prod.tf\n@@\n+resource "platform_instance" "llm-gilde-prod" {\n+  name    = "llm-gilde-prod"\n+  kind    = "llm"\n+  managed = true\n+}',
  },
  {
    id: 'c-seed-2', sha: 'b71d0e4', actor: 'fatima',
    message: 'chore(secrets): rotate platform/llm-gateway-key',
    path: 'secrets/platform-llm-gateway-key.sops.yaml', action: 'secret geroteerd', at: 'di 09:40',
    diff: '--- a/secrets/platform-llm-gateway-key.sops.yaml\n+++ b/secrets/platform-llm-gateway-key.sops.yaml\n@@\n+# rotated platform/llm-gateway-key\n+enc: sops:age\n+rotation: quarterly',
  },
  {
    id: 'c-seed-3', sha: 'c0a8842', actor: 'joost',
    message: 'feat(release): promote app-paspoort naar prod',
    path: 'environments/app-paspoort.yaml', action: 'release gepromoot', at: 'gisteren 14:22',
    diff: '--- a/environments/app-paspoort.yaml\n+++ b/environments/app-paspoort.yaml\n@@\n prod:\n-  version: "3.4.1"\n+  version: "3.5.0"',
  },
  {
    id: 'c-seed-4', sha: 'd12f5b9', actor: 'ans',
    message: 'feat(app): scaffold inkomenstoets',
    path: 'apps/inkomenstoets/app.yaml', action: 'applicatie aangemaakt', at: 'gisteren 11:08',
    diff: '--- a/apps/inkomenstoets/app.yaml\n+++ b/apps/inkomenstoets/app.yaml\n@@\n+name: inkomenstoets\n+template: golden-path\n+infra: [postgres, kubernetes]',
  },
  {
    id: 'c-seed-5', sha: 'e9c4470', actor: 'sanne',
    message: 'feat(fleet): roll out Voeg Dependabot-config toe',
    path: 'fleet/voeg-dependabot-config-toe.yaml', action: 'campagne uitgerold', at: 'do 17:39',
    diff: '--- a/fleet/voeg-dependabot-config-toe.yaml\n+++ b/fleet/voeg-dependabot-config-toe.yaml\n@@\n+campaign: Voeg Dependabot-config toe\n+target: matched-repos\n+open_pr: true',
  },
  {
    id: 'c-seed-6', sha: 'f5b1a23', actor: 'joost',
    message: 'feat(infra): provision toeslagen-postgres-prod',
    path: 'infra/toeslagen-postgres-prod.tf', action: 'infra afgenomen', at: 'do 16:51',
    diff: '--- a/infra/toeslagen-postgres-prod.tf\n+++ b/infra/toeslagen-postgres-prod.tf\n@@\n+resource "platform_instance" "toeslagen-postgres-prod" {\n+  name    = "toeslagen-postgres-prod"\n+  kind    = "postgres"\n+  size    = "L"\n+  managed = true\n+}',
  },
  {
    id: 'c-seed-7', sha: '1d6e088', actor: 'fatima',
    message: 'docs(rfc): record rfc-2026-014 Multi-region kafka',
    path: 'governance/rfcs/rfc-2026-014.md', action: 'RFC opgesteld', at: 'wo 13:20',
    diff: '--- a/governance/rfcs/rfc-2026-014.md\n+++ b/governance/rfcs/rfc-2026-014.md\n@@\n+# RFC 2026-014: Multi-region kafka\n+status: voorgesteld',
  },
  {
    id: 'c-seed-8', sha: '2a7f9c1', actor: 'ans',
    message: 'feat(release): promote app-toeslagen naar acc',
    path: 'environments/app-toeslagen.yaml', action: 'release gepromoot', at: 'wo 10:05',
    diff: '--- a/environments/app-toeslagen.yaml\n+++ b/environments/app-toeslagen.yaml\n@@\n acc:\n-  version: "8.1.2"\n+  version: "8.2.0"',
  },
  {
    id: 'c-seed-9', sha: '3c8b0d5', actor: 'sanne',
    message: 'chore(workplace): apply wp-1042',
    path: 'workplaces/wp-1042.yaml', action: 'werkplek opnieuw geïmaged', at: 'di 15:33',
    diff: '--- a/workplaces/wp-1042.yaml\n+++ b/workplaces/wp-1042.yaml\n@@\n-image: rijksbeeld-2025.3\n+image: rijksbeeld-2026.1',
  },
  {
    id: 'c-seed-10', sha: '4e2a7f6', actor: 'joost',
    message: 'chore(secrets): rotate paspoort/db-wachtwoord',
    path: 'secrets/paspoort-db-wachtwoord.sops.yaml', action: 'secret geroteerd', at: 'di 09:11',
    diff: '--- a/secrets/paspoort-db-wachtwoord.sops.yaml\n+++ b/secrets/paspoort-db-wachtwoord.sops.yaml\n@@\n+# rotated paspoort/db-wachtwoord\n+enc: sops:age\n+rotation: quarterly',
  },
];

export const standards = [
  {
    "id": "std-nldd",
    "name": "NLDD Design System",
    "kind": "Design",
    "status": "voldoet"
  },
  {
    "id": "std-internetnl",
    "name": "internet.nl (web/mail)",
    "kind": "Internet",
    "status": "voldoet"
  },
  {
    "id": "std-adr",
    "name": "API Design Rules",
    "kind": "API",
    "status": "deels"
  },
  {
    "id": "std-bio",
    "name": "BIO",
    "kind": "Security",
    "status": "voldoet"
  },
  {
    "id": "std-wcag",
    "name": "WCAG 2.2 AA",
    "kind": "Toegankelijkheid",
    "status": "voldoet"
  },
  {
    "id": "std-haven",
    "name": "Haven (cloud-hosting)",
    "kind": "Cloud",
    "status": "deels"
  }
];

export const channels = [
  {
    "id": "ch-1",
    "team": "team-platform",
    "type": "Matrix",
    "target": "#platform:rijk.chat"
  },
  {
    "id": "ch-2",
    "team": "team-toeslagen",
    "type": "webhook",
    "target": "https://hooks.toeslagen/…"
  },
  {
    "id": "ch-g3",
    "team": "team-bd-inning",
    "type": "Matrix",
    "target": "#bd-inning:rijk.chat"
  },
  {
    "id": "ch-g4",
    "team": "team-bd-aangifte",
    "type": "webhook",
    "target": "https://hooks.bd-aangifte/in"
  },
  {
    "id": "ch-g5",
    "team": "team-bd-gegevens",
    "type": "email",
    "target": "team-bd-gegevens@rijk.nl"
  },
  {
    "id": "ch-g6",
    "team": "team-bd-fraude",
    "type": "Matrix",
    "target": "#bd-fraude:rijk.chat"
  },
  {
    "id": "ch-g7",
    "team": "team-bd-iam",
    "type": "webhook",
    "target": "https://hooks.bd-iam/in"
  },
  {
    "id": "ch-g8",
    "team": "team-bd-platform",
    "type": "email",
    "target": "team-bd-platform@rijk.nl"
  },
  {
    "id": "ch-g9",
    "team": "team-duo-studiefinanciering",
    "type": "Matrix",
    "target": "#duo-studiefinanciering:rijk.chat"
  },
  {
    "id": "ch-g10",
    "team": "team-duo-register",
    "type": "webhook",
    "target": "https://hooks.duo-register/in"
  },
  {
    "id": "ch-g11",
    "team": "team-duo-examens",
    "type": "email",
    "target": "team-duo-examens@rijk.nl"
  },
  {
    "id": "ch-g12",
    "team": "team-duo-data",
    "type": "Matrix",
    "target": "#duo-data:rijk.chat"
  },
  {
    "id": "ch-g13",
    "team": "team-duo-platform",
    "type": "webhook",
    "target": "https://hooks.duo-platform/in"
  },
  {
    "id": "ch-g14",
    "team": "team-uwv-uitkeringen",
    "type": "email",
    "target": "team-uwv-uitkeringen@rijk.nl"
  },
  {
    "id": "ch-g15",
    "team": "team-uwv-werk",
    "type": "Matrix",
    "target": "#uwv-werk:rijk.chat"
  },
  {
    "id": "ch-g16",
    "team": "team-uwv-gegevens",
    "type": "webhook",
    "target": "https://hooks.uwv-gegevens/in"
  },
  {
    "id": "ch-g17",
    "team": "team-uwv-arbeidsmarkt",
    "type": "email",
    "target": "team-uwv-arbeidsmarkt@rijk.nl"
  },
  {
    "id": "ch-g18",
    "team": "team-uwv-platform",
    "type": "Matrix",
    "target": "#uwv-platform:rijk.chat"
  },
  {
    "id": "ch-g19",
    "team": "team-rvo-subsidies",
    "type": "webhook",
    "target": "https://hooks.rvo-subsidies/in"
  },
  {
    "id": "ch-g20",
    "team": "team-rvo-vergunningen",
    "type": "email",
    "target": "team-rvo-vergunningen@rijk.nl"
  },
  {
    "id": "ch-g21",
    "team": "team-rvo-geodata",
    "type": "Matrix",
    "target": "#rvo-geodata:rijk.chat"
  },
  {
    "id": "ch-g22",
    "team": "team-rvo-portaal",
    "type": "webhook",
    "target": "https://hooks.rvo-portaal/in"
  },
  {
    "id": "ch-g23",
    "team": "team-rws-areaal",
    "type": "email",
    "target": "team-rws-areaal@rijk.nl"
  },
  {
    "id": "ch-g24",
    "team": "team-rws-verkeer",
    "type": "Matrix",
    "target": "#rws-verkeer:rijk.chat"
  },
  {
    "id": "ch-g25",
    "team": "team-rws-sensoren",
    "type": "webhook",
    "target": "https://hooks.rws-sensoren/in"
  },
  {
    "id": "ch-g26",
    "team": "team-rws-inspectie",
    "type": "email",
    "target": "team-rws-inspectie@rijk.nl"
  },
  {
    "id": "ch-g27",
    "team": "team-rws-platform",
    "type": "Matrix",
    "target": "#rws-platform:rijk.chat"
  },
  {
    "id": "ch-g28",
    "team": "team-ind-aanvragen",
    "type": "webhook",
    "target": "https://hooks.ind-aanvragen/in"
  },
  {
    "id": "ch-g29",
    "team": "team-ind-dossiers",
    "type": "email",
    "target": "team-ind-dossiers@rijk.nl"
  },
  {
    "id": "ch-g30",
    "team": "team-ind-iam",
    "type": "Matrix",
    "target": "#ind-iam:rijk.chat"
  },
  {
    "id": "ch-g31",
    "team": "team-ind-data",
    "type": "webhook",
    "target": "https://hooks.ind-data/in"
  },
  {
    "id": "ch-g32",
    "team": "team-logius-digid",
    "type": "email",
    "target": "team-logius-digid@rijk.nl"
  },
  {
    "id": "ch-g33",
    "team": "team-logius-digikoppeling",
    "type": "Matrix",
    "target": "#logius-digikoppeling:rijk.chat"
  },
  {
    "id": "ch-g34",
    "team": "team-logius-machtigen",
    "type": "webhook",
    "target": "https://hooks.logius-machtigen/in"
  },
  {
    "id": "ch-g35",
    "team": "team-logius-stelsel",
    "type": "email",
    "target": "team-logius-stelsel@rijk.nl"
  },
  {
    "id": "ch-g36",
    "team": "team-dictu-hosting",
    "type": "Matrix",
    "target": "#dictu-hosting:rijk.chat"
  },
  {
    "id": "ch-g37",
    "team": "team-dictu-werkplek",
    "type": "webhook",
    "target": "https://hooks.dictu-werkplek/in"
  },
  {
    "id": "ch-g38",
    "team": "team-dictu-security",
    "type": "email",
    "target": "team-dictu-security@rijk.nl"
  },
  {
    "id": "ch-g39",
    "team": "team-dictu-data",
    "type": "Matrix",
    "target": "#dictu-data:rijk.chat"
  },
  {
    "id": "ch-g40",
    "team": "team-rvig-brp",
    "type": "webhook",
    "target": "https://hooks.rvig-brp/in"
  },
  {
    "id": "ch-g41",
    "team": "team-rvig-reisdocumenten",
    "type": "email",
    "target": "team-rvig-reisdocumenten@rijk.nl"
  },
  {
    "id": "ch-g42",
    "team": "team-rvig-iam",
    "type": "Matrix",
    "target": "#rvig-iam:rijk.chat"
  },
  {
    "id": "ch-g43",
    "team": "team-jio-platform",
    "type": "webhook",
    "target": "https://hooks.jio-platform/in"
  },
  {
    "id": "ch-g44",
    "team": "team-jio-keten",
    "type": "email",
    "target": "team-jio-keten@rijk.nl"
  },
  {
    "id": "ch-g45",
    "team": "team-jio-security",
    "type": "Matrix",
    "target": "#jio-security:rijk.chat"
  },
  {
    "id": "ch-g46",
    "team": "team-cjib-inning",
    "type": "webhook",
    "target": "https://hooks.cjib-inning/in"
  },
  {
    "id": "ch-g47",
    "team": "team-cjib-sanctie",
    "type": "email",
    "target": "team-cjib-sanctie@rijk.nl"
  },
  {
    "id": "ch-g48",
    "team": "team-cjib-data",
    "type": "Matrix",
    "target": "#cjib-data:rijk.chat"
  },
  {
    "id": "ch-g49",
    "team": "team-svb-aow",
    "type": "webhook",
    "target": "https://hooks.svb-aow/in"
  },
  {
    "id": "ch-g50",
    "team": "team-svb-kinderbijslag",
    "type": "email",
    "target": "team-svb-kinderbijslag@rijk.nl"
  },
  {
    "id": "ch-g51",
    "team": "team-svb-gegevens",
    "type": "Matrix",
    "target": "#svb-gegevens:rijk.chat"
  },
  {
    "id": "ch-g52",
    "team": "team-svb-platform",
    "type": "webhook",
    "target": "https://hooks.svb-platform/in"
  },
  {
    "id": "ch-g53",
    "team": "team-kvk-handelsregister",
    "type": "email",
    "target": "team-kvk-handelsregister@rijk.nl"
  },
  {
    "id": "ch-g54",
    "team": "team-kvk-api",
    "type": "Matrix",
    "target": "#kvk-api:rijk.chat"
  },
  {
    "id": "ch-g55",
    "team": "team-kvk-ondernemersplein",
    "type": "webhook",
    "target": "https://hooks.kvk-ondernemersplein/in"
  },
  {
    "id": "ch-g56",
    "team": "team-ienw-kenteken",
    "type": "email",
    "target": "team-ienw-kenteken@rijk.nl"
  },
  {
    "id": "ch-g57",
    "team": "team-ienw-voertuig",
    "type": "Matrix",
    "target": "#ienw-voertuig:rijk.chat"
  },
  {
    "id": "ch-g58",
    "team": "team-ienw-data",
    "type": "webhook",
    "target": "https://hooks.ienw-data/in"
  },
  {
    "id": "ch-g59",
    "team": "team-cbs-statline",
    "type": "email",
    "target": "team-cbs-statline@rijk.nl"
  },
  {
    "id": "ch-g60",
    "team": "team-cbs-microdata",
    "type": "Matrix",
    "target": "#cbs-microdata:rijk.chat"
  },
  {
    "id": "ch-g61",
    "team": "team-cbs-platform",
    "type": "webhook",
    "target": "https://hooks.cbs-platform/in"
  },
  {
    "id": "ch-g62",
    "team": "team-cbs-privacy",
    "type": "email",
    "target": "team-cbs-privacy@rijk.nl"
  },
  {
    "id": "ch-g63",
    "team": "team-justid-documentatie",
    "type": "Matrix",
    "target": "#justid-documentatie:rijk.chat"
  },
  {
    "id": "ch-g64",
    "team": "team-justid-vog",
    "type": "webhook",
    "target": "https://hooks.justid-vog/in"
  },
  {
    "id": "ch-g65",
    "team": "team-koop-wetten",
    "type": "email",
    "target": "team-koop-wetten@rijk.nl"
  },
  {
    "id": "ch-g66",
    "team": "team-koop-officielebekendmakingen",
    "type": "Matrix",
    "target": "#koop-officielebekendmakingen:rijk.chat"
  },
  {
    "id": "ch-g67",
    "team": "team-dpc-rijksoverheid",
    "type": "webhook",
    "target": "https://hooks.dpc-rijksoverheid/in"
  },
  {
    "id": "ch-g68",
    "team": "team-dpc-content",
    "type": "email",
    "target": "team-dpc-content@rijk.nl"
  },
  {
    "id": "ch-g69",
    "team": "team-dji-detentie",
    "type": "Matrix",
    "target": "#dji-detentie:rijk.chat"
  },
  {
    "id": "ch-g70",
    "team": "team-dji-data",
    "type": "webhook",
    "target": "https://hooks.dji-data/in"
  },
  {
    "id": "ch-g71",
    "team": "team-cbr-rijbewijs",
    "type": "email",
    "target": "team-cbr-rijbewijs@rijk.nl"
  },
  {
    "id": "ch-g72",
    "team": "team-cbr-reservering",
    "type": "Matrix",
    "target": "#cbr-reservering:rijk.chat"
  },
  {
    "id": "ch-g73",
    "team": "team-acm-toezicht",
    "type": "webhook",
    "target": "https://hooks.acm-toezicht/in"
  },
  {
    "id": "ch-g74",
    "team": "team-afm-toezicht",
    "type": "email",
    "target": "team-afm-toezicht@rijk.nl"
  },
  {
    "id": "ch-g75",
    "team": "team-ksa-handhaving",
    "type": "Matrix",
    "target": "#ksa-handhaving:rijk.chat"
  },
  {
    "id": "ch-g76",
    "team": "team-nza-zorgdata",
    "type": "webhook",
    "target": "https://hooks.nza-zorgdata/in"
  },
  {
    "id": "ch-g77",
    "team": "team-fin-financieel",
    "type": "email",
    "target": "team-fin-financieel@rijk.nl"
  },
  {
    "id": "ch-g78",
    "team": "team-fin-platform",
    "type": "Matrix",
    "target": "#fin-platform:rijk.chat"
  },
  {
    "id": "ch-g79",
    "team": "team-szw-regelingen",
    "type": "webhook",
    "target": "https://hooks.szw-regelingen/in"
  },
  {
    "id": "ch-g80",
    "team": "team-vws-zorgregister",
    "type": "email",
    "target": "team-vws-zorgregister@rijk.nl"
  },
  {
    "id": "ch-g81",
    "team": "team-vws-data",
    "type": "Matrix",
    "target": "#vws-data:rijk.chat"
  },
  {
    "id": "ch-g82",
    "team": "team-jenv-keten",
    "type": "webhook",
    "target": "https://hooks.jenv-keten/in"
  },
  {
    "id": "ch-g83",
    "team": "team-ocw-cultuurdata",
    "type": "email",
    "target": "team-ocw-cultuurdata@rijk.nl"
  },
  {
    "id": "ch-g84",
    "team": "team-lnv-natuur",
    "type": "Matrix",
    "target": "#lnv-natuur:rijk.chat"
  },
  {
    "id": "ch-g85",
    "team": "team-ezk-ondernemen",
    "type": "webhook",
    "target": "https://hooks.ezk-ondernemen/in"
  },
  {
    "id": "ch-g86",
    "team": "team-kgg-energie",
    "type": "email",
    "target": "team-kgg-energie@rijk.nl"
  },
  {
    "id": "ch-g87",
    "team": "team-az-comms",
    "type": "Matrix",
    "target": "#az-comms:rijk.chat"
  },
  {
    "id": "ch-g88",
    "team": "team-bz-consulair",
    "type": "webhook",
    "target": "https://hooks.bz-consulair/in"
  },
  {
    "id": "ch-g89",
    "team": "team-def-secinfra",
    "type": "email",
    "target": "team-def-secinfra@rijk.nl"
  },
  {
    "id": "ch-g90",
    "team": "team-aenm-keten",
    "type": "Matrix",
    "target": "#aenm-keten:rijk.chat"
  },
  {
    "id": "ch-g91",
    "team": "team-dhc-geschillen",
    "type": "webhook",
    "target": "https://hooks.dhc-geschillen/in"
  },
  {
    "id": "ch-g92",
    "team": "team-ez-markt",
    "type": "email",
    "target": "team-ez-markt@rijk.nl"
  },
  {
    "id": "ch-g93",
    "team": "team-bzk-iam",
    "type": "Matrix",
    "target": "#bzk-iam:rijk.chat"
  },
  {
    "id": "ch-g94",
    "team": "team-bzk-security",
    "type": "webhook",
    "target": "https://hooks.bzk-security/in"
  },
  {
    "id": "ch-g95",
    "team": "team-nldd-docs",
    "type": "email",
    "target": "team-nldd-docs@rijk.nl"
  },
  {
    "id": "ch-g96",
    "team": "team-nldd-iam",
    "type": "Matrix",
    "target": "#nldd-iam:rijk.chat"
  },
  {
    "id": "ch-g97",
    "team": "team-logius-docs",
    "type": "webhook",
    "target": "https://hooks.logius-docs/in"
  }
];

export const subscriptions = [
  {
    "id": "sub-1",
    "team": "team-platform",
    "event": "deploy.completed"
  },
  {
    "id": "sub-2",
    "team": "team-platform",
    "event": "incident.opened"
  },
  {
    "id": "sub-3",
    "team": "team-toeslagen",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g4",
    "team": "team-bd-inning",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g5",
    "team": "team-bd-aangifte",
    "event": "incident.opened"
  },
  {
    "id": "sub-g6",
    "team": "team-bd-aangifte",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g7",
    "team": "team-bd-gegevens",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g8",
    "team": "team-bd-fraude",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g9",
    "team": "team-bd-fraude",
    "event": "wet.published"
  },
  {
    "id": "sub-g10",
    "team": "team-bd-iam",
    "event": "wet.published"
  },
  {
    "id": "sub-g11",
    "team": "team-bd-platform",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g12",
    "team": "team-bd-platform",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g13",
    "team": "team-duo-studiefinanciering",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g14",
    "team": "team-duo-register",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g15",
    "team": "team-duo-register",
    "event": "incident.opened"
  },
  {
    "id": "sub-g16",
    "team": "team-duo-examens",
    "event": "incident.opened"
  },
  {
    "id": "sub-g17",
    "team": "team-duo-data",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g18",
    "team": "team-duo-data",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g19",
    "team": "team-duo-platform",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g20",
    "team": "team-uwv-uitkeringen",
    "event": "wet.published"
  },
  {
    "id": "sub-g21",
    "team": "team-uwv-uitkeringen",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g22",
    "team": "team-uwv-werk",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g23",
    "team": "team-uwv-gegevens",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g24",
    "team": "team-uwv-gegevens",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g25",
    "team": "team-uwv-arbeidsmarkt",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g26",
    "team": "team-uwv-platform",
    "event": "incident.opened"
  },
  {
    "id": "sub-g27",
    "team": "team-uwv-platform",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g28",
    "team": "team-rvo-subsidies",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g29",
    "team": "team-rvo-vergunningen",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g30",
    "team": "team-rvo-vergunningen",
    "event": "wet.published"
  },
  {
    "id": "sub-g31",
    "team": "team-rvo-geodata",
    "event": "wet.published"
  },
  {
    "id": "sub-g32",
    "team": "team-rvo-portaal",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g33",
    "team": "team-rvo-portaal",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g34",
    "team": "team-rws-areaal",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g35",
    "team": "team-rws-verkeer",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g36",
    "team": "team-rws-verkeer",
    "event": "incident.opened"
  },
  {
    "id": "sub-g37",
    "team": "team-rws-sensoren",
    "event": "incident.opened"
  },
  {
    "id": "sub-g38",
    "team": "team-rws-inspectie",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g39",
    "team": "team-rws-inspectie",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g40",
    "team": "team-rws-platform",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g41",
    "team": "team-ind-aanvragen",
    "event": "wet.published"
  },
  {
    "id": "sub-g42",
    "team": "team-ind-aanvragen",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g43",
    "team": "team-ind-dossiers",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g44",
    "team": "team-ind-iam",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g45",
    "team": "team-ind-iam",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g46",
    "team": "team-ind-data",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g47",
    "team": "team-logius-digid",
    "event": "incident.opened"
  },
  {
    "id": "sub-g48",
    "team": "team-logius-digid",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g49",
    "team": "team-logius-digikoppeling",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g50",
    "team": "team-logius-machtigen",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g51",
    "team": "team-logius-machtigen",
    "event": "wet.published"
  },
  {
    "id": "sub-g52",
    "team": "team-logius-stelsel",
    "event": "wet.published"
  },
  {
    "id": "sub-g53",
    "team": "team-dictu-hosting",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g54",
    "team": "team-dictu-hosting",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g55",
    "team": "team-dictu-werkplek",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g56",
    "team": "team-dictu-security",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g57",
    "team": "team-dictu-security",
    "event": "incident.opened"
  },
  {
    "id": "sub-g58",
    "team": "team-dictu-data",
    "event": "incident.opened"
  },
  {
    "id": "sub-g59",
    "team": "team-rvig-brp",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g60",
    "team": "team-rvig-brp",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g61",
    "team": "team-rvig-reisdocumenten",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g62",
    "team": "team-rvig-iam",
    "event": "wet.published"
  },
  {
    "id": "sub-g63",
    "team": "team-rvig-iam",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g64",
    "team": "team-jio-platform",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g65",
    "team": "team-jio-keten",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g66",
    "team": "team-jio-keten",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g67",
    "team": "team-jio-security",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g68",
    "team": "team-cjib-inning",
    "event": "incident.opened"
  },
  {
    "id": "sub-g69",
    "team": "team-cjib-inning",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g70",
    "team": "team-cjib-sanctie",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g71",
    "team": "team-cjib-data",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g72",
    "team": "team-cjib-data",
    "event": "wet.published"
  },
  {
    "id": "sub-g73",
    "team": "team-svb-aow",
    "event": "wet.published"
  },
  {
    "id": "sub-g74",
    "team": "team-svb-kinderbijslag",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g75",
    "team": "team-svb-kinderbijslag",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g76",
    "team": "team-svb-gegevens",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g77",
    "team": "team-svb-platform",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g78",
    "team": "team-svb-platform",
    "event": "incident.opened"
  },
  {
    "id": "sub-g79",
    "team": "team-kvk-handelsregister",
    "event": "incident.opened"
  },
  {
    "id": "sub-g80",
    "team": "team-kvk-api",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g81",
    "team": "team-kvk-api",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g82",
    "team": "team-kvk-ondernemersplein",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g83",
    "team": "team-ienw-kenteken",
    "event": "wet.published"
  },
  {
    "id": "sub-g84",
    "team": "team-ienw-kenteken",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g85",
    "team": "team-ienw-voertuig",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g86",
    "team": "team-ienw-data",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g87",
    "team": "team-ienw-data",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g88",
    "team": "team-cbs-statline",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g89",
    "team": "team-cbs-microdata",
    "event": "incident.opened"
  },
  {
    "id": "sub-g90",
    "team": "team-cbs-microdata",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g91",
    "team": "team-cbs-platform",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g92",
    "team": "team-cbs-privacy",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g93",
    "team": "team-cbs-privacy",
    "event": "wet.published"
  },
  {
    "id": "sub-g94",
    "team": "team-justid-documentatie",
    "event": "wet.published"
  },
  {
    "id": "sub-g95",
    "team": "team-justid-vog",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g96",
    "team": "team-justid-vog",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g97",
    "team": "team-koop-wetten",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g98",
    "team": "team-koop-officielebekendmakingen",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g99",
    "team": "team-koop-officielebekendmakingen",
    "event": "incident.opened"
  },
  {
    "id": "sub-g100",
    "team": "team-dpc-rijksoverheid",
    "event": "incident.opened"
  },
  {
    "id": "sub-g101",
    "team": "team-dpc-content",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g102",
    "team": "team-dpc-content",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g103",
    "team": "team-dji-detentie",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g104",
    "team": "team-dji-data",
    "event": "wet.published"
  },
  {
    "id": "sub-g105",
    "team": "team-dji-data",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g106",
    "team": "team-cbr-rijbewijs",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g107",
    "team": "team-cbr-reservering",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g108",
    "team": "team-cbr-reservering",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g109",
    "team": "team-acm-toezicht",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g110",
    "team": "team-afm-toezicht",
    "event": "incident.opened"
  },
  {
    "id": "sub-g111",
    "team": "team-afm-toezicht",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g112",
    "team": "team-ksa-handhaving",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g113",
    "team": "team-nza-zorgdata",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g114",
    "team": "team-nza-zorgdata",
    "event": "wet.published"
  },
  {
    "id": "sub-g115",
    "team": "team-fin-financieel",
    "event": "wet.published"
  },
  {
    "id": "sub-g116",
    "team": "team-fin-platform",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g117",
    "team": "team-fin-platform",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g118",
    "team": "team-szw-regelingen",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g119",
    "team": "team-vws-zorgregister",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g120",
    "team": "team-vws-zorgregister",
    "event": "incident.opened"
  },
  {
    "id": "sub-g121",
    "team": "team-vws-data",
    "event": "incident.opened"
  },
  {
    "id": "sub-g122",
    "team": "team-jenv-keten",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g123",
    "team": "team-jenv-keten",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g124",
    "team": "team-ocw-cultuurdata",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g125",
    "team": "team-lnv-natuur",
    "event": "wet.published"
  },
  {
    "id": "sub-g126",
    "team": "team-lnv-natuur",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g127",
    "team": "team-ezk-ondernemen",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g128",
    "team": "team-kgg-energie",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g129",
    "team": "team-kgg-energie",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g130",
    "team": "team-az-comms",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g131",
    "team": "team-bz-consulair",
    "event": "incident.opened"
  },
  {
    "id": "sub-g132",
    "team": "team-bz-consulair",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g133",
    "team": "team-def-secinfra",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g134",
    "team": "team-aenm-keten",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g135",
    "team": "team-aenm-keten",
    "event": "wet.published"
  },
  {
    "id": "sub-g136",
    "team": "team-dhc-geschillen",
    "event": "wet.published"
  },
  {
    "id": "sub-g137",
    "team": "team-ez-markt",
    "event": "fleet.pr.merged"
  },
  {
    "id": "sub-g138",
    "team": "team-ez-markt",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g139",
    "team": "team-bzk-iam",
    "event": "cert.expiring"
  },
  {
    "id": "sub-g140",
    "team": "team-bzk-security",
    "event": "deploy.completed"
  },
  {
    "id": "sub-g141",
    "team": "team-bzk-security",
    "event": "incident.opened"
  },
  {
    "id": "sub-g142",
    "team": "team-nldd-docs",
    "event": "incident.opened"
  },
  {
    "id": "sub-g143",
    "team": "team-nldd-iam",
    "event": "cost.budget-exceeded"
  },
  {
    "id": "sub-g144",
    "team": "team-nldd-iam",
    "event": "vuln.detected"
  },
  {
    "id": "sub-g145",
    "team": "team-logius-docs",
    "event": "vuln.detected"
  }
];

export const campaigns = [
  {
    "id": "camp-securitytxt",
    "title": "Voeg security.txt toe (RFC 9116)",
    "type": "file-creation",
    "owner": "team-platform",
    "repos": [
      "repo-paspoort",
      "repo-toeslagen",
      "repo-platformportaal",
      "repo-datadeling"
    ],
    "status": "actief",
    "progress": {
      "open": 1,
      "merged": 2,
      "failing": 1
    }
  },
  {
    "id": "camp-nldd-bump",
    "title": "Bump NLDD design-system naar 0.9",
    "type": "regex",
    "owner": "team-platform",
    "repos": [
      "repo-platformportaal"
    ],
    "status": "afgerond",
    "progress": {
      "open": 0,
      "merged": 1,
      "failing": 0
    }
  },
  {
    "id": "camp-eupl",
    "title": "Zet EUPL-licentie in elke open repo",
    "type": "file-creation",
    "owner": "team-platform",
    "repos": [
      "repo-toeslagen",
      "repo-platformportaal",
      "repo-datadeling",
      "repo-stuc"
    ],
    "status": "concept",
    "progress": {
      "open": 0,
      "merged": 0,
      "failing": 0
    }
  },
  {
    "id": "camp-g0",
    "title": "Bump NLDD design-system naar 0.9",
    "type": "regex",
    "owner": "team-platform",
    "repos": [
      "repo-paspoort",
      "repo-datadeling",
      "repo-studiefinanciering-portaal",
      "repo-aangifte-omzetbelasting",
      "repo-kadaster-viewer",
      "repo-inspectieplanner-ilt",
      "repo-woz-bezwaar",
      "repo-naturalisatie-aanvraag"
    ],
    "status": "actief",
    "progress": {
      "open": 4,
      "merged": 4,
      "failing": 0
    }
  },
  {
    "id": "camp-g1",
    "title": "Migreer naar Forgejo Actions",
    "type": "file-creation",
    "owner": "team-bd-aangifte",
    "repos": [
      "repo-paspoort",
      "repo-stuc",
      "repo-inkomenstoets",
      "repo-kadaster-viewer",
      "repo-aow-uitkering",
      "repo-rijbewijs-vernieuwen",
      "repo-digid-koppeling",
      "repo-adrescheck-bag",
      "repo-boete-bezwaar",
      "repo-pgb-beheer",
      "repo-onderwijsregistratie",
      "repo-omgevingsloket"
    ],
    "status": "afgerond",
    "progress": {
      "open": 5,
      "merged": 6,
      "failing": 1
    }
  },
  {
    "id": "camp-g2",
    "title": "Voeg Dependabot-config toe",
    "type": "file-creation",
    "owner": "team-duo-studiefinanciering",
    "repos": [
      "repo-paspoort",
      "repo-kentekencheck",
      "repo-reisdocument-aanvraag",
      "repo-inspectieplanner-ilt",
      "repo-rijbewijs-vernieuwen",
      "repo-eherkenning-broker",
      "repo-handelsregister-zoeker",
      "repo-zorgtoeslag-portaal",
      "repo-onderwijsregistratie",
      "repo-bouwvergunning",
      "repo-rijksbegroting-explorer",
      "repo-anonimisering-pipeline",
      "repo-fraudedetectie",
      "repo-audit-logboek",
      "repo-statuspagina",
      "repo-feature-flags"
    ],
    "status": "concept",
    "progress": {
      "open": 6,
      "merged": 8,
      "failing": 2
    }
  },
  {
    "id": "camp-g3",
    "title": "Zet CodeQL-scan aan",
    "type": "file-creation",
    "owner": "team-uwv-uitkeringen",
    "repos": [
      "repo-paspoort",
      "repo-studiefinanciering-portaal",
      "repo-kadaster-viewer",
      "repo-woz-bezwaar",
      "repo-digid-koppeling",
      "repo-handelsregister-zoeker",
      "repo-pgb-beheer",
      "repo-leerplicht-melding",
      "repo-verkeersboete-viewer",
      "repo-datakwaliteit-monitor",
      "repo-fraudedetectie",
      "repo-toegangsbeheer",
      "repo-logaggregatie",
      "repo-huisstijl-bibliotheek",
      "repo-brief-generator",
      "repo-wachtrij-manager",
      "repo-gegevensmakelaar",
      "repo-subsidie-aanvraag",
      "repo-declaratie-indienen",
      "repo-backup-scheduler"
    ],
    "status": "actief",
    "progress": {
      "open": 10,
      "merged": 10,
      "failing": 0
    }
  },
  {
    "id": "camp-g4",
    "title": "Vervang verouderde base-image",
    "type": "regex",
    "owner": "team-rvo-subsidies",
    "repos": [
      "repo-paspoort",
      "repo-vergunningchecker",
      "repo-ww-aanvraag",
      "repo-naturalisatie-aanvraag",
      "repo-adrescheck-bag",
      "repo-zorgtoeslag-portaal",
      "repo-leerplicht-melding",
      "repo-parkeervergunning",
      "repo-archief-export",
      "repo-pki-certificaatbeheer",
      "repo-statuspagina",
      "repo-nldd-componenten",
      "repo-brief-generator",
      "repo-notificatieservice",
      "repo-terugmeldvoorziening",
      "repo-factuurverwerking",
      "repo-handtekening-validatie",
      "repo-handhavingsdossier"
    ],
    "status": "afgerond",
    "progress": {
      "open": 8,
      "merged": 9,
      "failing": 1
    }
  },
  {
    "id": "camp-g5",
    "title": "Voeg SBOM-generatie toe (CycloneDX)",
    "type": "file-creation",
    "owner": "team-rws-verkeer",
    "repos": [
      "repo-paspoort",
      "repo-inkomenstoets",
      "repo-aow-uitkering",
      "repo-digid-koppeling",
      "repo-boete-bezwaar",
      "repo-onderwijsregistratie",
      "repo-verkeersboete-viewer",
      "repo-archief-export",
      "repo-secretsmanager",
      "repo-logaggregatie",
      "repo-api-catalogus",
      "repo-vragenlijst-engine",
      "repo-gegevensmakelaar",
      "repo-inkooporder-verwerking",
      "repo-handtekening-validatie",
      "repo-klachtenregistratie"
    ],
    "status": "concept",
    "progress": {
      "open": 6,
      "merged": 8,
      "failing": 2
    }
  }
];

export const techRadar = [
  {
    "name": "Rust",
    "quadrant": "talen",
    "ring": "adopt"
  },
  {
    "name": "Vue 3",
    "quadrant": "talen",
    "ring": "adopt"
  },
  {
    "name": "NLDD Design System",
    "quadrant": "tools",
    "ring": "adopt"
  },
  {
    "name": "Kubernetes",
    "quadrant": "platforms",
    "ring": "adopt"
  },
  {
    "name": "Kafka",
    "quadrant": "platforms",
    "ring": "trial"
  },
  {
    "name": "stuc (fleet-shift)",
    "quadrant": "tools",
    "ring": "trial"
  },
  {
    "name": "Soevereine LLM",
    "quadrant": "technieken",
    "ring": "assess"
  },
  {
    "name": "Service mesh",
    "quadrant": "technieken",
    "ring": "assess"
  },
  {
    "name": "Eigen CI-runners",
    "quadrant": "platforms",
    "ring": "hold"
  }
];

export const llmModels = [
  {
    "id": "overheids-llm-l",
    "name": "Overheids-LLM L",
    "host": "NL (soeverein)",
    "context": "128k",
    "pricePer1m": 2.5,
    "residency": "Nederland",
    "classification": "tot Departementaal Vertrouwelijk"
  },
  {
    "id": "overheids-llm-s",
    "name": "Overheids-LLM S",
    "host": "NL (soeverein)",
    "context": "32k",
    "pricePer1m": 0.8,
    "residency": "Nederland",
    "classification": "tot Departementaal Vertrouwelijk"
  },
  {
    "id": "overheids-llm-eu",
    "name": "Overheids-LLM EU",
    "host": "EU",
    "context": "200k",
    "pricePer1m": 9,
    "residency": "EU",
    "classification": "tot Intern"
  }
];

export const skillPlugins = [
  {
    "id": "standaarden",
    "name": "Logius-standaarden",
    "publisher": "developer-overheid-nl",
    "skills": 10,
    "desc": "API Design Rules, Digikoppeling, OAuth NL, FSC en andere Logius-standaarden als AI-skills.",
    "install": "bg ai skill install standaarden --team team-platform",
    "altInstall": "opencode plugin install standaarden@overheid-plugins",
    "standards": [
      "std-adr"
    ],
    "platforms": [
      "opencode",
      "Cursor"
    ],
    "installs": 34
  },
  {
    "id": "nerds",
    "name": "NeRDS-richtlijnen",
    "publisher": "developer-overheid-nl",
    "skills": 14,
    "desc": "De 14 richtlijnen van de Nederlandse Richtlijn Digitale Systemen, van privacy tot open source.",
    "install": "bg ai skill install nerds --team team-platform",
    "altInstall": "opencode plugin install nerds@overheid-plugins",
    "standards": [
      "std-bio",
      "std-wcag"
    ],
    "platforms": [
      "opencode",
      "Cursor"
    ],
    "installs": 28
  },
  {
    "id": "geo",
    "name": "Geo-standaarden",
    "publisher": "developer-overheid-nl",
    "skills": 6,
    "desc": "Geonovum geo-standaarden: OGC API, metadata, informatiemodellen (NEN 3610, IMGeo).",
    "install": "bg ai skill install geo --team team-data",
    "altInstall": "opencode plugin install geo@overheid-plugins",
    "standards": [],
    "platforms": [
      "opencode",
      "Cursor"
    ],
    "installs": 9
  },
  {
    "id": "internet",
    "name": "Internetstandaarden",
    "publisher": "developer-overheid-nl",
    "skills": 5,
    "desc": "internet.nl web- en mailstandaarden: HTTPS, DNSSEC, DMARC, DKIM, SPF, security.txt.",
    "install": "bg ai skill install internet --team team-platform",
    "altInstall": "opencode plugin install internet@overheid-plugins",
    "standards": [
      "std-internetnl"
    ],
    "platforms": [
      "opencode",
      "Cursor"
    ],
    "installs": 21
  },
  {
    "id": "design",
    "name": "NLDD Design System",
    "publisher": "nldd",
    "skills": 4,
    "desc": "Skills voor het NLDD design system: componenten kiezen, tokens en toegankelijke patronen.",
    "install": "bg ai skill install design --team team-platform",
    "altInstall": "opencode plugin install design@overheid-plugins",
    "standards": [
      "std-nldd"
    ],
    "platforms": [
      "opencode",
      "Cursor"
    ],
    "installs": 31
  },
  {
    "id": "marketplace",
    "name": "Marketplace-meta",
    "publisher": "developer-overheid-nl",
    "skills": 2,
    "desc": "Skills om zelf plugins te publiceren en de marketplace.json gesynchroniseerd te houden.",
    "install": "bg ai skill install marketplace --team team-platform",
    "altInstall": "opencode plugin install marketplace@overheid-plugins",
    "standards": [],
    "platforms": [
      "opencode",
      "Cursor"
    ],
    "installs": 6
  }
];

export const skillInstalls = [
  {
    "team": "team-platform",
    "plugins": [
      "standaarden",
      "nerds",
      "design",
      "internet"
    ]
  },
  {
    "team": "team-burgerzaken",
    "plugins": [
      "standaarden",
      "nerds"
    ]
  },
  {
    "team": "team-toeslagen",
    "plugins": [
      "standaarden",
      "design"
    ]
  },
  {
    "team": "team-data",
    "plugins": [
      "geo",
      "standaarden"
    ]
  }
];

export const learningPaths = [
  {
    "id": "lp-newdev",
    "name": "Nieuwe developer",
    "steps": [
      "Account & werkplek",
      "Eerste repo clonen",
      "Lokaal draaien",
      "Eerste PR"
    ]
  },
  {
    "id": "lp-prod",
    "name": "Eerste service in productie",
    "steps": [
      "App via gebaand pad",
      "Infra afnemen",
      "CI groen",
      "Promoten naar prod"
    ]
  }
];

export const registers = [
  {
    "id": "brp",
    "name": "BRP — Basisregistratie Personen",
    "authority": "rvig",
    "kind": "basisregistratie",
    "oin": "00000001003214345001",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.95%",
    "status": "operationeel",
    "fields": [
      "bsn",
      "geboortedatum",
      "verblijfadres",
      "nationaliteit",
      "partner",
      "overlijdensdatum"
    ]
  },
  {
    "id": "brk",
    "name": "BRK — Basisregistratie Kadaster",
    "authority": "rvig",
    "kind": "basisregistratie",
    "oin": "00000001821002193000",
    "classification": "openbaar met beperkingen",
    "availability": "99.9%",
    "status": "operationeel",
    "fields": [
      "perceel",
      "eigenaar",
      "oppervlakte",
      "beperkingen"
    ]
  },
  {
    "id": "bag",
    "name": "BAG — Adressen en Gebouwen",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000001821002193001",
    "classification": "openbaar",
    "availability": "99.9%",
    "status": "operationeel",
    "fields": [
      "adres",
      "verblijfsobject",
      "bouwjaar",
      "gebruiksdoel",
      "oppervlakte"
    ]
  },
  {
    "id": "hr",
    "name": "Handelsregister (KVK)",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000003244440010000",
    "classification": "openbaar",
    "availability": "99.8%",
    "status": "operationeel",
    "fields": [
      "kvk-nummer",
      "rechtsvorm",
      "vestiging",
      "sbi-code",
      "bestuurders"
    ]
  },
  {
    "id": "inkomen",
    "name": "Inkomensgegevens",
    "authority": "bzk",
    "kind": "sectoraal",
    "oin": "00000001823288444000",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.5%",
    "status": "operationeel",
    "fields": [
      "toetsingsinkomen",
      "verzamelinkomen",
      "fiscaal_partner",
      "belastingjaar"
    ]
  },
  {
    "id": "zorgpolis",
    "name": "Zorgpolis-status",
    "authority": "rvig",
    "kind": "sectoraal",
    "oin": "00000001003214345099",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.7%",
    "status": "operationeel",
    "fields": [
      "is_verzekerd",
      "polis_status",
      "verzekeraar",
      "ingangsdatum"
    ]
  },
  {
    "id": "kenteken",
    "name": "Kentekenregister (RDW)",
    "authority": "logius",
    "kind": "sectoraal",
    "oin": "00000001809000000001",
    "classification": "openbaar met beperkingen",
    "availability": "99.6%",
    "status": "operationeel",
    "fields": [
      "kenteken",
      "voertuigsoort",
      "tenaamstelling",
      "apk-vervaldatum"
    ]
  },
  {
    "id": "bgt",
    "name": "BGT — Basisregistratie Grootschalige Topografie",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000001821002193010",
    "classification": "openbaar",
    "availability": "99.8%",
    "status": "operationeel",
    "fields": [
      "geo_object",
      "wegdeel",
      "waterdeel",
      "begroeid_terrein"
    ]
  },
  {
    "id": "brt",
    "name": "BRT — Basisregistratie Topografie",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000001821002193011",
    "classification": "openbaar",
    "availability": "99.8%",
    "status": "operationeel",
    "fields": [
      "topo_object",
      "schaal",
      "naam",
      "geometrie"
    ]
  },
  {
    "id": "woz",
    "name": "WOZ — Waardering Onroerende Zaken",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000001821002193012",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.5%",
    "status": "operationeel",
    "fields": [
      "woz-waarde",
      "objectnummer",
      "peildatum",
      "belanghebbende"
    ]
  },
  {
    "id": "bro",
    "name": "BRO — Basisregistratie Ondergrond",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000001821002193013",
    "classification": "openbaar",
    "availability": "99.4%",
    "status": "operationeel",
    "fields": [
      "boring",
      "grondwaterstand",
      "bodemkundig_profiel"
    ]
  },
  {
    "id": "brv",
    "name": "BRV — Basisregistratie Voertuigen (RDW)",
    "authority": "logius",
    "kind": "basisregistratie",
    "oin": "00000001809000000002",
    "classification": "openbaar met beperkingen",
    "availability": "99.7%",
    "status": "operationeel",
    "fields": [
      "voertuig",
      "merk",
      "massa",
      "brandstof",
      "eerste_toelating"
    ]
  },
  {
    "id": "bri",
    "name": "BRI — Basisregistratie Inkomen (Belastingdienst)",
    "authority": "bd",
    "kind": "basisregistratie",
    "oin": "00000001003214394001",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.6%",
    "status": "operationeel",
    "fields": [
      "authentiek_inkomen",
      "fiscaal_jaar",
      "bsn"
    ]
  },
  {
    "id": "rni",
    "name": "RNI — Registratie Niet-Ingezetenen",
    "authority": "rvig",
    "kind": "sectoraal",
    "oin": "00000001003214345002",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.5%",
    "status": "operationeel",
    "fields": [
      "bsn",
      "geboorteland",
      "correspondentieadres"
    ]
  },
  {
    "id": "duo-onderwijs",
    "name": "Onderwijsregister (DUO)",
    "authority": "duo",
    "kind": "sectoraal",
    "oin": "00000001822477330000",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.4%",
    "status": "operationeel",
    "fields": [
      "inschrijving",
      "diploma",
      "studieschuld",
      "instelling"
    ]
  },
  {
    "id": "uwv-dienstverband",
    "name": "Polisadministratie (UWV)",
    "authority": "uwv",
    "kind": "sectoraal",
    "oin": "00000001852638390000",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.5%",
    "status": "operationeel",
    "fields": [
      "dienstverband",
      "loon",
      "werkgever",
      "uitkering"
    ]
  },
  {
    "id": "svb-aow",
    "name": "AOW- en AKW-administratie (SVB)",
    "authority": "svb",
    "kind": "sectoraal",
    "oin": "00000001829344440000",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.5%",
    "status": "operationeel",
    "fields": [
      "aow-gerechtigd",
      "opbouwjaren",
      "kinderbijslag"
    ]
  },
  {
    "id": "justid-jdoc",
    "name": "Justitieel Documentatiesysteem (Justid)",
    "authority": "justid",
    "kind": "sectoraal",
    "oin": "00000001003214436002",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.7%",
    "status": "operationeel",
    "fields": [
      "strafblad",
      "vog-indicatie",
      "parketnummer"
    ]
  },
  {
    "id": "ind-vreemdeling",
    "name": "Vreemdelingenadministratie (IND)",
    "authority": "ind",
    "kind": "sectoraal",
    "oin": "00000001003214436003",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.4%",
    "status": "operationeel",
    "fields": [
      "verblijfsstatus",
      "v-nummer",
      "procedure"
    ]
  },
  {
    "id": "rvo-subsidie",
    "name": "Subsidieregister (RVO)",
    "authority": "rvo",
    "kind": "sectoraal",
    "oin": "00000001822477331000",
    "classification": "openbaar met beperkingen",
    "availability": "99.3%",
    "status": "operationeel",
    "fields": [
      "subsidie",
      "regeling",
      "begunstigde",
      "bedrag"
    ]
  },
  {
    "id": "cbs-statline",
    "name": "CBS StatLine",
    "authority": "cbs",
    "kind": "sectoraal",
    "oin": "00000001003214300000",
    "classification": "openbaar",
    "availability": "99.9%",
    "status": "operationeel",
    "fields": [
      "statistiek",
      "periode",
      "regio",
      "indicator"
    ]
  },
  {
    "id": "nhr-uittreksel",
    "name": "NHR — Nieuw Handelsregister uittreksels",
    "authority": "kvk",
    "kind": "sectoraal",
    "oin": "00000003244440010001",
    "classification": "openbaar",
    "availability": "99.8%",
    "status": "operationeel",
    "fields": [
      "uittreksel",
      "jaarrekening",
      "functionaris"
    ]
  },
  {
    "id": "rdw-rijbewijs",
    "name": "Rijbewijsregister (RDW)",
    "authority": "logius",
    "kind": "sectoraal",
    "oin": "00000001809000000003",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.6%",
    "status": "operationeel",
    "fields": [
      "rijbewijs",
      "categorie",
      "geldigheid"
    ]
  },
  {
    "id": "cjib-sanctie",
    "name": "Sanctie- en inningsregister (CJIB)",
    "authority": "cjib",
    "kind": "sectoraal",
    "oin": "00000001003214436004",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.5%",
    "status": "operationeel",
    "fields": [
      "boete",
      "openstaand_bedrag",
      "zaaknummer"
    ]
  },
  {
    "id": "kadaster-wkpb",
    "name": "WKPB — Publiekrechtelijke Beperkingen",
    "authority": "rvig",
    "kind": "sectoraal",
    "oin": "00000001821002193014",
    "classification": "openbaar",
    "availability": "99.6%",
    "status": "operationeel",
    "fields": [
      "beperking",
      "grondslag",
      "object"
    ]
  },
  {
    "id": "bd-omzetbelasting",
    "name": "Omzetbelasting-administratie (Belastingdienst)",
    "authority": "bd",
    "kind": "sectoraal",
    "oin": "00000001003214394002",
    "classification": "bijzondere persoonsgegevens (AVG)",
    "availability": "99.4%",
    "status": "operationeel",
    "fields": [
      "btw-nummer",
      "aangifte",
      "tijdvak"
    ]
  },
  {
    "id": "gba-v",
    "name": "GBA-V — Verstrekkingsvoorziening",
    "authority": "rvig",
    "kind": "sectoraal",
    "oin": "00000001003214345003",
    "classification": "persoonsgegevens (AVG)",
    "availability": "99.7%",
    "status": "operationeel",
    "fields": [
      "persoonslijst",
      "verstrekking",
      "afnemer"
    ]
  },
  {
    "id": "rio",
    "name": "RIO — Registratie Instellingen en Opleidingen",
    "authority": "duo",
    "kind": "sectoraal",
    "oin": "00000001822477332000",
    "classification": "openbaar",
    "availability": "99.3%",
    "status": "in beheer",
    "fields": [
      "instelling",
      "opleiding",
      "brin",
      "croho"
    ]
  },
  {
    "id": "lv-bag",
    "name": "Landelijke Voorziening BAG",
    "authority": "logius",
    "kind": "sectoraal",
    "oin": "00000001821002193002",
    "classification": "openbaar",
    "availability": "99.9%",
    "status": "operationeel",
    "fields": [
      "nummeraanduiding",
      "pand",
      "standplaats",
      "ligplaats"
    ]
  },
  {
    "id": "nha",
    "name": "Nationaal Handelsregister API",
    "authority": "kvk",
    "kind": "sectoraal",
    "oin": "00000003244440010002",
    "classification": "openbaar",
    "availability": "99.8%",
    "status": "operationeel",
    "fields": [
      "zoekterm",
      "vestigingsnummer",
      "rechtspersoon"
    ]
  }
];

export const registerConsumers = [
  {
    "id": "rc-1",
    "register": "inkomen",
    "consumer": "zorgtoeslagwet",
    "via": "toetsingsinkomen",
    "type": "wet"
  },
  {
    "id": "rc-2",
    "register": "zorgpolis",
    "consumer": "zorgtoeslagwet",
    "via": "is_verzekerd",
    "type": "wet"
  },
  {
    "id": "rc-3",
    "register": "brp",
    "consumer": "zorgtoeslagwet",
    "via": "partner",
    "type": "wet"
  },
  {
    "id": "rc-4",
    "register": "brp",
    "consumer": "app-paspoort",
    "via": "verblijfadres",
    "type": "app"
  },
  {
    "id": "rc-5",
    "register": "brp",
    "consumer": "app-toeslagen",
    "via": "geboortedatum",
    "type": "app"
  },
  {
    "id": "rc-6",
    "register": "inkomen",
    "consumer": "app-toeslagen",
    "via": "toetsingsinkomen",
    "type": "app"
  },
  {
    "id": "rc-7",
    "register": "hr",
    "consumer": "app-datadeling",
    "via": "kvk-nummer",
    "type": "app"
  },
  {
    "id": "rc-w0-brp",
    "register": "brp",
    "consumer": "participatiewet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w0-inkomen",
    "register": "inkomen",
    "consumer": "participatiewet",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w0-hr",
    "register": "hr",
    "consumer": "participatiewet",
    "via": "hr_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w1-brp",
    "register": "brp",
    "consumer": "aow",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w1-inkomen",
    "register": "inkomen",
    "consumer": "aow",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w2-brp",
    "register": "brp",
    "consumer": "kinderbijslagwet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w3-brp",
    "register": "brp",
    "consumer": "werkloosheidswet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w3-inkomen",
    "register": "inkomen",
    "consumer": "werkloosheidswet",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w3-hr",
    "register": "hr",
    "consumer": "werkloosheidswet",
    "via": "hr_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w4-brp",
    "register": "brp",
    "consumer": "inkomstenbelasting-2001",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w4-inkomen",
    "register": "inkomen",
    "consumer": "inkomstenbelasting-2001",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w4-brk",
    "register": "brk",
    "consumer": "inkomstenbelasting-2001",
    "via": "brk_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w4-hr",
    "register": "hr",
    "consumer": "inkomstenbelasting-2001",
    "via": "hr_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w5-bag",
    "register": "bag",
    "consumer": "omgevingswet",
    "via": "bag_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w5-brk",
    "register": "brk",
    "consumer": "omgevingswet",
    "via": "brk_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w6-brp",
    "register": "brp",
    "consumer": "awb",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w7-brp",
    "register": "brp",
    "consumer": "kieswet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w8-brp",
    "register": "brp",
    "consumer": "wegenverkeerswet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w8-kenteken",
    "register": "kenteken",
    "consumer": "wegenverkeerswet",
    "via": "kenteken_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w9-brp",
    "register": "brp",
    "consumer": "studiefinanciering",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w9-inkomen",
    "register": "inkomen",
    "consumer": "studiefinanciering",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w10-brp",
    "register": "brp",
    "consumer": "zorgverzekeringswet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w10-zorgpolis",
    "register": "zorgpolis",
    "consumer": "zorgverzekeringswet",
    "via": "zorgpolis_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w10-inkomen",
    "register": "inkomen",
    "consumer": "zorgverzekeringswet",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w11-brp",
    "register": "brp",
    "consumer": "wmo-2015",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w11-inkomen",
    "register": "inkomen",
    "consumer": "wmo-2015",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w12-brp",
    "register": "brp",
    "consumer": "wet-kinderopvang",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w12-inkomen",
    "register": "inkomen",
    "consumer": "wet-kinderopvang",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w12-hr",
    "register": "hr",
    "consumer": "wet-kinderopvang",
    "via": "hr_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w13-brp",
    "register": "brp",
    "consumer": "vreemdelingenwet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w14-bag",
    "register": "bag",
    "consumer": "woz",
    "via": "bag_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w14-brk",
    "register": "brk",
    "consumer": "woz",
    "via": "brk_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w15-brp",
    "register": "brp",
    "consumer": "successiewet",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w15-brk",
    "register": "brk",
    "consumer": "successiewet",
    "via": "brk_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w15-inkomen",
    "register": "inkomen",
    "consumer": "successiewet",
    "via": "inkomen_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w16-hr",
    "register": "hr",
    "consumer": "omzetbelasting-1968",
    "via": "hr_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w17-kenteken",
    "register": "kenteken",
    "consumer": "regeling-kentekenbewijzen",
    "via": "kenteken_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w17-brp",
    "register": "brp",
    "consumer": "regeling-kentekenbewijzen",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w18-brp",
    "register": "brp",
    "consumer": "regeling-studiefinanciering",
    "via": "brp_waarde",
    "type": "wet"
  },
  {
    "id": "rc-w18-inkomen",
    "register": "inkomen",
    "consumer": "regeling-studiefinanciering",
    "via": "inkomen_waarde",
    "type": "wet"
  }
];

export const wetten = [
  {
    "id": "zorgtoeslagwet",
    "name": "Wet op de zorgtoeslag",
    "layer": "WET",
    "bwbId": "BWBR0018451",
    "url": "https://wetten.overheid.nl/BWBR0018451/2025-01-01",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.92,
    "owner": "team-toeslagen",
    "service": "app-toeslagen",
    "traject": null,
    "articles": [
      {
        "number": "2",
        "title": "Hoogte van de zorgtoeslag",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [
          {
            "name": "drempelinkomen_alleenstaande",
            "value": "€ 39.719"
          },
          {
            "name": "percentage_toetsingsinkomen",
            "value": "13,7%"
          }
        ],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "is_verzekerde",
            "type": "boolean",
            "source": {
              "kind": "register",
              "id": "zorgpolis",
              "output": "is_verzekerd"
            }
          },
          {
            "name": "toetsingsinkomen",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "toetsingsinkomen"
            }
          },
          {
            "name": "heeft_toeslagpartner",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "awir",
              "output": "heeft_toeslagpartner"
            }
          },
          {
            "name": "standaardpremie",
            "type": "bedrag",
            "source": {
              "kind": "wet",
              "id": "regeling-standaardpremie",
              "output": "standaardpremie"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht_op_zorgtoeslag",
            "type": "boolean"
          },
          {
            "name": "hoogte_zorgtoeslag",
            "type": "bedrag"
          }
        ],
        "openTerms": [
          {
            "id": "standaardpremie",
            "delegatedTo": "minister",
            "delegationType": "MINISTERIELE_REGELING"
          }
        ]
      }
    ]
  },
  {
    "id": "regeling-standaardpremie",
    "name": "Regeling standaardpremie en bestuursrechtelijke premie",
    "layer": "MINISTERIELE_REGELING",
    "bwbId": "BWBR0036515",
    "url": "https://wetten.overheid.nl/BWBR0036515/2025-01-01",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 1,
    "owner": "team-toeslagen",
    "service": null,
    "traject": null,
    "implements": {
      "law": "zorgtoeslagwet",
      "article": "4",
      "openTerm": "standaardpremie"
    },
    "articles": [
      {
        "number": "1",
        "title": "Standaardpremie",
        "legalCharacter": "REGELING",
        "decisionType": null,
        "definitions": [
          {
            "name": "standaardpremie",
            "value": "€ 2.112"
          }
        ],
        "parameters": [],
        "inputs": [],
        "outputs": [
          {
            "name": "standaardpremie",
            "type": "bedrag"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "awir",
    "name": "Algemene wet inkomensafhankelijke regelingen",
    "layer": "WET",
    "bwbId": "BWBR0018472",
    "url": "https://wetten.overheid.nl/BWBR0018472/2025-01-01",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "enriched",
    "coverage": 0.64,
    "owner": "team-toeslagen",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "3",
        "title": "Toeslagpartner",
        "legalCharacter": "TOETS",
        "decisionType": null,
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "partner",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "partner"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_toeslagpartner",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "huurtoeslagwet",
    "name": "Wet op de huurtoeslag",
    "layer": "WET",
    "bwbId": "BWBR0008659",
    "url": "https://wetten.overheid.nl/BWBR0008659/2025-01-01",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "harvested",
    "coverage": 0,
    "owner": "team-toeslagen",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Begripsbepalingen",
        "legalCharacter": null,
        "decisionType": null,
        "definitions": [],
        "parameters": [],
        "inputs": [],
        "outputs": [],
        "openTerms": []
      }
    ]
  },
  {
    "id": "participatiewet",
    "name": "Participatiewet",
    "layer": "WET",
    "bwbId": "BWBR0015703",
    "url": "https://wetten.overheid.nl/BWBR0015703",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.88,
    "owner": "team-svb-gegevens",
    "service": "app-bijstandsuitkering",
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "waarde"
            }
          },
          {
            "name": "hr_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "hr",
              "output": "waarde"
            }
          },
          {
            "name": "awir_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "awir",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "aow",
    "name": "Algemene Ouderdomswet (AOW)",
    "layer": "WET",
    "bwbId": "BWBR0002221",
    "url": "https://wetten.overheid.nl/BWBR0002221",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "enriched",
    "coverage": 0.94,
    "owner": "team-ez-markt",
    "service": "app-aow-uitkering",
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "status"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "status"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "kinderbijslagwet",
    "name": "Algemene Kinderbijslagwet",
    "layer": "WET",
    "bwbId": "BWBR0002368",
    "url": "https://wetten.overheid.nl/BWBR0002368",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.9,
    "owner": "team-nza-zorgdata",
    "service": "app-kinderbijslag",
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "gegeven"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "werkloosheidswet",
    "name": "Werkloosheidswet",
    "layer": "WET",
    "bwbId": "BWBR0004045",
    "url": "https://wetten.overheid.nl/BWBR0004045",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "in bewerking",
    "coverage": 0.71,
    "owner": "team-svb-kinderbijslag",
    "service": "app-ww-aanvraag",
    "traject": "werkloosheid-1000003",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "waarde"
            }
          },
          {
            "name": "hr_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "hr",
              "output": "waarde"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "inkomstenbelasting-2001",
    "name": "Wet inkomstenbelasting 2001",
    "layer": "WET",
    "bwbId": "BWBR0011353",
    "url": "https://wetten.overheid.nl/BWBR0011353",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "enriched",
    "coverage": 0.83,
    "owner": "team-def-secinfra",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "status"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "status"
            }
          },
          {
            "name": "brk_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brk",
              "output": "status"
            }
          },
          {
            "name": "hr_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "hr",
              "output": "status"
            }
          },
          {
            "name": "woz_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "woz",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "omgevingswet",
    "name": "Omgevingswet",
    "layer": "WET",
    "bwbId": "BWBR0037885",
    "url": "https://wetten.overheid.nl/BWBR0037885",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "in bewerking",
    "coverage": 0.58,
    "owner": "team-rvig-brp",
    "service": "app-vergunningchecker",
    "traject": "omgevingswet-1000005",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "bag_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "bag",
              "output": "gegeven"
            }
          },
          {
            "name": "brk_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brk",
              "output": "gegeven"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "awb",
    "name": "Algemene wet bestuursrecht (Awb)",
    "layer": "WET",
    "bwbId": "BWBR0005537",
    "url": "https://wetten.overheid.nl/BWBR0005537",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.79,
    "owner": "team-ienw-data",
    "service": "app-bezwaarafhandeling",
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "kieswet",
    "name": "Kieswet",
    "layer": "WET",
    "bwbId": "BWBR0004627",
    "url": "https://wetten.overheid.nl/BWBR0004627",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "harvested",
    "coverage": 0.42,
    "owner": "team-az-comms",
    "service": null,
    "traject": "kieswet-1000007",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "status"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "wegenverkeerswet",
    "name": "Wegenverkeerswet 1994",
    "layer": "WET",
    "bwbId": "BWBR0006622",
    "url": "https://wetten.overheid.nl/BWBR0006622",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "enriched",
    "coverage": 0.86,
    "owner": "team-cjib-inning",
    "service": "app-kentekencheck",
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "gegeven"
            }
          },
          {
            "name": "kenteken_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "kenteken",
              "output": "gegeven"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "studiefinanciering",
    "name": "Wet studiefinanciering 2000",
    "layer": "WET",
    "bwbId": "BWBR0011453",
    "url": "https://wetten.overheid.nl/BWBR0011453",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.81,
    "owner": "team-logius-stelsel",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "waarde"
            }
          },
          {
            "name": "awir_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "awir",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "zorgverzekeringswet",
    "name": "Zorgverzekeringswet",
    "layer": "WET",
    "bwbId": "BWBR0018450",
    "url": "https://wetten.overheid.nl/BWBR0018450",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "enriched",
    "coverage": 0.91,
    "owner": "team-acm-toezicht",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "status"
            }
          },
          {
            "name": "zorgpolis_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "zorgpolis",
              "output": "status"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "status"
            }
          },
          {
            "name": "zorgtoeslagwet_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "zorgtoeslagwet",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "wmo-2015",
    "name": "Wet maatschappelijke ondersteuning 2015",
    "layer": "WET",
    "bwbId": "BWBR0035362",
    "url": "https://wetten.overheid.nl/BWBR0035362",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "in bewerking",
    "coverage": 0.64,
    "owner": "team-bz-consulair",
    "service": null,
    "traject": "wmo-2015-100000b",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "gegeven"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "gegeven"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "wet-kinderopvang",
    "name": "Wet kinderopvang",
    "layer": "WET",
    "bwbId": "BWBR0017017",
    "url": "https://wetten.overheid.nl/BWBR0017017",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.77,
    "owner": "team-kgg-energie",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "waarde"
            }
          },
          {
            "name": "hr_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "hr",
              "output": "waarde"
            }
          },
          {
            "name": "awir_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "awir",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "vreemdelingenwet",
    "name": "Vreemdelingenwet 2000",
    "layer": "WET",
    "bwbId": "BWBR0011823",
    "url": "https://wetten.overheid.nl/BWBR0011823",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "harvested",
    "coverage": 0.39,
    "owner": "team-rvo-vergunningen",
    "service": null,
    "traject": "vreemdelinge-100000d",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "status"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "woz",
    "name": "Wet waardering onroerende zaken (WOZ)",
    "layer": "WET",
    "bwbId": "BWBR0007119",
    "url": "https://wetten.overheid.nl/BWBR0007119",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "enriched",
    "coverage": 0.85,
    "owner": "team-rws-inspectie",
    "service": "app-woz-bezwaar",
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "bag_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "bag",
              "output": "gegeven"
            }
          },
          {
            "name": "brk_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brk",
              "output": "gegeven"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "successiewet",
    "name": "Successiewet 1956",
    "layer": "WET",
    "bwbId": "BWBR0002226",
    "url": "https://wetten.overheid.nl/BWBR0002226",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "in bewerking",
    "coverage": 0.6,
    "owner": "team-logius-stelsel",
    "service": null,
    "traject": "successiewet-100000f",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          },
          {
            "name": "brk_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brk",
              "output": "waarde"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "waarde"
            }
          },
          {
            "name": "woz_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "woz",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "omzetbelasting-1968",
    "name": "Wet op de omzetbelasting 1968",
    "layer": "WET",
    "bwbId": "BWBR0002629",
    "url": "https://wetten.overheid.nl/BWBR0002629",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "gepubliceerd",
    "coverage": 0.82,
    "owner": "team-bd-iam",
    "service": null,
    "traject": null,
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "hr_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "hr",
              "output": "status"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "regeling-kentekenbewijzen",
    "name": "Kentekenreglement",
    "layer": "MINISTERIELE_REGELING",
    "bwbId": "BWBR0007421",
    "url": "https://wetten.overheid.nl/BWBR0007421",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "harvested",
    "coverage": 0.47,
    "owner": "team-uwv-werk",
    "service": null,
    "traject": "regeling-ken-1000011",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "kenteken_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "kenteken",
              "output": "gegeven"
            }
          },
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "gegeven"
            }
          },
          {
            "name": "wegenverkeerswet_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "wegenverkeerswet",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  },
  {
    "id": "regeling-studiefinanciering",
    "name": "Regeling studiefinanciering 2000",
    "layer": "MINISTERIELE_REGELING",
    "bwbId": "BWBR0011986",
    "url": "https://wetten.overheid.nl/BWBR0011986",
    "validFrom": "2025-01-01",
    "version": "2025-01-01",
    "status": "in bewerking",
    "coverage": 0.55,
    "owner": "team-koop-wetten",
    "service": null,
    "traject": "regeling-stu-1000012",
    "articles": [
      {
        "number": "1",
        "title": "Uitvoering",
        "legalCharacter": "BESCHIKKING",
        "decisionType": "TOEKENNING",
        "definitions": [],
        "parameters": [
          {
            "name": "bsn",
            "type": "string",
            "required": true
          }
        ],
        "inputs": [
          {
            "name": "brp_waarde",
            "type": "string",
            "source": {
              "kind": "register",
              "id": "brp",
              "output": "waarde"
            }
          },
          {
            "name": "inkomen_waarde",
            "type": "bedrag",
            "source": {
              "kind": "register",
              "id": "inkomen",
              "output": "waarde"
            }
          },
          {
            "name": "studiefinanciering_uitkomst",
            "type": "boolean",
            "source": {
              "kind": "wet",
              "id": "studiefinanciering",
              "output": "uitkomst"
            }
          }
        ],
        "outputs": [
          {
            "name": "heeft_recht",
            "type": "boolean"
          }
        ],
        "openTerms": []
      }
    ]
  }
];

export const trajecten = [
  {
    "id": "awir-3f2a9c01",
    "name": "AWIR toeslagpartner-logica",
    "wet": "awir",
    "status": "in review",
    "branch": "awir-3f2a9c01",
    "members": [
      "sanne",
      "joost"
    ],
    "team": "team-toeslagen",
    "opened": "di 11:00"
  },
  {
    "id": "huurtoeslag-7b1e4d22",
    "name": "Huurtoeslagwet machine-leesbaar",
    "wet": "huurtoeslagwet",
    "status": "concept",
    "branch": "huurtoeslag-7b1e4d22",
    "members": [
      "sanne"
    ],
    "team": "team-toeslagen",
    "opened": "vandaag 08:30"
  },
  {
    "id": "werkloosheid-1000003",
    "name": "Werkloosheidswet machine-leesbaar",
    "wet": "werkloosheidswet",
    "status": "concept",
    "branch": "werkloosheid-1000003",
    "members": [
      "femke-meijer"
    ],
    "team": "team-svb-kinderbijslag",
    "opened": "deze week"
  },
  {
    "id": "omgevingswet-1000005",
    "name": "Omgevingswet machine-leesbaar",
    "wet": "omgevingswet",
    "status": "concept",
    "branch": "omgevingswet-1000005",
    "members": [
      "sven-ben-ali"
    ],
    "team": "team-rvig-brp",
    "opened": "deze week"
  },
  {
    "id": "kieswet-1000007",
    "name": "Kieswet machine-leesbaar",
    "wet": "kieswet",
    "status": "concept",
    "branch": "kieswet-1000007",
    "members": [
      "nadia-arslan"
    ],
    "team": "team-az-comms",
    "opened": "deze week"
  },
  {
    "id": "wmo-2015-100000b",
    "name": "Wet maatschappelijke ondersteuning 2015 machine-leesbaar",
    "wet": "wmo-2015",
    "status": "concept",
    "branch": "wmo-2015-100000b",
    "members": [
      "hassan-van-loon"
    ],
    "team": "team-bz-consulair",
    "opened": "deze week"
  },
  {
    "id": "vreemdelinge-100000d",
    "name": "Vreemdelingenwet 2000 machine-leesbaar",
    "wet": "vreemdelingenwet",
    "status": "concept",
    "branch": "vreemdelinge-100000d",
    "members": [
      "olivier-el-khattabi"
    ],
    "team": "team-rvo-vergunningen",
    "opened": "deze week"
  },
  {
    "id": "successiewet-100000f",
    "name": "Successiewet 1956 machine-leesbaar",
    "wet": "successiewet",
    "status": "concept",
    "branch": "successiewet-100000f",
    "members": [
      "floris-van-beek"
    ],
    "team": "team-logius-stelsel",
    "opened": "deze week"
  },
  {
    "id": "regeling-ken-1000011",
    "name": "Kentekenreglement machine-leesbaar",
    "wet": "regeling-kentekenbewijzen",
    "status": "concept",
    "branch": "regeling-ken-1000011",
    "members": [
      "tariq-mulder"
    ],
    "team": "team-uwv-werk",
    "opened": "deze week"
  },
  {
    "id": "regeling-stu-1000012",
    "name": "Regeling studiefinanciering 2000 machine-leesbaar",
    "wet": "regeling-studiefinanciering",
    "status": "concept",
    "branch": "regeling-stu-1000012",
    "members": [
      "luuk-bosman"
    ],
    "team": "team-koop-wetten",
    "opened": "deze week"
  }
];

export const scenarios = [
  {
    "id": "sc-1",
    "wet": "zorgtoeslagwet",
    "name": "Alleenstaande boven 18 heeft recht (2025)",
    "given": [
      "rekendatum 2025-01-01",
      "verzekerd via zorgpolis",
      "toetsingsinkomen € 25.000",
      "geen toeslagpartner"
    ],
    "then": "recht op zorgtoeslag, hoogte € 2.096,92",
    "status": "pass"
  },
  {
    "id": "sc-2",
    "wet": "zorgtoeslagwet",
    "name": "Inkomen boven grens: geen recht",
    "given": [
      "rekendatum 2025-01-01",
      "verzekerd",
      "toetsingsinkomen € 45.000"
    ],
    "then": "geen recht op zorgtoeslag",
    "status": "pass"
  },
  {
    "id": "sc-3",
    "wet": "zorgtoeslagwet",
    "name": "Niet verzekerd: geen recht",
    "given": [
      "rekendatum 2025-01-01",
      "niet verzekerd via zorgpolis"
    ],
    "then": "geen recht op zorgtoeslag",
    "status": "pass"
  },
  {
    "id": "sc-4",
    "wet": "awir",
    "name": "Gehuwd: heeft toeslagpartner",
    "given": [
      "partner geregistreerd in BRP"
    ],
    "then": "heeft_toeslagpartner = waar",
    "status": "pass"
  },
  {
    "id": "sc-g0",
    "wet": "participatiewet",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g1",
    "wet": "aow",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g2",
    "wet": "kinderbijslagwet",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g4",
    "wet": "inkomstenbelasting-2001",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g6",
    "wet": "awb",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g8",
    "wet": "wegenverkeerswet",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g9",
    "wet": "studiefinanciering",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g10",
    "wet": "zorgverzekeringswet",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g12",
    "wet": "wet-kinderopvang",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g14",
    "wet": "woz",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  },
  {
    "id": "sc-g16",
    "wet": "omzetbelasting-1968",
    "name": "Standaardgeval heeft recht",
    "given": [
      "rekendatum 2025-01-01",
      "aan voorwaarden voldaan"
    ],
    "then": "recht toegekend",
    "status": "pass"
  }
];

// --- Datasets: the data catalog (data.overheid.nl-equivalent) with quality
// labels goud/zilver/brons. Each dataset references a real register (its
// source), the laws that mandate it, and the apps that consume it, so the
// lineage chain wet -> register -> dataset -> app is navigable. ---
export const datasets = [
  {
    id: "ds-toetsingsinkomen-2026", name: "Toetsingsinkomens 2026", team: "team-toeslagen",
    register: "inkomen", qualityLabel: "goud",
    dimensions: { volledigheid: 98, actualiteit: 95, herleidbaarheid: 100, juistheid: 96, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG art. 9)", sla: "99.5%", refresh: "dagelijks",
    format: ["JSON-API", "CSV"], consumers: ["app-toeslagen", "app-inkomenstoets"], apis: [], wetten: ["awir", "huurtoeslagwet"],
    updated: "2026-05-28", description: "Toetsingsinkomens per BSN per belastingjaar, afgeleid uit de aangifte."
  },
  {
    id: "ds-adressen-bag", name: "Adressen en panden (BAG)", team: "team-data",
    register: "bag", qualityLabel: "goud",
    dimensions: { volledigheid: 99, actualiteit: 97, herleidbaarheid: 100, juistheid: 98, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.9%", refresh: "dagelijks",
    format: ["JSON-API", "GeoPackage"], consumers: ["app-vergunningchecker"], apis: [], wetten: ["participatiewet"],
    updated: "2026-05-30", description: "Basisregistratie Adressen en Gebouwen: alle adressen en panden in Nederland."
  },
  {
    id: "ds-kentekens-rdw", name: "Voertuigregistraties", team: "team-data",
    register: "kenteken", qualityLabel: "goud",
    dimensions: { volledigheid: 99, actualiteit: 99, herleidbaarheid: 95, juistheid: 97, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.9%", refresh: "realtime",
    format: ["JSON-API"], consumers: ["app-kentekencheck"], apis: [], wetten: [],
    updated: "2026-06-01", description: "Voertuig- en kentekengegevens uit het kentekenregister van de RDW."
  },
  {
    id: "ds-huishoudsamenstelling", name: "Huishoudsamenstelling", team: "team-toeslagen",
    register: "brp", qualityLabel: "zilver",
    dimensions: { volledigheid: 88, actualiteit: 82, herleidbaarheid: 90, juistheid: 85, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Herleidbaar tot personen (AVG)", sla: "99.0%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-toeslagen", "app-inkomenstoets"], apis: [], wetten: ["awir", "kinderbijslagwet"],
    updated: "2026-05-20", description: "Samenstelling van huishoudens, afgeleid uit de BRP voor toeslagberekeningen."
  },
  {
    id: "ds-woz-waarden", name: "WOZ-waarden", team: "team-data",
    register: "woz", qualityLabel: "zilver",
    dimensions: { volledigheid: 91, actualiteit: 78, herleidbaarheid: 88, juistheid: 90, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.0%", refresh: "jaarlijks",
    format: ["JSON-API", "CSV"], consumers: ["app-vergunningchecker"], apis: [], wetten: [],
    updated: "2026-01-15", description: "WOZ-waarden van onroerende zaken, jaarlijks vastgesteld."
  },
  {
    id: "ds-bedrijven-hr", name: "Bedrijvenregister (HR)", team: "team-data",
    register: "hr", qualityLabel: "goud",
    dimensions: { volledigheid: 97, actualiteit: 96, herleidbaarheid: 99, juistheid: 95, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.9%", refresh: "dagelijks",
    format: ["JSON-API"], consumers: ["app-vergunningchecker"], apis: [], wetten: ["participatiewet"],
    updated: "2026-05-29", description: "Handelsregister: alle ingeschreven ondernemingen en rechtspersonen."
  },
  {
    id: "ds-eigendom-brk", name: "Eigendomsgegevens (BRK)", team: "team-data",
    register: "brk", qualityLabel: "zilver",
    dimensions: { volledigheid: 90, actualiteit: 85, herleidbaarheid: 92, juistheid: 88, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Eigendom is herleidbaar tot personen", sla: "99.0%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-vergunningchecker"], apis: [], wetten: [],
    updated: "2026-05-12", description: "Kadastrale eigendomsgegevens uit de Basisregistratie Kadaster."
  },
  {
    id: "ds-personen-brp", name: "Persoonsgegevens (BRP)", team: "team-toeslagen",
    register: "brp", qualityLabel: "goud",
    dimensions: { volledigheid: 99, actualiteit: 98, herleidbaarheid: 100, juistheid: 99, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Persoonsgegevens (AVG)", sla: "99.95%", refresh: "realtime",
    format: ["JSON-API"], consumers: ["app-toeslagen", "app-inkomenstoets"], apis: [], wetten: ["awir", "zorgtoeslagwet", "kinderbijslagwet"],
    updated: "2026-06-01", description: "Gezaghebbende persoonsgegevens uit de Basisregistratie Personen."
  },
  {
    id: "ds-vergunningen-historie", name: "Vergunningenhistorie", team: "team-platform",
    register: "bag", qualityLabel: "brons",
    dimensions: { volledigheid: 64, actualiteit: 58, herleidbaarheid: 72, juistheid: 70, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "97.0%", refresh: "maandelijks",
    format: ["CSV"], consumers: ["app-vergunningchecker"], apis: [], wetten: [],
    updated: "2026-03-04", description: "Historische vergunningbesluiten, deels nog niet gestructureerd ontsloten."
  },
  {
    id: "ds-inkomen-historie", name: "Inkomenshistorie meerjarig", team: "team-toeslagen",
    register: "inkomen", qualityLabel: "brons",
    dimensions: { volledigheid: 68, actualiteit: 55, herleidbaarheid: 80, juistheid: 74, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "98.0%", refresh: "jaarlijks",
    format: ["CSV"], consumers: ["app-inkomenstoets"], apis: [], wetten: ["awir"],
    updated: "2025-12-01", description: "Meerjarige inkomenshistorie, niet alle jaren even volledig beschikbaar."
  },
  {
    id: "ds-zorgpolissen", name: "Zorgpolissen", team: "team-toeslagen",
    register: "brp", qualityLabel: "zilver",
    dimensions: { volledigheid: 86, actualiteit: 89, herleidbaarheid: 84, juistheid: 87, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Gezondheidsgerelateerd (AVG art. 9)", sla: "99.0%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-toeslagen"], apis: [], wetten: ["zorgtoeslagwet"],
    updated: "2026-05-18", description: "Actieve zorgverzekeringspolissen, grondslag voor de zorgtoeslag."
  },
  {
    id: "ds-statline-demografie", name: "Demografie open data (StatLine)", team: "team-data",
    register: "woz", qualityLabel: "goud",
    dimensions: { volledigheid: 96, actualiteit: 90, herleidbaarheid: 98, juistheid: 95, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.5%", refresh: "maandelijks",
    format: ["JSON-API", "CSV"], consumers: [], apis: [], wetten: [],
    updated: "2026-05-01", description: "Geaggregeerde demografische statistieken, volledig openbaar via open data."
  },
  {
    id: "ds-rijbewijzen-cbr", name: "Rijbewijsregister", team: "team-cbr-rijbewijs",
    register: "kenteken", qualityLabel: "goud",
    dimensions: { volledigheid: 97, actualiteit: 96, herleidbaarheid: 98, juistheid: 95, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.9%", refresh: "realtime",
    format: ["JSON-API"], consumers: ["app-rijbewijs-vernieuwen"], apis: [], wetten: [],
    updated: "2026-05-26", description: "Geldige rijbewijzen en categorieën uit het CBR-register."
  },
  {
    id: "ds-studieschuld", name: "Studieschulden", team: "team-duo-studiefinanciering",
    register: "duo-onderwijs", qualityLabel: "zilver",
    dimensions: { volledigheid: 90, actualiteit: 84, herleidbaarheid: 88, juistheid: 86, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "99.0%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-studiefinanciering-portaal", "app-studielening-rekentool"], apis: [], wetten: ["awir"],
    updated: "2026-02-02", description: "Openstaande studieschuld per debiteur."
  },
  {
    id: "ds-diploma-register", name: "Diplomaregister", team: "team-duo-register",
    register: "duo-onderwijs", qualityLabel: "goud",
    dimensions: { volledigheid: 98, actualiteit: 95, herleidbaarheid: 99, juistheid: 97, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "99.5%", refresh: "dagelijks",
    format: ["JSON-API"], consumers: ["app-diplomaregister", "app-naturalisatie-aanvraag"], apis: [], wetten: [],
    updated: "2026-05-06", description: "Behaalde diploma's en getuigschriften uit DUO."
  },
  {
    id: "ds-verblijfsvergunningen", name: "Verblijfsvergunningen", team: "team-ind-dossiers",
    register: "brp", qualityLabel: "goud",
    dimensions: { volledigheid: 96, actualiteit: 94, herleidbaarheid: 97, juistheid: 95, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Bijzondere persoonsgegevens (AVG art. 9)", sla: "99.5%", refresh: "dagelijks",
    format: ["JSON-API"], consumers: ["app-verblijfsvergunning", "app-naturalisatie-aanvraag"], apis: [], wetten: ["participatiewet"],
    updated: "2026-05-17", description: "Actuele verblijfsstatus en vergunningen uit de IND-keten."
  },
  {
    id: "ds-aow-rechten", name: "AOW-rechten", team: "team-data",
    register: "svb-aow", qualityLabel: "goud",
    dimensions: { volledigheid: 97, actualiteit: 93, herleidbaarheid: 96, juistheid: 95, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "99.5%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-aow-uitkering"], apis: [], wetten: ["aow"],
    updated: "2026-02-04", description: "Opgebouwde AOW-rechten per verzekerde."
  },
  {
    id: "ds-dienstverbanden", name: "Dienstverbanden (UWV)", team: "team-data",
    register: "uwv-dienstverband", qualityLabel: "zilver",
    dimensions: { volledigheid: 89, actualiteit: 86, herleidbaarheid: 90, juistheid: 88, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "99.0%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-ww-aanvraag", "app-bijstandsuitkering"], apis: [], wetten: ["werkloosheidswet"],
    updated: "2026-05-22", description: "Actuele en historische dienstverbanden uit de polisadministratie."
  },
  {
    id: "ds-omzetbelasting-aangiften", name: "Omzetbelasting-aangiften", team: "team-bd-aangifte",
    register: "bd-omzetbelasting", qualityLabel: "goud",
    dimensions: { volledigheid: 96, actualiteit: 97, herleidbaarheid: 98, juistheid: 96, avgClassificatie: "financiële gegevens" },
    open: false, openReason: "Financiële persoonsgegevens (AVG)", sla: "99.5%", refresh: "dagelijks",
    format: ["JSON-API"], consumers: ["app-aangifte-omzetbelasting"], apis: [], wetten: ["omzetbelasting-1968"],
    updated: "2026-05-03", description: "Ingediende btw-aangiften per ondernemer."
  },
  {
    id: "ds-geo-bgt", name: "Geo-objecten (BGT)", team: "team-data",
    register: "bgt", qualityLabel: "goud",
    dimensions: { volledigheid: 99, actualiteit: 92, herleidbaarheid: 99, juistheid: 97, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.9%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-omgevingsloket", "app-bouwvergunning"], apis: [], wetten: [],
    updated: "2026-05-26", description: "Basisregistratie Grootschalige Topografie."
  },
  {
    id: "ds-wkpb-beperkingen", name: "Publiekrechtelijke beperkingen", team: "team-data",
    register: "kadaster-wkpb", qualityLabel: "zilver",
    dimensions: { volledigheid: 88, actualiteit: 80, herleidbaarheid: 90, juistheid: 85, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "99.0%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-vergunningchecker", "app-kadaster-viewer"], apis: [], wetten: [],
    updated: "2026-05-07", description: "Beperkingenbesluiten op onroerende zaken (WKPB)."
  },
  {
    id: "ds-loonheffing", name: "Loonheffingsgegevens", team: "team-bd-gegevens",
    register: "inkomen", qualityLabel: "zilver",
    dimensions: { volledigheid: 91, actualiteit: 88, herleidbaarheid: 92, juistheid: 90, avgClassificatie: "financiële gegevens" },
    open: false, openReason: "Financiële persoonsgegevens (AVG)", sla: "99.0%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-loonheffing", "app-inkomenstoets"], apis: [], wetten: ["inkomstenbelasting-2001"],
    updated: "2026-02-16", description: "Ingehouden loonheffing per werknemer."
  },
  {
    id: "ds-verkeersboetes", name: "Verkeersboetes", team: "team-cjib-sanctie",
    register: "kenteken", qualityLabel: "zilver",
    dimensions: { volledigheid: 90, actualiteit: 90, herleidbaarheid: 86, juistheid: 88, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "99.0%", refresh: "dagelijks",
    format: ["JSON-API"], consumers: ["app-verkeersboete-viewer", "app-incasso-cjib"], apis: [], wetten: [],
    updated: "2026-05-10", description: "Opgelegde verkeersboetes gekoppeld aan kenteken."
  },
  {
    id: "ds-vaccinaties", name: "Vaccinatiegegevens", team: "team-data",
    register: "brp", qualityLabel: "brons",
    dimensions: { volledigheid: 66, actualiteit: 60, herleidbaarheid: 72, juistheid: 68, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Bijzondere persoonsgegevens (AVG art. 9)", sla: "98.0%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-vaccinatieregister"], apis: [], wetten: [],
    updated: "2026-05-21", description: "Geregistreerde vaccinaties, dekking nog niet volledig."
  },
  {
    id: "ds-milieumeldingen", name: "Milieumeldingen", team: "team-data",
    register: "bag", qualityLabel: "brons",
    dimensions: { volledigheid: 62, actualiteit: 55, herleidbaarheid: 70, juistheid: 64, avgClassificatie: "openbaar" },
    open: true, openReason: "", sla: "97.0%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-milieumelding"], apis: [], wetten: [],
    updated: "2026-01-17", description: "Meldingen over milieuovertredingen, deels ongestructureerd."
  },
  {
    id: "ds-subsidies-rvo", name: "Subsidietoekenningen", team: "team-data",
    register: "hr", qualityLabel: "zilver",
    dimensions: { volledigheid: 87, actualiteit: 83, herleidbaarheid: 89, juistheid: 86, avgClassificatie: "financiële gegevens" },
    open: false, openReason: "Financiële persoonsgegevens (AVG)", sla: "99.0%", refresh: "wekelijks",
    format: ["JSON-API"], consumers: ["app-subsidieportaal-rvo", "app-subsidie-aanvraag"], apis: [], wetten: [],
    updated: "2026-05-16", description: "Toegekende subsidies per onderneming."
  },
  {
    id: "ds-waterschapsheffing", name: "Waterschapsheffingen", team: "team-data",
    register: "woz", qualityLabel: "zilver",
    dimensions: { volledigheid: 85, actualiteit: 82, herleidbaarheid: 88, juistheid: 84, avgClassificatie: "persoonsgegevens" },
    open: false, openReason: "Bevat persoonsgegevens (AVG)", sla: "99.0%", refresh: "jaarlijks",
    format: ["JSON-API"], consumers: ["app-waterschapsheffing"], apis: [], wetten: [],
    updated: "2026-02-11", description: "Heffingsgrondslagen voor waterschapsbelasting."
  },
  {
    id: "ds-leerplicht", name: "Leerplichtregistratie", team: "team-duo-register",
    register: "duo-onderwijs", qualityLabel: "brons",
    dimensions: { volledigheid: 68, actualiteit: 64, herleidbaarheid: 74, juistheid: 70, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Bijzondere persoonsgegevens (AVG art. 9)", sla: "98.0%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-leerplicht-melding"], apis: [], wetten: [],
    updated: "2026-03-11", description: "Verzuim- en leerplichtmeldingen, kwaliteit wisselt per gemeente."
  },
  {
    id: "ds-pgb-budgetten", name: "PGB-budgetten", team: "team-data",
    register: "brp", qualityLabel: "zilver",
    dimensions: { volledigheid: 86, actualiteit: 84, herleidbaarheid: 87, juistheid: 85, avgClassificatie: "bijzondere persoonsgegevens" },
    open: false, openReason: "Bijzondere persoonsgegevens (AVG art. 9)", sla: "99.0%", refresh: "maandelijks",
    format: ["JSON-API"], consumers: ["app-pgb-beheer"], apis: [], wetten: ["participatiewet"],
    updated: "2026-01-06", description: "Persoonsgebonden budgetten in de zorg."
  },

];

// --- Algoritmeregister: mandatory NL government register (2023) of algorithms
// and AI systems in production. Cross-links to datasets (data sources), LLM
// models (for type 'llm'), and the app each runs in. ---
export const algoritmes = [
  {
    id: "alg-toeslagen-risico", name: "Risico-indicatie toeslagen", team: "team-toeslagen",
    doel: "Aanvragen selecteren voor handmatige controle.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-toetsingsinkomen-2026", "ds-huishoudsamenstelling"],
    app: "app-toeslagen", status: "productie", published: "2024-02-01",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/risico-indicatie-toeslagen"
  },
  {
    id: "alg-inkomenstoets", name: "Geautomatiseerde inkomenstoets", team: "team-toeslagen",
    doel: "Recht op toeslag berekenen uit het toetsingsinkomen.", type: "rule-based", model: null,
    uitlegbaarheid: "hoog", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: false, besluitvorming: "bepalend", dataSources: ["ds-toetsingsinkomen-2026", "ds-personen-brp"],
    app: "app-inkomenstoets", status: "productie", published: "2023-06-15",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/inkomenstoets"
  },
  {
    id: "alg-vergunning-classificatie", name: "Vergunningclassificatie", team: "team-platform",
    doel: "Vergunningaanvragen automatisch categoriseren.", type: "llm", model: "overheids-llm-l",
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "vereist",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-vergunningen-historie", "ds-bedrijven-hr"],
    app: "app-vergunningchecker", status: "pilot", published: "2026-04-10",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/vergunningclassificatie"
  },
  {
    id: "alg-kenteken-ocr", name: "Kentekenherkenning", team: "team-data",
    doel: "Kentekens herkennen uit camerabeelden.", type: "ml", model: null,
    uitlegbaarheid: "laag", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-kentekens-rdw"],
    app: "app-kentekencheck", status: "productie", published: "2023-11-20",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/kentekenherkenning"
  },
  {
    id: "alg-fraudesignaal", name: "Fraudesignalering", team: "team-toeslagen",
    doel: "Signalen van mogelijk onrechtmatig gebruik markeren.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "vereist", discriminatietoets: "vereist",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-inkomen-historie", "ds-huishoudsamenstelling"],
    app: "app-toeslagen", status: "pilot", published: "2026-05-01",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/fraudesignalering"
  },
  {
    id: "alg-burgerbrief-assistent", name: "Burgerbrief-assistent", team: "team-platform",
    doel: "Concept-antwoorden op burgervragen opstellen.", type: "llm", model: "overheids-llm-eu",
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "n.v.t.",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: [],
    app: "app-vergunningchecker", status: "productie", published: "2026-02-12",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/burgerbrief-assistent"
  },
  {
    id: "alg-documentclassificatie", name: "Documentclassificatie Woo", team: "team-platform",
    doel: "Documenten classificeren voor actieve openbaarmaking.", type: "llm", model: "overheids-llm-l",
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "n.v.t.",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: [],
    app: "app-vergunningchecker", status: "productie", published: "2025-10-05",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/documentclassificatie-woo"
  },
  {
    id: "alg-bijstand-rechtmatigheid", name: "Rechtmatigheidscontrole bijstand", team: "team-data",
    doel: "Controle op rechtmatig gebruik van bijstand.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-dienstverbanden", "ds-huishoudsamenstelling"],
    app: "app-bijstandsuitkering", status: "productie", published: "2024-09-01",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/bijstand-rechtmatigheid"
  },
  {
    id: "alg-studiefinanciering-toekenning", name: "Toekenning studiefinanciering", team: "team-duo-studiefinanciering",
    doel: "Berekenen recht op studiefinanciering.", type: "rule-based", model: null,
    uitlegbaarheid: "hoog", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: false, besluitvorming: "bepalend", dataSources: ["ds-studieschuld", "ds-diploma-register"],
    app: "app-studiefinanciering-portaal", status: "productie", published: "2023-08-15",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/studiefinanciering-toekenning"
  },
  {
    id: "alg-ind-prioritering", name: "Prioritering asielaanvragen", team: "team-ind-aanvragen",
    doel: "Volgorde van behandeling bepalen.", type: "ml", model: null,
    uitlegbaarheid: "laag", impacttoets: "vereist", discriminatietoets: "vereist",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-verblijfsvergunningen"],
    app: "app-verblijfsvergunning", status: "pilot", published: "2026-03-20",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/ind-prioritering"
  },
  {
    id: "alg-boete-incasso", name: "Incassostrategie boetes", team: "team-cjib-inning",
    doel: "Bepalen van de incassoroute per debiteur.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-verkeersboetes"],
    app: "app-incasso-cjib", status: "productie", published: "2024-05-10",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/boete-incasso"
  },
  {
    id: "alg-omzetbelasting-controle", name: "Aangiftecontrole btw", team: "team-bd-aangifte",
    doel: "Detecteren van afwijkende btw-aangiften.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-omzetbelasting-aangiften"],
    app: "app-aangifte-omzetbelasting", status: "productie", published: "2024-02-28",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/omzetbelasting-controle"
  },
  {
    id: "alg-subsidie-classificatie", name: "Subsidieclassificatie", team: "team-data",
    doel: "Subsidieaanvragen categoriseren.", type: "llm", model: "overheids-llm-l",
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "n.v.t.",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-subsidies-rvo", "ds-bedrijven-hr"],
    app: "app-subsidieportaal-rvo", status: "productie", published: "2026-01-15",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/subsidie-classificatie"
  },
  {
    id: "alg-bezwaar-routing", name: "Bezwaarrouting", team: "team-platform",
    doel: "Bezwaren naar de juiste behandelaar routeren.", type: "llm", model: "overheids-llm-s",
    uitlegbaarheid: "hoog", impacttoets: "uitgevoerd", discriminatietoets: "n.v.t.",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: [],
    app: "app-bezwaarafhandeling", status: "productie", published: "2025-11-01",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/bezwaar-routing"
  },
  {
    id: "alg-vergunning-risico", name: "Risicoweging vergunningen", team: "team-platform",
    doel: "Risicovolle vergunningaanvragen markeren.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "vereist", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-vergunningen-historie", "ds-geo-bgt"],
    app: "app-vergunningchecker", status: "pilot", published: "2026-04-22",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/vergunning-risico"
  },
  {
    id: "alg-aow-leeftijd", name: "AOW-leeftijdbepaling", team: "team-data",
    doel: "Vaststellen AOW-ingangsdatum.", type: "rule-based", model: null,
    uitlegbaarheid: "hoog", impacttoets: "uitgevoerd", discriminatietoets: "n.v.t.",
    humanInTheLoop: false, besluitvorming: "bepalend", dataSources: ["ds-aow-rechten", "ds-personen-brp"],
    app: "app-aow-uitkering", status: "productie", published: "2023-04-01",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/aow-leeftijd"
  },
  {
    id: "alg-ww-duur", name: "WW-duurberekening", team: "team-data",
    doel: "Berekenen duur en hoogte WW-uitkering.", type: "rule-based", model: null,
    uitlegbaarheid: "hoog", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: false, besluitvorming: "bepalend", dataSources: ["ds-dienstverbanden"],
    app: "app-ww-aanvraag", status: "productie", published: "2023-07-12",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/ww-duur"
  },
  {
    id: "alg-milieurisico", name: "Milieurisico-detectie", team: "team-data",
    doel: "Signaleren van milieurisico's uit meldingen.", type: "ml", model: null,
    uitlegbaarheid: "laag", impacttoets: "vereist", discriminatietoets: "vereist",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-milieumeldingen"],
    app: "app-milieumelding", status: "pilot", published: "2026-05-15",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/milieurisico"
  },
  {
    id: "alg-leerplicht-signaal", name: "Verzuimsignalering", team: "team-duo-register",
    doel: "Signaleren van schoolverzuim.", type: "ml", model: null,
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "uitgevoerd",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: ["ds-leerplicht"],
    app: "app-leerplicht-melding", status: "productie", published: "2024-10-05",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/leerplicht-signaal"
  },
  {
    id: "alg-vertaalhulp", name: "Vertaalhulp burgerbrieven", team: "team-platform",
    doel: "Burgerbrieven vertalen naar eenvoudige taal.", type: "llm", model: "overheids-llm-eu",
    uitlegbaarheid: "gedeeltelijk", impacttoets: "uitgevoerd", discriminatietoets: "n.v.t.",
    humanInTheLoop: true, besluitvorming: "ondersteunend", dataSources: [],
    app: "app-brief-generator", status: "productie", published: "2026-02-20",
    publicUrl: "https://algoritmes.overheid.nl/nl/algoritme/vertaalhulp"
  },

];

// --- Verwerkingenregister (AVG art. 30) + DPIA status. Each processing
// references its legal basis (wet), the datasets and registers it touches, and
// its retention term. ---
export const verwerkingen = [
  {
    id: "vwk-toeslagen-vaststelling", name: "Vaststellen recht op toeslag", team: "team-toeslagen",
    doel: "Recht en hoogte van toeslag bepalen.", grondslag: "wettelijke verplichting", wet: "awir",
    betrokkenen: "Aanvragers en toeslagpartners", dataCategorieen: ["bijzondere persoonsgegevens", "financiële gegevens"],
    datasets: ["ds-toetsingsinkomen-2026", "ds-huishoudsamenstelling"], registers: ["brp", "inkomen"],
    bewaartermijn: "7 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "hoog", dpiaDate: "2025-09-15"
  },
  {
    id: "vwk-zorgtoeslag", name: "Zorgtoeslag verstrekken", team: "team-toeslagen",
    doel: "Zorgtoeslag berekenen en uitkeren.", grondslag: "wettelijke verplichting", wet: "zorgtoeslagwet",
    betrokkenen: "Verzekeringsplichtigen", dataCategorieen: ["bijzondere persoonsgegevens"],
    datasets: ["ds-zorgpolissen", "ds-personen-brp"], registers: ["brp"],
    bewaartermijn: "7 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "hoog", dpiaDate: "2025-06-20"
  },
  {
    id: "vwk-kinderbijslag", name: "Kinderbijslag verstrekken", team: "team-toeslagen",
    doel: "Kinderbijslag vaststellen en uitbetalen.", grondslag: "wettelijke verplichting", wet: "kinderbijslagwet",
    betrokkenen: "Ouders en verzorgers", dataCategorieen: ["persoonsgegevens"],
    datasets: ["ds-huishoudsamenstelling", "ds-personen-brp"], registers: ["brp"],
    bewaartermijn: "5 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2025-04-02"
  },
  {
    id: "vwk-vergunningverlening", name: "Vergunningen verlenen", team: "team-platform",
    doel: "Aanvragen voor vergunningen beoordelen.", grondslag: "taak van algemeen belang", wet: "participatiewet",
    betrokkenen: "Aanvragers en bedrijven", dataCategorieen: ["persoonsgegevens"],
    datasets: ["ds-bedrijven-hr", "ds-eigendom-brk"], registers: ["hr", "brk", "bag"],
    bewaartermijn: "10 jaar", dpiaStatus: "vereist", risiconiveau: "gemiddeld", dpiaDate: ""
  },
  {
    id: "vwk-handhaving-kenteken", name: "Handhaving op kenteken", team: "team-data",
    doel: "Voertuigen controleren op naleving.", grondslag: "taak van algemeen belang", wet: null,
    betrokkenen: "Voertuighouders", dataCategorieen: ["persoonsgegevens"],
    datasets: ["ds-kentekens-rdw"], registers: ["kenteken"],
    bewaartermijn: "90 dagen", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2024-11-30"
  },
  {
    id: "vwk-fraudeonderzoek", name: "Fraudeonderzoek toeslagen", team: "team-toeslagen",
    doel: "Onderzoek naar mogelijk onrechtmatig gebruik.", grondslag: "wettelijke verplichting", wet: "awir",
    betrokkenen: "Toeslagontvangers", dataCategorieen: ["bijzondere persoonsgegevens", "financiële gegevens"],
    datasets: ["ds-inkomen-historie", "ds-huishoudsamenstelling"], registers: ["brp", "inkomen"],
    bewaartermijn: "7 jaar", dpiaStatus: "vereist", risiconiveau: "hoog", dpiaDate: ""
  },
  {
    id: "vwk-burgercorrespondentie", name: "Burgercorrespondentie", team: "team-platform",
    doel: "Vragen van burgers beantwoorden.", grondslag: "taak van algemeen belang", wet: null,
    betrokkenen: "Burgers die contact opnemen", dataCategorieen: ["persoonsgegevens"],
    datasets: [], registers: ["brp"],
    bewaartermijn: "2 jaar", dpiaStatus: "n.v.t.", risiconiveau: "laag", dpiaDate: ""
  },
  {
    id: "vwk-statistiek", name: "Statistisch onderzoek", team: "team-data",
    doel: "Beleid onderbouwen met geaggregeerde data.", grondslag: "taak van algemeen belang", wet: null,
    betrokkenen: "Niet herleidbaar (geaggregeerd)", dataCategorieen: ["openbaar"],
    datasets: ["ds-statline-demografie"], registers: [],
    bewaartermijn: "onbepaald", dpiaStatus: "n.v.t.", risiconiveau: "laag", dpiaDate: ""
  },
  {
    id: "vwk-bijstand-verstrekking", name: "Bijstand verstrekken", team: "team-data",
    doel: "Bepalen recht op bijstand.", grondslag: "wettelijke verplichting", wet: "participatiewet",
    betrokkenen: "Bijstandsgerechtigden", dataCategorieen: ["persoonsgegevens", "financiële gegevens"],
    datasets: ["ds-dienstverbanden"], registers: ["brp", "inkomen"],
    bewaartermijn: "7 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "hoog", dpiaDate: "2025-08-01"
  },
  {
    id: "vwk-studiefinanciering", name: "Studiefinanciering verstrekken", team: "team-duo-studiefinanciering",
    doel: "Toekennen studiefinanciering.", grondslag: "wettelijke verplichting", wet: null,
    betrokkenen: "Studenten", dataCategorieen: ["persoonsgegevens"],
    datasets: ["ds-diploma-register", "ds-studieschuld"], registers: ["duo-onderwijs"],
    bewaartermijn: "5 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2025-03-10"
  },
  {
    id: "vwk-verblijfsvergunning", name: "Verblijfsvergunning beoordelen", team: "team-ind-dossiers",
    doel: "Beoordelen aanvraag verblijfsvergunning.", grondslag: "wettelijke verplichting", wet: null,
    betrokkenen: "Vreemdelingen", dataCategorieen: ["bijzondere persoonsgegevens"],
    datasets: ["ds-verblijfsvergunningen"], registers: ["brp"],
    bewaartermijn: "10 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "hoog", dpiaDate: "2025-05-20"
  },
  {
    id: "vwk-aow-uitkering", name: "AOW uitkeren", team: "team-data",
    doel: "Vaststellen en uitbetalen AOW.", grondslag: "wettelijke verplichting", wet: "aow",
    betrokkenen: "AOW-gerechtigden", dataCategorieen: ["persoonsgegevens", "financiële gegevens"],
    datasets: ["ds-aow-rechten"], registers: ["brp"],
    bewaartermijn: "7 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2025-01-15"
  },
  {
    id: "vwk-ww-uitkering", name: "WW uitkeren", team: "team-data",
    doel: "Vaststellen recht op WW.", grondslag: "wettelijke verplichting", wet: "werkloosheidswet",
    betrokkenen: "Werkzoekenden", dataCategorieen: ["persoonsgegevens", "financiële gegevens"],
    datasets: ["ds-dienstverbanden"], registers: ["uwv-dienstverband"],
    bewaartermijn: "7 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2025-02-28"
  },
  {
    id: "vwk-btw-aangifte", name: "Btw-aangifte verwerken", team: "team-bd-aangifte",
    doel: "Verwerken en controleren btw-aangiften.", grondslag: "wettelijke verplichting", wet: "omzetbelasting-1968",
    betrokkenen: "Ondernemers", dataCategorieen: ["financiële gegevens"],
    datasets: ["ds-omzetbelasting-aangiften"], registers: ["bd-omzetbelasting", "hr"],
    bewaartermijn: "7 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2025-04-12"
  },
  {
    id: "vwk-verkeershandhaving", name: "Verkeershandhaving", team: "team-cjib-sanctie",
    doel: "Opleggen en innen van verkeersboetes.", grondslag: "taak van algemeen belang", wet: null,
    betrokkenen: "Voertuighouders", dataCategorieen: ["persoonsgegevens"],
    datasets: ["ds-verkeersboetes"], registers: ["kenteken"],
    bewaartermijn: "5 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "gemiddeld", dpiaDate: "2024-12-01"
  },
  {
    id: "vwk-vaccinatie", name: "Vaccinatieregistratie", team: "team-data",
    doel: "Bijhouden vaccinatiestatus.", grondslag: "toestemming", wet: null,
    betrokkenen: "Gevaccineerden", dataCategorieen: ["bijzondere persoonsgegevens"],
    datasets: ["ds-vaccinaties"], registers: ["brp"],
    bewaartermijn: "20 jaar", dpiaStatus: "vereist", risiconiveau: "hoog", dpiaDate: ""
  },
  {
    id: "vwk-subsidie", name: "Subsidie verstrekken", team: "team-data",
    doel: "Beoordelen en toekennen subsidies.", grondslag: "taak van algemeen belang", wet: null,
    betrokkenen: "Ondernemers en organisaties", dataCategorieen: ["financiële gegevens"],
    datasets: ["ds-subsidies-rvo"], registers: ["hr"],
    bewaartermijn: "10 jaar", dpiaStatus: "uitgevoerd", risiconiveau: "laag", dpiaDate: "2025-06-30"
  },
  {
    id: "vwk-pgb", name: "PGB-beheer", team: "team-data",
    doel: "Beheren persoonsgebonden budgetten.", grondslag: "wettelijke verplichting", wet: "participatiewet",
    betrokkenen: "Budgethouders", dataCategorieen: ["bijzondere persoonsgegevens"],
    datasets: ["ds-pgb-budgetten"], registers: ["brp"],
    bewaartermijn: "7 jaar", dpiaStatus: "vereist", risiconiveau: "hoog", dpiaDate: ""
  },
  {
    id: "vwk-leerplicht", name: "Leerplichthandhaving", team: "team-duo-register",
    doel: "Handhaven leerplicht.", grondslag: "taak van algemeen belang", wet: null,
    betrokkenen: "Leerplichtigen", dataCategorieen: ["bijzondere persoonsgegevens"],
    datasets: ["ds-leerplicht"], registers: [],
    bewaartermijn: "5 jaar", dpiaStatus: "vereist", risiconiveau: "gemiddeld", dpiaDate: ""
  },
  {
    id: "vwk-waterschapsheffing", name: "Waterschapsheffing innen", team: "team-data",
    doel: "Vaststellen en innen heffingen.", grondslag: "wettelijke verplichting", wet: null,
    betrokkenen: "Heffingsplichtigen", dataCategorieen: ["persoonsgegevens"],
    datasets: ["ds-waterschapsheffing"], registers: ["woz"],
    bewaartermijn: "7 jaar", dpiaStatus: "n.v.t.", risiconiveau: "laag", dpiaDate: ""
  },

];

// --- Woo (actieve openbaarmaking) + Archiefwet/e-Depot. Publication status of
// decisions and documents, plus their archiving lifecycle. ---
export const wooDocuments = [
  {
    id: "woo-besluit-2026-014", title: "Besluit Woo-verzoek inkoop datacenters", app: "app-vergunningchecker", team: "team-platform",
    type: "Woo-verzoek", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-03-12",
    pdcCategory: "convenanten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "overgedragen", archiefDate: "2026-04-01"
  },
  {
    id: "woo-besluit-2026-021", title: "Beleidsregels toeslagen 2026", app: "app-toeslagen", team: "team-toeslagen",
    type: "actieve openbaarmaking", wet: "awir", publicatiestatus: "gepubliceerd", publishedAt: "2026-01-08",
    pdcCategory: "beschikkingen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "20 jaar",
    eDepotStatus: "gepland", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-029", title: "Algoritmebeschrijving fraudesignalering", app: "app-toeslagen", team: "team-toeslagen",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "in voorbereiding", publishedAt: "",
    pdcCategory: "onderzoeksrapporten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "niet van toepassing", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-033", title: "Jaarverslag platform 2025", app: null, team: "team-platform",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-02-28",
    pdcCategory: "jaarplannen en jaarverslagen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "permanent",
    eDepotStatus: "overgedragen", archiefDate: "2026-03-15"
  },
  {
    id: "woo-besluit-2026-040", title: "Convenant gegevensdeling RDW", app: "app-kentekencheck", team: "team-data",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gedeeltelijk", publishedAt: "2026-04-22",
    pdcCategory: "convenanten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "gepland", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-047", title: "Inkoopdossier AI-hardware", app: null, team: "team-platform",
    type: "Woo-verzoek", wet: null, publicatiestatus: "in voorbereiding", publishedAt: "",
    pdcCategory: "beschikkingen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "niet van toepassing", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-052", title: "Beleidsregels bijstand 2026", app: "app-bijstandsuitkering", team: "team-data",
    type: "actieve openbaarmaking", wet: "participatiewet", publicatiestatus: "gepubliceerd", publishedAt: "2026-02-10",
    pdcCategory: "beschikkingen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "20 jaar",
    eDepotStatus: "overgedragen", archiefDate: "2026-03-01"
  },
  {
    id: "woo-besluit-2026-058", title: "Woo-verzoek algoritmegebruik IND", app: "app-verblijfsvergunning", team: "team-ind-dossiers",
    type: "Woo-verzoek", wet: null, publicatiestatus: "gedeeltelijk", publishedAt: "2026-04-05",
    pdcCategory: "onderzoeksrapporten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "gepland", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-061", title: "Jaarverslag Toeslagen 2025", app: "app-toeslagen", team: "team-toeslagen",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-03-20",
    pdcCategory: "jaarplannen en jaarverslagen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "permanent",
    eDepotStatus: "overgedragen", archiefDate: "2026-04-10"
  },
  {
    id: "woo-besluit-2026-067", title: "Convenant gegevensdeling DUO", app: "app-diplomaregister", team: "team-duo-register",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-01-30",
    pdcCategory: "convenanten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "overgedragen", archiefDate: "2026-02-15"
  },
  {
    id: "woo-besluit-2026-070", title: "Besluit inkoop AI-modellen", app: "app-platformportaal", team: "team-platform",
    type: "Woo-verzoek", wet: null, publicatiestatus: "in voorbereiding", publishedAt: "",
    pdcCategory: "beschikkingen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "niet van toepassing", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-073", title: "Beleidsregels studiefinanciering", app: "app-studiefinanciering-portaal", team: "team-duo-studiefinanciering",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-02-25",
    pdcCategory: "beschikkingen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "20 jaar",
    eDepotStatus: "gepland", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-079", title: "Onderzoeksrapport fraudedetectie", app: "app-aangifte-omzetbelasting", team: "team-bd-fraude",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "in voorbereiding", publishedAt: "",
    pdcCategory: "onderzoeksrapporten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "niet van toepassing", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-084", title: "Milieu-inspectierapporten Q1", app: "app-milieumelding", team: "team-data",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-04-01",
    pdcCategory: "inspectierapporten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "10 jaar",
    eDepotStatus: "gepland", archiefDate: ""
  },
  {
    id: "woo-besluit-2026-088", title: "Convenant CBS-microdata", app: "app-statistiek-dashboard-cbs", team: "team-cbs-statline",
    type: "actieve openbaarmaking", wet: null, publicatiestatus: "gepubliceerd", publishedAt: "2026-03-05",
    pdcCategory: "convenanten", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "permanent",
    eDepotStatus: "overgedragen", archiefDate: "2026-03-25"
  },
  {
    id: "woo-besluit-2026-091", title: "Woo-verzoek kentekenhandhaving", app: "app-kentekencheck", team: "team-cjib-sanctie",
    type: "Woo-verzoek", wet: null, publicatiestatus: "gedeeltelijk", publishedAt: "2026-04-18",
    pdcCategory: "beschikkingen", selectielijst: "Selectielijst Rijk 2020", bewaartermijn: "5 jaar",
    eDepotStatus: "niet van toepassing", archiefDate: ""
  },

];

// --- Artefacten / provenance: the artifact and image registry that makes the
// pipeline's "Publiceren" and "Ondertekenen" stages real. Each artifact has a
// digest, SBOM, signing/provenance status, and links back to its repo and app. ---
export const artefacten = [
  {
    id: "art-toeslagenmotor-3.4.1", name: "toeslagenmotor", kind: "container-image", version: "3.4.1",
    digest: "sha256:9f2c4e…a1b7", repo: "repo-toeslagen", app: "app-toeslagen", buildJob: "job-7781",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:team-toeslagen",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 412, deps: [
      { name: "tokio", version: "1.38.0", license: "MIT" },
      { name: "serde", version: "1.0.203", license: "MIT/Apache-2.0" },
      { name: "axum", version: "0.7.5", license: "MIT" }
    ], vulns: [] },
    publishedAt: "2026-05-30"
  },
  {
    id: "art-datadeling-2.1.0", name: "datadeling", kind: "container-image", version: "2.1.0",
    digest: "sha256:3a91bd…77c2", repo: "repo-datadeling", app: "app-inkomenstoets", buildJob: "job-7778",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:team-data",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 308, deps: [
      { name: "fastapi", version: "0.111.0", license: "MIT" },
      { name: "pydantic", version: "2.7.1", license: "MIT" }
    ], vulns: ["cve-1"] },
    publishedAt: "2026-05-28"
  },
  {
    id: "art-kentekencheck-1.9.2", name: "kentekencheck", kind: "container-image", version: "1.9.2",
    digest: "sha256:cc01fe…2d40", repo: "repo-kentekencheck", app: "app-kentekencheck", buildJob: "job-g0",
    registry: "registry.overheid.nl/rdw", signed: true, signedBy: "fulcio:team-data",
    slsaLevel: 2, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 256, deps: [
      { name: "express", version: "4.19.2", license: "MIT" },
      { name: "sharp", version: "0.33.4", license: "Apache-2.0" }
    ], vulns: [] },
    publishedAt: "2026-06-01"
  },
  {
    id: "art-nldd-ui-0.9.0", name: "nldd-ui", kind: "package", version: "0.9.0",
    digest: "sha256:71aa90…ee15", repo: "repo-datadeling", app: "app-vergunningchecker", buildJob: "job-7778",
    registry: "registry.overheid.nl/nldd", signed: true, signedBy: "fulcio:team-platform",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 184, deps: [
      { name: "vue", version: "3.4.27", license: "MIT" },
      { name: "lit", version: "3.1.4", license: "BSD-3-Clause" }
    ], vulns: [] },
    publishedAt: "2026-05-22"
  },
  {
    id: "art-toeslagenmotor-3.3.0", name: "toeslagenmotor", kind: "container-image", version: "3.3.0",
    digest: "sha256:5e8c12…b9a0", repo: "repo-toeslagen", app: "app-toeslagen", buildJob: "job-7781",
    registry: "registry.overheid.nl/minbzk", signed: false, signedBy: "",
    slsaLevel: 1, provenance: "ongetekend",
    sbom: { format: "CycloneDX 1.5", components: 401, deps: [
      { name: "tokio", version: "1.37.0", license: "MIT" }
    ], vulns: ["cve-2"] },
    publishedAt: "2026-04-18"
  },
  {
    id: "art-vergunningchecker-0.6.1", name: "vergunningchecker", kind: "container-image", version: "0.6.1",
    digest: "sha256:b204aa…1f33", repo: "repo-datadeling", app: "app-vergunningchecker", buildJob: "job-7778",
    registry: "registry.overheid.nl/minbzk", signed: false, signedBy: "",
    slsaLevel: 1, provenance: "in afwachting",
    sbom: { format: "CycloneDX 1.5", components: 222, deps: [
      { name: "next", version: "14.2.3", license: "MIT" }
    ], vulns: [] },
    publishedAt: "2026-05-31"
  },
  {
    id: "art-paspoort-4.6.5", name: "paspoort", kind: "container-image", version: "4.6.5",
    digest: "sha256:a0d912…f65b", repo: "repo-paspoort", app: "app-paspoort", buildJob: "job-7779",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:minbzk",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 331, deps: [{ name: "express", version: "4.19.2", license: "MIT" }, { name: "zod", version: "3.23.8", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-03"
  },
  {
    id: "art-bijstandsuitkering-2.8.4", name: "bijstandsuitkering", kind: "container-image", version: "2.8.4",
    digest: "sha256:44d96d…0a12", repo: "repo-bijstandsuitkering", app: "app-bijstandsuitkering", buildJob: "job-g2",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:minbzk",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 469, deps: [{ name: "tokio", version: "1.38.0", license: "MIT" }, { name: "serde", version: "1.0.203", license: "MIT/Apache-2.0" }], vulns: [] },
    publishedAt: "2026-05-26"
  },
  {
    id: "art-inkomenstoets-4.2.6", name: "inkomenstoets", kind: "container-image", version: "4.2.6",
    digest: "sha256:854b38…bd4b", repo: "repo-inkomenstoets", app: "app-inkomenstoets", buildJob: "job-g1",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:minbzk",
    slsaLevel: 2, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 468, deps: [{ name: "fastapi", version: "0.111.0", license: "MIT" }, { name: "pydantic", version: "2.7.1", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-17"
  },
  {
    id: "art-brp-bevraging-3.0.5", name: "brp-bevraging", kind: "package", version: "3.0.5",
    digest: "sha256:82a820…327f", repo: "repo-brp-bevraging", app: "app-brp-bevraging", buildJob: "job-g8",
    registry: "registry.overheid.nl/nldd", signed: true, signedBy: "fulcio:nldd",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 463, deps: [{ name: "axum", version: "0.7.5", license: "MIT" }, { name: "sqlx", version: "0.7.4", license: "MIT/Apache-2.0" }], vulns: [] },
    publishedAt: "2026-05-12"
  },
  {
    id: "art-bsn-validatie-4.3.0", name: "bsn-validatie", kind: "package", version: "4.3.0",
    digest: "sha256:ed770e…b076", repo: "repo-bsn-validatie", app: "app-bsn-validatie", buildJob: "job-g7",
    registry: "registry.overheid.nl/nldd", signed: true, signedBy: "fulcio:nldd",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 147, deps: [{ name: "tokio", version: "1.38.0", license: "MIT" }, { name: "serde", version: "1.0.203", license: "MIT/Apache-2.0" }], vulns: [] },
    publishedAt: "2026-05-15"
  },
  {
    id: "art-iban-validatie-3.2.1", name: "iban-validatie", kind: "package", version: "3.2.1",
    digest: "sha256:9d7db4…7e21", repo: "repo-iban-validatie", app: "app-iban-validatie", buildJob: "job-g18",
    registry: "registry.overheid.nl/nldd", signed: true, signedBy: "fulcio:nldd",
    slsaLevel: 2, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 357, deps: [{ name: "axum", version: "0.7.5", license: "MIT" }, { name: "sqlx", version: "0.7.4", license: "MIT/Apache-2.0" }], vulns: [] },
    publishedAt: "2026-05-03"
  },
  {
    id: "art-betaalverzoek-4.5.0", name: "betaalverzoek", kind: "container-image", version: "4.5.0",
    digest: "sha256:b79f01…7551", repo: "repo-betaalverzoek", app: "app-betaalverzoek", buildJob: "job-g9",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:minbzk",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 260, deps: [{ name: "express", version: "4.19.2", license: "MIT" }, { name: "zod", version: "3.23.8", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-04"
  },
  {
    id: "art-berichtenbox-2.4.6", name: "berichtenbox", kind: "container-image", version: "2.4.6",
    digest: "sha256:3fa84f…c5b2", repo: "repo-berichtenbox", app: "app-berichtenbox", buildJob: "job-7778",
    registry: "registry.overheid.nl/logius", signed: true, signedBy: "fulcio:logius",
    slsaLevel: 2, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 198, deps: [{ name: "express", version: "4.19.2", license: "MIT" }, { name: "zod", version: "3.23.8", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-15"
  },
  {
    id: "art-aangifte-omzetbelasting-2.3.7", name: "aangifte-omzetbelasting", kind: "container-image", version: "2.3.7",
    digest: "sha256:6304d9…70da", repo: "repo-aangifte-omzetbelasting", app: "app-aangifte-omzetbelasting", buildJob: "job-g20",
    registry: "registry.overheid.nl/bd", signed: true, signedBy: "fulcio:bd",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 466, deps: [{ name: "axum", version: "0.7.5", license: "MIT" }, { name: "sqlx", version: "0.7.4", license: "MIT/Apache-2.0" }], vulns: ["cve-1"] },
    publishedAt: "2026-05-21"
  },
  {
    id: "art-vergunningchecker-3.7.4", name: "vergunningchecker", kind: "container-image", version: "3.7.4",
    digest: "sha256:74c0ac…3b8a", repo: "repo-vergunningchecker", app: "app-vergunningchecker", buildJob: "job-g24",
    registry: "registry.overheid.nl/minbzk", signed: false, signedBy: "",
    slsaLevel: 1, provenance: "ongetekend",
    sbom: { format: "CycloneDX 1.5", components: 430, deps: [{ name: "tokio", version: "1.38.0", license: "MIT" }, { name: "serde", version: "1.0.203", license: "MIT/Apache-2.0" }], vulns: [] },
    publishedAt: "2026-05-22"
  },
  {
    id: "art-bezwaarafhandeling-3.9.2", name: "bezwaarafhandeling", kind: "container-image", version: "3.9.2",
    digest: "sha256:56093c…07bb", repo: "repo-bezwaarafhandeling", app: "app-bezwaarafhandeling", buildJob: "job-g25",
    registry: "registry.overheid.nl/minbzk", signed: true, signedBy: "fulcio:minbzk",
    slsaLevel: 2, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 221, deps: [{ name: "fastapi", version: "0.111.0", license: "MIT" }, { name: "pydantic", version: "2.7.1", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-05"
  },
  {
    id: "art-digid-koppeling-2.0.7", name: "digid-koppeling", kind: "package", version: "2.0.7",
    digest: "sha256:f593c3…3822", repo: "repo-digid-koppeling", app: "app-digid-koppeling", buildJob: "job-g9",
    registry: "registry.overheid.nl/logius", signed: true, signedBy: "fulcio:logius",
    slsaLevel: 3, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 458, deps: [{ name: "axum", version: "0.7.5", license: "MIT" }, { name: "sqlx", version: "0.7.4", license: "MIT/Apache-2.0" }], vulns: [] },
    publishedAt: "2026-05-21"
  },
  {
    id: "art-eherkenning-broker-2.5.5", name: "eherkenning-broker", kind: "container-image", version: "2.5.5",
    digest: "sha256:0982ce…57c0", repo: "repo-eherkenning-broker", app: "app-eherkenning-broker", buildJob: "job-7781",
    registry: "registry.overheid.nl/logius", signed: false, signedBy: "",
    slsaLevel: 1, provenance: "in afwachting",
    sbom: { format: "CycloneDX 1.5", components: 449, deps: [{ name: "express", version: "4.19.2", license: "MIT" }, { name: "zod", version: "3.23.8", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-02"
  },
  {
    id: "art-diplomaregister-3.8.7", name: "diplomaregister", kind: "container-image", version: "3.8.7",
    digest: "sha256:4042bf…2046", repo: "repo-diplomaregister", app: "app-diplomaregister", buildJob: "job-g12",
    registry: "registry.overheid.nl/duo", signed: true, signedBy: "fulcio:duo",
    slsaLevel: 2, provenance: "geverifieerd",
    sbom: { format: "CycloneDX 1.5", components: 258, deps: [{ name: "fastapi", version: "0.111.0", license: "MIT" }, { name: "pydantic", version: "2.7.1", license: "MIT" }], vulns: [] },
    publishedAt: "2026-05-21"
  },

];


// --- Login building blocks: DigiD, eHerkenning, eIDAS and machtigingen as a
// first-class platform capability, not a stray API row. Each references the app
// that exposes it and the assurance level (betrouwbaarheidsniveau). ---
export const loginMethods = [
  {
    id: "login-digid", name: "DigiD", audience: "burgers", app: "app-digid-koppeling", team: "team-logius-digid",
    levels: ["Midden", "Substantieel", "Hoog"], protocol: "SAML / OIDC", eidas: false,
    machtigen: true, status: "productie", connectedApps: ["app-toeslagen", "app-paspoort", "app-ww-aanvraag", "app-bijstandsuitkering"],
    description: "Inloggen voor burgers met oplopende betrouwbaarheidsniveaus, inclusief DigiD Machtigen voor gemachtigden."
  },
  {
    id: "login-eherkenning", name: "eHerkenning", audience: "bedrijven", app: "app-eherkenning-broker", team: "team-logius-machtigen",
    levels: ["EH3", "EH4"], protocol: "SAML", eidas: true,
    machtigen: true, status: "productie", connectedApps: ["app-aangifte-omzetbelasting", "app-subsidieportaal-rvo"],
    description: "Inloggen voor ondernemers en organisaties, met ketenmachtiging en koppeling aan het EU-knooppunt."
  },
  {
    id: "login-eidas", name: "eIDAS", audience: "EU-burgers", app: "app-eherkenning-broker", team: "team-logius-machtigen",
    levels: ["Substantieel", "Hoog"], protocol: "SAML (EU-knooppunt)", eidas: true,
    machtigen: false, status: "productie", connectedApps: ["app-studiefinanciering-portaal"],
    description: "Grensoverschrijdend inloggen voor burgers uit andere EU-lidstaten via het Nederlandse eIDAS-knooppunt."
  },
  {
    id: "login-oidc-rijk", name: "SSO Rijk (OIDC)", audience: "ambtenaren", app: "app-oidc-provider", team: "team-nldd-iam",
    levels: ["Substantieel"], protocol: "OIDC", eidas: false,
    machtigen: false, status: "productie", connectedApps: ["app-platformportaal", "app-kentekencheck"],
    description: "Interne single sign-on voor ambtenaren via het rijksbrede OIDC-knooppunt, gekoppeld aan de Rijkspas."
  },
  {
    id: "login-machtigen", name: "Machtigen", audience: "gemachtigden", app: "app-digid-koppeling", team: "team-logius-machtigen",
    levels: ["Substantieel", "Hoog"], protocol: "OIDC", eidas: false,
    machtigen: true, status: "pilot", connectedApps: ["app-toeslagen", "app-aangifte-omzetbelasting"],
    description: "Iemand anders namens jou laten handelen: vrijwillige en wettelijke vertegenwoordiging, voor burgers en bedrijven."
  }
];

// --- Domains & DNS: every service runs on an overheid.nl / rijksoverheid.nl
// subdomain with DNSSEC, a PKIoverheid certificate and an internet.nl score.
// Cross-links to the owning app, the certificate in /secrets, and standards. ---
export const domeinen = [
  {
    id: "dom-toeslagen", fqdn: "toeslagen.nl", app: "app-toeslagen", team: "team-toeslagen",
    dnssec: true, tls: "cert-toeslagen", internetnl: 100, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.10" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::10" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" },
      { type: "MX", name: "@", value: "10 mail.overheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-platform", fqdn: "platform.rijks.app", app: "app-platformportaal", team: "team-platform",
    dnssec: true, tls: "cert-1", internetnl: 100, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.20" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::20" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-kenteken", fqdn: "kentekencheck.overheid.nl", app: "app-kentekencheck", team: "team-data",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 97, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.30" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::30" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-datadeling", fqdn: "api.datadeling.overheid.nl", app: "app-datadeling", team: "team-data",
    dnssec: true, tls: "cert-2", internetnl: 94, ipv6: false, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.40" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-studie", fqdn: "studiefinanciering.nl", app: "app-studiefinanciering-portaal", team: "team-platform",
    dnssec: false, tls: "cert-studie", internetnl: 71, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.50" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::50" }
    ],
    status: "aandacht"
  },
  {
    id: "dom-ww", fqdn: "ww-aanvraag.overheid.nl", app: "app-ww-aanvraag", team: "team-platform",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 88, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.60" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::60" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-paspoort", fqdn: "paspoortaanvraag.nl", app: "app-paspoort", team: "team-burgerzaken",
    dnssec: true, tls: "cert-paspoort", internetnl: 100, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.125" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::7d" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-bijstand", fqdn: "bijstand.overheid.nl", app: "app-bijstandsuitkering", team: "team-data",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 96, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.186" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::ba" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-aangifte", fqdn: "aangifte.belastingdienst.nl", app: "app-aangifte-omzetbelasting", team: "team-bd-aangifte",
    dnssec: true, tls: "cert-aangifte", internetnl: 100, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.127" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::7f" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-mijnoverheid", fqdn: "mijn.overheid.nl", app: "app-mijnoverheid-portaal", team: "team-platform",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 100, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.53" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::35" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-berichtenbox", fqdn: "berichtenbox.overheid.nl", app: "app-berichtenbox", team: "team-platform",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 98, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.21" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::15" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-rijbewijs", fqdn: "rijbewijs.overheid.nl", app: "app-rijbewijs-vernieuwen", team: "team-cbr-rijbewijs",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 95, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.166" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::a6" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-verblijf", fqdn: "verblijfsvergunning.ind.nl", app: "app-verblijfsvergunning", team: "team-ind-dossiers",
    dnssec: true, tls: "cert-verblijf", internetnl: 92, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.107" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::6b" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-omgevingsloket", fqdn: "omgevingsloket.nl", app: "app-omgevingsloket", team: "team-platform",
    dnssec: true, tls: "cert-omgevingsloket", internetnl: 90, ipv6: false, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.75" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-subsidie", fqdn: "subsidie.rvo.nl", app: "app-subsidieportaal-rvo", team: "team-data",
    dnssec: true, tls: "cert-subsidie", internetnl: 94, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.39" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::27" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-opendata", fqdn: "data.overheid.nl", app: "app-open-data-portaal", team: "team-data",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 97, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.5" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::5" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-statistiek", fqdn: "statline.cbs.nl", app: "app-statistiek-dashboard-cbs", team: "team-cbs-statline",
    dnssec: true, tls: "cert-statistiek", internetnl: 99, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.183" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::b7" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-verkeersboete", fqdn: "verkeersboetes.cjib.nl", app: "app-verkeersboete-viewer", team: "team-cjib-sanctie",
    dnssec: false, tls: "cert-verkeersboete", internetnl: 73, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.77" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::4d" }
    ],
    status: "aandacht"
  },
  {
    id: "dom-pgb", fqdn: "pgb.overheid.nl", app: "app-pgb-beheer", team: "team-data",
    dnssec: true, tls: "cert-wild-overheid", internetnl: 88, ipv6: true, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.137" },
      { type: "AAAA", name: "@", value: "2a00:d00:ff::89" },
      { type: "CAA", name: "@", value: "0 issue pkioverheid.nl" }
    ],
    status: "actief"
  },
  {
    id: "dom-milieu", fqdn: "milieumelding.overheid.nl", app: "app-milieumelding", team: "team-data",
    dnssec: false, tls: "cert-verlopen-1", internetnl: 68, ipv6: false, registrar: "SIDN",
    records: [
      { type: "A", name: "@", value: "145.21.0.141" }
    ],
    status: "aandacht"
  },

];

// --- Software & SaaS procurement: the counterpart to hardware inkoop. Licenses
// and services bought under ARBIT/ARVODI, with lock-in risk and an exit
// strategy, so dependence on a vendor is an explicit, governed choice. ---
export const softwareInkoop = [
  {
    id: "sw-2026-001", supplier: "Forgejo (zelf gehost)", product: "Forgejo Enterprise-support", category: "ontwikkeltooling",
    amount: 45000, term: "1 jaar", contract: "ARVODI", lockin: "laag", exitStrategie: "Open source, data en repo's volledig portabel",
    openSource: true, team: "team-platform", status: "actief"
  },
  {
    id: "sw-2026-002", supplier: "Microsoft", product: "Microsoft 365 Rijk", category: "kantoorautomatisering",
    amount: 1850000, term: "3 jaar", contract: "ARBIT", lockin: "hoog", exitStrategie: "Migratiepad naar open formaten in onderzoek",
    openSource: false, team: "team-nldd-iam", status: "actief"
  },
  {
    id: "sw-2026-003", supplier: "Elastic", product: "Elasticsearch-licentie", category: "observability",
    amount: 220000, term: "1 jaar", contract: "ARVODI", lockin: "gemiddeld", exitStrategie: "OpenSearch als open alternatief beschikbaar",
    openSource: false, team: "team-platform", status: "actief"
  },
  {
    id: "sw-2026-004", supplier: "HashiCorp", product: "Vault Enterprise", category: "security",
    amount: 310000, term: "2 jaar", contract: "ARBIT", lockin: "hoog", exitStrategie: "OpenBao-fork als exit-pad geborgd",
    openSource: false, team: "team-nldd-iam", status: "heroverweging"
  },
  {
    id: "sw-2026-005", supplier: "GitLab", product: "GitLab Ultimate", category: "ontwikkeltooling",
    amount: 0, term: "n.v.t.", contract: "ARVODI", lockin: "hoog", exitStrategie: "Afgewezen: te hoge lock-in, Forgejo gekozen",
    openSource: false, team: "team-platform", status: "afgewezen"
  },
  {
    id: "sw-2026-006", supplier: "Geonovum", product: "PDOK-aansluiting", category: "geo",
    amount: 60000, term: "1 jaar", contract: "ARVODI", lockin: "laag", exitStrategie: "Open standaarden (OGC API), geen vendor-binding",
    openSource: true, team: "team-data", status: "actief"
  },
  {
    id: "sw-2026-007", supplier: "Red Hat", product: "OpenShift-licentie", category: "container-platform",
    amount: 980000, term: "3 jaar", contract: "ARBIT", lockin: "gemiddeld", exitStrategie: "Kubernetes-standaard, portabel naar andere distributies",
    openSource: false, team: "team-dictu-hosting", status: "actief"
  },
  {
    id: "sw-2026-008", supplier: "Atlassian", product: "Jira & Confluence", category: "projecttooling",
    amount: 420000, term: "1 jaar", contract: "ARVODI", lockin: "hoog", exitStrategie: "Migratie naar open alternatief (OpenProject) onderzocht",
    openSource: false, team: "team-platform", status: "heroverweging"
  },
  {
    id: "sw-2026-009", supplier: "PostgreSQL (zelf gehost)", product: "PostgreSQL-support", category: "database",
    amount: 75000, term: "1 jaar", contract: "ARVODI", lockin: "laag", exitStrategie: "Open source, volledige dataportabiliteit",
    openSource: true, team: "team-platform", status: "actief"
  },
  {
    id: "sw-2026-010", supplier: "Grafana Labs", product: "Grafana Enterprise", category: "observability",
    amount: 160000, term: "2 jaar", contract: "ARVODI", lockin: "gemiddeld", exitStrategie: "Open-source-kern blijft beschikbaar",
    openSource: true, team: "team-platform", status: "actief"
  },
  {
    id: "sw-2026-011", supplier: "ServiceNow", product: "ITSM-platform", category: "servicemanagement",
    amount: 2400000, term: "4 jaar", contract: "ARBIT", lockin: "hoog", exitStrategie: "Exit-pad in onderzoek, hoge afhankelijkheid",
    openSource: false, team: "team-dictu-hosting", status: "heroverweging"
  },
  {
    id: "sw-2026-012", supplier: "SIDN", product: "Domeinregistratie .nl", category: "dns",
    amount: 35000, term: "1 jaar", contract: "ARVODI", lockin: "laag", exitStrategie: "Open standaarden, overdraagbaar naar andere registrar",
    openSource: true, team: "team-platform", status: "actief"
  },
  {
    id: "sw-2026-013", supplier: "Sentry (zelf gehost)", product: "Sentry self-hosted", category: "observability",
    amount: 0, term: "n.v.t.", contract: "ARVODI", lockin: "laag", exitStrategie: "Open source, geen vendor-binding",
    openSource: true, team: "team-platform", status: "actief"
  },
  {
    id: "sw-2026-014", supplier: "Oracle", product: "Oracle Database", category: "database",
    amount: 1650000, term: "3 jaar", contract: "ARBIT", lockin: "hoog", exitStrategie: "Migratie naar PostgreSQL gepland",
    openSource: false, team: "team-bd-platform", status: "afgewezen"
  },
  {
    id: "sw-2026-015", supplier: "Geonovum", product: "PDOK-uitbreiding", category: "geo",
    amount: 90000, term: "1 jaar", contract: "ARVODI", lockin: "laag", exitStrategie: "Open standaarden (OGC API)",
    openSource: true, team: "team-data", status: "actief"
  },

];

// --- Reusable components (Common Ground: build once, use widely). A marketplace
// of components teams can adopt instead of rebuilding, each with the teams that
// already use it. ---
export const componenten = [
  {
    id: "comp-brp-bevraging", name: "BRP-bevraging", kind: "bibliotheek", language: "Rust", repo: "repo-datadeling",
    owner: "team-data", reuses: 14, register: "brp", license: "EUPL-1.2",
    description: "Geteste client voor de BRP met ingebouwde AVG-logging en herkomstregistratie.",
    usedBy: ["team-toeslagen", "team-burgerzaken", "team-platform"]
  },
  {
    id: "comp-betalen", name: "Betaalmodule (iDEAL/incasso)", kind: "service", language: "Go", repo: "repo-platformportaal",
    owner: "team-platform", reuses: 9, register: null, license: "EUPL-1.2",
    description: "Herbruikbare betaal- en incassomodule met PSD2-koppeling en boekhoudkoppeling.",
    usedBy: ["team-bd-inning", "team-cjib-inning"]
  },
  {
    id: "comp-nldd-formulier", name: "NLDD-formulierbouwer", kind: "frontend-component", language: "Vue", repo: "repo-platformportaal",
    owner: "team-platform", reuses: 31, register: null, license: "EUPL-1.2",
    description: "Toegankelijke formulieren (WCAG 2.2 AA) op basis van het NLDD design system, met validatie.",
    usedBy: ["team-toeslagen", "team-burgerzaken", "team-data"]
  },
  {
    id: "comp-machtigen", name: "Machtigen-koppeling", kind: "bibliotheek", language: "Go", repo: "repo-datadeling",
    owner: "team-logius-machtigen", reuses: 6, register: null, license: "EUPL-1.2",
    description: "Standaardkoppeling voor DigiD Machtigen en ketenmachtiging eHerkenning.",
    usedBy: ["team-toeslagen", "team-bd-aangifte"]
  },
  {
    id: "comp-notificatie", name: "Notificatierouter", kind: "service", language: "Rust", repo: "repo-datadeling",
    owner: "team-data", reuses: 12, register: null, license: "EUPL-1.2",
    description: "Routeert notificaties naar de Berichtenbox, MijnOverheid en e-mail volgens de notificatiestandaard.",
    usedBy: ["team-toeslagen", "team-burgerzaken", "team-platform", "team-data"]
  },
  {
    id: "comp-bsn-validatie", name: "BSN-validatie", kind: "bibliotheek", language: "Rust", repo: "repo-bsn-validatie",
    owner: "team-data", reuses: 22, register: null, license: "EUPL-1.2",
    description: "Elfproef en geldigheidscontrole voor het BSN.",
    usedBy: ["team-toeslagen", "team-burgerzaken", "team-bd-aangifte", "team-ind-aanvragen"]
  },
  {
    id: "comp-iban-validatie", name: "IBAN-validatie", kind: "bibliotheek", language: "Rust", repo: "repo-iban-validatie",
    owner: "team-platform", reuses: 18, register: null, license: "EUPL-1.2",
    description: "Validatie en formattering van IBAN-rekeningnummers.",
    usedBy: ["team-cjib-inning", "team-bd-inning", "team-toeslagen"]
  },
  {
    id: "comp-digikoppeling", name: "Digikoppeling-adapter", kind: "service", language: "Go", repo: "repo-digikoppeling-adapter",
    owner: "team-data", reuses: 11, register: null, license: "EUPL-1.2",
    description: "Standaardadapter voor Digikoppeling ebMS en REST-API.",
    usedBy: ["team-data", "team-burgerzaken", "team-bd-gegevens"]
  },
  {
    id: "comp-pdf-generator", name: "PDF-brievengenerator", kind: "bibliotheek", language: "Rust", repo: "repo-brief-generator",
    owner: "team-platform", reuses: 16, register: null, license: "EUPL-1.2",
    description: "Toegankelijke PDF's volgens de rijkshuisstijl.",
    usedBy: ["team-toeslagen", "team-cjib-inning", "team-duo-register"]
  },
  {
    id: "comp-audit-log", name: "Audit-logging", kind: "bibliotheek", language: "Go", repo: "repo-audit-logboek",
    owner: "team-bzk-security", reuses: 27, register: null, license: "EUPL-1.2",
    description: "Onweerlegbare audit-logging met herkomstregistratie.",
    usedBy: ["team-toeslagen", "team-bd-fraude", "team-data", "team-platform"]
  },
  {
    id: "comp-zaak-api", name: "Zaak-API (Common Ground)", kind: "service", language: "Go", repo: "repo-zaaksysteem",
    owner: "team-platform", reuses: 13, register: null, license: "EUPL-1.2",
    description: "Referentie-implementatie van de Zaak-API standaard.",
    usedBy: ["team-burgerzaken", "team-ind-dossiers"]
  },
  {
    id: "comp-bag-bevraging", name: "BAG-bevraging", kind: "bibliotheek", language: "Rust", repo: "repo-adrescheck-bag",
    owner: "team-data", reuses: 19, register: "bag", license: "EUPL-1.2",
    description: "Adres- en pandgegevens uit de BAG met caching.",
    usedBy: ["team-platform", "team-data", "team-ind-dossiers"]
  },
  {
    id: "comp-kenteken-client", name: "Kentekenregister-client", kind: "bibliotheek", language: "Go", repo: "repo-kentekencheck",
    owner: "team-ienw-kenteken", reuses: 8, register: "kenteken", license: "EUPL-1.2",
    description: "Client voor het kentekenregister van de RDW.",
    usedBy: ["team-cjib-sanctie", "team-data"]
  },
  {
    id: "comp-handtekening", name: "Handtekening-validatie", kind: "service", language: "Rust", repo: "repo-digid-koppeling",
    owner: "team-bzk-security", reuses: 14, register: null, license: "EUPL-1.2",
    description: "Valideren van digitale handtekeningen (PKIoverheid).",
    usedBy: ["team-burgerzaken", "team-bd-aangifte"]
  },
  {
    id: "comp-statuspagina", name: "Statuspagina-component", kind: "frontend-component", language: "Vue", repo: "repo-platformportaal",
    owner: "team-platform", reuses: 21, register: null, license: "EUPL-1.2",
    description: "Herbruikbare publieke statuspagina met incidenten.",
    usedBy: ["team-platform", "team-toeslagen", "team-data"]
  },

];

// The NLDD design system as a first-class platform building block. Not one more
// component in the catalog, but the shared UI foundation every government
// frontend is built on: accessibility and the rijkshuisstijl baked into the
// components, so teams inherit both instead of rebuilding them. This very demo
// (and its presentation mode) renders with it, which is the honest dogfooding
// argument. Numbers are derived from the seed: website apps + Vue repositories.
export const designSystem = {
  name: "NLDD design system",
  package: "@nldd/design-system",
  version: "0.8.52",
  owner: "team-nldd-docs",
  license: "EUPL-1.2",
  componentCount: 96,
  // Adoption: frontends across the estate that build on it.
  websiteApps: 33,
  frontendRepos: 21,
  wcagLevel: "WCAG 2.2 AA",
  repoUrl: "https://github.com/MinBZK/storybook",
  pillars: [
    {
      id: "toegankelijk",
      title: "Toegankelijk by default",
      icon: "person",
      body: "Toegankelijkheid zit in de componenten, niet in goede voornemens. Wie de knop, het formulier of de tabel overneemt, krijgt WCAG 2.2 AA cadeau. Geen losse audit achteraf.",
      to: "/toegankelijkheid",
      toLabel: "Toegankelijkheid",
    },
    {
      id: "huisstijl",
      title: "Eén rijkshuisstijl",
      icon: "square-on-square",
      body: "Elke dienst ziet er hetzelfde uit, dus de burger herkent de overheid. De huisstijl is geen pdf met richtlijnen, maar werkende componenten met de juiste kleuren, typografie en tokens.",
      to: "/standaarden",
      toLabel: "Standaarden",
    },
    {
      id: "snelheid",
      title: "Niet opnieuw bouwen",
      icon: "sparkles",
      body: "Teams bouwen geen eigen knop, datatabel of dialoog. Ze nemen het over en bouwen verder. Eenmaal bouwen, breed gebruiken, net als de rest van de componentcatalogus.",
      to: "/componenten",
      toLabel: "Componenten",
    },
    {
      id: "dogfooding",
      title: "Dit scherm draait erop",
      icon: "check-mark-circle",
      body: "Begane Grond en deze presentatie zijn er volledig mee gebouwd. Wat je nu ziet is het bewijs: het platform gebruikt zijn eigen bouwblok, dus problemen komen vanzelf boven.",
      to: "/componenten",
      toLabel: "Componenten",
    },
  ],
};

// --- Feature flags / toggles: progressive delivery as a platform capability,
// managed by the feature-flags service. Each flag has a rollout percentage and
// the app it gates. ---
export const featureFlags = [
  {
    id: "ff-nieuwe-inkomenstoets", name: "nieuwe-inkomenstoets", app: "app-toeslagen", team: "team-toeslagen",
    rollout: 25, status: "uitrollend", kind: "release", description: "Nieuwe inkomenstoets-engine, geleidelijk uitgerold."
  },
  {
    id: "ff-eidas-login", name: "eidas-login", app: "app-studiefinanciering-portaal", team: "team-platform",
    rollout: 100, status: "aan", kind: "release", description: "eIDAS-inlog ingeschakeld voor EU-studenten."
  },
  {
    id: "ff-experiment-uitleg", name: "experiment-besluituitleg", app: "app-toeslagen", team: "team-toeslagen",
    rollout: 10, status: "experiment", kind: "experiment", description: "Tonen van een uitleg bij elk geautomatiseerd besluit."
  },
  {
    id: "ff-donker-thema", name: "donker-thema", app: "app-platformportaal", team: "team-platform",
    rollout: 50, status: "uitrollend", kind: "release", description: "Donker thema voor het platformportaal."
  },
  {
    id: "ff-killswitch-betalen", name: "killswitch-betalen", app: "app-platformportaal", team: "team-platform",
    rollout: 0, status: "uit", kind: "kill-switch", description: "Noodschakelaar om de betaalmodule direct uit te zetten."
  },
  {
    id: "ff-nieuwe-zoek", name: "nieuwe-zoekfunctie", app: "app-kentekencheck", team: "team-data",
    rollout: 75, status: "uitrollend", kind: "release", description: "Snellere zoekfunctie op het kentekenregister."
  },
  {
    id: "ff-nieuwe-bezwaarflow", name: "nieuwe-bezwaarflow", app: "app-bezwaarafhandeling", team: "team-platform",
    rollout: 40, status: "uitrollend", kind: "release", description: "Vernieuwde bezwaarafhandeling, geleidelijk uitgerold."
  },
  {
    id: "ff-snellere-aangifte", name: "snellere-aangifte", app: "app-aangifte-omzetbelasting", team: "team-bd-aangifte",
    rollout: 100, status: "aan", kind: "release", description: "Versnelde aangifteverwerking ingeschakeld."
  },
  {
    id: "ff-experiment-chathulp", name: "experiment-chathulp", app: "app-mijnoverheid-portaal", team: "team-platform",
    rollout: 15, status: "experiment", kind: "experiment", description: "Chathulp voor burgers, A/B-test."
  },
  {
    id: "ff-killswitch-incasso", name: "killswitch-incasso", app: "app-incasso-cjib", team: "team-cjib-inning",
    rollout: 0, status: "uit", kind: "kill-switch", description: "Noodschakelaar voor de incassobatch."
  },
  {
    id: "ff-nieuwe-zoekindex", name: "nieuwe-zoekindex", app: "app-handelsregister-zoeker", team: "team-data",
    rollout: 60, status: "uitrollend", kind: "release", description: "Snellere zoekindex op het handelsregister."
  },
  {
    id: "ff-toegankelijke-formulieren", name: "toegankelijke-formulieren", app: "app-omgevingsloket", team: "team-platform",
    rollout: 100, status: "aan", kind: "release", description: "Nieuwe toegankelijke formulieren (WCAG 2.2 AA)."
  },
  {
    id: "ff-experiment-vooringevuld", name: "experiment-vooringevuld", app: "app-belastingaangifte-ib", team: "team-bd-aangifte",
    rollout: 20, status: "experiment", kind: "experiment", description: "Vooringevulde aangifte uitbreiden met meer bronnen."
  },
  {
    id: "ff-killswitch-notificaties", name: "killswitch-notificaties", app: "app-notificatieservice", team: "team-data",
    rollout: 0, status: "uit", kind: "kill-switch", description: "Noodschakelaar voor uitgaande notificaties."
  },
  {
    id: "ff-nieuwe-betaalmethode", name: "nieuwe-betaalmethode", app: "app-betaalverzoek", team: "team-platform",
    rollout: 35, status: "uitrollend", kind: "release", description: "iDEAL 2.0 betaalmethode geleidelijk uitgerold."
  },
  {
    id: "ff-experiment-uitlegtekst", name: "experiment-uitlegtekst", app: "app-bijstandsuitkering", team: "team-data",
    rollout: 10, status: "experiment", kind: "experiment", description: "Eenvoudige-taal uitleg bij besluiten testen."
  },

];

// --- Data contracts: the agreement between a data source and its consumers.
// Per dataset-to-app coupling: the schema, the SLA, the allowed purpose and the
// retention. Makes data sharing an explicit, governed contract. ---
export const datacontracten = [
  {
    id: "dc-inkomen-toeslagen", dataset: "ds-toetsingsinkomen-2026", consumer: "app-toeslagen", provider: "team-toeslagen",
    sla: "99.5%", schema: "v2.1", doelbinding: "Vaststellen recht op toeslag", grondslag: "awir",
    bewaartermijn: "7 jaar", status: "actief", signed: "2025-09-15"
  },
  {
    id: "dc-brp-toeslagen", dataset: "ds-personen-brp", consumer: "app-toeslagen", provider: "team-data",
    sla: "99.95%", schema: "v3.0", doelbinding: "Verifiëren persoonsgegevens aanvrager", grondslag: "awir",
    bewaartermijn: "7 jaar", status: "actief", signed: "2025-06-20"
  },
  {
    id: "dc-huishouden-inkomenstoets", dataset: "ds-huishoudsamenstelling", consumer: "app-inkomenstoets", provider: "team-toeslagen",
    sla: "99.0%", schema: "v1.4", doelbinding: "Bepalen huishoudsamenstelling", grondslag: "kinderbijslagwet",
    bewaartermijn: "5 jaar", status: "actief", signed: "2025-04-02"
  },
  {
    id: "dc-bag-vergunning", dataset: "ds-adressen-bag", consumer: "app-vergunningchecker", provider: "team-data",
    sla: "99.9%", schema: "v2.0", doelbinding: "Controleren adres bij vergunningaanvraag", grondslag: null,
    bewaartermijn: "10 jaar", status: "actief", signed: "2026-01-10"
  },
  {
    id: "dc-kenteken-handhaving", dataset: "ds-kentekens-rdw", consumer: "app-kentekencheck", provider: "team-data",
    sla: "99.9%", schema: "v1.2", doelbinding: "Controle voertuiggegevens", grondslag: null,
    bewaartermijn: "90 dagen", status: "heronderhandeling", signed: "2024-11-30"
  },
  {
    id: "dc-inkomen-historie", dataset: "ds-inkomen-historie", consumer: "app-inkomenstoets", provider: "team-toeslagen",
    sla: "98.0%", schema: "v1.0", doelbinding: "Meerjarige inkomensvergelijking", grondslag: "awir",
    bewaartermijn: "7 jaar", status: "concept", signed: ""
  },
  {
    id: "dc-rijbewijs-cbr", dataset: "ds-rijbewijzen-cbr", consumer: "app-rijbewijs-vernieuwen", provider: "team-cbr-rijbewijs",
    sla: "99.9%", schema: "v2.0", doelbinding: "Vernieuwen rijbewijs", grondslag: null,
    bewaartermijn: "5 jaar", status: "actief", signed: "2025-10-01"
  },
  {
    id: "dc-diploma-naturalisatie", dataset: "ds-diploma-register", consumer: "app-naturalisatie-aanvraag", provider: "team-duo-register",
    sla: "99.5%", schema: "v1.3", doelbinding: "Inburgeringseis controleren", grondslag: null,
    bewaartermijn: "10 jaar", status: "actief", signed: "2025-07-15"
  },
  {
    id: "dc-verblijf-ind", dataset: "ds-verblijfsvergunningen", consumer: "app-verblijfsvergunning", provider: "team-ind-dossiers",
    sla: "99.5%", schema: "v3.1", doelbinding: "Verblijfsstatus vaststellen", grondslag: "participatiewet",
    bewaartermijn: "10 jaar", status: "actief", signed: "2025-05-20"
  },
  {
    id: "dc-aow-svb", dataset: "ds-aow-rechten", consumer: "app-aow-uitkering", provider: "team-data",
    sla: "99.5%", schema: "v2.2", doelbinding: "AOW vaststellen", grondslag: "aow",
    bewaartermijn: "7 jaar", status: "actief", signed: "2025-01-10"
  },
  {
    id: "dc-dienstverband-ww", dataset: "ds-dienstverbanden", consumer: "app-ww-aanvraag", provider: "team-data",
    sla: "99.0%", schema: "v1.8", doelbinding: "WW-recht bepalen", grondslag: "werkloosheidswet",
    bewaartermijn: "7 jaar", status: "actief", signed: "2025-02-28"
  },
  {
    id: "dc-btw-aangifte", dataset: "ds-omzetbelasting-aangiften", consumer: "app-aangifte-omzetbelasting", provider: "team-bd-aangifte",
    sla: "99.5%", schema: "v4.0", doelbinding: "Btw-aangifte verwerken", grondslag: "omzetbelasting-1968",
    bewaartermijn: "7 jaar", status: "actief", signed: "2025-04-12"
  },
  {
    id: "dc-geo-omgeving", dataset: "ds-geo-bgt", consumer: "app-omgevingsloket", provider: "team-data",
    sla: "99.9%", schema: "v2.1", doelbinding: "Geo-context bij aanvraag", grondslag: null,
    bewaartermijn: "permanent", status: "actief", signed: "2026-01-05"
  },
  {
    id: "dc-loon-inkomen", dataset: "ds-loonheffing", consumer: "app-inkomenstoets", provider: "team-bd-gegevens",
    sla: "99.0%", schema: "v1.5", doelbinding: "Inkomensbepaling", grondslag: "inkomstenbelasting-2001",
    bewaartermijn: "7 jaar", status: "heronderhandeling", signed: "2024-09-30"
  },
  {
    id: "dc-boete-incasso", dataset: "ds-verkeersboetes", consumer: "app-incasso-cjib", provider: "team-cjib-sanctie",
    sla: "99.0%", schema: "v1.1", doelbinding: "Boete-inning", grondslag: null,
    bewaartermijn: "5 jaar", status: "actief", signed: "2025-03-15"
  },
  {
    id: "dc-subsidie-rvo", dataset: "ds-subsidies-rvo", consumer: "app-subsidie-aanvraag", provider: "team-data",
    sla: "99.0%", schema: "v1.2", doelbinding: "Subsidiebeoordeling", grondslag: null,
    bewaartermijn: "10 jaar", status: "concept", signed: ""
  },
  {
    id: "dc-vaccinatie", dataset: "ds-vaccinaties", consumer: "app-vaccinatieregister", provider: "team-data",
    sla: "98.0%", schema: "v0.9", doelbinding: "Vaccinatieregistratie", grondslag: null,
    bewaartermijn: "20 jaar", status: "concept", signed: ""
  },
  {
    id: "dc-leerplicht", dataset: "ds-leerplicht", consumer: "app-leerplicht-melding", provider: "team-duo-register",
    sla: "98.0%", schema: "v1.0", doelbinding: "Verzuimsignalering", grondslag: null,
    bewaartermijn: "5 jaar", status: "heronderhandeling", signed: "2024-11-20"
  },

];

// --- Accessibility statements (DigiToegankelijk): the mandatory published
// statement per service, with its WCAG status and the formal compliance label. ---
export const toegankelijkheidsverklaringen = [
  {
    id: "tv-toeslagen", app: "app-toeslagen", team: "team-toeslagen", fqdn: "toeslagen.nl",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-03-01",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-toeslagen"
  },
  {
    id: "tv-platform", app: "app-platformportaal", team: "team-platform", fqdn: "platform.rijks.app",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-02-15",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-platform"
  },
  {
    id: "tv-kenteken", app: "app-kentekencheck", team: "team-data", fqdn: "kentekencheck.overheid.nl",
    status: "voldoet gedeeltelijk", wcagLevel: "AA", issues: 3, audited: "2026-01-20",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-kenteken"
  },
  {
    id: "tv-studie", app: "app-studiefinanciering-portaal", team: "team-platform", fqdn: "studiefinanciering.nl",
    status: "eerste maatregelen genomen", wcagLevel: "AA", issues: 11, audited: "2025-11-05",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-studie"
  },
  {
    id: "tv-ww", app: "app-ww-aanvraag", team: "team-platform", fqdn: "ww-aanvraag.overheid.nl",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-04-10",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-ww"
  },
  {
    id: "tv-bijstand", app: "app-bijstandsuitkering", team: "team-data", fqdn: "bijstand.overheid.nl",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-03-12",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-bijstand"
  },
  {
    id: "tv-aangifte", app: "app-aangifte-omzetbelasting", team: "team-bd-aangifte", fqdn: "aangifte.belastingdienst.nl",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-02-20",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-aangifte"
  },
  {
    id: "tv-mijnoverheid", app: "app-mijnoverheid-portaal", team: "team-platform", fqdn: "mijn.overheid.nl",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-04-01",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-mijnoverheid"
  },
  {
    id: "tv-rijbewijs", app: "app-rijbewijs-vernieuwen", team: "team-cbr-rijbewijs", fqdn: "rijbewijs.overheid.nl",
    status: "voldoet gedeeltelijk", wcagLevel: "AA", issues: 2, audited: "2026-01-15",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-rijbewijs"
  },
  {
    id: "tv-verblijf", app: "app-verblijfsvergunning", team: "team-ind-dossiers", fqdn: "verblijfsvergunning.ind.nl",
    status: "voldoet gedeeltelijk", wcagLevel: "AA", issues: 5, audited: "2025-12-10",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-verblijf"
  },
  {
    id: "tv-omgevingsloket", app: "app-omgevingsloket", team: "team-platform", fqdn: "omgevingsloket.nl",
    status: "voldoet volledig", wcagLevel: "AA", issues: 0, audited: "2026-03-28",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-omgevingsloket"
  },
  {
    id: "tv-subsidie", app: "app-subsidieportaal-rvo", team: "team-data", fqdn: "subsidie.rvo.nl",
    status: "voldoet gedeeltelijk", wcagLevel: "AA", issues: 4, audited: "2026-02-05",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-subsidie"
  },
  {
    id: "tv-verkeersboete", app: "app-verkeersboete-viewer", team: "team-cjib-sanctie", fqdn: "verkeersboetes.cjib.nl",
    status: "eerste maatregelen genomen", wcagLevel: "AA", issues: 9, audited: "2025-10-20",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-verkeersboete"
  },
  {
    id: "tv-milieu", app: "app-milieumelding", team: "team-data", fqdn: "milieumelding.overheid.nl",
    status: "eerste maatregelen genomen", wcagLevel: "AA", issues: 13, audited: "2025-09-15",
    verklaringUrl: "https://www.toegankelijkheidsverklaring.nl/register/tv-milieu"
  },

];


// --- Refresh history per dataset: the cadence of actual refreshes, so you
// can see whether a source keeps up or falls behind its frequency. Derived
// deterministically from each dataset's cadence and actuality score.
export const datasetRefreshLog = {
  "ds-toetsingsinkomen-2026": {
    "expected": "2026-05-29",
    "behindDays": 4,
    "runs": [
      {
        "date": "2026-05-28",
        "status": "te laat"
      },
      {
        "date": "2026-05-27",
        "status": "op tijd"
      },
      {
        "date": "2026-05-26",
        "status": "op tijd"
      },
      {
        "date": "2026-05-25",
        "status": "op tijd"
      },
      {
        "date": "2026-05-24",
        "status": "op tijd"
      },
      {
        "date": "2026-05-23",
        "status": "op tijd"
      }
    ]
  },
  "ds-adressen-bag": {
    "expected": "2026-05-31",
    "behindDays": 2,
    "runs": [
      {
        "date": "2026-05-30",
        "status": "te laat"
      },
      {
        "date": "2026-05-29",
        "status": "op tijd"
      },
      {
        "date": "2026-05-28",
        "status": "op tijd"
      },
      {
        "date": "2026-05-27",
        "status": "op tijd"
      },
      {
        "date": "2026-05-26",
        "status": "op tijd"
      },
      {
        "date": "2026-05-25",
        "status": "op tijd"
      }
    ]
  },
  "ds-kentekens-rdw": {
    "expected": "2026-06-02",
    "behindDays": 0,
    "runs": [
      {
        "date": "2026-06-01",
        "status": "op tijd"
      },
      {
        "date": "2026-05-31",
        "status": "op tijd"
      },
      {
        "date": "2026-05-30",
        "status": "op tijd"
      },
      {
        "date": "2026-05-29",
        "status": "op tijd"
      },
      {
        "date": "2026-05-28",
        "status": "op tijd"
      },
      {
        "date": "2026-05-27",
        "status": "op tijd"
      }
    ]
  },
  "ds-huishoudsamenstelling": {
    "expected": "2026-05-27",
    "behindDays": 6,
    "runs": [
      {
        "date": "2026-05-20",
        "status": "te laat"
      },
      {
        "date": "2026-05-13",
        "status": "op tijd"
      },
      {
        "date": "2026-05-06",
        "status": "vertraagd"
      },
      {
        "date": "2026-04-29",
        "status": "op tijd"
      },
      {
        "date": "2026-04-22",
        "status": "op tijd"
      },
      {
        "date": "2026-04-15",
        "status": "op tijd"
      }
    ]
  },
  "ds-woz-waarden": {
    "expected": "2027-01-15",
    "behindDays": 0,
    "runs": [
      {
        "date": "2026-01-15",
        "status": "vertraagd"
      },
      {
        "date": "2025-01-15",
        "status": "op tijd"
      },
      {
        "date": "2024-01-16",
        "status": "op tijd"
      },
      {
        "date": "2023-01-16",
        "status": "op tijd"
      }
    ]
  },
  "ds-bedrijven-hr": {
    "expected": "2026-05-30",
    "behindDays": 3,
    "runs": [
      {
        "date": "2026-05-29",
        "status": "te laat"
      },
      {
        "date": "2026-05-28",
        "status": "op tijd"
      },
      {
        "date": "2026-05-27",
        "status": "op tijd"
      },
      {
        "date": "2026-05-26",
        "status": "op tijd"
      },
      {
        "date": "2026-05-25",
        "status": "op tijd"
      },
      {
        "date": "2026-05-24",
        "status": "op tijd"
      }
    ]
  },
  "ds-eigendom-brk": {
    "expected": "2026-05-19",
    "behindDays": 14,
    "runs": [
      {
        "date": "2026-05-12",
        "status": "te laat"
      },
      {
        "date": "2026-05-05",
        "status": "op tijd"
      },
      {
        "date": "2026-04-28",
        "status": "op tijd"
      },
      {
        "date": "2026-04-21",
        "status": "op tijd"
      },
      {
        "date": "2026-04-14",
        "status": "op tijd"
      },
      {
        "date": "2026-04-07",
        "status": "op tijd"
      }
    ]
  },
  "ds-personen-brp": {
    "expected": "2026-06-02",
    "behindDays": 0,
    "runs": [
      {
        "date": "2026-06-01",
        "status": "op tijd"
      },
      {
        "date": "2026-05-31",
        "status": "op tijd"
      },
      {
        "date": "2026-05-30",
        "status": "op tijd"
      },
      {
        "date": "2026-05-29",
        "status": "op tijd"
      },
      {
        "date": "2026-05-28",
        "status": "op tijd"
      },
      {
        "date": "2026-05-27",
        "status": "op tijd"
      }
    ]
  },
  "ds-vergunningen-historie": {
    "expected": "2026-04-03",
    "behindDays": 60,
    "runs": [
      {
        "date": "2026-03-04",
        "status": "te laat"
      },
      {
        "date": "2026-02-02",
        "status": "op tijd"
      },
      {
        "date": "2026-01-03",
        "status": "vertraagd"
      },
      {
        "date": "2025-12-04",
        "status": "op tijd"
      },
      {
        "date": "2025-11-04",
        "status": "vertraagd"
      }
    ]
  },
  "ds-inkomen-historie": {
    "expected": "2026-12-01",
    "behindDays": 0,
    "runs": [
      {
        "date": "2025-12-01",
        "status": "op tijd"
      },
      {
        "date": "2024-12-01",
        "status": "op tijd"
      },
      {
        "date": "2023-12-02",
        "status": "op tijd"
      },
      {
        "date": "2022-12-02",
        "status": "mislukt"
      }
    ]
  },
  "ds-zorgpolissen": {
    "expected": "2026-05-25",
    "behindDays": 8,
    "runs": [
      {
        "date": "2026-05-18",
        "status": "te laat"
      },
      {
        "date": "2026-05-11",
        "status": "op tijd"
      },
      {
        "date": "2026-05-04",
        "status": "op tijd"
      },
      {
        "date": "2026-04-27",
        "status": "op tijd"
      },
      {
        "date": "2026-04-20",
        "status": "op tijd"
      },
      {
        "date": "2026-04-13",
        "status": "op tijd"
      }
    ]
  },
  "ds-statline-demografie": {
    "expected": "2026-05-31",
    "behindDays": 2,
    "runs": [
      {
        "date": "2026-05-01",
        "status": "op tijd"
      },
      {
        "date": "2026-04-01",
        "status": "op tijd"
      },
      {
        "date": "2026-03-02",
        "status": "op tijd"
      },
      {
        "date": "2026-01-31",
        "status": "op tijd"
      },
      {
        "date": "2026-01-01",
        "status": "op tijd"
      }
    ]
  },
  "ds-rijbewijzen-cbr": {
    "expected": "2026-05-27",
    "behindDays": 6,
    "runs": [
      {
        "date": "2026-05-26",
        "status": "te laat"
      },
      {
        "date": "2026-05-25",
        "status": "op tijd"
      },
      {
        "date": "2026-05-24",
        "status": "op tijd"
      },
      {
        "date": "2026-05-23",
        "status": "op tijd"
      },
      {
        "date": "2026-05-22",
        "status": "op tijd"
      },
      {
        "date": "2026-05-21",
        "status": "op tijd"
      }
    ]
  },
  "ds-studieschuld": {
    "expected": "2026-03-04",
    "behindDays": 90,
    "runs": [
      {
        "date": "2026-02-02",
        "status": "te laat"
      },
      {
        "date": "2026-01-03",
        "status": "op tijd"
      },
      {
        "date": "2025-12-04",
        "status": "op tijd"
      },
      {
        "date": "2025-11-04",
        "status": "op tijd"
      },
      {
        "date": "2025-10-05",
        "status": "op tijd"
      }
    ]
  },
  "ds-diploma-register": {
    "expected": "2026-05-07",
    "behindDays": 26,
    "runs": [
      {
        "date": "2026-05-06",
        "status": "te laat"
      },
      {
        "date": "2026-05-05",
        "status": "op tijd"
      },
      {
        "date": "2026-05-04",
        "status": "op tijd"
      },
      {
        "date": "2026-05-03",
        "status": "op tijd"
      },
      {
        "date": "2026-05-02",
        "status": "op tijd"
      },
      {
        "date": "2026-05-01",
        "status": "op tijd"
      }
    ]
  },
  "ds-verblijfsvergunningen": {
    "expected": "2026-05-18",
    "behindDays": 15,
    "runs": [
      {
        "date": "2026-05-17",
        "status": "te laat"
      },
      {
        "date": "2026-05-16",
        "status": "op tijd"
      },
      {
        "date": "2026-05-15",
        "status": "op tijd"
      },
      {
        "date": "2026-05-14",
        "status": "op tijd"
      },
      {
        "date": "2026-05-13",
        "status": "op tijd"
      },
      {
        "date": "2026-05-12",
        "status": "op tijd"
      }
    ]
  },
  "ds-aow-rechten": {
    "expected": "2026-03-06",
    "behindDays": 88,
    "runs": [
      {
        "date": "2026-02-04",
        "status": "te laat"
      },
      {
        "date": "2026-01-05",
        "status": "op tijd"
      },
      {
        "date": "2025-12-06",
        "status": "op tijd"
      },
      {
        "date": "2025-11-06",
        "status": "op tijd"
      },
      {
        "date": "2025-10-07",
        "status": "op tijd"
      }
    ]
  },
  "ds-dienstverbanden": {
    "expected": "2026-05-29",
    "behindDays": 4,
    "runs": [
      {
        "date": "2026-05-22",
        "status": "te laat"
      },
      {
        "date": "2026-05-15",
        "status": "op tijd"
      },
      {
        "date": "2026-05-08",
        "status": "op tijd"
      },
      {
        "date": "2026-05-01",
        "status": "op tijd"
      },
      {
        "date": "2026-04-24",
        "status": "op tijd"
      },
      {
        "date": "2026-04-17",
        "status": "op tijd"
      }
    ]
  },
  "ds-omzetbelasting-aangiften": {
    "expected": "2026-05-04",
    "behindDays": 29,
    "runs": [
      {
        "date": "2026-05-03",
        "status": "te laat"
      },
      {
        "date": "2026-05-02",
        "status": "op tijd"
      },
      {
        "date": "2026-05-01",
        "status": "op tijd"
      },
      {
        "date": "2026-04-30",
        "status": "op tijd"
      },
      {
        "date": "2026-04-29",
        "status": "op tijd"
      },
      {
        "date": "2026-04-28",
        "status": "op tijd"
      }
    ]
  },
  "ds-geo-bgt": {
    "expected": "2026-06-02",
    "behindDays": 0,
    "runs": [
      {
        "date": "2026-05-26",
        "status": "op tijd"
      },
      {
        "date": "2026-05-19",
        "status": "op tijd"
      },
      {
        "date": "2026-05-12",
        "status": "op tijd"
      },
      {
        "date": "2026-05-05",
        "status": "op tijd"
      },
      {
        "date": "2026-04-28",
        "status": "op tijd"
      },
      {
        "date": "2026-04-21",
        "status": "op tijd"
      }
    ]
  },
  "ds-wkpb-beperkingen": {
    "expected": "2026-06-06",
    "behindDays": 0,
    "runs": [
      {
        "date": "2026-05-07",
        "status": "op tijd"
      },
      {
        "date": "2026-04-07",
        "status": "op tijd"
      },
      {
        "date": "2026-03-08",
        "status": "vertraagd"
      },
      {
        "date": "2026-02-06",
        "status": "op tijd"
      },
      {
        "date": "2026-01-07",
        "status": "op tijd"
      }
    ]
  },
  "ds-loonheffing": {
    "expected": "2026-03-18",
    "behindDays": 76,
    "runs": [
      {
        "date": "2026-02-16",
        "status": "te laat"
      },
      {
        "date": "2026-01-17",
        "status": "op tijd"
      },
      {
        "date": "2025-12-18",
        "status": "op tijd"
      },
      {
        "date": "2025-11-18",
        "status": "op tijd"
      },
      {
        "date": "2025-10-19",
        "status": "op tijd"
      }
    ]
  },
  "ds-verkeersboetes": {
    "expected": "2026-05-11",
    "behindDays": 22,
    "runs": [
      {
        "date": "2026-05-10",
        "status": "te laat"
      },
      {
        "date": "2026-05-09",
        "status": "op tijd"
      },
      {
        "date": "2026-05-08",
        "status": "op tijd"
      },
      {
        "date": "2026-05-07",
        "status": "op tijd"
      },
      {
        "date": "2026-05-06",
        "status": "op tijd"
      },
      {
        "date": "2026-05-05",
        "status": "op tijd"
      }
    ]
  },
  "ds-vaccinaties": {
    "expected": "2026-05-28",
    "behindDays": 5,
    "runs": [
      {
        "date": "2026-05-21",
        "status": "te laat"
      },
      {
        "date": "2026-05-14",
        "status": "op tijd"
      },
      {
        "date": "2026-05-07",
        "status": "op tijd"
      },
      {
        "date": "2026-04-30",
        "status": "op tijd"
      },
      {
        "date": "2026-04-23",
        "status": "op tijd"
      },
      {
        "date": "2026-04-16",
        "status": "op tijd"
      }
    ]
  },
  "ds-milieumeldingen": {
    "expected": "2026-02-16",
    "behindDays": 106,
    "runs": [
      {
        "date": "2026-01-17",
        "status": "te laat"
      },
      {
        "date": "2025-12-18",
        "status": "op tijd"
      },
      {
        "date": "2025-11-18",
        "status": "op tijd"
      },
      {
        "date": "2025-10-19",
        "status": "op tijd"
      },
      {
        "date": "2025-09-19",
        "status": "op tijd"
      }
    ]
  },
  "ds-subsidies-rvo": {
    "expected": "2026-05-23",
    "behindDays": 10,
    "runs": [
      {
        "date": "2026-05-16",
        "status": "te laat"
      },
      {
        "date": "2026-05-09",
        "status": "op tijd"
      },
      {
        "date": "2026-05-02",
        "status": "op tijd"
      },
      {
        "date": "2026-04-25",
        "status": "op tijd"
      },
      {
        "date": "2026-04-18",
        "status": "op tijd"
      },
      {
        "date": "2026-04-11",
        "status": "op tijd"
      }
    ]
  },
  "ds-waterschapsheffing": {
    "expected": "2027-02-11",
    "behindDays": 0,
    "runs": [
      {
        "date": "2026-02-11",
        "status": "op tijd"
      },
      {
        "date": "2025-02-11",
        "status": "op tijd"
      },
      {
        "date": "2024-02-12",
        "status": "op tijd"
      },
      {
        "date": "2023-02-12",
        "status": "op tijd"
      }
    ]
  },
  "ds-leerplicht": {
    "expected": "2026-04-10",
    "behindDays": 53,
    "runs": [
      {
        "date": "2026-03-11",
        "status": "te laat"
      },
      {
        "date": "2026-02-09",
        "status": "op tijd"
      },
      {
        "date": "2026-01-10",
        "status": "op tijd"
      },
      {
        "date": "2025-12-11",
        "status": "op tijd"
      },
      {
        "date": "2025-11-11",
        "status": "op tijd"
      }
    ]
  },
  "ds-pgb-budgetten": {
    "expected": "2026-02-05",
    "behindDays": 117,
    "runs": [
      {
        "date": "2026-01-06",
        "status": "te laat"
      },
      {
        "date": "2025-12-07",
        "status": "op tijd"
      },
      {
        "date": "2025-11-07",
        "status": "op tijd"
      },
      {
        "date": "2025-10-08",
        "status": "op tijd"
      },
      {
        "date": "2025-09-08",
        "status": "op tijd"
      }
    ]
  }
};


// --- NeRDS: de dertien richtlijnen van de Nederlandse Richtlijn Digitale
// Systemen (minbzk.github.io/NeRDS). Geen los bouwblok, maar een charter dat
// dwars door het platform loopt: elke richtlijn heeft al een thuis in Begane
// Grond. Deze ene lijst voedt de badge ("hiermee voldoe je aan richtlijn N"),
// de hub-kaart en de NeRDS-scorecard. `source` zegt waar het oordeel per app
// vandaan komt, zodat de score niet naast bestaande gates/checks gaat staan
// maar eruit volgt:
//   { kind: 'gate', ref }     -> evalGate(app, ref) uit governance/gates.js
//   { kind: 'check', ref }    -> runCheck(ref, app, ctx) uit scorecards/scorecard.js
//   { kind: 'standard', ref } -> status van standards[ref]
//   { kind: 'derived', ref }  -> kleine regel op bestaande seed-relaties (zie nerds-scorecard.js)
export const richtlijnen = [
  {
    id: "gebruikersbehoeften", number: 1, title: "Gebruikersbehoeften",
    tagline: "Begin bij wat de gebruiker nodig heeft, niet bij de techniek.",
    icon: "person", to: "/leren", toLabel: "Leren & onboarding",
    source: { kind: "check", ref: "runbook" },
    why: "Een dienst die niet aansluit op de gebruiker wordt niet gebruikt.",
  },
  {
    id: "toegankelijkheid", number: 2, title: "Toegankelijkheid & inclusie",
    tagline: "Iedereen kan meedoen: WCAG 2.2 AA zit in de componenten.",
    icon: "eye", to: "/toegankelijkheid", toLabel: "Toegankelijkheid",
    source: { kind: "gate", ref: "gate-wcag" },
    why: "Toegankelijkheid is een wettelijke plicht, geen extraatje.",
  },
  {
    id: "open-source", number: 3, title: "Open source & transparantie",
    tagline: "Open-tenzij: code staat open onder EUPL-1.2.",
    icon: "chevron-left-forward-slash-chevron-right", to: "/code", toLabel: "Code",
    source: { kind: "gate", ref: "gate-open" },
    why: "Open code is controleerbaar, herbruikbaar en wint vertrouwen.",
  },
  {
    id: "open-standaarden", number: 4, title: "Open standaarden",
    tagline: "Systemen praten met elkaar via open standaarden.",
    icon: "check-mark-circle", to: "/standaarden", toLabel: "Standaarden",
    source: { kind: "standard", ref: "std-adr" },
    why: "Open standaarden voorkomen vendor lock-in en houden systemen koppelbaar.",
  },
  {
    id: "cloudstrategie", number: 5, title: "Cloudstrategie",
    tagline: "Draait op Haven+: cloud native, dus portabel en operationeel autonoom.",
    icon: "cloud", to: "/infra", toLabel: "Infra-diensten",
    source: { kind: "derived", ref: "haven-stack" },
    why: "Cloud native draaien borgt portabiliteit en operationele autonomie: de overheid houdt technologische keuzevrijheid en kan migreren.",
  },
  {
    id: "veiligheid", number: 6, title: "Veiligheid",
    tagline: "BIO-baseline ingebouwd: geen open kritieke kwetsbaarheden.",
    icon: "shield-check-mark", to: "/security", toLabel: "Security",
    source: { kind: "gate", ref: "gate-bio" },
    why: "Vertrouwen in de digitale overheid valt of staat met veiligheid.",
  },
  {
    id: "privacy", number: 7, title: "Privacy",
    tagline: "Privacy by design: DPIA uitgevoerd voor de verwerking.",
    icon: "lock-closed", to: "/verwerkingen", toLabel: "Privacy & DPIA",
    source: { kind: "derived", ref: "dpia" },
    why: "Persoonsgegevens verdienen bescherming vanaf het ontwerp.",
  },
  {
    id: "samenwerking", number: 8, title: "Samenwerking & hergebruik",
    tagline: "Bouw niet opnieuw: deel componenten en gebaande paden.",
    icon: "sparkles", to: "/componenten", toLabel: "Componenten",
    source: { kind: "derived", ref: "hergebruik" },
    why: "Eenmaal bouwen en breed gebruiken bespaart de hele overheid werk.",
  },
  {
    id: "integratie", number: 9, title: "Integratie",
    tagline: "Sluit aan op bestaande koppelvlakken via ADR-API's.",
    icon: "puzzle-piece", to: "/koppelvlakken", toLabel: "Koppelvlakken",
    source: { kind: "derived", ref: "api" },
    why: "Een systeem dat niet integreert, staat los van de keten.",
  },
  {
    id: "datagebruik", number: 10, title: "Datagebruik",
    tagline: "Data bij de bron, met een getekend datacontract.",
    icon: "cylinder-split", to: "/data", toLabel: "Datasets",
    source: { kind: "derived", ref: "datacontract" },
    why: "Goed databeheer maakt diensten betrouwbaar en herleidbaar.",
  },
  {
    id: "algoritmen", number: 11, title: "Algoritmen",
    tagline: "Algoritmen geregistreerd, met impact- en discriminatietoets.",
    icon: "brackets-ellipsis", to: "/algoritmes", toLabel: "Algoritmeregister",
    source: { kind: "derived", ref: "algoritme" },
    why: "Verantwoorde AI is transparant, getoetst en uitlegbaar.",
  },
  {
    id: "inkoopstrategie", number: 12, title: "Inkoopstrategie",
    tagline: "Inkoop zonder lock-in: open source of een geborgd exit-pad.",
    icon: "tag", to: "/software-inkoop", toLabel: "Software-inkoop",
    source: { kind: "derived", ref: "inkoop" },
    why: "Slimme inkoop houdt de overheid wendbaar en onafhankelijk.",
  },
  {
    id: "duurzaamheid", number: 13, title: "Duurzaamheid",
    tagline: "Geconsolideerde productie-infra, geen sprawl over omgevingen.",
    icon: "heart", to: "/duurzaamheid", toLabel: "Duurzaamheid",
    source: { kind: "derived", ref: "green" },
    why: "Digitale diensten dragen bij aan de klimaatdoelen van het Rijk.",
  },
];
