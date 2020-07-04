const OPERATION_DELAY = 6000

function getOneWidget(str, method, parent, delay) {
  if (!str) {
    return null
  }

  let method = method || 'text'
  let parent = parent || false
  let delay = delay || OPERATION_DELAY
  let widget = null

  let funcStr = method + "('" + str + "').findOne(" + delay + ')'
  if (parent === false) {
    return (widget = eval(funcStr))
  }

  if (widget === null) {
    return null
  }
  return eval(funcStr + '.parent()')
}

function AppObject(id, name, packageName, startUpDelay) {
  const defaultStartUpDelay = 5000

  this.id = id
  this.name = name
  this.packageName = packageName
  this.startUpDelay = startUpDelay || defaultStartUpDelay

  /**
   * 点击控件
   *
   * @param {Widget} widget 控件
   */
  this.click = (widget) => {
    // 控件不存在
    if (!widget) {
      return false
    }

    // 控件可点击
    if (widget.clickable() === true) {
      return widget.click()
    }

    let rect = widget.bounds()
    return click(rect.centerX(), rect.centerY())
  }

  /**
   * 运行app
   */
  this.launch = () => {
    app.launchPackage(this.packageName)
  }

  /**
   * 签到
   */
  this.signIn = () => {
    return eval('signIn' + this.id + '()')
  }

  /**
   * 关闭app
   */
  this.killProgress = () => {
    shell('am force-stop ' + this.packageName, true)
  }
}
APP = new AppObject()

// APP.click(getOneWidget('天天领钱', 'text'))
// APP.click(getOneWidget('点我签到领钱', 'text'))
APP.click(getOneWidget('home_market_close', 'id')) // 首页有可能弹出来的广告

