const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spend Limit Exception</title>
  <style>
    :root {
      --primary: #181f4b;
      --primary-light: #e3e6f3;
      --accent: #1976d2;
      --text: #333333;
      --muted: #6e6e6e;
      --border: #e0e0e0;
      --warning: #f57c00;
      --card-radius: 12px;
      --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    body {
      font-family: var(--font-sans);
      margin: 0;
      padding: 20px;
      background-color: #f0f2f5;
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .nav-bar {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      padding: 15px;
      background-color: #fff;
      border-radius: var(--card-radius);
      box-shadow: 0 10px 30px rgba(0,0,0,0.07);
    }
    
    .nav-button {
      background-color: var(--primary);
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      letter-spacing: 0.01em;
      transition: all 0.2s ease;
    }
    
    .nav-button.active {
      background-color: #1251a3;
      box-shadow: 0 2px 4px rgba(18, 81, 163, 0.2);
    }
    
    .nav-button:hover {
      transform: translateY(-1px);
    }
    
    .number {
      background: rgba(255,255,255,0.2);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: white;
      border-radius: var(--card-radius);
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.07);
      border: 1px solid var(--border);
    }
    
    .email-header {
      background-color: var(--primary);
      padding: 25px;
      color: white;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .header-icon {
      flex-shrink: 0;
    }

    .header-icon img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }

    .header-title {
      flex-grow: 1;
    }

    .header-title h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }

    .header-title p {
      margin: 4px 0 0;
      opacity: 0.8;
      font-size: 14px;
    }

    .header-button {
      background-color: white;
      color: var(--primary);
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      white-space: nowrap;
      transition: background-color 0.2s ease;
    }

    .header-button:hover {
      background-color: #f0f0f0;
    }
    
    .email-body {
      padding: 30px;
    }
    
    .email-body p {
      margin: 0 0 1em;
    }

    .main-message {
      font-size: 16px;
      line-height: 1.6;
    }

    .highlight {
      font-weight: 600;
      color: var(--primary);
    }

    .action-points {
      background-color: #f7f7f7;
      border: 1px solid var(--border);
      padding: 15px;
      border-radius: 8px;
      margin: 25px 0;
    }

    .action-point {
      padding: 5px 0 5px 25px;
      position: relative;
    }
    
    .action-point .emoji {
      position: absolute;
      left: 0;
      top: 7px;
    }
    
    .reminder {
      background-color: #fffbe5;
      padding: 15px;
      border-radius: 8px;
      margin: 25px 0;
      border-left: 4px solid var(--warning);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .reminder p {
      margin: 0;
    }

    .btn-main {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin: 15px 0;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      transition: background-color 0.2s ease;
    }

    .btn-main:hover {
      background-color: #2c3a8e;
    }

    .approvers-list {
      margin-top: 25px;
      background-color: var(--primary-light);
      padding: 15px;
      border-radius: 8px;
    }
    
    .approvers-list strong {
      display: block;
      margin-bottom: 8px;
      color: var(--primary);
    }
    
    .email-footer {
      padding: 20px;
      background-color: #f7f7f7;
      border-top: 1px solid var(--border);
      font-size: 12px;
      color: var(--muted);
      text-align: center;
    }
    
    .email-footer a {
      color: var(--accent);
      text-decoration: none;
    }
    
    @media (max-width: 600px) {
      .email-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      .header-button {
        align-self: flex-start;
      }
      .email-body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="nav-bar">
    <a href="email-header-sample.html" class="nav-button">
      <span class="number">1</span>
      New Email Header
    </a>
    <a href="exercise2.html" class="nav-button">
      <span class="number">2</span>
      Exercise 2
    </a>
    <a href="exercise3.html" class="nav-button">
      <span class="number">3</span>
      Exercise 3
    </a>
    <a href="exercise4.html" class="nav-button active">
      <span class="number">4</span>
      Exercise 4
    </a>
    <a href="exercise5.html" class="nav-button">
      <span class="number">5</span>
      Exercise 5
    </a>
  </div>
  <div class="email-container">
    <div class="email-header">
      <div class="header-icon">
        <img src="https://i.imgur.com/M38kbLz.png" alt="Company Logo">
      </div>
      <div class="header-title">
        <h1>Spend Limit Exception</h1>
        <p>From: Janet Buyer</p>
      </div>
      <a href="#" class="header-button">View Request</a>
    </div>
    
    <div class="email-body">
      <p class="main-message">A request has been submitted to place an order for <span class="highlight">$5,000</span> for <span class="highlight">"Conference Room Painting"</span>, but this exceeds your company's spend limit(s).</p>
      
      <p>This request must be approved by one of your company's designated approvers.</p>
      
      <div class="action-points">
        <div class="action-point"><span class="emoji">👉</span> If you are an approver, please review and take action.</div>
        <div class="action-point"><span class="emoji">👉</span> If you submitted this request, you will be notified once it has been approved.</div>
      </div>
      
      <div class="reminder">
        <span class="emoji" style="font-size: 20px;">⏰</span>
        <p>This request will expire in <span class="highlight">14 days</span> if not approved.</p>
      </div>
      
      <a href="#" class="btn-main">Review Request</a>
      
      <div class="approvers-list">
        <strong>Approvers:</strong>
        Akash Agarwal, Bill Jenkins, Nicole Approver, Richard Robertson, Tina Jones
      </div>
    </div>
    
    <div class="email-footer">
      © 2024 Candex. All rights reserved. | 123 Main St, California, USA<br>
      <a href="#">Unsubscribe</a> | <a href="#">Manage Notifications</a>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('exercise4.html', html);
console.log('exercise4.html has been created successfully.');
