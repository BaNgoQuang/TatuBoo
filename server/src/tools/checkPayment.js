import { Browser, Builder, By, until } from "selenium-webdriver"
import chrome from "selenium-webdriver/chrome.js"

const checkPayment = async () => {
  // let options = new chrome.Options()
  // options.addArguments('headless') // Chạy Chrome ở chế độ headless
  // options.addArguments('disable-gpu') // Vô hiệu hóa GPU
  // options.addArguments('no-sandbox') // Tùy chọn cho môi trường không sandbox
  // khởi tạo driver
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    // lấy đường dẫn của trang web
    await driver.get("https://ipay.vietinbank.vn/login")
    // lấy phẩn tử theo name; sendkeys để tự động điền
    // const test = await driver.findElement(By.className("text-danger"))
    // console.log("test", test);
  } catch (error) {
    console.log("error", error.toString())
    return false
  } finally {
    // await driver.quit()
  }
}

export default checkPayment
