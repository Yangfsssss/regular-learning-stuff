/**
 * @description 链表实现队列 test
 * @author Yang
 */

import { MyQueue } from './queue-with-list';

describe('链表实现队列', () => {
  test('add and length', () => {
    const q = new MyQueue();
    expect(q.length).toBe(0);

    q.add(100);
    q.add(200);
    q.add(300);
    expect(q.length).toBe(3);
  });

  test('delete', () => {
    const q = new MyQueue();
    expect(q.delete()).toBeNull();

    q.add(100);
    q.add(200);
    q.add(300);
    expect(q.delete()).toBe(100);
    expect(q.length).toBe(2);
    expect(q.delete()).toBe(200);
    expect(q.length).toBe(1);
    expect(q.delete()).toBe(300);
    expect(q.length).toBe(0);
    expect(q.delete()).toBeNull();
  });
});
