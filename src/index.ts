import { trimStr, formatAttr } from './utils';

const dolmx = (xmlstring: string) => {
  const reg = /^<\??([a-z][\w\:\.\-]*)(\s[^>]*?)?[\/\?]|^<([a-z][\w\.\-]*)(\s.*?)?>((?:(?!<\3).)*)<\/\3>|^<([\w\-]+)(\s+.*?)?>((?:<\6.*?<\/\6>|<\6[^>]*?\/>|(?:(?!<\6).)*)*)<\/\6>>/igm;
  // 
  const isValueReg = /^<!\[CDATA\[(.*?)\]\]>$/im;
  const result = {};
  let mached;
  let key: string;
  let child;
  let xmlstr = xmlstring;

  xmlstr = xmlstr.replace(/\s*\n+\s*/gm, '');

  if (!/^</.test(xmlstr)) return { _value: xmlstr };

  if (isValueReg.test(xmlstr)) return { _value: xmlstr.replace(isValueReg, '$1') };
  mached = reg.exec(xmlstr);
  while(mached) {
    xmlstr = xmlstr.substring(0, mached.index) + xmlstr.substring(mached.index +  mached[0].length);
    reg.lastIndex = 0;

    if (mached[1]) {
      // Reg: ^<\??([a-z][\w\:\.\-]*)(\s[^>]*?)?[\/\?]>
      // Match: <?xml version="1.0" encoding="UTF-8"?>
      key = trimStr(mached[1]);
      console.log('mached[2]', mached[2]);
      child = { _attr: formatAttr(mached[2]) };
    } else if (mached[3]) {
      // Reg: ^<([a-z][\w\.\-]*)(\s.*?)?>((?:(?!<\3).)*)<\/\3>
      // Match: <text><aaa /></text>
      key = trimStr(mached[3]);
      child = {};
      if (mached[5]) {
        child = dolmx(mached[5]);
      }
      child._attr = formatAttr(mached[4]);
    } else if (mached[6]) {
      key = trimStr(mached[6]);
      child = {};
      if (mached[8]) {
        child = dolmx(mached[8]);
      }
      child._attr = formatAttr(mached[7]);
    }
    if (result[key]) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      result[key].push(child);
    } else {
      result[key] = child;
    }
    mached = reg.exec(xmlstr);
  }
  return result;
}

export default dolmx;