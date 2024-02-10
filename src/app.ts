import * as dotenv from 'dotenv';
dotenv.config();

import {getSheetCellsValues, updateSheetCellsValues} from "./store";
import {RssStoreType} from "./types/rssStore.type";
import {findItemsAfterDate, getRssData} from "./rss";

const {
  GOOGLE_SHEET_TAB_NAME,
  GOOGLE_SHEET_ID
} = process.env;


(async () => {
  const rssStore = await getSheetCellsValues<RssStoreType>(
    GOOGLE_SHEET_ID,
    GOOGLE_SHEET_TAB_NAME,
    'A:B'
  );
  // await updateSheetCellsValues(GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB_NAME, 'B:B', [[new Date()], [new Date()]]);
  const rssData = await getRssData(rssStore[0].link);
  const newItems = findItemsAfterDate(rssData, new Date('Sat, 10 Feb 2024 00:52:49 +0000'));
  console.log(newItems, newItems.length);
})();
