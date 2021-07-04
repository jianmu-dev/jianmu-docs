# 变量

### 全局变量

可以在流程定义的`param`段落中定义全局变量，语法如下：
```
param:
  branch_name: master
  git_site: gitee.com
```
然后可以在节点定义的输入参数中进行引用，语法如下：
```
  Git_Clone:
    type: git:v1.0
    param:
      commit_branch: ${branch_name}
      netrc_machine: ${git_site}
```

### 输出参数

可以在当前节点的输入参数中引用上游节点的输出参数的值：
```
  Build:
    type: maven:3-jdk11
    sources:
      - Git_Clone
    targets:
      - Send_Message
  Send_Message:
    type: qywx_notice:v1.0
    sources:
      - Build
    targets:
      - End
    param:
      bot_webhook_url: ((qywx.webhook_url))
      text_content: ${Build.build_result}
      msgtype: "text"
```
如上所示，`Send_Message`节点可以使用`${Build.build_result}`的语法

引用`Build`节点的输出参数`build_result`的值作为输入参数`text_content`的值