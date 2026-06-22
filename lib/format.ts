export function formatKoreanMoney(value?: number) { if (!value) return '-'; const eok = Math.floor(value / 10000); const man = value % 10000; if (eok && man) return `${eok}억 ${man.toLocaleString('ko-KR')}만원`; if (eok) return `${eok}억원`; return `${man.toLocaleString('ko-KR')}만원`; }
export function formatRent(deposit?: number, rent?: number) { return rent ? `${(deposit ?? 0).toLocaleString('ko-KR')}/${rent.toLocaleString('ko-KR')}` : formatKoreanMoney(deposit); }
export function formatDate(date: string) { return date.replaceAll('-', '.'); }
