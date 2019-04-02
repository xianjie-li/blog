const axios = require('axios');   // 发起请求
const cheerio = require('cheerio');   // 类jq的node文档分析库
const fs = require('fs');   // 生成文件

// 收集的数据网址
const urlprefix = 'https://www.shanbay.com';

getDatas({
  fileName: '7天掌握Java词汇',   // 生成的文件名
  listUrl: '/wordbook/165730/'  // 列表地址
});

async function getDatas(option) {
  // 因为目录获取
  let res = await getListUrl(urlprefix + option.listUrl);

  if(!res) return;

  await getDetail(res, (data) => {

    let tempArr = [];

    for(let [key, val] of Object.entries(data)) {
      tempArr.push(...val)
    }
    
    fs.writeFile(`./${option.fileName}.txt`, tempArr.join('\n'), err => {
      if(err) {
        console.log('写入文件时发生错误:', err);
        return;
      }

      console.log('写入完成!');


    })
  });
}


async function getListUrl(url) {
  // let res = await axios.get('https://www.shanbay.com/wordbook/129934/');
  let res = await axios.get(url);
  
  if(res.status !== 200) return;
  
  let $ = cheerio.load(res.data);
  let wordlist = $('.wordbook-wordlist-name a');
  let urlArr = [];

  wordlist.each(function () {
    urlArr.push($(this).attr('href'))
  })

  return urlArr;
}

async function getDetail(urls, cb, index = 0, init = {}, page = 1) {
  if(index === urls.length) {
    cb(init)
    return;
  };
  // let res = await axios.get('https://www.shanbay.com/wordbook/129934/');
  let res = await axios.get(urlprefix + urls[index] + '?page=' + page);
  
  if(res.status !== 200) return;
  
  let $ = cheerio.load(res.data);
  let wordlist = $('.span2 strong');
  let pagesStr= res.data.match(/var pages = Math\.ceil\((\d+) \/ (\d+)\)/);
  let pageLength = Math.ceil(pagesStr[1] / pagesStr[2]);

  let urlArr = [];

  wordlist.each(function () {
    urlArr.push($(this).html())
  })

  init['chapter' + index + '_page' + page] = urlArr;

  console.log('总完成度 -> 当前章节：' + (index + 1) + '/' + urls.length + ' 当前页:' + page + '/' + pageLength);
  
  // 长度小于1直接取下一条，否则取下一页
  if(pageLength > 1 && pageLength !== page) {
    await getDetail(urls, cb, index, init, page + 1);
  }else {
    await getDetail(urls, cb, index + 1, init, 1);
  }
  
}

