"use strict";
const common_vendor = require("../common/vendor.js");
const request = (baseURL, config) => {
  return new Promise((resolve, reject) => {
    const params = config.params || {};
    const queryString = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join("&");
    const url = `${baseURL.direct}${config.url}?${queryString}`;
    common_vendor.index.request({
      url,
      method: config.method || "GET",
      success: (res) => {
        resolve({ data: res.data });
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const baiduNewsBaseURL = {
  proxy: "/baiduNews/",
  direct: "https://news.baidu.com/"
};
const baiduNews = (config) => {
  return request(baiduNewsBaseURL, config);
};
const taobaoBaseURL = {
  proxy: "/taobaoSearchSuggest/",
  direct: "https://suggest.taobao.com/"
};
const taobaoSearchSuggest = (config) => {
  return request(taobaoBaseURL, config);
};
exports.baiduNews = baiduNews;
exports.taobaoSearchSuggest = taobaoSearchSuggest;
