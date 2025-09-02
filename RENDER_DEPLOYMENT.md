# Render 部署指南

## 项目概述
这是一个基于 Next.js 15 的邮件管理系统，支持多账号管理、实时邮件同步、缓存优化等功能。

## 部署前准备

### 1. 环境要求
- Node.js 18+ 
- SQLite 数据库
- Render.com 账户

### 2. 项目配置
项目已配置为生产环境，包含以下优化：
- ✅ 数据库路径统一配置
- ✅ 邮件内容溢出修复
- ✅ 下拉框定位修复
- ✅ 10秒自动刷新缓存优化
- ✅ 默认邮件账号预配置

## Render 部署步骤

### 方法一：通过 Render.yaml 自动部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Configure for Render deployment"
   git push origin main
   ```

2. **在 Render.com 创建新服务**
   - 登录 [Render.com](https://render.com)
   - 点击 "New +" → "Web Service"
   - 选择你的 GitHub 仓库
   - Render 会自动检测 `render.yaml` 配置文件
   - 点击 "Create Web Service"

### 方法二：手动配置

1. **创建 Web Service**
   - 在 Render 控制台点击 "New +" → "Web Service"
   - 连接你的 GitHub 仓库
   - 配置以下设置：

2. **环境变量设置**
   在 "Environment" 标签页添加：
   ```env
   NODE_ENV=production
   DATABASE_URL=file:./db/custom.db
   ```

3. **构建命令**
   ```bash
   npm run build
   ```

4. **启动命令**
   ```bash
   npm start
   ```

5. **健康检查配置**
   - 路径：`/api/health`
   - 初始延迟：30秒
   - 检查间隔：10秒
   - 超时时间：5秒

## 部署后配置

### 1. 初始化邮件账号
部署完成后，访问以下端点初始化默认邮件账号：

```bash
curl -X POST https://your-service-name.onrender.com/api/init
```

这将添加以下预配置的邮件账号：
- Steven@HH.email.cn
- 18@HH.email.cn
- 168@HH.email.cn
- 1688@HH.email.cn
- BOSS@HH.email.cn
- support@HH.email.cn
- 99@HH.email.cn
- 520@HH.email.cn

### 2. 验证部署
访问以下端点检查服务状态：
```bash
curl https://your-service-name.onrender.com/api/health
```

## 功能特性

### 🚀 性能优化
- **智能缓存系统**：避免重复加载邮件，仅同步新邮件
- **10秒自动刷新**：自动获取最新邮件，不重新渲染整个页面
- **内存数据库**：使用 SQLite 提供快速数据访问

### 📧 邮件管理
- **多账号支持**：同时管理多个邮箱账号
- **实时同步**：自动从 IMAP 服务器同步邮件
- **智能搜索**：支持按主题、发件人、内容搜索
- **邮件分类**：收件箱、已发送、草稿等文件夹管理

### 🎨 用户体验
- **响应式设计**：适配桌面和移动设备
- **内容溢出处理**：长邮件内容自动滚动，不影响布局
- **下拉框优化**：修复了定位和层级问题
- **新邮件通知**：可选的桌面通知功能

## 故障排除

### 常见问题

1. **数据库连接错误**
   - 检查 `DATABASE_URL` 环境变量是否正确
   - 确保数据库文件路径有写权限

2. **邮件同步失败**
   - 验证邮件账号配置是否正确
   - 检查 IMAP/SMTP 服务器设置
   - 确认网络连接正常

3. **页面加载缓慢**
   - 检查缓存系统是否正常工作
   - 验证自动刷新间隔设置

### 日志查看
在 Render 控制台中查看实时日志：
1. 进入你的服务页面
2. 点击 "Logs" 标签
3. 查看错误和调试信息

## 技术栈

- **前端**：Next.js 15, React 19, TypeScript
- **样式**：Tailwind CSS 4, shadcn/ui
- **数据库**：SQLite + Prisma ORM
- **邮件服务**：IMAP/SMTP (nodemailer, mailparser)
- **缓存**：内存缓存系统
- **部署**：Render.com

## 支持联系

如遇部署问题，请检查：
1. Render 服务状态
2. 环境变量配置
3. 构建日志
4. 应用运行日志

项目已针对生产环境优化，应该能够稳定运行在 Render 平台上。