# Assets Folder Structure

This folder has been organized into logical categories for better maintainability and clarity.

## 📁 Folder Structure

### 🎨 **icons/**
UI icons and interface elements
- `add.png`, `edit.png`, `delete.png` - CRUD operation icons
- `mail.png`, `phone.png`, `location.png` - Contact icons
- `save.png`, `cancel.png`, `cross.svg` - Action icons
- `setting.svg`, `logout.png`, `key.png` - System icons
- `attachicon.png`, `resumeIcon.svg`, `ExportIcon.svg` - File operation icons

### 🖼️ **images/**
General images, photos, and illustrations
- `mesh-gradient.webp` - Background gradients
- `img1.svg`, `img2.svg`, `img3.svg`, `img4.svg` - General illustrations
- `project.png`, `Support.png` - Feature images
- `exported.png` - Export related imagery

### 🏢 **logos/**
Brand logos and company branding
- `logo.png` - Main company logo
- `LogoWhite.png` - White variant of logo
- `SDCframe.svg` - SDC branded frame

### 🎮 **buttons/**
Button graphics and navigation elements
- `upbutton.svg`, `downbutton.svg` - Vertical navigation
- `leftarrow.svg`, `rightarrow.svg` - Horizontal navigation
- `RightIcon.svg`, `PlusButton.svg` - Action buttons
- `profile button.png` - Profile related button

### 🌐 **social/**
Social media icons and external links
- `instagram.webp`, `instagramIcon.svg` - Instagram branding
- `linkedinIcon.svg`, `linkeldin.png` - LinkedIn branding
- `GitIcon.svg` - GitHub branding
- `plus.svg` - Social addition icon

### 🎨 **graphics/**
Decorative graphics and SVG illustrations
- `alumni1.svg`, `alumni2.svg`, `alumni3.svg` - Alumni graphics
- `Testimonial1.svg`, `Testimonial2.svg` - Testimonial graphics
- `partner1.svg`, `partner2.svg` - Partner graphics
- `laptopimg.svg`, `map.svg` - Tech and location graphics
- `center.svg`, `Group.svg` - Layout graphics

### 🎭 **profiles/**
Profile pictures and user avatars
- `eshaan.jpg` - Individual profile photo
- `profile1.jpg` - Sample profile photo

### 🎬 **videos/**
Video files and animations
- `404part-1.mp4`, `404part-2.mp4` - 404 page animations

## 🔄 Import Path Updates

When importing assets, update your import paths to reflect the new structure:

### Before:
```javascript
import logo from "../../assets/logo.png";
import editIcon from "../../assets/edit.png";
import instagram from "../../assets/instagram.webp";
```

### After:
```javascript
import logo from "../../assets/logos/logo.png";
import editIcon from "../../assets/icons/edit.png";
import instagram from "../../assets/social/instagram.webp";
```

## 📋 Benefits

1. **Better Organization**: Assets are grouped by purpose and type
2. **Easier Maintenance**: Finding and updating assets is more intuitive
3. **Scalability**: Easy to add new assets to appropriate categories
4. **Team Collaboration**: Clear structure helps team members locate assets
5. **Build Optimization**: Bundlers can better optimize based on usage patterns

## 🛠️ Next Steps

1. Update all import statements in your components
2. Update any hardcoded asset paths
3. Consider creating index files for commonly used assets
4. Add new assets to appropriate folders going forward
