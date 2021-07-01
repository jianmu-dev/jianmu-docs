# 密钥管理

### 新增命名空间

点击右上角钥匙图标，进入密钥管理界面

![create_secret_namespace](./images/create_secret_namespace.png)

点击“新增命名空间”框，填写命名空间名称后，点击确定，即可创建命名空间。


### 新增密钥

创建命名空间或，点击对应命名空间标签，进入命名空间

![create_secret_key](./images/create_secret_key.png)

点击“新增密钥”框，填写密钥名称和值后，点击确定，即可创建密钥。

### 密钥使用

密钥可在流程定义中作为节点参数使用，例如：
```
    param:
      username: ((namespace.username))
      password: ((namespace.password))
      
```

### 密钥删除

点击密钥标签右上角删除按钮，会弹出删除密钥提示框，点击确定后，即可删除密钥。


### 命名空间删除

点击命名空间标签右上角删除按钮，会弹出删除密钥提示框，点击确定后，即可删除对应命名空间，删除命名空间时，会同步删除其中所有的密钥。

