import {expect} from 'chai';

export interface ListNode<T> {
  val: T,
  next: ListNode<T> | null,
};

// write a function to remove duplicates from a list

function removeDupes<T> (list: ListNode<T>): ListNode<T> {
  if (list == null) {
    return list;
  }

  const existing: Set<T> = new Set<T>();
  let $current: ListNode<T> | null = list; // always the next node we are considering, may be a dupe
  let $prev = list; // always the previously appended node

  while ($current != null) {
    if (existing.has($current.val)) {
      $prev.next = $current.next;
      $current = $current.next;
    } else {
      $prev = $current;
      existing.add($current.val);
      $current = $current.next;
    }
  }
  return list;
};

// Write a function to remove duplicates with no additional buffer / space
function removeDupesNoBuffer<T> (list: ListNode<T>): ListNode<T> {
  if (list == null) {
    return list;
  }

  let slow: ListNode<T> | null = list;

  while (slow != null) {
    let prev = slow;
    let fast = slow.next;
    while (fast != null) {
      if (fast.val === slow.val) {
        prev.next = fast.next;
      } else {
        prev = fast;
      }
      fast = fast.next;
    }
    slow = slow.next;
  }

  return list;
};

const removeDupesAlgos = [
  {function: removeDupes, name: 'removeDupes'},
  {function: removeDupesNoBuffer, name: 'removeDupesNoBuffer'},
];

removeDupesAlgos.forEach(algo => {
  describe('#' + algo.name, () => {
    it('removes single dupe immediately following', () => {
      expect(algo.function({val: 2, next: {val: 2, next: {val: 3, next: null}}}))
        .to.deep.equal({val: 2, next: {val:3, next: null}});
    });

    it('removes single dupe with gap', () => {
      expect(algo.function({val: 2, next: {val: 3, next: {val: 2, next: null}}}))
        .to.deep.equal({val: 2, next: {val:3, next: null}});
    });

    it('removes double dupe immediately following', () => {
      expect(algo.function({val: 2, next: {val: 2, next: {val: 2, next: {val: 3, next: null}}}}))
        .to.deep.equal({val: 2, next: {val:3, next: null}});
    });
  });
});

// write a function that given only a pointer to a middle node in a linked list,
// removes that element from the list.

function deleteMiddle<T>(middle: ListNode<T>): void {
  if (middle == null || middle.next == null) {
    throw new Error('cannot delete null node or with no next node');
  }
  middle.val = middle.next.val;
  middle.next = middle.next.next;
}

describe('#deleteMiddle', () => {
  it('removes middle node', () => {
    const middle = {val: 3, next: {val: 4, next: null}};
    const list = {val: 2, next: middle};

    deleteMiddle(middle);

    expect(list).to.deep.equal({val: 2, next: {val: 4, next: null}});
  });
});


// Write a function that partitions a linked list such that all elements
// less than that partition appear in the first half of the list, and all
// elements greater than or equal to the partition appear in the second half.
function partition(
  list: ListNode<number>,
  partition: number,
): ListNode<number> | null {
  let headFirst: ListNode<number> | null = null;
  let headLast: ListNode<number> | null = null;
  let tailFirst: ListNode<number> | null = null;
  let tailLast: ListNode<number> | null = null;

  let current: ListNode<number> | null = list;

  while (current != null) {
    if (current.val < partition) {
      if (headLast == null) {
        headFirst = current;
        headLast = current;
      } else {
        headLast.next = current;
        headLast = current;
      }
    } else {
      if (tailLast == null) {
        tailFirst = current;
        tailLast = current;
      } else {
        tailLast.next = current;
        tailLast = current;
      }
    }

    current = current.next;
  }

  if (headLast == null) {
    return tailFirst;
  } else if (tailLast == null) {
    return headFirst;
  } else {
    headLast.next = tailFirst;
    tailLast.next = null;
    return headFirst;
  }
}

describe('#partition', () => {
  it('should partition a list', () => {
    expect(partition({val: 2, next: {val: 5, next: {val: 3, next: {val: 8, next: null}}}}, 5)).to.deep.equal(
      {val: 2, next: {val: 3, next: {val: 5, next: {val: 8, next: null}}}})
  })
});
