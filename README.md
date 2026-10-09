# MotionWall

MotionWall 是一个适配手机、平板和电脑的动态壁纸网站，支持壁纸搜索、分类筛选、在线预览和下载，计划收录 1400 条动态壁纸资源。

## 项目特点

- 适配移动端、平板端和桌面端
- 壁纸搜索与分类筛选
- 在线预览与一键下载
- 静态网站结构，便于部署到 GitHub Pages
- 适合继续扩展更多壁纸数据与动画效果

## 目录结构

```text
motionwall/
├── index.html
├── styles.css
├── script.js
├── wallpapers.json
├── README.md
└── assets/
    └── （后续可扩展图片、脚本和样式文件）
```

## 本地预览

在仓库根目录运行：

```bash
python -m http.server 8000
```

然后在浏览器访问：

```text
http://localhost:8000
```

## GitHub Pages 部署

1. 打开 GitHub 仓库页面
2. 进入 Settings -> Pages
3. 选择 Source：Deploy from a branch
4. 选择 Branch：main
5. Folder：/(root)
6. 保存并等待部署完成

## 当前页面说明

当前演示页包含：

- Hero 区展示与品牌设计
- 热门分类和搜索输入框
- 壁纸卡片列表
- 预览弹窗和下载入口
- 统一的深色赛博风视觉风格

## 后续扩展建议

如果你愿意，我可以继续为你补充：

- 更完整的壁纸分类页
- 详情页
- 收藏与下载记录功能
- 更真实的动态壁纸视频/GIF 资源
- 更适合 GitHub Pages 的优化结构
