'use client';
import { create } from 'zustand';
import { contracts, customers, properties, revenues, tasks } from '@/lib/mock-data';
import type { Contract, Customer, OfficeTask, Property, Revenue } from '@/lib/types';
type Store={properties:Property[];customers:Customer[];contracts:Contract[];tasks:OfficeTask[];revenues:Revenue[]; addProperty:(p:Property)=>void; updateProperty:(p:Property)=>void; deleteProperty:(id:string)=>void; addCustomer:(c:Customer)=>void; updateCustomer:(c:Customer)=>void; deleteCustomer:(id:string)=>void;};
const load=<T,>(key:string,fallback:T):T=>{ if(typeof window==='undefined') return fallback; const raw=localStorage.getItem(key); return raw?JSON.parse(raw):fallback; };
const save=(key:string,value:unknown)=>{ if(typeof window!=='undefined') localStorage.setItem(key,JSON.stringify(value)); };
export const useDashboardStore=create<Store>((set,get)=>({
 properties:load('land3-properties',properties), customers:load('land3-customers',customers), contracts:load('land3-contracts',contracts), tasks:load('land3-tasks',tasks), revenues,
 addProperty:(p)=>set(s=>{const v=[p,...s.properties]; save('land3-properties',v); return {properties:v};}), updateProperty:(p)=>set(s=>{const v=s.properties.map(x=>x.id===p.id?p:x); save('land3-properties',v); return {properties:v};}), deleteProperty:(id)=>set(s=>{const v=s.properties.filter(x=>x.id!==id); save('land3-properties',v); return {properties:v};}),
 addCustomer:(c)=>set(s=>{const v=[c,...s.customers]; save('land3-customers',v); return {customers:v};}), updateCustomer:(c)=>set(s=>{const v=s.customers.map(x=>x.id===c.id?c:x); save('land3-customers',v); return {customers:v};}), deleteCustomer:(id)=>set(s=>{const v=s.customers.filter(x=>x.id!==id); save('land3-customers',v); return {customers:v};})
}));
