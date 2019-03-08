const ATTRS = 'ATTRS';  // dom有变化

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

function walk(oldTree, newTree, index, patches) {
    let currentPatch = [];
    // 比较属性时候有更新
    if (oldTree.type === newTree.type) {
        let attrs = diffAttr(oldTree.props, newTree.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs});
        }
    }
    if (currentPatch.length > 0) { // 当前元素确实有补丁
        patches[index] = currentPatch;
    }
};