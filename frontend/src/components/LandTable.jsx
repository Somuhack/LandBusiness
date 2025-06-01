import React from "react";

const LandTable = ({ title, columns, data, onDelete }) => {
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3">{title}</h4>
      <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              {columns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
              {onDelete && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length + (onDelete ? 2 : 1)} className="text-center">No records</td></tr>
            ) : (
              data.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  {columns.map((col, idx) => (
                    <td key={idx}>{item[col.key]}</td>
                  ))}
                  {onDelete && (
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandTable;
