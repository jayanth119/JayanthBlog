import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

const Skills = () => {
    const defaultSkills = {
        "intro": "Here are some of the technologies and tools I work with:",
        "skills": [
          {
            "title": "Programming Languages",
            "items": [
              { "title": "JavaScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
              { "title": "Python", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
              { "title": "TypeScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" } , 
              { 'title' : 'Java' , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' } ,
              { 'title' : 'C++' , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' } ,
              { 'title' : 'C' , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' } ,
              {'title' : "Dart" , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
              {'title' : "Kotlin" , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' } ,
              {'title': 'Php' , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' } ,
              {'title': 'Go' , 'icon' : 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' } ,
            ]
          },
          {
            "title": "Frontend Development",
            "items": [
              { "title": "React", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { "title": "Next.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            ]
          },
          {
            "title": "Backend Development",
            "items": [
              { "title": "Node.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              { "title": "Express.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
              { "title": "Django", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg" }
            ]
          },
          {
            "title": "Databases",
            "items": [
              { "title": "MongoDB", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
              { "title": "PostgreSQL", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
            ]
          },
          {
            "title": "DevOps & Cloud",
            "items": [
              { "title": "Docker", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
              { "title": "AWS", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" }
            ]
          },
          {
            "title": "Tools & Other",
            "items": [
              { "title": "Git", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
              { "title": "Figma", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
            ]
          }
        ]
      }      
      
      const [data, setData] = useState(null);
      
      useEffect(() => {
        fetch("/api/getSkills")
          .then((res) => res.json())
          .then((res) => setData(res)
        )
          .catch(() => setData(null));
        // Use default data on failure
        // setData(); 
      }, []);
      

  return (
    <section className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6"> Skills </h2>

        {data ? (
          <div>
            <h4 className="text-lg mb-4">
              <ReactMarkdown>Here are some of the technologies and tools I work with:</ReactMarkdown>
            </h4>


            {data ?.map((category) => (
              <div key={category.title} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {category.items.map((skill) => (
                    <div key={skill.title} className="flex flex-col items-center">
                      <img
                        src={skill.icon}
                        alt={skill.title}
                        className="h-20 w-20 mb-2 rounded-lg shadow-lg transition-transform transform hover:scale-110"
                      />
                      <p className="text-sm font-medium">{skill.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-6">
            <span className="animate-spin h-8 w-8 border-t-4 border-blue-400 rounded-full inline-block"></span>
            <p>Loading skills...</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Skills.propTypes = {
//   header: PropTypes.string.isRequired,
// };

export default Skills;
