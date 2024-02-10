import {httpGet} from "./lib/http";
import * as parser from 'xml2json';
import {RssDataItemType, RssDataType} from "./types/rssData.type";

export const getRssData = async (url: string): Promise<RssDataType> => {
  const xml = await httpGet(url);
  return JSON.parse(parser.toJson(xml))?.rss?.channel;
};

export const findItemsAfterDate = (rssData: RssDataType, date: Date): RssDataItemType[] => {
  const newItems: RssDataItemType[] = [];

  for(let item of rssData.item) {
    if (new Date(item.pubDate) < date) {
      break;
    }
    newItems.push(item);
  }

  return newItems
};
