import Table from './Table/Table.js';
import TableForm from './TableForm/TableForm';
import Paginator from './Paginator/Paginator';
// import { data } from '../data/data';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [sortData, setSortData] = useState([])

	useEffect(() => {
		fetch("http://localhost:5000/"	)
		  .then(res => res.json())
		  .then(
			(sortData) => {
			  setSortData(sortData);
			},
			
		  )
	  }, [])
	
	
	
	
	
	const [ sortConfig, setSortConfig ] = useState({
		sortDirection: 'ASC',
		sortBox: 'name',
		filterBox: undefined,
		filterLaw: undefined,
		filterArgument: undefined
	});
	const [ renderData, setRenderData ] = useState(sortData);

	const [ pagesConfig, setPagesConfig ] = useState({
		currentPage: 1,
		pageCount: Math.ceil(sortData.length / 20)
	});

	function handleSort(box) {
		if (sortConfig.sortBox === box) {
			if (sortConfig.sortDirection === 'ASC') {
				setSortConfig({ ...sortConfig, sortDirection: 'DESC', sortBox: box });
				return;
			}
		}
		setSortConfig({ ...sortConfig, sortDirection: 'ASC', sortBox: box });
	}

	function onFilterSubmit(config) {
		console.log(config);
		setSortConfig({
			...sortConfig,
			filterBox: config.name,
			filterLaw: config.law,
			filterArgument: config.argument
		});
	}

	function onResetHandle() {
		setSortData([ ...sortData ]);
		setPagesConfig({ ...pagesConfig, currentPage: 1 });
	}

	function onChoosePageHandler(page) {
		setPagesConfig({ ...pagesConfig, currentPage: page });
	}
	

	useEffect(
		() => {
			console.log(sortData)
			if (sortConfig.sortBox === 'last_name') {
				sortConfig.sortDirection === 'ASC'
					? setSortData([ ...sortData.sort((a, b) => (a.last_name > b.last_name ? 1 : -1)) ])
					: setSortData([ ...sortData.sort((a, b) => (a.last_name < b.last_name ? 1 : -1)) ]);
			}
			if (sortConfig.sortBox === 'points') {
				sortConfig.sortDirection === 'ASC'
					? setSortData([ ...sortData.sort((a, b) => a.points - b.points) ])
					: setSortData([ ...sortData.sort((a, b) => b.points - a.points) ]);
			}
			if (sortConfig.sortBox === 'distance') {
				sortConfig.sortDirection === 'ASC'
					? setSortData([ ...sortData.sort((a, b) => a.distance - b.distance) ])
					: setSortData([ ...sortData.sort((a, b) => b.distance - a.distance) ]);
			}
			if (sortConfig.filterBox && sortConfig.filterLaw && sortConfig.filterArgument) {
				if (sortConfig.filterBox === 'name') {
					if (sortConfig.filterLaw === 'equal')
						setSortData([
							...sortData.filter((e) => e.last_name === sortConfig.filterArgument)
						]);
					if (sortConfig.filterLaw === 'contain')
						setSortData([
							...sortData.filter((e) => e.last_name.includes(sortConfig.filterArgument))
						]);
					if (sortConfig.filterLaw === 'greater')
						setSortData([
							...sortData.filter((e) => e.last_name.length > sortConfig.filterArgument)
						]);
					if (sortConfig.filterLaw === 'less')
						setSortData([
							...sortData.filter((e) => e.last_name.length < sortConfig.filterArgument)
						]);
				}
				if (sortConfig.filterBox === 'points') {
					if (sortConfig.filterLaw === 'equal')
						setSortData([
							...sortData.filter(
								(e) => e.points === Number(sortConfig.filterArgument)
							)
						]);
					if (sortConfig.filterLaw === 'contain')
						setSortData([
							...sortData.filter((e) =>
								e.points.toString().includes(sortConfig.filterArgument)
							)
						]);
					if (sortConfig.filterLaw === 'greater')
						setSortData([
							...sortData.filter((e) => e.points > Number(sortConfig.filterArgument))
						]);
					if (sortConfig.filterLaw === 'less')
						setSortData([
							...sortData.filter((e) => e.points < Number(sortConfig.filterArgument))
						]);
				}
				if (sortConfig.filterBox === 'distance') {
					if (sortConfig.filterLaw === 'equal')
						setSortData([
							...sortData.filter(
								(e) => e.distance === Number(sortConfig.filterArgument)
							)
						]);
					if (sortConfig.filterLaw === 'contain')
						setSortData([
							...sortData.filter((e) =>
								e.distance.toString().includes(sortConfig.filterArgument)
							)
						]);
					if (sortConfig.filterLaw === 'greater')
						setSortData([
							...sortData.filter(
								(e) => e.distance > Number(sortConfig.filterArgument)
							)
						]);
					if (sortConfig.filterLaw === 'less')
						setSortData([
							...sortData.filter(
								(e) => e.distance < Number(sortConfig.filterArgument)
							)
						]);
				}
			}
		},
		[ sortConfig ]
	);

	useEffect(
		() => {
			setPagesConfig({ ...pagesConfig, pageCount: Math.ceil(sortData.length / 5) });
		},
		[ sortData ]
	);

	useEffect(
		() => {
			setRenderData(
				sortData.slice(
					pagesConfig.currentPage === 1
						? pagesConfig.currentPage - 1
						: (pagesConfig.currentPage - 1) * 5,
					pagesConfig.currentPage * 5
				)
			);
		},
		[ pagesConfig, sortData ]
	);

	return (

		<div className="root">
			<div className="page">
				<h1 className="page__title">Таблица рекордов</h1>

				<TableForm filterSubmit={onFilterSubmit} onReset={onResetHandle} />
				<Table  data={renderData} onSort={handleSort} />
				<Paginator
					currentPage={pagesConfig.currentPage}
					pageCount={pagesConfig.pageCount}
					onChoosePage={onChoosePageHandler}
				/>
			</div>
		</div>
	);
}

export default App;
