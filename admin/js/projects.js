async function loadProjects() {
    try {
        const response = await fetchWithAuth('/projects');
        const data = await response.json();
        
        if (data.success) {
            renderProjects(data.data);
        } else {
            showToast('Error loading projects', 'error');
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        showToast('Error loading projects', 'error');
    }
}

function renderProjects(projects) {
    const tbody = document.querySelector('#projectsTable tbody');
    
    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No projects found. <a href="project-edit.html" style="color: var(--primary-color);">Create your first project</a></td></tr>';
        return;
    }
    
    tbody.innerHTML = projects.map(project => `
        <tr>
            <td><strong>${project.title}</strong> ${project.featured ? '<span class="badge badge-warning">Featured</span>' : ''}</td>
            <td><span class="badge badge-success">${project.category}</span></td>
            <td><span class="badge badge-${project.published ? 'success' : 'warning'}">${project.published ? 'Published' : 'Draft'}</span></td>
            <td>${project.views || 0}</td>
            <td>${formatDate(project.createdAt)}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <a href="project-edit.html?id=${project._id}" class="btn btn-sm btn-secondary"><i class="fas fa-edit"></i></a>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject('${project._id}', '${project.title}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function deleteProject(id, title) {
    if (!confirmAction(`Delete "${title}"?`)) return;
    
    try {
        const response = await fetchWithAuth(`/projects/${id}`, { method: 'DELETE' });
        const data = await response.json();
        
        if (data.success) {
            showToast('Project deleted', 'success');
            loadProjects();
        } else {
            showToast(data.message || 'Error deleting project', 'error');
        }
    } catch (error) {
        showToast('Error deleting project', 'error');
    }
}

