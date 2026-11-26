import {isSupport,supportStages} from './support.js?v=models25';
import {recordInDeck} from './viewpoints.js?v=models25';
export const progressFilters={all:'Tất cả các mốc',pending_fabricated:'Chưa chế tạo',pending_installed:'Chưa lắp đặt',pending_full_welded:'Chưa hàn full',blocked:'Bị vướng'};
export function matchesProgress(r,filter='all'){
 if(filter==='all')return true;
 if(!isSupport(r))return false;
 if(filter==='blocked')return r.blocked===true;
 const field=filter.replace(/^pending_/,'');
 return ['fabricated','installed','full_welded'].includes(field)&&supportStages(r)[field]!==true;
}
export function progressScope(rows,deck='all',group='all'){
 return rows.filter(r=>isSupport(r)&&recordInDeck(r,deck,rows)&&(!isSupport(group)||r.group===group));
}
export function progressCounts(rows,deck='all',group='all'){
 const scope=progressScope(rows,deck,group),counts={};
 for(const key of Object.keys(progressFilters).filter(k=>k!=='all')){
  const data=scope.filter(r=>matchesProgress(r,key));
  counts[key]={count:data.length,unknown:key==='blocked'?0:data.filter(r=>supportStages(r)[key.slice(8)]===null).length};
 }
 return {total:scope.length,counts};
}
