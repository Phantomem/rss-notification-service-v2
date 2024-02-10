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

// @ts-ignore
export const getSheetCellsValues = async (sheetId, tabName, range) =>  {
  const client = await getClient();
  const res = await client.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values;
};

