import { Err, Ok, Result } from "ts-results"

type InsertError<K,V> = {
  kind: 'alreadyRegisteredKey',
  key: K
} | {
  kind: 'alreadyRegisteredValue',
  value: V
}

export class BijectiveMap<K,V> {
  private forwardMap: Map<K,V> = new Map()
  private inverseMap: Map<V,K> = new Map()

  constructor(fowardMap: Map<K,V> = new Map()) {
    this.forwardMap = fowardMap
    this.inverseMap = new Map([...fowardMap.entries()].map(([k,v]) => [v,k]))
  }

  invert(): Map<V,K> {
    return this.inverseMap
  }

  toMap(): Map<K,V> {
    return this.forwardMap
  }

  hasKey(key: K): boolean {
    return this.forwardMap.has(key)
  }

  hasValue(value: V): boolean {
    return this.inverseMap.has(value)
  }

  tryInsert(key: K, value: V): Result<BijectiveMap<K,V>, InsertError<K,V>> {
    if(this.hasKey(key)) {
      return Err({ kind: 'alreadyRegisteredKey', key })
    }
    if(this.hasValue(value)) {
      return Err({ kind: 'alreadyRegisteredValue', value })
    }

    return Ok(new BijectiveMap(new Map([...this.forwardMap.entries(), [key, value]])))
  }

  [Symbol.iterator]() {
    return this.forwardMap[Symbol.iterator]()
  }
}
