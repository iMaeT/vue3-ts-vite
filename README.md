# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 介绍

本项目是一个基于[vue3](https://github.com/vuejs/vue-next)、[typeScript](https://github.com/microsoft/TypeScript)、[Vite](https://cn.vitejs.dev/guide/)、[element-plus](https://github.com/element-plus/element-plus)的后台解决方案，参考了[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)和[vue-element-admin 3.0](https://github.com/kailong321200875/vue-element-admin-webpack)

## 启动方式

cd vamp-100
yarn
yarn dev

## 功能

``` sh
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置

- 功能组件
  - 图表
```

## 前序准备

你需要在本地安装[node](https://nodejs.org/en/)和[git](https://git-scm.com/)。本项目技术栈基于[ES2015+](https://es6.ruanyifeng.com/)、[vue](https://www.vue3js.cn/docs/zh/)、[vuex](https://next.vuex.vuejs.org/)、[vue-router](https://next.router.vuejs.org/)、[Vite](https://cn.vitejs.dev/guide/)、[axios](https://github.com/axios/axios)和[element-plus](https://github.com/element-plus/element-plus)

注意：本项目不支持低版本浏览器(如 ie)，后续会考虑支持IE11。

## 目录结构

``` sh
.

```

## 任务列表[Features]

 -[x] 完成项目基础插件安装
 -[] 配置路由
 -[] 配置权限
