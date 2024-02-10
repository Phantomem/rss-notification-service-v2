import * as dotenv from 'dotenv';
dotenv.config();

import {getSheetCellsValues} from "./store";

const {
  GOOGLE_SHEET_RANGE,
  GOOGLE_SHEET_TAB_NAME,
  GOOGLE_SHEET_ID
} = process.env;


(async () => {
  const a = await getSheetCellsValues(GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB_NAME, GOOGLE_SHEET_RANGE);
  console.log(a);
})();
