function getType(data) {
  let type = Object.prototype.toString.call(data);
  let map = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Boolean]': 'boolean',
    '[object RegExp]': 'regexp'
  }
  return map[type];
}
