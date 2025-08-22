class MileageTracker {
    constructor() {
        this.workouts = this.loadWorkouts();
        this.chart = null;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDate();
        this.updateStats();
        this.updateChart();
        this.renderWorkouts();
    }

    setupEventListeners() {
        const form = document.getElementById('workoutForm');
        const toggleBtn = document.getElementById('toggleFormBtn');
        const modal = document.getElementById('workoutModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        toggleBtn.addEventListener('click', () => this.openModal());
        modalOverlay.addEventListener('click', () => this.closeModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        
        // Chart filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    setDefaultDate() {
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    openModal() {
        const modal = document.getElementById('workoutModal');
        modal.classList.remove('hidden');
        this.setDefaultDate();
        // Focus on first input
        setTimeout(() => {
            document.getElementById('workoutType').focus();
        }, 100);
    }

    closeModal() {
        const modal = document.getElementById('workoutModal');
        modal.classList.add('hidden');
        // Reset form
        document.getElementById('workoutForm').reset();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Update chart
        this.updateChart();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const workout = {
            id: Date.now(),
            type: formData.get('workoutType'),
            distance: parseFloat(formData.get('distance')),
            date: formData.get('date')
        };

        // Validate the data
        if (!workout.type || !workout.distance || !workout.date) {
            this.showNotification('Please fill in all fields correctly!', 'error');
            return;
        }

        if (isNaN(workout.distance) || workout.distance <= 0) {
            this.showNotification('Please enter a valid distance!', 'error');
            return;
        }

        this.addWorkout(workout);
        e.target.reset();
        this.setDefaultDate();
    }

    addWorkout(workout) {
        this.workouts.push(workout);
        this.saveWorkouts();
        this.updateStats();
        this.updateChart();
        this.renderWorkouts();
        
        // Close modal after adding workout
        this.closeModal();
        
        // Show success message
        this.showNotification('Workout added successfully!', 'success');
    }

    deleteWorkout(id) {
        this.workouts = this.workouts.filter(workout => workout.id !== id);
        this.saveWorkouts();
        this.updateStats();
        this.updateChart();
        this.renderWorkouts();
        
        this.showNotification('Workout deleted!', 'info');
    }

    getWeeklyWorkouts() {
        const today = new Date();
        const startOfWeek = new Date(today);
        const dayOfWeek = today.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0 = Sunday, 1 = Monday
        startOfWeek.setDate(today.getDate() - daysToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return this.workouts.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
        });
    }

    getPreviousWeekWorkouts() {
        const today = new Date();
        const startOfCurrentWeek = new Date(today);
        const dayOfWeek = today.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0 = Sunday, 1 = Monday
        startOfCurrentWeek.setDate(today.getDate() - daysToMonday);
        startOfCurrentWeek.setHours(0, 0, 0, 0);

        const startOfPreviousWeek = new Date(startOfCurrentWeek);
        startOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 7);

        const endOfPreviousWeek = new Date(startOfCurrentWeek);
        endOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 1);
        endOfPreviousWeek.setHours(23, 59, 59, 999);

        return this.workouts.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= startOfPreviousWeek && workoutDate <= endOfPreviousWeek;
        });
    }

    getWeeklyStats() {
        const weeklyWorkouts = this.getWeeklyWorkouts();
        const previousWeekWorkouts = this.getPreviousWeekWorkouts();
        const totalMiles = weeklyWorkouts.reduce((sum, workout) => sum + workout.distance, 0);
        const previousWeekTotal = previousWeekWorkouts.reduce((sum, workout) => sum + workout.distance, 0);

        return {
            totalMiles: totalMiles.toFixed(1),
            previousWeekTotal: previousWeekTotal.toFixed(1)
        };
    }

    updateStats() {
        const stats = this.getWeeklyStats();
        
        document.getElementById('weeklyTotal').textContent = stats.totalMiles;
        document.getElementById('previousWeekTotal').textContent = stats.previousWeekTotal;
    }

    updateChart() {
        const ctx = document.getElementById('weeklyChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }

        const weeklyData = this.getWeeklyChartData();
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeklyData.labels,
                datasets: [{
                    label: 'Miles',
                    data: weeklyData.data,
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y} km`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(160, 174, 192, 0.2)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    getWeeklyChartData() {
        // Get the last 8 weeks of data
        const weeks = [];
        const data = [];
        
        for (let i = 7; i >= 0; i--) {
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - (weekStart.getDay() === 0 ? 7 : weekStart.getDay()) - 1);
            weekStart.setDate(weekStart.getDate() - (i * 7));
            weekStart.setHours(0, 0, 0, 0);
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            
            // Get workouts for this week with filter
            const weekWorkouts = this.workouts.filter(workout => {
                const workoutDate = new Date(workout.date);
                const dateInRange = workoutDate >= weekStart && workoutDate <= weekEnd;
                const typeMatches = this.currentFilter === 'all' || workout.type === this.currentFilter;
                return dateInRange && typeMatches;
            });
            
            // Calculate total for this week
            const weekTotal = weekWorkouts.reduce((sum, workout) => sum + workout.distance, 0);
            
            // Format week label (e.g., "Jan 15")
            const weekLabel = weekStart.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            
            weeks.push(weekLabel);
            data.push(weekTotal);
        }

        return {
            labels: weeks,
            data: data
        };
    }

    renderWorkouts() {
        const container = document.getElementById('workoutsList');
        const sortedWorkouts = [...this.workouts].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (sortedWorkouts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No workouts yet!</p>
                    <p>Add your first workout to get started.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = sortedWorkouts
            .slice(0, 10) // Show only last 10 workouts
            .map(workout => this.createWorkoutHTML(workout))
            .join('');
    }

    createWorkoutHTML(workout) {
        const date = new Date(workout.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        return `
            <div class="workout-item">
                <div class="workout-info">
                    <div class="workout-type">${workout.type}</div>
                    <div class="workout-date">${formattedDate}</div>
                </div>
                <div class="workout-distance">${workout.distance} km</div>
                <button class="delete-btn" onclick="tracker.deleteWorkout(${workout.id})">
                    Delete
                </button>
            </div>
        `;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        let backgroundColor = '#4299e1'; // default blue
        if (type === 'success') backgroundColor = '#48bb78'; // green
        if (type === 'error') backgroundColor = '#f56565'; // red
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${backgroundColor};
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    saveWorkouts() {
        localStorage.setItem('mileage-tracker-workouts', JSON.stringify(this.workouts));
    }

    loadWorkouts() {
        const saved = localStorage.getItem('mileage-tracker-workouts');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tracker = new MileageTracker();
});
