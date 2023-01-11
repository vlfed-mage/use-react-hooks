import React, {useState, useEffect, useLayoutEffect} from 'react';

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
		return () => {
			console.log('componentWillUnmount');
			clearTimeout(timeOut); // componentWillUnmount
		}
	}, []);

	return (
		<div>
			{ visibility && <span>hello</span> }
		</div>
	)
}


const GetData = ({ id }) => {
	let cancelled = false;

	const _url = `https://swapi.dev/api/planets/${ id }`,

	getResource = async (url) => {
		const data = await fetch(url);

		if (!data.ok) {
			throw new Error(`
				Data isn't ok. Status: ${ data.status }
			`)
		}

		return data.json();
	},

	usePlanetInfo = (id) => {
		const [ name, setName ] = useState(null),
		[ loader, setLoader ] = useState(true),

		updateName = (data) => {
			if (!cancelled) {
				setName(data.name);
				setLoader(false);
			}
		};

		useEffect(() => {
			setLoader(true);

			getResource(_url)
				.then( updateName )

			return () => {
				cancelled = true
			}

		}, [id]);

		return {
			name, loader
		};
	},

	{ name, loader } = usePlanetInfo(id);

	return (
		loader
			? <span>loading...</span>
			: <div>
				{ (id && name) && <span> { id } -- { name } </span> }
			</div>
	)
}

export default App;