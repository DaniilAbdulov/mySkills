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

const findMaxRecursive = (root) => {
  if (!root) {
    return;
  }

  let maxVal = root.val;

  const traversal = (node) => {
    if (node !== null) {
      traversal(node.left);

      if (maxVal < node.val) {
        maxVal = node.val;
      }

      traversal(node.right);
    }
  };

  traversal(root);
  console.log(maxVal);
  return maxVal;
};

const findMaxIterative = (root) => {
  if (!root) {
    return [];
  }

  const queue = [root];

  let num = root.val;

  while (queue.length) {
    const node = queue.shift();

    if (node.val > num) {
      num = node.val;
    }

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }
  console.log(num);
  return num;
};

findMaxRecursive(tree);
findMaxIterative(tree);
