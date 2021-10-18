# 开始/结束节点
### 开始节点
**概念**

[流程定义](./flow-dsl.md)中的开始节点，无上游节点

**语法**
```
start:
  targets:
    - git_clone
  type: start
```

### 结束节点
**概念**

[流程定义](./flow-dsl.md)中的结束节点，无下游节点

**语法**
```
end:
  sources:
    - feishu_notice_post
  type: end
```