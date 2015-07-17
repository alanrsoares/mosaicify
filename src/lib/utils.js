export const unique = (items) => {
  let map = items.reduce((uniqueItems, item) => {
    let key = JSON.stringify(item);
    if (!uniqueItems[key]) {
      uniqueItems[key] = item;
    }
    return uniqueItems;
  }, {});
  return Object.values(map);
};

export const memoise = (fn) => {
  let memo = {};
  return (...xs) => {
    let key = JSON.stringify(xs);
    return memo[key] || (memo[key] = fn.apply(this, xs));
  };
};

export const merge = Object.assign;

export const defaultIfLess = (value, defaultValue) => value > defaultValue ? value : defaultValue;
