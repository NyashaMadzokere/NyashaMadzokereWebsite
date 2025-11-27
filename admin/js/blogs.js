// Blog Management Functions

let currentPage = 1;
let totalPages = 1;
let allBlogs = [];

// Load all blog posts
async function loadBlogs() {
    try {
        const response = await fetchWithAuth('/blog?limit=20&page=' + currentPage);
        const data = await response.json();
        
        if (data.success) {
            allBlogs = data.data;
            totalPages = data.pages || 1;
            renderBlogs(allBlogs);
            renderPagination();
        } else {
            showToast('Error loading blog posts', 'error');
        }
    } catch (error) {
        console.error('Error loading blogs:', error);
        showToast('Error loading blog posts', 'error');
        document.querySelector('#blogsTable tbody').innerHTML = 
            '<tr><td colspan="6" style="text-align: center; padding: 2rem;">Error loading posts. Please try again.</td></tr>';
    }
}

// Render blog posts table
function renderBlogs(blogs) {
    const tbody = document.querySelector('#blogsTable tbody');
    
    if (blogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No blog posts found. <a href="blog-edit.html" style="color: var(--primary-color);">Create your first post</a></td></tr>';
        return;
    }
    
    tbody.innerHTML = blogs.map(blog => `
        <tr>
            <td>
                <strong>${blog.title}</strong>
                ${blog.featured ? '<span class="badge badge-warning" style="margin-left: 0.5rem;">Featured</span>' : ''}
            </td>
            <td><span class="badge badge-success">${blog.category}</span></td>
            <td>
                <span class="badge badge-${blog.published ? 'success' : 'warning'}">
                    ${blog.published ? 'Published' : 'Draft'}
                </span>
            </td>
            <td>${blog.views || 0}</td>
            <td>${formatDate(blog.publishedDate || blog.createdAt)}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <a href="blog-edit.html?id=${blog._id}" class="btn btn-sm btn-secondary" title="Edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button class="btn btn-sm btn-danger" onclick="deleteBlog('${blog._id}', '${blog.title}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${blog.published ? 
                        `<button class="btn btn-sm btn-warning" onclick="togglePublish('${blog._id}', false)" title="Unpublish">
                            <i class="fas fa-eye-slash"></i>
                        </button>` :
                        `<button class="btn btn-sm btn-success" onclick="togglePublish('${blog._id}', true)" title="Publish">
                            <i class="fas fa-eye"></i>
                        </button>`
                    }
                </div>
            </td>
        </tr>
    `).join('');
}

// Delete blog post
async function deleteBlog(id, title) {
    if (!confirmAction(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
        return;
    }
    
    try {
        const response = await fetchWithAuth(`/blog/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Blog post deleted successfully', 'success');
            loadBlogs();
        } else {
            showToast(data.message || 'Error deleting post', 'error');
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        showToast('Error deleting blog post', 'error');
    }
}

// Toggle publish status
async function togglePublish(id, publish) {
    try {
        const response = await fetchWithAuth(`/blog/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                published: publish,
                publishedDate: publish ? new Date().toISOString() : null
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast(`Post ${publish ? 'published' : 'unpublished'} successfully`, 'success');
            loadBlogs();
        } else {
            showToast(data.message || 'Error updating post', 'error');
        }
    } catch (error) {
        console.error('Error toggling publish:', error);
        showToast('Error updating post status', 'error');
    }
}

// Render pagination
function renderPagination() {
    const paginationEl = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationEl.style.display = 'none';
        return;
    }
    
    paginationEl.style.display = 'flex';
    
    let html = '';
    
    // Previous button
    html += `<button class="btn btn-sm btn-secondary" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i> Previous
    </button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<button class="btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-secondary'}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += `<span style="padding: 0.5rem;">...</span>`;
        }
    }
    
    // Next button
    html += `<button class="btn btn-sm btn-secondary" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
        Next <i class="fas fa-chevron-right"></i>
    </button>`;
    
    paginationEl.innerHTML = html;
}

// Change page
function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    loadBlogs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search and filter
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    let searchTimeout;
    
    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterBlogs();
        }, 500);
    });
    
    categoryFilter?.addEventListener('change', filterBlogs);
    statusFilter?.addEventListener('change', filterBlogs);
});

function filterBlogs() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    let filtered = allBlogs;
    
    if (search) {
        filtered = filtered.filter(blog => 
            blog.title.toLowerCase().includes(search) ||
            blog.excerpt.toLowerCase().includes(search) ||
            blog.tags.some(tag => tag.toLowerCase().includes(search))
        );
    }
    
    if (category) {
        filtered = filtered.filter(blog => blog.category === category);
    }
    
    if (status) {
        filtered = filtered.filter(blog => 
            status === 'published' ? blog.published : !blog.published
        );
    }
    
    renderBlogs(filtered);
}

