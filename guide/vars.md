# 变量

### 全局变量

可以在流程定义的`param`段落中定义全局变量
```
param:
  branch_name: master
  git_site: gitee.com
```
然后可以在节点定义的输入参数中进行引用
```
  Git_Clone:
    type: git:v1.0
    param:
      commit_branch: ${branch_name}
      netrc_machine: ${git_site}
```