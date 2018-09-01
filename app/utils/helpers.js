export function isObject(item) {
	return Object.prototype.toString.call(item) === '[object Object]';
}

export function getPercentage(count, total) {
	return total === 0 ? 0 : parseInt(count / total * 100, 10);
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

export function isMe(user) {
	return user.id === 'tylermcginnis';
}

export function isNotMe(user) {
	return !isMe(user);
}
