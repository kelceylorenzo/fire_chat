import React from 'react';
import Chat from './chat';
import Lobby from './lobby';

import 'materialize-css/dist/css/materialize.min.css';

const App = () => (
	<div className="container">
		<h1 className="center-align">Campfire ⛺️🔥 Chat</h1>
		<Lobby />
	</div>
);

export default App;
