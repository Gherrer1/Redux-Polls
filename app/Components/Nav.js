import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className="nav">
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/leaderboard">Leaderboard</NavLink>
				</li>
				<li>
					<NavLink to="/add-poll">Add Poll</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
