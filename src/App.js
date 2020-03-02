
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { USER, BOOK_ADDED, } from './queries'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const [genre, setGenre] = useState('')
	const client = useApolloClient()
	const currentUser =  useQuery(USER)

	const logout = (event) => {
		event.preventDefault()
		console.log('logging out')
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}
	
	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			console.log('subscription data:', subscriptionData)
			window.alert(`New book ${addedBook.title} by ${addedBook.author.name} added `)
		}
	})


	return (
		<div>
		<div>
			<button onClick={() => setPage('authors')}>authors</button>
			<button onClick={() => setPage('books')}>books</button>
			{ token && <button onClick={() => setPage('add')}>add book</button> }
			{ !token && <button onClick={() => setPage('login')}>login</button> }
			{ token && <button onClick={ () => {setGenre(currentUser.data.me.favoriteGenre); setPage('recommend')}}>recommend</button>}
			{ token && <button onClick={ () => logout()}>logout</button> }
		</div>

		<Authors
			show={page === 'authors'}
			
		/>

		<Books
			show={page === 'books'}
		/>

		<NewBook
			show={page === 'add'}
		/>
		
		<LoginForm
			show={page === 'login'}
			setToken={setToken}
			setPage={setPage}
		/>
		
		<Recommendations 
			show={page === 'recommend'}
			genre={genre}
		/>
		</div>
	)
}

export default App