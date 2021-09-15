# 自定义节点
当节点库中的节点定义不满足场景需求时，用户可以通过自定义节点满足使用需求。

用户可通过以下步骤使用自定义节点：  
1. 创建自定义节点  
2. 上传自定义节点到节点库  
3. 流程中引用自定义节点  



### 1. 如何创建自定义节点

用户可以在[建木节点库](https://hub.jianmu.dev)创建节点，来实现节点的自定义。
1. 登录后点击头像进入个人主页，点击创建节点
2. 输入节点信息后点击创建，即创建成功
![create_node_definition](./images/create_node_definition.png)

节点定义说明：
```
节点名称: 节点定义名称
归属: 节点所有者，可以选择个人或组织。组织在个人主页进行创建
节点唯一标识: 节点定义在归属内的唯一标识
源码链接: 节点详情界面通过"源码"按钮跳转
文档链接: 节点详情界面通过"文档"按钮跳转
节点类型: 节点类型，当前只支持docker
描述: 节点定义的描述
```



### 2. 如何创建节点定义版本

#### 2.1 通过Hub界面创建节点定义版本
1. 点击节点定义名称进入节点定义详情界面
2. 选择所有版本，点击创建版本
3. 输入节点定义版本的dsl，点击确定，即创建成功
![create_node_definition_version](./images/create_node_definition_version.png)

节点定义版本dsl说明：

<pre style="font-size: 14px;background-color: #f8f8f8;padding: 15px;border: 1px solid #e7eaed;border-radius: 5px">
ref: 归属人或归属组织的唯一标识/节点定义在归属内的唯一标识，必填，如：jianmu/hub_publish
     若官方节点定义，则可省略归属人或归属组织的唯一标识，如：hub_publish
version: 节点定义的版本，必填
resultFile: 输出参数的文件路径，若定义了输出参数outputParameters，则必填
inputParameters: 输入参数
  ref: 参数唯一标识，会在容器内转译成'JIANMU_'开头并大写的环境变量。如：hub_url在容器内可通过JIANMU_HUB_URL环境变量调用，必填
  name: 参数名称，必填
  type: 参数类型，支持STRING、SECRET、NUMBER、BOOLEAN等类型，必填
        STRING/NUMBER/BOOLEAN: 若参数类型为STRING/NUMBER/BOOLEAN，可直接填写值或引用其他变量(事件参数、全局参数、其他任务的输出参数等)
        SECRET: 若参数类型为SECRET，需要调用平台密钥，具体用法详见<a href="./secrets.md">密钥管理</a>章节
value: 参数默认值，若执行该节点定义时，没有指定参数值，将会使用此默认值，必填
description: 参数描述，选填
outputParameters: 输出参数，需要在"resultFile"指定的文件内填写对应的json数据，key为输出参数的ref值，格式同输入参数
spec: 镜像相关信息，节点定义类型为docker时，必填
  image: 指定该节点定义使用的容器镜像，执行时，平台将会从dockerhub拉取指定镜像，必填
  cmd: list格式，指定容器运行时的command内容，选填
       如：cmd:
            - shell1
            - shell2
  entrypoint: list格式，指定容器运行时的entrypoint内容，选填
              如：entrypoint:
                   - shell1
                   - shell2
  其他非必填参数请参考：<a href="https://gitee.com/jianmu-dev/jianmu-ci-server/blob/master/task-core/src/main/java/dev/jianmu/task/aggregate/spec/ContainerSpec.java
">spec参数</a>
</pre>


#### 2.2. 通过节点库中的`hub_publish`节点创建流程或管道推送该节点定义版本至节点库中

1.流程代码:
```
workflow:
  name: 创建节点定义版本“hub-publish”
  ref: publish_hub_publish_version
  description: 这是一个创建节点定义版本的流程定义样例
  start:
    type: start
    targets:
      - git_clone
  git_clone:
    type: git_clone:1.0.0
    sources:
      - start
    targets:
      - hub_publish
    param:
      ref: refs/heads/master
      remote_url: https://gitee.com/jianmu-runners/jianmu-runner-node-definition-version-publisher.git
      netrc_machine: gitee.com
      netrc_username: ((gitee.username))
      netrc_password: ((gitee.password))
  hub_publish:
    type: hub_publish:1.0.0
    sources:
      - git_clone
    targets:
      - end
    param:
      hub_url: https://api.jianmu.run
      dsl_file_path: /xxx/xxx
      hub_api_key: ((xxx.xxx))
  end:
    type: end
    sources:
      - hub_publish
```


hub_api_key获取步骤：

1. 登录节点库
2. 点击头像进入个人主页，再点击个人中心
3. 点击ApiKey管理，添加ApiKey
![create_api_key.png](./images/create_api_key.png)



2.管道代码；

```
pipeline:
  name: 发布节点定义版本“hub-publish”
  ref: publish_hub_publish_version
  description: 这是一个创建节点定义版本的管道定义样例
  git_clone:
    type: git_clone:1.0.0
    param:
      remote_url: https://gitee.com/jianmu-runners/jianmu-runner-node-definition-version-publisher.git
      ref: refs/heads/master
      netrc_machine: gitee.com
      netrc_username: ((gitee.username))
      netrc_password: ((gitee.password))
  hub_publish:
    type: hub_publish:1.0.0
    param:
      hub_url: https://api.jianmu.run
      dsl_file_path: /xxx/xxx
      hub_api_key: ((xxx.xxx))
```



执行成功后，查看节点定义详情界面，可以看到节点定义版本已经推送成功。
![view_node_definition_version](./images/view_node_definition_version.png)
