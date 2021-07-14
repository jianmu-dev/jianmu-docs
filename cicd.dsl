workflow:
  name: jianmu-docs ci/cd
  ref: jianmu_docs_site_cicd
  description: 建木docs ci/cd
  Start:
    type: start
    targets:
      - CLone_Site_UI
  CLone_Site_UI:
    type: git:v1.0
    sources:
      - Start
    targets:
      - Node_Build
    param:
      workspace: jianmu-docs
      remote_url: https://gitee.com/jianmu_dev/jianmu-docs.git
      commit_branch: master
      netrc_machine: gitee.com
      netrc_username: ((gitee.username))
      netrc_password: ((gitee.password))      
  Node_Build: 
    type: node_build:14.16.1-alpine3.13
    sources:
      - CLone_Site_UI
    targets:
      - Update_Resoure
    param:
      workspace: jianmu-docs
  Update_Resoure:
    type: ssh_update:v1.0  
    sources:
      - Node_Build
    targets:
      - Send_Message
    param:
      ssh_private_key: ((private_key.alixg))
      ssh_host: root@47.243.164.48
      remote_file: /etc/nginx/docs
      local_file: jianmu-docs/.vitepress/dist
  Send_Message:
    type: qywx_notice:v1.0
    sources:
      - Update_Resoure
    targets:
      - End
    param:
      bot_webhook_url: ((charbot.webhook_url))
      mentioned_moblie_list: "[]"
      text_content: "docs服务前端资源更新完成"
      msgtype: "text"
      mentioned_list: "[]"
  End:
    type: end
    sources:
      - Send_Message
