import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginFrom = ({ setToken, show, setPage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [login, result] = useMutation(LOGIN)
	
	useEffect(() => {
		if (result.data) {
			console.log('using effect hook')
			const token = result.data.login.value
			console.log('token', token)
			setToken(token)
			localStorage.setItem('library-user-token', token)
		}
	}, [result.data]) // eslint-disable-line
	const submit = async (event) => {
		event.preventDefault()
		try {
			await login({ variables: {username, password } })
			setUsername('')
			setPassword('')
			setPage('authors')
		} catch (error) {
			console.log('error: ', error.message)
		}
		
	}
	
	if (!show) return null
	return (
		<div>
			<form onSubmit={submit}>
				<div>
					username<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password<input
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default LoginFrom