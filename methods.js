/**
 * 检测数据类型
 * @param {*} data 
 */
function getType(data) {
  let type = Object.prototype.toString.call(data);
  let map = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Boolean]': 'boolean',
    '[object RegExp]': 'regexp',
    '[object Null]': 'null',
    '[object Error]': 'error',
    '[object Function]': 'function',
    '[object Undefined]': 'undefined'
  }
  return map[type];
}

/**
 * 数组参数可以使对象
 * @param {* arr id} data 
 * arr 为要去重的对象数组
 * id  如果数组参数为对象，则需要传入对象的唯一标识符
 */
function distinct(arr, id) {
  let obj = {};
  arr = arr.reduce((item, next) => {
    if(id) {
      obj[next[id]] ? '' : obj[next[id]] = true && item.push(next);
    }
    else {
      obj[next] ? '' : obj[next] = true && item.push(next);      
    }
    return item;
  }, [])
  return arr;
}

/**
 * 
 * 深拷贝
 */
function deepClone(data) {
  let obj = null;
  obj = JSON.parse(JSON.stringify(data));
  return obj;
}

