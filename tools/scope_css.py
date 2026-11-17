"""CSS 선택자 앞에 범위(.tmd 등)를 붙인다. html/body/:root 는 범위 자체로. drop 목록의 선택자는 버린다."""
import re

def scope(css, sc, drop=()):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out, i = [], 0
    while i < len(css):
        j = css.find('{', i)
        if j < 0: break
        sel = css[i:j].strip()
        if sel.startswith('@media') or sel.startswith('@supports'):
            depth, k = 1, j + 1
            while depth:
                depth += {'{': 1, '}': -1}.get(css[k], 0); k += 1
            out.append(sel + '{' + scope(css[j + 1:k - 1], sc, drop) + '}'); i = k; continue
        k = css.find('}', j); body = css[j + 1:k]; i = k + 1
        if sel.startswith('@'): out.append(sel + '{' + body + '}'); continue
        parts = []
        for p in sel.split(','):
            p = p.strip()
            first = re.split(r'[\s>:.#\[]', p.lstrip('.'), 1)[0]
            if any(re.fullmatch(d, p.split(' ')[0]) for d in drop): continue
            if re.match(r'^(html|body|:root)\b', p): parts.append(re.sub(r'^(html|body|:root)', sc, p))
            elif p == '*': parts.append(f'{sc} *')
            else: parts.append(f'{sc} {p}')
        if parts: out.append(','.join(parts) + '{' + body + '}')
    return '\n'.join(out)
