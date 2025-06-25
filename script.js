// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const htmlElement = document.documentElement;

    // --- Sidebar Toggle for Mobile ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar if clicked outside (for mobile)
    document.addEventListener('click', (event) => {
        if (window.innerWidth < 768) { // Only for mobile view
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // --- light Mode Toggle ---
    lightModeToggle.addEventListener('change', () => {
        if (lightModeToggle.checked) {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); 
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            darkModeToggle.checked = true;
        }
    } else {
        // Default to light if no theme saved
        htmlElement.setAttribute('data-theme', 'light');
        darkModeToggle.checked = false;
    }

    // --- Navigation Active State & Submenu Toggle ---
    navItems.forEach(item => {
        const navLink = item.querySelector('.nav-link');
        if (navLink) {
            navLink.addEventListener('click', function() {
                navItems.forEach(ni => ni.classList.remove('active'));
                item.classList.add('active');
            });
        }
    });

    const submenuLinks = document.querySelectorAll('.submenu-link');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navItems.forEach(ni => ni.classList.remove('active'));
            let parent = link.closest('.nav-item');
            if (parent) parent.classList.add('active');
        });
    });

    // Đặt active dựa trên URL hiện tại (giữ nguyên đoạn này)
    navItems.forEach(item => {
        const navLink = item.querySelector('.nav-link');
        if (navLink && navLink.href) {
            if (window.location.pathname === navLink.pathname) {
                navItems.forEach(ni => ni.classList.remove('active'));
                item.classList.add('active');
            }
        }
    });

    submenuLinks.forEach(link => {
        if (link.href && window.location.pathname === link.pathname) {
            navItems.forEach(ni => ni.classList.remove('active'));
            let parent = link.closest('.nav-item');
            if (parent) parent.classList.add('active');
        }
    });

    // Ensure initial active state for dashboard on load if no other active element is set
    const initialActiveItem = document.querySelector('.nav-item.active');
    if (!initialActiveItem) {
        const dashboardItem = document.querySelectorx('.nav-item[data-path="dashboard"]');
        if (dashboardItem) {
            dashboardItem.classList.add('active');
        }
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Chỉ chặn nếu href là "#" hoặc "about:blank"
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === 'about:blank') {
                e.preventDefault();
            }
        });
    });
});
