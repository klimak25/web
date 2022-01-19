import React from 'react';
import './Table.css';

export default function Table(props) {
	const {onSort,data} = props
	return (
		<table className="table">
			<thead className="table__head">
				<tr className="table__row">
					<th className="table__hight">Дата</th>
					<th className="table__hight table__hight_active" onClick={() => onSort('last_name')}>
						Имя
					</th>
					<th
						className="table__hight table__hight_active"
						onClick={() => onSort('points')}
					>
						Количество
					</th>
					<th
						className="table__hight table__hight_active"
						onClick={() => onSort('distance')}
					>
						Расстояние
					</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{data.map((user) => (
					<tr className="table__row" key={user.id}>
						<td className="table__down">{user.date}</td>
						<td className="table__down">{user.last_name}</td>
						<td className="table__down">{user.points}</td>
						<td className="table__down">{user.distance}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
