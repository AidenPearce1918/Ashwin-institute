# Ashwin Institute - Educational Website

A modern, responsive website for Ashwin Educational Institute built with HTML5, CSS3, and JavaScript.

## 🎯 Features

### Pages
- **Home** - Landing page with hero section, features showcase, and statistics
- **About** - Institution information, mission, vision, and achievements
- **Courses** - Six professional courses with detailed descriptions
- **Contact** - Contact form and location information

### Features
- ✅ Fully Responsive Design (Mobile, Tablet, Desktop)
- ✅ Modern & Clean UI/UX
- ✅ Smooth Animations & Transitions
- ✅ Mobile Navigation Menu
- ✅ Contact Form with Validation
- ✅ Social Media Links
- ✅ Fast Loading Times
- ✅ SEO Friendly

## 📁 Project Structure

```
ashwin-institute/
├── index.html                 # Home page
├── pages/
│   ├── about.html            # About page
│   ├── courses.html          # Courses page
│   └── contact.html          # Contact page
├── src/
│   ├── css/
│   │   ├── style.css         # Main styles
│   │   └── pages.css         # Page-specific styles
│   ├── js/
│   │   ├── script.js         # Main JavaScript
│   │   └── contact.js        # Contact form handler
│   └── images/               # Image assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for basic functionality
- Git installed (for GitHub Pages deployment)

### Deployment on GitHub Pages

The website is automatically deployed to GitHub Pages when you push to the main branch!

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select Source: `Deploy from a branch`
   - Select Branch: `gh-pages` (automatically created by workflow)
   - Select Folder: `/ (root)`
   - Click Save

3. **Access Your Website**
   ```
   https://yourusername.github.io/Ashwin-institute
   ```

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/AidenPearce1918/Ashwin-institute.git
   cd Ashwin-institute
   ```

2. **Using Live Server (Recommended)**
   - Install VS Code Extension: "Live Server"
   - Right-click on `index.html` and select "Open with Live Server"

3. **Or simply open in browser**
   ```bash
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   
   # Windows
   start index.html
   ```

## 🎨 Customization

### Colors
Edit the CSS variables in `src/css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-dark: #1f2937;
    --text-light: #6b7280;
    --bg-light: #f9fafb;
    --bg-white: #ffffff;
}
```

### Content
- **Institute Name**: Update in navbar and footer (all HTML files)
- **Contact Info**: Edit footer contact section
- **Courses**: Modify `pages/courses.html`
- **Statistics**: Update `.stat-item` values in `index.html`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **JavaScript (Vanilla)** - No frameworks, lightweight
- **Font Awesome 6** - Icons
- **Responsive Design** - Mobile-first approach

## 📝 Future Enhancements

Database features that can be added later:
- [ ] Student enrollment system with database
- [ ] Online course management
- [ ] Student dashboard/portal
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin panel for course management
- [ ] Testimonials/Reviews system
- [ ] Live chat support

## 📞 Contact Form Integration

The contact form currently shows a success message on submission. To integrate with a backend:

1. Set up a server (Node.js, Python, PHP, etc.)
2. Create an endpoint to handle form submissions
3. Update the form submission in `src/js/contact.js`

Example for Node.js backend:
```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

## 🤝 Contributing

Feel free to fork, modify, and improve the project!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 Author

Ashwin Institute
- Email: info@ashwin-institute.com
- Phone: +91 98765 43210

---

**Last Updated**: December 2025