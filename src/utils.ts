type StringFun = (str: string) => string;

export const trimStr: StringFun = (str: string) => {
  return str.trim();
};

export const trimQuote: StringFun = (str: string) => {
  if (!str) {
    return '';
  }
  return trimStr(str).replace(/^("|')/, '').replace(/("|')$/, '');
};

export const formatAttr = (attr: string) => {
  const attrObj = {};
  // 去除开头空格
  attr = trimStr(attr);
  let key = '';
  let value;
  let matchKey = true;
  let valueSplit = ' ';
  for (const char of attr) {
    if (matchKey) {
      if (char === ' ') {
        continue;
      } else if (char !== '=') {
        key += char;
      } else {
        attrObj[key] = true;
        matchKey = false;
      }
    } else {
      if (value === undefined) {
        if (char === '"' || char === `'`) {
          valueSplit = char;
        }
        value = '';
      } else {
        if (char === valueSplit) {
          matchKey = true;
          attrObj[key] = value;
          value = undefined;
          key = '';
        } else {
          value += char;
        }
      }
    }
  }
  if (key) {
    attrObj[key] = value === undefined ? true : value;
  }
  return attrObj;
};
