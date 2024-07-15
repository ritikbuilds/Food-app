import React, { useRef, useState } from "react";
import bgImage from "../assets/image-1.webp";
import bgImage2 from "../assets/image-2.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const sections = [
  {
    background: bgImage,
    title: "We serve incomparable delicacies",
    description:
      "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
  },
  {
    background: bgImage2,
    title: "We serve incomparable delicacies",
    description:
      "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
  },
  {
    background: bgImage2,
    title: "We serve incomparable delicacies",
    description:
      "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
  },
];

gsap.registerPlugin(useGSAP);

function Home() {
  const [visibleSection, setVisibleSection] = useState(0);
  const navigate = useNavigate();
  const animationRef = useRef();

  const handleNextClick = () => {
    if (visibleSection < sections.length - 1) {
      setVisibleSection((prev) => prev + 1);
    } else {
      gsap.to(animationRef.current, {
        rotate: 720,
        duration: 0.5,
        onComplete: () => {
          navigate("/login");
        },
      });
    }
  };

  useGSAP(() => {
    if (visibleSection > 0) {
      gsap.to(`.home-page-${visibleSection}`, {
        transform: `translateX(-${visibleSection * 100}%)`,
        duration: 0.5,
      });
    }
  }, [visibleSection]);

  return (
    <section className="home-section max-w-[600px] w-full overflow-hidden  h-dvh flex">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`home-page-${index} w-full  h-dvh relative flex-none ${
            index === visibleSection ? "z-[1]" : "z-[0]"
          }`}
        >
          <img
            src={section.background}
            alt="background-image"
            className={`top-0 left-0 absolute w-full  h-dvh object-cover object-center ${
              index === 0 ? "scale-x-[-1]" : ""
            } -z-[-1]`}
          />
          <div className="absolute w-[19.438rem] h-[25rem] rounded-[3rem] left-1/2 -translate-x-1/2   bg-[#FE8C00] z-[2] bottom-4">
            <h2 className="text-[2rem] leading-[2.5rem] mt-9 font-semibold text-white text-center">
              {section.title}
            </h2>
            <p className="text-center mx-auto text-[0.875rem] text-white mt-4 w-[80%]">
              {section.description}
            </p>
            <div className="w-[5rem] flex gap-1 mx-auto mt-5">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <span
                    key={index}
                    className={`inline-block w-[1.5rem] ${
                      visibleSection === index ? "bg-white" : "bg-[#C2C2C2]"
                    }  rounded-full h-[0.375rem]`}
                  ></span>
                ))}
            </div>
            {index !== sections.length - 1 && (
              <div className="w-full flex justify-between px-6 mt-[5rem] text-white">
                <p
                  className="text-[0.875rem] font-semibold"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Skip
                </p>
                <button
                  onClick={handleNextClick}
                  className="flex items-center gap-2 text-[0.875rem] font-semibold"
                >
                  <span>Next</span>
                  <span>
                    <FaArrowRightLong />
                  </span>
                </button>
              </div>
            )}
            {index === sections.length - 1 && (
              <button
                onClick={handleNextClick}
                className="block mx-auto mt-4  relative size-[5.875rem]  border-l-[#ffffff2c]  rounded-full  "
              >
                <span
                  ref={animationRef}
                  className="block absolute top-0 left-0 size-[5.875rem] border-2  rotate-45 border-white border-l-[1px]  border-l-[#ffffff2c]  rounded-full"
                ></span>

                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3.875rem] h-[3.875rem] bg-white rounded-full  flex justify-center items-center">
                  <FaArrowRightLong color="#FE8C00" size={"1.3rem"} />
                </span>
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Home;
