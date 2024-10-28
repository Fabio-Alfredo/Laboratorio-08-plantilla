import { Book } from '../models/book.model.js';
import { BookErrorCodes } from '../utils/errors/book.errorCodes.js';
import { ServiceError } from '../utils/errors/serviceError.js';

export const createBook = async (book) => {
    const newBook = new Book(book);
    try {
        const bookCreated = await newBook.save();
        return bookCreated;
    } catch (error) {
        throw new ServiceError('Error al crear el libro', BookErrorCodes.BOOK_CREATION_FAILED);
    }
}

export const findAllBooks = async () => {
    try {
        const books = await Book.find().populate('authors');
        return books;
    } catch (error) {
        throw new ServiceError('Error al obtener los libros', BookErrorCodes.BOOK_FETCH_FAILED);
    }
}

export const deleteBook = async (id) => {
    try {
        const bookDeleted = await Book.findByIdAndDelete(id);
        if (!bookDeleted) throw new ServiceError('Error al eliminar el libro', BookErrorCodes.BOOK_DELETE_FAILED);
        return bookDeleted;
    } catch (error) {
        throw new ServiceError('Error al eliminar el libro', error.code || BookErrorCodes.BOOK_DELETE_FAILED);
    }
}

export const addAuthorToBook = async (book, authorId) => {
    try {
        const existAuthor = book.authors.find(author => author.toString() === authorId);
        if (existAuthor) throw new ServiceError('El autor ya fue asignado al libro', BookErrorCodes.AUTHOR_ALREADY_ASSIGNED);

        book.authors.push(authorId);
        const bookUpdated = await book.save();
        return bookUpdated;
    } catch (error) {
        throw new ServiceError('Error al asignar el autor al libro', error.code|| BookErrorCodes.AUTHOR_ASSIGN_FAILED);
    }
}

export const findBookByTitle = async (title) => {
    try {
        const book = await Book.findOne({ title });
        return book || null;
    } catch (error) {
        throw new ServiceError('Error al buscar el libro por título', BookErrorCodes.BOOK_FETCH_FAILED);
    }
}

export const findBookById = async (id) => {
    try {
        const book = await Book.findById(id);
        console.log(book);
        if (!book) throw new ServiceError('Libro no encontrado', BookErrorCodes.BOOK_NOT_FOUND);
        return book;
    } catch (error) {
        throw new ServiceError('Error al buscar el libro por ID', error.code || BookErrorCodes.BOOK_FETCH_FAILED);
    }
}

export const deleteAuthorFromBook = async (authorId) => {
    try {
        const updatesBooks = await Book.updateMany({ authors: authorId }, { $pull: { authors: authorId } });
        if (!updatesBooks) throw new ServiceError('Error al eliminar los autores del libro', BookErrorCodes.AUTHOR_REMOVAL_FAILED);
        return updatesBooks;
    } catch (error) {
        throw new ServiceError('Error al eliminar los autores del libro', error.code|| BookErrorCodes.AUTHOR_REMOVAL_FAILED);
    }
}
