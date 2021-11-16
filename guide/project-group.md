# 一键还原项目
一键还原 CI 中的项目

### 1. 项目组dsl文件
**语法**
```
groups:
  - name: xxx
    projects:
      - xxx
      - xxx
  - name: xxx
    projects:
      - xxx
      - xxx
```
* name: 项目组的名称，尚未设置时为默认分组
* projects: 需要导入的项目dsl文件，git仓库根目录的相对路径

**示例**
```
groups:
  - name: 
    projects:
      # 批量导入
      - /batch_import.yml
      # 建木api网关
      - /api-gw/cicd.yml
      # 建木ci
      - /ci/server_cicd.yml
      - /ci/ui_cicd.yml
      # 开发工具
      - /dev-tools/docker_image_builder.yml
      # 建木hub
      - /hub/server_cicd.yml
      - /hub/ui_cicd.yml
      # 官网
      - /official-site/cicd.yml
      # ssl证书
      - /ssl/cert_cd.yml
```

### 2. 使用
1.通过 [git clone](https://hub.jianmu.run/_/git_clone) 节点拉取项目组dsl文件、项目dsl文件所在的git仓库

2.通过 [同步项目组](https://hub.jianmu.run/_/sync_project_group) 节点，同步项目组dsl文件中定义的项目

**管道示例**
```
pipeline:
  name: 批量导入项目
  git_clone:
    type: git_clone:1.1.1
    param:
      remote_url: https://gitee.com/jianmu-dev/jianmu-ci-dsl.git
      ref: refs/heads/master
      netrc_machine: gitee.com
      netrc_username: ((gitee.username))
      netrc_password: ((gitee.password))
  sync_project_group:
    type: sync_project_group:1.0.0
    param:
      ci_url: https://ci.jianmu.run
      ci_username: ((xxx.xxx))
      ci_password: ((xxx.xxx))
      git_path: ${git_clone.git_path}
      group_file_path: /project_group.yml
      deletable: false
```