import React, { useState } from "react";
import { Award, Plus, CheckCircle, Clock } from "lucide-react";

const Certifications = () => {
  const [certifications] = useState([
    {
      name: "Organic Certified",
      issuedBy: "Govt. of India",
      status: "verified",
    },
    {
      name: "Sustainable Farming",
      issuedBy: "Green Org",
      status: "pending",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="font-bold text-lg mb-4">Certifications</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Existing Certifications */}
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow transition"
          >
            <Award className="text-green-600 mb-2" size={28} />

            <h3 className="font-semibold text-sm">{cert.name}</h3>
            <p className="text-xs text-gray-500">{cert.issuedBy}</p>

            <div className="mt-2 flex items-center gap-1 text-xs font-semibold">
              {cert.status === "verified" ? (
                <>
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-green-600">Verified</span>
                </>
              ) : (
                <>
                  <Clock size={14} className="text-yellow-500" />
                  <span className="text-yellow-600">Pending</span>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Add Certification Tile */}
        <div
          className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          onClick={() => alert("Open Add Certification Modal")}
        >
          <Plus size={30} className="text-gray-400 mb-2" />
          <p className="text-sm font-semibold text-gray-500">
            Add Certification
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
