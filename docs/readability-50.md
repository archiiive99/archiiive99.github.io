# Readability improvement checklist

2026-09-21. Scope: visual readability and interaction only; no publication or career claims changed.

Reading surfaces use full-width neutral translucent bands, not nested or floating section cards. Glass remains on controls. Portrait remains empty.

1. [x] 본문 색 대비 강화
2. [x] 저자명 15px로 확대
3. [x] 날짜 14px로 확대
4. [x] 소속·직함 16px로 확대
5. [x] 논문 설명 16px로 확대
6. [x] 과제 역할 16px·유형 14px로 확대
7. [x] 수상 상세 설명 15px로 확대
8. [x] 배지 13px로 확대
9. [x] 본문 행간 1.75 기준 통일
10. [x] 긴 설명 65–78ch로 제한
11. [x] 섹션 제목·보조 제목 대비 구분
12. [x] 이름·소속·소개 간격 정리
13. [x] 사진과 소개 시작선 정렬
14. [x] 뉴스 날짜·설명 baseline 정렬
15. [x] 뉴스 간격 18px로 확대
16. [x] 논문 제목·저자·설명 간격 통일
17. [x] 본인 저자명 650 weight로 강조
18. [x] 논문 링크 상단 22px 여백 통일
19. [x] 경력 날짜와 직함 시작선 정렬
20. [x] 학력·수상 정보 위계 정리
21. [x] 읽는 영역 뒤 물결 대비 완화
22. [x] 그레인 opacity 0.025/0.022로 축소
23. [x] 전체 폭 반투명 읽기 영역 적용
24. [x] 라이트모드 텍스트 대비 확인
25. [x] 다크모드 텍스트 대비 확인
26. [x] 섹션·행 경계 대비 강화
27. [x] 학회 배지 글자 대비 유지
28. [x] Under Review 상태 구별 유지
29. [x] 버튼 바깥 그림자 얕게 유지
30. [x] 논문 그림 필터 미적용 유지
31. [x] 본문 텍스트 링크 기본 밑줄
32. [x] 링크 hover 밑줄 대비 강화
33. [x] 3px 키보드 포커스
34. [x] 논문 링크 클릭 영역 42px로 확대
35. [x] 선택 필터 600 weight 강조
36. [x] 현재 탐색 위치 안쪽 선 강조
37. [x] 배경 정지 상태 확인
38. [x] 모바일 버튼 간격 10px 확보
39. [x] 모바일 앵커 여백 156px
40. [x] 텍스트 선택 명암 대비 유지
41. [x] 320px 줄바꿈 검증
42. [x] 390px 정렬 검증
43. [x] 768px 태블릿 검증
44. [x] 1440px 데스크톱 검증
45. [x] 다크모드 시각 검증
46. [x] 200% 확대 잘림 검증
47. [x] 키보드 탐색 검증
48. [x] 모션 감소·고대비 검증
49. [x] 사진 3:4 비율·필터 회귀 검증
50. [x] 배포본·커밋 상태 확인

## Verification

- Chromium: 320, 390, 768 and 1440px, light and dark, top and scrolled content screenshots inspected.
- No horizontal overflow, image load errors or JavaScript errors; portrait retains 3:4 ratio.
- Font checks: author 15px, publication description 16px.
- Conservative calculated text contrast against shader/surface bounds: checked text styles at least 5.71:1 light, 7.85:1 dark. This is not a claim of a complete accessibility audit.
- 200% CSS zoom checked; keyboard skip link and 3px focus outline checked.
- Reduced motion and high contrast checked. Playback pause/persistence and theme persistence passed.
- Publication filters: 2026 = 3, earlier = 5, all = 8.
- Safari and physical iPhone testing remain outside this verification.
- Deployment: Pages run `35529382506` succeeded for `5a0929d`; live `styles.css?v=8` is byte-identical to the local stylesheet. Public-page viewport, image, anchor and filter checks passed.
