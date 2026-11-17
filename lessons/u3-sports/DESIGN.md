# u3-sports 설계표 — 팀을 승리로! 스포츠 기록 분석 연구원 (교과서 108~115쪽)

원문 기준: 학생용 교과서 PDF(3-2 융합진로 1~8페이지)와 `융합진로_실습(축구팀).ows`(위젯 연결 확인), `players_21.csv`(선수 값)를 직접 보고 작성. 교사용 예시 답·수업용 PPT에만 있는 문구는 넣지 않음.

| 화면 | 쪽 | 내용 | 체험·활동 | 퀴즈 |
|---|---|---|---|---|
| 0 시작 | 108 | 빅데이터 스포츠(오클랜드 아슬레틱스·세이버메트릭스→스탯캐스트), 학습 목표·요소, 문제 발견 | 메모 2(가설·근거, 교과서 인쇄 예 문구 표시), 계획 메모 | – |
| 01 연구원 | 109 | 1990년대 UWIC·2002 월드컵·하는 일 3, 자료 6·7은 글로 | 메모 2(팀 구성 요소·수집 데이터) | 2 |
| 02 수집 | 110 | 실습 개요 표, 4단계 칩, 캐글 3단계, 결측값·주의, 주요 속성 표 | 메모(분석에 쓸 속성) | – |
| 03 처리 | 111 | 엑셀 UTF-8·오렌지 File·Info, 스프레드시트·오렌지 주석, Data Table | `tabs`(Info 4줄 해설) | 1 |
| 04 시각화 | 112~113 | 오렌지 흐름 6위젯·설정 표·카테고리 TIP, 해 보기(다양한 속성) | **`orangeFlow`+진행 칩**, **miniTable+조건 버튼+bars**, **pyrun 1**, 메모 | 2 |
| 05 해석·윤리 | 113 | 4단계 해석, 더 알아보기 2 | `flipCards`(윤리 2), 메모 | 3 |
| 06 마무리 | 114 | 나만의 축구팀 3단계, 포지션 위치 SVG, 성취도 점검 4 | 인라인 SVG, 선발팀 표 메모(12칸), `chips` | – |
| 07 진로 탐색 | 115 | 4직업 설명·필요 역량 | `flipCards`, `vote`, 이유 메모 | 1 |
| 08 마무리 | – | key3, 오늘의 질문, 퀴즈 2, 결과표, 질문폼 `sw-u3-sports`, 메모 모아 보기 | – | 2 |

사용 위젯: orangeFlow 1 · miniTable 2 · bars 1 · pyrun 1 · tabs 1 · flipCards 2 · vote 1 · chips 2 · 메모. 퀴즈 11문항(정답 위치 ①3 ②4 ③4, 정답이 가장 긴 보기 4).

## pyrun 목록
- **spRun** (04): 선수 14명을 딕셔너리 리스트로 만들고(`dict(zip(cols,r))`), `club_position == 'GK' and overall > 85`로 고른 뒤 overall 큰 순서로 정렬해 출력. 출력은 `J. Oblak 91 Right ###########` … `5 명을 골랐어요`(로컬 `python3 -I`로 확인). 「교과서는 오렌지로, 여기서는 기본 파이썬으로」 안내와 「작은 표본이라 결과가 달라요」 안내 포함.

## 커스텀 체험
- 04 「Select Rows → Bar Plot 흉내」: 표 ① 14명 → 조건 버튼(club_position: 조건 없음/GK/ST 또는 CF, overall: 조건 없음/85보다 큼/85 이상) → 표 ③ → 가로 막대(색 = preferred_foot). 처음 상태는 교과서 예인 GK·85보다 큼.
- 06 포지션 위치 SVG: 교과서 114쪽 경기장 그림을 약어 원으로 다시 그림.

## 선수 고른 기준 (제작자가 정함, 값은 players_21.csv 그대로)
`short_name · club_position · overall · age · preferred_foot`. 교과서 예(GK·overall>85, ST/CF·overall≥85, preferred_foot 색 구분)가 모두 보이도록:
- GK 6명: J. Oblak 91, Alisson 90, T. Courtois 89(Left), Ederson 88(Left), W. Szczęsny 87, S. Sirigu 84(85 이하 예).
- ST·CF 6명: R. Lewandowski 91, K. Benzema 89, A. Griezmann 87(Left), D. Mertens 85(「85 이상」과 「85보다 큼」 차이를 보이려고), Iago Aspas 84(Left), A. Vega 69.
- 그 밖 2명: K. De Bruyne(RCM) 91, V. van Dijk(LCB) 90 — 조건에서 빠지는 선수 예.

## 선생님 확인할 점
- **영문 표기**: 교과서 108쪽에 「오클랜드 아슬레틱스(Auckland Athletics)」로 인쇄됨(실제는 Oakland Athletics). 화면에는 한글 이름만 옮기고 영문은 뺌.
- **그림을 글로 옮긴 곳**: 108쪽 야구 중계 화면, 109쪽 [자료 6·7] 사진(→ 한두 문장 설명), 110~113쪽 캡처(→ 위젯 설정 표), 114쪽 경기장 그림(→ SVG), 115쪽 일러스트(생략).
- **114쪽 포지션 묶음**: 공격수(LS·ST·RS·LF·RF·LW·CF·RW) / 미드필더(LAM·CAM·RAM·LM·LCM·CM·RCM·RM·LDM·CDM·RDM) / 수비수(LWB·RWB·LB·LCB·CB·RCB·RB) / GK는 그림의 괄호·색 표시를 보고 옮긴 것. 경계가 다르면 알려 주세요. 약어 뜻(LS 등)은 교과서에 없어 풀어 쓰지 않음.
- **오렌지 설정**: 112쪽 Select Rows 조건은 교과서 그대로(`club_position – is – GK`, `overall – is greater than – 85`). 113쪽 해 보기 예(CF·ST, 85 이상)는 연산자 이름이 그림에 작게 나와 「85 이상」이라고만 표기. `.ows`의 연결(File→Data Table→Feature Statistics, File→Select Rows→Data Table(1)→Bar Plot)과 교과서 그림이 일치함.
- **Bar Plot 색**: 교과서 그림은 두 색(빨강·파랑)이나 어느 색이 Left/Right인지 인쇄돼 있지 않아 화면에서 Right=파랑, Left=빨강으로 직접 정함(범례로 표시).
- 111쪽 Info 해설의 수치(18944 · 72 features 9.0% · target 없음 · 38 meta)는 교과서 그대로. 교과서 110쪽 주요 속성 표의 `Wage-eur`·`overrall` 같은 PPT 오타는 PDF 기준(`wage_eur`·`overall`)으로 씀.
- 115쪽 직업 4개 설명·필요 역량은 학생용 PDF 인쇄문. 「스포츠 기록 분석 연구원」 직업 카드와 109쪽 설명이 겹침.
- pyrun 데이터는 선수 14명뿐이라 오렌지로 18,944명에서 고른 결과와 숫자가 다름(안내함).
- 질문폼 `sw-u3-sports`는 `tools/gen_forms.py`로 forms.json에 등록됨.
