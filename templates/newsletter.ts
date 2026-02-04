interface NewletterProps {
  verification_url: string;
}

export function newsletter_email({ verification_url }: NewletterProps) {
  return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;700&display=swap');
        
        body {
            font-family: 'Inter', Helvetica, Arial, sans-serif;
            background-color: #fcfcfc;
            margin: 0;
            padding: 0;
            color: #1a1a1a;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .header {
            padding: 40px;
            text-align: center;
            background: #000000;
        }
        .content {
            padding: 40px;
            text-align: center;
        }
        h1 {
            font-family: 'DM+Serif+Display', serif;
            font-size: 28px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 18px 36px;
            background-color: #6366f1; /* Your accent-primary */
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 16px;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: transform 0.2s;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            background: #fafafa;
        }
        .divider {
            height: 1px;
            background: #eeeeee;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div className="container">
        <div className="header">
            <h2 style="color: #ffffff; font-family: 'DM+Serif+Display', serif; margin: 0; letter-spacing: 2px;">INKFLOW</h2>
        </div>

        <div className="content">
            <h1>Confirm your subscription</h1>
            <p>
                You’re one step away from joining a community of insightful writers and readers. 
                Please click the button below to verify your email and complete your subscription to <strong>The Flow</strong>.
            </p>
            
            <a href="${verification_url}" className="button">Verify Email Address</a>

            <div className="divider"></div>
            
            <p style="font-size: 13px;">
                If you didn't request this, you can safely ignore this email. 
                The link will expire in 24 hours.
            </p>
        </div>

        <div className="footer">
            &copy; 2026 InkFlow Community. All rights reserved.<br>
        </div>
    </div>
</body>
</html>`;
}
