import {expect} from 'chai';

// implement a stack that supports querying for the minimum element
class MinStack<T> {
  data: Array<T>;
  mins: Array<T>;

  constructor() {
    this.data = [];
    this.mins = [];
  }

  push(val: T): void {
    if (this.mins.length === 0 || val <= this.min()) {
      this.mins.push(val);
    }
    this.data.push(val);
  }

  pop() : T {
    if (this.data.length === 0) {
      throw new Error('empty stack');
    }
    const popped = this.data[this.data.length - 1];
    if (popped === this.min()) {
      this.mins.pop();
    }
    this.data.pop();
    return popped;
  }

  peek() : T {
    return this.data[this.data.length - 1];
  }

  min(): T {
    if (this.mins.length === 0) {
      throw new Error('empty stack');
    } else {
      return this.mins[this.mins.length - 1];
    }
  }
}

describe('MinStack', () => {

  it('should update min when pushing larger elt', () => {
    const stack = new MinStack<number>();
    stack.push(2);
    stack.push(1);
    expect(stack.min()).to.deep.equal(1);
  });

  it('should retain min when pushing smaller elt', () => {
    const stack = new MinStack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.min()).to.deep.equal(1);
  });

  it('should restore min when popping', () => {
    const stack = new MinStack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(0);
    expect(stack.min()).to.deep.equal(0);
    stack.pop();
    expect(stack.min()).to.deep.equal(1);
  })

  it('should throw on empty pop()', () => {
    expect(() => new MinStack<number>().pop()).to.throw(Error, /empty/);
  });

  it('should throw on empty min()', () => {
    expect(() => new MinStack<number>().min()).to.throw(Error, /empty/);
  });
});

// Implement a stack composed of a set of stacks, each with a max capacity.
// New internal stacks are created once the previous stack hits capacity.

type Stack<T> = Array<T>;

class SetOfStacks<T> {
  stacks: Array<Stack<T>>;
  capacity: number;
  currentStack: Stack<T>;

  constructor({capacity}: {capacity: number}) {
    this.currentStack = [];
    this.stacks = [this.currentStack];
    this.capacity = capacity;
  }

  push(val: T) {
    if (this.currentStack.length >= this.capacity) {
      this.currentStack = [];
      this.stacks.push(this.currentStack);
    }
    this.currentStack.push(val);
  }

  pop(): T {
    if (this.currentStack.length === 0 && this.stacks.length === 1) {
      // current stack empty AND no fallback; throw empty stack exception
      throw new Error('empty stack');
    } else if (this.currentStack.length === 0) {
      // current stack is empty, but we have one to fall back to
      this.stacks.pop();
      this.currentStack = this.stacks[this.stacks.length - 1];
      return this.currentStack.pop()!;
    } else  {
      // current stack is not empty, just pop on it.
      return this.currentStack.pop()!;
    }
  }
}

describe('SetOfStacks', () => {
  it('should push and pop as a single stack', () => {
    const stack = new SetOfStacks({capacity: 1});
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).to.deep.equal(3);
    expect(stack.pop()).to.deep.equal(2);
    expect(stack.pop()).to.deep.equal(1);
    expect(() => stack.pop()).to.throw(Error, /empty/);
  });

  it('should create multi-element inner stacks', () => {
    const stack = new SetOfStacks({capacity: 3});
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.stacks.length).to.deep.equal(1);
    stack.push(4);
    expect(stack.stacks.length).to.deep.equal(2);

    expect(stack.pop()).to.deep.equal(4);
    expect(stack.pop()).to.deep.equal(3);
    expect(stack.pop()).to.deep.equal(2);
    expect(stack.pop()).to.deep.equal(1);

    expect(() => stack.pop()).to.throw(Error, /empty/);
  })

  it('should enforce max capacity', () => {
    const stack = new SetOfStacks({capacity: 1});
    stack.push(1);
    stack.push(2);
    expect(stack.stacks.length).to.deep.equal(2);
  });
});

// implement a queue using two stacks

class StackQueue<T> {
  inbound: Array<T>;
  outbound: Array<T>;

  constructor() {
    this.inbound = [];
    this.outbound = [];
  }

  add(val: T) {
    this.inbound.push(val);
  }

  remove() {
    if (this.outbound.length === 0 && this.inbound.length === 0) {
      throw new Error('empty queue');
    } else if (this.outbound.length === 0) {
      while (this.inbound.length > 0) {
        this.outbound.push(this.inbound.pop()!);
      }
      return this.outbound.pop();
    } else {
      return this.outbound.pop();
    }
  }
}

describe('StackQueue', () => {

  it('should throw on remove() if queue is globally empty', () => {
    expect(() => new StackQueue<number>().remove()).to.throw(Error, /empty/);
  });

  it('should execute remove() in fifo order if not empty', () => {
    const queue = new StackQueue<number>();
    queue.add(1);
    queue.add(2);
    expect(queue.remove()).to.deep.equal(1);
    expect(queue.remove()).to.deep.equal(2);
  });

  it('should allow add/remove after completely emptying', () => {
    const queue = new StackQueue<number>();
    queue.add(1);
    expect(queue.remove()).to.deep.equal(1);
    queue.add(2);
    expect(queue.remove()).to.deep.equal(2);
  });
});

// write a function that sorts a stack.
// invariant: helper is always ordered smallest (top) to largest (bottom)
// while (not all elements consumed)
//   look at the top element of the input stack (pop it out)
//   if invariant would be preserved,
//     push onto helper
//   otherwise:
//     drain the helper back onto the input stack (until invariant would be preserved)
//     push the element on in its place
//     resume iteration.

function sort<T>(stack: Stack<T>): Stack<T> {
  const helper: Stack<T> = [];

  while (stack.length !== 0) {
    let popped = stack.pop()!;
    if (helper.length === 0 || helper[helper.length-1] >= popped) {
      // we can add the element and maintain the invariant
      helper.push(popped);
    } else {
      // drain until invariant is preserved
      while (helper.length > 0 && helper[helper.length-1] < popped) {
        stack.push(helper.pop()!);
      }
      helper.push(popped);
    }
  }

  return helper;
}

describe('sort', () => {
  it('sorts a stack', () => {
    expect(sort([3,5,1,2,4,6])).to.deep.equal([6,5,4,3,2,1]);
  });
  it('sorts an empty stack', () => {
    expect(sort([])).to.deep.equal([]);
  });
});
