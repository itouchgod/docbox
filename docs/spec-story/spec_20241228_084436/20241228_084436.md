---
version: 20241228_084436
created_at: 2024-12-28T08:44:36.375334
---

Assistant

好的，让我帮你设置 Git 集成。我们将创建一个自动化的 Git 工作流：

首先创建一个 Git 集成脚本：
import os
import subprocess
from datetime import datetime

class GitIntegration:
    def __init__(self, repo_path="."):
        self.repo_path = repo_path

    def run_command(self, command):
        """执行 Git 命令"""
        try:
            result = subprocess.run(
                command,
                cwd=self.repo_path,
                shell=True,
                capture_output=True,
                text=True
            )
            if result.returncode != 0:
                print(f"命令执行失败: {result.stderr}")
                return False
            return True
        except Exception as e:
            print(f"执行出错: {str(e)}")
            return False

    def auto_commit(self, message=None):
        """自动提交更改"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        commit_message = message or f"docs: 更新 SpecStory 文档 - {timestamp}"
        
        commands = [
            "git add docs/spec-story/",
            f'git commit -m "{commit_message}"',
            "git push"
        ]
        
        for cmd in commands:
            if not self.run_command(cmd):
                return False
        return True

    def create_branch(self, branch_name):
        """创建新分支"""
        return self.run_command(f"git checkout -b {branch_name}")

    def switch_branch(self, branch_name):
        """切换分支"""
        return self.run_command(f"git checkout {branch_name}")
修改 auto_workflow.py 以集成 Git 功能：
# ... 之前的导入保持不变 ...
from git_integration import GitIntegration

class SpecStoryAutomation:
    def __init__(self):
        self.manager = CursorSpecManager()
        self.git = GitIntegration()
        self.running = True
        self.last_save_time = 0

    def save_content(self):
        """保存当前剪贴板内容并提交到 Git"""
        try:
            current_time = time.time()
            if current_time - self.last_save_time < 1:
                return
                
            content = pyperclip.paste()
            saved_file = self.manager.save_spec(content)
            print(f"\n已保存到: {saved_file}")
            
            # 自动提交到 Git
            if self.git.auto_commit():
                print("已自动提交到 Git 仓库")
            else:
                print("Git 提交失败，请手动检查")
                
            self.last_save_time = current_time
            
        except Exception as e:
            print(f"\n保存失败: {str(e)}")

    def keyboard_listener(self):
        """监听键盘输入"""
        while self.running:
            char = self.get_char()
            if char == 's':  # 保存并提交
                self.save_content()
            elif char == 'p':  # 仅推送到远程
                if self.git.run_command("git push"):
                    print("\n已推送到远程仓库")
            elif char == 'q':  # 退出
                self.running = False
                print("\n正在退出程序...")
                os._exit(0)
创建配置文件：
git:
  auto_commit: true
  auto_push: true
  branch: main
  commit_message_template: "docs: 更新 SpecStory 文档 - {timestamp}"
  paths_to_track:
    - docs/spec-story/
    - scripts/
使用方法：

确保你的项目已经初始化为 Git 仓库：
# 如果还没有初始化 Git
git init

# 添加远程仓库
git remote add origin your-repository-url
运行带有 Git 集成的自动化脚本：
python3 scripts/auto_workflow.py
快捷键说明：
s: 保存内容并自动提交到 Git
p: 手动推送到远程仓库
q: 退出程序
Git 操作流程：
当你按 's' 保存内容时，系统会：
保存内容到文件
自动 git add 新文件
创建带时间戳的提交
自动推送到远程仓库
检查 Git 状态：
# 查看提交历史
git log --oneline

# 查看远程同步状态
git status
需要我帮你：

设置这些脚本和配置文件吗？
解释任何特定部分的实现细节吗？
添加其他 Git 相关的功能吗？