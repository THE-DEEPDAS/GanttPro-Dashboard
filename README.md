# GanttPro Chart Downloader

A simple tool to import your Gantt charts from **[GanttPro](https://ganttpro.com/)** and download them locally for free. Save your project timelines and visualizations as PNG, PDF, or JSON files — without premium restrictions.

## 🚀 Features

- 🔄 **Import Gantt charts** directly from GanttPro.
- 📥 **Download charts** in multiple formats (PDF/PNG/JSON).
- 💡 Easy-to-use and lightweight interface.
- 🔐 Fully client-side — your data stays with you.
- 🛠️ Automates the export process for free users.

## 🧠 How It Works

1. Login to your [GanttPro](https://ganttpro.com/) account.
2. Navigate to your Gantt chart project.
3. Get your token.
4. The tool scrapes the chart content and reconstructs it.
5. Export it in your desired format.

## 🧰 Tech Stack

- Python / JavaScript (depending on your implementation)
- Web scraping (BeautifulSoup/Selenium or DOM access via browser)
- PDF/PNG export (via jsPDF, html2canvas, or similar libraries)
