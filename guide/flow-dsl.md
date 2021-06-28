# 流程定义

CI/CD流程使用Yaml来定义

### Workflow

流程定义在workflow段落下：

```
workflow:
  name: 流程名称
  ref: 流程唯一标识
  description: 流程描述
```

### 流程节点

流程由节点组成，同一个流程中的节点名称不可重复：

```
  Mvn_Deploy:
    type: maven:3-jdk11
```

节点使用type字段来指定节点类型，节点类型由类型唯一标识`ref`与类型版本组成

如果不指定版本时，系统会使用默认版本`latest`,如

```
  Mvn_Deploy:
    type: maven
```

等价于

```
  Mvn_Deploy:
    type: maven:latest
```

### 节点执行顺序

流程从`start`类型的节点开始执行，到`end`类型的节点结束

节点使用`sources`和`targets`来分别指定当前节点的上游与下游节点，如下：

```
  Start:
    type: start
    targets:
      - Mvn_Deploy
  Mvn_Deploy:
    type: maven:3-jdk11
    sources:
      - Start
    targets:
      - End
  End:
    type: end
    sources:
      - Mvn_Deploy
```

`start`与`end`可以分别省略`sources`和`targets`定义，一个节点可以定义多个上游或下游节点

当存在多个下游节点时，当前节点执行成功后会并行触发下游节点

当存在多个上游节点时，当前节点会等待上游节点全部执行成功后才开始执行

### 节点参数

不同的节点类型定义了不同的参数，节点类型预先定义了`输入参数`和`输出参数`的名称、类型与默认值

在流程中配置节点时，可以覆盖`输入参数`的默认值，例如：

```
  Mvn_Deploy:
    type: maven:3-jdk11
    sources:
      - Git_Clone
    targets:
      - End
    param:
      maven_snapshot_id: maven-snapshots
      maven_public_id: maven-public
      maven_release_id: maven-releases
```

`输入参数`和`输出参数`也可以使用变量方式引用，详情参见[`变量章节`](vars.md)