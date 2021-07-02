# Docker环境安装

## 系统要求

Docker 19.30以上

Docker-Compose 1.29.2以上

## 如何部署

建木持续集成平台是一个典型的前后端分离架构  

前端使用Vue 3开发

源码地址： [jianmu-ci-ui](https://gitee.com/jianmu_dev/jianmu-ui) 

后端使用Spring Boot 2.5.x开发

源码地址： [jianmu-ci-server](https://gitee.com/jianmu_dev/jianmu-main/)

### 前端部署  

#### 从源码构建

构建步骤可参考项目[`README`](https://gitee.com/jianmu_dev/jianmu-ui)  

#### 构建Docker镜像

项目源码中提供了[Dockerfile文件](https://gitee.com/jianmu_dev/jianmu-ui-image/blob/master/Dockerfile)

在项目根目录下，运行`docker build`命令进行前端Docker镜像的构建

镜像基于nginx的基础镜像，实现对源码构建的静态资源的托管

[官方镜像](https://hub.docker.com/r/jianmudev/jianmu-ci-ui) 

#### 自定义部署

可以拉取官方镜像部署或自行从源码构建镜像部署

如需修改Nginx配置，可参考[nginx-http.conf](https://gitee.com/jianmu_dev/jianmu-ui-image/blob/master/nginx-http.conf)

### 后端部署

#### 从源码构建

项目使用Maven构建，源码根目录下执行`mvn package -DskipTests`进行构建打包

**注意：需要配置Maven私有库**`https://nexus.jianmu.dev/repository/maven-public/`

#### 构建Docker镜像

项目使用了Google的[Jib插件](https://github.com/GoogleContainerTools/jib)构建镜像

运行`mvn install -DskipTests`命令会触发`jib-maven-plugin`插件的执行来构建与上传镜像

若需要构建自定义后端镜像，可修改后端项目中的api/pom.xml文件中`jib-maven-plugin`的相关配置

[官方镜像](https://hub.docker.com/r/jianmudev/jianmu-ci-server)  

#### 自定义部署

**依赖中间件**

Mysql版本需要8.0以上

可以拉取官方镜像部署或自行从源码构建镜像部署

**服务配置**

由于服务使用Spring Boot开发，因此可以使用环境变量或配置文件进行配置

可用的配置项参考[application.yml](https://gitee.com/jianmu_dev/jianmu-main/blob/master/api/src/main/resources/application.yml)文件

**数据库环境变量配置示例：**
```
SPRING_DATASOURCE_URL: jdbc:mysql://jianmu-mysql:3306/jianmu?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: 123456
```
**其他环境变量配置示例：**
```
EMBEDDED_DOCKER-WORKER_DOCKER-HOST: unix:///var/run/docker.sock
```
该配置项为worker调用的docker守护进程api地址

可配置为Unix socket(unix:///var/run/docker.sock)或Tcp Socket(tcp://127.0.0.1:2375)形式

具体根据要连接的Docker Engine配置而来，可参考[Docker官方文档](https://docs.docker.com/config/daemon/)

```
JIANMU_API_ADMINUSER: admin
JIANMU_API_ADMINPASSWD: 123456
```
持续集成平台的用户名与密码配置  
```
REGISTRY_URL: https://hub.jianmu.dev
```
节点库地址

平台新建或导入项目后，平台会根据流程定义中所使用的节点，从节点库拉取所需节点定义

官方地址为https://hub.jianmu.dev 也可以使用自建的私有库地址
