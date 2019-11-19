# js数据结构与算法
## 数组
几乎所有语言都原生支持数组类型，因为数组是最简单的数据结构。JavaScript里也有数组类型，虽然它的第一个版本并没有支持数组。

数组存储一系列同一种数据类型的值。但在JavaScript里，也可以在数组中保存不同类型的值。

JavaScript只支持一维数组，不支持矩阵。但是我们可以用数组套数组的方式实现矩阵或多维数组

### JavaScript的数组方法参考

方法名 | 描述
---|---
concat | 连接2个或更多数组，并返回结果
every | 对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true
filter | 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
forEach | 对数组中的每一项运行给定函数。这个方法没有返回值
join | 将所有的数组元素连接成一个字符串
indexOf | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1
lastIndexOf | 返回在数组中搜索到的与给定参数相等的元素的索引里的最大值
map | 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
reverse | 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个
slice | 传入索引值，将数组里对应索引范围内的元素作为新数组返回
some | 对数组中的每一项运行给定函数，如果任一项返回true，则返回true
sort | 按照字母顺序对数组排序，支持传入制定排序方法的函数作为参数
toString | 将数组作为字符串返回
valueOf | 和toString类似，将数组作为字符串返回

ES6数组方法名 | 描述
---|---
@@interator | 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对
copyWithin | 复制数组中一系列元素到同一数组指定的起始位置
entries | 返回包含数组所有键值对的@@iterator
includes | 如果数组中存在某个元素则返回true，否则返回false。ES7新增
find | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素
findIndex | 根据毁掉函数给定的条件从数组中查找元素，如果找到则返回该元素在数组中的索引
fill | 用静态值填充数组
from | 根据已有数组创建一个新数组
keys | 返回包含数组所有的索引的@@iterator
of | 根据传入的参数创建一个新数组
values | 返回包含数组中所有值得@@iterator

### 类型数组

类型数组 | 数据类型
--- | ---
Int8Array | 8位二进制补码整数
Uint8Array | 8位无符号整数
Uint8ClampedArray | 8位无符号整数
Int16Array | 16位二进制补码整数
Uint16Array | 16位无符号整数
Int32Array | 32位二进制补码整数
Uint32Array | 32位无符号整数
Float32Array | 32位IEEE浮点数
Float64Array | 64位IEEE浮点数

类型数组用于存储单一类型的数据。

使用WenGL API、进行位操作、处理文件和图像时，类型数组都可以大展拳脚。它用起来和普通数组也毫无二致。

## 栈

### 栈数据结构

栈是一种遵从后进先出原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端叫栈底

**ES6的类是基于原型的。虽然基于原型的类比基于函数的类更节省内存，也更适合创建多个实例，却不能够声明私有属性或方法**

栈的方法：
- push(element(s)):添加一个（或几个）新元素到栈顶。
- pop()：移除栈顶的元素，同时返回被移除的元素。
- peek(): 返回栈顶的元素，不对栈做任何修改(这个方法不会移除栈顶的元素，仅仅返回它)
- isEmpty(): 如果栈里没有任何元素就返回true,否则返回false。
- clear()：移除栈里的所有元素。
- size(): 返回栈里的元素个数。这个方法和数组的length属性很类似。
``` js{4}
class Staxk{
    constructer(){
        this.items = []
    }
    push(element){
        this.items.push(element)
    }
    pop(){
        return this.items.pop()
    }
    peek(){
        return this.items[this.items.length-1];
    }
    isEmpty(){
        return this.items.length === 0;
    }
    clear(){
        this.items = []
    }
    size(){
        return this.items.length
    }
    
}
```

### 栈的应用
栈的实际应用非常广泛。在回溯的问题中，它可以存储访问过的任务或路径、撤销的操作（后面的章节讨论图和回溯问题时，我们会学习如何应用这个例子）。Java和C#用栈来存储变量和方法调用，特别是处理递归算法时，有可能抛出一个栈溢出异常。

#### 从十进制到二进制
``` js{4}
function divideBy2(decNumber){
    var remStak = new Stack(),
    rem,
    binaryString = '';
    while(decNumber > 0){
        rem = Math.floor(decNumber % 2)
        remStach.push(rem);
        decNumber = Math.floor(decNumber / 2)
    }
    
    while(!remStack.isEmpty()){
        binaryString += remStach.pop().toString()
    }
    return binaryString;
}

// 十进制数转换成任意进制数

function baseConverter(decNumber,base){
    var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF';
    while(decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNUmber / base);
    }
    while(!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    
    return baseString;
}

```
## 队列

### 队列数据结构

队列是遵循FIFO（先进先出）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。

队列的方法
- enqueue(elment(s))：向队列尾部添加一个（或多个）新的项。
- dequeue()：移除队列的第一项，并返回被移除的元素。
- front()：返回队列中第一个元素---最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息---与Stack类的peek方法非常类似）。
- isEmpty(): 如果队列中不包含任何元素，返回true，否则返回false。
- size(): 返回队列包含的元素个数，与数组的length属性类似。
``` js{4}
class Queue(){
    constructor(){
        this.items = []
    }
    enqueue(element){
        this.items.push(element)
    }
    dequeue(){
        this.items.shift();
    }
    front(){
        return this.items[0]
    }
    isEmpty(){
        return this.items.length===0
    }
    size(){
        return this.items.length
    }
}
```
### 优先队列

元素的添加和移除是基于优先级的。一个现实的例子就是机场登机的顺序。头等舱和商务舱乘客的优先级要高于经济舱乘客。在有些过激，老年人和孕妇（或带小孩的妇女）登机时也享有高于其他乘客的优先级。

``` js{4}

class QueueElement{
    constructor(element,priority){
        this.element = element
        this.priority = priority
    }
}

class PriorityQueue{
    constructor(){
        this.items = []
    }
    enqueue(element,priority){
        let queueElement = new QueueElement(element,priority)
        let added = false;
        for(let i=0;i<items.length;i++){
            if(queueElement.priority < this.items[i].priority){
                this.items.splice(i,0,queueElement);
                added = true;
                break;
            }
        }
        if(!added){
            items.push(queueElement);
        }
    }
    print(){
        for(let i = 0; i < this.items.length;i++){
            console.log(`${this.items[i].element} - ${this.items[i].priority}`)
        }
    }
}
```


### 循环队列（击鼓传花）

``` js{4}
function hotPotato(nameList,num){
    let queue = new Queue()
    for (let i = 0;i<nameList.length; i++){
        queue.enqueue(nameList[i]);
    }
    
    let eliminated = '';
    while(queue.size()>1){
        for (let i = 0; i<num; i++){
            queue.enqueue(queue.dequeue())
        }
        eliminated = queue.dequeue();
        console.log(eliminated + '在击鼓传花游戏中被淘汰')
    }
    
    return queue.dequeue();
}
```

**当我们在浏览器中打开新标签时，就会创建一个任务队列。这是因为每个标签都是单线程处理所有的任务，它被称为事件循环。**

## 链表

### 链表数据结构

在大多数语言中，数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素。

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针）组成

### 创建链表

- append(element): 向列表尾部添加一个新的项。
- insert(position,element): 向列表的特定位置插入一个新的项。
- remove(element): 从列表中移除一项。
- indexOf(element): 返回元素在列表中的索引。如果列表中没有该元素则返回-1。
- removeAt(position):从列表的特定位置移除一项。
- isEmpty(): 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
- size(): 返回链表包含的元素个数。与数组的lengeh属性类似。
- toString(): 由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值

``` js{4}
/**
 * 链表数据结构
 */

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  #head = null;
  #length = 0;
  /**
   * @description 向链表中添加元素
   * @param element
   * @memberof LinkedList
   */
  append(element) {
    let node = new Node(element),
      current
    if (this.#head === null) {
      // 列表中第一个节点
      this.#head = node
    } else {
      current = this.#head
      while (current.next) {
        // 循环列表，直到找到最后一项
        current = current.next
      }
      // 找到最后一项，将其next赋值为node，建立链接
      current.next = node
    }
    this.#length++ //更新列表的长度
  }
  /**
   * @description 移除指定位置上的元素
   * @param position
   * @returns 返回移除的元素
   * @memberof LinkedList
   */
  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.#head,
        previous,
        index = 0
      if (position === 0) {
        // 移除第一项
        this.#head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        // 将previous 与current的下一项链接起来；跳过current，从而移除它
        previous.next = current.next
      }
      this.#length--
      return current.element
    } else {
      return null
    }
  }
  /**
   * @description 在任意位置插入元素
   * @param position
   * @param element
   * @memberof LinkedList
   */
  insert(position, element) {
    // 检查越界
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = this.#head,
        previous,
        index = 0
      if (position === 0) {
        node.next = current
        this.#head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      this.#length++
      return true
    } else {
      return false
    }
  }
  /**
   * @description 把LinkedList对象转换成一个字符串。
   * @returns
   * @memberof LinkedList
   */
  toString() {
    let current = this.#head,
      string = ''
    while (current) {
      string += current.element + current.next ? 'n' : ''
      current = current.next
    }
    return string
  }

  /**
   * @description 查找linkedList中的项
   * @param element
   * @returns 下标
   * @memberof LinkedList
   */
  indexOf(element) {
    let current = this.#head,
      index = -1
    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  /**
   * @description 移除指定项
   * @param element
   * @returns 返回被移除的项
   * @memberof LinkedList
   */
  remove(element){
    let index = this.indexOf(element)
    return this.removeAt(index);
  }

  /**
   * @description 判断列表中是否没有包含元素
   * @returns
   * @memberof LinkedList
   */
  isEmpty(){
    return this.#length === 0
  }
  /**
   * @description 返回列表长度
   * @returns
   * @memberof LinkedList
   */
  size(){
    return this.#length
  }
  /**
   * @description 
   * @returns
   * @memberof LinkedList
   */
  getHead(){
    return this.head
  }
}

let linkedList = new LinkedList()
```

### 双向链表

双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素

``` js{4}
/**
 * 双向链表
 */

class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  #length = 0
  #head = null
  #tail = null

  /**
   * @description 向双向链表中添加一项
   * @param element
   * @memberof DoublyLinkedList
   */
  append(element) {
    let node = new Node(element),
      current
    if (this.#head === null) {
      // 列表中第一个节点
      this.#head = node
    } else {
      current = this.#head
      while (current.next) {
        // 循环列表，直到找到最后一项
        current = current.next
      }
      // 找到最后一项，将其next赋值为node，建立链接
      current.next = node
    }
    this.#tail = node
    this.#length++ //更新列表的长度
  }
  /**
   * @description 在任意位置插入元素
   * @param position
   * @param element
   * @returns
   * @memberof DoublyLinkedList
   */
  insert(position, element) {
    // 检查越界
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = this.#head,
        previous,
        index = 0

      if (position === 0) {
        // 在第一个位置添加
        if (!this.#head) {
          this.#head = node
          this.#tail = node
        } else {
          node.next = current
          current.prev = node
          this.#head = node
        }
      } else if (position === length) {
        // 最后一项
        current = tail
        current.next = node
        node.prev = current
        tail = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      this.#length++
      return true
    } else {
      return false
    }
  }

  /**
   * @description 删除链表中任意位置的元素
   * @param position
   * @returns
   * @memberof DoublyLinkedList
   */
  removeAt(position) {
    //检查越界
    if (position > -1 && position < this.#length) {
      let current = this.#head,
        previous,
        index = 0
      if (position === 0) {
        this.#head = current.next
        // 如果只有一项，更新tail
        if (this.#length === 1) {
          this.#tail = null
        } else {
          this.#head.prev = null
        }
      } else if (position === this.#length - 1) {
        current = this.#tail
        this.#tail = current.prev
        this.#tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = current.next
        current.next.prev = previous
      }
      this.#length--;
      return current.element
    } else {
      return null;
    }
  }
}

```

## 集合

集合是一组无序且唯一的项组成的。这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

### 创建集合

Set类包含的方法
add(value): 向集合添加一个新的项。
delete(value): 从集合移除一个值。
has(value): 如果值在集合中，返回true，否则返回false。
clear(): 移除集合中的所有项。
size(): 返回集合所包含元素的数量。与数组的length属性类似。
values(): 返回一个包含集中所有值的数组。

``` js{4}
/**
 * 集合
 */

class Sets {
  items: Object
  constructor() {
    this.items = {}
  }

  /**
   * @description 判断集合中是否存在元素
   * @param value
   * @returns
   * @memberof Sets
   */
  has(value: string) {
    return this.items.hasOwnProperty(value)
  }

  /**
   * @description 向集合中添加元素,如果不存在，就把value添加到集合中，返回true，表示添加了这个值。如果集合中已经有这个值，就返回false，标识没有添加它
   * @param value
   * @returns
   * @memberof Sets
   */
  add(value: string) {
    if (!this.has(value)) {
      this.items[value] = value
      return true
    }
    return false
  }

  /**
   * @description 删除一个元素
   * @param value
   * @returns
   * @memberof Sets
   */
  remove(value) {
    if (this.has(value)) {
      delete this.items[value]
      return true
    }
    return false
  }

  /**
   * @description 清空集合
   * @memberof Sets
   */
  clear() {
    this.items = {}
  }

  /**
   * @description 返回集合的长度
   * @returns
   * @memberof Sets
   */
  size() {
    return Object.keys(this.items).length
  }

  /**
   * @description 提取items对象的所有属性，以数组的形式返回:
   * @returns
   * @memberof Sets
   */
  values(){
    let values = []
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        const element = this.items[key];
        values.push(element)
      }
    }
    return values
  }


}

```


### 集合操作

- 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
- 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
- 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
- 子集：验证一个给定集合是否是另一个集合的子集。

#### 并集
``` js{4}
  /**
   * @description 获取两个集合的并集
   * @param otherSet
   * @returns
   * @memberof Sets
   */
  union(otherSet: Sets) {
    let unionSet = new Sets()
    let values = this.values()
    for (let index = 0; index < values.length; index++) {
      unionSet.add(values[index])
    }

    values = otherSet.values()
    for (let index = 0; index < values.length; index++) {
      unionSet.add(values[index])
    }
    return unionSet
  }
```

#### 交集
``` js{4}
 /**
   * @description 获取两个集合的交集
   * @param otherSet
   * @returns
   * @memberof Sets
   */
  intersection(otherSet: Sets) {
    let intersectionSet = new Sets()
    let values = this.values()
    for (let index = 0; index < values.length; index++) {
      if (otherSet.has(values[index])) {
        intersectionSet.add(values[index])
      }
    }
    return intersectionSet
  }
```

#### 差集
``` js{4}
  /**
   * @description 获取两个集合的差集
   * @param otherSet
   * @returns
   * @memberof Sets
   */
  difference(otherSet: Sets) {
    let differenceSet = new Set()
    let values = this.values()
    for (let index = 0; index < values.length; index++) {
      if (!otherSet.has(values[index])) {
        differenceSet.add(values[index])
      }
    }
    return differenceSet
  }
```

#### 子集
``` js{4}
 /**
   * @description 判断一个集合是否是另一个集合的子集
   * @param otherSet
   * @returns
   * @memberof Sets
   */
  subset(otherSet: Sets) {
    if (this.size() > otherSet.size()) {
      return false
    } else {
      let values = this.values()
      for (let index = 0; index < values.length; index++) {
        const element = values[index]
        if (!otherSet.has(element)) {
          return false
        }
      }
      return true
    }
  }
```

## 字典和散列表
 
集合、字典和散列表可以存储不重复的值。在集合中，我们感兴趣的是每个值本身，并把它当作主要元素。在字典中，我们用[键,值]的形式来存储数据。在散列表中也是一样。但是两种数据结构的实现方式略有不同

### 字典
 字典也称作映射

#### 创建字典

字典包含的方法:
- set(key,value):向字典中添加新元素。
- delete(key): 通过使用键值来从字典中移除键值对应的数据值。
- has(key): 如果某个键值存在于这个字典中，则返回true，反之则返回false。
- get(key): 通过键值查找特定的数值并返回。
- clear(): 将这个字典中的所有元素全部删除。
- size(): 返回字典所包含元素的数量。与数组的length属性类似。
- keys(): 将字典所包含的所有键名以数组形式返回。
- values(): 将字典所包含的所有数值以数组形式返回。

``` js{4}
/**
 * 字典
 */

class Dictionary {
  items: {}
  constructor() {
    this.items = {}
  }

  /**
   * @description 如果某个键值存在于这个字典中，则返回true，反之则返回false
   * @param key
   * @returns
   * @memberof Dictionary
   */
  has(key: string) {
    return key in this.items
  }

  /**
   * @description 向字典中添加新元素
   * @param key
   * @param value
   * @memberof Dictionary
   */
  set(key: string, value: any) {
    this.items[key] = value
  }

  /**
   * @description 通过使用键值来从字典中移除键值对应的数据值
   * @param key
   * @returns
   * @memberof Dictionary
   */
  delete(key: string) {
    if (this.has(key)) {
      delete this.items[key]
      return true
    }
    return false
  }

  /**
   * @description 通过键值查找特定的数值并返回
   * @param key
   * @returns
   * @memberof Dictionary
   */
  get(key: string) {
    return this.has(key) ? this.items[key] : undefined
  }

  /**
   * @description 将字典所包含的所有数值以数组形式返回
   * @returns
   * @memberof Dictionary
   */
  values() {
    let values = []
    for (const key in this.items) {
      if (this.has(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }

  /**
   * @description 将这个字典中的所有元素全部删除
   * @memberof Dictionary
   */
  clear() {
    this.items = {}
  }

  /**
   * @description 将字典所包含的所有键名以数组形式返回
   * @returns
   * @memberof Dictionary
   */
  keys() {
    return Object.keys(this.items)
  }

  /**
   * @description 返回字典所包含元素的数量。与数组的length属性类似
   * @returns
   * @memberof Dictionary
   */
  size() {
    return this.keys().length
  }

  getItems() {
    return this.items
  }
}

let dictionary = new Dictionary();
dictionary.set('Gandalf','gandalf@email.com');
dictionary.set('John','johnsnow@email.com');
dictionary.set('Tyrion','tyrion@email.com');
console.log(dictionary.has('Gandalf'));
```

### 散列表
散列算法的作用是尽可能快地在数据结构中找到一个值。在之前的章节中，你已经知道如果要在数据结构中获得一个值，需要遍历整个数据结构来找到它。如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址


#### 创建散列表

散列表中包含的方法
- put(key,value): 向散列表增加一个新的项（也能更新散列表）。
- remove(key): 根据键值从散列表中移除值。
- get(key): 返回根据键值检索到的特定的值。


``` js{4}
/**
 * 散列表
 */

class HashTable {
  table: {}
  constructor() {
    this.table = {}
  }

  /**
   * @description 散列函数,给定一个Key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数字，用到hash值中。
   * @private
   * @param key
   * @returns
   * @memberof HashTable
   */
  private loseloseHashCode(key: string) {
    let hash = 0
    for (let index = 0; index < key.length; index++) {
      hash += key.charCodeAt(index)
    }
    return hash % 37
  }

  /**
   * @description 根据给定的key计算出它在表中的位置，然后将value参数添加到用散列函数计算出的对应的位置上。
   * @param key
   * @param value
   * @memberof HashTable
   */
  put(key: string, value: any) {
    let position = this.loseloseHashCode(key)
    console.log(position + '-' + key)
    this.table[position] = value
  }

  /**
   * @description 从hashTable中移除一个元素
   * @param key
   * @memberof HashTable
   */
  remove(key: string) {
    this.table[this.loseloseHashCode(key)] = undefined
  }

  /**
   * @description 返回根据键值检索到的特定的值
   * @param key
   * @returns
   * @memberof HashTable
   */
  get(key: string) {
    return this.table[this.loseloseHashCode(key)]
  }
}

const hash = new HashTable()
hash.put('Gandalf', 'gandalf@wmail.com')
hash.put('John', 'johnsnow@wmail.com')
hash.put('Tyrion', 'tyrion@wmail.com')

console.log(hash.get('Gandalf'));
console.log(hash.get('Loiane'));

```

#### 散列表和散列集合
散列集合由一个集合构成，但是插入、移除或获取元素时，使用的是散列函数。

#### 处理散列表中的冲突

使用一个数据结构来保存数据的目的显然不是去丢失这些数据，而是通过某种方法将他们全部保存起来。

处理冲突有几种方法：
- 分离链接
- 线性探查
- 双散列法

##### 分离链接
分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。

``` js{4}
/**
 * 分离链接法
 */

import LinkedList from './LinkedList'

class ValuePair {
  key: string
  value: any
  constructor(key: string, value: any) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[${this.key} - ${this.value}]`
  }
}

class HashTable {
  table: {}
  constructor() {
    this.table = {}
  }

  /**
   * @description 散列函数,给定一个Key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数字，用到hash值中。
   * @param key
   * @returns
   * @memberof HashTable
   */
  private loseloseHashCode(key: string) {
    let hash = 0
    for (let index = 0; index < key.length; index++) {
      hash += key.charCodeAt(index)
    }
    return hash % 37
  }

  /**
   * @description 根据给定的key计算出它在表中的位置，然后将value参数添加到用散列函数计算出的对应的位置上。
   * @param key
   * @param value
   * @memberof HashTable
   */
  put(key: string, value: any) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] == undefined) {
      this.table[position] = new LinkedList()
    }
    this.table[position].put(new ValuePair(key, value))
  }

  /**
   * @description 从hashTable中移除一个元素
   * @param key
   * @memberof HashTable
   */
  remove(key: string) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      let current = this.table[position].getHead()
      while (current.next) {
        if (current.element.key === key) {
          this.table[position].remove(current.element)
          if (this.table[position].isEmpty()) {
            this.table[position] = undefined
          }
          return true
        }
        current = current.next
      }
      // 检查是否为第一个或最后一个元素
      if (current.element.key === key) {
        this.table[position].remove(current.element)
        if (this.table[position].isEmpty()) {
          this.table[position] = undefined
        }
        return true
      }
    }
    return false
  }

  /**
   * @description 返回根据键值检索到的特定的值
   * @param key
   * @returns
   * @memberof HashTable
   */
  get(key: string) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      //遍历链表寻找键值
      let current = this.table[position].getHead()
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
      // 检查元素在链表第一个或最后一个节点的情况
      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }
}

```

##### 线性探查

另一个解决冲突的方法是线性探查。当想向表中某个位置加入一个新元素的时候，如果索引为Index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，就尝试index+2的位置，以此类推。

``` js{4}
/**
 * 线性探查
 */

class ValuePair {
  key: string
  value: any
  constructor(key: string, value: any) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[${this.key} - ${this.value}]`
  }
}

class HashTablePro2 {
  table: {}
  constructor() {
    this.table = {}
  }

  /**
   * @description 散列函数,给定一个Key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数字，用到hash值中。
   * @param key
   * @returns
   * @memberof HashTable
   */
  private loseloseHashCode(key: string) {
    let hash = 0
    for (let index = 0; index < key.length; index++) {
      hash += key.charCodeAt(index)
    }
    return hash % 37
  }

  /**
   * @description 根据给定的key计算出它在表中的位置，然后将value参数添加到用散列函数计算出的对应的位置上。
   * @param key
   * @param value
   * @memberof HashTable
   */
  put(key: string, value: any) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] == undefined) {
      this.table[position] = new ValuePair(key, value)
    } else {
      let index = ++position
      while (this.table[index] != undefined) {
        index++
      }
      this.table[index] = new ValuePair(key, value)
    }
  }

  /**
   * @description 从hashTable中移除一个元素
   * @param key
   * @memberof HashTable
   */
  remove(key: string) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        this.table[position] = undefined
      } else {
        let index = ++position
        while (
          this.table[index] === undefined ||
          this.table[index].key !== key
        ) {
          index++
        }
        if (this.table[index].key === key) {
          this.table[index] = undefined
        }
      }
    }
    return false
  }

  /**
   * @description 返回根据键值检索到的特定的值
   * @param key
   * @returns
   * @memberof HashTable
   */
  get(key: string) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        return this.table[position].value
      } else {
        let index = ++position
        while (
          this.table[index] === undefined ||
          this.table[index].key !== key
        ) {
          index++
        }
        if (this.table[index].key === key) {
          return this.table[index].value
        }
      }
    }
    return undefined
  }
}

const hashTablePro2 = new HashTablePro2()

hashTablePro2.put('Gandalf', 'gandalf@email.com')
hashTablePro2.put('John', 'johnsnow@email.com')
hashTablePro2.put('Tyrion', 'tyrion@email.com')
hashTablePro2.put('Aaron', 'aaron@email.com')
hashTablePro2.put('Donnie', 'donnie@email.com')
hashTablePro2.put('Ana', 'ana@email.com')
hashTablePro2.put('Jonathan', 'jonathan@email.com')
hashTablePro2.put('Jamie', 'jamie@email.com')
hashTablePro2.put('Sue', 'sue@email.com')

console.log(hashTablePro2.get('Jamie'))

```

##### 创建更好的散列函数

我们实现的"lose lose" 散列函数并不是一个表现良好的散列函数，因为它会产生太多的冲突。如果我们使用这个函数的话，会产生各种各样的冲突。一个表现良好的散列函数是由几个方面构成：插入和检索元素的时间（即性能），当然也包括较低的冲突可能性。例如:
``` js{4}
const djb2HashCode = function(key){
    let hash = 5381;
    for(let i = 0; i < key.length; i++){
        hash = hash*33 + key.charCodeAt(i)
    }
    return hash % 1013
}
```

## 树

### 树数据结构
树是一种分层数据的抽象模型。现实生活中最常见的树的例子是家谱，或是公司的组织架构图

一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个节点)以及零个或多个子节点：

位于树顶部的节点叫作根节点。它没有父节点。树种的每个元素都叫作节点，节点分为内部节点和外部节点。至少有一个子节点的节点称为内部节点。没有子元素的节点称为外部节点或叶节点。

一个节点可以有祖先和后代。一个节点的祖先包括父节点、祖父节点、曾祖父节点等。一个节点的后代包括子节点、孙子节点、曾孙节点等。例如，节点5的祖先有节点7和节点11，后代有节点3和节点6.

有关树的另一个术语是子树。子树由节点和它的后代构成。

节点的一个属性是深度，节点的深度取决于它的祖先节点的数量。

树的高度取决于所有节点深度的最大值。一棵树也可以被分解成层级。

### 二叉树和二叉搜索树

二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。

二叉搜索树是二叉树的一种，但是它只允许你再左侧节点存储小的值，在右侧节点存储(比父节点)大(或者等于)的值。

和链表一样，将通过指针来表示节点之间的关系。在双向链表中，每个节点包含两个指针，一个指针指向下一个节点，另一个指向上一个节点。因此，将声明一个Node类来表示树种的每个节点。值得注意的一个小细节是，不同于在之前的章节中将节点本身称作节点或项，我们将会称其为键。

树类包含的方法
- insert(key): 向树中插入一个新的键。
- search(key): 在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
- inOrderTraverse: 通过中序遍历方式遍历所有节点。
- preOrderTraverse: 通过先序遍历方式遍历所有节点。
- postOrderTraverse: 通过后序遍历方式遍历所有节点。
- min: 返回树中最小的值/键。
- max: 返回树种最大的值/键。
- remove(key): 从树中移除某个键。

``` js{4}
/**
 * 二叉搜索树
 */

class TreeNode {
  key: any
  left: any
  right: any
  constructor(key: any) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  root: any
  constructor() {
    this.root = null
  }

  private inserNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.inserNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.inserNode(node.right, newNode)
      }
    }
  }

  private inOrderTraverseNode(node: TreeNode, callback?: Function) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback && callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  private preOrderTraverseNode(node: TreeNode, callback?: Function) {
    if (node !== null) {
      callback && callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  private postOrderTraverseNode(node: TreeNode, callback?: Function) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback && callback(node.key)
    }
  }

  private minNode(node: TreeNode) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    } else {
      return null
    }
  }

  private maxNode(node: TreeNode) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    } else {
      return null
    }
  }

  private searchNode(node: TreeNode, key: any) {
    if (node === null) {
      return false
    }
    if (key < node.key) {
      return this.searchNode(node.left, key)
    } else if (key > node.key) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  private removeNode(node: TreeNode, key: any) {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 如果删除的是叶节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      // 第二种情况---一个只有一个子节点的节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      // 第三种情况--- 一个有两个子节点的节点
      let aux = this.findMinNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }

  private findMinNode(node: TreeNode) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }

  /**
   * @description 向树种插入一个新键
   * @param key
   * @memberof BinarySearchTree
   */
  insert(key: any) {
    let newNode = new TreeNode(key)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.inserNode(this.root, newNode)
    }
  }

  /**
   * @description 中序遍历
   * 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。
   * 中序遍历的一种应用就是对树进行排序操作
   * @memberof BinarySearchTree
   */
  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback)
  }

  /**
   * @description 先序遍历，先序遍历是以优先于后代节点的顺序访问每个节点的。
   * 先序遍历的一种应用是打印一个结构化的文档。
   * 先序遍历和中序遍历的不同点是，先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点
   * @param callback
   * @memberof BinarySearchTree
   */
  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback)
  }

  /**
   * @description 后序遍历，后续遍历则是先访问节点的后代节点，再访问节点本身
   * 后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
   * @param callback
   * @memberof BinarySearchTree
   */
  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback)
  }

  /**
   * @description 查找树的最小键
   * @memberof BinarySearchTree
   */
  min() {
    return this.minNode(this.root)
  }

  /**
   * @description 查找树的最大键
   * @returns
   * @memberof BinarySearchTree
   */
  max() {
    return this.maxNode(this.root)
  }

  /**
   * @description 搜索一个特定的值
   * @param key
   * @returns
   * @memberof BinarySearchTree
   */
  search(key: any) {
    return this.searchNode(this.root, key)
  }

  /**
   * @description 移除一个特定节点
   * @param key
   * @memberof BinarySearchTree
   */
  remove(key: any) {
    this.root = this.removeNode(this.root, key)
  }
}
function printNode(value: any) {
  console.log(value)
}

let tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)

tree.insert(6)
console.log('========中序========')
tree.inOrderTraverse(printNode)
console.log('========先序========')
tree.preOrderTraverse(printNode)
console.log('========最小========')
console.log(tree.min())
console.log('========最大========')
console.log(tree.max())
// console.log(JSON.stringify(tree.root))

```

### 自平衡树

BST存在一个问题：取决于你添加的节点数，树的一条边可能会非常深；也就是说，树的一条分支会有很多层，而其他的分支缺只有几层

AVL树：意思是任何一个节点左右两侧字数的高度只差最多为1.也就是说这种树会在添加或移除节点时尽量试着成为一颗安全树。


#### 在AVL树中插入节点
在AVL树中插入或移除节点和BST完全相同。然而，AVL树的不同之处在于我们需要检验它的平衡因子，如果有需要，则将其逻辑应用于树的自平衡。

##### 计算平衡因子

在AVL树种，需要对每个节点计算右子树高度（hr）和左子树高度(hl)的差值，该值（hr-hl）应为0、1或-1。如果结果不是这三个值之一，则需要平衡该AVL树。这就是平衡因子的概念。



##### AVL旋转

向AVL树插入节点时，可以执行单旋转或双旋转两种平衡操作，分别对应四种场景。

- 右右（RR）：向左的单旋转
- 左左（LL）：向右的单旋转
- 左右（LR）：向右的双旋转
- 右左（RL）：向左的双旋转

``` js{4}
/**
 * 自平衡树
 */
import { TreeNode } from './BinarySearchTree'

class AdelsonVelskiiLandi {
  root: any
  constructor() {
    this.root = null
  }

  /**
   * @description 计算节点高度
   * @private
   * @param node
   * @returns
   * @memberof AdelsonVelskiiLandi
   */
  private heightNode(node: TreeNode): number {
    if (node === null) {
      return -1
    } else {
      return Math.max(this.heightNode(node.left), this.heightNode(node.right)) + 1
    }
  }

  /**
   * @description 向左的单旋转
   * @private
   * @param node
   * @returns
   * @memberof AdelsonVelskiiLandi
   */
  private rotationRR(node:TreeNode){
    let temp = node.right
    node.right = temp.left
    temp.left = node;
    return temp
  }  
  /**
   * @description 向右的单旋转
   * @private
   * @param node
   * @returns
   * @memberof AdelsonVelskiiLandi
   */
  private rotationLL(node:TreeNode){
    let temp = node.left
    node.left = temp.left
    temp.right = node;
    return temp
  }
  /**
   * @description 向右双旋转，先做一次RR旋转，再做一次LL旋转
   * @private
   * @param node
   * @returns
   * @memberof AdelsonVelskiiLandi
   */
  private rotationLR(node:TreeNode){
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  /**
   * @description 向左的双旋转，先做一次LL旋转，再做一次RR旋转
   * @private
   * @param node
   * @returns
   * @memberof AdelsonVelskiiLandi
   */
  private rotationRL(node:TreeNode){
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  private inserNode(node: TreeNode, newNode: TreeNode) {
    if (node === null) {
      node = newNode
    } else if (newNode.key < node.key) {
      this.inserNode(node.left, newNode)
      if (node.left !== null) {
        //检查平衡
        // 向左子树插入新节点，且节点的值小于其左子节点时，应进行LL旋转。否则，进行LR旋转
        if(this.heightNode(node.left) - this.heightNode(node.right) > 1){
          if(newNode < node.left.key){
            node = this.rotationLL(node)
          }else{
            node = this.rotationLR(node)
          }
        }
        // 向右子树插入新节点，且节点的值大于其右子节点时，应进行RR旋转。否则，进行RL旋转。
        if(this.heightNode(node.right) - this.heightNode(node.left) > 1){
          if(newNode > node.right.key){
            node = this.rotationRR(node)
          }else{
            node = this.rotationRL(node)
          }
        }
      }
    } else {
      this.inserNode(node.right, newNode)
      if (node.right !== null) {
        //检查平衡
      }
    }
  }

  private inOrderTraverseNode(node: TreeNode, callback?: Function) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback && callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  private preOrderTraverseNode(node: TreeNode, callback?: Function) {
    if (node !== null) {
      callback && callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  private postOrderTraverseNode(node: TreeNode, callback?: Function) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback && callback(node.key)
    }
  }

  private minNode(node: TreeNode) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    } else {
      return null
    }
  }

  private maxNode(node: TreeNode) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    } else {
      return null
    }
  }

  private searchNode(node: TreeNode, key: any) {
    if (node === null) {
      return false
    }
    if (key < node.key) {
      return this.searchNode(node.left, key)
    } else if (key > node.key) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  private removeNode(node: TreeNode, key: any) {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 如果删除的是叶节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      // 第二种情况---一个只有一个子节点的节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      // 第三种情况--- 一个有两个子节点的节点
      let aux = this.findMinNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }

  private findMinNode(node: TreeNode) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }

  /**
   * @description 向树种插入一个新键
   * @param key
   * @memberof BinarySearchTree
   */
  insert(key: any) {
    let newNode = new TreeNode(key)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.inserNode(this.root, newNode)
    }
  }

  /**
   * @description 中序遍历
   * 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。
   * 中序遍历的一种应用就是对树进行排序操作
   * @memberof BinarySearchTree
   */
  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback)
  }

  /**
   * @description 先序遍历，先序遍历是以优先于后代节点的顺序访问每个节点的。
   * 先序遍历的一种应用是打印一个结构化的文档。
   * 先序遍历和中序遍历的不同点是，先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点
   * @param callback
   * @memberof BinarySearchTree
   */
  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback)
  }

  /**
   * @description 后序遍历，后续遍历则是先访问节点的后代节点，再访问节点本身
   * 后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
   * @param callback
   * @memberof BinarySearchTree
   */
  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback)
  }

  /**
   * @description 查找树的最小键
   * @memberof BinarySearchTree
   */
  min() {
    return this.minNode(this.root)
  }

  /**
   * @description 查找树的最大键
   * @returns
   * @memberof BinarySearchTree
   */
  max() {
    return this.maxNode(this.root)
  }

  /**
   * @description 搜索一个特定的值
   * @param key
   * @returns
   * @memberof BinarySearchTree
   */
  search(key: any) {
    return this.searchNode(this.root, key)
  }

  /**
   * @description 移除一个特定节点
   * @param key
   * @memberof BinarySearchTree
   */
  remove(key: any) {
    this.root = this.removeNode(this.root, key)
  }
}
function printNode(value: any) {
  console.log(value)
}


```


## 图

图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。学习图是重要的，因为任何二元关系都可以用图来表示。

一个图G=(V,E)由以下元素组成。
V:一组顶点
E:一组边，连接V中的顶点

由一条边连接在一起的顶点称为**相邻顶点**。

一个顶点的**度**是其相邻顶点的数量

**路径**是顶点v1,v2,...vk的一个连续序列,其中vi,vi+1是相邻

**简单路径**要求不包含重复的顶点。
**环**也是一个简单路径，如果图中不存在环，则称图是**无环**的，如果图中每两个顶点间都存在路径，则该图是连通的。

### 有向图和无向图
图可以是无向的或是有向的，有向图的边有一个方向

如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。

图还可以是**未加权的**或是**加权的**,加权图的边被赋予了权值


### 图的表示

从数据结构的角度来说，我们有多种方式来表示图。在所有的表示法中，不存在绝对正确的方式。图的正确表示法取决于待解决的问题和图的类型。

#### 邻接矩阵

图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为一个数组的索引。我们用一个二维数组来表示索引之间的连接。如果索引为i的节点和索引为j的节点相邻，则array[i][j]===1，否则array[i][j]===0;

不是强连通的图如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着我们浪费了计算机存储空间来表示根本不存在的边。例如，找给定顶点的相邻顶点，我们也不得不迭代一整行。邻接矩阵表示法不够好的另一理由是，图中顶点的数量可能会改变，而二维数组不太灵活。

#### 邻接表
邻接表由图中每个顶点的相邻顶点列表所组成。存在好几种方式来表示这种数据结构。

？？？**例如，要找出顶点v和w是否相邻，使用邻接矩阵会比较快**
#### 关联矩阵
在关联矩阵中，矩阵的行表示顶点，列表示边

关联矩阵通常用于边的数量比顶点多的情况下，以节省空间和内存
``` js{4}
/**
 * 图
 */

import Dictionnary from './Dictionary'

class Graph {
  private vertices: any[] = [] // 我们使用一个数组来存储图中所有顶点的名字，以及一个字典来存储邻接表
  private adjList: Dictionnary = new Dictionnary() // 以及一个字典来存储邻接表,字典将会使用顶点的名字作为键，邻接顶点列表作为值
  /**
   * @description 向图中添加顶点
   * @param v
   * @memberof Graph
   */
  addVertex(v: any) {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }
  /**
   * @description 这个方法接受两个顶点作为参数。首先，通过将W加入到V的邻接表中，我们添加了一条自顶点V到顶点W的边
   * @param v
   * @param w
   * @memberof Graph
   */
  addEdge(v: any, w: any) {
    this.adjList.get(v).push(w) // 添加一条自顶点V到顶点W的边
    this.adjList.get(w).push(v) // 添加一条自顶点W到顶点V的边
  }

  /**
   * @description 输出图的顶点和其相邻顶点列表
   * @returns
   * @memberof Graph
   */
  toString() {
    let s = ''
    for (let index = 0; index < this.vertices.length; index++) {
      const element = this.vertices[index]
      s += element + ' -> '
      let neighbors = this.adjList.get(element)

      for (let index = 0; index < neighbors.length; index++) {
        const element = neighbors[index]
        s += element + ' '
      }
      s += '\n'
    }
    return s
  }
}

let graph = new Graph()
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')
console.log(graph.toString());

```

#### 图的遍历

和树数据结构类似，我们可以访问图的所有节点。有两种算法可以对图进行遍历：**广度优先搜素**和**深度优先搜索**。图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。

图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于两种图遍历算法，都需要明确指出第一个被访问的顶点。

完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。

为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。

广度优先搜索算法和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点列表的数据结构。

算法 | 数据结构 | 描述
---|---|---
深度优先算法 | 栈 | 通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问。
广度优先算法 | 队列 | 通过将顶点存入队列中，最先入队列的顶点先被探索

当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
- **白色**：表示该顶点还没有被访问。
- **灰色**：表示该顶点被访问过，但并未被搜索过
- **黑色**： 表示该顶点被访问且被完全搜索过

##### 广度优先搜索

广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。

以下是从顶点V开始的广度优先搜索算法所遵循的步骤。
1. 创建一个队列Q。
2. 将V标注为被发现的，并将V入队列Q。
3. 如果Q非空，则运行一下步骤：
   1. 将u从Q中出队列；
   2. 将标注u为被发现的；
   3. 将u所有未被访问过的邻点入队列；
   4. 将u标注为已被探索的。

广度优先搜索和深度优先搜索都需要标注被访问过的顶点。为此，我们将使用一个辅助数组color。由于当算法开始执行时，所有的顶点颜色都是白色，所以我们可以创建一个辅助函数initializeColor,为这两个算法执行初始化操作。

让我们深入学医广度优先搜索方法的实现。我们要做的第一件事情是用initializeColor函数来将color数组初始化为white。我们还需要声明和创建一个Queue实例。它将会存储待访问和待探索的顶点。

bfs方法接受一个顶点作为算法的起始点。起始顶点是必要的，我们将此顶点入队列。

如果队列非空，我们将通过出队列操作从队列中移除一个顶点，并取得一个包含所有邻点的邻接表。该顶点将被标注为grey，表示我们发现了它。

对于u的每个邻点，我们取得其值，如果它还未被访问过（white），则将其标注为我们已经发现了它（grey），并将这个顶点加入队列中，这样当其从队列中出列的时候，我们可以完成对其的探索。

当完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过（black）


###### 使用bfs寻找最短路径

我们可以用BFS算法做更多的事情，而不只是输出被访问顶点的顺序。例如，考虑如何来解决下面这个问题。

给定一个图G和源顶点V，找出对每个顶点U，u和v之间最短路径的距离（以边的数量计）。

对于给定顶点v，广度优先算法会访问所有与其距离为1的顶点，接着是距离为2的顶点，以此类推。所以，可以用广度优先算法来解决这个问题。我们可以修改bfs方法以返回给我们一些信息：

- 从V到U的距离d[u]；
- 前溯点pred[u],用来推到出从v到其他每个顶点u的最短路径。


我们还需要声明数组d来表示距离，以及pred数组来表示前溯点。下一步则是对图中的每一个顶点，用0来初始化数组d，用null来初始化数组pred。

``` js{4}
let fromVertex = myVertices[0]
for (let index = 1; index < myVertices.length; index++) {
  const element = myVertices[index]
  let toVertex = element,
    path = new Stack()
  for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }
  path.push(fromVertex);
  let s = path.pop();
  while(!path.isEmpty()){
    s += ' - ' + path.pop();
  }
  console.log(s);
}
```
我们用顶点A座为源顶点。对于每个其他顶点，我们会计算顶点A到它的路径。我们从顶点数组得到toVertex，然后会创建一个栈来存储路径值。

接着，我们追溯toVertex到fromVertex的路径。变量v被复制为其前溯点的值。这样我们能够反向追溯这条路径。将变量v添加到栈中。最后，源顶点也会被添加到栈中，以得到完整路径。

这之后，我们创建了一个s字符串，并将源顶点赋值给它（它是最后一个加入栈中的，所以它是第一个被弹出的项）。当栈是非空的，我们就从栈中移除一个项并将其拼接到字符串s的后面。最后在控制台上输出路径。

##### 深度优先搜索

深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索吓一跳路径。

深度优先搜索算法不需要一个源顶点。在深度优先搜索算法中，若图中顶点V未访问，则访问该顶点V。

要访问顶点v，照如下步骤：
1. 标注v为被发现的（灰色）。
2. 对于v的所有未访问的邻点w，标注v为已被探索的（黑色）。

如你所见，深度优先搜索的步骤是递归的，这意味着深度优先搜素算法使用栈来存储函数调用（由递归调用所创建的栈）。

``` js{4}
dfs(callback: Function) {
    let color = this.initializeColor()
    for (let index = 0; index < this.vertices.length; index++) {
      if (color[this.vertices[index]] === 'white') {
        this.dfsVisit(this.vertices[index], color, callback)
      }
    }
  }
dfsVisit(u: any, color: any[], callback?: Function) {
    color[u] = 'grey'
    if (callback) {
      callback(u)
    }

    let neighbors = this.adjList.get(u)
    for (let index = 0; index < neighbors.length; index++) {
      const w = neighbors[index]
      if (color[w] === 'white') {
        this.dfsVisit(w, color, callback)
      }
    }
    color[u] = 'black'
  }
```

1. 探索深度优先算法

对于给定的图G，我们希望深度优先搜索算法遍历图G的所有节点，构建“森林”（有根树的一个集合）以及一组源顶点（根），并输出两个数组：发现时间和完成探索时间。我们可以修改dfs方法来返回给我们一些信息：
- 顶点u的发现时间d[u];
- 当顶点u被标注为黑色时，u的完成探索时间f[u]
- 顶点u的前溯点p[u]。

