  
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'



const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS)
	if (!props.show || result.loading) {
		return null
	}

	const authors = result.data.allAuthors
	const authorOptions = authors.map(a => a = {value: a.name, label: a.name})
	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
				<tr>
					<th></th>
					<th>
					born
					</th>
					<th>
					books
					</th>
				</tr>
				{authors.map(a =>
					<tr key={a.name}>
					<td>{a.name}</td>
					<td>{a.born}</td>
					<td>{a.bookCount}</td>
					</tr>
				)}
				</tbody>
			</table>
			<h2>set birthyear</h2>
			<BirthYearForm authors={authorOptions}/>
		</div>
	)
}

export default Authors
