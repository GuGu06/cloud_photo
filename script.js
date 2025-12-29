// 导航栏平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 如果是移动端菜单，点击后关闭菜单
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// 移动端菜单切换
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// 点击移动端菜单外部关闭菜单
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '0';
    }
    
    // 更新导航栏激活状态
    updateActiveNavLink();
});

// 更新导航栏激活状态
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 功能卡片动画
function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.1}s`;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// 下载专区动画
function animateDownloadSection() {
    const downloadSection = document.querySelector('.download-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    if (downloadSection) {
        observer.observe(downloadSection);
    }
}

// 处理功能图标显示
function setupFeatureIcons() {
    const iconImages = document.querySelectorAll('.icon-img');
    
    iconImages.forEach(img => {
        const index = img.getAttribute('data-index');
        const yPos = -index * 25; // 假设每个图标在原图中占25%的高度
        img.style.objectPosition = `center ${yPos}%`;
    });
}

// GitHub 直接下载链接
const apkDownloadUrl = 'https://raw.githubusercontent.com/GuGu06/cloud_photo/main/app-release.apk';
// 下载 APK 文件
function downloadApk() {
    // 创建一个临时链接并触发下载
    const link = document.createElement('a');
    link.href = apkDownloadUrl;
    link.download = 'cloud-photo-frame.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 下载按钮功能
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', downloadApk);

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    animateFeatureCards();
    animateDownloadSection();
    setupFeatureIcons();
});
