export type PropertyType='아파트'|'오피스텔'|'빌라'|'상가'|'사무실'|'토지'|'건물';
export type DealType='매매'|'전세'|'월세';
export type PropertyStatus='광고중'|'상담중'|'계약진행'|'계약완료'|'보류';
export type CustomerType='매수인'|'매도인'|'임차인'|'임대인'|'투자자'|'법인';
export type CustomerStatus='신규'|'상담중'|'매물추천'|'계약검토'|'계약완료'|'보류';
export type ContractStage='상담'|'가계약'|'계약서 작성'|'계약금 입금'|'중도금'|'잔금'|'입주/명도'|'완료';
export type TaskStatus='예정'|'진행중'|'완료'|'지연';
export type Priority='높음'|'보통'|'낮음';
export interface Property { id:string; name:string; type:PropertyType; dealType:DealType; region:string; address:string; deposit?:number; monthlyRent?:number; salePrice?:number; maintenanceFee:number; privateArea:number; supplyArea:number; floor:string; direction:string; parking:boolean; moveInDate:string; descriptionChecked:boolean; adAllowed:boolean; ownerContact:string; status:PropertyStatus; notes:string; createdAt:string; }
export interface Customer { id:string; name:string; type:CustomerType; phone:string; desiredRegion:string; budget:number; dealType:DealType; desiredArea:string; moveInTiming:string; loanNeeded:boolean; memo:string; status:CustomerStatus; source:string; }
export interface Contract { id:string; title:string; propertyId:string; seller:string; buyer:string; contractDate:string; balanceDate:string; amount:number; commission:number; vat:boolean; coBrokerage:boolean; stage:ContractStage; descriptionDoc:boolean; registryChecked:boolean; buildingLedgerChecked:boolean; landUseChecked:boolean; specialTermsReviewed:boolean; riskMemo:string; riskLevel:'정상'|'주의'|'위험'; }
export interface OfficeTask { id:string; title:string; date:string; category:'잔금 예정'|'계약서 작성'|'고객 재연락'|'만기 임대차'|'일반'; status:TaskStatus; priority:Priority; assignee:string; }
export interface Revenue { month:string; expected:number; received:number; contracts:number; }
