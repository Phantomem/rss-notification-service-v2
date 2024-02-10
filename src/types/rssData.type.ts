
export type RssDataItemType = {
  title: string,
  link: string,
  pubDate: string,
}

export type RssDataType = {
  pubDate: string,
  item: RssDataItemType[]
}
