// 虚拟DOM的类
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
/**
 * @desc 创建虚拟DOM
 * @param {string} type 要创建的dom
 * @param {object} props dom的属性
 * @param {array} children dom中的子节点
 * @return {object} 实例化以后的对象
 */
function createElement(type, props, children) {
    return new Element(type, props, children);
};

/**
 * 
 * @param {object} node 给dom设置属性
 * @param {string} key 属性键名
 * @param {string} value 属性值
 */
function setAttr(node, key, value) {
    switch (key) {
        case 'value': // node是一个inpu或者textarea
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default: 
            node.setAttribute(key, value);
            break;
    }
}

/**
 * @desc 将vnode转化成虚真实dom
 * @param {object} elObj vnode
 */
function render(elObj) {
    let el = document.createElement(elObj.type);
    for (let key in elObj.props) {
        el.setAttribute(key, elObj.props[key]);
        // setAttr(el, key, elObj.props[key]);
    }
    elObj.children.forEach(item => {
        item = (item instanceof Element) ? render(item) : document.createTextNode(item);
        el.appendChild(item);
    });
    return el;
};

// export {
//     createElement,
//     render
// }