import { renderHook, act, waitFor } from '@testing-library/react';
import useFavoriteBooks from './useFavoriteBooks';
import { bookService } from 'services/book.service';

const mockToast = {
  success: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

jest.mock('services/book.service', () => ({
  bookService: {
    getFavoriteBooks: jest.fn(),
    addFavorite: jest.fn(),
    deleteFavorite: jest.fn(),
  },
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: (...args: any[]) => mockToast.success(...args),
    info: (...args: any[]) => mockToast.info(...args),
    error: (...args: any[]) => mockToast.error(...args),
  },
}));

describe('useFavoriteBooks', () => {
  const booksApi = bookService as jest.Mocked<typeof bookService>;
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

  const b1 = { _id: 'b1', title: 'T1', author: 'A1', description: 'D1' } as any;
  const b2 = { _id: 'b2', title: 'T2', author: 'A2', description: 'D2' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('loads favorite books on mount and marks them with isFavorite=true', async () => {
    booksApi.getFavoriteBooks.mockResolvedValue({ books: [b1, b2] });

    const { result } = renderHook(() => useFavoriteBooks());

    await waitFor(() => {
      expect(result.current.books).toHaveLength(2);
    });

    expect(result.current.books).toEqual([
      { ...b1, isFavorite: true },
      { ...b2, isFavorite: true },
    ]);
    expect(booksApi.getFavoriteBooks).toHaveBeenCalledTimes(1);
  });

  it('on error while loading favorites, logs the error (no crash)', async () => {
    const err = new Error('boom');
    booksApi.getFavoriteBooks.mockRejectedValue(err);

    renderHook(() => useFavoriteBooks());

    await waitFor(() => {
      expect(booksApi.getFavoriteBooks).toHaveBeenCalled();
    });
    expect(logSpy).toHaveBeenCalledWith(err);
  });

  it('toggleFavorite removes the book and shows info when currently favorite', async () => {

    booksApi.getFavoriteBooks.mockResolvedValue({ books: [b1, b2] });
    booksApi.deleteFavorite.mockResolvedValue();

    const { result } = renderHook(() => useFavoriteBooks());
    await waitFor(() => expect(result.current.books).toHaveLength(2));

    await act(async () => {
      await result.current.toggleFavorite('b1', true);
    });


    expect(booksApi.deleteFavorite).toHaveBeenCalledWith('b1');

    expect(mockToast.info).toHaveBeenCalledWith('Removed from favorites');

    expect(result.current.books.map((b) => b._id)).toEqual(['b2']);
    expect(result.current.books[0].isFavorite).toBe(true);
  });

  it('toggleFavorite adds the book and shows success when currently not favorite', async () => {

    booksApi.getFavoriteBooks.mockResolvedValue({ books: [b1] });
    booksApi.addFavorite.mockResolvedValue();

    const { result } = renderHook(() => useFavoriteBooks());
    await waitFor(() => expect(result.current.books).toHaveLength(1));


    await act(async () => {
      await result.current.toggleFavorite('b1', false);
    });

    expect(booksApi.addFavorite).toHaveBeenCalledWith('b1');
    expect(mockToast.success).toHaveBeenCalledWith('Added to favorites');
    expect(result.current.books[0]).toMatchObject({
      _id: 'b1',
      isFavorite: true,
    });
  });

  it('toggleFavorite shows error toast when API fails', async () => {
    booksApi.getFavoriteBooks.mockResolvedValue({ books: [b1] });
    booksApi.addFavorite.mockRejectedValue(new Error('nope'));

    const { result } = renderHook(() => useFavoriteBooks());
    await waitFor(() => expect(result.current.books).toHaveLength(1));

    await act(async () => {
      await result.current.toggleFavorite('b1', false);
    });

    expect(mockToast.error).toHaveBeenCalledWith(
      'Something went wrong while updating favorites'
    );
  });
});
