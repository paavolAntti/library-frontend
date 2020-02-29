import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
	query booksByGenre($genre: String){
		allBooks(genre: $genre) {
			title
			author {
				name
				born
				bookCount
			}
			published
		}
		
	}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`
export const GENRES = gql`
	query {
		allGenres
	}
`

export const CREATE_BOOK = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		){
			title
			author{
				name
			}
			published
			genres
			id
		}
	}
`
export const SET_YEAR = gql`
	mutation updateAuthor($name: String!, $born: Int!) {
		editAuthor(
			name: $name,
			setBornTo: $born
		){
			name
			born
			bookCount
			id
		}
	}
`
export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(
			username: $username,
			password: $password
		){
			value
		}
	}
`

