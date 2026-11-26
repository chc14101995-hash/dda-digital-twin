export function recordInDeck(record,deck,records=[]){
 if(!deck||deck==='all')return true;
 if(record.deck)return record.deck===deck;
 if(record.group!=='cable')return false;
 return [record.from,record.to].some(key=>{if(!key)return false;const matches=records.filter(r=>r.group!=='cable'&&(r.id===key||r.tag===key));return matches.length===1&&matches[0].deck===deck;});
}
export function supportedBackupKeys(source,revision,previousRevision){return [source+'|'+revision,...(previousRevision?[source+'|'+previousRevision]:[])];}
