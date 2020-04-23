

最近正在看慕课网的[《Javascript实现二叉树算法》](https://www.imooc.com/learn/888)课程，现在把学习的东西记录下来。

![](https://pic.downk.cc/item/5ea10ab6c2a9a83be58997e0.png)

什么是二叉树？简单来说，二叉树是一种具有层级特性的数据结构，一棵树包含多个节点。节点自身含有一个属性，就是他所代表的数值。
排序二叉树具有以下特征：
1. 如果他的左子树上不为空，则他的左子树上所有节点的值都小于根节点上的值；
2. 如果他的右子树上不为空，则他的右子树上所有节点的值都小于根节点上的值；
3. 他的左、右子树也是二叉排序树；
4. 没有完全相等的两个节点；

![](https://pic.downk.cc/item/5ea10c83c2a9a83be58b4315.jpg)
### 二叉排序树

**代码实现**
```javaScript
function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            }
        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
```

### 二叉树的中序遍历
> 从根节点开始，如果存在左子树就开始遍历左子树，然后再遍历右子树，最后输出根节点的值。遍历左、右子树时也是先遍历左子树，然后遍历右子树，最少输出改接点，如此循环。

+  输入顺序： 左节点---> 当前节点 ---> 右节点

**代码实现**

```javaScript
   function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };

            var inOrderTraverseNode = function (node, callback) {
                //node :二叉树的节点对象  callback：回调对象
                if (node !== null) { //如果当前节点的值为非空的话，
                    inOrderTraverseNode(node.left, callback); //就去访问左孩子
                    callback(node.key); //再访问当前节点，并将当前节点的key值回调出去
                    inOrderTraverseNode(node.right, callback); //最后访问节点的右孩子

                }

            }
            //中序遍历（升序）
            this.inOrderTraverse = function (callback) {
                //callback当输入某个节点的值传入到回调函数中
                inOrderTraverseNode(root, callback)
            }
        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        var callback = function (key) {
            console.log('中序遍历接口', key)
        }
        binaryTree.inOrderTraverse(callback);
```

**打印出来的结果**

![](https://pic.downk.cc/item/5ea10daac2a9a83be58c4981.png)

### 二叉树的前序遍历
> 从根节点开始，先输出当前节点，如果存在左子树就开始遍历左子树，然后再遍历右子树。遍历左、右子树的规则同上。

+  输入顺序：  当前节点 ---> 左节点--->右节点

**代码实现**

```javaScript
function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };

            var preOrderTraverseNode = function (node, callback) {
                //node :二叉树的节点对象  callback：回调对象
                if (node !== null) { //如果当前节点的值为非空的话，
                    //步骤： 当前节点 --> 左节点 --> 右节点
                    callback(node.key); //访问当前节点，并将当前节点的key值回调出去
                    preOrderTraverseNode(node.left, callback); //然后访问节点的左孩子
                    preOrderTraverseNode(node.right, callback); //最后访问节点的右孩子

                }
            }

            //前序遍历（遍历二叉树效率最高）
            this.preOrderTraverse = function (callback) {
                //实现算法步骤：先访问二叉树的根节点，callback处理节点的数值
                preOrderTraverseNode(root, callback)
            }
        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        var callback = function (key) {
            console.log('前序遍历接口', key)
        }
     
        binaryTree.preOrderTraverse(callback);
```

**打印出来的结果**
![](https://pic.downk.cc/item/5ea10e90c2a9a83be58d16bf.png)

### 二叉树的后序遍历

+  输入顺序： 左节点--->右节点 当前节点 ---> 
+  应用场景：运用于文件系统和操作系统的遍历

**代码实现：**
```javaScript
 function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };




            var nextOrderTraverseNode = function (node, callback) {
                //node :二叉树的节点对象  callback：回调对象
                if (node !== null) { //如果当前节点的值为非空的话，
                    //步骤： 左节点 --> 右节点 --> 当前节点
                    preOrderTraverseNode(node.left, callback); //访问节点的左孩子
                    preOrderTraverseNode(node.right, callback); //然后访问节点的右孩子
                    callback(node.key); //最后当前节点，并将当前节点的key值回调出去

                }
            }

            //后序遍历（主要应用于：文件系统和操作系统）
            this.nextOrderTraverse = function (callback) {
                nextOrderTraverseNode(root, callback)
            }
        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        var callback = function (key) {
            console.log('后续遍历接口', key)
        }
 
        binaryTree.nextOrderTraverse(callback); //后序遍历
```
**打印出来的结果**
![](https://pic.downk.cc/item/5ea1327bc2a9a83be5af7019.png)


### 查找最小值

```javaScript
  function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };


            //查找最小二叉树的值
            var minNode = function (node) {
                if (node) {
                    while (node && node.left !== null) {

                        node = node.left
                    }
                    return node.key //返回最小值
                }
                return null
            }

            this.min = function () {
                return minNode(root)
            }

        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        
        console.log('查找最小的二叉树', binaryTree.min())
```
**打印出来的结果**
![](https://pic.downk.cc/item/5ea13503c2a9a83be5b21584.png)

### 查找最大值

```javaScript
 function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };


            //查找最大二叉树的值
            var maxNode = function (node) {
                if (node) {
                    while (node && node.right !== null) {

                        node = node.right
                    }
                    return node.key //返回最大值
                }
                return null
            }

            this.max = function () {
                return maxNode(root)
            }

        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        console.log('查找最大的二叉树', binaryTree.max())
```

**打印出来的结果**
![](https://pic.downk.cc/item/5ea135bbc2a9a83be5b2ed2a.png)

### 查找任意某个值
```javaScript
 function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };


            //查找二叉树中任意的值是否存在
            var seacrhNode = function (newNode, node) {
                if (node === null) { //先判断当前节点是否存在
                    return false
                }

                if (newNode === node.key) {
                    return newNode //当前节点的值与查询的值相等的话就返回出去
                } else if (newNode < node.key) {
                    return seacrhNode(newNode, node.left)
                } else if (newNode > node.key) {
                    return seacrhNode(newNode, node.right)
                } else {
                    return true
                }
            }
            this.search = function (newNode) {
                // newNode  ：要查询的值
                //root ：根节点
                return seacrhNode(newNode, root)
            }

        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        const value = 7 //输入要查找的任意某个值
        console.log('查找二叉树中任意指定值', binaryTree.search(value) ? 'key ' + value + ' is found' : " key " + value +
            " is noFound")
```

**打印出来的结果**

![](https://pic.downk.cc/item/5ea13637c2a9a83be5b38ac0.png)

### 删除叶子节点
```javaScript
 function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };

            //删除叶子节点
            var removeNode = function (node, key) {
                if (node === null) {
                    return false
                }

                if (key < node.key) {
                    node.left = removeNode(node.left, key)
                    return node
                } else if (key > node.key) {
                    node.right = removeNode(node.right, key)
                    return node
                } else {
                    if (node.left === null && node.right === null) { //叶子节点的话直接删除
                        node = null
                        return node
                    }
                }
            }

            //删除二叉树中的叶子节
            this.remove = function (key) {
                removeNode(root, key)
            }
        }

        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        binaryTree.remove(1); //删除叶子节点
```


### 删除中间节点
```javaScript
 function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };


            //删除叶子节点
            var removeNode = function (node, key) {
                if (node === null) {
                    return false
                }

                if (key < node.key) {
                    node.left = removeNode(node.left, key)
                    return node
                } else if (key > node.key) {
                    node.right = removeNode(node.right, key)
                    return node
                } else {
                    /**删除叶子节点**/
                    if (node.left === null && node.right === null) { //叶子节点的话直接删除
                        node = null
                        return node
                    }
                    /**删除中间节点（左节点为空）**/
                    if (node.left === null) { //如果左孩子为空，当前节点只有右孩子，当前节点变为右孩子值
                        node = node.right
                        return node;
                    }
                    /**删除中间节点（右节点为空）**/
                    if (node.right === null) { //如果右孩子为空，当前节点只有左孩子，当前节点变为左孩子值
                        node = node.left
                        return node;
                    }

                    /**删除中间节点（左右节点都存在值）**/

                    var aux = findMinNode(node.rigth); //找到当前节点的右节点的最小节点值
                    node.key = aux.key; // 当前的节点变成为（要删除节点的右节点的最小节点值）
                    node.right = removeNode(node.right, aux.key); //删除（删除节点的右节点的最小节点值）
                }
            }



            //删除二叉树中的叶子节
            this.remove = function (key) {
                removeNode(root, key)
            }

        }
        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        var callback = function (key) {
            console.log('中序遍历接口', key)
        }
        binaryTree.remove(3); //删除中间节点
```



### 总结
```javaScript
function BinaryTree() {
            var Node = function (key) {
                this.key = key; //key表示的是节点node的值
                this.left = null; //节点的左箭头
                this.right = null; //节点的右箭头
            };
            var root = null; //初始化根节点为null
            /**
             * node：老节点
             * newNode：新节点
             **/
            var insertNode = function (node, newNode) {
                if (newNode.key < node.key) { //如果新节点的值小于老节点的值,那么新节点为老节点的左边，否则在右边
                    if (node.left === null) { //如果老节点没有左孩子的话，新节点为老节点的左孩子
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode) //将该节点的左孩子 和新节点对比 进行递归
                    }

                } else {
                    if (node.right === null) { //如果老节点的右孩子为空，则插入新节点，否则不为空的话就继续递归
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode)
                    }
                }
            }

            this.insert = function (key) {
                var newNode = new Node(key); //创建节点对象
                if (root === null) { //如果值为空则给它作为根节点
                    root = newNode;
                } else {
                    insertNode(root, newNode); //否则根据节点的特性进行插入
                }
            };

            var inOrderTraverseNode = function (node, callback) {
                //node :二叉树的节点对象  callback：回调对象
                if (node !== null) { //如果当前节点的值为非空的话，
                    //步骤：左节点-->  当前节点  --> 右节点
                    inOrderTraverseNode(node.left, callback); //就去访问左孩子
                    callback(node.key); //再访问当前节点，并将当前节点的key值回调出去
                    inOrderTraverseNode(node.right, callback); //最后访问节点的右孩子

                }

            }
            var preOrderTraverseNode = function (node, callback) {
                //node :二叉树的节点对象  callback：回调对象
                if (node !== null) { //如果当前节点的值为非空的话，
                    //步骤： 当前节点 --> 左节点 --> 右节点
                    callback(node.key); //访问当前节点，并将当前节点的key值回调出去
                    preOrderTraverseNode(node.left, callback); //然后访问节点的左孩子
                    preOrderTraverseNode(node.right, callback); //最后访问节点的右孩子

                }
            }


            var nextOrderTraverseNode = function (node, callback) {
                //node :二叉树的节点对象  callback：回调对象
                if (node !== null) { //如果当前节点的值为非空的话，
                    //步骤： 左节点 --> 右节点 --> 当前节点
                    preOrderTraverseNode(node.left, callback); //访问节点的左孩子
                    preOrderTraverseNode(node.right, callback); //然后访问节点的右孩子
                    callback(node.key); //最后当前节点，并将当前节点的key值回调出去

                }
            }
            //中序遍历（升序）
            this.inOrderTraverse = function (callback) {
                //callback当输入某个节点的值传入到回调函数中
                inOrderTraverseNode(root, callback)
            }


            //前序遍历（遍历二叉树效率最高）
            this.preOrderTraverse = function (callback) {
                //实现算法步骤：先访问二叉树的根节点，callback处理节点的数值
                preOrderTraverseNode(root, callback)
            }
            //后序遍历（主要应用于：文件系统和操作系统）
            this.nextOrderTraverse = function (callback) {
                nextOrderTraverseNode(root, callback)
            }
            //查找最小二叉树的值
            var minNode = function (node) {
                if (node) {
                    while (node && node.left !== null) {

                        node = node.left
                    }
                    return node.key //返回最小值
                }
                return null
            }

            this.min = function () {
                return minNode(root)
            }

            //查找最大二叉树的值
            var maxNode = function (node) {
                if (node) {
                    while (node && node.right !== null) {

                        node = node.right
                    }
                    return node.key //返回最大值
                }
                return null
            }

            this.max = function () {
                return maxNode(root)
            }

            //查找二叉树中任意的值是否存在
            var seacrhNode = function (newNode, node) {
                if (node === null) { //先判断当前节点是否存在
                    return false
                }

                if (newNode === node.key) {
                    return newNode //当前节点的值与查询的值相等的话就返回出去
                } else if (newNode < node.key) {
                    return seacrhNode(newNode, node.left)
                } else if (newNode > node.key) {
                    return seacrhNode(newNode, node.right)
                } else {
                    return true
                }
            }
            //查找某个节点的最小节点值
            var findMinNode = function (node) {
                if (node) {
                    while (node && node.left !== null) {
                        node = node.left
                    }
                    return node
                }
            }
            //删除叶子节点
            var removeNode = function (node, key) {
                if (node === null) {
                    return false
                }

                if (key < node.key) {
                    node.left = removeNode(node.left, key)
                    return node
                } else if (key > node.key) {
                    node.right = removeNode(node.right, key)
                    return node
                } else {
                    /**删除叶子节点**/
                    if (node.left === null && node.right === null) { //叶子节点的话直接删除
                        node = null
                        return node
                    }
                    /**删除中间节点（左节点为空）**/
                    if (node.left === null) { //如果左孩子为空，当前节点只有右孩子，当前节点变为右孩子值
                        node = node.right
                        return node;
                    }
                    /**删除中间节点（右节点为空）**/
                    if (node.right === null) { //如果右孩子为空，当前节点只有左孩子，当前节点变为左孩子值
                        node = node.left
                        return node;
                    }

                    /**删除中间节点（左右节点都存在值）**/

                    var aux = findMinNode(node.rigth); //找到当前节点的右节点的最小节点值
                    node.key = aux.key; // 当前的节点变成为（要删除节点的右节点的最小节点值）
                    node.right = removeNode(node.right, aux.key); //删除（删除节点的右节点的最小节点值）
                }
            }


            //查找二叉树中任意值
            this.search = function (newNode) {
                // newNode  ：要查询的值
                //root ：根节点
                return seacrhNode(newNode, root)
            }
            //删除二叉树中的叶子节
            this.remove = function (key) {
                removeNode(root, key)
            }

        }


        var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]; //创建一个包含节点的数组
        var binaryTree = new BinaryTree(); //创建一个二叉树对象
        nodes.forEach(function (key) {
            binaryTree.insert(key)
        })
        var callback = function (key) {
            console.log('中序遍历接口', key)
        }

        // console.log('查找最小的二叉树', binaryTree.min())
        // console.log('查找最大的二叉树', binaryTree.max())
        // const value = 7
        // console.log('查找二叉树中任意指定值', binaryTree.search(value) ? 'key ' + value + ' is found' : " key " + value +
        //     " is noFound")


        // binaryTree.inOrderTraverse(callback);//中序遍历
        // binaryTree.preOrderTraverseNode(callback);//前序遍历
        // binaryTree.nextOrderTraverseNode(callback); //后序遍历
        // binaryTree.remove(1); //
        binaryTree.remove(3); //删除中间节点
```

### 友情链接分享

[什么是红黑树](https://baijiahao.baidu.com/s?id=1641940303518144126&wfr=spider&for=pc)

红黑树就是一种平衡的二叉查找树，说他平衡的意思是他不会变成“瘸子”，左腿特别长或者右腿特别长。除了符合二叉查找树的特性之外，还具体下列的特性：

1. 节点是红色或者黑色

2. 根节点是黑色

3. 每个叶子的节点都是黑色的空节点（NULL）

4. 每个红色节点的两个子节点都是黑色的。

5. 从任意节点到其每个叶子的所有路径都包含相同的黑色节点。

![](https://pic.downk.cc/item/5ea13c1fc2a9a83be5b85d7f.jpg)