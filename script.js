/**
 * Portfolio JavaScript
 * Fetches GitHub repos and renders project cards
 */

const GITHUB_USERNAME = 'neilyneilynig'

// Project metadata (icons and tags)
const projectMeta = {
    'quantum-sim': {
        icon: '🔮',
        tags: ['TypeScript', 'Quantum', 'Physics'],
        featured: true,
    },
    'ai-trainer': {
        icon: '🧠',
        tags: ['Next.js', 'AI', 'React'],
        featured: true,
    },
    'pi-monitor': {
        icon: '📊',
        tags: ['Python', 'Raspberry Pi', 'CLI'],
        featured: true,
    },
    'netwatch': {
        icon: '🔍',
        tags: ['Python', 'Networking', 'CLI'],
        featured: true,
    },
    'job-board': {
        icon: '💼',
        tags: ['Next.js', 'Supabase', 'Stripe'],
        featured: true,
    },
    'sockstar-3d': {
        icon: '🧦',
        tags: ['3D', 'WebGL', 'Games'],
        featured: false,
    },
}

// Fetch repos from GitHub API
async function fetchRepos() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`
        )
        
        if (!response.ok) throw new Error('GitHub API error')
        
        const repos = await response.json()
        return repos
    } catch (error) {
        console.error('Failed to fetch repos:', error)
        return []
    }
}

// Create project card HTML
function createProjectCard(repo) {
    const meta = projectMeta[repo.name] || {
        icon: '📁',
        tags: repo.language ? [repo.language] : ['Code'],
        featured: false,
    }
    
    const description = repo.description || 'No description available'
    
    return `
        <div class="project-card">
            <div class="project-header">
                <span class="project-icon">${meta.icon}</span>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="project-link" title="View on GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                    </a>
                    ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link" title="Live Demo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </a>
                    ` : ''}
                </div>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tags">
                ${meta.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `
}

// Render projects
async function renderProjects() {
    const grid = document.getElementById('projects-grid')
    if (!grid) return
    
    grid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Loading projects...</p>'
    
    const repos = await fetchRepos()
    
    if (repos.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Failed to load projects</p>'
        return
    }
    
    // Sort: featured first, then by stars
    const sortedRepos = repos.sort((a, b) => {
        const aFeatured = projectMeta[a.name]?.featured ? 1 : 0
        const bFeatured = projectMeta[b.name]?.featured ? 1 : 0
        if (bFeatured !== aFeatured) return bFeatured - aFeatured
        return b.stargazers_count - a.stargazers_count
    })
    
    // Take top 6
    const topRepos = sortedRepos.slice(0, 6)
    
    grid.innerHTML = topRepos.map(createProjectCard).join('')
    
    // Update stats
    const repoCount = document.getElementById('repo-count')
    const starsCount = document.getElementById('stars-count')
    
    if (repoCount) repoCount.textContent = repos.length
    if (starsCount) {
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
        starsCount.textContent = totalStars > 0 ? totalStars : '★'
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    })
})

// Initialize
document.addEventListener('DOMContentLoaded', renderProjects)
