// AI Process Visualization Script

document.addEventListener('DOMContentLoaded', function() {
    // Create brain nodes and connections for the AI engine visualization
    function initializeAIBrain() {
        const brainContainer = document.querySelector('.ai-brain');
        if (!brainContainer) return;
        
        // Create nodes
        const nodeCount = 12;
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'brain-node';
            
            // Position nodes in a semi-random pattern
            const x = 10 + Math.random() * 80; // 10-90% of container width
            const y = 10 + Math.random() * 80; // 10-90% of container height
            
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.animationDelay = `${Math.random() * 3}s`;
            
            brainContainer.appendChild(node);
        }
        
        // Create connections between nodes
        const nodes = brainContainer.querySelectorAll('.brain-node');
        const connectionCount = 15;
        
        for (let i = 0; i < connectionCount; i++) {
            const startNodeIndex = Math.floor(Math.random() * nodes.length);
            let endNodeIndex;
            do {
                endNodeIndex = Math.floor(Math.random() * nodes.length);
            } while (endNodeIndex === startNodeIndex);
            
            const startNode = nodes[startNodeIndex];
            const endNode = nodes[endNodeIndex];
            
            const connection = document.createElement('div');
            connection.className = 'brain-connection';
            
            // Calculate position and dimensions
            const startX = parseFloat(startNode.style.left);
            const startY = parseFloat(startNode.style.top);
            const endX = parseFloat(endNode.style.left);
            const endY = parseFloat(endNode.style.top);
            
            // Calculate distance
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate angle
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            // Set styles
            connection.style.width = `${distance}%`;
            connection.style.left = `${startX}%`;
            connection.style.top = `${startY}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            
            brainContainer.appendChild(connection);
        }
    }
    
    // Create training plan visualization with varying intensity
    function initializeTrainingPlan() {
        const planContainer = document.querySelector('.training-plan');
        if (!planContainer) return;
        
        const dayCount = 14; // Two weeks plan
        const dayWidth = 100 / (dayCount - 1); // percentage width between days
        
        // Create plan structure with varying intensities
        for (let i = 0; i < dayCount; i++) {
            // Determine workout type and intensity
            let intensity = 'medium';
            
            // Create more realistic training pattern
            if (i % 7 === 0) { // Every Sunday
                intensity = 'easy'; // Recovery
            } else if (i % 7 === 3 || i % 7 === 5) { // Wednesday and Friday
                intensity = 'hard'; // Hard workout
            } else if (i % 7 === 6) { // Saturday
                intensity = 'easy'; // Recovery before Sunday long run
            }
            
            // Create day node
            const day = document.createElement('div');
            day.className = `plan-day intensity-${intensity}`;
            day.style.left = `${i * dayWidth}%`;
            
            // Add icon based on intensity
            if (i % 7 === 2) { // Every Tuesday add a speed workout icon
                const icon = document.createElement('div');
                icon.className = 'personalization-icon';
                icon.style.top = '-20px';
                icon.style.left = '0px';
                icon.innerHTML = '<i class="fas fa-bolt"></i>';
                day.appendChild(icon);
            } else if (i % 7 === 0) { // Every Sunday add a long run icon
                const icon = document.createElement('div');
                icon.className = 'personalization-icon';
                icon.style.top = '-20px';
                icon.style.left = '0px';
                icon.innerHTML = '<i class="fas fa-road"></i>';
                day.appendChild(icon);
            } else if (i % 7 === 6) { // Every Saturday add a recovery icon
                const icon = document.createElement('div');
                icon.className = 'personalization-icon';
                icon.style.top = '-20px';
                icon.style.left = '0px';
                icon.innerHTML = '<i class="fas fa-heart"></i>';
                day.appendChild(icon);
            }
            
            planContainer.appendChild(day);
            
            // Don't create a line after the last day
            if (i < dayCount - 1) {
                const line = document.createElement('div');
                line.className = 'plan-line';
                line.style.left = `${i * dayWidth}%`;
                line.style.width = `${dayWidth}%`;
                planContainer.appendChild(line);
            }
        }
    }
    
    // Initialize visualizations
    initializeAIBrain();
    initializeTrainingPlan();
    
    // Add scroll-based animations
    const options = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all process stages
    document.querySelectorAll('.process-stage').forEach(stage => {
        observer.observe(stage);
    });
});
