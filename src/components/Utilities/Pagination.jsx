const Pagination = ({ page, lastPage, setPage }) => {

    const scrollTop = () => {
        scrollTo({
            behavior: "smooth",
            top: 0
        })
    }

    const handleNextPage = () => {
        setPage((prevState) => prevState + 1)
        scrollTop()
    }

    const handlePrevPage = () => {
        setPage((prevState) => prevState - 1)
        scrollTop()
    }

    return (
        <div className="flex justify-center items-center p-4 px-2 gap-4 text-black text-2xl">
            { page <= 1 ? null : //Jika berada dipage 1 maka button prev tidak muncul
                <button onClick={handlePrevPage} className="transition-all hover:text-color-accent">Prev</button>
            }

            <p>{page} of {lastPage} </p>

            { page >= lastPage ? null : //Jika berada di last page maka button next tidak muncul
                <button onClick={handleNextPage} className="transition-all hover:text-color-accent">Next</button>
            }
        </div>
    )
}

export default Pagination