"use strict";
const common_vendor = require("../common/vendor.js");
const baiduNews = (config) => {
  return new Promise((resolve, reject) => {
    const params = config.params || {};
    const queryString = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join("&");
    const url = `https://news.baidu.com/${config.url}?${queryString}`;
    common_vendor.wx$1.request({
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
const taobaoSearchSuggest = (config) => {
  return new Promise((resolve, reject) => {
    const params = config.params || {};
    const queryString = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join("&");
    const url = `https://suggest.taobao.com/${config.url}?${queryString}`;
    common_vendor.wx$1.request({
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
exports.baiduNews = baiduNews;
exports.taobaoSearchSuggest = taobaoSearchSuggest;
