import React, { useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'


const Recommendations = (props) => {
	const [getBooks, result] = useLazyQuery(ALL_BOOKS)
	
	useEffect(() => {
		getBooks({ variables: { genre: props.genre } })
	}, [props.genre, getBooks])

	if (!props.show || !props.genre || !result.data) return null
	console.log('current user favorite genre:', props.genre)
	console.log(result.data)
	const books = result.data.allBooks

	return (
		<div>
			<h2>recommendations</h2>
			<p>books in your favorite genre <b>{props.genre}</b></p>
			<table>
				<tbody>
				<tr>
					<th></th>
					<th>
					author
					</th>
					<th>
					published
					</th>
				</tr>
				{books.map(b =>
					<tr key={b.title}>
					<td>{b.title}</td>
					<td>{b.author.name}</td>
					<td>{b.published}</td>
					</tr>
				)}
				</tbody>
			</table>
		</div>
	)
}

export default Recommendations