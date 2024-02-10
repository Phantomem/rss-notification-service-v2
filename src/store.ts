import {google, sheets_v4} from 'googleapis';

const {
  GOOGLE_API_CREDENTIALS_FILE_NAME,
} = process.env;

export const getClient = async (): Promise<sheets_v4.Sheets> => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${GOOGLE_API_CREDENTIALS_FILE_NAME}.json`,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  //@FIXME google.sheets not accepting provided json even if seems legit. Something not configured or wrong on lib for TS.
  //@ts-ignore
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
};

export const parseSheet = <T>(arr: string[][]): T[] => {
  const [nameRow, ...values] = arr;

  return values.reduce((acc, next ) => {
    const obj = next.reduce((acc2, next2, i) =>
      ({...acc2, [nameRow[i]]: next2})
      ,{} as T);
    return [...acc, obj];
  }, [] as T[])
}

// @ts-ignore
export const getSheetCellsValues = async <T>(sheetId, tabName, range): Promise<T[]> =>  {
  const client = await getClient();
  const res = await client.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return parseSheet(res.data.values);
};

//@ts-ignore
export const updateSheetCellsValues = async (sheetId, tabName, range, data): Promise<void> =>  {
  const client = await getClient();
  //@FIXME google.sheets not accepting provided json even if seems legit. Something not configured or wrong on lib for TS.
  // @ts-ignore
  await client.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      "majorDimension": "ROWS",
      "values": data
    },
  })
}
