// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')

cloud.init()

async function getBookInfo(isbn) {
  const res = await axios.get(`https://search.douban.com/book/subject_search?search_text=${isbn}&cat=1001`)
  // console.log(res)
  const reg = /window\.__DATA__ = (.*)"/
  if(reg.test(res.data)){
    const bookdata = RegExp.$1;
    // console.log(bookdata)
    let decryptedData = doubanbook(bookdata);
    return decryptedData[0]
  }
}

// getBookInfo('9787115275790')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const isbn = event.isbn;
  const book = await getBookInfo(isbn);
  await db.collection('books').add({
    data:{
      isbn: isbn,
      title: book.title,
      cover_url: book.cover_url
    }
  });
  return book;
}