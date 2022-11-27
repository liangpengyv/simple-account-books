<h1 align="center">简易记账本</h1>

<p align="center">
  <a href="https://github.com/liangpengyv/simple-account-books/actions/workflows/test.yml"><img src="https://img.shields.io/github/workflow/status/liangpengyv/simple-account-books/Test?logo=github" alt="GitHub Workflow Status"></a>
  <a href="https://nodejs.org/zh-cn/download/releases/"><img src="https://img.shields.io/badge/node-%3E%3D%2014.18.0-brightgreen.svg?logo=nodedotjs" alt="Minimum node version"></a>
  <a href="https://cn.vuejs.org/"><img src="https://img.shields.io/badge/vue-%3E%3D%203.2.0-brightgreen.svg?logo=vuedotjs" alt="Vue.js"></a>
  <a href="https://standardjs.com/readme-zhcn.html"><img src="https://img.shields.io/badge/eslint-standard-brightgreen.svg?logo=eslint" alt="JavaScript Style Guide"></a>
</p>

<br>

<img align="right" style="width: 320px; margin-top: 24px;" src="https://simple-account-books.laoliang.ink/images/demo.gif" alt="demo">


<h2><a href="https://github.com/xmindltd/hiring/blob/master/frontend-1/README.md">👆 XMind 前端面试大作业</a></h2>
<h3 style="text-indent: 2em;"><a href="https://simple-account-books.laoliang.ink">▶️ 在线预览</a></h3>
<h3 style="text-indent: 2em;"><a href="https://resume.laoliang.ink">📄 我的简历</a></h3>

<br><br>

- [一、介绍](#一介绍)
  - [1.1 功能特性](#11-功能特性)
    - [1.1.1 模块速览](#111-模块速览)
    - [1.1.2 一些加花](#112-一些加花)
  - [1.2 实现过程](#12-实现过程)
    - [1.2.1 技术选型](#121-技术选型)
    - [1.2.2 项目搭建](#122-项目搭建)
    - [1.2.3 必要的测试](#123-必要的测试)
    - [1.2.4 产物优化](#124-产物优化)
    - [1.2.5 CI/CD](#125-cicd)
    - [1.2.6 问题与解决方案](#126-问题与解决方案)
- [二、运行](#二运行)
  - [2.1 环境准备](#21-环境准备)
  - [2.2 开始](#22-开始)
  - [2.3 构建](#23-构建)
  - [2.4 测试](#24-测试)

<br><br>

## 一、介绍

### 1.1 功能特性

#### 1.1.1 模块速览

- 账单列表展示
- 月份筛选
- 添加账单
- 所选月份收入和支出总额
- 对分类二次筛选
- 所选月份账单分类统计排序

#### 1.1.2 一些加花

- 首屏 Loading
- 路由过渡动画
- 主题跟随系统

### 1.2 实现过程

#### 1.2.1 技术选型

- 需求分析
- Vue3

#### 1.2.2 项目搭建

- 模块划分
- 公共封装
- 代码规范

#### 1.2.3 必要的测试

- 单元测试：vitest
- e2e 测试：Playwright

#### 1.2.4 产物优化

- 三方组件按需引入
- 路由懒加载
- chunk 分片

#### 1.2.5 CI/CD

- GitHub Action 自动运行测试
- AWS Amplify 自动构建部署

#### 1.2.6 问题与解决方案

- package-lock.json 版本控制冲突问题
- VSCode 格式化代码与 ESLint 规则冲突问题

## 二、运行

### 2.1 环境准备

- node（注：>= 14.18.0）
- npm

### 2.2 开始

- git clone
- cd simple-account-books
- npm install
- npm run dev

### 2.3 构建

- npm run build
- npm run preview

### 2.4 测试

- npm run test
- npm run test:unit
- npm run test:unit:watch
- npm run test:e2e
- npm run test:e2e:headed