(function (win) {
    const ATTRS = 'ATTRS';  // dom有变化
    const TEXT = 'TEXT';
    const REMOVE = 'REMOVE';
    const REPLACE = 'REPLACE';
    let Index = 0;
    /**
     * 
     * @param {object} oldTree 旧的dom对象
     * @param {object} newTree 新的dom对象
     */
    function diff(oldTree, newTree) {
        let patches = {};
        let index = 0;
        // 递归 比较后的结果放入到补丁包里面
        walk(oldTree, newTree, index, patches);
        return patches;
    };

    function diffAttr(oldAttrs, newAttrs) {
        let patch = {};
        for (let key in oldAttrs) {
            if (oldAttrs[key] !== newAttrs[key]) {
                patch[key] = newAttrs[key];
            }
        }
        for (let key in newAttrs) {
            if (!oldAttrs.hasOwnProperty(key)) {
                patch[key] = newAttrs[key];
            }
        }
        return patch;
    };

    function walk(oldNode, newNode, index, patches) {
        let currentPatch = [];
        // 当节点类型相同时，去比较属性是否相同,产生一个属性补丁包 {type: 'ATTRS', attrs: {class: xxxx}}
        if (typeof oldNode === 'string' && typeof newNode === 'string') {
            if (oldNode !== newNode) {
                currentPatch.push({type: TEXT, text: newNode});
            }
        } else if (!newNode) {
            currentPatch.push({type: REMOVE, index});
        } else if (oldNode.type === newNode.type) {
            let attrs = diffAttr(oldNode.props, newNode.props);
            if (Object.keys(attrs).length > 0) {
                currentPatch.push({type: ATTRS, attrs});
            }
            // 子集比较
            diffChildren(oldNode.children, newNode.children, index, patches);
        } else {
            currentPatch.push({type: REPLACE, newNode});
        }
        if (currentPatch.length > 0) { // 当前元素确实有补丁
            patches[index] = currentPatch;
        }
    };

    function diffChildren(oldChildren, newChildren, index, patches) {
        oldChildren.forEach((item, idx) => {
            walk(item, newChildren[idx], ++Index, patches);
        });
    };
    win.diff = diff;
})(window);