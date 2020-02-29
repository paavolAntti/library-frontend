import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, GENRES } from '../queries'


const Books = (props) => {
	const [genre, setGenre] = useState('')
	const [getBooks, result] = useLazyQuery(ALL_BOOKS)
	const genresResult = useQuery(GENRES)
	
	console.log(result)
	useEffect(() => {
		getBooks({ variables: { genre: genre } })
	}, [genre, getBooks])

	if (!props.show || result.loading || !result.data) {
		return null
	}
	console.log('result', result)
	const genres = genresResult.data.allGenres
	const books = result.data.allBooks
	const handleGenre = (selection, event) => {
		event.preventDefault()
		setGenre(selection)
		console.log('genre:', selection)
	}
	  

	return (
		<div>
			<h2>books</h2>

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
				{books.map(a =>
					<tr key={a.title}>
					<td>{a.title}</td>
					<td>{a.author.name}</td>
					<td>{a.published}</td>
					</tr>
				)}
				</tbody>
			</table>
			<div>
				{genres.map(g =>
				<button key={g} onClick={(event) => handleGenre(g, event)}>{g}</button>)}
				<button onClick={(event) => handleGenre('', event)}>all genres</button>
			</div>
			
		</div>
	)
}

export default Books