export function Progress({ value, className }) {
    return (
        <div className={`progress-container ${className}`}>
            <div 
                className="progress-bar" 
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
} 