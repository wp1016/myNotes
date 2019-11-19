# js事件循环机制
## JS单线程、异步、同步概念
众说周知，JS是单线程（如果一个线程删DOM，一个线程增加DOM，浏览器傻逼了~所以只能单着了），虽然有webworker酱紫的多线程出现，但也是在主线程的控制下。webworker仅仅能进行计算任务，不能操作DOM，所以本质上还是单线程。

单线程即任务是串行的，后一个任务需要等待前一个任务的执行。这就可能出现长时间的等待。但由于类似ajax网络请求、setTimeout时间延迟、DOM时间的用户交互等，这些任务并不消耗CPU，是一种空等，资源浪费，因此出现了异步。通过将任务交给相应的异步模块去处理，主线程的效率大大提升，可以并行的去处理其他操作。当异步处理完成，主线程空闲时，主线程读取相应的callback，进行后续的操作，最大程度的利用CPU。此时出现了同步执行和异步执行的概念，同步执行是主线程按照顺序，串行执行任务；异步执行是cpu跳过等待，先处理后续的任务（CPU与网络模块、timer等并行进行任务）。由此产生了任务队列与事件循环，来协调主线程与异步模块之间的工作。

## 事件循环机制

![image](https://images2015.cnblogs.com/blog/1094893/201704/1094893-20170419140631852-1337804828.png)

上图流程如下：
1. 主线程读取JS代码，此时为同步环境，形成相应的堆和执行栈；
2. 主线程遇到异步任务，指给对应的异步进程进行处理（WEB API）；
3. 异步进程处理完毕（Ajax返回、DOM事件处罚、Timer到等），将相应的异步任务推入任务队列；
4. 主线程执行完毕，查询任务队列，如果存在任务，则取出一个任务推入主线程（先进先出）；
5. 重复执行2、3、4；称为事件循环
执行的大意：

 同步环境执行-->事件循环1-->事件循环2。。。

其中的异步进程有：
1. 类似onclick等，由浏览器内核的DOM binding模块处理，事件触发时，回调函数添加到任务队列中；
2. setTimeout等，由浏览器内核的Timer模块处理，时间到达时，回调函数添加到任务队列中；
3. Ajax,由浏览器内核的Network模块处理，网络请求返回后，添加到任务队列中。

## 任务队列
如上示意图，任务队列存在多个，同一个任务队列内，按队列顺序被主线程取走；不同任务队列之间，存在着优先级，优先级高的优先获取（如用户I/O）；
### 任务队列的类型
- 任务队列存在两种类型，一种为microtask queue,另一种为macrotask queue.
- 图中所列出的任务队列均为macrotask queue，而es6的promise产生的队列为microtask queue。
### 更完整的时间循环流程
将microtask加入到JS运行机制流程上，则：

1.、2.、3.步同上
4. 主线程查询任务队列，执行microtask queue，将其按顺序执行，全部执行完毕；
5. 主线程查询任务队列，执行macrotask queue，取队首任务执行，执行完毕；
6. 重复4、5.

microtask queue 中的所有callback处在同一个时间循环中，而macrotask queue中的callback有自己的事件循环。

简而言之：同步环境执行->事件循环1（microtask queue的ALL）->事件循环2（macrotask queue中的一个）->事件循环1（microtask queue的ALL）->事件循环2（macrotask queue中的一个）...

利用microtask queue可以形成一个同步执行的环境，但如果microtask queue太长，将导致macrotask任务长时间执行不了，最终导致用户I/O无响应等，所以使用需谨慎。
## 示例、验证
```  js{4}
console.log('1, time = ' + new Date().toString())
setTimeout(macroCallback, 0);
new Promise(function(resolve, reject) {
    console.log('2, time = ' + new Date().toString())
    resolve();
    console.log('3, time = ' + new Date().toString())
}).then(microCallback);

function macroCallback() {
    console.log('4, time = ' + new Date().toString())
} 

function microCallback() {
    console.log('5, time = ' + new Date().toString())
}     
```
结合第二节与第三节的分析，此处的执行流程应为：
- 同步环境：1->2->3
- 事件循环1（microCallback）：5
- 事件循环2（macroCallback）：4

运行结果如下：
![image](https://images2015.cnblogs.com/blog/1094893/201704/1094893-20170419143740774-1438960433.png)

运行结果与预期一样，验证了在不同类型的任务队列中，microtask queue中的callback将优先执行。