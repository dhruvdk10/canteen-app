import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../services/Api";

function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="main-content container mt-4">
        <h2>Students List</h2>
        <div className="row">
          {students.map((student) => (
            <div key={student.id} className="col-md-4 mb-3">
              <div className="student-card p-3 h-100">
                <h5>{student.name}</h5>
                <p><strong>Referral Code:</strong> {student.referralCode}</p>
                <p><strong>Total Spent:</strong> ₹{student.totalSpent}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/students/${student.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Students;

