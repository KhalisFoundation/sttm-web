/* globals WRITERS_API_URL */

export const getWriterList = () => { 
  const url = WRITERS_API_URL;  

  return new Promise((resolve, reject) => {
    const json = fetch(url).then((response) => response.json());
    json.then(
      (data) => {
        const { rows : writers } = data;
        let writerList = [];
        
        for (const writer of writers) {
          writerList.push({
            writerID: writer.WriterID,
            writerEnglish : writer.WriterEnglish
          })
        }

        let newWriterList = writerList.slice(1);
        
        resolve(newWriterList);
      },
      (error) => { reject(error); });
  });
}
