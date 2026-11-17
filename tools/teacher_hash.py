#!/usr/bin/env python3
"""교사 모드 확인값 만들기:  python3 tools/teacher_hash.py 99999 이름  → course.json 의 teacherHash 에 넣는다."""
import sys
def fnv(t):
    h = 2166136261
    for ch in t:
        h ^= ord(ch); h = (h * 16777619) & 0xFFFFFFFF
    s, digits = '', '0123456789abcdefghijklmnopqrstuvwxyz'
    while True:
        h, r = divmod(h, 36); s = digits[r] + s
        if not h: return s
print(fnv(f'{sys.argv[1]}|{sys.argv[2]}'))
