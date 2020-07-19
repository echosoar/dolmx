export const error = (errorMessage) => {
  throw new Error(errorMessage);
};

export const formatAttr = (attr: string[]) => {
  const attrObj = {};
  if (!attr || !attr.length) {
    return attrObj;
  }
  let key = '';
  let value;
  let matchKey = true;
  let valueSplit = '';
  for (const char of attr) {
    if (matchKey) {// 英文、数字、减号、下划线、和英文句
      if (char === ' ') {
        continue;
      } else if (char === '=') {
        if (!key) {
          error('xml property name cannot is empty');
        }
        attrObj[key] = true;
        matchKey = false;
      } else {
        if (!key && !/[a-z_]/i.test(char)) {
          error('xml property name must be start with a-z or _');
        }
        if (!/[\w-]/i.test(char)) {
          error('xml property name must be use a-z/0-9/-/_');
        }
        key += char;
      }
    } else {
      if (value === undefined) {
        if (char === '"' || char === `'`) {
          valueSplit = char;
          value = '';
        } else if (char !== ' ') {
          error('xml property value must be start with \' or "');
        }
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
