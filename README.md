# chenxin-code.github.io

GitHub Pages 静态站点，用于托管和展示多个前端项目的构建产物。

## 项目列表

| 项目 | 路径 | 技术栈 |
|------|------|--------|
| Vue 2 Demo | [/build-vue2/](https://chenxin-code.github.io/build-vue2/) | Vue 2 + Vue CLI |
| Vue 3 Demo | [/build-vue3/](https://chenxin-code.github.io/build-vue3/) | Vue 3 + Vite |
| React Demo | [/build-react/](https://chenxin-code.github.io/build-react/) | React + Vite |
| UniApp Demo | [/build-uniapp/](https://chenxin-code.github.io/build-uniapp/) | UniApp + Vue 3 |

## 访问方式

所有项目通过 GitHub Pages 部署，可直接通过浏览器访问：

```
https://chenxin-code.github.io/<项目名>/
```

## 更新构建产物

从对应项目复制 `dist` 目录到本仓库：

```bash
cp -r /path/to/project/dist ./<项目名>
```

然后提交并推送到 GitHub，Pages 会自动重新部署。
