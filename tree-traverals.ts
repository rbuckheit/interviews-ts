interface TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function inorder<T>(tree: TreeNode<T> | null): void {
  if (tree == null) {
    return;
  }
  inorder(tree.left);
  console.info(tree.val);
  inorder(tree.right);
}

function preorder<T>(tree: TreeNode<T> | null): void {
  if (tree == null) {
    return;
  }
  console.info(tree.val);
  preorder(tree.left);
  preorder(tree.right);
}

function postorder<T>(tree: TreeNode<T> | null): void {
  if (tree == null) {
    return;
  }
  postorder(tree.left);
  postorder(tree.right);
  console.info(tree.val);
}

function inorderIteractive<T>(tree: TreeNode<T> | null): void {
  const stack: Array<TreeNode<T>> = [];
  let current: TreeNode<T> | null = tree;

  while (current != null || stack.length > 0) {
    if (current != null) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop() as TreeNode<T>;
      console.info(current.val);
      current = current.right;
    }
  }
}

function preoorderIterative<T>(tree: TreeNode<T> | null): void {
  if (tree == null) {
    return;
  }

  const stack: Array<TreeNode<T>> = [];
  stack.push(tree);

  while (stack.length > 0) {
    const current = stack.pop() as TreeNode<T>;
    console.info(current.val);
    if (current.left != null) {
      stack.push(current.left);
    }
    if (current.right != null) {
      stack.push(current.right);
    }
  }
}

function postorderIterative<T>(tree: TreeNode<T> | null): void {
  if (tree == null) {
    return;
  }
  const stack: Array<TreeNode<T>> = [];
  stack.push(tree);
  const output: Array<T> = [];

  while (stack.length > 0) {
    const cur = stack.pop() as TreeNode<T>;
    output.push(cur.val);

    if (cur.left != null) {
      stack.push(cur.left);
    } else if (cur.right != null) {
      stack.push(cur.right);
    }
  }

  while (output.length > 0) {
    console.info(output.pop());
  }
}
