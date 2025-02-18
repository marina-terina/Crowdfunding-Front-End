import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import useUser from '../hooks/use-user';
import useUserProjects from '../hooks/use-user-projects';
import useUserPledges from '../hooks/use-user-pledges';
import Footer from '../components/Footer';

function Dashboard() {
    const { auth } = useAuth();
    const { userData, isLoading, error, updateUser } = useUser();
    const { projects, isLoading: projectsLoading, error: projectsError } = useUserProjects();
    const { pledges, isLoading: pledgesLoading, error: pledgesError } = useUserPledges();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Redirect if not logged in
    if (!auth.token) {
        navigate('/login');
        return null;
    }

    const handleEdit = () => {
        setFormData({
            username: userData?.username || '',
            email: userData?.email || '',
            password: '', // Password field starts empty
        });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) return <div className="dashboard-container">Loading...</div>;
    if (error) return <div className="dashboard-container">Error: {error}</div>;

    return (
        <>
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <div className="dashboard-content">
                    <section className="dashboard-section profile-section">
                        <h2>Profile</h2>
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="profile-edit-form">
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className="form-buttons">
                                    <button type="submit" className="save-btn">Save Changes</button>
                                    <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="profile-details">
                                <div className="profile-item">
                                    <label>Username:</label>
                                    <span>{userData?.username}</span>
                                </div>
                                <div className="profile-item">
                                    <label>Email:</label>
                                    <span>{userData?.email}</span>
                                </div>
                                <div className="profile-item">
                                    <label>Member Since:</label>
                                    <span>
                                        {new Date(userData?.date_joined).toLocaleDateString()}
                                    </span>
                                </div>
                                <button onClick={handleEdit} className="edit-btn">
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </section>

                    <section className="dashboard-section">
                        <h2 onClick={() => toggleSection('projects')} style={{ cursor: 'pointer' }}>
                            My Projects {activeSection === 'projects' ? '▼' : '▶'}
                        </h2>
                        {activeSection === 'projects' && (
                            projectsLoading ? (
                                <p>Loading projects...</p>
                            ) : projectsError ? (
                                <p>Error loading projects: {projectsError}</p>
                            ) : projects.length === 0 ? (
                                <div className="no-projects">
                                    <p>You haven't created any projects yet.</p>
                                    <Link to="/createProject" className="create-project-btn">
                                        Create Your First Project
                                    </Link>
                                </div>
                            ) : (
                                <div className="projects-grid">
                                    {projects.map(project => {
                                        const currentAmount = project?.pledges?.reduce(
                                            (total, pledge) => total + Number(pledge.amount),
                                            0
                                        );
                                        console.log('Project:', project.title);
                                        console.log('Pledges:', project.pledges);
                                        console.log('Current Amount:', currentAmount);
                                        console.log('Goal:', project.goal);

                                        const pledgePercentage = (currentAmount / project?.goal) * 100;
                                        console.log('Percentage:', pledgePercentage);

                                        return (
                                            <div key={project.id} className="project-card">
                                                <img 
                                                    src={project.image} 
                                                    alt={project.title} 
                                                    className="project-image"
                                                />
                                                <div className="project-info">
                                                    <h3>{project.title}</h3>
                                                    <div className="support-section">
                                                        <div className="progress-bar">
                                                            <div 
                                                                className="progress-fill"
                                                                style={{ width: `${pledgePercentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="amount-row">
                                                            <span className="current-amount">
                                                                ${currentAmount?.toLocaleString()}
                                                            </span>
                                                            <span className="goal-amount">
                                                                of ${project.goal?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="project-meta">
                                                        <span>Status: {project.is_open ? "Open" : "Closed"}</span>
                                                    </div>
                                                    <div className="project-actions">
                                                        <Link 
                                                            to={`/project/${project.id}`}
                                                            className="view-project-btn"
                                                        >
                                                            View Project
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        )}
                    </section>
                    
                    <section className="dashboard-section">
                        <h2 onClick={() => toggleSection('pledges')} style={{ cursor: 'pointer' }}>
                            My Pledges {activeSection === 'pledges' ? '▼' : '▶'}
                        </h2>
                        {activeSection === 'pledges' && (
                            pledgesLoading ? (
                                <p>Loading pledges...</p>
                            ) : pledgesError ? (
                                <p>Error loading pledges: {pledgesError}</p>
                            ) : pledges.length === 0 ? (
                                <p>You haven't made any pledges yet.</p>
                            ) : (
                                <div className="pledges-grid">
                                    {pledges.map(pledge => (
                                        <div key={pledge.id} className="pledge-card">
                                            <div className="pledge-header">
                                                <Link 
                                                    to={`/project/${pledge.project_id}`}
                                                    className="project-link"
                                                >
                                                    {pledge.project_title}
                                                </Link>
                                                <span className="pledge-amount">
                                                    ${Number(pledge.amount).toLocaleString()}
                                                </span>
                                            </div>
                                            {pledge.comment && (
                                                <p className="pledge-comment">
                                                    <strong>Your Comment:</strong> {pledge.comment}
                                                </p>
                                            )}
                                            <div className="reward-section">
                                                <h4>Project Reward:</h4>
                                                <p>{pledge.project_reward}</p>
                                            </div>
                                            <div className="pledge-footer">
                                                <Link 
                                                    to={`/project/${pledge.project_id}`}
                                                    className="view-project-btn"
                                                >
                                                    View Project
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard; 