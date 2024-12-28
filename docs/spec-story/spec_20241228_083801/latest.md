---
version: 20241228_083801
created_at: 2024-12-28T08:38:01.877941
---

Assistant

好的，我来整理一下完整的使用说明：

SpecStory 自动保存工具使用指南
1. 环境设置
# 1. 创建并激活虚拟环境
python3 -m venv cursor_env
source cursor_env/bin/activate

# 2. 安装必要的包
pip install pyperclip
2. 目录结构
your-project/
├── scripts/
│   ├── auto_workflow.py      # 自动化脚本
│   └── cursor_spec_manager.py # 管理器脚本
└── docs/
    └── spec-story/          # 保存的文档目录
3. 使用方法
启动工具
# 1. 激活虚拟环境（如果还没激活）
source cursor_env/bin/activate

# 2. 运行自动化脚本
python3 scripts/auto_workflow.py
日常操作流程
复制需要保存的内容（Cmd+C）
按 's' 键保存内容
系统会自动将内容保存到 docs/spec-story 目录下
按 'q' 键退出程序
保存的文件结构
docs/spec-story/
├── spec_[timestamp]/
│   ├── [timestamp].md      # 具体版本
│   ├── latest.md          # 最新版本
│   └── versions.json      # 版本记录
4. 文件说明
每次保存会创建一个新的时间戳文件
latest.md 始终保存最新版本
versions.json 记录所有版本历史
5. 快捷键说明
s: 保存当前剪贴板内容
q: 退出程序
Ctrl+C: 复制内容（系统快捷键）
6. 注意事项
确保在使用前已激活虚拟环境
每次保存会自动创建新的版本文件
所有保存的内容都会带有时间戳
程序会自动创建必要的目录结构
7. 常见问题解决
如果提示 "command not found: pip"，需要先激活虚拟环境
如果保存失败，检查剪贴板是否有内容
如果目录访问错误，检查权限设置
需要我详细解释任何部分吗？或者你想了解更多高级用法？