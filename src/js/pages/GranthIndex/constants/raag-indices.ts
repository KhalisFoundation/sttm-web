export interface IRaagIndex {
  name: string;
  ang: [number, number];
  source?: 'G' | 'D';
  description?: string;
  highlight?: number;
  subSets?: IRaagIndex[];
}

export const raagIndices: IRaagIndex[] = [
  {
    name: 'Sri Guru Granth Sahib',
    source: 'G',
    ang: [1, 1430],
    description:
      "Guru Granth is the central spiritual text that is revered by Sikhs unanimously. The 10th Guru of the Sikhs - Guru Gobind Singh, declared that the need for more human teachers for Sikhs had ended, and ceremoniously handed over the spiritual throne to Guru Granth Sahib. Hence, this text's importance is undisputed in the Sikh community. It is the default source for knowledge about unity with the Truth and the way of life for a spiritual seeker.\n\nEven though primarily revered by the Sikhs, it is remarkably religion-agnostic and contains universal messages of social equality, justice, gender indifference, etc that we take for granted today, but were borderline revolutionary in 15th century India that was predominantly orthodox in it's communal belief system.\n\nDue to the voluminous nature of the text, it is important for the reader to understand how it is architected. What follows is turn-by-turn brief summary of the structure of this poetic and spiritual guide. ",
    subSets: [
      {
        name: 'Pre Raag Section',
        ang: [1, 13],
        description:
          'Guru Granth in its default font size has a total of 1430 angs (pages). Of those, nearly 1340 angs are given a musical framework based on the Raag (described below). The first 13 angs of the sacred scripture have no organised musical framework, which may signify their role as an introduction/summary or the central idea of the text that follows. This section is comprised of 4 core hymms.',
        subSets: [
          {
            name: 'Mul Mantra',
            ang: [1, 1],
            description:
              "Mul Mantra (literally 'BASE STATEMENT') is the first and foremost idea shared by Guru Granth. It is highly recommended that the reader go through it owing to its incredibly succint definition of the Truth.",
          },
          {
            name: 'Jap',
            ang: [1, 8],
            description:
              "Jap is the second hymm of Guru Granth. It has 38 stanzas that introduce some of the core concepts in Guru Granth's spiritual vernacular. Terms like HUKAM (command), NAAM (name), Sabad (word) are expounded here. This hymm is the first of several hymms recited by Sikhs everyday (signifying its importance). Among other themes, it introduces the reader to the message of a deterministic universe, the importance of love, and the path to enlightenment.",
          },
          {
            name: 'So Dar',
            ang: [8, 12],
            description:
              "So Dar is the third hymm. It speaks of the greatness of the universal Truth and the ways in which one's actions assist in attaining spiritual enlightenment. It elevates the reader's mental outlook, leaving him/her with a fresh and positive view - something we tend to need when the day is about to end. So Dar is recited by Sikhs in the evening.",
          },
          {
            name: 'Sohila',
            ang: [12, 13],
            description:
              'Sohila is the fourth hymm and is primarliy recited in the night before going to sleep. It is composed of five stanzas that gradually progress the reader from 1: visualization of the union with Truth, 2 and 3: the singularity of the Universal Reality despite the endless diversity in human philosophies, 4: the importance of NAAM (name), and 5: a celebration of life and the opportunity of union it provides.',
          },
        ],
      },
      {
        name: 'Raag Section',
        ang: [14, 1352],
        description:
          "Music is a first class citizen in Guru Granth. It is used as a tool to add emotion to the poetic lyrics. With this union of logic (from lyrics) and emotion (from music) the listener goes through a much richer and fulfilling spiritual experience. It must be noted that lyrics are more important than the musical notation, since they hold the message. However, music serves the purpose of a necessary companion to the logical word. Music as an art form has had a very rich history in the Indian subcontinent. It's nature as an emotion influencer was understood early on. Subsets of the ancient Rigveda (c 1500-1200 BC) were set to musical notations.\n\nIn general, the Indian classical music has two foundational elements, RAAG and TALA: \nRAAG is based on notes (including microtones) and forms the fabric of the melodic structure.\nTALA provides the rhythm (improvisation using time).\n\nGuru Granth predominantly structured using RAAG. Each RAAG is meant to elicit certain emotions in the listener. What follows is a brief description of each RAAG and the emotions it portrays. The hymms within these RAAGs tend to signify similar logical meaning as the RAAG they are situated in.",
        subSets: [
          {
            name: 'Raag Sri',
            ang: [14, 94],
            description:
              'The basis of this Raag is steeped in the traditions of mainstream Indian Classical music. Sri Raag is serious and thought provoking in its nature and creates an atmosphere where the listener is led to heed the advice given therein. The listener (the mind) is made aware of the truth of the message is given a sense of humility and gained knowledge.',
            subSets: [
              {
                name: 'Sri Raag Ki Vaar',
                ang: [83, 91],
              },
            ],
          },
          {
            name: 'Raag Maajh',
            ang: [94, 151],
            description:
              "Raag Majh was composed by the Fifth Sikh Guru (Guru Arjun Dev). The Raag’s origins are based in Punjabi Folk Music and its essence: the game of waiting and yearning for the return of a loved one.\n\nThe feelings evoked by this Raag have often been compared to that of a mother waiting for her child's return after a long period of separation. While she hopes for the child’s return, she is also painfully aware of the uncertainty that the child may not come back. This Raag brings to life the emotion of extreme love, combined with the sorrow and anguish of separation from the beloved.",
            subSets: [
              {
                name: 'Vaar Manjh Ki',
                ang: [137, 150],
                highlight: 5589,
              },
            ],
          },
          {
            name: 'Raag Gauri',
            ang: [151, 347],
            description:
              'Gauri creates a mood where the listener is encouraged to strive harder in order to achieve an objective. Despite this encouragement, the Raag tries to prevent the ego from increasing. This creates an atmosphere where the listener is encouraged toward humble action.',
            subSets: [
              {
                name: 'Gauri Ki Vaar M4',
                ang: [300, 317],
                highlight: 13721,
              },
              {
                name: 'Gauri Ki Vaar M5',
                ang: [318, 323],
              },
            ],
          },
          {
            name: 'Raag Aasa',
            ang: [347, 489],
            description:
              'Aasa has strong emotions of inspiration. A very important Raag, Aasa gives the listener a determination to ignore any excuses and continue down the path of necessary action. Feelings of passion and zeal are felt - which are incredibly useful when the listener is on a difficult path (often the case for spiritual seekers).',
            subSets: [
              {
                name: 'Aasa Ki Vaar',
                ang: [462, 475],
                highlight: 20756,
              },
            ],
          },

          {
            name: 'Raag Gujari',
            ang: [489, 527],
            description:
              'Gujari instills a feeling of desperation. It is often used to make the listener realise the incessant passing of time and thereby realise the value of it. Such a mood brings the listener to an awareness of their own death, making them utilize their remaining ‘life time’ more wisely. Yet another way of pushing the listener toward action.',
            subSets: [
              {
                name: 'Gujari Ki Vaar',
                ang: [508, 517],
                highlight: 22620,
              },
            ],
          },
          {
            name: 'Raag Devagandhari',
            ang: [527, 537],
            description:
              'Devgandhari conveys the feeling of satisfaction. The incredible peace and tranquility observed by the saint authors of Guru Granth their union with the beloved is conveyed in Devagandhari. Depiction of this state of mind makes the listener feel empowered and passionate toward the Truth.',
          },
          {
            name: 'Raag Bihagara',
            ang: [537, 557],
            description:
              'Bihagara elicits pangs of separation and the need to find peace and understanding. It also conveys the beauty of the eventual union which helps eradicate the sense of yearning and desolation due to separation from the beloved.',
            subSets: [
              {
                name: 'Bihagare Ki Vaar',
                ang: [548, 556],
                highlight: 24137,
              },
            ],
          },
          {
            name: 'Raag Vadhans',
            ang: [557, 594],
            description:
              "Vadhans Raag houses extreme spritual romanticism. The self is compared to a bride and the Truth/God the husband. The bride must leave her birth home (materialism) to join with her husband. The bride's bodily ornaments are symbolic of a love-imbued virtuous mind that is ready for union with the husband - the beloved. The sad state of a bride who never meets her true husband is also depicted in Raag Vadhans.",
            subSets: [
              {
                name: 'Vadahans Ki Vaar',
                ang: [585, 594],
                highlight: 25541,
              },
            ],
          },
          {
            name: 'Raag Sorath',
            ang: [595, 660],
            description:
              'Sorath is devotional in nature. It is used to expound the various features of the Truth and make the listener aware of the myriad methods of meditating on the beloved. The merits of God and His rememberance through these merits is a common theme in Sorath. Guru Granth puts great importance in the repetitve remembrance of God, through which one is supposed to inherit His merits.',
            subSets: [
              {
                name: 'Raag Sorath Vaar',
                ang: [642, 654],
                highlight: 27772,
              },
            ],
          },
          {
            name: 'Raag Dhanasari',
            ang: [660, 696],
            description:
              'Dhanasari has a sense of sacrifice. The wealth and power of the Truth is shown as much bigger than the self, thus encouraging the listener to entertain the idea of selflessness, contentment and sacrificial humility. It is no wonder that the `Aarti` hymms are in this Raag. Aarti in Guru Granth is an adornment of the Creator using the vast nature as the ornaments',
          },
          {
            name: 'Raag Jaitsri',
            ang: [696, 711],
            description:
              'Jaitsri conveys the heartfelt emotion of not being able to live without someone. Its mood is that of dependence and an overwhelming sense of desperation trying to reach out to the beloved.',
            subSets: [
              {
                name: 'Jaitsri M5 Vaar Saloka Naal',
                ang: [705, 710],
                highlight: 30297,
              },
            ],
          },
          {
            name: 'Raag Todi',
            ang: [711, 719],
            description:
              'Todi Raag is used to convey wise messages in a serious tone. The falsehood of materialism (Maya) is a recurring theme in this Raag.',
          },
          {
            name: 'Raag Bairari',
            ang: [719, 721],
            description:
              'Bairari is a motivational Raag. It stimulates the listener to continue with the task of loving devotion toward God. There is a sense of achievement, but no vanity. Accomplishment, but also the desire to keep going.',
          },
          {
            name: 'Raag Tilang',
            ang: [721, 728],
            description:
              "Tilang has a brooding tone. It takes the listener to a sad, but beautiful state. In this bittersweet nature of Tilang, a listener feels detachment from the 'bitter' materialism and attachment to the 'sweet' Truth.",
          },
          {
            name: 'Raag Suhi',
            ang: [728, 795],
            description:
              'Suhi has an uplifting mood to it. It repeatedly explores the state of mind from an impure one (no love for Truth) to a pure and realised one. Consequently, Suhi Raag contains many hymms that depict the steps a mind takes from the beginning to the final stage of union. Songs of this transition naturally leave the listener with a hopeful and uplifted mood.',
            subSets: [
              {
                name: 'Vaar Suhi Ki',
                ang: [785, 792],
                highlight: 33325,
              },
            ],
          },
          {
            name: 'Raag Bilaval',
            ang: [795, 859],
            description:
              'Bilaval has a pleasant happiness to it and is extremely beautiful. A combination of humility and love for the Master make this Ragg a very moving experience for the listener.',
            subSets: [
              {
                name: 'Bilaval Ki Vaar',
                ang: [849, 855],
              },
            ],
          },
          // All descriptions below this point have been copied over from either jawadditaksal.org or sikhWiki
          // TODO: Needs some love
          {
            name: 'Raag Gond',
            ang: [859, 876],
            description:
              'Gond is an expression of triumph, however these feelings are balanced and in perspective ensuring that there is also an aspect of humility. Therefore, although there is a sense of knowing and understanding the achievement, there is not a feeling of becoming obsessed or getting lost in the achievement itself.',
          },
          {
            name: 'Raag Ramkali',
            ang: [876, 975],
            description:
              'The emotions in Ramkali are like those of a wise teacher disciplining their student. The student is aware of the pain of learning, but is still conscious of the fact that ultimately it is for the best. In this way Ramkali conveys the change from all that we are familiar with, to something we are certain will be better.',
            subSets: [
              {
                name: 'Ramkali Ki Vaar M3',
                ang: [947, 956],
              },
              {
                name: 'Ramkali Ki Vaar M5',
                ang: [957, 966],
              },
              {
                name: 'Ramkali Ki Vaar Rai Balvand',
                ang: [966, 968],
                highlight: 41341,
              },
            ],
          },
          {
            name: 'Raag Nat Narayan',
            ang: [975, 984],
            description:
              'Nat Narayan consists of feelings of hastiness and impatience, however simultaneously there is stability and control. Although there is control in the Raag, there is still the impression that it is unbalanced and prone to topple at any time.',
          },
          {
            name: 'Raag Mali Gaura',
            ang: [984, 989],
            description:
              'Mali Gaura conveys the confidence of an expert, whose knowledge is self-evident in both their outlook and actions.',
          },
          {
            name: 'Raag Maru',
            ang: [989, 1107],
            description:
              'Maru was traditionally sung on the battlefield in preparation for war. This Raag has an aggressive nature, which creates an inner strength and power to express and emphasise the truth, regardless of the consequences. Maru’s nature conveys the fearlessness and strength that ensures the truth is spoken, no matter what the cost.',
            subSets: [
              {
                name: 'Maru Vaar M3',
                ang: [1086, 1094],
                highlight: 46419,
              },
            ],
          },
          {
            name: 'Raag Tukhari',
            ang: [1107, 1118],
            description:
              'The form of Tukhari is that of a silently sitting Yogi and in the nature of this raag the pangs of separation are seen. However, Guru Sahibs have composed the entire Bani of Tukhari in Chhants and induced the happiness of unison. In this Raag Guru Nanak Devji’s Baramaha is written which is a composition of Vijog (separation) and being in chhants it has elements of Sanjog also. There is no Bhagat Bani in this raag.',
          },
          {
            name: 'Raag Kedara',
            ang: [1118, 1125],
            description:
              'Kedara expresses and makes the mind aware of the true character and nature of the soul. It conveys the emotions of honesty, integrity and truthfulness in a practical and caring way. This approach highlights the soul’s character and is memorable, so that the mind is made aware, without arousing cynicism.',
          },
          {
            name: 'Raag Bhairon',
            ang: [1125, 1168],
            description:
              'Bhairao embodies the soul’s faith and heartfelt devotion towards The Creator. It is a kind of fanaticism, where there is a feeling of not being aware or caring about anything else. The emotions conveyed are those of contentment and of being absorbed in a steadfast belief or faith. In this Raag, the soul is relaying the happiness that the mind could potentially experience if it joined in with this devotion.',
          },
          {
            name: 'Raag Basant',
            ang: [1168, 1197],
            description:
              'Basant denotes the changing of the season and the newness of spring. This Raag encourages the mind to brush away its selfishness, just like spring-cleaning removes all the cobwebs and creates a fresh start. There are feelings of hope and expectation of a new beginning and the start of a new cycle. However, these emotions are not dependent on the physical change of the season, but are an encouragement of an internal effort to change.',
            subSets: [
              {
                name: 'Basant Ki Vaar',
                ang: [1193, 1193],
                highlight: 51311,
              },
            ],
          },
          {
            name: 'Raag Sarang',
            ang: [1197, 1254],
            description:
              "Sarang's character is soothing and has the ability to extinguish the minds smouldering selfishness and negative nature. The emotions of Sarang quench the minds burning desires, by expressing and highlighting the soul’s pure and true thoughts. This is a positive and fulfilling change.",
            subSets: [
              {
                name: 'Sarang Ki Vaar',
                ang: [1237, 1251],
                highlight: 52956,
              },
            ],
          },
          {
            name: 'Raag Malhar',
            ang: [1254, 1294],
            description:
              'Malhar is a communication of feelings from the soul, to show the mind how to become cool and refreshed. The mind is always burning with the desire to reach its goals quickly and without effort, however the emotions conveyed in this Raag are able to bring composure and fulfilment to the mind. It is able to bring the mind into this calmness, bringing a sense of satisfaction and contentment.',
            subSets: [
              {
                name: 'Vaar Mallar Ki',
                ang: [1278, 1291],
                highlight: 54666,
              },
            ],
          },
          {
            name: 'Raag Kaanara',
            ang: [1294, 1319],
            description:
              'Kaanara invokes feelings of being overcome by a personality, which is so impressive that its character is difficult to stop thinking about. The personality conveyed has a magnetism, which makes you think of them as your own and is able to win you over with its remarkable qualities and outlook.',
            subSets: [
              {
                name: 'Kanare Ki Vaar',
                ang: [1312, 1318],
                highlight: 56001,
              },
            ],
          },
          {
            name: 'Raag Kalian',
            ang: [1319, 1327],
            description:
              'Kaliaan produces happiness . The soul in the state of bliss waits for the light of dawn. The soul under the spell of bliss becomes intoxicated on again and again hearing the praises of her lover (God)',
          },
          {
            name: 'Raag Prabhati',
            ang: [1327, 1352],
            description:
              'The emotions conveyed in Parbhati are those of extreme devotion; there is an intense confidence and love for the entity it is devoted to. This affection arises from knowledge, common sense and a detailed study. There is therefore an understanding and a considered will to devote itself to that entity.',
          },
          {
            name: 'Raag Jaijavanti',
            ang: [1352, 1352],
            description:
              'Jaijavanti expresses the feeling of happiness and satisfaction of achievement, however it simultaneously conveys the sadness of losing. This Raag conveys a sense of having to put your duty first, no matter what your inner feelings may be. The dual emotions of joy and sorrow help to keep the listeners stable and prevent them from reveling in their own achievement.',
          },
        ],
      },
      {
        name: 'Post Raag Section',
        ang: [1353, 1430],
        description:
          'The post-raga section (angs 1353 to 1430) contains the Saloks, Swayyes and other compositions. At the close (ang 1429) is the Mundavani (seal) to mark the end of Guru Granth, so that no spurious compositions can thereafter be added, followed by a Guru Arjun Dev Ji’s thanks-giving Salok for the successful completion of the great task by Divine grace. At the end of the post-raga section is the Ragamala (angs 1429 to 1430) which contains a catalogue of most of the ragas used in SGGS.',
        subSets: [
          {
            name: 'Salok Sehaskriti Mahalla 1',
            ang: [1353, 1353],
          },
          {
            name: 'Salok Sehaskriti Mahalla 5',
            ang: [1353, 1360],
          },
          {
            name: 'Mahalla 5 Gaatha',
            ang: [1360, 1361],
          },
          {
            name: 'Funehe Mahalla 5',
            ang: [1361, 1363],
          },
          {
            name: 'Choubole Mahalla 5',
            ang: [1363, 1364],
          },
          {
            name: 'Salok Bhagat Kabir Jio Ke',
            ang: [1364, 1377],
          },
          {
            name: 'Salok Seikh Farid Ke',
            ang: [1377, 1385],
          },
          {
            name: 'Swayyee Sri Mukh Baak Mahalla 5',
            ang: [1385, 1410],
          },
          {
            name: 'Salok Vaaran Te Vadeek',
            ang: [1410, 1426],
          },
          {
            name: 'Salok Mahalla 9',
            ang: [1426, 1429],
            highlight: 60214,
          },
          {
            name: 'Raag Maala',
            ang: [1429, 1430],
            highlight: 60342,
          },
        ],
      },
    ],
  },
  {
    name: 'Sri Dasam Granth Sahib',
    source: 'D',
    ang: [1, 1428],
    description: '',
    subSets: [
      { name: 'Jaap Sahib', ang: [1, 10] },
      { name: 'Akal Ustat', ang: [11, 38] },
      { name: 'Bachittar Natak', ang: [39, 73] },
      { name: 'Chandi Charitar Ukti Bilas', ang: [74, 100] },
      { name: 'Chandi Charitar II', ang: [100, 119], highlight: 78950 },
      {
        name: 'Vaar Sri Bhagouti Jee kee',
        ang: [119, 127],
        highlight: 80052,
      },
      { name: 'Gyan Prabodh', ang: [127, 155], highlight: 80410 },
      { name: 'Ath Chaubis Avtar', ang: [155, 611], highlight: 81827 },
      { name: 'Brahma Avtar', ang: [611, 635], highlight: 100482 },
      { name: 'Rudra Avtar', ang: [635, 709], highlight: 101932 },
      { name: 'Shabad Patshahi 10', ang: [709, 712], highlight: 105804 },
      { name: '33 Swayyee', ang: [712, 716], highlight: 105892 },
      { name: 'Khalsa Mahima', ang: [716, 717], highlight: 106028 },
      {
        name: 'Ath Sri Shastar Naam Mala Purana Likhyate',
        ang: [717, 809],
        highlight: 106046,
      },
      { name: 'Sri Charitropakhyan', ang: [809, 1386] },
      { name: 'Chaupai', ang: [1386, 1388], highlight: 140033 },
      { name: 'Zafarnamah', ang: [1389, 1389] },
      { name: 'Hikayat', ang: [1394, 1428], highlight: 140380 },
    ],
  },
];
