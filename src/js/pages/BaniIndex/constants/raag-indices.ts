export 
interface Index {
  name: string,
  pages: [number, number],
  highlight?: number
}

export interface IRaagIndex {
  name: string;
  source: 'G' | 'D';
  path: string;
  indices: Index[];
}

export interface IRaagIndices {
  SGGS: IRaagIndex;
  DG: IRaagIndex;
}

export const raagIndices: IRaagIndices = {
  SGGS: {
    name: 'Sri Guru Granth Sahib Jee',
    source: 'G',
    path: 'sri-guru-granth-sahib',
    indices: [
      {
        name: 'Raag Sri',
        pages: [14, 94],
      },
      {
        name: 'Sri Raag Ki Vaar',
        pages: [83, 91],
      },
      {
        name: 'Raag Maajh',
        pages: [94, 151],
      },
      {
        name: 'Vaar Manjh Ki',
        pages: [137, 150],
        highlight: 5589,
      },
      {
        name: 'Raag Gauri',
        pages: [151, 347],
      },
      {
        name: 'Gauri Ki Vaar M4',
        pages: [300, 317],
        highlight: 13721,
      },

      {
        name: 'Gauri Ki Vaar M5',
        pages: [318, 323],
      },
      {
        name: 'Raag Asa',
        pages: [347, 489],
      },
      {
        name: 'Asa Ki Vaar',
        pages: [462, 475],
        highlight: 20756,
      },
      {
        name: 'Raag Gujari',
        pages: [489, 527],
      },
      {
        name: 'Gujari Ki Vaar',
        pages: [508, 517],
        highlight: 22620,
      },
      {
        name: 'Raag Devagandhari',
        pages: [527, 537],
      },
      {
        name: 'Raag Bihagara',
        pages: [537, 557],
      },
      {
        name: 'Bihagare Ki Vaar',
        pages: [548, 556],
        highlight: 24137,
      },
      {
        name: 'Raag Vadahans',
        pages: [557, 595],
      },
      {
        name: 'Vadahans Ki Vaar',
        pages: [585, 594],
        highlight: 25541,
      },
      {
        name: 'Raag Sorath',
        pages: [595, 660],
      },
      {
        name: 'Raag Sorath Vaar',
        pages: [642, 654],
        highlight: 27772,
      },
      {
        name: 'Raag Dhanasari',
        pages: [660, 696],
      },
      {
        name: 'Raag Jaitsri',
        pages: [696, 711],
      },
      {
        name: 'Jaitsri M5 Vaar Saloka Naal',
        pages: [705, 710],
        highlight: 30297,
      },
      {
        name: 'Raag Todi',
        pages: [711, 719],
      },
      {
        name: 'Raag Bairari',
        pages: [719, 721],
      },
      {
        name: 'Raag Tilang',
        pages: [721, 728],
      },
      {
        name: 'Raag Suhi',
        pages: [728, 795],
      },
      {
        name: 'Vaar Suhi Ki',
        pages: [785, 792],
        highlight: 33325,
      },
      {
        name: 'Raag Bilaval',
        pages: [795, 859],
      },
      {
        name: 'Bilaval Ki Vaar',
        pages: [849, 855],
      },
      {
        name: 'Raag Gond',
        pages: [859, 876],
      },
      {
        name: 'Raag Ramkali',
        pages: [876, 975],
      },
      {
        name: 'Ramkali Ki Vaar M3',
        pages: [947, 956],
      },
      {
        name: 'Ramkali Ki Vaar M5',
        pages: [957, 966],
      },
      {
        name: 'Ramkali Ki Vaar Rai Balvand',
        pages: [966, 968],
        highlight: 41341,
      },
      {
        name: 'Raag Nat Narain',
        pages: [975, 984],
      },
      {
        name: 'Raag Mali Gaura',
        pages: [984, 989],
      },
      {
        name: 'Raag Maru',
        pages: [989, 1107],
      },
      {
        name: 'Maru Vaar M3',
        pages: [1086, 1094],
        highlight: 46419,
      },
      {
        name: 'Raag Tukhari',
        pages: [1107, 1118],
      },
      {
        name: 'Raag Kedara',
        pages: [1118, 1125],
      },
      {
        name: 'Raag Bhairon',
        pages: [1125, 1168],
      },
      {
        name: 'Raag Basant',
        pages: [1168, 1197],
      },
      {
        name: 'Basant Ki Vaar',
        pages: [1193, 1193],
        highlight: 51311,
      },
      {
        name: 'Raag Sarang',
        pages: [1197, 1254],
      },
      {
        name: 'Sarang Ki Vaar',
        pages: [1237, 1251],
        highlight: 52956,
      },
      {
        name: 'Raag Mallar',
        pages: [1254, 1294],
      },
      {
        name: 'Vaar Mallar Ki',
        pages: [1278, 1291],
        highlight: 54666,
      },
      {
        name: 'Raag Kanara',
        pages: [1294, 1319],
      },
      {
        name: 'Kanare Ki Vaar',
        pages: [1312, 1318],
        highlight: 56001,
      },
      {
        name: 'Raag Kalian',
        pages: [1319, 1327],
      },
      {
        name: 'Raag Prabhati',
        pages: [1327, 1352],
      },
      {
        name: 'Raag Jaijavanti',
        pages: [1352, 1352],
      },
      {
        name: 'Salok Sehaskriti Mahalla 1',
        pages: [1353, 1353],
      },
      {
        name: 'Salok Sehaskriti Mahalla 5',
        pages: [1353, 1360],
      },
      {
        name: 'Mahalla 5 Gaatha',
        pages: [1360, 1361],
      },
      {
        name: 'Funehe Mahalla 5',
        pages: [1361, 1363],
      },
      {
        name: 'Choubole Mahalla 5',
        pages: [1363, 1364],
      },
      {
        name: 'Salok Bhagat Kabir Jio Ke',
        pages: [1364, 1377],
      },
      {
        name: 'Salok Seikh Farid Ke',
        pages: [1377, 1385],
      },
      {
        name: 'Swayyee Sri Mukh Baak Mahalla 5',
        pages: [1385, 1410],
      },
      {
        name: 'Salok Vaaran Te Vadeek',
        pages: [1410, 1426],
      },
      {
        name: 'Salok Mahalla 9',
        pages: [1426, 1429],
        highlight: 60214,
      },
      {
        name: 'Raag Maala',
        pages: [1429, 1430],
        highlight: 60342,
      },
    ],
  },
  DG: {
    name: 'Sri Dasam Granth Sahib',
    source: 'D',
    path: 'sri-dasam-granth-sahib',
    indices: [
      { name: 'Jaap Sahib', pages: [1, 10] },
      { name: 'Akal Ustat', pages: [11, 38] },
      { name: 'Bachittar Natak', pages: [39, 73] },
      { name: 'Chandi Charitar Ukti Bilas', pages: [74, 100] },
      { name: 'Chandi Charitar II', pages: [100, 119], highlight: 78950 },
      {
        name: 'Vaar Sri Bhagouti Jee kee',
        pages: [119, 127],
        highlight: 80052,
      },
      { name: 'Gyan Prabodh', pages: [127, 155], highlight: 80410 },
      { name: 'Ath Chaubis Avtar', pages: [155, 611], highlight: 81827 },
      { name: 'Brahma Avtar', pages: [611, 635], highlight: 100482 },
      { name: 'Rudra Avtar', pages: [635, 709], highlight: 101932 },
      { name: 'Shabad Patshahi 10', pages: [709, 712], highlight: 105804 },
      { name: '33 Swayyee', pages: [712, 716], highlight: 105892 },
      { name: 'Khalsa Mahima', pages: [716, 717], highlight: 106028 },
      {
        name: 'Ath Sri Shastar Naam Mala Purana Likhyate',
        pages: [717, 809],
        highlight: 106046,
      },
      { name: 'Sri Charitropakhyan', pages: [809, 1386] },
      { name: 'Chaupai', pages: [1386, 1388], highlight: 140033 },
      { name: 'Zafarnamah', pages: [1389, 1389] },
      { name: 'Hikayat', pages: [1394, 1428], highlight: 140380 },
    ],
  }
};
