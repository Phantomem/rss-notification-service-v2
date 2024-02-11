import {findItemsAfterDate} from "../src/rss";
import {rssDataAsset} from "./asset/rssData.asset";

describe('rss', () => {
  describe('findItemsAfterDate', () => {
    it('should return empty array', () => {
      const date = new Date(rssDataAsset.pubDate);
      date.setSeconds(date.getSeconds() + 10);
      expect(findItemsAfterDate(rssDataAsset, date)).toEqual([]);
    });
    it('should return first item', () => {
      const firstItem = rssDataAsset.item[0];
      const date = new Date(firstItem.pubDate);
      expect(findItemsAfterDate(rssDataAsset, date)).toEqual([firstItem]);
    });
    it('should return all items', () => {
      const date = new Date(rssDataAsset.item[rssDataAsset.item.length - 1].pubDate);
      date.setSeconds(date.getSeconds() - 10);
      expect(findItemsAfterDate(rssDataAsset, date)).toEqual([...rssDataAsset.item]);
    });
  });
});
