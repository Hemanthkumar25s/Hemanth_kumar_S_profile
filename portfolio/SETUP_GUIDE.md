# Portfolio Setup Guide

## 📍 Current Status

✅ **Completed:**
- Resume page created at `/resume` route
- Navigation updated with Resume link
- Hero CTA button changed to "View Resume"
- Contact form backend integrated
- Production build successful

🔄 **Next Steps:**

---

## Step 1: Configure Formspree for Contact Form

The contact form on your portfolio uses **Formspree** to send emails. Here's how to set it up:

### 1.1 Create a Formspree Account
1. Visit [formspree.io](https://formspree.io)
2. Click "Sign up" and create an account
3. Verify your email

### 1.2 Create a New Form
1. In Formspree dashboard, click "Create" or "New Form"
2. Enter a name (e.g., "Portfolio Contact Form")
3. Add your email address as the recipient
4. Click "Create Form"

### 1.3 Get Your Form Endpoint
1. After creating the form, you'll see a section showing your form ID
2. The endpoint URL will look like: `https://formspree.io/f/your-form-id`
3. Copy this entire URL

### 1.4 Update `.env.local`
1. Open `portfolio/.env.local` in VS Code
2. Replace `your-form-id` with your actual form ID from Formspree
3. Example:
   ```
   FORMSPREE_ENDPOINT=https://formspree.io/f/abcde12345
   ```
4. Save the file

**Note:** Never commit `.env.local` to GitHub (it's already in `.gitignore`)

---

## Step 2: Test Locally

### 2.1 Start Development Server
```bash
cd portfolio
npm run dev
```

### 2.2 Test the Contact Form
1. Navigate to `http://localhost:3000/contact`
2. Fill out the form with test data
3. Click "Send Message"
4. You should receive an email at the address you configured in Formspree

### 2.3 Test the Resume Page
1. Navigate to `http://localhost:3000/resume`
2. Verify the resume PDF displays (currently showing placeholder)
3. Test the "Download Resume" button
4. Test the "Contact Me" button

---

## Step 3: Deploy to Vercel

### 3.1 Add Environment Variable to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `FORMSPREE_ENDPOINT`
   - **Value:** Your Formspree form URL (e.g., `https://formspree.io/f/abcde12345`)
5. Click "Save"

### 3.2 Deploy
```bash
git add .
git commit -m "Add environment configuration"
git push origin main
```

Your portfolio will automatically redeploy on Vercel.

---

## Step 4: Update Resume PDF

The `/resume` page currently shows a placeholder PDF. To add your real resume:

1. Create or export your resume as a PDF
2. Name it `resume.pdf`
3. Replace the file at `public/resume.pdf`
4. Commit and push the changes:
   ```bash
   git add public/resume.pdf
   git commit -m "Update resume PDF"
   git push origin main
   ```

---

## 🔗 Quick Links

| Link | Purpose |
|------|---------|
| [Formspree](https://formspree.io) | Create contact form |
| [Vercel Dashboard](https://vercel.com/dashboard) | Deploy & configure |
| [GitHub Repo](https://github.com/Hemanthkumar25s/Hemanth_kumar_S_profile) | Version control |

---

## 🧪 Testing Checklist

- [ ] Contact form sends emails successfully
- [ ] Resume page displays and PDF downloads work
- [ ] All navigation links work correctly
- [ ] Mobile menu displays properly
- [ ] Animations are smooth
- [ ] No console errors

---

## ❓ Troubleshooting

### Contact form not sending?
- Verify `FORMSPREE_ENDPOINT` is set in `.env.local`
- Check that your Formspree form is active
- Restart dev server: `npm run dev`
- Check browser console for errors

### Resume PDF not loading?
- Ensure `public/resume.pdf` exists
- Check file size (keep under 5MB)
- Verify file path is correct

### Build failing on Vercel?
- Check that `FORMSPREE_ENDPOINT` is set in Vercel Environment Variables
- Verify no syntax errors: `npm run build`
- Check Vercel deployment logs

---

## 📞 Need Help?

Contact the developer or check the deployment guide for more information.
