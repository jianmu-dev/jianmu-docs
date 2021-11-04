# 如何集成Vault来进行密钥管理

Vault支持的认证方式非常多，当前建木支持的有以下两种：

* Token Auth Method
* TLS Certificates Auth Method

Vault相关的配置请参考[这里](https://gitee.com/jianmu-dev/jianmu-deploy/blob/master/how_to_deploy_vault.md)

## 前置准备

* Vault服务已正确部署
* 如果使用TLS证书认证方式，则证书已生成

## 证书转换方式

将crt证书转换为P12证书,这里需要设置密码

```
openssl pkcs12 -export -in vault.crt -inkey vault.key -out jianmu.p12
```

再转换为Java所需的JKS证书，这里需要输入上面设置的密码

```
keytool -importkeystore -keyalg EC -srckeystore jianmu.p12 -destkeystore jianmu.jks -srcstoretype pkcs12
```

## 配置方式

不集成Vault的配置

```
credential:
  type: local
```

使用Token方式集成不使用HTTPS的Vault的配置

```
credential:
  type: vault
  vault:
    authentication: token
    url: http://192.168.1.24:443
    token: s.QUiJwpVRpSshEYkS9Boewmbp
    vault-engine-name: jianmu
```

使用Cert方式集成Vault的配置

```
credential:
  type: vault
  vault:
    authentication: cert
    ssl:
      key-store: file:jianmu.jks
      key-store-password: 123456
      trust-store: file:jianmu.jks
      trust-store-password: 123456
    url: https://192.168.1.24:443
    vault-engine-name: jianmu
```
