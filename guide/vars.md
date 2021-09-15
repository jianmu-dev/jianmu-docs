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
      commit_branch: ${global.branch_name}
      netrc_machine: ${global.git_site}
```

### 输出参数

可以在当前节点的输入参数中引用上游节点的输出参数的值：
```
  Hello_Jianmu:
    type: hello_jianmu:latest
    sources:
      - Start
    targets:
      - Show_Message
    param:
      hello_language: Chinese
  Show_Message:
    type: show_msg:latest
    sources:
      - Hello_Jianmu
    targets:
      - End
    param:
      msg: ${Hello_Jianmu.return_hello}      
```
如上所示，`Show_Message`节点可以使用`${Hello_Jianmu.return_hello}`的语法

引用`Hello_Jianmu`节点的输出参数`return_hello`的值作为输入参数`msg`的值
