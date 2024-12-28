#!/bin/bash
CATEGORY=${1:-study}  # 默认保存到 study 目录
python3 save_chat.py "$CATEGORY"
