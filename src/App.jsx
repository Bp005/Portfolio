import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Code, Database, Cloud, Server, ExternalLink, Menu, X, Gamepad2 } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const gameIntervalRef = useRef(null);
  const obstaclePositionRef = useRef(100);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Message sent! (Frontend only - no backend connected)');
    setFormData({ name: '', email: '', message: '' });
  };

  const startGame = () => {
    setShowGame(true);
    setGameScore(0);
    setGameOver(false);
    setIsJumping(false);
    obstaclePositionRef.current = 100;
  };

  const closeGame = () => {
    setShowGame(false);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
  };

  const jump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  const restartGame = () => {
    setGameScore(0);
    setGameOver(false);
    setIsJumping(false);
    obstaclePositionRef.current = 100;
  };

  useEffect(() => {
    if (showGame && !gameOver) {
      gameIntervalRef.current = setInterval(() => {
        obstaclePositionRef.current -= 2;
        if (obstaclePositionRef.current < -10) {
          obstaclePositionRef.current = 100;
          setGameScore(prev => prev + 1);
        }
        if (obstaclePositionRef.current < 15 && obstaclePositionRef.current > 0 && !isJumping) {
          setGameOver(true);
          clearInterval(gameIntervalRef.current);
        }
      }, 20);
      return () => clearInterval(gameIntervalRef.current);
    }
  }, [showGame, gameOver, isJumping]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showGame && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        gameOver ? restartGame() : jump();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGame, gameOver, isJumping]);

  const skills = {
    backend: [
      { name: 'Java', icon: '☕' },
      { name: 'Spring Boot', icon: '🍃' },
      { name: 'Spring Security', icon: '🔒' },
      { name: 'REST APIs', icon: '🔌' }
    ],
    database: [
      { name: 'MySQL', icon: '🗄️' },
      { name: 'JPA', icon: '📊' },
      { name: 'Hibernate', icon: '🔄' }
    ],
    tools: [
      { name: 'Git', icon: '📚' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Postman', icon: '📮' },
      { name: 'Maven', icon: '🔨' }
    ],
    cloud: [{ name: 'AWS Basics', icon: '☁️' }]
  };

  const projects = [
    {
      title: 'Hospital Management System',
      description: 'Complete backend REST API for hospital operations with JWT authentication and role-based access control.',
      tech: ['Spring Boot', 'MySQL', 'JWT', 'Spring Security'],
      details: [
        'CRUD operations for doctors, patients, and appointments',
        'JWT authentication (work in progress)',
        'Role-based access: Doctor / Patient / Admin',
        'RESTful API design'
      ],
      github: '#',
      demo: null
    },
    {
      title: 'Automated IELTS Essay Evaluator',
      description: 'AI-powered system to evaluate IELTS Writing Task 2 essays using fine-tuned language models.',
      tech: ['Python', 'FastAPI', 'Mistral-7B', 'Machine Learning'],
      details: [
        'Fine-tuned Mistral-7B LLM for essay evaluation',
        'FastAPI backend for API serving',
        'Academic major project',
        'Automated scoring and feedback generation'
      ],
      github: '#',
      demo: null
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      {theme === 'dark' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 50}%`,
                left: `-5%`,
                boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.8)',
                animation: `shootingStar ${Math.random() * 3 + 4}s linear infinite ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(1000px) translateY(500px) rotate(-45deg); opacity: 0; }
        }
      `}</style>

      <nav className={`fixed w-full top-0 z-50 backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">BP</div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button key={section} onClick={() => scrollToSection(section)} className="capitalize hover:text-blue-500 transition-colors">
                  {section}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={startGame} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <Gamepad2 size={20} />
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="px-4 py-3 space-y-3">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button key={section} onClick={() => scrollToSection(section)} className="block w-full text-left capitalize py-2 hover:text-blue-500 transition-colors">
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Bijay Poudel
          </h1>
          <div className="text-xl md:text-2xl text-gray-400 mb-2">Backend / Java Developer</div>
          <div className="text-lg text-gray-500">📍 Nepal</div>
          <p className="text-lg md:text-xl my-8 text-gray-300 max-w-2xl mx-auto">
            Computer Engineering student and aspiring backend developer. Building Spring Boot APIs and learning real-world backend systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
              View Projects
            </button>
            <a href="https://github.com/Bp005/" target="_blank" rel="noopener noreferrer" className={`px-8 py-3 border-2 ${theme === 'dark' ? 'border-gray-600 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'} rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 justify-center`}>
              <Github size={20} />
              GitHub Profile
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com/Bp005/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/bijaypoudel10/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="mailto:bijaypdl10@gmail.com" className="hover:text-blue-500 transition-colors">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} relative z-10`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">About Me</h2>
          <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} shadow-xl`}>
            <p className="text-lg leading-relaxed mb-6">
              I'm a Computer Engineering student with a strong passion for backend development and building robust APIs. My journey focuses on creating efficient, scalable backend systems.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-500">🎓 Education</h3>
                <p className="text-gray-400">Computer Engineering Student</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-500">🎯 Focus Areas</h3>
                <ul className="text-gray-400 space-y-2">
                  <li>• Java & Spring Boot Development</li>
                  <li>• REST API Design</li>
                  <li>• JWT Authentication</li>
                  <li>• Database Management</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-pink-500">🚀 Currently Learning</h3>
                <p className="text-gray-400">Spring Security, Microservices, Cloud Deployment</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-500">📜 Certifications</h3>
                <p className="text-gray-400">AWS Cloud Fundamentals Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
                <div className="flex items-center gap-3 mb-4">
                  {category === 'backend' && <Server className="text-blue-500" size={28} />}
                  {category === 'database' && <Database className="text-purple-500" size={28} />}
                  {category === 'tools' && <Code className="text-pink-500" size={28} />}
                  {category === 'cloud' && <Cloud className="text-green-500" size={28} />}
                  <h3 className="text-xl font-bold capitalize">{category}</h3>
                </div>
                <div className="space-y-3">
                  {items.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-gray-400">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">{tech}</span>
                  ))}
                </div>
                <ul className="space-y-2 mb-6 text-sm text-gray-400">
                  {project.details.map((detail, i) => (
                    <li key={i}>• {detail}</li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <a href={project.github} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Github size={18} />
                    GitHub
                  </a>
                  <button disabled={!project.demo} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${project.demo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 opacity-50 cursor-not-allowed'}`}>
                    <ExternalLink size={18} />
                    {project.demo ? 'Live Demo' : 'No Demo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Get In Touch</h2>
          <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'} border-2 focus:border-blue-500 outline-none`} placeholder="Your Name" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'} border-2 focus:border-blue-500 outline-none`} placeholder="your.email@example.com" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Message</label>
              <textarea name="message" value={formData.message} onChange={handleFormChange} rows="5" className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'} border-2 focus:border-blue-500 outline-none`} placeholder="Your message..." />
            </div>
            <button onClick={handleSubmit} className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Send Message
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">(Frontend only)</p>
          </div>
        </div>
      </section>

      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} text-center relative z-10`}>
        <p className="text-gray-400 mb-2">© 2026 Bijay Poudel</p>
        <p className="text-sm text-gray-500">Built for learning and growth 🚀</p>
      </footer>

      {showGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`relative w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-6`}>
            <button onClick={closeGame} className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Jump Game 🦘</h3>
            <div className="text-center mb-4">
              <p className="text-xl font-bold">Score: {gameScore}</p>
            </div>
            <div onClick={gameOver ? restartGame : jump} className={`relative w-full h-64 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-xl overflow-hidden cursor-pointer border-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
              <div className={`absolute bottom-0 w-full h-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              <div className={`absolute bottom-0 left-12 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-500 ${isJumping ? '-translate-y-32' : ''}`}>
                <div className="absolute inset-2 bg-white/20 rounded"></div>
              </div>
              <div className="absolute bottom-0 w-8 h-16 bg-gradient-to-t from-red-600 to-red-500 rounded-t-lg" style={{ left: `${obstaclePositionRef.current}%` }}>
                <div className="absolute top-6 -left-2 w-3 h-8 bg-red-500 rounded-l-lg"></div>
                <div className="absolute top-6 -right-2 w-3 h-8 bg-red-500 rounded-r-lg"></div>
              </div>
              {gameOver && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold mb-4">Game Over!</p>
                    <p className="text-xl mb-4">Final Score: {gameScore}</p>
                    <button onClick={restartGame} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                      Play Again
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              <p><span className="font-semibold">Desktop:</span> Press SPACE or ↑ to jump</p>
              <p><span className="font-semibold">Mobile:</span> Tap game area to jump</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;