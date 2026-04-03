import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { students as studentData } from "../data/Data";
import Footer from "../components/Footer";

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  const fetchStudent = () => {
    const foundStudent = studentData.find(
      (s) => s.id === Number(id)
    );
    setStudent(foundStudent);
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (!student)
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border"></div>
        <p className="mt-2">Loading student...</p>
      </div>
    );

  return (
    <>
      <div className="main-content container py-4">

        {/* BACK BUTTON */}
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>

        {/* STUDENT INFO */}
        <div className="card shadow-sm p-3 mb-4">
          <div className="row">
            <div className="col-md-8">
              <h3 className="mb-2">{student.name}</h3>
              <p className="mb-1">
                <strong>Referral Code:</strong> {student.referralCode}
              </p>
              <p className="mb-0">
                <strong>Total Spent:</strong> ₹{student.totalSpent}
              </p>
            </div>

            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                Continue Ordering
              </button>
            </div>
          </div>
        </div>

        {/* ORDERS SECTION */}
        <div className="card shadow-sm p-3">
          <h4 className="mb-3">Orders</h4>

          {student.orders.length === 0 ? (
            <p className="text-muted">No orders yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {student.orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.snackName}</td>
                      <td>{order.quantity}</td>
                      <td className="fw-semibold">
                        ₹{order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default StudentDetail;
