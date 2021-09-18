# 表达式
### 运算表达式
* 运算表达式可在`流程/管道`定义中作为节点参数使用，平台会获取表达式的运算结果，作为参数值使用，如：
```
# xxx节点的输出参数: a = 1
# xxx节点的输出参数: b = 2
pipeline:
  ssh_cmd:
    type: ssh_cmd: 1.0.0
    param:
      ssh_cmd: ("echo " + (${xxx.a} + ${xxx.b}))
      ssh_ip: 127.0.0.1
      ssh_private_key: ((xxx.xxx))
      ssh_user: root
```
* 引用方式：`(xxx)`
```
# xxx节点的输出参数: a = 1
# xxx节点的输出参数: b = 2
ssh_cmd: ("echo " + (${xxx.a} + ${xxx.b}))
```
等价于
```
ssh_cmd: echo 3
```
详情参见[建木表达式引擎](https://gitee.com/jianmu-dev/jianmu-el/tree/1.1/)

### 字符串模版
* 节点参数默认为字符串模版，如：

```
# 全局变量: image_name = jianmu-runner-hub
# node_build节点的输出参数: package_name = jianmu_runner_hub
# node_build节点的输出参数: package_version = 1.0.0
pipeline:
  image_build:
    type: docker_image_build:1.0.0
    param:
      docker_file: Dockerfile
      image_name: ${global.image_name}
      image_tag: ${node_build.package_name}-${node_build.package_version}
```
* 引用方式
1. 字符串：`xxx`
```
docker_file: Dockerfile
```
2. 变量：`${xxx.xxx}`

```
# 全局变量: image_name = jianmu-runner-hub
image_name: ${global.image_name}
```
等价于
```
image_name: jianmu_runner_hub
```
3. 变量 + 字符串：`${xxx.xxx}xxx${xxx.xxx}`
```
# node_build节点的输出参数: package_name = jianmu_runner_hub
# node_build节点的输出参数: package_version = 1.0.0
image_tag: ${node_build.package_name}-${node_build.package_version}
```
等价于
```
image_tag: jianmu-runner-hub-1.0.0
```
