
function simplifyDebts(transactions){
    var splits = new Array()
    var ntr_map = new Map();
    var idx = 0;
    for(let i in transactions){
        if(!ntr_map.has(transactions[i].paidBy)){
            ntr_map.set(transactions[i].paidBy, 0) // net transactions map
        }
        for(let tr in transactions[i].paidFor){
            if(!ntr_map.has(tr)){
                ntr_map.set(tr, 0) // net transactions map
            }
            ntr_map.set(transactions[i].paidBy, ntr_map.get(transactions[i].paidBy) + transactions[i].paidFor[tr])
            ntr_map.set(tr, ntr_map.get(tr) - transactions[i].paidFor[tr])
        }
    }
    function settleSimilarFigures(){
        let vis = new Map();
        for(let tr1 of ntr_map.keys()){
            vis.set(tr1, 1);
            for(let tr2 of ntr_map.keys()){
                if(!vis.has(tr2) && tr1 != tr2){
                    if(ntr_map.get(tr2) == -ntr_map.get(tr1)){
                        if(ntr_map.get(tr2) > ntr_map.get(tr1)){
                            splits.push(`${tr1} owes ${tr2} ${ntr_map.get(tr2)}`)
                        }else{
                            splits.push(`${tr2} owes ${tr1} ${ntr_map.get(tr1)}`)
                        }
                        ntr_map.set(tr2, 0)
                        ntr_map.set(tr1, 0)
                    }
                }
            }
        }
    }

    function getMaxMinCredit(){
        let max_ob, min_ob, max = Number.MIN_VALUE, min = Number.MAX_VALUE
        for(let tr of ntr_map.keys()){
            if(ntr_map.get(tr) < min){
                min = ntr_map.get(tr)
                min_ob = tr
            }
            if(ntr_map.get(tr) > max){
                max = ntr_map.get(tr)
                max_ob = tr
            }
        }
        return [min_ob, max_ob];
    }
    
    function helper(){
        let minMax = getMaxMinCredit();
        if(minMax[0] == undefined || minMax[1] == undefined) return;
        let min_value = Math.min(-ntr_map.get(minMax[0]), ntr_map.get(minMax[1]));
        ntr_map.set(minMax[0], ntr_map.get(minMax[0]) + min_value);
        ntr_map.set(minMax[1], ntr_map.get(minMax[1]) - min_value);
        let res = `${minMax[0]} owes ${minMax[1]} ${min_value}`;
        splits.push(res)
        helper()
    
    }

    settleSimilarFigures()
    helper()

    return splits;
}

module.exports = simplifyDebts;