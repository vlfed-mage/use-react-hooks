import React, { useState, useEffect } from 'react';

const App = () => {
	const [ value, setValue ] = useState(1);

	return (
		<div style={{'display': 'grid'}} >
			<HookSwitcher />
			<GetData id={ value }/>
			<button
				type='button'
				onClick={ () => setValue((v) => v + 1) }>
				+
			</button>
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


const GetData = ({ id }) => {

	const [ name, setName ] = useState(null),
		  [ loader, setLoader ] = useState(true),

	_url = `https://swapi.dev/api/planets/${ id }`,

	getResource = async (url) => {
		const data = await fetch(url);

		if (!data.ok) {
			throw new Error(`
				Data isn't ok. Status: ${ data.status }
			`)
		}

		return data.json();
	},

	updateName = (data) => {
		setName(data.name);
		setLoader(false);
	}

	useEffect(() => {
		let cancelled = false;
		setLoader(true);

		getResource(_url)
			.then( !cancelled && updateName )

		return () => cancelled = true

	}, [id]);

	return (
		loader
			? <span>loading...</span>
			: <div>
				{ (id && name) && <span> { id } -- { name } </span> }
			</div>
	)
}

export default App;