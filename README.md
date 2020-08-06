Dolmx is a **1kb** [XML] parser.

It's designed to be as minimal as possible, no devDependencies, run in browser or node.
<p >
  <a href="https://www.npmjs.com/package/dolmx" alt="npm version">
    <img src="https://img.shields.io/npm/v/dolmx.svg?style=flat" />
  </a>
  <a alt="GitHub license">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://github.com/echosoar/dolmx/actions?query=workflow%3A%22Node.js+CI%22" alt="Node.js CI">
    <img src="https://img.shields.io/badge/Node.js%20CI-passing-brightgreen" />
  </a>
</p>

## Features

- **Fast:** O(n)
- **Tiny:** It's 1kb.
- **Robust:** Written in Typescript, Passed a lot of unit tests.
- **Simple:** Pass a XML string, get back an javscript Object.


## Usage

```
npm i dolmx --save
```

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
    <item>
      <title><![CDATA[苹果公司 2018 年 9 月 12 日举办的秋季发布会有哪些亮点和槽点？]]></title>
      <description>
      <![CDATA[在过去的 10 年里，iOS 一点点成长为了苹果最重要的现金牛]]></description>
      <pubDate>Thu, 13 Sep 2018 02:42:32 GMT</pubDate>
      <guid>https://www.zhihu.com/question/294345168</guid>
      <link>https://www.zhihu.com/question/294345168</link>
    </item>
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
        "_value": "知乎热榜"
      },
      "link": {
        "_value": "https:www.zhihu.combillboard"
      },
      "description": {
        "_value": "知乎热榜"
      },
      "generator": {
        "_value": "FeedIamGy"
      },
      "webMaster": {
        "_value": "feed.iam.gy"
      },
      "language": {
        "_value": "zh-cn"
      },
      "lastBuildDate": {
        "_value": "Thu Sep 13 2018 10:42:34 GMT+0800 (CST)"
      },
      "ttl": {
        "_value": "3000"
      },
      "item": {
        "title": {
          "_value": "苹果公司 2018 年 9 月 12 日举办的秋季发布会有哪些亮点和槽点？"
        },
        "description": {
          "_value": "在过去的 10 年里，iOS 一点点成长为了苹果最重要的现金牛"
        },
        "pubDate": {
          "_value": "Thu, 13 Sep 2018 02:42:32 GMT"
        },
        "guid": {
          "_value": "https:www.zhihu.comquestion294345168"
        },
        "link": {
          "_value": "https:www.zhihu.comquestion294345168"
        }
      }
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
