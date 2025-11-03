# UI Optimization: Balancing Technology and Human Cognitive Load

人机交互课程项目 - 双版本UI实验

## 项目概述

本项目包含两个UI版本：
- **Optimized-UI**: 优化版，注重减少认知负荷
- **Feature-UI**: 特征密集版（对照组）

实验流程包含6个步骤：
1. S1: 登入与欢迎
2. S2: 目录/检索（信息检索任务）
3. S3: 详情查看（从列表进入目标项详情）
4. S4: 数据录入表单（将检索信息填入结构化表单）
5. S5: 提交与确认（显示确认码）
6. S6: NASA-TLX问卷页

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- MongoDB
- Tailwind CSS
- Vercel部署

## 环境变量

创建 `.env.local` 文件：

```
MONGODB_URI=your_mongodb_connection_string
```

例如：
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ui_experiment
```

## 安装和运行

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问：
- 首页: http://localhost:3000
- 优化版: http://localhost:3000/optimized
- 对照版: http://localhost:3000/feature
- 数据分析: http://localhost:3000/analytics

## 项目结构

```
comp5517_UI_project/
├── app/
│   ├── optimized/          # 优化版UI页面
│   │   ├── page.tsx        # S1: 欢迎页
│   │   ├── search/         # S2: 检索页
│   │   ├── detail/[id]/    # S3: 详情页
│   │   ├── form/           # S4: 表单页
│   │   ├── confirm/        # S5: 确认页
│   │   └── questionnaire/  # S6: 问卷页
│   ├── feature/            # 对照版UI页面（同上结构）
│   ├── analytics/          # 数据分析页面
│   ├── api/
│   │   ├── experiment/     # 保存实验数据API
│   │   └── results/        # 获取实验数据API
│   └── layout.tsx
├── components/
│   └── NASA-TLX.tsx        # NASA-TLX问卷组件
├── lib/
│   ├── mongodb.ts          # MongoDB连接配置
│   └── data.ts             # 模拟数据
├── types/
│   └── index.ts            # TypeScript类型定义
└── package.json
```

## 功能特性

### 优化版 (Optimized-UI)
- 简洁的欢迎卡片
- 精简筛选（基本筛选展开，高级筛选折叠）
- 卡片式列表展示，关键字段突出
- 信息分组清晰，关键信息在上半区
- 分步骤表单（Step 1/2/3），字段内联校验
- 成功卡片突出确认码，一键复制
- 预览摘要功能

### 对照版 (Feature-UI)
- 多信息面板（更新、公告、技巧）
- 多层过滤器全部展开
- 表格型列表，多列与彩色状态
- 完整信息表格同时展示，多彩标签
- 长页表单一次性展示，校验在提交后提示
- 确认信息密集，多个面板
- 高级选项默认可见

### 共享功能
- NASA-TLX问卷（6个维度，0-100滑条评分）
- MongoDB存储实验数据
- 记录开始时间和完成时间
- 数据分析页面（统计对比）
- 响应式设计

## 部署到Vercel

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 设置环境变量 `MONGODB_URI`
4. 部署完成

## 注意事项

- 两版UI使用不同的sessionStorage键值，相互隔离
- 实验数据保存在MongoDB的 `ui_experiment.results` 集合中
- 确认码在问卷提交时由服务器生成并返回
- 所有页面已实现响应式设计，支持移动端访问

