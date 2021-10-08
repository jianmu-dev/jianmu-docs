# 变量

### 全局变量

可以在流程定义的`param`段落中定义全局变量，语法如下：
```
param:
  image_name: jianmudev/private
```
然后可以在节点定义的输入参数中进行引用，语法如下：
```
  maven_jib_build:
  type: maven_build:1.2.0-jdk11
  param:
    image_name: ${global.image_name}
```

### 事件参数

如果当前流程已经与[事件桥接器](event-bridge.md)中的目标绑定，那么当流程被事件触发时，可以使用如下语法来引用目标事件中的参数：
```
clone:
    type: git_clone:1.0.0
    param:
      remote_url: (`https://gitee.com/jianmu-dev/jianmu-ci-ui.git`)
      ref: ${event.gitlab_ref}
```

### 输出参数

可以在当前节点的输入参数中引用上游节点的输出参数的值：
```
  git_clone:
    type: git_clone:1.0.0
    param:
      remote_url: https://gitee.com/jianmu-hub/jianmu-hub-server.git
      ref: refs/heads/master
      netrc_machine: gitee.com
      netrc_username: ((gitee.username))
      netrc_password: ((gitee.password))
  maven_jib_build:
    type: maven_build:1.2.0-jdk11
    param:
      workspace: ${git_clone.git_path}
```
如上所示，`maven_jib_build`节点可以使用`${git_clone.git_path}`的语法

引用`git_clone`节点的输出参数`git_path`的值作为输入参数`workspace`的值
