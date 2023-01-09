import React, { useState, useEffect } from 'react';

const App = () => {
	return (
		<div>
			<HookSwitcher />
			<Notification />
		</div>
	)
}

const HookSwitcher = () => {

	const [ color, setColor ] = useState('gray');
	const [ fontSize, setFontSize ] = useState(14);

	return (
		<div style={{ padding: '10px',
			backgroundColor: color,
			fontSize: `${fontSize}px` }}>
			Hello World
			<button
				onClick={() => setColor('gray')}>
				Dark
			</button>
			<button
				onClick={() => setColor('white')}>
				Light
			</button>
			<button
				onClick={() => setFontSize((size) => size + 2)}>
				+
			</button>
		</div>
	);
};

const Notification = () => {
	const [ visibility, setVisibility] = useState(true);

	useEffect(() => {
		// ... combination between componentDidMount and componentDidUpdate
	})

	useEffect(() => {
		// ... componentDidMount
	}, [])

	useEffect(() => {
		// ... componentDidUpdate
	}, [visibility])

	useEffect(() => {
		const timeOut = setTimeout(() => setVisibility(false),1500 ); // componentDidMount
		return () => clearTimeout(timeOut); // componentWillUnmount
	}, [])

	return (
		<div>
			{ visibility && <span>hello</span> }
		</div>
	)
}

export default App;