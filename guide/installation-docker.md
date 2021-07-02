# Docker环境安装

## 系统要求

Docker 19.30以上

Docker-Compose 1.29.2以上

## 如何部署

本项目部署通过前后端分离部署  

前端项目为[jianmu-ci-ui](https://gitee.com/jianmu_dev/jianmu-ui),镜像地址:[jianmudev/jianmu-ci-ui](https://hub.docker.com/r/jianmudev/jianmu-ci-ui)  
后端项目为[jianmu-ci-server](https://gitee.com/jianmu_dev/jianmu-main/)，镜像地址:[jianmudev/jianmu-ci-server](https://hub.docker.com/r/jianmudev/jianmu-ci-server)  

### 前端部署  

前端镜像通过nginx代理node.js编译的静态资源实现。  

前端部署可使用[jianmudev/jianmu-ci-ui](https://hub.docker.com/r/jianmudev/jianmu-ci-ui)中提供的镜像，也可根据以下步骤构建自定义前端镜像。  

#### 如何构建前端镜像
可通过`docker build`命令，通过`Dockerfile`文件构建镜像。

`Dockerfile`文件可参考[前端镜像Dockerfile](https://gitee.com/jianmu_dev/jianmu-ui-image/blob/master/Dockerfile)。

构建前端镜像需要`前端静态资源文件`和`nginx配置文件`。

#### 如何获取`前端静态资源文件`

前端静态资源文件可通过前端项目构建获得。  

构建步骤可参考前端项目的[`README`](https://gitee.com/jianmu_dev/jianmu-ui)。  

构建后可得到前端静态资源文件，默认为dist文件夹。

#### 如何获取`nginx配置文件`

nginx配置文件可参考[nginx-example.conf](https://gitee.com/jianmu_dev/jianmu-ui-image/blob/master/nginx-http.conf)。



### 后端部署

后端为`spring-boot 2.x`项目

#### 依赖

mysql8以上


#### 如何配置数据库

可以按照springboot的方式，根据配置文件或环境变量配置。  

配置文件可参考[application.yml](https://gitee.com/jianmu_dev/jianmu-main/blob/master/api/src/main/resources/application.yml)。  

环境变量配置：  

```
SPRING_DATASOURCE_URL: jdbc:mysql://jianmu-mysql:3306/jianmu?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true
```
连接数据库的jdbc链接  
<br/>
  
```
SPRING_DATASOURCE_USERNAME: root
```
后台连接数据库的用户，与数据库建立连接使用   
<br/>

```
SPRING_DATASOURCE_PASSWORD: 123456
```
后台连接数据库的密码，与数据库建立连接使用   
<br/>


#### 自定义配置

可以按照springboot的方式，根据配置文件或环境变量配置。

配置文件可参考[application.yml](https://gitee.com/jianmu_dev/jianmu-main/blob/master/api/src/main/resources/application.yml)。

环境变量配置：  
```
EMBEDDED_DOCKER-WORKER_DOCKER-HOST: unix:///var/run/docker.sock
```
配置worker调用的docker守护进程api。  
配置后，后端项目内置的worker将会使用此docker守护进程进行操作，主要包括docker类型节点的执行。  
可配置为socket文件（centos默认为unix:///var/run/docker.sock），该路径可自定义修改，修改方式参照[docker守护进程官方文档](https://docs.docker.com/config/daemon/)，也可配置成tcp链接（tcp://127.0.0.1:2375）,根据实际Docker Engine的地址和端口配置。   
<br/>

```
JIANMU_API_ADMINPASSWD: 123456
```
平台admin用户登陆密码   
<br/>

```
REGISTRY_URL: https://hub.jianmu.dev
```
连接的节点库地址，在平台新建或导入项目后，平台会根据流程定义中所使用的节点，从节点库拉取所需节点定义，官方地址为https://hub.jianmu.dev   
<br/>


#### 如何构建后端镜像

后端镜像通过jib-maven-plugin插件，使用maven打包时创建。   

若需要构建自定义后端镜像，可修改后端项目中的api/pom.xml文件中`jib-maven-plugin`的相关配置，并在maven中配置nexus库`https://nexus.jianmu.dev/repository/maven-public/`后执行`mvn install -DskipTests`


#### 如何配置

可通过注入环境变量的方式进行配置，参考[docker-compose.yml](https://gitee.com/jianmu_dev/jianmu-deploy/blob/master/docker-compose.yml)文件。
