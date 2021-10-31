import React, { useState , useEffect }from 'react'

function useActiveSection(sections) {
   const [activeSection, setActiveSection] = useState(sections[0]);

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   function handleScroll(e) {
      // const height = document.documentElement.scrollHeight;
      const scrollY = window.scrollY + window.innerHeight * 0.2;
      console.log(scrollY)

      sections.forEach((section, i) => {
         const curr = document.getElementById(section.props.anchor).offsetTop;
         const next = sections[i + 1] &&
            document.getElementById(sections[i + 1].props.anchor).offsetTop;
         
         if (scrollY > curr && (next === undefined || scrollY < next)) {
            setActiveSection(section);
         }
      });
   }

   return { activeSection, setActiveSection }
}

export default useActiveSection
