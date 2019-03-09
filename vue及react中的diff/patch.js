(function (win) {
    let index = 0;
    function patch(node, patches) {
        console.log(patches);
        walk(node, patches);
    }

    function walk(node, patches) {
        let currentPatch = patches[index++];
        let childNodes = node.childNodes;
        childNodes.forEach(item => walk(item, patches));
        if (currentPatch) {
            doPatch(node, currentPatch);
        }
    }

    function doPatch(node, patch) {
        patch.forEach(item => {
            switch (item.type) {
                case 'ATTRS':
                    for (let k in item.attrs) {
                        if (item.attrs[k]) {
                            node.setAttribute(k, item.attrs[k]);
                        } else {
                            node.removeAttribute(k);
                        }
                    }
                    break;
                case 'REMOVE':
                    node.parentNode.removeChild(node);
                    break;
                case 'TEXT':
                    node.textContent = item.text;
                    break;
                case 'REPLACE':
                    let newNode = (item.newNode instanceof Element) ? render(item.newNode) : document.createTextNode(item.newNode);
                    node.parentNode.replaceChild(newNode, node);
                    break;
            }
        });
    }
    win.patch = patch;
})(window);