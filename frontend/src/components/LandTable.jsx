import React from "react";

// Helper to safely access nested keys (e.g., "propertyId.amount")
const getNestedValue = (obj, keyPath) => {
  return keyPath.split('.').reduce((acc, key) => acc?.[key], obj) ?? '';
};

const LandTable = ({ title, columns, data, onDelete,onEdit }) => {
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
              {onDelete && onEdit && <th>Action</th>} 
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onDelete ? 2 : 1)} className="text-center">No records</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  {columns.map((col, idx) => (
                    <td key={idx}>{getNestedValue(item, col.key)}</td>
                  ))}
                  {onDelete && onDelete && (
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(item._id)}>
                        Delete
                      </button>
                      <button className="btn mx-4 btn-sm btn-success" onClick={() => onEdit(item._id)}>
                        Update
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
