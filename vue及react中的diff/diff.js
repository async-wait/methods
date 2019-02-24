
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
    if (oldTree.type === newTree.type) {
        let attrs = diffAttr(oldTree.props, newTree.props);
    }
};