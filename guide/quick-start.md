# 快速开始

### 系统需求

Docker 19.30以上

Docker-compose 1.29.2以上

**下载`docker-compose.yml`**

```
wget https://gitee.com/jianmu_dev/jianmu-deploy/raw/master/docker-compose.yml
```
**启动**

```
docker-compose up -d
```

访问[`http://127.0.0.1`](http://127.0.0.1)

默认用户名密码为`admin/123456`

### 创建第一个项目

![create_porject](images/create_project.png)

点击git图标，URL输入`https://gitee.com/jianmu_dev/example-project.git`

分支为默认的`master`无需修改

关闭下方的认证开关，点击下一步

选择`ci_flow.yaml`，点击保存

系统将会根据导入的yaml文件生成名为`CI_Flow`的流程并在每小时的30分时触发执行。
