import React, {useState, useEffect, useCallback, useMemo} from 'react';

const App = () => {
	const [ value, setValue ] = useState(1);

	return (
		<div style={{'display': 'grid'}} >
			<HookSwitcher />
			<PlanetInfo id={ value }/>
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


//---------------------------------------------------------

const getResource = async (id) => {
	const data = await fetch(`https://swapi.dev/api/planets/${ id }`);

	if (!data.ok) {
		throw new Error(`
			Data isn't ok. Status: ${ data.status }
		`)
	}

	return data.json();
};

const useRequest = (request) => {
	let cancelled = false;

	const initialState = useMemo(() => ({ // caching
		data: null,
		error: null,
		loading: true
	}), []),

	[ dataState, setDataState ] = useState( initialState ),

	updateData = (data) => {
		!cancelled && setDataState({
			data,
			loading: false,
			error: null
		});
	},

	errorData = (error) => {
		!cancelled && setDataState({
			data: null,
			loading: false,
			error
		});
	};

	useEffect(() => {
		setDataState( initialState );
		request()
			.then( updateData ) // mount
			.catch( errorData )

		return () => {
			cancelled = true // unmount
		}

	}, [ request, initialState ]); // didUpdate

	return dataState;
};

const usePlanetInfo = (id) => {
	const request = useCallback(() => getResource(id), [ id ]);
	return useRequest(request)
};


const PlanetInfo = ({ id }) => {

	const { data, loading, error } = usePlanetInfo(id);

	if (loading) return <span>Loading...</span>;
	if (error) return <span>Something get wrong...</span>;

	return (
		<div>
			<span> { id } -- { data.name } </span>
		</div>
	)
}

export default App;