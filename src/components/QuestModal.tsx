import { useState, useEffect } from "react";
import { X, Star, Calendar, MapPin, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuestModalProps {
  questId: string;
  onClose: () => void;
}

interface AboutContent {
  name: string;
  level: number;
  class: string;
  location: string;
  bio: string;
  stats: Record<string, number>;
}

interface SkillsContent {
  categories: Array<{
    name: string;
    skills: Array<{
      name: string;
      level: number;
      exp: string;
    }>;
  }>;
}

interface EducationContent {
  degrees: Array<{
    title: string;
    institution: string;
    year: string;
    gpa?: string;
    achievements: string[];
  }>;
  certifications: string[];
}

interface ExperienceContent {
  positions: Array<{
    title: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
  }>;
}

interface ProjectsContent {
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    link: string;
    achievements: string[];
  }>;
}

interface ContactContent {
  message: string;
  contacts: Array<{
    type: string;
    value: string;
    icon: string;
  }>;
}

const questData = {
  about: {
    title: "Character Profile",
    content: {
      name: "Alex Developer",
      level: 25,
      class: "Full Stack Engineer",
      location: "San Francisco, CA",
      bio: "Passionate developer with 5+ years of experience building innovative web applications. Specializes in React, TypeScript, and modern web technologies. Always eager to take on new challenges and level up skills.",
      stats: {
        "Problem Solving": 90,
        "Team Collaboration": 85,
        "Code Quality": 88,
        "Innovation": 92
      }
    } as AboutContent
  },
  skills: {
    title: "Skill Tree",
    content: {
      categories: [
        {
          name: "Frontend",
          skills: [
            { name: "React", level: 90, exp: "3 years" },
            { name: "TypeScript", level: 85, exp: "2 years" },
            { name: "Tailwind CSS", level: 80, exp: "2 years" },
            { name: "Next.js", level: 75, exp: "1.5 years" }
          ]
        },
        {
          name: "Backend",
          skills: [
            { name: "Node.js", level: 85, exp: "3 years" },
            { name: "Python", level: 70, exp: "2 years" },
            { name: "PostgreSQL", level: 75, exp: "2.5 years" },
            { name: "MongoDB", level: 65, exp: "1.5 years" }
          ]
        },
        {
          name: "Tools & DevOps",
          skills: [
            { name: "Git", level: 90, exp: "4 years" },
            { name: "Docker", level: 70, exp: "1.5 years" },
            { name: "AWS", level: 65, exp: "1 year" },
            { name: "CI/CD", level: 75, exp: "2 years" }
          ]
        }
      ]
    } as SkillsContent
  },
  education: {
    title: "Academic Achievements",
    content: {
      degrees: [
        {
          title: "Bachelor of Science in Computer Science",
          institution: "University of Technology",
          year: "2019",
          gpa: "3.8/4.0",
          achievements: ["Dean's List", "Programming Competition Winner", "CS Club President"]
        },
        {
          title: "Full Stack Web Development Bootcamp",
          institution: "Code Academy",
          year: "2020",
          achievements: ["Top Graduate", "Best Final Project", "Peer Mentor"]
        }
      ],
      certifications: [
        "AWS Certified Developer",
        "React Professional Certification",
        "Agile/Scrum Master Certification"
      ]
    } as EducationContent
  },
  experience: {
    title: "Professional Quests",
    content: {
      positions: [
        {
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          period: "2022 - Present",
          location: "San Francisco, CA",
          achievements: [
            "Led development of company's main dashboard, increasing user engagement by 40%",
            "Mentored 3 junior developers",
            "Implemented CI/CD pipeline reducing deployment time by 60%"
          ]
        },
        {
          title: "Frontend Developer",
          company: "StartupXYZ",
          period: "2020 - 2022",
          location: "Remote",
          achievements: [
            "Built responsive web application serving 10K+ users",
            "Improved application performance by 35%",
            "Collaborated with design team to implement modern UI/UX"
          ]
        }
      ]
    } as ExperienceContent
  },
  projects: {
    title: "Code Missions",
    content: {
      projects: [
        {
          name: "E-Commerce Platform",
          description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
          tech: ["React", "Node.js", "MongoDB", "Stripe"],
          link: "https://github.com/alexdev/ecommerce",
          achievements: ["1000+ GitHub stars", "Featured in dev newsletter"]
        },
        {
          name: "Task Management App",
          description: "Collaborative task management tool with real-time updates",
          tech: ["React", "Socket.io", "PostgreSQL", "Docker"],
          link: "https://github.com/alexdev/taskapp",
          achievements: ["Winner of local hackathon", "500+ active users"]
        },
        {
          name: "Weather Dashboard",
          description: "Beautiful weather dashboard with data visualization",
          tech: ["React", "D3.js", "Weather API", "Tailwind"],
          link: "https://github.com/alexdev/weather",
          achievements: ["Featured on Product Hunt", "Top 10 CodePen"]
        }
      ]
    } as ProjectsContent
  },
  contact: {
    title: "Final Boss - Let's Connect!",
    content: {
      message: "Congratulations! You've completed all quests and unlocked the final challenge. Ready to team up for your next project?",
      contacts: [
        { type: "Email", value: "alex@developer.com", icon: "📧" },
        { type: "LinkedIn", value: "linkedin.com/in/alexdeveloper", icon: "💼" },
        { type: "GitHub", value: "github.com/alexdev", icon: "🐙" },
        { type: "Portfolio", value: "alexdeveloper.dev", icon: "🌐" }
      ]
    } as ContactContent
  }
};

export const QuestModal = ({ questId, onClose }: QuestModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const quest = questData[questId as keyof typeof questData];

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  if (!quest) return null;

  const renderContent = () => {
    switch (questId) {
      case "about": {
        const content = quest.content as AboutContent;
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-game-primary-glow rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">AD</span>
              </div>
              <h3 className="text-2xl font-bold">{content.name}</h3>
              <p className="text-muted-foreground">Level {content.level} {content.class}</p>
              <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {content.location}
              </div>
            </div>
            
            <p className="text-center">{content.bio}</p>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Character Stats</h4>
              {Object.entries(content.stats).map(([stat, value]) => (
                <div key={stat}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{stat}</span>
                    <span className="text-sm font-semibold">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "skills": {
        const content = quest.content as SkillsContent;
        return (
          <div className="space-y-6">
            {content.categories.map((category) => (
              <div key={category.name}>
                <h4 className="font-semibold mb-3 text-primary">{category.name}</h4>
                <div className="grid gap-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="bg-muted rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.exp}</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      case "education": {
        const content = quest.content as EducationContent;
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">Degrees</h4>
              {content.degrees.map((degree, index) => (
                <div key={index} className="bg-muted rounded-lg p-4 mb-3">
                  <h5 className="font-semibold">{degree.title}</h5>
                  <p className="text-muted-foreground">{degree.institution}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">{degree.year}</span>
                    {degree.gpa && <span className="text-sm font-semibold">GPA: {degree.gpa}</span>}
                  </div>
                  <div className="mt-2">
                    {degree.achievements.map((achievement, i) => (
                      <span key={i} className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded mr-2 mb-1">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-primary">Certifications</h4>
              <div className="grid gap-2">
                {content.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-game-warning" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      case "experience": {
        const content = quest.content as ExperienceContent;
        return (
          <div className="space-y-6">
            {content.positions.map((position, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold">{position.title}</h5>
                    <p className="text-primary">{position.company}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {position.period}
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {position.location}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="text-sm font-semibold mb-2">Achievements:</h6>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {position.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      }

      case "projects": {
        const content = quest.content as ProjectsContent;
        return (
          <div className="space-y-6">
            {content.projects.map((project, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold">{project.name}</h5>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <Star className="w-3 h-3 text-game-warning" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      case "contact": {
        const content = quest.content as ContactContent;
        return (
          <div className="space-y-6 text-center">
            <div className="text-6xl">🎉</div>
            <p className="text-lg">{content.message}</p>
            
            <div className="grid gap-3">
              {content.contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{contact.icon}</span>
                    <span className="font-medium">{contact.type}</span>
                  </div>
                  <span className="text-primary">{contact.value}</span>
                </div>
              ))}
            </div>
            
            <Button className="game-button">
              Let's Collaborate!
            </Button>
          </div>
        );
      }

      default:
        return <div>Quest content not found.</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h3 className="text-2xl font-bold text-gradient">{quest.title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};