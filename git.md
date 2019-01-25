# 如何同步......

### 前言

我们都知道,GitHub是一个方便多人协作的托管平台.如何将本地local仓库、个人远程origin仓库(GitHub上的仓库)和远程upstream仓库(在GitHub上fork别人的仓库)进行同步是多人协作的前提.那么我们就来看一下,如何进行

### 情景描述

#### 前提:

A与B两人协作管理同一个upstream远程仓库,本次操作同时fork.

#### 场景一:

现实中我们经常出现这种问题:A fork了远程upstream仓库,几天之后upstream仓库更新了新的版本,此时A的个人仓库与origin仓库已经落后,如果这个时候A 在落后的版本上继续commit,就会频频出错,那么A就需要更新本地仓库,在最新的基础上再操作.

#### 场景二:

A在最新的版本上进行了自己的修改,并且已经push到upstream仓库,此时upstream版本已被A更新. B想要同步A的此次更新需要fetch远程upstream仓库(此时local 已更新),再将local 仓库push到本地origin仓库.完成同步的操作.

### 