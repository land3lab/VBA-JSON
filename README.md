# Land3 Real Estate Office Dashboard

대한민국 공인중개사 사무소에서 매물, 고객, 계약, 일정, 매출, 체크리스트를 한 화면에서 관리할 수 있도록 만든 Next.js 기반 업무용 대시보드입니다.

## 주요 기능

- **메인 대시보드**: 오늘 상담 고객, 신규 매물, 진행 계약, 예상 중개보수, 잔금 예정, 만기 임대차 지표 카드
- **매물 관리**: 한국 부동산 실무형 매물 목록, 검색, 상태 뱃지, 빠른 등록, 삭제
- **고객 관리**: 고객 구분, 희망 조건, 예산, 대출 필요 여부, 상태 관리
- **계약 관리**: 상담부터 완료까지 계약 단계 진행률, 잔금일, 중개보수, 위험 뱃지
- **일정/할일 관리**: 잔금 예정, 계약서 작성, 고객 재연락, 만기 임대차 알림
- **매출/성과 분석**: Recharts 기반 월별 예상/실제 중개보수, 담당자/유입경로 성과
- **문서/체크리스트**: 확인설명서, 전세사기 예방, 권리분석 등 실무 체크리스트
- **설정**: 향후 Supabase, Google Calendar, Gmail, Kakao 알림톡 연동을 고려한 설정 영역

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 스타일의 재사용 UI 컴포넌트
- Recharts
- Zustand
- localStorage 임시 데이터 저장

## 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>으로 접속합니다.

## 빌드 확인

```bash
npm run build
```

## 프로젝트 구조

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  app-shell.tsx
  charts.tsx
  ui/
    badge.tsx
    card.tsx
lib/
  format.ts
  mock-data.ts
  types.ts
  utils.ts
  store/dashboard-store.ts
```

## 샘플 데이터

서울 관악구, 동작구, 금천구, 강남구, 영등포구의 아파트, 오피스텔, 빌라, 상가, 사무실, 토지, 건물 매물을 포함합니다. 모든 고객명, 전화번호, 주소 상세값은 실제 개인정보가 아닌 가상 데이터입니다.

## 환경 변수

외부 API는 현재 연동하지 않습니다. 향후 연동 시 `.env.example`을 복사해 `.env.local`을 만들고 실제 키를 입력하세요.
