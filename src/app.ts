import * as dotenv from 'dotenv';
dotenv.config();

import {getSheetCellsValues, updateSheetCellsValues} from "./store";
import {RssStoreType} from "./types/rssStore.type";
import {findItemsAfterDate, getRssData} from "./rss";
import {discordNotificationProvider} from "./discord-notification";

const {
  GOOGLE_SHEET_TAB_NAME,
  GOOGLE_SHEET_ID
} = process.env;

(async () => {
  await discordNotificationProvider.connect();
  try {
    const rssStore = await getSheetCellsValues<RssStoreType>(
      GOOGLE_SHEET_ID,
      GOOGLE_SHEET_TAB_NAME,
      'A:B'
    );
    const storeLastDates = await Promise.all(rssStore.map(async (rss) => {
      const {link, lastDate} = rss;

      const rssData = await getRssData(link);
      const newItems = findItemsAfterDate(rssData, new Date(lastDate));

      if (!newItems?.length) {
        return lastDate;
      }

      const newLastDate = rssData.pubDate;
      await discordNotificationProvider.notify(newItems.map(item => `${item.title}\n${item.link}`));

      return newLastDate;
    }));
    await updateSheetCellsValues(
      GOOGLE_SHEET_ID,
      GOOGLE_SHEET_TAB_NAME,
      'B:B',
      ['lastDate', ...storeLastDates]
    );
  } catch (err) {
    throw err;
  } finally {
    await discordNotificationProvider.disconnect();
  }
})();
