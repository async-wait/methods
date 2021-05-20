/**
 * 检测数据类型
 * @param { * } data 要检测的对象
 */
function getType(data) {
    const type = Object.prototype.toString.call(data);
    const map = {
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
 * @param { array } arr 要去重的数组 
 * @param { string|number } id 如果数组参数为对象，则需要传入对象的唯一标示符
 *
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
function unique(array) {
  let result = [];
//   result = array.filter(function (item, index) {
//      return array.indexOf(item) === index;
//   });
  
//   array.forEach(item => {
//     if (!array.includes(item)) {
//       result.push(item);
//     }
//   });
  
//   result = [...new Set(array)];
  
  result = Array.from(new Set(array));
  return result;
}




/**
 * 
 * 深拷贝
 */
function deepClone1(obj) {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepClone1(obj[key]) : obj[key];
  }
  return newObj;
}

/**
 * @desc 防抖函数
 * @param { function } cb 函数
 * @param { number } delay 延迟执行毫秒数
 * @param { boolean } immediate 函数防抖是否立即执行
 */
function debounce(cb, delay, immediate) {
    // var timer = null;
    // return function() {
    //     var context = this;
    //     var args = arguments;
    //     if(timer) {
    //         clearTimeout(timer);
    //     }
    //     if(immediate) {
    //         var callNow = !timer;
    //         timer = setTimeout(function() {
    //             timer = null;
    //         }, delay);
    //         if(callNow) {
    //             method.apply(context, args);
    //         }
    //     }
    //     else {
    //         timer = setTimeout(function() {
    //             method.apply(context, args);
    //         }, delay);
    //     }
    // }
    let timer = null;
    return function () {
        const ctx = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb.apply(ctx, arguments);
            timer = null;
        }, delay);
    }
}
/**
 * @description 节流函数
 * @param { function } cb 目标函数
 * @param { number } delay 间隔多少秒触发一次 
 * @param { boolean } immediate 是否立即执行
 */
function throttle(cb, delay, immediate) {
    let timer = null;
    return function () {
        const ctx = this;
        if (immediate) {
            cb.apply(ctx, arguments);
            immediate = null;
            return;
        }
        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(ctx, arguments);
                timer = null;
            }, delay);
        }
    }
}
/*
* @desc 数组扁平化
* @param { array } array扁平化的数组
*/
function flatten(array) {
//   2
//   while (array.some(item) => Array.isArray(item)) {
//     array = [].concat(..array);
//   }
//   return array;
//   3
  return array.reduce((prev, item) => {
    return prev.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
} 
