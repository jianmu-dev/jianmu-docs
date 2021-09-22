module.exports = {
    title: '持续集成平台',
    description: 'jianmu持续集成平台文档',
    lang: 'zh-CN',
    head: [
        // 改变title的图标
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico',
            },
        ],
    ],
    // 主题配置
    themeConfig: {
        // 侧边导航
        sidebar: [{
            text: '首页',
            link: '/guide/index',
        }, {
            text: '如何安装',
            children: [{
                text: 'Docker环境安装',
                link: '/guide/installation-docker',
            }, {
                text: 'Linux环境安装',
                link: '/guide/installation-linux'
            },]
        }, {
            text: '如何使用',
            children: [{
                text: '快速开始',
                link: '/guide/quick-start',
            }, {
                text: '流程定义',
                link: '/guide/flow-dsl'
            }, {
                text: '管道定义',
                link: '/guide/pipeline-dsl'
            }, {
                text: '节点定义',
                link: '/guide/node-dsl'
            }, {
                text: '密钥管理',
                link: '/guide/secrets'
            }, {
                text: '触发器',
                children: [{
                    text: 'Cron',
                    link: '/guide/cron',
                }],
            // }, {
            //     text: 'Webhooks',
            //     link: '/guide/webhooks'
            }],
        }, {
            text: '高级主题',
            children: [{
                text: '变量',
                link: '/guide/vars',
            },
            //     {
            //     text: '网关',
            //     link: '/guide/gateway'
            // }, {
            //     text: '运维',
            //     link: '/guide/operation'
            // },
                {
                text: '自定义节点',
                link: '/guide/custom-node'
            }, {
                text: '第三方库',
                link: '/guide/license-mixing'
            }],
        }],
    }
}