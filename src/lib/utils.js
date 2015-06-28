export const unique = (items) => {
  return items.reduce((uniqueItems, item) => {
    if (!(uniqueItems.indexOf(item) + 1)) {
      uniqueItems.push(item);
    }
    return uniqueItems;
  }, []);
};

export const memoise = (fn) => {
  let memo = {};
  return (...xs) => {
    let key = JSON.stringify(xs);
    return memo[key] || (memo[key] = fn.apply(this, xs));
  };
};
