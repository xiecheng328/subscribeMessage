小程序给用户推送消息原有方式是采用模板消息，用户通过表单生成formId来给推送消息，但小程序模板消息接口已于2020年1月10日下线，开发者可以使用另一种方式给用户推送消息：订阅消息。

## 请确认调试基础库的版本
建议使用V2.8.2及以后版本
![图片描述](//img.mukewang.com/5e891b9400016c7515920692.png)

## 配置订阅消息模板
首先确认确认当前小程序的id和登录的公众平台是不是同一个，因为之前经常有同学具有多个公众平台账号，有可能是多个账号会弄混导致模板消息发送失败。

在公众平台中配置模板消息，选择左边订阅消息菜单，然后点击右边添加按钮，根据自己需求选择消息模板
![图片描述](//img.mukewang.com/5e891cb70001ceea24641308.png)



## 调起小程序订阅消息界面获取下发权限
赋值消息模板对应的模板ID，然后在小程序端调起订阅消息界面
```
const templateId = 'xxxxxx'
wx.requestSubscribeMessage({
    tmplIds: [templateId],
    success(res) {
        if (res[templateId] == 'accept') {
            //用户同意了订阅，允许订阅消息
            wx.showToast({
	            title: '订阅成功'
            })
            } else {
            //用户拒绝了订阅，禁用订阅消息
            wx.showToast({
	            title: '订阅失败'
            })
        }
    },
    fail(err) {
    console.error(err)
    }
})

```

## 云函数端下发订阅消息
```
 try {
    const wxContext = cloud.getWXContext()
    const templateId = 'xxxxxx

    return await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      page: 'page/index/index',
      lang: 'zh_CN',
      data: {
        phrase1: {
          value: '上课啦'
        },
        thing2: {
          value: '小程序开发'
        },
        thing3: {
          value: '订阅消息'
        }
      },
      templateId: templateId,
      miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }

```

## 设置订阅消息权限
在当前云函数下面，新建config.json文件
```
{
  "permissions": {
    "openapi": [
      "subscribeMessage.send"
    ]
  }
}

```

## 注意

测试订阅消息需要在真机上测试，开发工具不能测试。
点击真机调试，用手机扫描二维码可以测试。
发送完消息以后，在微信页面的服务通知内，就能够看到推送的消息了。

## 代码参考
<https://github.com/xiecheng328/subscribeMessage>

## 小程序开发学习建议
- 多看[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)，小程序的官方文档写的非常的全面，涵盖了微信小程序开发的所有知识点，大家一定要多看微信小程序官方文档
- 多逛小程序[开发社区](https://developers.weixin.qq.com/community/develop/question)，关于微信小程序的新功能以及更新内容都会在社区上面通知，大家遇到技术问题也可以在上面提问，会有微信团队官方工程师帮助我们解答
- 多敲代码，多练习。只有自己不断的练习才能真正的得到提高
- 分析问题和解决问题的能力。这是需要时间不断积累的，在遇到问题的时候，一定要多思考，对于有错误信息的问题一定要认真翻译错误信息，大多数的错误线索都能够被找到
- 微信小程序与云开发入门课程，可以看我的慕课免费视频[《轻松入门微信小程序与云开发》](https://www.imooc.com/learn/1121)，大家在学习中的问题都可以在课程问答评论区留言，我都会认真的回复
- 小程序云开发的实战课程也已经上线， [《微信小程序云开发 -- 从0打造云音乐全栈小程序》](https://coding.imooc.com/class/373.html)，这是首发的完全基于小程序云开发打造的一站式全栈小程序实战课程，本门课程以云音乐实战项目为例，是横跨小程序端、云开发后端、后台管理系统的一站式云开发小程序全栈项目