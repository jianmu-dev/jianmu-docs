# 快速开始

### 系统要求

Docker 19.30以上，[官方安装手册](https://docs.docker.com/get-started/#download-and-install-docker)

Docker-Compose 1.29.2以上，[官方安装手册](https://docs.docker.com/compose/install/#install-compose)

Kubernetes 1.18以上, [官方安装手册](https://kubernetes.io/docs/tasks/tools/)

#### 环境准备（以CentOS 7为例说明）

以root权限登陆系统，更新系统并安装docker：
```
yum -y update
yum install -y wget docker docker-compose
systemctl enable docker
reboot
```

安装docker-compose：
```
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

配置docker-compose权限：
```
chmod +x /usr/local/bin/docker-compose
```

验证环境可用性：
```
[root@localhost ~]# docker version
Client:
 Version:         1.13.1
 API version:     1.26
 Package version: docker-1.13.1-208.git7d71120.el7_9.x86_64
 Go version:      go1.10.3
 Git commit:      7d71120/1.13.1
 Built:           Mon Jun  7 15:36:09 2021
 OS/Arch:         linux/amd64

Server:
 Version:         1.13.1
 API version:     1.26 (minimum version 1.12)
 Package version: docker-1.13.1-208.git7d71120.el7_9.x86_64
 Go version:      go1.10.3
 Git commit:      7d71120/1.13.1
 Built:           Mon Jun  7 15:36:09 2021
 OS/Arch:         linux/amd64
 Experimental:    false

[root@localhost ~]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
   Active: active (running) since 六 2021-11-27 18:42:45 CST; 8min ago
     Docs: http://docs.docker.com
 Main PID: 1073 (dockerd-current)
   CGroup: /system.slice/docker.service
           ├─1073 /usr/bin/dockerd-current --add-runtime docker-runc=/usr/libexec/docker/docker-runc-current --default-runtime=docker-runc --exec-opt native.cgroupdriver=systemd --userland-proxy-path=...
           └─1136 /usr/bin/docker-containerd-current -l unix:///var/run/docker/libcontainerd/docker-containerd.sock --metrics-interval=0 --start-timeout 2m --state-dir /var/run/docker/libcontainerd/co...

[root@localhost ~]# docker-compose --version
docker-compose version 1.29.2, build 5becea4c
```

### docker部署

**下载`docker-compose.yml`**

```
wget https://gitee.com/jianmu-dev/jianmu-deploy/raw/2.0.0/docker-compose.yml
```

**启动**

```
docker-compose up -d
```

访问[`http://127.0.0.1`](http://127.0.0.1)

默认用户名密码为`admin/123456`

### k8s部署
**下载`kubernetes.yaml`**
```
wget https://gitee.com/jianmu-dev/jianmu-deploy/raw/master/kubernetes.yaml
```

**启动**

```
kubectl apply -f kubernetes.yaml
```

访问[`node节点ip:30180`](http://node节点ip:30180)

默认用户名密码为`admin/123456`

### 创建第一个项目

![create_porject](./images/create_project.png)

点击git图标，URL输入`https://gitee.com/jianmu-dev/jianmu-docs.git`

分支为`2.0.0`

关闭下方的认证开关，点击下一步

选择`hello_jianmu.yml`，点击保存

系统将会根据导入的yaml文件生成名为`hello_jianmu`的流程并在每小时的0/30分时触发执行。

