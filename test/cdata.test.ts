import * as assert from 'assert';
import dolmx from '../src';
describe('/test/cdata.test.ts', () => {
  it('simple', async () => {
    const result: any = dolmx(`<title><![CDATA[test]]></title>`);
    assert(result.title._value === 'test');
  });
  it('cdata multi line', async () => {
    const result: any = dolmx(`<title><![CDATA[
      test
    ]]></title>`);
    assert(/\n/.test(result.title._value));
  });

  it('cdata has element', async () => {
    const result: any = dolmx(`<title><![CDATA[<item></item>]]></title>`);
    assert(result.title._value === '<item></item>');
  });
  it('complex', async () => {
    const result: any = dolmx(`
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
    `);
    console.log(JSON.stringify(result, null, 2));
    assert(result.rss.channel.title._value === '知乎热榜');
    assert(result.rss.channel.link._value === 'https://www.zhihu.com/billboard');
    assert(result.rss.channel.description._value === '知乎热榜');
    assert(result.rss.channel.item.title._value === '苹果公司 2018 年 9 月 12 日举办的秋季发布会有哪些亮点和槽点？');
  });
});
