"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const _sfc_main = {
  data() {
    return {
      activeName: "百度新闻",
      query: "热干面",
      baiduNewsResp: null,
      taobaoSearchSuggestResp: null,
      dialogVisible: false,
      dialogTitle: "",
      tableHeaders: [],
      tableData: [],
      jsonContent: ""
    };
  },
  computed: {
    resultCount() {
      return this.tableData.length;
    }
  },
  methods: {
    getBaiduNews() {
      this.tableData = [];
      this.tableHeaders = [];
      api_index.baiduNews({
        method: "get",
        url: "widget",
        params: {
          id: "LocalNews",
          loc: 5496,
          ajax: "json"
        }
      }).then((resp) => {
        console.log("baiduNewsResp", resp.data);
        this.baiduNewsResp = resp.data;
        this.showResultDialog("百度新闻", resp.data);
      }).catch((err) => {
        console.error("baiduNews error:", err);
        this.baiduNewsResp = { error: err.message };
      });
    },
    getTaobaoSearchSuggest() {
      this.tableData = [];
      this.tableHeaders = [];
      if (!this.query || !this.query.trim()) {
        common_vendor.index.showToast({ title: "请输入搜索内容", icon: "none" });
        return;
      }
      api_index.taobaoSearchSuggest({
        method: "get",
        url: "sug",
        params: {
          code: "utf-8",
          q: this.query
        }
      }).then((resp) => {
        console.log("taobaoSearchSuggestResp", resp.data);
        this.taobaoSearchSuggestResp = resp.data;
        this.showResultDialog("淘宝搜索提示", resp.data);
      }).catch((err) => {
        console.error("taobaoSearchSuggest error:", err);
        this.taobaoSearchSuggestResp = { error: err.message };
      });
    },
    showResultDialog(title, data) {
      var _a, _b, _c, _d;
      this.dialogTitle = title;
      let items = [];
      if (title === "百度新闻") {
        const localNews = (_b = (_a = data == null ? void 0 : data.data) == null ? void 0 : _a.LocalNews) == null ? void 0 : _b.data;
        const first = Array.isArray((_c = localNews == null ? void 0 : localNews.rows) == null ? void 0 : _c.first) ? localNews.rows.first : [];
        const second = Array.isArray((_d = localNews == null ? void 0 : localNews.rows) == null ? void 0 : _d.second) ? localNews.rows.second : [];
        items = [...first, ...second];
        if (items.length > 0 && typeof items[0] === "object") {
          this.tableHeaders = [
            { key: "title", label: "标题" },
            { key: "time", label: "时间" },
            { key: "url", label: "链接" }
          ];
          this.tableData = items.map((item) => ({
            title: item.title || "",
            time: item.time || "",
            url: item.url || ""
          }));
        }
      } else if (title === "淘宝搜索提示") {
        items = Array.isArray(data) ? data : data.result || [];
        if (items.length > 0) {
          if (Array.isArray(items[0])) {
            this.tableHeaders = [
              { key: "0", label: "搜索词" },
              { key: "1", label: "热度" }
            ];
            this.tableData = items.map((item) => ({ "0": item[0], "1": item[1] }));
          } else if (typeof items[0] === "object") {
            const keys = Object.keys(items[0]);
            this.tableHeaders = keys.map((key) => ({ key, label: key }));
            this.tableData = items;
          } else {
            this.tableHeaders = [{ key: "value", label: "搜索提示" }];
            this.tableData = items.map((item) => ({ value: item }));
          }
        }
      }
      this.jsonContent = JSON.stringify(data);
      this.dialogVisible = true;
    },
    openLink(url) {
      if (!url)
        return;
      common_vendor.index.navigateTo({
        url: `/pages/webview/index?url=${encodeURIComponent(url)}`
      });
    }
  },
  mounted() {
    api_index.baiduNews({
      method: "get",
      url: "widget",
      params: {
        id: "LocalNews",
        loc: 5496,
        ajax: "json"
      }
    }).then((resp) => {
      console.log("baiduNewsResp", resp.data);
      this.baiduNewsResp = resp.data;
    }).catch((err) => {
      console.error("baiduNews error:", err);
      this.baiduNewsResp = { error: err.message };
    });
    api_index.taobaoSearchSuggest({
      method: "get",
      url: "sug",
      params: {
        code: "utf-8",
        q: this.query
      }
    }).then((resp) => {
      console.log("taobaoSearchSuggestResp", resp.data);
      this.taobaoSearchSuggestResp = resp.data;
    }).catch((err) => {
      console.error("taobaoSearchSuggest error:", err);
      this.taobaoSearchSuggestResp = { error: err.message };
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activeName === "百度新闻" ? 1 : "",
    b: common_vendor.o(($event) => $data.activeName = "百度新闻"),
    c: $data.activeName === "淘宝搜索提示" ? 1 : "",
    d: common_vendor.o(($event) => $data.activeName = "淘宝搜索提示"),
    e: $data.activeName === "百度新闻"
  }, $data.activeName === "百度新闻" ? {
    f: common_vendor.o(($event) => $options.getBaiduNews())
  } : {}, {
    g: $data.activeName === "淘宝搜索提示"
  }, $data.activeName === "淘宝搜索提示" ? common_vendor.e({
    h: $data.query,
    i: common_vendor.o(($event) => $data.query = $event.detail.value),
    j: $data.query
  }, $data.query ? {
    k: common_vendor.o(($event) => $data.query = "")
  } : {}, {
    l: common_vendor.o(($event) => $options.getTaobaoSearchSuggest())
  }) : {}, {
    m: $data.dialogVisible
  }, $data.dialogVisible ? {
    n: common_vendor.t($data.dialogTitle),
    o: common_vendor.t($options.resultCount),
    p: common_vendor.f($data.tableHeaders, (header, idx, i0) => {
      return {
        a: common_vendor.t(header.label),
        b: idx
      };
    }),
    q: common_vendor.f($data.tableData, (row, rowIdx, i0) => {
      return {
        a: common_vendor.f($data.tableHeaders, (header, colIdx, i1) => {
          return common_vendor.e({
            a: header.key === "url"
          }, header.key === "url" ? {
            b: common_vendor.o(($event) => $options.openLink(row[header.key]))
          } : {
            c: common_vendor.t(row[header.key])
          }, {
            d: colIdx
          });
        }),
        b: rowIdx,
        c: rowIdx % 2 === 1 ? 1 : ""
      };
    }),
    r: common_vendor.t($data.jsonContent),
    s: common_vendor.o(($event) => $data.dialogVisible = false),
    t: common_vendor.o(() => {
    }),
    v: common_vendor.o(($event) => $data.dialogVisible = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db407d6b"], ["__file", "D:/web/build-uniapp/src/pages/test-api/index.vue"]]);
tt.createPage(MiniProgramPage);
