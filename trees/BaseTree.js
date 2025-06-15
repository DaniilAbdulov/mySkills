class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Вставка элемента
  insert(value) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      //если это корневой элемент, то делаем его таковым
      this.root = newNode;
    } else {
      // иначе если уже есть корневой, то вставляем новый узел
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    //если значение нового узла меньше значения узла, к которому он вставляется
    if (newNode.value < node.value) {
      //если у узла, к которому добавляется нет левого потомка, то новый узел им становится
      if (node.left === null) {
        node.left = newNode;
      } else {
        // иначе рекурсивно доходим до того узла, у которого левый потомок не будет null
        this.insertNode(node.left, newNode);
      }
      // аналогично, если значение узла больше чем значение узла, к которому он добавляется
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Поиск элемента
  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (node === null) {
      return false;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return true;
    }
  }

  // Удаление элемента
  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // Узел без потомков или с одним потомком
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Узел с двумя потомками
      const minRight = this.findMinNode(node.right);
      node.value = minRight.value;
      node.right = this.removeNode(node.right, minRight.value);
      return node;
    }
  }

  // Поиск минимального узла
  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  // Обход дерева в порядке "in-order" (левый, корень, правый)
  inOrderTraversal(callback) {
    this.inOrder(this.root, callback);
  }

  inOrder(node, callback) {
    if (node !== null) {
      this.inOrder(node.left, callback);
      callback(node.value);
      this.inOrder(node.right, callback);
    }
  }

  // Обход дерева в порядке "pre-order" (корень, левый, правый)
  preOrderTraversal(callback) {
    this.preOrder(this.root, callback);
  }

  preOrder(node, callback) {
    if (node !== null) {
      callback(node.value);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  // Обход дерева в порядке "post-order" (левый, правый, корень)
  postOrderTraversal(callback) {
    this.postOrder(this.root, callback);
  }

  postOrder(node, callback) {
    if (node !== null) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
    }
  }

  // Поиск минимального значения в дереве
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  // Поиск максимального значения в дереве
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }

  // глубина дерева итеративный подход
  findDepthIterative() {
    const {root} = this;

    const queue = [root];
    let depth = 0;

    while (queue.length) {
      depth++;
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();

        if (node.left) {
          queue.push(node.left);
        }

        if (node.right) {
          queue.push(node.right);
        }
      }
    }

    return depth;
  }

  findDepthRecursive() {
    const {root} = this;

    const findDepth = (node) => {
      if (!node) {
        return 0;
      }

      return 1 + Math.max(findDepth(node.left), findDepth(node.right));
    };

    return findDepth(root);
  }

  // вращение дерева
  // последоватльно разоворачиваем каждый узел
  invertTree(root) {
    if (!root) {
      return root;
    }

    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    this.invertTree(root.left);
    this.invertTree(root.right);

    return root;
  }
}

// Пример использования
const tree = new BinaryTree();

tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

const revertedTree = tree.invertTree(tree.root);
