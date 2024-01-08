import React, {useState, useEffect} from 'react'
import { GetListBook } from '../api/googleBookApi'
import { limitText } from '../function/baseFunction'


const DataBook = () => {

  const [listBook, setListBook] = useState([])

  const getAllBook = async () => {
    try {
      // const data = await GetListBook('psychology')
      // test push
      const data = await GetListBook('money')
      setListBook(data.items)
    } catch (error) {
      console.log(error, '<-- error get data buku');
    }
  }


  useEffect(() => {
    getAllBook()
  }, [])

  return (
    <>
      <button onClick={() => console.log(listBook)}>cek</button>

      <div className='p-4 grid grid-cols-3 gap-4'>

        {listBook.map((book) => (
          
          <div className="card w-96 bg-base-100 shadow-xl" key={book.id}>
            <figure>
              <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'no'} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {book.volumeInfo.title}
              </h2>
              <div className='font-bold'>
                { book.volumeInfo.authors ? 
                  book.volumeInfo.authors.map((item) => (
                    <div key={item}>{item}</div>
                  ))
                  : null 
                }
              </div>
              <p>{ book.volumeInfo.description ? limitText(book.volumeInfo.description, 100) : '' }</p>
              <div className="card-actions justify-end">
                { book.volumeInfo.categories ? 
                  book.volumeInfo.categories.map((item) => (
                      <div className="badge badge-outline" key={item}>{item}</div>
                  ))
                  : null 
                }
              </div>

              <div className="card-actions justify-end gap-4">
                <a href={book.volumeInfo.previewLink} target='_blank'>
                  <button className="btn btn-primary">Preview</button>
                </a>
                <a href={book.volumeInfo.canonicalVolumeLink} target='_blank'>
                  <button className="btn btn-primary">Buy Now</button>
                </a>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default DataBook