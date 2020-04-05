const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const templateId = 'uOOcS145C_LPDTIpw1bzVDD2KKgugEEROPgo8o1L1KI'


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
}