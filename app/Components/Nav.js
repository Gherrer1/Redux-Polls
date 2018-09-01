import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav>
			<NavLink exact to='/'>Home</NavLink>
			<NavLink to='/leaderboard'>Leaderboard</NavLink>
			<NavLink to='/add-poll'>Add Poll</NavLink>
		</nav>
	);
}

export default Nav;