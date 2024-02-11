import * as dotenv from 'dotenv';
dotenv.config();

import {getSheetCellsValues, updateSheetCellsValues} from "./store";
import {RssStoreType} from "./types/rssStore.type";
import {findItemsAfterDate, getRssData} from "./rss";
import {discordNotificationService} from "./discord-notification";

const {
  GOOGLE_SHEET_TAB_NAME,
  GOOGLE_SHEET_ID
} = process.env;


(async () => {
  await discordNotificationService.connect();
  try {
    const rssStore = await getSheetCellsValues<RssStoreType>(
      GOOGLE_SHEET_ID,
      GOOGLE_SHEET_TAB_NAME,
      'A:B'
    );
    const storeLastDates = await Promise.all(rssStore.map(async (rss) => {
      const {link, lastDate} = rss;
      const rssData = await getRssData(link);
      console.log(rssData);
      const newItems = findItemsAfterDate(rssData, new Date(lastDate));
      if (!newItems?.length) {
        return lastDate;
      }
      const newLastDate = rssData.pubDate;
      await Promise.all(newItems.map(async (item) => {
        await discordNotificationService.notify(`
          ${item.title}
          ${item.link}
        `);
      }));
      return newLastDate;
    }));
    await updateSheetCellsValues(
      GOOGLE_SHEET_ID,
      GOOGLE_SHEET_TAB_NAME,
      'B:B',
      ['lastDate', ...storeLastDates]
    );
  } catch (err) {
    console.error(`Exception: `, err.message);
    throw err;
  } finally {
    await discordNotificationService.disconnect();
  }
})();
