const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};

var sumOfLeftLeaves = function (root) {
  let sum = 0;

  const traversal = (node) => {
    if (node !== null) {
      const leftChild = node.left;

      if (leftChild && !leftChild.left && !leftChild.right) {
        sum += leftChild.val;
      }

      traversal(node.left);
      traversal(node.right);
    }
  };

  traversal(root);
  return sum;
};

const res = sumOfLeftLeaves(tree);
console.log(res);
