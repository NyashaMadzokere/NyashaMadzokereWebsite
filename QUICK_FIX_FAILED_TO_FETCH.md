# 🚨 Quick Fix: "Failed to fetch" Error

## ✅ **Most Common Cause: Backend Not Running**

The "Failed to fetch" error means your frontend cannot connect to the backend API.

---

## 🔧 **Step-by-Step Fix**

### **1. Check if Backend is Running**

Open a **new terminal window** and check:

```bash
# Navigate to backend folder
cd backend

# Check if server is running
# You should see output like:
# 🚀 Server running in development mode
# 📡 Listening on port 5000
# ✅ MongoDB Connected
```

**If you don't see this**, the backend is not running.

---

### **2. Start the Backend**

In the backend terminal:

```bash
# Make sure you're in backend folder
cd backend

# Start the server
npm run dev
```

**You should see:**
```
🚀 Server running in development mode
📡 Listening on port 5000
✅ MongoDB Connected
💚 Health check: http://localhost:5000/health
```

**Keep this terminal open!** The backend must stay running.

---

### **3. Test Backend Connection**

Open your browser and go to:
```
http://localhost:5000/health
```

**You should see:**
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123
}
```

**If you see an error**, the backend is not running correctly.

---

### **4. Refresh Admin Panel**

After backend is running:
1. Go back to your admin panel
2. Refresh the page (F5)
3. Try loading messages again

---

## 🔍 **Other Possible Issues**

### **Issue 1: Wrong Port**

**Check backend is on port 5000:**
- Look at backend terminal: `Listening on port 5000`
- Check `backend/.env`: `PORT=5000`

### **Issue 2: CORS Error**

**If you see CORS error:**
- Check `backend/server.js` includes `http://localhost:8080` in allowed origins
- Restart backend after changing CORS

### **Issue 3: Firewall/Antivirus**

**If backend won't start:**
- Check Windows Firewall
- Check antivirus isn't blocking Node.js
- Try different port: `PORT=5001` in `.env`

---

## 📋 **Quick Checklist**

- [ ] Backend terminal is open
- [ ] Backend shows "Server running"
- [ ] Backend shows "MongoDB Connected"
- [ ] `http://localhost:5000/health` works
- [ ] Admin panel refreshed
- [ ] Still getting error? Check browser console (F12)

---

## 🆘 **Still Not Working?**

1. **Check browser console (F12):**
   - Look for exact error message
   - Check Network tab for failed requests

2. **Check backend terminal:**
   - Look for error messages
   - Check if MongoDB connected

3. **Test manually:**
   ```bash
   # In browser console (F12)
   fetch('http://localhost:5000/health')
     .then(r => r.json())
     .then(console.log)
     .catch(console.error);
   ```

---

## 💡 **Pro Tip**

**Always start backend first:**
1. Open terminal
2. `cd backend`
3. `npm run dev`
4. **Wait for "Server running"**
5. Then open admin panel

**Keep backend terminal open while using admin panel!**

---

**Most likely fix:** Just start the backend! 🚀

```bash
cd backend
npm run dev
```

