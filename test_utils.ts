
type SplitwiseInputPayees = {[payee: string]: number};

export interface SplitwiseInputItem {
	paidBy: string;
	paidFor: SplitwiseInputPayees;
}

function round(amount: number, decimals: number): number {
	const val = Math.pow(10, decimals)
	return Math.round(amount * val) / val;
}

function checkAmounts<T>(amount: number, amount1: number, decimals: number, targetBit = "==="): T {
	amount = round(amount, decimals);
	amount1 = round(amount1, decimals);

	const res: T = eval(`${amount} ${targetBit} ${amount1}`);

	return res;
}

export function doTheTest(reparts: [string, string, number][], inputs: SplitwiseInputItem[]) {
	const getSumOwedFor = (getFor: string, wereOwed = true): number => {
		return reparts.filter(([pfrom, pto, _pamount]: [string, string, number]) => {
			return wereOwed ? pto === getFor : pfrom === getFor;
		}).reduce((res: number, [_pfrom, _pto, pamount]: [string, string, number]) => {
			return res + pamount;
		}, 0);
	};

	const users: string[] = inputs.reduce((rf: string[], iff: SplitwiseInputItem) => {
		const taAdd = Object.keys(iff.paidFor).concat([iff.paidBy]);
		return rf.concat(taAdd.filter((tr: string) => rf.indexOf(tr) === -1));
	}, []);
	users.sort();

	for(const user of users) {
		const sortiePoche = inputs.filter((ex: SplitwiseInputItem) => ex.paidBy === user)
			.reduce((res: number, item: SplitwiseInputItem) => {
				const toAd: number = Object.keys(item.paidFor).reduce((rres: number, ramountKey: string) => {
					return rres + item.paidFor[ramountKey]
				}, 0);
				return res + toAd;
			}, 0);

		const totalCost: number = inputs.reduce((res: number, ex: SplitwiseInputItem) => {
			const targ = ex.paidFor[user];
			if(targ) {
				res += targ;
			}

			return res;
		}, 0);

		const eqData = sortiePoche > totalCost
			? [getSumOwedFor(user), sortiePoche - totalCost]
			: [getSumOwedFor(user, false), Math.abs(sortiePoche - totalCost)];

		const eq = checkAmounts(eqData[0], eqData[1], 1);

		if(!eq) {
			if(Math.abs(eqData[0] - eqData[1]) > 1) {
				throw new Error(`Wrong amount check: ${eqData[0]} !== ${eqData[1]}`);
			}
		}
	}
}