import {expect} from 'chai';
import {ListNode} from './linked-lists';

// Trees

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

const listToTree = (
  list: Array<number>,
): TreeNode<number> | null => {
  if (list.length === 0) {
    return null;
  } else {
    const midpoint = Math.floor(list.length / 2);
    const root = {
      val: list[midpoint],
      left: listToTree(list.slice(0, midpoint)),
      right: listToTree(list.slice(midpoint + 1)),
    };
    return root;
  }
};

describe('#listToTree', () => {
  it('should convert a list to a tree', () => {
    expect(listToTree([1, 2, 3])).to.deep.equal({
      val: 2,
      left: {val: 1, right: null, left: null},
      right: {val: 3, right: null, left: null},
    });
  });

  it('should convert a larger list to a tree', () => {
    expect(listToTree([1, 3, 7, 9, 10, 12, 14])).to.deep.equal({
      val: 9,
        left: {val: 3,
          left: {val: 1, left: null, right: null},
          right: {val: 7, left: null, right: null},
        },
        right: {val: 12,
          left: {val: 10, left: null, right: null},
          right: {val: 14, left: null, right: null},
        },
    });
  });

  it('should convert an even-length list to a tree', () => {
    expect(listToTree([0, 1, 3, 7, 9, 10, 12, 14])).to.deep.equal({
      val: 9,
        left: {val: 3,
          left: {val: 1,
            left: {val: 0, left: null, right: null},
            right: null},
          right: {val: 7, left: null, right: null},
        },
        right: {val: 12,
          left: {val: 10, left: null, right: null},
          right: {val: 14, left: null, right: null},
        },
    });
  });

  it('should convert empty list to null', () => {
    expect(listToTree([])).to.deep.equal(null);
  });
});

// given a binary tree, write a function that creates a linked list of all the
// nodes at each depth.

interface ListSpec<T> {
  head: ListNode<T>;
  tail: ListNode<T>;
}

function treeToTierListsHelper<T>(
  root: TreeNode<T> | null,
  depth: number,
  map: Map<number, ListSpec<T>>,
): void {
  if (root == null) {
    return;
  }

  const spec = map.get(depth);
  const listNode: ListNode<T> = {val: root.val, next: null};

  if (spec == null) {
    map.set(depth, {head: listNode, tail: listNode});
  } else {
    spec.tail.next = listNode;
    spec.tail = listNode;
  }
  treeToTierListsHelper(root.left, depth + 1, map);
  treeToTierListsHelper(root.right, depth + 1, map);
}

function treeToTierLists<T>(
  root: TreeNode<T> | null,
): Map<number, ListNode<T>> {
  const map = new Map<number, ListSpec<T>>();
  treeToTierListsHelper(root, 0, map);

  const result = new Map<number, ListNode<T>>();
  for (const ent of map.entries()) {
    result.set(ent[0], ent[1].head);
  }
  return result;
}

describe('#treeToTierLists', () => {
  it('should generate tiered linked lists by level of tree', () => {
    const expected = new Map<number, ListNode<number>>();
    expected.set(0, {val: 2, next: null});
    expected.set(1, {val: 1, next: {val: 3, next: null}});

    const actual = treeToTierLists({val: 2,
      left: {val: 1, left: null, right: null},
      right: {val: 3, left: null, right: null}});

    const actualKeys = Array.from(actual.keys());
    const expectedKeys = Array.from(expected.keys());

    expect(actualKeys).to.deep.equal(expectedKeys);


    for (const key of expectedKeys) {
      expect(actual.get(key)).to.deep.equal(expected.get(key));
    }
  });
});


// Graphs

interface GraphNode<T> {
  val: T;
  neighbors: Array<GraphNode<T>>;
}

const visit = (t: any) => {
  console.info(t);
};

function dfsHelper<T>(root: GraphNode<T>, visited: Set<GraphNode<T>>) {
  if (visited.has(root)) {
    return;
  }
  visited.add(root);
  visit(root);
  for (const neighbor of root.neighbors) {
    dfsHelper(neighbor, visited);
  }
}

function dfs<T>(root: GraphNode<T>) {
  const visited = new Set<GraphNode<T>>();
  return dfsHelper(root, visited);
}

function bfs<T>(root: GraphNode<T>) {

}

