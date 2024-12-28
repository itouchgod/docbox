import os
from datetime import datetime
import subprocess
import sys

class ChatArchiver:
    def __init__(self, category):
        self.root_dir = os.path.dirname(os.path.abspath(__file__))
        self.base_dir = os.path.join(self.root_dir, category, 'docs')
        os.makedirs(self.base_dir, exist_ok=True)
        # 设置 Git 根目录
        self.git_dir = os.path.dirname(__file__)  # topsir 目录

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
        try:
            # 切换到 Git 根目录
            os.chdir(self.git_dir)
            
            commands = [
                f"git add {file_path}",
                f'git commit -m "docs: 保存对话 - {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}"'
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
    category = sys.argv[1] if len(sys.argv) > 1 else "study"
    archiver = ChatArchiver(category)
    archiver.save_chat()
