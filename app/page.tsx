'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  ShieldAlert,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { ContractVelocityChart, RevenueChart, StageChart, TypePie } from '@/components/charts';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { checklists } from '@/lib/mock-data';
import { formatDate, formatKoreanMoney, formatRent } from '@/lib/format';
import { useDashboardStore } from '@/lib/store/dashboard-store';
import type { Contract, Customer, OfficeTask, Property } from '@/lib/types';

const stages = ['상담', '가계약', '계약서 작성', '계약금 입금', '중도금', '잔금', '입주/명도', '완료'];

const statusTone = (status: string) => {
  if (status.includes('완료') || status === '정상') return 'green';
  if (status.includes('진행') || status === '상담중') return 'blue';
  if (status === '지연' || status === '위험') return 'red';
  if (status === '주의' || status === '보류') return 'yellow';
  return 'gray';
};

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="overflow-auto scrollbar-thin">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>{headers.map((header) => <th key={header} className="whitespace-nowrap px-4 py-3 font-black">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition hover:bg-blue-50/50">
                {row.map((cell, cellIndex) => <td key={cellIndex} className="whitespace-nowrap px-4 py-3 align-middle">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ title, value, detail, tone = 'blue' }: { title: string; value: string; detail: string; tone?: 'blue' | 'navy' | 'red' | 'green' }) {
  const toneClass = {
    blue: 'from-blue-600 to-blue-500',
    navy: 'from-navy-900 to-navy-700',
    red: 'from-red-600 to-rose-500',
    green: 'from-emerald-600 to-teal-500',
  }[tone];

  return (
    <Card className="relative overflow-hidden p-0">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${toneClass}`} />
      <div className="p-5">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-black text-navy-900">{value}</p>
        <p className="mt-2 text-xs font-medium text-slate-500">{detail}</p>
      </div>
    </Card>
  );
}

function PropertyForm() {
  const add = useDashboardStore((state) => state.addProperty);
  const [name, setName] = useState('');

  return (
    <Card>
      <CardTitle sub="빠른 매물 등록">매물 등록 폼</CardTitle>
      <div className="grid gap-3 md:grid-cols-4">
        <input className="rounded-xl border border-slate-200 p-3" placeholder="매물명" value={name} onChange={(event) => setName(event.target.value)} />
        <input className="rounded-xl border border-slate-200 p-3" placeholder="지역" id="p-region" />
        <select className="rounded-xl border border-slate-200 p-3" id="p-type">
          <option>아파트</option><option>오피스텔</option><option>빌라</option><option>상가</option><option>토지</option>
        </select>
        <button
          className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-600/20"
          onClick={() => {
            if (!name) return;
            const property: Property = {
              id: crypto.randomUUID(),
              name,
              type: (document.getElementById('p-type') as HTMLSelectElement).value as Property['type'],
              dealType: '매매',
              region: (document.getElementById('p-region') as HTMLInputElement).value || '서울 관악구',
              address: '상세주소 입력 필요',
              salePrice: 50000,
              maintenanceFee: 0,
              privateArea: 84,
              supplyArea: 100,
              floor: '-',
              direction: '남향',
              parking: true,
              moveInDate: '협의',
              descriptionChecked: false,
              adAllowed: true,
              ownerContact: '010-0000-0000',
              status: '광고중',
              notes: '신규 등록 매물',
              createdAt: '2026-06-22',
            };
            add(property);
            setName('');
          }}
        >
          <Plus className="inline" size={16} /> 등록
        </button>
      </div>
    </Card>
  );
}

function CustomerForm() {
  const add = useDashboardStore((state) => state.addCustomer);
  const [name, setName] = useState('');

  return (
    <Card>
      <CardTitle sub="상담 이후 고객 카드를 생성합니다">고객 등록 폼</CardTitle>
      <div className="grid gap-3 md:grid-cols-4">
        <input className="rounded-xl border border-slate-200 p-3" placeholder="고객명" value={name} onChange={(event) => setName(event.target.value)} />
        <select id="c-type" className="rounded-xl border border-slate-200 p-3">
          <option>매수인</option><option>임차인</option><option>임대인</option><option>투자자</option><option>법인</option>
        </select>
        <input id="c-region" className="rounded-xl border border-slate-200 p-3" placeholder="희망 지역" />
        <button
          className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-600/20"
          onClick={() => {
            if (!name) return;
            const customer: Customer = {
              id: crypto.randomUUID(),
              name,
              type: (document.getElementById('c-type') as HTMLSelectElement).value as Customer['type'],
              phone: '010-0000-0000',
              desiredRegion: (document.getElementById('c-region') as HTMLInputElement).value || '서울 관악구',
              budget: 50000,
              dealType: '매매',
              desiredArea: '84㎡',
              moveInTiming: '협의',
              loanNeeded: false,
              memo: '신규 상담 고객',
              status: '신규',
              source: '방문',
            };
            add(customer);
            setName('');
          }}
        >등록</button>
      </div>
    </Card>
  );
}

function RiskBoard({ contracts }: { contracts: Contract[] }) {
  return (
    <Card className="border-red-100 bg-gradient-to-br from-white to-red-50/50">
      <CardTitle sub="대표가 매일 먼저 확인해야 할 계약 리스크">계약 리스크 센터</CardTitle>
      <div className="space-y-3">
        {contracts.map((contract) => (
          <div key={contract.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-slate-900">{contract.title}</p>
                <p className="mt-1 text-sm text-slate-500">잔금 {formatDate(contract.balanceDate)} · {contract.riskMemo}</p>
              </div>
              <Badge tone={statusTone(contract.riskLevel) as never}>{contract.riskLevel}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 md:grid-cols-4">
              <span className={contract.descriptionDoc ? 'text-emerald-700' : 'font-bold text-red-600'}>확인설명서 {contract.descriptionDoc ? '완료' : '미작성'}</span>
              <span className={contract.registryChecked ? 'text-emerald-700' : 'font-bold text-red-600'}>등기부 {contract.registryChecked ? '확인' : '미확인'}</span>
              <span className={contract.buildingLedgerChecked ? 'text-emerald-700' : 'font-bold text-red-600'}>건축물대장 {contract.buildingLedgerChecked ? '확인' : '미확인'}</span>
              <span className={contract.specialTermsReviewed ? 'text-emerald-700' : 'font-bold text-red-600'}>특약 {contract.specialTermsReviewed ? '검토' : '미검토'}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TodayWorkPanel({ tasks, contracts }: { tasks: OfficeTask[]; contracts: Contract[] }) {
  const urgentTasks = tasks.filter((task) => task.priority === '높음' || task.status === '지연');

  return (
    <Card>
      <CardTitle
        sub="전화·서류·잔금 업무를 시간순으로 확인"
        action={<Badge tone="red">긴급 {urgentTasks.length}</Badge>}
      >오늘 할 일 운영판</CardTitle>
      <div className="grid gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:grid-cols-[110px_1fr_90px_80px] md:items-center">
            <div className="text-sm font-black text-navy-900">{formatDate(task.date)}</div>
            <div>
              <p className="font-bold text-slate-900">{task.title}</p>
              <p className="text-sm text-slate-500">{task.category} · 담당 {task.assignee}</p>
            </div>
            <Badge tone={statusTone(task.status) as never}>{task.status}</Badge>
            <Badge tone={task.priority === '높음' ? 'red' : task.priority === '보통' ? 'yellow' : 'gray'}>{task.priority}</Badge>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-navy-900 p-4 text-white">
        <p className="flex items-center gap-2 text-sm font-bold"><Clock3 size={16} /> 오늘 잔금/계약 체크</p>
        <p className="mt-2 text-sm text-blue-100">잔금 단계 {contracts.filter((contract) => contract.stage === '잔금').length}건, 위험 계약 {contracts.filter((contract) => contract.riskLevel === '위험').length}건을 우선 처리하세요.</p>
      </div>
    </Card>
  );
}

export default function Page() {
  const [active, setActive] = useState('dashboard');
  const [query, setQuery] = useState('');
  const { properties, customers, contracts, tasks, revenues, deleteProperty, deleteCustomer } = useDashboardStore();

  const filteredProperties = properties.filter((property) =>
    [property.name, property.region, property.type, property.dealType, property.status].join(' ').includes(query),
  );

  const propertyRows = filteredProperties.map((property) => [
    <div key="name"><b>{property.name}</b><p className="text-xs text-slate-500">{property.address}</p></div>,
    property.region,
    property.type,
    property.dealType,
    property.dealType === '월세' ? formatRent(property.deposit, property.monthlyRent) : formatKoreanMoney(property.salePrice || property.deposit),
    `${property.privateArea}㎡ / ${property.floor}`,
    <Badge key="status" tone={statusTone(property.status) as never}>{property.status}</Badge>,
    property.descriptionChecked ? <Badge key="doc" tone="green">확인완료</Badge> : <Badge key="doc" tone="red">보완필요</Badge>,
    formatDate(property.createdAt),
    <button key="delete" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" onClick={() => deleteProperty(property.id)}><Trash2 size={16} /></button>,
  ]);

  const customerRows = customers.map((customer) => [
    <div key="name"><b>{customer.name}</b><p className="text-xs text-slate-500">{customer.phone}</p></div>,
    customer.type,
    customer.desiredRegion,
    formatKoreanMoney(customer.budget),
    customer.dealType,
    customer.desiredArea,
    customer.loanNeeded ? <Badge key="loan" tone="yellow">대출필요</Badge> : '불필요',
    <Badge key="status" tone={statusTone(customer.status) as never}>{customer.status}</Badge>,
    <button key="delete" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" onClick={() => deleteCustomer(customer.id)}><Trash2 size={16} /></button>,
  ]);

  const typeData = useMemo(
    () => Object.entries(properties.reduce((acc, property) => ({ ...acc, [property.type]: (acc[property.type] || 0) + 1 }), {} as Record<string, number>)).map(([name, value]) => ({ name, value })),
    [properties],
  );
  const stageData = stages.map((name) => ({ name, count: contracts.filter((contract) => contract.stage === name).length }));
  const riskContracts = contracts.filter((contract) => contract.riskLevel !== '정상');
  const expectedCommission = contracts.reduce((sum, contract) => sum + contract.commission, 0);
  const receivedCommission = revenues.at(-1)?.received ?? 0;

  return (
    <AppShell active={active} onNav={setActive}>
      {active === 'dashboard' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-blue-700 p-6 text-white shadow-soft">
            <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr] xl:items-end">
              <div>
                <p className="text-sm font-bold text-blue-100">대표 업무 브리핑 · 2026.06.22</p>
                <h2 className="mt-2 text-3xl font-black">오늘 처리해야 할 계약 리스크와 매출 흐름을 한 화면에서 확인하세요.</h2>
                <p className="mt-3 max-w-3xl text-sm text-blue-100">잔금, 확인설명서, 등기부, 건축물대장, 특약 검토 상태를 함께 노출해 실제 사무소 아침 회의에 바로 사용할 수 있게 구성했습니다.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{riskContracts.length}</p><p className="text-xs text-blue-100">주의/위험 계약</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{tasks.filter((task) => task.status !== '완료').length}</p><p className="text-xs text-blue-100">미완료 업무</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{formatKoreanMoney(receivedCommission)}</p><p className="text-xs text-blue-100">6월 수령</p></div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <MetricCard title="오늘 상담" value={`${customers.filter((customer) => customer.status === '신규' || customer.status === '상담중').length}명`} detail="신규·상담중 고객" />
            <MetricCard title="신규 매물" value={`${properties.filter((property) => property.createdAt >= '2026-06-10').length}건`} detail="최근 등록/확인 필요" />
            <MetricCard title="진행 계약" value={`${contracts.filter((contract) => contract.stage !== '완료').length}건`} detail="완료 전 계약 전체" tone="navy" />
            <MetricCard title="예상 중개보수" value={formatKoreanMoney(expectedCommission)} detail="진행 계약 기준" tone="green" />
            <MetricCard title="잔금 예정" value={`${contracts.filter((contract) => contract.stage === '잔금').length}건`} detail="서류·입금 확인" tone="red" />
            <MetricCard title="만기 임대차" value="2건" detail="30일 이내 알림" tone="red" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <Card>
              <CardTitle sub="예상 대비 실제 수령 흐름과 월별 변동 추이">월별 매출 파이프라인</CardTitle>
              <RevenueChart data={revenues} />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-blue-50 p-4"><p className="text-xs text-blue-700">6월 예상</p><b>{formatKoreanMoney(revenues.at(-1)?.expected)}</b></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">6월 실제 수령</p><b>{formatKoreanMoney(receivedCommission)}</b></div>
                <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-xs text-emerald-700">계약 건수</p><b>{revenues.at(-1)?.contracts}건</b></div>
              </div>
            </Card>
            <RiskBoard contracts={riskContracts} />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <Card><CardTitle sub="단계별 병목 확인">계약 진행 현황</CardTitle><StageChart data={stageData} /></Card>
            <Card><CardTitle sub="광고·상담 포트폴리오">매물 유형별 비중</CardTitle><TypePie data={typeData} /></Card>
            <Card><CardTitle sub="월별 계약 건수 흐름">계약 성과 추이</CardTitle><ContractVelocityChart data={revenues} /></Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
            <TodayWorkPanel tasks={tasks} contracts={contracts} />
            <Card>
              <CardTitle sub="대표 확인용 핵심 매물만 빠르게 노출">최근 등록 매물</CardTitle>
              <DataTable headers={['매물', '지역', '유형', '거래', '가격', '전용/층', '상태', '확인설명', '등록일', '']} rows={propertyRows.slice(0, 6)} />
            </Card>
          </div>
        </div>
      )}

      {active === 'properties' && (
        <div className="space-y-5">
          <PropertyForm />
          <Card>
            <CardTitle sub="검색·필터·상태 뱃지로 광고/상담/계약진행 매물을 구분합니다">매물 목록</CardTitle>
            <div className="mb-4 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input className="w-full rounded-xl border border-slate-200 py-3 pl-10" placeholder="매물명, 지역, 유형, 상태 검색" value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
              <select className="rounded-xl border border-slate-200 px-3"><option>가격대 전체</option><option>1억 이하</option><option>1억~5억</option><option>5억 이상</option></select>
            </div>
            <DataTable headers={['매물', '지역', '유형', '거래', '가격', '전용/층', '상태', '확인설명', '등록일', '삭제']} rows={propertyRows} />
          </Card>
        </div>
      )}

      {active === 'customers' && <div className="space-y-5"><CustomerForm /><Card><CardTitle>고객 목록</CardTitle><DataTable headers={['고객', '구분', '희망지역', '예산', '거래', '희망면적', '대출', '상태', '삭제']} rows={customerRows} /></Card></div>}

      {active === 'contracts' && (
        <Card>
          <CardTitle sub="위험 요소가 있는 계약은 빨간색/주의 뱃지와 미확인 서류로 표시됩니다">계약 목록</CardTitle>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex justify-between gap-3"><b>{contract.title}</b><Badge tone={statusTone(contract.riskLevel) as never}>{contract.riskLevel}</Badge></div>
                <div className="mt-3 grid gap-2 text-sm md:grid-cols-4"><span>계약일 {formatDate(contract.contractDate)}</span><span>잔금일 {formatDate(contract.balanceDate)}</span><span>거래금액 {formatKoreanMoney(contract.amount)}</span><span>중개보수 {formatKoreanMoney(contract.commission)}</span></div>
                <div className="mt-4 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-blue-600" style={{ width: `${((stages.indexOf(contract.stage) + 1) / stages.length) * 100}%` }} /></div>
                <p className="mt-2 text-sm text-slate-600">현재 단계: {contract.stage} · {contract.riskMemo}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {active === 'schedule' && <Card><CardTitle>일정/할일 관리</CardTitle>{tasks.map((task) => <div key={task.id} className="mb-3 grid rounded-xl border border-slate-200 p-4 md:grid-cols-5"><b>{task.title}</b><span>{formatDate(task.date)}</span><span>{task.category}</span><Badge tone={statusTone(task.status) as never}>{task.status}</Badge><span>중요도 {task.priority}</span></div>)}</Card>}

      {active === 'analytics' && <div className="grid gap-6 xl:grid-cols-2"><Card><CardTitle>월별 예상/실제 중개보수</CardTitle><RevenueChart data={revenues} /></Card><Card><CardTitle>담당자·유입경로 성과</CardTitle><DataTable headers={['구분', '계약', '예상 수수료', '전환율']} rows={[[<span key="ceo" className="flex items-center gap-2"><TrendingUp size={16} />대표</span>, '4건', formatKoreanMoney(1800), '42%'], ['실장', '3건', formatKoreanMoney(1240), '35%'], ['네이버부동산', '5건', formatKoreanMoney(2100), '28%'], ['소개', '2건', formatKoreanMoney(980), '55%']]} /></Card></div>}

      {active === 'documents' && <div className="grid gap-4 md:grid-cols-3">{checklists.map((checklist, index) => <Card key={checklist}><CheckCircle2 className="mb-3 text-blue-600" /><b>{checklist}</b><p className="mt-2 text-sm text-slate-500">실무 계약 전 필수 확인 항목 {index + 6}개</p></Card>)}</div>}

      {active === 'settings' && <Card><CardTitle>설정 화면</CardTitle><div className="space-y-3 text-sm"><p>사무소명, 담당자 권한, 알림 템플릿, 외부 연동 설정을 관리합니다.</p><p className="rounded-xl bg-blue-50 p-4 text-blue-800"><AlertTriangle className="inline" size={16} /> 실제 키는 저장하지 않으며, Supabase/Gmail/Kakao 설정은 .env.example 기준으로 확장됩니다.</p><p className="rounded-xl bg-red-50 p-4 text-red-700"><ShieldAlert className="inline" size={16} /> 개인정보·계약 정보는 추후 Supabase RLS와 감사 로그를 적용할 수 있도록 분리된 도메인 타입으로 관리합니다.</p></div></Card>}
    </AppShell>
  );
}
