####一、git是何方神圣？

Git是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。

![img](/Users/easemob/armory/git/images/132242_ycDU_3172761.png)

1、克隆 Git 资源作为工作目录。

2、在自己的机器上根据不同的开发目的，在资源上添加或修改文件。

3、如果其他人修改了，你可以更新资源。

4、在提交前查看修改。

5、提交修改。

6、在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

*版本库*

​        这个就是类似于一个简单的数据库，我们本地仓库创建的.git文件夹就包含了所有的仓库信息，这个信息是包含每次修订和历史信息的全部内容

*工作区、暂存区、版本库*

​	工作区其实就是我们的编写程序的地方。

​	版本库其实包含了暂存区和分支两部分，暂存区其实就是我们每次提交之前先进行的git add操作之后的一个待提交列表的一个区域；从暂存区commit之后就进入到了版本库中，里面存放了我们的所有分支和操作记录

#### 二、git基础操作

##### 1. 创建版本库

```js
$ mkdir learngit
$ cd learngit
$ git init   //初始化Git仓库，把这个目录变成Git可以管理的仓库
```

##### 2. 把文件添加到版本库

```js
$ git add <file>    //把文件添加到仓库
$ git commit -m <message>     //把文件提交到版本库
```

#####3. 版本回退

1. `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
2. 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
3. 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

##### 4.常用git命令

git stash  将修改缓存起来

git stash pop  从缓存中拿出来

git add -a  提交修改的全部文件

git add .   提交全部文件

git add ./

git add xxx.html

git commit -m “hello"

git fetch origin

git rebase upstream/master

git push origin master

git log

git status

git branch        查看分支

git branch  xx   创建分支

git checkout -b xx    创建并切换分支

git branch -d xx    删除分支

git checkout xx  切换分支

git rm -rf .git   简而言之就是删除仓库文件夹下隐藏的.git文件夹即可

#####5. reset与revert的区别

**reset适用场景：** 如果想恢复到之前某个提交的版本，且那个版本之后提交的版本我们都不要了，就可以用这种方法。

![image-20190312143242174](https://github.com/tcc123/armory/blob/master/git/images/image-20190312143242174.png)

**revert适用场景：** 如果我们想恢复之前的某一版本，但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法。

![image-20190312143307012](https://github.com/tcc123/armory/blob/master/git/images/image-20190312143307012.png)

1. git revert是用一次新的commit来回滚之前的commit，git reset是直接删

   除指定的commit。

2. 在回滚这一操作上看，效果差不多。但是在日后继续merge以前的老版本时有区别。因为git revert是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，导致这部分改变不会再次出现，但是git reset是之间把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。

3. git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。

##### 6. merge和rebase的区别

- （一股脑）使用`merge`命令合并分支，解决完冲突，执行`git add .`和`git commit -m'******'`。这个时候会产生一个commit。
- （交互式）使用`rebase`命令合并分支，解决完冲突，执行`git add .`和`git rebase --continue`，不会产生额外的commit。这样的好处是，‘干净’，分支上不会有无意义的解决分支的commit；坏处，如果合并的分支中存在多个`commit`，需要重复处理多次冲突。

![marge](https://github.com/tcc123/armory/blob/master/git/images/marge.jpg)

![rebase](https://github.com/tcc123/armory/blob/master/git/images/rebase.jpg)