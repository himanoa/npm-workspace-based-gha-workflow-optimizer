// 多分木
export type Node<T> = {
  value: T,
  children: ReadonlyArray<Node<T>>
}

export type Tree<T> = ReadonlyArray<Node<T>>

