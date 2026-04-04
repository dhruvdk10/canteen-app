import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../services/Api";

function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        setStudents(res.data);
      } catch (err) {
        console.log("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <div className="main-content container mt-4">
        <h2>Students List</h2>

        <div className="row">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student._id} className="col-md-4 mb-3">
                <div className="student-card p-3 h-100">
                  <h5>{student.name}</h5>

                  <p>
                    <strong>Referral Code:</strong>{" "}
                    {student.referralCode}
                  </p>

                  <p>
                    <strong>Total Spent:</strong> ₹
                    {student.totalSpent || 0}
                  </p>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/students/${student._id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Students;
