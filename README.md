# sw_life_class — 소프트웨어와 생활 수업 코스웨어

『소프트웨어와 생활』 수업용 코스웨어 사이트. 학기 단위로 운영한다.
사이트: `https://swlifeclass.vercel.app/` · 선생님 목록: `/teacher/` · 진도 현황: `/teacher/progress/`

> 이 저장소는 공개다. **학생 명단·답변·점수, 수행평가 채점 기준 상세와 현장 문항, 정답 해설은 넣지 않는다.**

## 구조

| 경로 | 내용 |
|---|---|
| `course.json` | 학기 운영표 — 차시 순서·번호·제목·쪽·질문폼·상태(`ready` 공개 / `draft` 만드는 중 / `todo` 아직 없음) |
| `lessons/<차시ID>/` | 차시 하나: `lesson.json` · `screens.html` · `quiz.js` · `lesson.js` · `lesson.css`(선택) |
| `framework/` | 모든 차시 공용 틀: 화면 이동·퀴즈·메모, 학번 확인·진도 전송·교사 모드, 복사 방지, 공용 부품 |
| `forms/` | 질문폼 원본(`forms.json`)과 틀(`template.html`) → `/forms/<폼ID>.html` |
| `teacher/` | 선생님 목록(`hub.html`), 진도 현황판(`progress.html`) |
| `assessments/` | 수행평가 아이디어 모음과 학기별 안내 |
| `apps_script/Code.gs` | 진도 수집기(학교 계정 시트에 붙은 Apps Script) 사본 |
| `tools/` | `build.py` 빌드 · `check.py` 점검 · `preview.py` 로컬 미리보기 · `new_course.py` 새 과목 뼈대 |
| `site/` | 빌드 결과(배포되는 폴더). 직접 고치지 않는다 |

## 자주 하는 일

```bash
python3 tools/build.py                 # 전체 빌드 → site/
python3 tools/check.py                 # 배포 전 점검 (오류 0이어야 함)
DS_PEP=http://localhost:8765/pep python3 tools/build.py && python3 tools/preview.py   # 로컬 미리보기
python3 tools/build.py                 # ← 미리보기 뒤 배포 전에는 꼭 DS_PEP 없이 다시 빌드
```
`main`에 push하면 Vercel이 `site/`를 배포한다.

## 규칙
- **주소 = 차시 ID**(`/u1-network/`). 한 번 정하면 바꾸지 않는다. 차시 번호는 `course.json`에만.
- 화면에 일정·평가 일자·차시 번호·사이트 주소를 쓰지 않는다(`check.py`가 잡는다).
- 내용과 용어는 교과서를 따른다. 퀴즈 정답 위치는 고르게, 선택지에 극단어(항상·절대·모든) 피하기.
- 수집기 코드를 고치면 Apps Script에서 **배포 관리 → 수정 → 새 버전**(「새 배포」 금지 — 주소가 바뀜).

자세한 것: [docs/차시_작성_규칙.md](docs/차시_작성_규칙.md) · [docs/학기_시작_체크리스트.md](docs/학기_시작_체크리스트.md) · [docs/새_과목_만들기.md](docs/새_과목_만들기.md)
