import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_YEAR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const BirthYearForm = () => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [updateAuthor] = useMutation(SET_YEAR, {
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
	})

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
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
				name<input
					value={name}
					onChange={({ target }) => setName(target.value)}
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