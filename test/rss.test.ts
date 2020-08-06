import * as assert from 'assert';
import dolmx from '../src';
import { readFileSync } from 'fs';
import { join } from 'path';
describe('/test/rss.test.ts', () => {
  it('rss', async () => {
    const result: any = dolmx(readFileSync(join(__dirname, './data/rss.xml')).toString());
    assert(result.rss.channel.title._value === '知乎热榜');
    assert(result.rss.channel.description._value === '知乎热榜');
    assert(Array.isArray(result.rss.channel.item));
    assert(result.rss.channel.item[1].description._value === '写代码的时间明显变少<br><br>');
    assert(result.rss.channel.item[1].pubDate._value === 'Thu, 13 Sep 2018 02:42:32 GMT');
  });
  it('rss2', async () => {
    const result: any = dolmx(readFileSync(join(__dirname, './data/rss2.xml')).toString());
    assert(result.rss.channel.title._value === '京东图书 - 什么值得买');
    assert(result.rss.channel.item[1].title._value === '《培生自然拼读故事会》（含40册故事书+96张单词认读卡+1张CD等） - 106.12元');
  });
});
