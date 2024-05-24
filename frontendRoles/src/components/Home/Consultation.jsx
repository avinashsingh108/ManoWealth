import {React} from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const Consultation = () => {
  const navigate = useNavigate();
 
  const data = [
    {
      name: "Dr. Pankaj Kumar, MBBS, MD",
      department: "Specialization: Psychiatry",
      experience: "Experience: 17 years+",
      hospital:
        "Avalability: S1: Sat 10.00 am-10.30 am, \n  S2: Sat 10.30 am-11.00 am, \n S3: Sun 10.00 am-10.30 am, \n S4: Sun 10.30 am-11.00 am",
      img: "./img/DrPankaj.jpeg",
      vc: "Volunteering (Free consultation)",
      linkedin: "https://aiimspatna.edu.in/doctor/drpankajk@aiimspatna.org",
      slots: [
        "Sat 10.00 am-10.30 am",
        "Sat 10.30 am-11.00 am",
        "Sat 11.00 am-11.30 am",
        "Sun 10.30 am-11.00 am",
        "Sun 2.00 pm-2.30 pm",
        "Sun 1.30 pm-2.00 pm",
        "Wed 10.00 am-10.30 am",
        "Wed 10.30 am-11.00 am",
        "Wed 2.00 pm-2.30 pm"
      ],
      // link: "https://forms.gle/uC6qnGcjyA5UjyT49",
    },
    {
      name: "Dr. Rajvardhan Bhanwar, MBBS, MD",
      department: "Specialization: Psychiatry",
      experience: "Experience: 3 years+",
      hospital:
        "Avalability: S1: Sat 4 pm-4.30 pm, \n  S2: Sat 4.30 pm-5.00 pm, \n S3: Sun 5.00 pm-5.30 pm, \n S4: Sun 5.30 pm-6.00 pm",
      img: "./img/DrRajvardhan.jpeg",
            // link: "https://forms.gle/uC6qnGcjyA5UjyT49",
      id: "https://www.medindia.net/patients/doctor_search/dr-diwakar-singh-indian-medicine-general-practitioner-family-physician-lakhisarai-bihar-81357-1.htm",
      linkedin: "https://www.linkedin.com/in/rajvardhan-bhanwar-md-96830b212/",
      slots: [
        "Sat 4.00 pm-4.30 pm",
        "Sat 4.30 pm-5.00 pm",
        "Sat 5.00 pm-5.30 pm",
        "Sun 5.00 pm-5.30 pm",
        "Sun 5.30 pm-6.00 pm",
        "Sun 6.00 pm-6.30 pm",
        "Wed 4.00 pm-4.30 pm",
        "Wed 4.30 pm-5.00 pm",
        "Wed 5.00 pm-5.30 pm"
      ],
    },
    {
      name: "Dr. Karandeep Paul, MBBS, MD",
      department: "Specialization: Psychiatry",
      experience: "Experience: 3 years+",
      hospital:
        "Avalability: S1: Sat 4 pm-4.30 pm, \n  S2: Sat 4.30 pm-5.00 pm, \n S3: Sun 5.00 pm-5.30 pm, \n S4: Sun 5.30 pm-6.00 pm",
      img: "./img/DrKarandeep.jfif",
      linkedin: "https://www.linkedin.com/in/dr-karandeep-paul-023332108/?originalSubdomain=in",
      id: "https://www.medindia.net/patients/doctor_search/dr-diwakar-singh-indian-medicine-general-practitioner-family-physician-lakhisarai-bihar-81357-1.htm",
      // link: "https://forms.gle/uC6qnGcjyA5UjyT49",
      slots: [
        "Sat 4.00 pm-4.30 pm",
        "Sat 4.30 pm-5.00 pm",
        "Sat 5.00 pm-5.30 pm",
        "Sun 5.00 pm-5.30 pm",
        "Sun 5.30 pm-6.00 pm",
        "Sun 6.00 pm-6.30 pm",
        "Wed 4.00 pm-4.30 pm",
        "Wed 4.30 pm-5.00 pm",
        "Wed 5.00 pm-5.30 pm"
      ],
    },
    {
      name: "Dr. Minakshi Dhar, MBBS, MD, PGD",
      department: "Specialization: General Medicine",
      experience: "Experience: 15 years+",
      hospital:
        "Avalability: S1: Sat 4.00 pm-4.30 pm, \n  S2: Sat 4.30 pm-5.00 pm, \n S3: Sun 4.00 pm-4.30 pm, \n S4: Sun 4.30 pm-5.00 pm",
      img: "./img/DrMinakshi.jpg",
      // link: "https://forms.gle/uC6qnGcjyA5UjyT49",
      vc: "Volunteering (Free consultation)",
      id: "https://www.researchgate.net/profile/Minakshi-Dhar",
      linkedin: "https://www.linkedin.com/in/minakshi-dhar-64134319b/?originalSubdomain=in",
      slots: [
        "Sat 4.00 pm-4.30 pm",
        "Sat 4.30 pm-5.00 pm",
        "Sat 5.00 pm-5.30 pm",
        "Sun 4.00 pm-4.30 pm",
        "Sun 4.30 pm-5.00 pm",
        "Sun 5.00 pm-5.30 pm",
        "Wed 4.00 pm-4.30 pm",
        "Wed 4.30 pm-5.00 pm",
        "Wed 5.00 pm-5.30 pm"
      ],
    },
  ];
  
  return (
    <>
      <div className="bg-blue-100 min-h-screen pt-20">
        <Header />

        <div className=" pb-12 px-4 sm:px-6 lg:px-8 w-[80%] mx-auto ">
          <h1 className="text-4xl font-bold text-center m-4 underline uppercase">
            Consult Now
          </h1>
          <div className="grid gap-10 md:grid-cols-2 mt-10 lg:grid-cols-3 lg:gap-20">
            {data.map((doctor, index) => (
              <div
                key={index}
                className="rounded-lg shadow-lg overflow-hidden bg-white"
              >
                <img
                  className="w-[14vw] mx-auto h-[14vw] my-6 bg-white rounded-full"
                  src={doctor.img}
                  alt={doctor.name}
                />
                <div className="px-4 py-2 bg-white">
                  <h2 className="text-base leading-7 font-semibold text-gray-900 hover:underline cursor-pointer">
                    <a
                      href={doctor.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {doctor.name}
                    </a>

                    {/* <span className="text-xs text-blue-600 ml-1">
                    {doctor.vc}
                  </span> */}
                  </h2>
                  <p className="mt-1 text-base leading-6 text-gray-600">
                    {doctor.department}
                  </p>
                  <p className="mt-1 text-base leading-6 text-gray-600">
                    {doctor.experience}
                  </p>

                    <button onClick={() => navigate("/BookingForm")} className="mt-4 px-6 py-2 text-sm leading-5 font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out">
                      BOOK
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultation;
