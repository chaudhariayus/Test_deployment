import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer } from './landingPage';
import { Appbar } from './dashBoard';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

export const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]); // Filtered doctors
  const [doctors, setDoctors] = useState([]); // All doctors
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/patient/doctor-list`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setDoctors(response.data.doctorData || []); // Set the fetched doctor list
        }
      } catch (error) {
        console.error('Error in fetching doctors', error);
      }
    };

    fetchDoctors();
  }, []);

  const searchDoctors = () => {
    if (Array.isArray(doctors)) {
      setFilterDoc(
        doctors.filter((doc) => {
          const matchesCity = city ? doc.profile?.clinicAddress?.city?.toLowerCase() === city.toLowerCase() : true;
          const matchesState = state ? doc.profile?.clinicAddress?.state?.toLowerCase() === state.toLowerCase() : true;
          return matchesCity && matchesState;
        })
      );
    }
  };

  useEffect(() => {
    searchDoctors();
  }, [city, state, doctors]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.profile?.specialty === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />

      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* City Input */}
          <div className="flex items-center w-full md:w-1/3 bg-white rounded-full shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-100">
              <FaMapMarkerAlt className="text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Search by City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-3 px-4 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
          </div>

          {/* State Input */}
          <div className="flex items-center w-full md:w-1/3 bg-white rounded-full shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-100">
              <FaSearch className="text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Search by State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full py-3 px-4 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-10">
        {/* Specialty Filters */}
        <div className="w-full lg:w-1/4 bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
          <h3 className="text-gray-700 font-semibold mb-4">Search by Specialty</h3>
          <div className="flex flex-col gap-3">
            {[
              'General Physician',
              'Gynecologist',
              'Dermatologist',
              'Pediatrician',
              'Neurologist',
              'Gastroenterologist',
            ].map((specialty) => (
              <button
                key={specialty}
                onClick={() =>
                  speciality === specialty
                    ? navigate('/doctors')
                    : navigate(`/doctors/${specialty}`)
                }
                className={`text-left w-full py-3 px-4 rounded-lg text-sm border ${
                  speciality === specialty
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                } transition duration-200`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Doctors List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filterDoc.length > 0 ? (
              filterDoc.map((doctor, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/appointment/${doctor.profile._id}`)}
                  className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={doctor.profile.image}
                    alt={doctor.user.userName}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {doctor.user.userName}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.profile.specialty}</p>
                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md mt-2 inline-block">
                      Available
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">No doctors found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
