import * as http from 'https';

export const httpGet = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
      res.on('error', (error: Error) => {
        reject(error);
      });
    });
  });
};
