import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function AdminStars() {
  const [starUrl, setStarUrl] = useState('');
  const [starName, setStarName] = useState('');
  const [starLike, setStarLike] = useState('');
  const [starImgUrl, setStarImgUrl] = useState('');
  const [stars, setStars] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [starId, setStarId] = useState('');

  const handleStarAdd = async (e) => {
    e.preventDefault();
    const formData = { starUrl, starName, starLike, starImgUrl };
    const url = isUpdateMode ? `${apiUrl}/updatestar/${starId}` : `${apiUrl}/addStar`;
    const method = isUpdateMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.message) {
        alert(result.message);  // Notify if the star is already added
      } else {
        // Clear form fields after successful submission
        setStarUrl('');
        setStarName('');
        setStarLike('');
        setStarImgUrl('');
        setIsUpdateMode(false);
        fetchStars(); // Refresh the star list
      }
    } catch (error) {
      console.error('Error adding star:', error);
    }
  };

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch(`${apiUrl}/getstars`);
      const data = await response.json();
      setStars(data);
    } catch (error) {
      console.error('Error fetching stars:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/deletestar/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchStars(); // Refresh the star list
    } catch (error) {
      console.error('Error deleting star:', error);
    }
  };

  const openUpdateModal = (item) => {
    setIsUpdateMode(true);
    setStarId(item._id);
    setStarImgUrl(item.starImgUrl);
    setStarUrl(item.starUrl);
    setStarName(item.starName);
    setStarLike(item.starLike);
  };

  return (
    <>
      <AdminNav />
      <div className="w-50 m-auto">
        <button
          className="form-control btn btn-light mt-4 d-flex justify-content-center m-auto"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          onClick={() => setIsUpdateMode(false)}
        >
          Add a Star
        </button>
      </div>

      <div className="all-cards">
        <div className="row row-cols-2 row-cols-md-5 g-4">
          {stars.map((item) => (
            <div className="col" key={item._id}>
              <Link to={item.starUrl}>
                <div className="card" style={{ height: "250px" }}>
                  <img style={{ height: "227px" }} src={item.starImgUrl} className="card-img-top" alt={item.starName} />
                  <p className="p-0 m-0 text-light">{item.starName}</p>
                </div>
              </Link>
              <div className="d-flex justify-content-between">
                <i onClick={() => handleDelete(item._id)} className="bi bi-trash3" style={{ color: "#fff" }} />
                <i
                  onClick={() => openUpdateModal(item)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                  className="bi bi-pencil-square"
                  style={{ color: "#cd1f7c" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding/updating star */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{isUpdateMode ? 'Update Star' : 'Add a Star'}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleStarAdd}>
              <div className="modal-body">
                <label htmlFor="starImgUrl">Star Image URL</label>
                <input
                  id="starImgUrl"
                  onChange={(e) => setStarImgUrl(e.target.value)}
                  className="form-control"
                  type="text"
                  value={starImgUrl}
                />
                <label htmlFor="starUrl">Star URL</label>
                <input
                  id="starUrl"
                  onChange={(e) => setStarUrl(e.target.value)}
                  className="form-control"
                  type="text"
                  value={starUrl}
                />
                <label htmlFor="starName">Star Name</label>
                <input
                  id="starName"
                  onChange={(e) => setStarName(e.target.value)}
                  className="form-control"
                  type="text"
                  value={starName}
                />
                <label htmlFor="starLike">Likes</label>
                <input
                  id="starLike"
                  onChange={(e) => setStarLike(e.target.value)}
                  className="form-control"
                  type="text"
                  value={starLike}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal">{isUpdateMode ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminStars;
