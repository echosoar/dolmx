Dolmx is a **1kb** [XML] parser.

It's designed to be as minimal as possible, no devDependencies, run in browser or node.


## Features

- **Fast:** since it's basically one regex and a huge if statement
- **Tiny:** it's 1kb
- **Simple:** pass a XML string, get back an javscript Object.


## Usage

Dolmx exports a single function, which parses a string of XML and returns a javscript Object. Couldn't be simpler.


```js
import dolmx from 'dolmx';

let xml = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[知乎热榜]]></title>
    <link>https://www.zhihu.com/billboard</link>
    <description><![CDATA[知乎热榜]]></description>
    <generator>FeedIamGy</generator>
    <webMaster>feed.iam.gy</webMaster>
    <language>zh-cn</language>
    <lastBuildDate>Thu Sep 13 2018 10:42:34 GMT+0800 (CST)</lastBuildDate>
    <ttl>3000</ttl>
  </channel>
</rss>
`;

let obj = Dolmx(data);
console.log(JSON.stringify(obj, null, '\t'));
/*
{
  "xml": {
    "_attr": {
      "version": "1.0",
      "encoding": "UTF-8"
    }
  },
  "rss": {
    "channel": {
      "title": {
        "_value": "知乎热榜",
        "_attr": {}
      },
      "link": {
        "_value": "https://www.zhihu.com/billboard",
        "_attr": {}
      },
      "description": {
        "_value": "知乎热榜",
        "_attr": {}
      },
      "generator": {
        "_value": "FeedIamGy",
        "_attr": {}
      },
      "webMaster": {
        "_value": "feed.iam.gy",
        "_attr": {}
      },
      "language": {
        "_value": "zh-cn",
        "_attr": {}
      },
      "lastBuildDate": {
        "_value": "Thu Sep 13 2018 10:42:34 GMT+0800 (CST)",
        "_attr": {}
      },
      "ttl": {
        "_value": "3000",
        "_attr": {}
      },
      "_attr": {}
    },
    "_attr": {
      "version": "2.0"
    }
  }
}
*/

```


## License

MIT
