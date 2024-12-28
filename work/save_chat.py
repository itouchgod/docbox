import os
from datetime import datetime
import subprocess

class ChatArchiver:
    def __init__(self):
        self.base_dir = os.path.join(os.path.dirname(__file__), 'docs')
        os.makedirs(self.base_dir, exist_ok=True)

    def save_chat(self, content=None):
        try:
            if content is None:
                content = subprocess.check_output(['pbpaste']).decode('utf-8')
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            chat_file = os.path.join(self.base_dir, f"chat_{timestamp}.md")
            
            with open(chat_file, 'w', encoding='utf-8') as f:
                f.write(f"---\ndate: {datetime.now().isoformat()}\n---\n\n{content}")
            
            print(f"已保存到: {chat_file}")
            
            self._git_backup(chat_file)
            return True
            
        except Exception as e:
            print(f"保存失败: {str(e)}")
            return False

    def _git_backup(self, file_path):
        """Git 备份（只进行本地提交）"""
        try:
            commands = [
                f"git add {file_path}",
                f'git commit -m "docs: 保存对话 - {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}"'
                # 移除 push 命令，由 pushall 统一处理
            ]
            
            for cmd in commands:
                result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                if result.returncode != 0:
                    print(f"Git 操作失败: {result.stderr}")
                    return False
            print("Git 本地提交完成")
            return True
        except Exception as e:
            print(f"Git 提交失败: {str(e)}")
            return False

if __name__ == "__main__":
    archiver = ChatArchiver()
    archiver.save_chat()
