export function isObject(item) {
	return Object.prototype.toString.call(item) === '[object Object]';
}

export function getPercentage(count, total) {
	return total === 0 ? 0 : parseInt(count / total * 100, 10);
}

export function getTotalVotes(poll) {
	return ['a', 'b', 'c', 'd'].reduce((sum, currentKey) => poll[`${currentKey}Votes`].length + sum, 0);
}

export function iveAnswered(poll) {
	const me = 'tylermcginnis';
	const {
		aVotes, bVotes, cVotes, dVotes,
	} = poll;
	const retVal = aVotes.includes(me)
		|| bVotes.includes(me) || cVotes.includes(me) || dVotes.includes(me);
	return retVal;
}

export function isMyAnswer(poll, optionKey) {
	return poll[`${optionKey}Votes`].includes('tylermcginnis');
}

export function isMe(user) {
	return user.id === 'tylermcginnis';
}

export function isNotMe(user) {
	return !isMe(user);
}
