import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { SET_YEAR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const BirthYearForm = ({ authors }) => {
	const [author, setAuthor] = useState('')
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')
	
	const [updateAuthor] = useMutation(SET_YEAR, {
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
	})

	//const nameOptions = authors.map(a => a = { value: a, label: a } )
	const handleChange = (selectedAuthor) => {
		setAuthor(selectedAuthor)
		setName(selectedAuthor.value)
		console.log('selected author', selectedAuthor)
		console.log('name', name)
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		updateAuthor({
			variables: {
				name,
				born
			}
		})
		setName('')
		setBorn('')
		setAuthor('')
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<Select
						value={author}
						onChange={handleChange}
						options={authors}
					/>
				</div>
				<div>
				born<input
					type='number'
					value={born}
					onChange={({ target }) => setBorn(Number(target.value))}
					/>
				
				</div>
				<div>
					<button type='submit'> update author</button>
				</div>
			</form>
		</div>
	)
}

export default BirthYearForm