function trimStr(str) {
  return (str || '').replace(/^([^\w]|\s)+/g, '').replace(/([^\w]|\s)+$/g, '')
}

function trimQuote(str) {
  return trimStr(str).replace(/^("|')(.*)\1$/, '$2');
}

function formatAttr(attr) {
  const attrObj = {};
  trimStr(attr).split(/['"]\s+/).forEach(itemOrigin => {
    const item = trimStr(itemOrigin);
    if (!item) return;
    const tmp = item.split(/=['"]/);
    const key = trimStr(tmp[0]);
    if (!key) return;
    attrObj[key] = trimQuote(tmp[1]) || true;
  });
  return attrObj;
}

export default function dolmx(xmlstring) {
  const reg = /^<\??([a-z][\w\:\.\-]*)(\s[^>]*?)?[\/\?]>|^<([a-z][\w\.\-]*)(\s.*?)?>((?:(?!<\3).)*)<\/\3>|^<([\w\-]+)(\s+.*?)?>((?:<\6.*?<\/\6>|<\6[^>]*?\/>|(?:(?!<\6).)*)*)<\/\6>/igm;
  const isValueReg = /^<!\[CDATA\[(.*?)\]\]>$/im;
  const result = {};
  let mached;
  let key;
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
      key = trimStr(mached[1]);
      child = { _attr: formatAttr(mached[2]) };
    } else if (mached[3]) {
      key = trimStr(mached[3]);
      child = {};
      if (mached[5]) child = dolmx(mached[5]);
      child._attr = formatAttr(mached[4]);
    } else if (mached[6]) {
      key = trimStr(mached[6]);
      child = {};
      if (mached[8]) child = dolmx(mached[8]);
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