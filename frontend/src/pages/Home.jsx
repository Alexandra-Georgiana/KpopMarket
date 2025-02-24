import SlideShow from "../comonents/SlideShow";
import Popular from "../comonents/Popular";
import Latest from "../comonents/Latest";
import React, { useRef } from "react";

const Home = () => {
  const newThisWeekRef = useRef(null);

  const scrollToNewThisWeek = () => {
    if (newThisWeekRef?.current) {
      newThisWeekRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <SlideShow scrollToNewThisWeek={scrollToNewThisWeek} />
      <Popular />
      <section ref={newThisWeekRef} className="py-10 flex flex-col items-center justify-center">
        <Latest />
      </section>
    </div>
  );
};

export default Home;
