import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNav from "./AdminNav";
const apiUrl = process.env.REACT_APP_API_URL;

function Dashboard() {
  const [imageUrl, setImgUrl] = useState('');
  const [name, setName] = useState('');
  const [videoNo, setVideoNo] = useState('');
  const [views, setViews] = useState('');
  const [link, setLink] = useState('');
  const [titel, settitel] = useState('');
  const [minutes,setMinutes] = useState('')
  const [Category,setCategory]=useState('')
  
  const [postdata, setData] = useState([]);
  const [postId, setPostId] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = { imageUrl,name, videoNo, views, link, titel,minutes,Category};

    const url = isUpdateMode
      ? `${apiUrl}/updatepost/${postId}`
      : `${apiUrl}/postdata`;

    const method = isUpdateMode ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data._id) {
          e.target.reset();
          resetForm();
          fetchPostData();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const fetchPostData = () => {
    fetch(`${apiUrl}/getpostdata`, {
      mode: 'cors',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        const reversedData = data.reverse();
        setData(reversedData);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  function handleDelete(id) {
    fetch(`${apiUrl}/deletepost/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (data._id) {
          fetchPostData();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function openUpdateModal(item) {
    setIsUpdateMode(true);
    setPostId(item._id);
    setImgUrl(item.imageUrl);
    setName(item.name)
    setVideoNo(item.videoNo);
    setViews(item.views);
    setLink(item.link);
    settitel(item.titel);
    setMinutes(item.minutes)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetForm = () => {
    setImgUrl('');
    setName('')
    setVideoNo('');
    setViews('');
    setLink('');
    settitel('');
    setMinutes('')
    setIsUpdateMode(false);
  };

  const totalPages = Math.ceil(postdata.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = postdata.slice(startIndex, startIndex + itemsPerPage);

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      } else if (i === 2 && currentPage > 3) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
    }
    return pageNumbers;
  };

  return (
    <>
   
    <AdminNav/>
      <div className="w-50 m-auto">
        <button
          className="form-control btn btn-light mt-4 d-flex justify-content-center m-auto"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={resetForm}
        >
          Add Post
        </button>
      </div>

      

      <div style={{marginTop:"7%"}} className="all-cards">
        <div className="row row-cols-2 row-cols-md-5 g-4">
          {currentPosts.map((item) => (
            <div className="col" key={item._id}>
              <div className="card">
                <img src={item.imageUrl} className="card-img-top" alt="..." />
                <p className="p-0 m-0 text-light">{item.titel}</p>
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">Video No: {item.videoNo}</h5>
                    <span><i className="bi bi-eye-fill"></i>{item.views}K</span>
                  </div>
                  <div>
                    <i onClick={() => handleDelete(item._id)} style={{ color: "#ffff" }} className="bi bi-trash3" />
                    <i onClick={() => openUpdateModal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "#cd1f7c" }} className="bi bi-pencil-square d-block" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="nav-button">Previous</button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="nav-button">Next</button>
        )}
      </div>

      {/* Modal for Add/Update Post */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form onSubmit={handleSubmit} className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-light" id="exampleModalLabel">
                {isUpdateMode ? 'Update Post' : 'Add A Post'}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <label htmlFor="image">Image Url</label>
              <input value={imageUrl} onChange={(e) => setImgUrl(e.target.value)} className="form-control" type="text" name="imageUrl" id="image" />
              <label htmlFor="image">Star Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" type="text" name="imageUrl" id="image" />
              <label htmlFor="image">Titel</label>
              <input value={titel} onChange={(e) => settitel(e.target.value)} className="form-control" type="text" name="imageUrl" id="image" />
              <label htmlFor="videoNo">Video No.</label>
              <input value={videoNo} onChange={(e) => setVideoNo(e.target.value)} className="form-control" type="number" id="videoNo" name="videoNo" />
              <label htmlFor="views">Minutes</label>
              <input value={minutes} onChange={(e) => setMinutes(e.target.value)} className="form-control" type="number" id="minutes" name="minutes" />
             
              <label htmlFor="link">Video Link</label>
              <input value={link} onChange={(e) => setLink(e.target.value)} className="form-control" type="text" id="link" name="link" />

              <label htmlFor="">Category</label>
              <select className="form-control" name="" id="" value={Category} onChange={(e)=>{setCategory(e.target.value)}}>
                <option className="text-light" value="english">English</option>
                <option className="text-light" value="indian">Indian</option>
                <option className="text-light" value="hijabi">Hijabi</option>
                <option className="text-light" value="viral">Viral</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button data-bs-dismiss="modal" type="submit" className="btn btn-light">{isUpdateMode ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
