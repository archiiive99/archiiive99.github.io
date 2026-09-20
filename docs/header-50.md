# Header and interaction improvements, items 51–100

2026-09-21. Continuing the first 50-item readability checklist.

Root causes: theme targets were 36 x 40px; the generic `.button` padding overrode the motion icon button; multiple glass surfaces were nested; the refraction image used expanded default filter bounds.

51. [x] 상단 조작부 높이 56px 통일
52. [x] 아이콘 클릭 영역 44px 확보
53. [x] 테마 버튼 정사각형 복원
54. [x] 재생 버튼 일반 패딩 충돌 제거
55. [x] 상단 아이콘 18px 통일
56. [x] 아이콘 수직 중심 정렬
57. [x] 탐색 항목 균등 너비
58. [x] 탐색 글자 수직 중심 정렬
59. [x] 선택 상태 눌린 밑줄 제거
60. [x] 선택 렌즈 사방 여백 통일
61. [x] 테마·재생 한 조작 그룹 구성
62. [x] 상단 중첩 글래스 제거
63. [x] 이름 버튼 높이 정렬
64. [x] 데스크톱 탐색 바 중앙 정렬
65. [x] 상단 그룹 충돌 방지
66. [x] 태블릿 전환 900px 조정
67. [x] 모바일 탐색 폭 제한
68. [x] 모바일 아이콘 축소 방지
69. [x] 상단 레이블 잘림 방지
70. [x] 안전영역 여백 적용
71. [x] 상단 hover 들썩임 제거
72. [x] 눌림 크기 변화 .98로 완화
73. [x] 상단 굴절 강도 7에서 3으로 축소
74. [x] 굴절 맵 filter bounds를 실제 박스와 일치
75. [x] 상단 배경 대비 안정화
76. [x] 선택·비선택 아이콘 대비 구분
77. [x] 모션 비활성 opacity .65
78. [x] 모션 상태 설명 일치 확인
79. [x] 탐색 선택 렌즈 이동 통일
80. [x] 초기 렌즈 등장 위치 안정화
81. [x] 테마 방향키 조작
82. [x] 필터 방향키 조작
83. [x] Home·End 조작
84. [x] 키보드 포커스 유지
85. [x] 논문 필터 선택 저장
86. [x] 잘못된 필터 값 All 복원
87. [x] 실제 상단 높이 기반 앵커 여백
88. [x] 실제 높이 기반 섹션 판정
89. [x] 리사이즈·폰트 로딩 후 렌즈 재정렬
90. [x] 하단 마지막 탐색 상태 유지
91. [x] 테마 버튼 가로·세로 실측
92. [x] 재생 아이콘 중앙 실측
93. [x] 선택 렌즈 위치 실측
94. [x] 상단 그룹 충돌 검사
95. [x] 320px 전체 상단 확인
96. [x] 900·901px 경계 검사
97. [x] 테마·필터 전환 치수 검사
98. [x] 키보드·저장 복원 회귀
99. [x] 라이트·다크 스크롤 캡처
100. [ ] 배포·체크리스트 기록

## Evidence

- Chromium geometry checks at 320, 390, 768, 900, 901 and 1440px.
- All theme/motion targets: 44 x 44px. Navigation and appearance shell: 56px.
- Icon centering, theme lens position, navigation lens position: 0px error.
- Navigation center: 0px deviation from viewport center. No group collisions or horizontal overflow.
- Arrow/Home/End, filter persistence, invalid saved filter fallback, scroll selection and bottom-of-document selection passed.
- A regression test caught the filter track resizing when bold selection changed. Fixed with a 258px three-column grid; before/after selection dimensions now match exactly.
- Empty 3:4 portrait and grayscale materials retained. No domestic papers reintroduced.
- News copy now explicitly says RSD-BEV was accepted to ICPR 2026; August remains the existing news-entry date, not a verified acceptance-notification date.
- Safari/iPhone hardware verification is not claimed.
