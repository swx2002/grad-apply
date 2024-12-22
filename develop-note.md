## 跑起来网站需要：
#### 拉取代码
```bash
git pull
```
#### 切换到main分支(无错误稳定分支)
```bash
git checkout main
```
#### 安装依赖
```bash
npm install
```
#### 设置忽略node_modules
1. 在项目根目录下创建.gitignore文件
```bash
touch .gitignore
```
2. 在.gitignore文件中添加`node_modules`
```bash
node_modules
```
#### 启动项目
```bash
npm run dev
```
# 分支介绍
#### 每个分支的用途
- **main**: 无错误稳定分支
- **develop**: 开发分支
- **ui**: 前端UI分支
- **feature**: 开发新功能分支
- **bugfix**: 修复bug分支

#### 分支建议命名规范
- **main**: main
- **develop**: develop
- **ui**: ui/版本号（当前0.0.0）
    - 改变界面风格的大改动 -> 1.0.0
    - 增加组件ui -> 0.1.0
    - 修复bug -> 0.0.1
- **feature**: feature/功能名称
- **bugfix**: bugfix/bug名称

#### 分支结构说明
```scss
o--o--o--o          (main)
       \
        o--o--o--o--o     (dev)
           |  |   \
           |  |    o--o--o--o--o (ui)
           |  |
           |  o--o--o--o--o (feature)
           |
           o--o--o--o--o (bugfix)
```

# 项目文件夹介绍
#### api

后端api路由  

#### dashboard

路由是/dashboard的页面文件夹，包含layout.tsx和page.tsx，page.tsx是主页面，layout.tsx是布局文件，可以给页面添加统一的样式或脚本

#### ui

组件文件夹，包含各种组件

#### public

放图片等静态资源
#### services

封装与外部环境交互的函数，如发送请求到后端api，连接三方服务等

# 开发规范
#### 文件命名规范
- 文件名使用小写字母，多个单词用-连接

#### 变量命名规范
- 变量名使用小驼峰
