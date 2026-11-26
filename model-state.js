import {supportedBackupKeys} from './viewpoints.js?v=models25';
export const recordKey=r=>String(r.tag||'').trim().toUpperCase()+'|'+(r.deck||'');
const compatible=(a,b)=>a.group==='equipment'?b.group==='equipment':a.group==='support'||a.group==='tray_support'?b.group==='support'||b.group==='tray_support':false;
export function savedRecord(item,saved){const exact=saved.byId.get(item.id);if(exact&&compatible(item,exact))return exact;for(const tag of [item.tag,...item.aliases||[]]){const hit=saved.byTag.get(recordKey({...item,tag}));if(hit&&compatible(item,hit))return hit;}return undefined;}
export function restoreRows(data,backup){
 const keys=supportedBackupKeys(data.source,data.revision||data.exported||data.items.length,data.previousRevisions||data.previousRevision);
 for(const source of data.migrateSources||[])for(const [key,value]of Object.entries(backup))if(key.startsWith(source+'|'))keys.push(key);
 const snapshots=[...new Set(keys)].map(k=>({key:k,...backup[k]})).filter(s=>Array.isArray(s.rows));
 const byId=new Map(),tagCandidates=new Map(),cables=[];
 for(const snapshot of snapshots){for(const r of snapshot.rows){if(r.group==='cable'){if(!cables.some(x=>x.id===r.id))cables.push(r);continue;}if(!byId.has(r.id))byId.set(r.id,r);const key=recordKey(r);if(!tagCandidates.has(key))tagCandidates.set(key,new Map());const candidates=tagCandidates.get(key);if(!candidates.has(r.id))candidates.set(r.id,r);}}
 const byTag=new Map();for(const [key,candidates]of tagCandidates)if(candidates.size===1)byTag.set(key,[...candidates.values()][0]);
 return {byId,byTag,cables};
}
